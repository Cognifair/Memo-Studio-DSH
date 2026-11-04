/**
 * 入口 → 运行状态的纯函数测试（不依赖 DOM）。
 * 重点：共用 memo-cardest 的「批量删除」不能被一起点亮；断连时不假装在跑。
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const source = (await readFile(new URL('../client.js', import.meta.url), 'utf8')).replace(/\r\n/g, '\n');
const start = source.indexOf('    function skillRunState(');
const end = source.indexOf('\n    }', start) + '\n    }'.length;

const context = vm.createContext({
  SKILL_BY_ID: {
    'memo-cardest': { id: 'memo-cardest' },
    'memo-cardest-delete': { id: 'memo-cardest-delete', skillId: 'memo-cardest' },
    'memo-canvas': { id: 'memo-canvas' }
  }
});
vm.runInContext(source.slice(start, end) + '\nthis.fn = skillRunState;', context);
const run = context.fn;

const handout = { id: 'handout', skill: 'memo-cardest' };
const deleteEntry = { id: 'delete', skill: 'memo-cardest-delete', routeStage: 'delete' };
const table = { id: 'table', skill: 'memo-canvas' };

test('未在启用集合里 → 静态', () => {
  assert.equal(run(handout, { skills: [] }, 'connected'), 'none');
  assert.equal(run(handout, { skills: ['memo-canvas'] }, 'connected'), 'none');
  assert.equal(run(handout, null, 'connected'), 'none');
  assert.equal(run(null, { skills: ['memo-cardest'] }, 'connected'), 'none');
});

test('已启用 → 运行；等待 → 暂停；断连 → 未知', () => {
  const view = { skills: ['memo-cardest'] };
  assert.equal(run(handout, view, 'connected'), 'running');
  assert.equal(run(handout, { ...view, skillsPaused: true }, 'connected'), 'paused');
  assert.equal(run(handout, view, 'disconnected'), 'unknown');
});

test('共用 memo-cardest 的批量删除：没有删除路线证据就不亮', () => {
  const view = { skills: ['memo-cardest'], stage: 'write' };
  assert.equal(run(handout, view, 'connected'), 'running');
  assert.equal(run(deleteEntry, view, 'connected'), 'none');

  const routed = { skills: ['memo-cardest'], stage: 'delete' };
  assert.equal(run(deleteEntry, routed, 'connected'), 'running');
  assert.equal(run(handout, routed, 'connected'), 'running');
});

test('只看启用集合，不看选中或详情', () => {
  const view = { skills: ['memo-canvas'], selected: 'handout', task: { id: 'handout' } };
  assert.equal(run(handout, view, 'connected'), 'none');
  assert.equal(run(table, view, 'connected'), 'running');
});

test('旧宿主没有 skills 字段时退回静态', () => {
  assert.equal(run(handout, { phase: 'working' }, 'connected'), 'none');
  assert.equal(run(handout, { skills: 'memo-cardest' }, 'connected'), 'none');
});
