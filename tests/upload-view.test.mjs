/**
 * 上传状态详情：显示派生的纯函数测试。
 * 直接从 client.js 抽出 describeUpload（含 UPLOAD_FIELDS / agoText），用真实中文文案断言。
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const source = (await readFile(new URL('../client.js', import.meta.url), 'utf8')).replace(/\r\n/g, '\n');
const start = source.indexOf('    var UPLOAD_FIELDS = [');
const fnStart = source.indexOf('    function describeUpload(');
let braceDepth = 0;
let fnEnd = source.indexOf('{', fnStart);
for (; fnEnd < source.length; fnEnd += 1) {
  if (source[fnEnd] === '{') braceDepth += 1;
  else if (source[fnEnd] === '}') { braceDepth -= 1; if (braceDepth === 0) { fnEnd += 1; break; } }
}
const end = fnEnd;

const stringsStart = source.indexOf('var STRINGS = {') + 'var STRINGS = '.length;
let depth = 0;
let i = stringsStart;
for (; i < source.length; i += 1) {
  const ch = source[i];
  if (ch === '{') depth += 1;
  else if (ch === '}') { depth -= 1; if (depth === 0) { i += 1; break; } }
}
const STRINGS = vm.runInNewContext('(' + source.slice(stringsStart, i) + ')');
const fill = (template, values) => String(template).replace(/\{(\w+)\}/g, (_, key) => (values && values[key] !== undefined ? String(values[key]) : _));
const t = (key) => (Object.prototype.hasOwnProperty.call(STRINGS.zh, key) ? STRINGS.zh[key] : key);

const context = vm.createContext({ fill, t, Number, Date, isFinite, Math, String });
vm.runInContext(source.slice(start, end) + '\nthis.describeUpload = describeUpload;', context);
const describeUpload = (view, now) => context.describeUpload(view, t, now);

const NOW = 1_700_000_000_000;
const progress = (over = {}) => ({
  total: 10, verified: 5, planned: 3, written: 0, failed: 0, uncertain: 0, mismatch: 0, skipped: 0, uploaded: 5, ...over
});
const view = (over = {}) => ({
  phase: 'upload',
  running: true,
  source: 'registered',
  progress: progress(),
  health: { code: 'ok', readAt: NOW - 12000, lastProgressAt: NOW - 5000, heartbeatAt: NOW - 1000, lifecycle: 'running' },
  ...over
});

test('默认区只放关键数量：核验通过 + 待上传（+待核验）', () => {
  const a = describeUpload(view(), NOW);
  assert.deepEqual(Array.from(a.counts, (c) => c.label), ['核验通过', '待上传']);
  assert.deepEqual(Array.from(a.counts, (c) => c.value), [5, 3]);

  const b = describeUpload(view({ progress: progress({ written: 2 }) }), NOW);
  assert.deepEqual(Array.from(b.counts, (c) => c.label), ['核验通过', '待上传', '待核验']);
  assert.deepEqual(Array.from(b.counts, (c) => c.value), [5, 3, 2]);
});

test('零值异常不显示；有异常时逐项列出（不合并成“异常”）', () => {
  assert.deepEqual(Array.from(describeUpload(view(), NOW).exceptions), []);
  const mixed = describeUpload(view({
    progress: progress({ total: 20, verified: 10, failed: 2, uncertain: 3, mismatch: 1, skipped: 4 })
  }), NOW);
  assert.deepEqual(Array.from(mixed.exceptions), [
    '3 张结果不确定，等待核查',
    '2 张写入失败',
    '1 张回读不一致',
    '4 张被跳过（目标未完成）'
  ]);
  assert.equal(mixed.allVerified, false);
});

test('只有全部核验通过才算完成，跳过不算成功', () => {
  const done = describeUpload(view({ progress: progress({ total: 10, verified: 10, planned: 0, written: 0 }) }), NOW);
  assert.equal(done.allVerified, true);
  assert.equal(done.state.text, '全部核验通过 · 客户端预览另计');

  const skipped = describeUpload(view({ progress: progress({ total: 10, verified: 6, planned: 0, skipped: 4 }) }), NOW);
  assert.equal(skipped.allVerified, false);
  assert.ok(skipped.exceptions.length === 1);
});

test('状态优先级：断连 > 读取失败 > 心跳过期 > 限流 > 暂停 > 等待 > 完成 > 上传中 > 核验中 > 在线', () => {
  const code = (extra) => describeUpload(view(extra), NOW).state.text;
  assert.equal(code({ health: { code: 'disconnected' } }), '连接中断 · 显示上次记录');
  assert.equal(code({ health: { code: 'read_failed' } }), '进度读取失败 · 显示上次记录');
  assert.equal(code({ health: { code: 'heartbeat_stale' } }), '执行状态未知 · 心跳已过期');
  assert.equal(code({ health: { code: 'ok', waitReason: 'rate_limit' } }), '限流等待');
  assert.equal(code({ health: { code: 'ok', waitReason: 'network_wait' } }), '等待网络');
  assert.equal(code({ health: { code: 'ok', lifecycle: 'paused' } }), '已暂停');
  assert.equal(code({ ask: { question: 'x' } }), '等你在对话里回复');
  assert.equal(code({ health: { code: 'ok', lastProgressAt: NOW - 5000 } }), '正在上传');
  assert.equal(code({ health: { code: 'ok', lastProgressAt: NOW - 10 * 60 * 1000 }, progress: progress({ written: 2 }) }), '核验中');
  assert.equal(code({ health: { code: 'ok', lastProgressAt: 0 } }), '上传脚本在线');
  assert.equal(code({ running: false, health: { code: 'ok', lastProgressAt: 0 } }), '暂无进展');
});

test('心跳只说明还在上报，不能标成“正在上传”', () => {
  const fresh = describeUpload(view({ health: { code: 'ok', heartbeatAt: NOW - 500, lastProgressAt: NOW - 30 * 60 * 1000 } }), NOW);
  assert.equal(fresh.state.text, '上传脚本在线');
});

test('相对读取时间分档；读取失败保留旧时间且标陈旧', () => {
  assert.equal(describeUpload(view({ health: { code: 'ok', readAt: NOW - 3000 } }), NOW).readAgo.text, '刚刚读取');
  assert.equal(describeUpload(view({ health: { code: 'ok', readAt: NOW - 12000 } }), NOW).readAgo.text, '12 秒前读取');
  assert.equal(describeUpload(view({ health: { code: 'ok', readAt: NOW - 5 * 60 * 1000 } }), NOW).readAgo.text, '5 分钟前读取');

  const failed = describeUpload(view({ health: { code: 'read_failed', readAt: NOW - 5 * 60 * 1000 } }), NOW);
  assert.equal(failed.staleRead, true);
  assert.equal(failed.readAgo.text, '5 分钟前读取');
  assert.equal(failed.state.text, '进度读取失败 · 显示上次记录');
});

test('展开详情含全量计数（含零值）、来源与时间字段', () => {
  const detail = describeUpload(view({
    health: { code: 'ok', readAt: NOW - 12000, lastProgressAt: NOW - 5000, heartbeatAt: NOW - 1000, lifecycle: 'running', conflict: true },
    source: 'report_snapshot'
  }), NOW);
  const labels = Array.from(detail.details, (row) => row.label);
  assert.deepEqual(labels.slice(0, 7), ['核验通过', '待上传', '待核验', '失败', '不确定', '不一致', '跳过']);
  assert.ok(labels.includes('进度来源'));
  assert.ok(labels.includes('上次成功读取'));
  assert.ok(labels.includes('最后进展'));
  assert.ok(labels.includes('心跳'));
  assert.ok(labels.includes('执行状态'));
  assert.ok(labels.includes('记录冲突'));
  assert.equal(detail.details.find((row) => row.label === '进度来源').value, '兼容检测 · 报告快照');
  assert.equal(detail.details.find((row) => row.label === '跳过').value, '0');
});

test('没有 progress 就不出这块；不暴露路径或正文', () => {
  assert.equal(describeUpload({ phase: 'upload' }, NOW), null);
  const detail = describeUpload(view({ health: { code: 'ok', readAt: NOW, lastProgressAt: NOW, heartbeatAt: NOW, lifecycle: 'running', journalPath: 'C:/secret/journal.json' } }), NOW);
  const text = JSON.stringify(detail);
  assert.equal(text.includes('journal'), false);
  assert.equal(text.includes('C:/'), false);
});
