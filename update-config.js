/**
 * 墨卡大师灵动岛 —— 更新配置（唯一的发布信息来源）。
 *
 * 仓库地址、发布渠道、安装包匹配规则都集中在这里，别处不再硬编码。
 * 默认 repo 为空：没有确认过仓库时，检查一律返回 unconfigured，绝不猜地址。
 *
 * 配置优先级：插件 Config（cordis.patch.yml 的 config.update）→ 环境变量 → 默认值。
 */

/** 默认值。repo 留空是刻意的：确认仓库后才由配置填上。 */
export const DEFAULT_UPDATE_CONFIG = {
  /** GitHub 仓库，形如 "owner/name"；空串 = 未配置，不检查。 */
  repo: '',
  /** GitHub API 根。企业/GHES 可换。 */
  apiBase: 'https://api.github.com',
  /** 安装包文件名正则（字符串）；空串 = 不挑安装包，只给 Release 页面。 */
  assetPattern: '',
  /** 是否接受预发布版本。正式通道默认 false。 */
  allowPrerelease: false,
  /** 单次请求超时（毫秒）。 */
  timeoutMs: 8000,
  /** 自动检查结果的缓存时长（约 6 小时）。 */
  cacheTtlMs: 6 * 60 * 60 * 1000,
  /** 更新说明最多取多少字（多余截断，前端按纯文本渲染）。 */
  notesMaxChars: 600
};

/**
 * 合并配置。
 * @param {Record<string, unknown>} [raw] 插件 Config 里的 update 段（或整个 config）
 * @param {Record<string, string | undefined>} [env] 环境变量
 */
export function resolveUpdateConfig(raw, env = {}) {
  const source = raw && typeof raw === 'object' ? raw : {};
  const merged = { ...DEFAULT_UPDATE_CONFIG };
  for (const key of Object.keys(DEFAULT_UPDATE_CONFIG)) {
    const value = source[key];
    if (value === undefined || value === null || value === '') continue;
    if (typeof DEFAULT_UPDATE_CONFIG[key] === 'number') {
      const num = Number(value);
      if (Number.isFinite(num) && num > 0) merged[key] = num;
    } else if (typeof DEFAULT_UPDATE_CONFIG[key] === 'boolean') {
      merged[key] = value === true || value === 'true';
    } else {
      merged[key] = String(value);
    }
  }
  if (!merged.repo && typeof env.MEMO_ISLAND_UPDATE_REPO === 'string') {
    merged.repo = env.MEMO_ISLAND_UPDATE_REPO.trim();
  }
  merged.repo = normalizeRepo(merged.repo);
  merged.apiBase = String(merged.apiBase || DEFAULT_UPDATE_CONFIG.apiBase).replace(/\/+$/, '');
  return merged;
}

/** 只接受 owner/name；其他形状一律当没配置。 */
export function normalizeRepo(value) {
  const text = typeof value === 'string' ? value.trim() : '';
  return /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(text) ? text : '';
}
