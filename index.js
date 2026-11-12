/**
 * 墨卡大师灵动岛 —— 宿主半边。
 *
 * 职责：听会话事件，把墨卡大师的进度折叠成一份很小的状态（status.js），用一条只读路由递给岛。
 * 浏览器那一半看不到会话日志，所以折叠只能在宿主做；路由只回状态摘要（阶段、计数、短文案），
 * 不回卡片正文、命令输出或凭证。
 *
 * 路由：GET {base}/memo-island/status?sessionId=…&rev=…&wait=1
 *   - rev 与当前一致且 wait=1 时挂起，直到状态变化或 25 秒，减少轮询；
 *   - 不认识的会话回 idle。
 *
 * 纪律（与 dsh-memo-cardest-map 一致）：apply() 绝不抛错；观察者绝不打断日志；只读、只在内存里。
 */
import { randomUUID } from 'node:crypto';
import { RegistrationReader, registryRoots } from './progress.js';
import { stat, readFile, lstat } from 'node:fs/promises';
import { createState, foldEvent, publicView, applyJournal, pendingPreviousJournals, applyCarried } from './status.js';
import { createUpdateChecker } from './update.js';
import { resolveUpdateConfig } from './update-config.js';

const ROUTE_PATH = '/memo-island/status';
/** 更新检查：只读，返回版本与发布说明；不碰本地文件。 */
const UPDATE_ROUTE_PATH = '/memo-island/update';
/** 长轮询挂起上限。 */
const WAIT_MS = 25000;
/** 内存里最多跟踪多少个会话。 */
const MAX_SESSIONS = 48;
/** 只有这些事件会影响状态；其他事件（流式输出、用量……）一概不看。 */
const RELEVANT = new Set(['turn/start', 'turn/end', 'tool/call', 'tool/result', 'approval/asked', 'approval/decided']);
/** 读变更清单的间隔：只看修改时间，没变就不读。 */
const JOURNAL_POLL_MS = 2000;
/** 变更清单文件大小上限（200 张卡约 330 KB；再大一个数量级也够）。 */
const JOURNAL_MAX_BYTES = 32 * 1024 * 1024;
/** 多久没人来问的会话不再读它的清单。 */
const JOURNAL_IDLE_MS = 5 * 60 * 1000;

/**
 * @param {import('cordis').Context} ctx 宿主 cordis 上下文
 */
export function apply(ctx, config = {}) {
  const instanceId = randomUUID();
  /** 显式登记目录：配置或环境变量，测试与特殊部署用；普通上传走下面解析出来的目录。 */
  const explicitRegistry = config.progressRegistry || process.env.MEMO_CARDEST_REGISTRY || undefined;
  const registrations = new RegistrationReader(explicitRegistry ? [explicitRegistry] : []);
  /**
   * 登记发现：工作区里的 `.memo-cardest/progress/v1/tasks`（正式）与 `.progress/tasks`（旧回退），
   * 加最后兜底的旧默认目录。工作区来自会话目录和已注册工作区，都是有限集合，不扫盘。
   */
  function workspacePathsFor(sessionId) {
    const paths = [];
    const add = (value) => { if (typeof value === 'string' && value && !paths.includes(value)) paths.push(value); };
    try {
      const wd = typeof ctx.get === 'function' ? ctx.get('workingDirectory') : undefined;
      const session = ctx.sessions && typeof ctx.sessions.get === 'function' ? ctx.sessions.get(sessionId) : undefined;
      if (wd && session && typeof wd.get === 'function') add(wd.get(session));
    } catch {
      /* 会话目录拿不到就只看工作区列表 */
    }
    try {
      const registry = typeof ctx.get === 'function' ? ctx.get('workspaceRegistry') : undefined;
      if (registry && typeof registry.list === 'function') for (const item of registry.list()) add(item && item.path);
    } catch {
      /* 没有工作区注册表也不影响默认目录 */
    }
    return paths;
  }
  function rootsFor(sessionId) {
    return registryRoots({ explicit: explicitRegistry, workspaces: workspacePathsFor(sessionId) });
  }
  /** @type {Map<string, {state: ReturnType<typeof createState>, waiters: Set<() => void>, at: number}>} */
  const records = new Map();

  /* ─── 更新检查（只读 GitHub 正式 Release；第一版不自动安装） ─── */
  const updateConfig = resolveUpdateConfig(
    config && typeof config === 'object' ? (config.update || config) : {},
    process.env
  );
  let currentVersion = '0.0.0';
  /** link = 本地目录安装（开发）；copy = 正式安装；unknown = 判断不了。 */
  let installMode = 'unknown';
  let updateChecker = null;
  const updateReady = (async () => {
    try {
      const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf8'));
      currentVersion = String(pkg.version || '0.0.0');
    } catch { /* 读不到就按 0.0.0：只会显示有新版本，不会谎报最新 */ }
    try {
      const profileDir = process.env.DSH_PROFILE_DIR;
      if (profileDir) {
        let info = null;
        for (const packageName of ['memo-studio-dsh', 'dsh-memo-skill-island']) {
          try {
            info = await lstat(`${profileDir}/node_modules/${packageName}`);
            break;
          } catch { /* try the legacy package name */ }
        }
        if (info) installMode = info.isSymbolicLink() ? 'link' : 'copy';
      }
    } catch { /* 判断不了就不声称能自动升级 */ }
    updateChecker = createUpdateChecker({ config: updateConfig, currentVersion });
  })();

  async function updatePayload(force) {
    await updateReady;
    if (!updateChecker) return { state: 'unconfigured', current: currentVersion };
    const value = await updateChecker.check(force === true);
    return { ...value, installMode, canAutoUpdate: false };
  }

  /* 启动后后台检查一次：不阻塞加载，失败也不打扰 */
  try {
    ctx.effect(() => {
      const timer = setTimeout(() => { updatePayload(false).catch(() => {}); }, 1500);
      return () => clearTimeout(timer);
    }, 'dsh-memo-skill-island: update check');
  } catch { /* 没有 effect 就不做后台检查，手动仍可用 */ }

  function prune() {
    while (records.size > MAX_SESSIONS) {
      let oldestId = null;
      let oldestAt = Infinity;
      for (const [id, record] of records) {
        if (record.waiters.size === 0 && record.at < oldestAt) {
          oldestAt = record.at;
          oldestId = id;
        }
      }
      if (oldestId === null) break;
      records.delete(oldestId);
    }
  }

  function notify(record) {
    const waiters = [...record.waiters];
    record.waiters.clear();
    for (const wake of waiters) {
      try { wake(); } catch { /* 单个等待者出错不影响其他 */ }
    }
  }

  /** 这个会话当前有没有要跟的变更清单（任务在、记下了清单路径、还没全部结束）。 */
  function journalTarget(record) {
    const task = record.state.task;
    if (!task || !task.journalPath) return '';
    const progress = task.progress;
    // Continue observing terminal items: retry and re-verification can change them.
    return task.journalPath;
  }

  /**
   * 读一次变更清单：修改时间没变就跳过。AI 常把 change_journal.py 包进自己的脚本在后台跑，
   * 会话里看不到逐张输出，清单文件才是实时进度。只取每项的状态与时间，不碰正文、不外传路径。
   */
  async function syncLegacyJournal(record) {
    // 断点续传前用过的旧清单：各读一次，只为算出已经完成的卡数
    for (const previous of pendingPreviousJournals(record.state)) {
      try {
        const info = await stat(previous);
        if (!info.isFile() || info.size > JOURNAL_MAX_BYTES) continue;
        if (applyCarried(record.state, previous, JSON.parse(await readFile(previous, 'utf8')))) notify(record);
      } catch {
        /* 旧清单读不到就不计入，进度只按当前这份算 */
      }
    }
    const path = journalTarget(record);
    if (!path || record.journalBusy) return;
    record.journalBusy = true;
    try {
      const info = await stat(path);
      if (!info.isFile() || info.size > JOURNAL_MAX_BYTES) throw new Error('journal_size');
      if (record.journalPath === path && record.journalMtime === info.mtimeMs && record.journalSize === info.size && Date.now() - record.journalChecked < 30000 && record.state.task?.progressHealth === 'ok') return;
      const journal = JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/, ''));
      if (journalTarget(record) !== path) return;
      if (applyJournal(record.state, journal, Date.now())) notify(record);
      record.journalPath = path; record.journalMtime = info.mtimeMs;
      record.journalSize = info.size; record.journalChecked = Date.now();
    } catch {
      if (record.state.task && journalTarget(record) === path) record.state.task.progressHealth = 'journal_read_failed';
    } finally {
      record.journalBusy = false;
    }
  }

  function viewFor(record) {
    const legacy = publicView(record.state, Date.now());
    const tasks = record.registered || [];
    const active = tasks.find(t => t.running || t.health.lifecycle === 'paused') || tasks[0];
    let value = active ? { ...active, tasks } : legacy;
    if (active && ['ask', 'approval'].includes(legacy.phase)) value = { ...value, phase: legacy.phase, ask: legacy.ask, approval: legacy.approval };
    if (!active && record.registrationError) value = { ...value, phase: 'progress_unavailable', health: { code: record.registrationError } };
    if (!active && record.state.task?.progressHealth && record.state.task.progressHealth !== 'ok') value = { ...value, phase: 'progress_unavailable', health: { code: record.state.task.progressHealth } };
    // 上传登记接管了视图时，本轮启用集合仍要从折叠状态里带上，否则技能圈会在上传期间消失
    value = {
      ...value,
      skills: legacy.skills || [],
      skillsRev: legacy.skillsRev || 0,
      skillsPaused: legacy.skillsPaused === true,
      turn: legacy.turn || 0
    };
    const { rev: ignored, ...publicData } = value;
    // Read timestamps refresh independently; do not wake long-polls every 2 seconds just for a stat.
    const signature = JSON.stringify(publicData, (key, val) => key === 'readAt' ? undefined : val);
    if (signature !== record.viewSignature) {
      record.viewSignature = signature;
      record.viewRev = (record.viewRev || 0) + 1;
    }
    return { ...publicData, rev: record.viewRev || 0, instanceId };
  }

  async function syncJournal(record) {
    if (record.syncing) return record.syncing;
    record.syncing = (async () => {
      const before = viewFor(record).rev;
      try {
        const result = await registrations.read(record.sessionId, Date.now(), rootsFor(record.sessionId));
        record.registered = result.tasks;
        record.registrationError = result.error;
        if (!result.tasks.length) await syncLegacyJournal(record);
      } catch { record.registrationError = 'registry_read_failed'; }
      if (viewFor(record).rev !== before) notify(record);
    })().finally(() => { record.syncing = undefined; });
    return record.syncing;
  }

  try {
    ctx.effect(() => {
      const timer = setInterval(() => {
        const now = Date.now();
        for (const record of records.values()) {
          if (record.waiters.size === 0 && now - record.at > JOURNAL_IDLE_MS) continue;
          syncJournal(record);
        }
      }, JOURNAL_POLL_MS);
      return () => clearInterval(timer);
    }, 'dsh-memo-skill-island: journal progress');
  } catch {
    /* 没有 effect 就没有实时上传进度，其余状态照常 */
  }

  /** 用一份完整事件日志重建状态（保留等待者，清掉清单读取缓存）。 */
  function rebuild(record, events) {
    const state = createState();
    for (const event of events) {
      if (event && RELEVANT.has(event.type)) {
        try { foldEvent(state, event); } catch { /* 单条坏事件跳过 */ }
      }
    }
    record.state = state;
    record.journalPath = undefined;
    record.journalMtime = undefined;
    record.hydrated = true;
  }

  /** 正在内存里的会话：直接取事件快照。 */
  function liveEvents(sessionId) {
    try {
      const session = ctx.sessions && typeof ctx.sessions.get === 'function' ? ctx.sessions.get(sessionId) : undefined;
      const events = session && typeof session.snapshotEvents === 'function' ? session.snapshotEvents() : undefined;
      return Array.isArray(events) ? events : undefined;
    } catch {
      return undefined;
    }
  }

  /** 还没载入内存的会话（桌面端刚重启、页面先于会话加载）：读持久化日志，做法与 dsh-better-sidebar 相同。 */
  async function persistedEvents(sessionId) {
    let persistence;
    try { persistence = typeof ctx.get === 'function' ? ctx.get('sessionPersistence') : undefined; } catch { persistence = undefined; }
    if (!persistence || typeof persistence.open !== 'function') return undefined;
    let handle;
    try {
      handle = await persistence.open(sessionId, 'read');
      const result = await handle.read();
      return result && Array.isArray(result.events) ? result.events : undefined;
    } catch {
      return undefined;
    } finally {
      if (handle && typeof handle.close === 'function') {
        try { await handle.close(); } catch { /* 已关闭 */ }
      }
    }
  }

  /**
   * 取（必要时建立）一个会话的状态。之前的版本在会话还没载入时缓存了一份空状态，
   * 桌面端重启后重启前的进度（技能加载、清单路径）全部丢失，岛就再也不动了。
   * 现在：内存里有就用快照；没有就读持久化日志；都拿不到时记为未就绪、下次再试，
   * 并且在这个会话第一条实时事件到达时用完整快照重建。
   */
  async function recordFor(sessionId) {
    let record = records.get(sessionId);
    if (!record) {
      record = { sessionId, state: createState(), waiters: new Set(), at: Date.now(), hydrated: false };
      records.set(sessionId, record);
      prune();
    }
    record.at = Date.now();
    if (record.hydrated) return record;
    if (!record.hydrating) {
      record.hydrating = (async () => {
        const events = liveEvents(sessionId) || await persistedEvents(sessionId);
        if (events && !record.hydrated) rebuild(record, events);
      })().finally(() => { record.hydrating = undefined; });
    }
    await record.hydrating;
    return record;
  }

  try {
    ctx.on('session/event', (session, event) => {
      try {
        if (!event || !RELEVANT.has(event.type)) return;
        const sessionId = session && session.id ? String(session.id) : '';
        const record = sessionId ? records.get(sessionId) : undefined;
        // 还没人问过的会话不跟：第一次问到时会从快照补齐；seq 去重保证不会折叠两次
        if (!record) return;
        if (!record.hydrated) {
          // 会话刚载入内存：用它的完整快照重建（含重启前的历史），而不是在空状态上接着折叠
          const events = session && typeof session.snapshotEvents === 'function' ? session.snapshotEvents() : undefined;
          if (Array.isArray(events)) {
            rebuild(record, events);
            notify(record);
            return;
          }
        }
        if (foldEvent(record.state, { type: event.type, seq: event.seq, time: event.time, data: event.data })) notify(record);
      } catch {
        /* 观察者失败不能影响已经提交的日志 */
      }
    });
  } catch {
    /* 没有 session/event 也不影响路由注册 */
  }

  function send(res, status, body) {
    try {
      res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
      res.end(JSON.stringify(body));
    } catch {
      /* 连回写都失败就放弃 */
    }
  }

  async function handle(req, res) {
    try {
      // 与 dsh-better-sidebar 相同的来源检查：宿主连接层拒绝的请求一律 403
      // connection 不声明为必需依赖（缺了它岛也该能用），按可选服务取
      let connection;
      try { connection = typeof ctx.get === 'function' ? ctx.get('connection') : undefined; } catch { connection = undefined; }
      if (connection && typeof connection.requestRejection === 'function' && connection.requestRejection(req) !== undefined) {
        send(res, 403, { ok: false, error: 'forbidden' });
        return;
      }
      const url = new URL(req.url || '/', 'http://dsh.internal');
      const sessionId = url.searchParams.get('sessionId') || '';
      if (!/^[\w.:-]{1,128}$/.test(sessionId)) {
        send(res, 200, { ok: true, value: { rev: 0, phase: 'idle' } });
        return;
      }
      const record = await recordFor(sessionId);
      await syncJournal(record);
      const knownRev = Number(url.searchParams.get('rev'));
      const wait = url.searchParams.get('wait') === '1';
      if (wait && url.searchParams.get('instance') === instanceId && Number.isFinite(knownRev) && knownRev === viewFor(record).rev) {
        await new Promise((resolve) => {
          const timer = setTimeout(done, WAIT_MS);
          function done() {
            clearTimeout(timer);
            record.waiters.delete(done);
            resolve();
          }
          record.waiters.add(done);
          req.once('close', done);
        });
      }
      send(res, 200, { ok: true, value: viewFor(record), now: Date.now() });
    } catch {
      send(res, 500, { ok: false, error: 'internal' });
    }
  }

  async function handleUpdate(req, res) {
    try {
      let connection;
      try { connection = typeof ctx.get === 'function' ? ctx.get('connection') : undefined; } catch { connection = undefined; }
      if (connection && typeof connection.requestRejection === 'function' && connection.requestRejection(req) !== undefined) {
        send(res, 403, { ok: false, error: 'forbidden' });
        return;
      }
      const url = new URL(req.url || '/', 'http://dsh.internal');
      const value = await updatePayload(url.searchParams.get('force') === '1');
      send(res, 200, { ok: true, value });
    } catch {
      send(res, 500, { ok: false, error: 'internal' });
    }
  }

  try {
    ctx.effect(() => ctx.webServer.register({ kind: 'exact', path: ROUTE_PATH, handler: handle }), 'dsh-memo-skill-island: status route');
  } catch {
    /* 没有 webServer（非 Web 组合）就只是没有状态，岛退回纯指南 */
  }
  try {
    ctx.effect(() => ctx.webServer.register({ kind: 'exact', path: UPDATE_ROUTE_PATH, handler: handleUpdate }), 'dsh-memo-skill-island: update route');
  } catch {
    /* 没有 webServer 就没有更新入口 */
  }
}

/** 只依赖 Web 载体和会话：没有它们这条条目停在 PENDING，岛退回纯指南。 */
export const inject = ['webServer', 'sessions'];

export default { apply, inject };
