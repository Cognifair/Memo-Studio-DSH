/**
 * 墨卡大师灵动岛 —— 更新检查（纯逻辑，宿主侧；可注入 fetch，方便离线测试）。
 *
 * 只读 GitHub 的正式 Release：不发布、不上传、不写仓库、不碰本地文件。
 * 版本比较走语义版本，不做字符串大小或提交时间比较。
 */

/** 检查结果的形态。前端只认这几个 state，不会把未知当"最新"。 */
export const UPDATE_STATES = [
  'unconfigured', // 没配置仓库
  'available',    // 有更新
  'up_to_date',   // 已是最新
  'no_release',   // 仓库里没有正式 Release
  'no_asset',     // 有新版本但没有匹配的安装包
  'rate_limited', // GitHub 限流
  'offline',      // 网络不可达
  'timeout',      // 请求超时
  'bad_response'  // 响应不是预期的 JSON
];

const VERSION_RE = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/;

/** 解析语义版本；不可解析返回 null。 */
export function parseVersion(input) {
  const text = String(input || '').trim().replace(/^v/i, '');
  const match = VERSION_RE.exec(text);
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ? match[4].split('.') : []
  };
}

/** 比较两个版本：a>b 返回 1，相等 0，a<b 返回 -1；任一侧不可解析返回 null。 */
export function compareVersions(a, b) {
  const left = parseVersion(a);
  const right = parseVersion(b);
  if (!left || !right) return null;
  for (const key of ['major', 'minor', 'patch']) {
    if (left[key] !== right[key]) return left[key] > right[key] ? 1 : -1;
  }
  const lp = left.prerelease;
  const rp = right.prerelease;
  if (!lp.length && !rp.length) return 0;
  // 有预发布标识的版本更低（1.0.0-beta < 1.0.0）
  if (!lp.length) return 1;
  if (!rp.length) return -1;
  const max = Math.max(lp.length, rp.length);
  for (let index = 0; index < max; index += 1) {
    const l = lp[index];
    const r = rp[index];
    if (l === undefined) return -1;
    if (r === undefined) return 1;
    const ln = /^\d+$/.test(l);
    const rn = /^\d+$/.test(r);
    if (ln && rn) {
      if (Number(l) !== Number(r)) return Number(l) > Number(r) ? 1 : -1;
    } else if (ln) return -1;
    else if (rn) return 1;
    else if (l !== r) return l > r ? 1 : -1;
  }
  return 0;
}

export function isPrerelease(version) {
  const parsed = parseVersion(version);
  return Boolean(parsed && parsed.prerelease.length);
}

/** 从 Release 列表里挑出可用的那一条：草稿与预发布默认跳过，取版本最高者。 */
export function pickRelease(releases, config) {
  if (!Array.isArray(releases)) return null;
  let best = null;
  for (const release of releases) {
    if (!release || typeof release !== 'object') continue;
    if (release.draft === true) continue;
    if (release.prerelease === true && !config.allowPrerelease) continue;
    const version = typeof release.tag_name === 'string' ? release.tag_name : '';
    if (!parseVersion(version)) continue;
    if (!best || compareVersions(version, best.tag_name) === 1) best = release;
  }
  return best;
}

/** 按配置的正则挑安装包；没配正则就返回 null（只给 Release 页面）。 */
export function pickAsset(release, config) {
  if (!release || !config.assetPattern) return null;
  let pattern;
  try {
    pattern = new RegExp(config.assetPattern);
  } catch {
    return null;
  }
  const assets = Array.isArray(release.assets) ? release.assets : [];
  for (const asset of assets) {
    if (!asset || typeof asset.name !== 'string') continue;
    if (!pattern.test(asset.name)) continue;
    if (typeof asset.browser_download_url !== 'string') continue;
    return {
      name: asset.name,
      url: asset.browser_download_url,
      size: typeof asset.size === 'number' ? asset.size : null
    };
  }
  return null;
}

function trimNotes(text, max) {
  const value = String(text || '').replace(/\r\n/g, '\n').trim();
  return value.length > max ? value.slice(0, max - 1) + '…' : value;
}

/**
 * 建一个检查器：带内存缓存与去重（并发调用只发一次请求）。
 * @param {{config: object, currentVersion: string, fetchImpl?: Function, now?: () => number}} options
 */
export function createUpdateChecker(options) {
  const config = options.config;
  const currentVersion = String(options.currentVersion || '0.0.0');
  const fetchImpl = options.fetchImpl || (typeof fetch === 'function' ? fetch : null);
  const now = options.now || Date.now;
  let cache = null;
  let inflight = null;

  function make(state, extra = {}) {
    return {
      state,
      current: currentVersion,
      latest: null,
      notes: '',
      releaseUrl: null,
      asset: null,
      checkedAt: now(),
      cached: false,
      error: null,
      ...extra
    };
  }

  async function fetchReleases() {
    if (!fetchImpl) return make('offline', { error: 'no_fetch' });
    if (!config.repo) return make('unconfigured');
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), config.timeoutMs) : 0;
    try {
      const response = await fetchImpl(`${config.apiBase}/repos/${config.repo}/releases?per_page=30`, {
        headers: {
          accept: 'application/vnd.github+json',
          'user-agent': 'dsh-memo-skill-island'
        },
        signal: controller ? controller.signal : undefined
      });
      if (response.status === 403 || response.status === 429) return make('rate_limited');
      if (response.status === 404) return make('no_release', { error: 'repo_not_found' });
      if (!response.ok) return make('bad_response', { error: `status_${response.status}` });
      let body;
      try {
        body = await response.json();
      } catch {
        return make('bad_response', { error: 'invalid_json' });
      }
      if (!Array.isArray(body)) return make('bad_response', { error: 'not_array' });

      const release = pickRelease(body, config);
      if (!release) return make('no_release');
      const latest = String(release.tag_name);
      const base = {
        latest,
        notes: trimNotes(release.body, config.notesMaxChars),
        releaseUrl: typeof release.html_url === 'string' ? release.html_url : null
      };
      const order = compareVersions(latest, currentVersion);
      if (order === null) return make('bad_response', { ...base, error: 'bad_current_version' });
      if (order <= 0) return make('up_to_date', base);
      const asset = pickAsset(release, config);
      if (config.assetPattern && !asset) return make('no_asset', base);
      return make('available', { ...base, asset });
    } catch (error) {
      const aborted = error && (error.name === 'AbortError' || error.name === 'TimeoutError');
      return make(aborted ? 'timeout' : 'offline', { error: aborted ? 'timeout' : 'network' });
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  /** 检查一次；force=true 跳过缓存（手动检查）。 */
  async function check(force = false) {
    if (!config.repo) return make('unconfigured');
    if (!force && cache && now() - cache.at < config.cacheTtlMs) {
      return { ...cache.value, cached: true };
    }
    if (inflight) return inflight;
    inflight = (async () => {
      const value = await fetchReleases();
      // 失败不缓存：下次打开面板还能再试
      if (value.state === 'available' || value.state === 'up_to_date' || value.state === 'no_release') {
        cache = { at: now(), value };
      }
      return value;
    })();
    try {
      return await inflight;
    } finally {
      inflight = null;
    }
  }

  return { check, config, currentVersion };
}
