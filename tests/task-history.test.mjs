import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { createState, selectRegisteredTask } from '../status.js';

const source = readFileSync(new URL('../client.js', import.meta.url), 'utf8');
const start = source.indexOf('    function UploadTaskHistory(');
const end = source.indexOf('    function clockText(', start);
const render = vm.runInNewContext(source.slice(start, end) + '\nUploadTaskHistory', {
  h: (tag, props, ...children) => ({ tag, props, children }),
  fill: (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key])
});
const t = key => ({ 'progress.history': '更多 · 历史任务（{n}）',
  'progress.uploaded': '已上传 {n}/{total}', 'progress.task': '任务 {n}：{state}',
  'progress.complete': '全部核验通过' }[key] || key);
const task = (taskId, startedAt, total) => ({ taskId, startedAt, phase: 'done',
  progress: { uploaded: total, total }, health: { lifecycle: 'completed' } });

test('only the latest task owns the main view, even when older work is running', () => {
  const latest = task('new', 20, 1);
  const old = { ...task('old', 10, 77), health: { lifecycle: 'running' } };
  assert.equal(selectRegisteredTask([old, latest], createState()), latest);
});

test('history is collapsed by default, excludes the main task and sorts newest first', () => {
  const newest = task('new', 30, 1), middle = task('middle', 20, 49), old = task('old', 10, 77);
  const tasks = [old, newest, middle];
  const tree = render({ view: { ...newest, tasks }, t });
  assert.equal(tree.tag, 'details');
  assert.equal(tree.props.open, undefined);
  assert.equal(tree.children[0].children[0], '更多 · 历史任务（2）');
  const rows = tree.children[1].children[0];
  assert.equal(rows.length, 2);
  assert.match(rows[0].children[0], /49\/49/);
  assert.match(rows[1].children[0], /77\/77/);
  assert.deepEqual(tasks, [old, newest, middle]);
});

test('single-task view needs no history control; a new workflow can retain prior uploads', () => {
  const only = task('only', 10, 77);
  assert.equal(render({ view: { ...only, tasks: [only] }, t }), null);
  assert.equal(render({ view: {}, t }), null);
  const tree = render({ view: { phase: 'working', tasks: [only] }, t });
  assert.equal(tree.children[0].children[0], '更多 · 历史任务（1）');
});
