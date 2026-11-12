import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../client.js', import.meta.url), 'utf8');
const start = source.indexOf('    function progressUploadTasks(');
const end = source.indexOf('    function UploadTaskHistory(', start);
const storage = new Map();
const context = vm.createContext({ window: { localStorage: { getItem: key => storage.get(key) || null } } });
vm.runInContext(source.slice(start, end), context);
const latest = { taskId: 'new', startedAt: 30, phase: 'upload', running: true,
  progress: { uploaded: 2, total: 49, etaMs: 12000 }, health: { code: 'ok' } };
const previous = { ...latest, taskId: 'old', startedAt: 10, phase: 'done',
  progress: { uploaded: 77, total: 77 } };
const raw = { ...latest, workflow: { phase: 'working', stage: 'design', running: true },
  uploads: [previous, latest], tasks: [previous, latest], skills: ['memo-cardest'], turn: 3 };

test('workflow and API mode use independent projections without changing the original data', () => {
  const workflow = context.projectProgressView(raw, { mode: 'workflow' }, 'connected');
  assert.equal(workflow.phase, 'working');
  assert.equal(workflow.stage, 'design');
  assert.equal(workflow.progress, undefined);
  const upload = context.projectProgressView(raw, { mode: 'upload', taskId: '' }, 'connected');
  assert.equal(upload.taskId, 'new');
  assert.equal(upload.progress.uploaded, 2);
  const old = context.projectProgressView(raw, { mode: 'upload', taskId: 'old' }, 'connected');
  assert.equal(old.taskId, 'new');
  assert.equal(old.progress.uploaded, 2);
  assert.equal(raw.progress.uploaded, 2);
  assert.equal(raw.uploads[0].taskId, 'old');
  assert.equal(old.skills[0], 'memo-cardest');
});

test('legacy task selections are ignored; empty and unreadable remain distinct', () => {
  const missing = context.projectProgressView(raw, { mode: 'upload', taskId: 'removed' }, 'connected');
  assert.equal(missing.taskId, 'new');
  assert.equal(missing.progress.uploaded, 2);
  const empty = context.projectProgressView({ uploads: [], workflow: { phase: 'idle' } }, { mode: 'upload' }, 'connected');
  assert.equal(empty.monitorEmpty, true);
  const unreadable = context.projectProgressView({ uploads: [], health: { code: 'registry_read_failed' } },
    { mode: 'upload' }, 'connected');
  assert.equal(unreadable.phase, 'progress_unavailable');
  assert.notEqual(unreadable.monitorEmpty, true);
});

test('disconnect and refreshing apply to the selected projection and suppress ETA', () => {
  for (const connection of ['disconnected', 'refreshing']) {
    const view = context.projectProgressView(raw, { mode: 'upload', taskId: 'new' }, connection);
    assert.equal(view.running, false);
    assert.equal(view.progress.etaMs, null);
    assert.equal(view.health.code, connection);
    assert.equal(view.progress.uploaded, 2);
  }
  assert.equal(raw.progress.etaMs, 12000);
});

test('API upload starts switch to upload; a new workflow after completion switches back', () => {
  const active = { taskId: 'up1', startedAt: 40, phase: 'upload', running: true };
  const before = { workflow: { taskId: 'wf1', startedAt: 10 }, uploads: [active], turn: 3 };
  let baseline = { activeUploadId: null, workflowKey: null };
  let next = context.autoProgressSelection(baseline, before);
  assert.equal(next.mode, 'upload');
  assert.equal(next.activeUploadId, 'up1');
  baseline = next;
  assert.equal(context.autoProgressSelection(baseline, before), null);

  const done = { ...active, phase: 'done', running: false };
  const sameWorkflow = { ...before, uploads: [done] };
  assert.equal(context.autoProgressSelection(baseline, sameWorkflow), null);

  const newWorkflow = { workflow: { taskId: 'wf2', startedAt: 90 }, uploads: [done], turn: 4 };
  next = context.autoProgressSelection(baseline, newWorkflow);
  assert.equal(next.mode, 'workflow');
  assert.equal(next.activeUploadId, null);
});

test('saved selection is isolated by session and invalid storage falls back to workflow', () => {
  storage.set('memo-skill-island:progress-view:session-one', JSON.stringify({ mode: 'upload', taskId: 'old' }));
  assert.equal(context.readProgressSelection('session-one').taskId, undefined);
  assert.equal(context.readProgressSelection('session-two').mode, 'workflow');
  assert.equal(context.readProgressSelection('session-two').taskId, undefined);
  storage.set('memo-skill-island:progress-view:session-two', '{broken');
  assert.equal(context.readProgressSelection('session-two').mode, 'workflow');
  context.window.localStorage.getItem = () => { throw Error('blocked'); };
  assert.equal(context.readProgressSelection('session-one').mode, 'workflow');
});

test('manual choice survives reload, session switch and unavailable storage', () => {
  let state;
  let effect;
  context.window.localStorage = {
    getItem: key => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, value)
  };
  context.React = {
    useState(initial) {
      if (state === undefined) state = initial();
      return [state, next => { state = next; }];
    },
    useEffect(fn) { effect = fn; }
  };
  let pair = context.useProgressSelection('new-session');
  assert.equal(pair[0].mode, 'workflow');
  pair[1]({ mode: 'upload', taskId: 'old' });
  state = undefined; // new component mount
  pair = context.useProgressSelection('new-session');
  assert.equal(pair[0].mode, 'upload');
  assert.equal(pair[0].taskId, undefined);
  pair = context.useProgressSelection('other-session');
  assert.equal(pair[0].mode, 'workflow'); // no one-frame leak before the effect
  effect();
  pair = context.useProgressSelection('new-session');
  assert.equal(pair[0].mode, 'upload');
  effect();
  context.window.localStorage.setItem = () => { throw Error('quota'); };
  pair[1]({ mode: 'workflow' });
  assert.equal(context.useProgressSelection('new-session')[0].mode, 'workflow');
});
