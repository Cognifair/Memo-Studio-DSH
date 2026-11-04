/** Progress protocol v1. Card states only come from validated change journals. */
import { createHash } from 'node:crypto';
import { readFile, readdir, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';

const STATES = new Set(['planned', 'uncertain', 'written', 'verified', 'mismatch', 'failed', 'skipped']);
const MAX_BYTES = 32 * 1024 * 1024;
export const DEFAULT_REGISTRY_DIR = path.join(homedir(), '.memo-cardest', 'progress', 'v1', 'tasks');
export const registryDirectory = () => DEFAULT_REGISTRY_DIR;
/**
 * 工作区里的登记目录，脚本与宿主共同遵守：
 *   1. `<workspace>/.memo-cardest/progress/v1/tasks` —— 正式位置（沙箱里可写）；
 *   2. `<workspace>/.progress/tasks` —— 旧脚本用过的工作区回退位置，只读兼容。
 */
export function workspaceRegistryDirs(workspace) {
  return [
    path.join(workspace, '.memo-cardest', 'progress', 'v1', 'tasks'),
    path.join(workspace, '.progress', 'tasks'),
  ];
}
/** 组装发现顺序：显式指定 → 各工作区（含旧回退）→ 旧默认目录。去重、保序。 */
export function registryRoots({ explicit, workspaces = [] } = {}) {
  const roots = [];
  const add = (value) => {
    if (!value || typeof value !== 'string') return;
    const resolved = path.resolve(value);
    if (!roots.includes(resolved)) roots.push(resolved);
  };
  if (explicit) add(explicit);
  for (const workspace of workspaces) {
    if (typeof workspace === 'string' && workspace) for (const dir of workspaceRegistryDirs(workspace)) add(dir);
  }
  add(DEFAULT_REGISTRY_DIR);
  return roots;
}
const fail = (code) => { throw new Error(code); };
export function canonical(x) {
  if (Array.isArray(x)) return '[' + x.map(canonical).join(',') + ']';
  if (x && typeof x === 'object') return '{' + Object.keys(x).sort().map(k => JSON.stringify(k) + ':' + canonical(x[k])).join(',') + '}';
  return JSON.stringify(x);
}
const identity = i => ({ key: i.key, operation: i.operation, expected: i.expected });
const codePointOrder = (a, b) => {
  const aa = Array.from(a), bb = Array.from(b);
  for (let n = 0; n < Math.min(aa.length, bb.length); n++) {
    const d = aa[n].codePointAt(0) - bb[n].codePointAt(0);
    if (d) return d;
  }
  return aa.length - bb.length;
};
export function identityDigest(j) {
  return createHash('sha256').update(canonical({ account_alias: j.account_alias,
    items: j.items.map(identity).sort((a, b) => codePointOrder(a.key, b.key)) })).digest('hex');
}
export function validateJournal(j) {
  if (!j || j.schema_version !== 1 || typeof j.task_id !== 'string' || typeof j.account_alias !== 'string' || !Array.isArray(j.items) || !j.items.length) fail('invalid_journal');
  const keys = new Set(), targets = new Set();
  for (const i of j.items) {
    if (!i || typeof i.key !== 'string' || !i.key || keys.has(i.key)) fail('duplicate_or_invalid_key');
    keys.add(i.key);
    if (!['create', 'update', 'move'].includes(i.operation) || !STATES.has(i.status) || !i.expected ||
      typeof i.expected.content !== 'string' || !Number.isInteger(i.expected.grammar_version) || i.expected.grammar_version <= 0 ||
      !['deck_id', 'chapter_id'].every(k => typeof i.expected[k] === 'string' && i.expected[k])) fail('invalid_journal');
    if (!Array.isArray(i.history) || !i.history.length || i.history.at(-1).state !== i.status ||
      i.history.some(e => !STATES.has(e.state) || !Number.isFinite(Date.parse(e.at)))) fail('invalid_history');
    if (!Object.hasOwn(i, 'bound_card_id') || (i.bound_card_id !== null && (typeof i.bound_card_id !== 'string' || !i.bound_card_id))) fail('invalid_bound_id');
    if (i.operation !== 'create' && (i.bound_card_id !== i.expected.card_id || !i.bound_card_id)) fail('bound_identity_lost');
    if (['written', 'verified', 'mismatch'].includes(i.status) && !i.bound_card_id) fail('missing_bound_id');
    if (['verified', 'mismatch'].includes(i.status) && (!i.verification || i.verification.basis !== 'caller_supplied_get_snapshot' ||
      !i.verification.differences || (i.status === 'verified') !== (Object.keys(i.verification.differences).length === 0))) fail('invalid_verification');
    if (i.bound_card_id) {
      const target = canonical([i.expected.deck_id, i.bound_card_id]);
      if (targets.has(target)) fail('duplicate_target');
      targets.add(target);
    }
  }
  return j;
}
export function combineJournals(journals) {
  journals.forEach(validateJournal);
  const root = journals[0], items = new Map(root.items.map(i => [i.key, i]));
  const identities = new Map(root.items.map(i => [i.key, canonical(identity(i))]));
  for (const j of journals.slice(1)) {
    if (j.account_alias !== root.account_alias) fail('account_conflict');
    for (const i of j.items) {
      const old = items.get(i.key);
      if (!old || canonical(identity(i)) !== identities.get(i.key)) fail('identity_conflict');
      if (old.bound_card_id !== null && old.bound_card_id !== i.bound_card_id) fail('bound_identity_lost');
      if (['uncertain', 'written', 'verified', 'mismatch'].includes(old.status) &&
        (['planned', 'failed', 'skipped'].includes(i.status) || canonical(i.history.slice(0, old.history.length)) !== canonical(old.history))) fail('unsafe_successor');
      items.set(i.key, i);
    }
  }
  return validateJournal({ ...root, items: [...items.values()] });
}

export function summarizeJournal(j) {
  validateJournal(j);
  const p = { total: j.items.length, uploaded: 0, verified: 0, written: 0, failed: 0, skipped: 0,
    uncertain: 0, mismatch: 0, planned: 0, readbackConfirmed: 0, settled: 0, etaMs: null };
  for (const i of j.items) {
    p[i.status]++;
    const receipt = i.history.some(e => e.state === 'written');
    if (receipt) p.uploaded++;
    if (i.status === 'verified' && !receipt) p.readbackConfirmed++;
    if (['verified', 'failed', 'mismatch', 'skipped'].includes(i.status)) p.settled++;
  }
  p.sent = p.uploaded; // deprecated wire alias, never includes failed/uncertain/skipped
  return p;
}

function observedEta(j, state, now, startAt) {
  const times = j.items.map(i => {
    const events = i.history.filter(e => e.state === state);
    // Exactly one completion sample per logical card, not retries/repeated GETs.
    return events.length ? Date.parse(events[0].at) : NaN;
  }).filter(t => t >= Math.max(startAt, now - 60000) && t <= now).sort((a, b) => a - b);
  if (times.length < 5 || times.at(-1) - times[0] < 10000) return null;
  const mean = (times.at(-1) - times[0]) / (times.length - 1);
  if (now - times.at(-1) > Math.max(60000, 3 * mean)) return null;
  return (now - times[0]) / (times.length - 1);
}

export function registeredView(meta, journal, health, now = Date.now()) {
  const p = journal ? summarizeJournal(journal) : null;
  const heartbeatAt = Date.parse(meta.heartbeat_at) || 0;
  const stale = ['running', 'paused'].includes(meta.lifecycle) && now - heartbeatAt > 15000;
  const healthy = health.code === 'ok';
  let phase = 'partial';
  if (!healthy || stale) phase = 'progress_unavailable';
  else if (p && p.verified === p.total) phase = 'done';
  else if (meta.lifecycle === 'paused') phase = 'paused';
  else if (meta.lifecycle === 'running') {
    phase = p && p.planned === 0 && p.uncertain === 0 && p.failed === 0 && p.skipped === 0 && p.mismatch === 0 ? 'verifying' : 'upload';
  }
  const lastProgressAt = journal ? journal.items.reduce((latest, i) => i.history.reduce((at, e) => Math.max(at, Date.parse(e.at)), latest), 0) : 0;
  if (p && healthy && !stale && meta.lifecycle === 'running' && ['upload', 'verifying'].includes(phase)) {
    const verify = phase === 'verifying';
    const start = Math.max(Date.parse(meta.started_at) || 0, Date.parse(meta.sample_after) || 0, health.sampleAfter || 0);
    const msPerCard = observedEta(journal, verify ? 'verified' : 'written', now, start);
    const remaining = p.total - (verify ? p.verified : p.uploaded + p.readbackConfirmed);
    if (msPerCard && remaining > 0) { p.etaMs = Math.round(msPerCard * remaining); p.etaBasis = 'recent'; }
    else if (!verify && p.uploaded === 0 && p.readbackConfirmed === 0 && now - (Date.parse(meta.started_at) || 0) < 60000) {
      const e = meta.execution || {};
      if (Number.isFinite(e.request_interval_ms) && e.request_interval_ms >= 0) {
        const complete = ['write_requests', 'verify_requests', 'expected_latency_ms', 'concurrency'].every(k => Number.isFinite(e[k])) && e.concurrency >= 1 && e.write_requests >= p.total;
        const requests = complete ? e.write_requests + e.verify_requests : remaining;
        p.etaMs = Math.round(Math.max(0, requests - 1) * e.request_interval_ms);
        if (complete) p.etaMs = Math.round(Math.max(p.etaMs + e.expected_latency_ms, requests * e.expected_latency_ms / e.concurrency));
        p.etaBasis = complete ? 'configured' : 'lower_bound';
      }
    }
  }
  return { taskId: meta.task_uuid, protocolVersion: 1, phase, stage: 'upload', route: 'api',
    source: 'registered', startedAt: Date.parse(meta.started_at), updatedAt: lastProgressAt,
    running: meta.lifecycle === 'running' && !stale, progress: p,
    health: { code: healthy && stale ? 'heartbeat_stale' : health.code, readAt: health.readAt || null,
      lastProgressAt, heartbeatAt, lifecycle: meta.lifecycle, waitReason: meta.wait_reason || null,
      conflict: health.conflict === true },
    ...(phase === 'done' ? { deliverable: { kind: 'api', cards: p.verified } } : {}) };
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export class RegistrationReader {
  constructor(roots = [DEFAULT_REGISTRY_DIR]) {
    this.roots = [...new Set((Array.isArray(roots) ? roots : [roots]).map(r => path.resolve(r)))];
    this.root = this.roots[0];
    this.cache = new Map();
    this.last = new Map();
  }
  async json(file, now) {
    const info = await stat(file);
    if (!info.isFile() || info.size > MAX_BYTES) fail('record_too_large');
    const old = this.cache.get(file), fingerprint = `${info.mtimeMs}:${info.ctimeMs}:${info.size}:${info.ino}`;
    if (old && old.fingerprint === fingerprint && now - old.at < 30000) return old.value;
    const value = JSON.parse((await readFile(file, 'utf8')).replace(/^\uFEFF/, ''));
    this.cache.set(file, { fingerprint, at: now, value });
    if (this.cache.size > 256) this.cache.delete(this.cache.keys().next().value);
    return value;
  }
  /** 逐目录扫描，按任务 UUID 去重：先出现的目录优先，内容不一致时标记冲突。 */
  async discover(roots, now) {
    const files = [];
    const conflicts = new Set();
    let rootError = null;
    for (const root of roots) {
      let names;
      try { names = await readdir(root); }
      catch (e) {
        if (e.code === 'ENOENT') continue;
        rootError = rootError || 'registry_read_failed';
        continue;
      }
      for (const name of names.filter(n => uuidPattern.test(n.slice(0, -5)) && n.endsWith('.json')).sort()) {
        const id = name.slice(0, -5);
        const file = path.join(root, name);
        const first = files.find(f => f.id === id);
        if (!first) { files.push({ id, file }); continue; }
        try {
          if (canonical(await this.json(first.file, now)) !== canonical(await this.json(file, now))) conflicts.add(id);
        } catch { conflicts.add(id); }
      }
    }
    return { files, conflicts, rootError };
  }
  async read(sessionId, now = Date.now(), roots = this.roots) {
    const { files, conflicts, rootError } = await this.discover(roots, now);
    if (!files.length && rootError) return { tasks: this.retained(sessionId, rootError, now), error: rootError };
    const tasks = [];
    const seen = new Set();
    let registryError = rootError;
    for (const { id, file } of files) {
      seen.add(id);
      let meta;
      try {
        meta = await this.json(file, now);
        if (meta.protocol_version !== 1 || meta.task_uuid !== id || !Array.isArray(meta.journals) || !meta.journals.length || meta.journals.length > 64 ||
          !meta.journals.every(p => typeof p === 'string' && path.isAbsolute(p)) || new Set(meta.journals).size !== meta.journals.length ||
          !['running', 'paused', 'completed', 'partial', 'interrupted'].includes(meta.lifecycle)) fail('invalid_registration');
      } catch {
        const old = this.last.get(id);
        if (old?.meta.session_id === sessionId) tasks.push(registeredView(old.meta, old.journal, { ...old.health, code: 'registration_read_failed', conflict: conflicts.has(id) }, now));
        else registryError = registryError || 'registration_read_failed';
        continue;
      }
      if (meta.session_id !== sessionId) continue;
      const old = this.last.get(id);
      try {
        const journals = await Promise.all(meta.journals.map(p => this.json(p, now)));
        journals.forEach(validateJournal);
        if (identityDigest(journals[0]) !== meta.identity_digest || journals[0].items.length !== meta.total) fail('root_identity_changed');
        const journal = combineJournals(journals);
        // Ignore an obsolete read if the uploader switched session/run/journal generation meanwhile.
        this.cache.delete(file);
        const latest = await this.json(file, now);
        if (latest.run_id !== meta.run_id || latest.session_id !== meta.session_id || canonical(latest.journals) !== canonical(meta.journals)) {
          if (old?.meta.session_id === sessionId) tasks.push(registeredView(old.meta, old.journal, { ...old.health, code: 'registration_changed', conflict: conflicts.has(id) }, now));
          continue;
        }
        const wasStale = old && ['running', 'paused'].includes(old.meta.lifecycle) && now - Date.parse(old.meta.heartbeat_at) > 15000;
        const health = { code: 'ok', readAt: now, conflict: conflicts.has(id), sampleAfter: old && (old.health.code !== 'ok' || wasStale) ? now : old?.health.sampleAfter || 0 };
        this.last.set(id, { meta, journal, health });
        tasks.push(registeredView(meta, journal, health, now));
      } catch (e) {
        const allowed = ['identity_conflict', 'account_conflict', 'bound_identity_lost', 'unsafe_successor', 'root_identity_changed', 'duplicate_target', 'duplicate_or_invalid_key', 'invalid_journal', 'invalid_history', 'invalid_verification'];
        const health = { code: allowed.includes(e.message) ? e.message : 'journal_read_failed', readAt: old?.health.readAt || null, conflict: conflicts.has(id) };
        this.last.set(id, { meta, journal: old?.journal || null, health });
        tasks.push(registeredView(meta, old?.journal || null, health, now));
      }
    }
    for (const [id, old] of this.last) if (!seen.has(id) && old.meta.session_id === sessionId) {
      tasks.push(registeredView(old.meta, old.journal, { ...old.health, code: 'registration_missing' }, now));
    }
    tasks.sort((a, b) => b.startedAt - a.startedAt || a.taskId.localeCompare(b.taskId));
    if (this.last.size > 256) this.last.delete(this.last.keys().next().value);
    return { tasks, error: rootError };
  }
  retained(sessionId, code, now) {
    return [...this.last.values()].filter(x => x.meta.session_id === sessionId).map(x => registeredView(x.meta, x.journal, { ...x.health, code }, now));
  }
}
