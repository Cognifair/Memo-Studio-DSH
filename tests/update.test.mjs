/**
 * 更新检查：纯逻辑 + 模拟 GitHub 响应。
 * 不打网络、不读本地文件，全部通过注入的 fetch 控制。
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { compareVersions, parseVersion, isPrerelease, pickRelease, pickAsset, createUpdateChecker } from '../update.js';
import { resolveUpdateConfig, normalizeRepo } from '../update-config.js';

const release = (tag, extra = {}) => ({
  tag_name: tag,
  html_url: `https://example.test/releases/${tag}`,
  body: `notes for ${tag}`,
  draft: false,
  prerelease: false,
  // 默认带一个符合 assetPattern 的安装包：真实发布就是这个形状
  assets: [{
    name: 'dsh-memo-skill-island-' + String(tag).replace(/^v/, '') + '.tgz',
    browser_download_url: 'https://example.test/' + tag + '.tgz',
    size: 1024
  }],
  ...extra
});

function jsonResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body
  };
}

function checker(fetchImpl, overrides = {}, now = () => 1_700_000_000_000) {
  const config = { ...resolveUpdateConfig({ repo: 'owner/name' }), ...overrides };
  return createUpdateChecker({ config, currentVersion: '1.0.0', fetchImpl, now });
}

test('语义版本比较：数值段、预发布、构建元数据', () => {
  assert.equal(compareVersions('1.0.0', '0.9.9'), 1);
  assert.equal(compareVersions('v1.2.3', '1.2.3'), 0);
  assert.equal(compareVersions('1.0.0-beta.1', '1.0.0'), -1);
  assert.equal(compareVersions('1.0.0-beta.2', '1.0.0-beta.10'), -1);
  assert.equal(compareVersions('1.0.0+build.7', '1.0.0'), 0);
  assert.equal(compareVersions('nope', '1.0.0'), null);
  assert.equal(parseVersion('2.3.4-rc.1').prerelease.join('.'), 'rc.1');
  assert.equal(isPrerelease('2.0.0-rc.1'), true);
  assert.equal(isPrerelease('2.0.0'), false);
});

test('正式 Release 选择：跳过草稿与预发布，取最高版本', () => {
  const config = resolveUpdateConfig({ repo: 'owner/name' });
  const picked = pickRelease([
    release('1.1.0'),
    release('2.0.0-rc.1', { prerelease: true }),
    release('9.9.9', { draft: true }),
    release('1.2.0')
  ], config);
  assert.equal(picked.tag_name, '1.2.0');

  const allowed = pickRelease([release('1.1.0'), release('2.0.0-rc.1', { prerelease: true })],
    resolveUpdateConfig({ repo: 'owner/name', allowPrerelease: true }));
  assert.equal(allowed.tag_name, '2.0.0-rc.1');
  assert.equal(pickRelease([release('1.1.0', { draft: true })], config), null);
});

test('安装包按配置的正则挑，没配置或没匹配就不给', () => {
  const withAsset = release('1.2.0', {
    assets: [
      { name: 'dsh-memo-skill-island-1.2.0.tgz', browser_download_url: 'https://example.test/a.tgz', size: 10 },
      { name: 'notes.txt', browser_download_url: 'https://example.test/n.txt', size: 1 }
    ]
  });
  assert.equal(pickAsset(withAsset, resolveUpdateConfig({ repo: 'owner/name', assetPattern: '' })), null);
  const asset = pickAsset(withAsset, resolveUpdateConfig({ repo: 'owner/name', assetPattern: '\\.tgz$' }));
  assert.equal(asset.name, 'dsh-memo-skill-island-1.2.0.tgz');
  assert.equal(pickAsset(withAsset, resolveUpdateConfig({ repo: 'owner/name', assetPattern: '\\.zip$' })), null);
});

test('已是最新 / 有新版本 / 本地版本更高', async () => {
  const up = checker(async () => jsonResponse([release('1.0.0')]));
  assert.equal((await up.check()).state, 'up_to_date');

  const ahead = checker(async () => jsonResponse([release('2.1.0')]));
  const result = await ahead.check();
  assert.equal(result.state, 'available');
  assert.equal(result.latest, '2.1.0');
  assert.equal(result.notes, 'notes for 2.1.0');

  const localHigher = createUpdateChecker({
    config: resolveUpdateConfig({ repo: 'owner/name' }),
    currentVersion: '3.0.0',
    fetchImpl: async () => jsonResponse([release('2.1.0')])
  });
  assert.equal((await localHigher.check()).state, 'up_to_date');
});

test('无正式 Release、无匹配安装包', async () => {
  const none = checker(async () => jsonResponse([release('1.1.0', { draft: true })]));
  assert.equal((await none.check()).state, 'no_release');

  const noAsset = checker(async () => jsonResponse([release('1.1.0', { assets: [] })]), { assetPattern: '\\.tgz$' });
  assert.equal((await noAsset.check()).state, 'no_asset');
});

test('离线、超时、限流、坏响应都不谎报最新', async () => {
  const offline = checker(async () => { throw new TypeError('fetch failed'); });
  assert.equal((await offline.check()).state, 'offline');

  const timeout = checker(async () => {
    const error = new Error('aborted');
    error.name = 'AbortError';
    throw error;
  });
  assert.equal((await timeout.check()).state, 'timeout');

  const limited = checker(async () => jsonResponse({ message: 'API rate limit exceeded' }, 403));
  assert.equal((await limited.check()).state, 'rate_limited');

  const broken = checker(async () => ({
    ok: true, status: 200, json: async () => { throw new SyntaxError('bad json'); }
  }));
  assert.equal((await broken.check()).state, 'bad_response');

  const shaped = checker(async () => jsonResponse({ message: 'not a list' }));
  assert.equal((await shaped.check()).state, 'bad_response');

  const serverError = checker(async () => jsonResponse({}, 500));
  assert.equal((await serverError.check()).state, 'bad_response');
});

test('仓库没配置就不发请求', async () => {
  let called = 0;
  const unconfigured = createUpdateChecker({
    // 默认仓库已指向正式发布；这里显式清空，验证“关掉检查”
    config: resolveUpdateConfig({ repo: '' }),
    currentVersion: '1.0.0',
    fetchImpl: async () => { called += 1; return jsonResponse([]); }
  });
  assert.equal((await unconfigured.check()).state, 'unconfigured');
  assert.equal(called, 0);
  assert.equal(normalizeRepo('https://github.com/a/b'), '');
  assert.equal(normalizeRepo('a/b'), 'a/b');
  assert.equal(resolveUpdateConfig({ repo: '' }, { MEMO_ISLAND_UPDATE_REPO: 'env/owner' }).repo, 'env/owner');
});

test('6 小时缓存：命中不再请求，手动刷新绕过，并发只发一次', async () => {
  let calls = 0;
  let clock = 1_700_000_000_000;
  const cached = checker(async () => { calls += 1; return jsonResponse([release('1.1.0')]); }, {}, () => clock);

  const first = await cached.check();
  assert.equal(first.cached, false);
  assert.equal(calls, 1);

  const second = await cached.check();
  assert.equal(second.cached, true);
  assert.equal(calls, 1);

  clock += 6 * 60 * 60 * 1000 + 1000;
  await cached.check();
  assert.equal(calls, 2);

  await cached.check(true);
  assert.equal(calls, 3);

  const fresh = checker(async () => {
    calls += 1;
    await new Promise((resolve) => setTimeout(resolve, 20));
    return jsonResponse([release('1.1.0')]);
  }, {}, () => 1_700_000_000_000);
  const before = calls;
  const [a, b] = await Promise.all([fresh.check(), fresh.check()]);
  assert.equal(a.state, 'available');
  assert.equal(b.state, 'available');
  assert.equal(calls - before, 1, '并发只发一次请求');
});

test('失败不缓存：下一次还能重试', async () => {
  let mode = 'fail';
  const flaky = checker(async () => {
    if (mode === 'fail') throw new TypeError('offline');
    return jsonResponse([release('1.1.0')]);
  });
  assert.equal((await flaky.check()).state, 'offline');
  mode = 'ok';
  assert.equal((await flaky.check()).state, 'available');
});


test('真实 v0.1.0 响应：当前版本相同时判定已最新，旧版本时给出安装包', async () => {
  const fixture = JSON.parse(await readFile(new URL('./fixtures/release-v0.1.0.json', import.meta.url), 'utf8'));
  const releases = fixture.releases;
  assert.equal(releases[0].draft, false);
  assert.equal(releases[0].prerelease, false);

  const config = resolveUpdateConfig({});
  assert.equal(config.repo, 'Cognifair/Memo-Studio-DSH');
  assert.match(config.assetPattern, /tgz/);

  const same = createUpdateChecker({
    config,
    currentVersion: '0.1.0',
    fetchImpl: async () => jsonResponse(releases)
  });
  assert.equal((await same.check()).state, 'up_to_date');

  const older = createUpdateChecker({
    config,
    currentVersion: '0.0.9',
    fetchImpl: async () => jsonResponse(releases)
  });
  const result = await older.check();
  assert.equal(result.state, 'available');
  assert.equal(result.latest, 'v0.1.0');
  assert.equal(result.asset.name, 'dsh-memo-skill-island-0.1.0.tgz');
  assert.match(result.asset.url, /releases\/download\/v0\.1\.0\//);
  assert.equal(result.asset.size, 112748);
  assert.match(result.notes, /首个公开版本/);
});
