/**
 * 本轮启用指示 —— 状态折叠回放测试（脱敏，不依赖宿主）。
 *
 * 覆盖：单技能 / 多技能 / 重复加载 / 加载失败 / 普通工具结束 / 等待与恢复 /
 * 正常结束 / 取消 / 出错 / 新轮次 / 未知技能 / 读 SKILL.md / 历史回放不重新点亮。
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, foldEvent, publicView } from '../status.js';

function replay(events) {
  const state = createState();
  let clock = 1_700_000_000_000;
  for (const event of events) {
    clock += 1000;
    foldEvent(state, { time: clock, ...event });
  }
  return { state, view: publicView(state, clock) };
}

let seq = 0;
const nextSeq = () => ++seq;

const turnStart = () => ({ type: 'turn/start', seq: nextSeq(), data: {} });
const turnEnd = (kind = 'completed') => ({ type: 'turn/end', seq: nextSeq(), data: { reason: { kind } } });

const skillCall = (callId, name) => ({
  type: 'tool/call', seq: nextSeq(),
  data: { name: 'skill', callId, arguments: JSON.stringify({ name }) }
});
const skillResult = (callId, { error = false } = {}) => ({
  type: 'tool/result', seq: nextSeq(),
  data: {
    message: error
      ? { isError: true, source: { callId }, content: [] }
      : { source: { callId }, content: [{ type: 'text', text: 'loaded' }] }
  }
});
const readCall = (callId, filePath) => ({
  type: 'tool/call', seq: nextSeq(),
  data: { name: 'read', callId, arguments: JSON.stringify({ file_path: filePath }) }
});
const genericResult = (callId) => ({
  type: 'tool/result', seq: nextSeq(),
  data: { message: { source: { callId }, content: [{ type: 'text', text: 'done' }] } }
});
const genericCall = (callId) => ({
  type: 'tool/call', seq: nextSeq(),
  data: { name: 'pwsh', callId, arguments: JSON.stringify({ command: 'echo hi' }) }
});

test('加载请求本身不点亮，成功结果才点亮', () => {
  const pending = replay([turnStart(), skillCall('c1', 'memo-cardest')]).view;
  assert.deepEqual(pending.skills, []);
  const ok = replay([turnStart(), skillCall('c1', 'memo-cardest'), skillResult('c1')]).view;
  assert.deepEqual(ok.skills, ['memo-cardest']);
});

test('加载失败不点亮', () => {
  const view = replay([turnStart(), skillCall('c1', 'memo-cardest'), skillResult('c1', { error: true })]).view;
  assert.deepEqual(view.skills, []);
});

test('同一轮多个技能并存，重复成功只登记一次', () => {
  const view = replay([
    turnStart(),
    skillCall('c1', 'memo-cardest'), skillResult('c1'),
    skillCall('c2', 'memo-mineruocr'), skillResult('c2'),
    skillCall('c3', 'memo-cardest'), skillResult('c3')
  ]).view;
  assert.deepEqual([...view.skills].sort(), ['memo-cardest', 'memo-mineruocr']);
  assert.equal(view.skillsRev, 2);
});

test('普通工具完成不结束动画；等待批准暂停、恢复后继续', () => {
  const base = [turnStart(), skillCall('c1', 'memo-cardest'), skillResult('c1')];
  const afterTool = replay([...base, genericCall('t1'), genericResult('t1')]).view;
  assert.deepEqual(afterTool.skills, ['memo-cardest']);
  assert.equal(afterTool.skillsPaused, false);

  const waiting = replay([...base, { type: 'approval/asked', seq: nextSeq(), data: { id: 'a1', toolName: 'write' } }]).view;
  assert.equal(waiting.phase, 'approval');
  assert.equal(waiting.skillsPaused, true);

  const resumed = replay([
    ...base,
    { type: 'approval/asked', seq: nextSeq(), data: { id: 'a1', toolName: 'write' } },
    { type: 'approval/decided', seq: nextSeq(), data: { id: 'a1' } }
  ]).view;
  assert.equal(resumed.skillsPaused, false);
  assert.deepEqual(resumed.skills, ['memo-cardest']);
});

test('本轮结束、取消、出错都清空；新轮次也清空', () => {
  const base = [turnStart(), skillCall('c1', 'memo-cardest'), skillResult('c1')];
  for (const kind of ['completed', 'cancel', 'error']) {
    const view = replay([...base, turnEnd(kind)]).view;
    assert.deepEqual(view.skills, []);
  }
  // 任务还没收尾：下一轮主技能继续在岗（本轮自己的集合已经清空，剩下的是隐式在岗）
  const next = replay([...base, turnEnd('completed'), turnStart()]).view;
  assert.deepEqual(next.skills, ['memo-cardest']);
  assert.equal(next.turn, 2);
});

test('未知技能名和错误路径不登记', () => {
  const view = replay([
    turnStart(),
    skillCall('c1', 'memo-unknown-skill'), skillResult('c1'),
    readCall('r1', 'C:/work/skills/memo-unknown/SKILL.md'), genericResult('r1')
  ]).view;
  assert.deepEqual(view.skills, []);
});

test('成功读取技能目录里的 SKILL.md 也算明确加载', () => {
  const ok = replay([
    turnStart(),
    readCall('r1', 'C:\\Users\\x\\.dsh\\skills\\memo-canvas\\SKILL.md'), genericResult('r1')
  ]).view;
  assert.deepEqual(ok.skills, ['memo-canvas']);

  const failed = replay([
    turnStart(),
    readCall('r2', 'C:\\Users\\x\\.dsh\\skills\\memo-canvas\\SKILL.md'),
    { type: 'tool/result', seq: nextSeq(), data: { message: { isError: true, source: { callId: 'r2' }, content: [] } } }
  ]).view;
  assert.deepEqual(failed.skills, []);
});

test('旧技能名映射到现在的 id', () => {
  const view = replay([
    turnStart(),
    skillCall('c1', 'memo-txtimporter'), skillResult('c1'),
    skillCall('c2', 'memo-ankitransfer'), skillResult('c2')
  ]).view;
  assert.deepEqual([...view.skills].sort(), ['memo-ankigo', 'memo-txt']);
});

test('历史回放：已结束的轮次不会重新点亮', () => {
  const history = [
    turnStart(), skillCall('c1', 'memo-cardest'), skillResult('c1'), turnEnd('completed'),
    turnStart(), skillCall('c2', 'memo-canvas'), skillResult('c2'), turnEnd('completed')
  ];
  const view = replay(history).view;
  assert.deepEqual(view.skills, []);
  assert.equal(view.turn, 2);
});

test('乱序与重复 seq 不影响启用集合', () => {
  const state = createState();
  foldEvent(state, { ...turnStart(), time: 1 });
  foldEvent(state, { ...skillCall('c1', 'memo-cardest'), time: 1 });
  const stale = { ...skillResult('c1'), seq: 1, time: 1 };
  foldEvent(state, stale);
  assert.deepEqual(publicView(state, Date.now()).skills, []);
  foldEvent(state, { ...skillResult('c1'), time: 1 });
  assert.deepEqual(publicView(state, Date.now()).skills, ['memo-cardest']);
});

test('读技能自己的 references 文档也算这条技能在干活（路径必须落在该技能目录）', () => {
  const ok = replay([
    turnStart(),
    readCall('r1', 'C:\\Users\\x\\.dsh\\skills\\memo-cardest\\references\\design-toolbox.md'), genericResult('r1')
  ]).view;
  assert.deepEqual(ok.skills, ['memo-cardest']);

  const outside = replay([
    turnStart(),
    readCall('r2', 'C:\\Users\\x\\project\\references\\design-toolbox.md'), genericResult('r2')
  ]).view;
  assert.deepEqual(outside.skills, []);
  assert.equal(outside.skillsPaused === true, false);
});

// 一个已经存在的“墨卡大师任务”：第一轮加载过主技能，轮次结束后任务仍在
const startedTask = () => [
  turnStart(),
  skillCall('seed', 'memo-cardest'), skillResult('seed'),
  turnEnd('completed')
];

const memoScript = (callId) => ({
  type: 'tool/call', seq: nextSeq(),
  data: { name: 'pwsh', callId, arguments: JSON.stringify({ command: 'python C:/work/memo-cardest/scripts/check_updates.py' }) }
});

test('本轮在干墨卡大师的活：主技能整轮点亮，不要求这一轮重新加载', () => {
  const view = replay([...startedTask(), turnStart(), memoScript('p1')]).view;
  assert.equal(view.turn, 2);
  assert.ok(view.skills.includes('memo-cardest'));
});

test('任务还开着：新一轮即使没重新加载，主技能也算在岗', () => {
  const view = replay([
    ...startedTask(),
    turnStart(),
    { type: 'tool/call', seq: nextSeq(), data: { name: 'pwsh', callId: 'p2', arguments: JSON.stringify({ command: 'echo hi' }) } }
  ]).view;
  assert.deepEqual(view.skills, ['memo-cardest']);
});

test('主技能随轮次结束一起熄灭', () => {
  const view = replay([...startedTask(), turnStart(), memoScript('p3'), turnEnd('completed')]).view;
  assert.deepEqual(view.skills, []);
});

test('支线技能显式加载 + 主技能隐式在岗，同时点亮', () => {
  const view = replay([
    ...startedTask(),
    turnStart(),
    skillCall('c1', 'memo-mineruocr'), skillResult('c1'),
    memoScript('p4')
  ]).view;
  assert.deepEqual(view.skills.slice().sort(), ['memo-cardest', 'memo-mineruocr']);
});

test('任务收尾之后的新轮次不再点亮主技能', () => {
  const view = replay([
    ...startedTask(),
    turnStart(),
    { type: 'tool/call', seq: nextSeq(), data: { name: 'pwsh', callId: 'p9', arguments: JSON.stringify({ command: 'echo hi' }) } },
    turnEnd('completed'),
    turnStart()
  ]).view;
  assert.deepEqual(view.skills, []);
});
