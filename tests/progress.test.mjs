import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { EventEmitter } from 'node:events';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { summarizeJournal, combineJournals, identityDigest, registeredView, RegistrationReader, registryRoots } from '../progress.js';
import { apply } from '../index.js';
import { createState, foldEvent, publicView, journalPathIn, applyJournal, selectRegisteredTask } from '../status.js';

const fixture = JSON.parse(await readFile(new URL('./fixtures/upload-progress.json', import.meta.url), 'utf8'));
const clone = x => structuredClone(x);
const uid = '22222222-2222-4222-8222-222222222222';
const now = Date.parse('2026-11-04T14:22:00Z');

test('new turn retires completed registrations without hiding live background work', () => {
  const state = createState();
  foldEvent(state, { type: 'turn/start', time: now });
  const old = { taskId: 'old', startedAt: now - 10000, updatedAt: now - 1000,
    phase: 'done', health: { lifecycle: 'completed', heartbeatAt: now - 1000 } };
  assert.equal(selectRegisteredTask([old], state), undefined);
  foldEvent(state, { type: 'turn/end', time: now + 100 });
  assert.equal(selectRegisteredTask([old], state), undefined);
  for (const lifecycle of ['running', 'paused']) {
    const live = { ...old, phase: 'progress_unavailable', health: { lifecycle, code: 'heartbeat_stale' } };
    assert.equal(selectRegisteredTask([old, live], state), live);
  }
  const fresh = { ...old, taskId: 'new', startedAt: now + 1000 };
  assert.equal(selectRegisteredTask([fresh, old], state), fresh);
  assert.equal(selectRegisteredTask([old], createState()), old); // restart, before a later turn
});

test('completed legacy upload starts a new flow from cached skill references', () => {
  const state = createState();
  foldEvent(state, { type: 'turn/start', time: now - 5000 });
  foldEvent(state, { type: 'tool/call', time: now - 4000,
    data: { name: 'skill', arguments: { name: 'memo-cardest' } } });
  state.task.journalPath = 'C:/old/journal.json';
  state.task.progress = { total: 77, uploaded: 77, verified: 77 };
  foldEvent(state, { type: 'turn/end', time: now - 1000 });
  foldEvent(state, { type: 'turn/start', time: now });
  assert.equal(publicView(state, now).phase, 'idle');
  foldEvent(state, { type: 'tool/call', time: now + 1, data: { name: 'read',
    arguments: { file_path: 'C:/skills/memo-cardest/references/source-preflight.md' } } });
  const view = publicView(state, now + 1);
  assert.equal(view.phase, 'working');
  assert.equal(view.stage, 'source');
  assert.equal(view.progress, undefined);
  assert.equal(state.task.journalPath, undefined);
});

test('host keeps old completed upload in history while the new workflow takes the island', async t => {
  const dir = await temp(t);
  const journal = path.join(dir, 'journal.json');
  await writeFile(journal, JSON.stringify(fixture.sample96));
  await writeFile(path.join(dir, uid + '.json'), JSON.stringify(meta(fixture.sample96,
    { journals: [journal], lifecycle: 'completed' })));
  const future = Date.now() + 1000;
  const events = [{ type: 'turn/start', time: future, seq: 1 },
    { type: 'tool/call', seq: 2, time: future + 1, data: { name: 'skill', arguments: { name: 'memo-cardest' } } }];
  const h = host(t, dir, events);
  const view = await h.request();
  assert.equal(view.phase, 'working');
  assert.equal(view.stage, 'start');
  assert.equal(view.progress, undefined);
  assert.equal(view.tasks.length, 1);
  assert.equal(view.tasks[0].phase, 'done');
  assert.equal((await h.request()).phase, 'working'); // registry reread cannot resurrect old upload
});
function meta(j, overrides = {}) {
  return { protocol_version: 1, task_uuid: uid, task_id: j.task_id, identity_digest: identityDigest(j),
    session_id: 'session-fixture', total: j.items.length, started_at: '2026-11-04T14:17:00Z',
    heartbeat_at: new Date(now).toISOString(), lifecycle: 'running', execution: {}, ...overrides };
}
function atTime(j, time) {
  const copy = clone(j);
  for (const i of copy.items) {
    i.history = i.history.filter(e => Date.parse(e.at) <= time);
    i.status = i.history.at(-1).state;
    if (!i.history.some(e => e.state === 'written')) i.bound_card_id = i.expected.card_id;
    if (!['verified', 'mismatch'].includes(i.status)) i.verification = null;
  }
  return copy;
}
async function temp(t) {
  const dir = await mkdtemp(path.join(tmpdir(), 'memo-progress-test-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  return dir;
}
function host(t, root, events = []) {
  let route;
  const listeners = {}, dispose = [];
  const ctx = { on(n, f) { listeners[n] = f; }, effect(f) { const d = f(); if (typeof d === 'function') dispose.push(d); },
    sessions: { get() { return { snapshotEvents: () => events }; } }, get() {},
    webServer: { register(r) { if (r.path === '/memo-island/status') route = r; return () => {}; } } };
  apply(ctx, { progressRegistry: root });
  t.after(() => dispose.forEach(f => f()));
  return { listeners, async request(query = 'sessionId=session-fixture') {
    const req = new EventEmitter(); req.url = '/memo-island/status?' + query;
    let output;
    await route.handler(req, { writeHead(n) { assert.equal(n, 200); }, end(b) { output = JSON.parse(b); } });
    return output.value;
  } };
}

test('host exposes workflow and registered upload independently in the same response', async t => {
  const dir = await temp(t);
  const journal = path.join(dir, 'journal.json');
  const pending = atTime(fixture.sample96, Date.parse('2026-11-04T14:18:00Z'));
  await writeFile(journal, JSON.stringify(pending));
  await writeFile(path.join(dir, uid + '.json'), JSON.stringify(meta(pending,
    { journals: [journal], lifecycle: 'running', heartbeat_at: new Date().toISOString() })));
  const time = Date.now();
  const h = host(t, dir, [{ type: 'turn/start', time, seq: 1 },
    { type: 'tool/call', time: time + 1, seq: 2, data: { name: 'skill', arguments: { name: 'memo-cardest' } } },
    { type: 'tool/call', time: time + 2, seq: 3, data: { name: 'read', arguments: {
      file_path: 'C:/skills/memo-cardest/references/design-toolbox.md' } } }]);
  const view = await h.request();
  assert.equal(view.workflow.phase, 'working');
  assert.equal(view.workflow.stage, 'design');
  assert.equal(view.workflow.progress, undefined);
  assert.equal(view.uploads.length, 1);
  assert.equal(view.uploads[0].taskId, uid);
  assert.equal(view.uploads[0].progress.total, 96);
  assert.equal(view.uploads[0].health.lifecycle, 'running');
});

test('96-card actual history: hidden path produces snapshot, explicit journal gives 96', () => {
  const state = createState();
  foldEvent(state, { type: 'turn/start', seq: 1, time: now, data: {} });
  fixture.events96.forEach(e => foldEvent(state, e));
  assert.equal(state.task.journalPath, undefined);
  assert.equal(state.task.progress.written, 16);
  assert.equal(state.task.progress.uploaded, null); // honest compatibility snapshot
  applyJournal(state, fixture.sample96, now);
  const view = publicView(state, now);
  assert.equal(view.progress.uploaded, 96);
  assert.equal(view.progress.verified, 96);
  assert.equal(view.phase, 'done');
});

test('actual initial GET failure preserved: 16 uploaded, zero verified', () => {
  const j = atTime(fixture.sample96, Date.parse('2026-11-04T14:18:15Z'));
  assert.equal(summarizeJournal(j).uploaded, 16);
  assert.equal(summarizeJournal(j).verified, 0);
});

test('explicit 200+18 continuation deduplicates; two-card retest is not blindly added', () => {
  const [root, child, retest] = fixture.sample200;
  const merged = combineJournals([root, child]);
  assert.equal(summarizeJournal(merged).total, 200);
  assert.equal(summarizeJournal(merged).verified, 200);
  assert.throws(() => combineJournals([root, child, retest]));
});

test('failure, skipped and unknown are never uploaded; mismatch retains actual receipt', () => {
  const j = clone(fixture.sample96); j.items = j.items.slice(0, 4);
  ['failed', 'skipped', 'uncertain', 'mismatch'].forEach((state, n) => {
    const i = j.items[n]; i.status = state;
    i.history = [{ state: 'planned', at: i.history[0].at }, ...(state === 'mismatch' ? [{ state: 'written', at: i.history[1].at }] : []), { state, at: i.history.at(-1).at }];
    if (state === 'mismatch') i.verification.differences = { content: {} };
  });
  assert.equal(summarizeJournal(j).uploaded, 1);
  const v = registeredView(meta(j, { lifecycle: 'partial' }), j, { code: 'ok' }, now);
  assert.equal(v.phase, 'partial');
});

test('all writes before verification is verifying, not done; readback-only has no fake receipt', () => {
  const j = clone(fixture.sample96);
  for (const i of j.items) { i.history = i.history.filter(e => e.state !== 'verified'); i.status = 'written'; i.verification = null; }
  assert.equal(registeredView(meta(j), j, { code: 'ok' }, now).phase, 'verifying');
  const readback = clone(fixture.sample96);
  readback.items[0].history = readback.items[0].history.filter(e => e.state !== 'written');
  assert.equal(summarizeJournal(readback).uploaded, 95);
  assert.equal(summarizeJournal(readback).readbackConfirmed, 1);
});

test('pause, stale heartbeat and read failure hide ETA and never claim success', () => {
  const j = atTime(fixture.sample96, Date.parse('2026-11-04T14:19:10Z'));
  for (const [overrides, health] of [[{ lifecycle: 'paused' }, { code: 'ok' }], [{ heartbeat_at: '2020-01-01' }, { code: 'ok' }], [{}, { code: 'journal_read_failed' }]]) {
    const v = registeredView(meta(j, overrides), j, health, now);
    assert.equal(v.progress.etaMs, null);
    assert.notEqual(v.phase, 'done');
  }
});

test('ETA uses recent unique receipts and does not multiply by concurrency', () => {
  const time = Date.parse('2026-11-04T14:19:20Z');
  const j = atTime(fixture.sample96, time);
  const m = meta(j, { heartbeat_at: new Date(time).toISOString() });
  const one = registeredView(m, j, { code: 'ok' }, time);
  const many = registeredView({ ...m, execution: { concurrency: 8 } }, j, { code: 'ok' }, time);
  assert.ok(one.progress.etaMs > 0);
  assert.equal(one.progress.etaMs, many.progress.etaMs);
  assert.equal(one.progress.etaBasis, 'recent');
});

test('relative legacy path only when workdir is known', () => {
  assert.equal(journalPathIn('python report --journal journal.json'), '');
  assert.equal(journalPathIn('python report --journal journal.json', tmpdir()), path.join(tmpdir(), 'journal.json'));
  assert.equal(journalPathIn('python report --journal $x', tmpdir()), '');
});

test('registered source restores without skill calls, survives host restart, wakes long poll', async t => {
  const dir = await temp(t), file = path.join(dir, 'cards.json');
  const j = atTime(fixture.sample96, Date.parse('2026-11-04T14:18:15Z'));
  await writeFile(file, JSON.stringify(j));
  const m = meta(j, { journals: [file], heartbeat_at: new Date().toISOString(), lifecycle: 'running' });
  await writeFile(path.join(dir, uid + '.json'), JSON.stringify(m));
  const a = host(t, dir);
  const first = await a.request(); assert.equal(first.progress.uploaded, 16);
  const pending = a.request(`sessionId=session-fixture&wait=1&rev=${first.rev}&instance=${first.instanceId}`);
  const started = Date.now();
  await new Promise(resolve => setTimeout(resolve, 50)); // let the long poll actually register its waiter
  await writeFile(file, JSON.stringify(fixture.sample96));
  const updated = await pending;
  assert.equal(updated.progress.verified, 96);
  assert.ok(Date.now() - started < 5000);
  const restarted = await host(t, dir).request();
  assert.equal(restarted.progress.verified, 96);
  assert.notEqual(first.instanceId, restarted.instanceId);
  // Same journal can leave completed status after a fresh verification mismatch.
  const bad = clone(fixture.sample96); bad.items[0].status = 'mismatch';
  bad.items[0].history.push({ state: 'mismatch', at: new Date().toISOString() });
  bad.items[0].verification.differences = { content: {} };
  await writeFile(file, JSON.stringify(bad));
  const changed = await a.request();
  assert.equal(changed.progress.mismatch, 1); assert.notEqual(changed.phase, 'done');
  assert.equal(changed.progress.uploaded, 96);
  const publicJson = JSON.stringify(changed);
  assert.ok(!publicJson.includes(file)); assert.ok(!publicJson.includes('fixture w0'));
});

test('read failure retains last good count and recovery; separate tasks never sum', async t => {
  const dir = await temp(t), file = path.join(dir, 'cards.json');
  await writeFile(file, JSON.stringify(fixture.sample96));
  const m = meta(fixture.sample96, { journals: [file], lifecycle: 'completed' });
  await writeFile(path.join(dir, uid + '.json'), JSON.stringify(m));
  const reader = new RegistrationReader(dir);
  assert.equal((await reader.read('session-fixture')).tasks[0].progress.uploaded, 96);
  await writeFile(file, '{');
  let tasks = (await reader.read('session-fixture')).tasks;
  assert.equal(tasks[0].progress.uploaded, 96); assert.equal(tasks[0].health.code, 'journal_read_failed');
  await writeFile(file, JSON.stringify(fixture.sample96));
  const other = '33333333-3333-4333-8333-333333333333';
  await writeFile(path.join(dir, other + '.json'), JSON.stringify({ ...m, task_uuid: other }));
  tasks = (await reader.read('session-fixture')).tasks;
  assert.equal(tasks.length, 2); assert.equal(tasks[0].progress.total, 96);
  assert.equal(tasks[0].health.code, 'ok');
  assert.equal((await reader.read('session-other')).tasks.length, 0);
});

test('duplicates and unsafe successor rejected', () => {
  const j = clone(fixture.sample96); j.items.push(clone(j.items[0]));
  assert.throws(() => summarizeJournal(j), /duplicate/);
  const child = clone(fixture.sample96);
  for (const i of child.items) { i.history = i.history.slice(0, 1); i.status = 'planned'; i.bound_card_id = null; i.verification = null; }
  assert.throws(() => combineJournals([fixture.sample96, child]));
});

test('Python and JS identity digests agree on shared fixture', () => {
  const script = path.join(process.env.USERPROFILE || process.env.HOME, '.agents/skills/memo-cardest/scripts');
  const fixturePath = fileURLToPath(new URL('./fixtures/upload-progress.json', import.meta.url));
  const code = 'import sys,json;sys.path.insert(0,sys.argv[1]);from upload_task import identity_digest;print(identity_digest(json.load(open(sys.argv[2],encoding="utf-8"))["sample96"]))';
  const digest = execFileSync('python', ['-B', '-c', code, script, fixturePath], { encoding: 'utf8' }).trim();
  assert.equal(digest, identityDigest(fixture.sample96));
});

/* ── 登记发现协议：工作区目录、旧回退、重复 UUID ───────────────────────── */

async function workspaceRegistry(t, journalTime = Date.parse('2026-11-04T14:18:15Z')) {
  const ws = await temp(t);
  const dir = path.join(ws, '.memo-cardest', 'progress', 'v1', 'tasks');
  const journal = path.join(ws, 'cards.json');
  const j = atTime(fixture.sample96, journalTime);
  await writeFile(journal, JSON.stringify(j));
  return { ws, dir, journal, j };
}

test('workspace registry next to the workspace is discovered without config', async t => {
  const { ws, dir, journal, j } = await workspaceRegistry(t);
  await mkdir(dir, { recursive: true });
  const m = meta(j, { journals: [journal], heartbeat_at: new Date().toISOString(), lifecycle: 'running' });
  await writeFile(path.join(dir, uid + '.json'), JSON.stringify(m));
  const reader = new RegistrationReader(registryRoots({ workspaces: [ws] }));
  const view = (await reader.read('session-fixture')).tasks[0];
  assert.equal(view.taskId, uid);
  assert.equal(view.progress.uploaded, 16);
  assert.equal(view.phase, 'upload');
  assert.equal(view.health.conflict, false);
});

test('legacy workspace .progress/tasks stays readable; home default is last', async t => {
  const { ws, journal, j } = await workspaceRegistry(t);
  const legacy = path.join(ws, '.progress', 'tasks');
  await mkdir(legacy, { recursive: true });
  await writeFile(path.join(legacy, uid + '.json'), JSON.stringify(meta(j, { journals: [journal] })));
  const roots = registryRoots({ workspaces: [ws] });
  assert.equal(roots[0], path.join(ws, '.memo-cardest', 'progress', 'v1', 'tasks'));
  assert.equal(roots[1], legacy);
  const reader = new RegistrationReader(roots);
  assert.equal((await reader.read('session-fixture')).tasks[0].progress.total, 96);
});

test('same UUID in two roots counts once and surfaces the conflict', async t => {
  const { ws, dir, journal, j } = await workspaceRegistry(t);
  const legacy = path.join(ws, '.progress', 'tasks');
  await mkdir(dir, { recursive: true });
  await mkdir(legacy, { recursive: true });
  await writeFile(path.join(dir, uid + '.json'), JSON.stringify(meta(j, { journals: [journal], revision: 7 })));
  await writeFile(path.join(legacy, uid + '.json'), JSON.stringify(meta(j, { journals: [journal], revision: 3 })));
  const reader = new RegistrationReader(registryRoots({ workspaces: [ws] }));
  const { tasks } = await reader.read('session-fixture');
  assert.equal(tasks.length, 1);
  assert.equal(tasks[0].progress.total, 96);
  assert.equal(tasks[0].health.conflict, true);
});

test('host resolves workspace roots from the registry, not a fixed path', async t => {
  const { ws, dir, journal, j } = await workspaceRegistry(t);
  await mkdir(dir, { recursive: true });
  await writeFile(journal, JSON.stringify(fixture.sample96));
  await writeFile(path.join(dir, uid + '.json'), JSON.stringify(meta(fixture.sample96, { journals: [journal], lifecycle: 'completed' })));
  let route; const dispose = [];
  const ctx = {
    on() {}, effect(fn) { const d = fn(); if (typeof d === 'function') dispose.push(d); },
    sessions: { get() { return undefined; } },
    get(name) {
      if (name === 'workspaceRegistry') return { list: () => [{ path: ws }] };
      return undefined;
    },
    webServer: { register(r) { if (r.path === '/memo-island/status') route = r; return () => {}; } }
  };
  apply(ctx, {});
  t.after(() => dispose.forEach(fn => fn()));
  const req = new EventEmitter(); req.url = '/memo-island/status?sessionId=session-fixture';
  let out;
  await route.handler(req, { writeHead(n) { assert.equal(n, 200); }, end(b) { out = JSON.parse(b); } });
  assert.equal(out.value.phase, 'done');
  assert.equal(out.value.progress.verified, 96);
});

