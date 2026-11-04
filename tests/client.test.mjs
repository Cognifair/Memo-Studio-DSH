import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const source = (await readFile(new URL('../client.js', import.meta.url), 'utf8')).replace(/\r\n/g, '\n');
const describeStart = source.indexOf('    function describeStatus(');
const describeEnd = source.indexOf('      return d;', describeStart) + '      return d;\n    }'.length;
const describe = vm.runInNewContext('(' + source.slice(describeStart, describeEnd) + ')', {
  fill: (s, values) => s.replace(/\{(\w+)\}/g, (_, k) => values[k]),
  clockText: () => '00:00', etaText: ms => String(ms), STAGE_STEP: { upload: 3 }
});
const labels = { 'progress.uploaded': 'Uploaded {n}/{total}', 'bubble.progress': 'Progress {sent}/{total}' };
const t = key => labels[key] || key;

test('main text, ring and accessible label share uploaded, never deprecated sent', () => {
  const d = describe({ phase: 'upload', source: 'registered', running: true,
    progress: { uploaded: 16, sent: 99, total: 96 }, health: { code: 'ok' } }, t, Date.now());
  assert.equal(d.text, 'Uploaded 16/96'); assert.equal(d.progress, 16 / 96);
  assert.equal(d.bubbleLabel, 'Progress 16/96');
});
test('unknown counts have no fake ring; stale state suppresses breathing', () => {
  const snapshot = describe({ phase: 'progress_unavailable', source: 'report_snapshot', progress: { uploaded: null, total: 96 }, health: { code: 'snapshot_only' } }, t, Date.now());
  assert.equal(snapshot.bubble, null);
  const stale = describe({ phase: 'progress_unavailable', source: 'registered', running: false, progress: { uploaded: 16, total: 96 }, health: { code: 'heartbeat_stale' } }, t, Date.now());
  assert.equal(stale.progress, 16 / 96); assert.equal(stale.pulse, 'none');
});

function harness() {
  const start = source.indexOf('    function statusUrl(');
  const end = source.indexOf('\n    /**', source.indexOf('    function useMemoStatus('));
  let state, effect, count = 0;
  const requests = [], timers = new Map();
  const context = vm.createContext({ URL, AbortController, Date, IDLE_STATUS: { phase: 'idle', rev: -1 }, STATUS_ROUTE: 'memo-island/status',
    document: { baseURI: 'http://fixture.local/proxy/' }, window: { location: { href: 'http://fixture.local/proxy/' } },
    React: { useState(initial) { state ??= initial; return [state, value => { state = typeof value === 'function' ? value(state) : value; }]; }, useEffect(fn) { effect = fn; } },
    setTimeout(fn, ms) { timers.set(++count, { fn, ms }); return count; }, clearTimeout(id) { timers.delete(id); },
    fetch(url, options) { return new Promise((resolve, reject) => { requests.push({ url, options, resolve, reject }); options.signal?.addEventListener('abort', () => reject(new Error('aborted'))); }); }
  });
  vm.runInContext(source.slice(start, end) + '\nthis.hook = useMemoStatus;', context);
  return { requests, timers, state: () => state, mount(id) { context.hook(id); return effect(); } };
}
const flush = async () => { for (let i = 0; i < 12; i++) await Promise.resolve(); };
const respond = (req, value) => req.resolve({ ok: true, json: async () => ({ ok: true, value, now: Date.now() }) });

test('long-poll carries host instance, failed connection retains counts, timeout aborts', async () => {
  const h = harness(), dispose = h.mount('session-one');
  respond(h.requests[0], { phase: 'upload', rev: 7, instanceId: 'host-a', progress: { uploaded: 16, total: 96 } });
  await flush();
  assert.equal(h.state().connection, 'connected');
  assert.equal(new URL(h.requests[1].url).searchParams.get('instance'), 'host-a');
  const timeout = [...h.timers.values()].find(x => x.ms === 35000); timeout.fn();
  await flush();
  assert.equal(h.state().connection, 'disconnected'); assert.equal(h.state().view.progress.uploaded, 16);
  const retry = [...h.timers.values()].find(x => x.ms === 5000); retry.fn(); await flush();
  respond(h.requests[2], { phase: 'done', rev: 1, instanceId: 'host-b', progress: { uploaded: 96, total: 96 } });
  await flush(); assert.equal(h.state().connection, 'connected'); assert.equal(h.state().view.progress.uploaded, 96);
  assert.equal(new URL(h.requests[3].url).searchParams.get('instance'), 'host-b');
  dispose();
});
test('late response from old session cannot overwrite newly selected session', async () => {
  const h = harness(), disposeA = h.mount('session-one');
  const old = h.requests[0]; disposeA();
  const disposeB = h.mount('session-two');
  respond(h.requests[1], { phase: 'upload', rev: 1, instanceId: 'host-a', progress: { uploaded: 2, total: 3 } });
  respond(old, { phase: 'done', rev: 99, progress: { uploaded: 96, total: 96 } });
  await flush(); assert.equal(h.state().view.progress.uploaded, 2);
  assert.equal(new URL(h.requests[2].url).searchParams.get('sessionId'), 'session-two'); disposeB();
});
