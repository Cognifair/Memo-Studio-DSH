import { summarizeJournal } from './progress.js';
import pathUtil from 'node:path';
/**
 * 墨卡大师灵动岛 —— 状态折叠（纯函数，宿主侧用；不依赖 cordis，方便离线回放会话日志测试）。
 *
 * 输入：会话事件（turn/start、turn/end、tool/call、tool/result、approval/asked、approval/decided）。
 * 输出：一份很小的公开状态（phase / stage / 问题标题 / 上传进度 / 交付物 / 错误），给岛显示。
 *
 * 纪律：
 *   1. 只认墨卡大师相关的信号：skill 工具加载 memo-* 技能之后才开始跟踪一个「任务」；
 *   2. 不把卡片正文、命令输出、凭证带出去：公开状态里只有计数、阶段键和短文案；
 *   3. 每个信号都在源头核对过（真实会话日志里的工具名与输出格式），解析失败一律当没看见。
 */

/** 墨卡大师家族的技能名。 */
const MEMO_SKILL = /^(memo-|maimemo-)/i;
/** 工具参数里出现墨卡大师家族的技能目录或脚本 → 算一次「墨卡大师在干活」的信号。 */
// 参数是 JSON 字符串，Windows 路径里的反斜杠在里面是转义后的 "\\\\"，所以分隔符按「一到多个 \ 或 /」匹配
const MEMO_TOUCH = /[\\/]+(memo-[a-z]+|maimemo-[a-z]+)[\\/]+|change_journal\.py|finalize_txt\.py|inspect_source\.py|secret_resolver\.py/i;

/**
 * 本轮启用跟踪只认这几条技能 id（精确匹配，绝不做子串或相似度猜测）。
 * 括号里是改名前的旧 id：旧会话、旧技能目录仍可能带着它们。
 */
const SKILL_ALIAS = {
  'memo-txtimporter': 'memo-txt',
  'memo-ankitransfer': 'memo-ankigo'
};
const SKILL_IDS = new Set([
  'memo-cardest',
  'memo-mineruocr',
  'memo-canvas',
  'memo-ankigo',
  'memo-cardlink',
  'memo-txt',
  'memo-qahelper'
]);

/** 技能名 → 白名单里的 id；不认识就返回空串（不登记、不点亮）。 */
function normalizeSkill(raw) {
  const id = typeof raw === 'string' ? raw.trim().toLowerCase() : '';
  if (!id) return '';
  const mapped = SKILL_ALIAS[id] || id;
  return SKILL_IDS.has(mapped) ? mapped : '';
}

/**
 * 「读了这条技能的文件」才算明确证据：
 *   …/skills/<id>/SKILL.md            技能说明本身
 *   …/skills/<id>/references/<x>.md   技能自己的参考文档（AI 按它的指示干活）
 * id 仍要过白名单；别的目录（比如项目里的同名文件）不算。
 */
function skillFromPath(rawPath) {
  const path = typeof rawPath === 'string' ? rawPath.replace(/\\/g, '/') : '';
  const match = /(?:^|\/)skills\/([a-z0-9-]+)\/(?:SKILL\.md|references\/[^/]+\.md)$/i.exec(path);
  return match ? normalizeSkill(match[1]) : '';
}
/** 超过这么久没有动静、也没在跑的任务，打开会话时不再显示（毫秒）。 */
export const STALE_MS = 12 * 60 * 60 * 1000;
/** 清单这么久没动、本轮也结束了，就不再显示「上传中」（毫秒）。 */
export const UPLOAD_IDLE_MS = 2 * 60 * 1000;

/** skill 名 → 阶段键。 */
const SKILL_STAGE = {
  'memo-cardest': 'start',
  'memo-mineruocr': 'ocr',
  'memo-canvas': 'table',
  'memo-txtimporter': 'txt',
  'memo-ankitransfer': 'anki',
  'memo-cardlink': 'link'
};

/** memo-cardest/references 下读到哪份文档 → 阶段（以及路线）。 */
const REFERENCE_STAGE = [
  [/capability-map\.md$/i, 'help'],
  [/txt-workflow\.md$/i, 'route', 'txt'],
  [/(api-workflow|credentials)\.md$/i, 'route', 'api'],
  [/source-preflight\.md$/i, 'source'],
  [/(image-redraw|visual-brief)\.md$/i, 'redraw'],
  [/(table-decision|tables)\.md$/i, 'table'],
  [/design-toolbox\.md$/i, 'design'],
  [/batch-delete\.md$/i, 'delete'],
  [/change-journal\.md$/i, 'upload', 'api']
];

/** 命令行里出现哪个脚本 → 阶段；kind 表示结果要解析。 */
const SCRIPT_STAGE = [
  [/check_updates\.py/i, 'sync'],
  [/inspect_source\.py/i, 'source'],
  [/secret_resolver\.py/i, 'credentials', 'api'],
  [/change_journal\.py/i, 'upload', 'api', 'journal'],
  [/finalize_txt\.py/i, 'finalize', 'txt', 'finalize']
];

function parseArgs(raw) {
  if (raw && typeof raw === 'object') return raw;
  if (typeof raw !== 'string' || raw === '') return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function resultText(data) {
  const message = data && data.message;
  if (!message || !Array.isArray(message.content)) return '';
  const parts = [];
  for (const block of message.content) {
    if (!block || typeof block !== 'object') continue;
    if (block.type === 'text' && typeof block.text === 'string') parts.push(block.text);
    // 0.1.6 的旧形状：结果包在一层 tool-result 里
    if (block.type === 'tool-result' && Array.isArray(block.content)) {
      for (const inner of block.content) if (inner && inner.type === 'text' && typeof inner.text === 'string') parts.push(inner.text);
    }
  }
  return parts.join('\n');
}

function resultIsError(data) {
  const message = data && data.message;
  if (data && data.error !== undefined) return true;
  if (!message) return false;
  if (message.isError === true) return true;
  if (Array.isArray(message.content)) {
    for (const block of message.content) if (block && block.type === 'tool-result' && block.isError === true) return true;
  }
  return false;
}

function short(text, max) {
  const value = String(text || '').replace(/\s+/g, ' ').trim();
  return value.length > max ? value.slice(0, max - 1) + '…' : value;
}

function basename(path) {
  const parts = String(path || '').split(/[\\/]/);
  return parts[parts.length - 1] || '';
}

/** change_journal.py 每条命令都打印一份完整报告：{"task_id","total","counts":{...}}。取最后一份。 */
function parseJournalReport(text) {
  const lines = String(text || '').split(/\r?\n/);
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const line = lines[i].trim();
    if (line.charAt(0) !== '{' || line.indexOf('"total"') < 0) continue;
    try {
      const report = JSON.parse(line);
      if (typeof report.total === 'number' && report.counts && typeof report.counts === 'object') return report;
    } catch {
      /* 不是完整 JSON（被截断）就继续往上找 */
    }
  }
  return null;
}

/** finalize_txt.py 成功时打印「结构检查：通过（N 章 / M 卡，…）」。 */
function parseFinalize(text) {
  const passed = /结构检查：通过（\s*(\d+)\s*章\s*\/\s*(\d+)\s*卡/.exec(text);
  if (passed) return { ok: true, chapters: Number(passed[1]), cards: Number(passed[2]) };
  if (/LINT FAILED|exit=[1-9]/.test(text)) return { ok: false };
  return null;
}

/**
 * finalize_txt.py 的输入文件：紧跟在脚本后面的那个参数。
 * 实际会话里见过三种写法：直接写路径（"C:\…\x.txt"）、先赋给变量（$p="…txt"; finalize_txt.py $p）、
 * 循环变量（foreach ($f in …)）。前两种取出文件名；认不出就返回空串 —— 宁可不显示，不显示错的
 * （比如把 `| Out-File finalize_log.txt` 的日志文件当成交付物）。
 */
function txtPathIn(command) {
  const text = String(command || '');
  // 脚本路径本身也可能带引号（"…\finalize_txt.py" "…\x.txt"），所以 .py 后面允许一个收尾引号
  const after = /finalize_txt\.py["']?\s+("[^"]+"|'[^']+'|\S+)/i.exec(text);
  if (!after) return '';
  let token = after[1].replace(/^["']|["']$/g, '');
  const variable = /^\$([A-Za-z_][\w]*)$/.exec(token);
  if (variable) {
    const assigned = new RegExp('\\$' + variable[1] + '\\s*=\\s*["\']([^"\']+)["\']').exec(text);
    token = assigned ? assigned[1] : '';
  }
  return /\.txt$/i.test(token) && token.indexOf('$') < 0 ? token : '';
}

/**
 * change_journal.py 的 --journal 参数（变更清单文件）。只认绝对路径、文件名含 journal 的 .json：
 * 宿主会去读这个文件拿进度，所以不接受任何别的东西。
 */
export function journalPathIn(command, cwd) {
  const match = /--journal\s+("[^"]+"|'[^']+'|\S+)/i.exec(String(command || ''));
  if (!match) return '';
  let path = match[1].replace(/^["']|["']$/g, '');
  if (path.indexOf('$') >= 0) return '';
  if (!/^(?:[A-Za-z]:[\\/]|\/)/.test(path)) {
    if (!cwd || !pathUtil.isAbsolute(cwd) || /[;|&`]/.test(path)) return '';
    path = pathUtil.resolve(cwd, path);
  }
  return /journal[^\\/]*\.json$/i.test(path) ? path : '';
}

/** 计数 → 任务进度；不一致 / 失败转红，全部回读一致即交付完成。返回进度是否有变化。 */
function setProgress(task, counts, total, firstAt, lastAt, time) {
  const n = key => Math.max(0, Number(counts[key]) || 0);
  // Reports have no per-item receipt history: do not invent an exact uploaded count.
  const next = { total, uploaded: null, sent: null, verified: n('verified'),
    written: n('written'), planned: n('planned'), uncertain: n('uncertain'),
    failed: n('failed'), skipped: n('skipped'), mismatch: n('mismatch'),
    settled: n('verified') + n('failed') + n('skipped') + n('mismatch'), etaMs: null };
  const changed = JSON.stringify(task.progress) !== JSON.stringify(next);
  task.progress = next;
  task.progressSource = 'report_snapshot';
  task.progressReadAt = time;
  task.deliverable = null;
  return changed;
}

/** 之前几份清单里已回读一致的卡数之和。 */
function carriedOf(task) { return 0; }

/** 还没读到卡数的旧清单路径（宿主据此读一次）。 */
export function pendingPreviousJournals(state) { return []; }

/** 宿主读到一份旧清单后登记它的回读一致卡数；完成状态的卡数也随之更新。 */
export function applyCarried(state, path, journal) { return false; }

/**
 * 直接读变更清单文件得到的进度（宿主侧定时读 journal.json 后调用）。
 * AI 常把 change_journal.py 包进自己的批量脚本、放到后台跑，会话里看不到逐张的输出；
 * 清单文件本身才是真相：每项有 status，history 里有每次状态变化的时间，用来算真实速率。
 * 只取状态与时间，不碰卡片正文。
 */
export function applyJournal(state, journal, time) {
  const task = state.task;
  if (!task) return false;
  const next = summarizeJournal(journal);
  const changed = JSON.stringify(next) !== JSON.stringify(task.progress) || task.progressSource !== 'legacy_journal';
  task.progress = next;
  task.progressSource = 'legacy_journal';
  task.progressReadAt = time;
  task.progressHealth = 'ok';
  task.deliverable = next.verified === next.total ? { kind: 'api', cards: next.verified } : null;
  task.error = next.failed + next.mismatch > 0 ? { kind: 'verify', count: next.failed + next.mismatch } : null;
  task.active = true;
  task.stage = 'upload'; task.route = 'api';
  if (changed) { task.updatedAt = time; state.rev += 1; }
  return changed;
}

function turnErrorKind(reason) {
  const code = reason && reason.error && reason.error.code;
  if (code === 'QUOTA') return 'quota';
  if (code === 'TRANSPORT') return 'transport';
  return 'turn';
}

export function createState() {
  return {
    rev: 0,
    seq: -1,
    turnRunning: false,
    task: null,
    pending: {},
    /** 轮次序号：turn/start 自增，前端用来丢弃上一轮的残留。 */
    turnId: 0,
    /** 本轮已确认加载成功的技能（收到成功的 tool/result 才进来）。 */
    turnSkills: new Set(),
    /** 发出但还没有结果的技能加载：callId → 技能 id。 */
    skillCalls: {},
    /** 启用集合的版本号：只有它变了才需要唤醒长轮询。 */
    skillsRev: 0,
    /** 本轮出现过几次「墨卡大师在干活」的硬信号（脚本、references、清单）。 */
    memoSignals: 0,
    /** 本轮开始的时刻：用来判断「任务是不是本轮之前就开着」。 */
    turnStartedAt: 0
  };
}

/** Finished registrations remain in history, but cannot own a later turn's island. */
export function selectRegisteredTask(tasks, state) {
  const turnStart = state.turnStartedAt || 0;
  return [...tasks].sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0)).find(t =>
    ['running', 'paused'].includes(t.health?.lifecycle) || !turnStart || Math.max(t.startedAt || 0,
    t.updatedAt || 0, t.health?.heartbeatAt || 0) >= turnStart);
}

function newTask(state, time) {
  state.task = {
    startedAt: time,
    updatedAt: time,
    stage: 'start',
    route: null,
    ask: null,
    approval: null,
    progress: null,
    deliverable: null,
    error: null,
    ended: null,
    // 断点续传时用过的旧清单 → 其中回读一致的卡数（null = 还没读到，宿主会去读一次）
    previousJournals: {},
    // 本轮是否有任务活动（墨卡大师目录 / 脚本、技能加载、问题框、批准）。
    // 新一轮开始时置 false，但任务照常显示；整轮结束仍是 false 才说明你已经去做别的了，任务结束
    active: true
  };
  state.pending = {};
  return state.task;
}

function setStage(task, stage, route) {
  if (stage) task.stage = stage;
  if (route) task.route = route;
}

/**
 * 折叠一条事件。返回 true 表示公开状态可能变了。
 * @param {ReturnType<typeof createState>} state
 * @param {{type: string, seq?: number, time?: number, data?: any}} event
 */
export function foldEvent(state, event) {
  if (!event || typeof event.type !== 'string') return false;
  if (typeof event.seq === 'number') {
    if (event.seq <= state.seq) return false;
    state.seq = event.seq;
  }
  const time = typeof event.time === 'number' ? event.time : Date.now();
  const data = event.data || {};
  let task = state.task;
  let changed = false;

  switch (event.type) {
    case 'turn/start': {
      state.turnRunning = true;
      state.turnId += 1;
      state.turnStartedAt = time;
      // 新一轮：上一轮的启用集合一律作废，不做跨轮继承
      if (state.turnSkills.size) state.skillsRev += 1;
      state.turnSkills.clear();
      state.skillCalls = {};
      state.memoSignals = 0;
      changed = true;
      if (task) {
        // 新一轮用户消息：已交付的任务算看过了，回到静息。
        // 出错的任务不清：回读失败后你多半是让 AI 重做 / 续传，清掉会丢掉清单和已完成的卡数；
        // 余额 / 连接 / 本轮出错这类轮次级错误，新一轮就是重试，只清错误本身
        if (task.deliverable || (task.progress?.total > 0 && task.progress.verified === task.progress.total)) {
          state.task = null;
          state.pending = {};
        }
        else {
          if (task.error && task.error.kind !== 'verify' && task.error.kind !== 'lint') task.error = null;
          task.ended = null;
          task.active = false;
          task.updatedAt = time;
        }
      }
      break;
    }
    case 'turn/end': {
      state.turnRunning = false;
      // 本轮结束（正常 / 取消 / 出错都走这里）：运行指示停止，不留「成功图标」
      if (state.turnSkills.size) state.skillsRev += 1;
      state.turnSkills.clear();
      state.skillCalls = {};
      changed = true;
      if (task && !task.active && !task.journalPath) {
        // 整轮没有任何任务活动：用户已经在做别的事了，任务结束，岛回到静息
        state.task = null;
      } else if (task) {
        const reason = data.reason || {};
        task.ended = reason.kind || 'completed';
        task.updatedAt = time;
        task.ask = null;
        task.approval = null;
        if (reason.kind === 'error') task.error = { kind: turnErrorKind(reason) };
      }
      break;
    }
    case 'approval/asked': {
      if (task) {
        task.active = true;
        task.approval = { id: data.id, tool: short(data.toolName, 24) };
        task.updatedAt = time;
        changed = true;
      }
      break;
    }
    case 'approval/decided': {
      if (task && task.approval && task.approval.id === data.id) {
        task.approval = null;
        task.updatedAt = time;
        changed = true;
      }
      break;
    }
    case 'tool/call': {
      const name = data.name;
      const args = parseArgs(data.arguments);
      const callId = typeof data.callId === 'string' ? data.callId : '';
      // 只登记「发出」；成功与否等 tool/result 核对，发出就点亮会把失败也算成启用
      if (callId) {
        if (name === 'skill') {
          const requested = normalizeSkill(args.name);
          if (requested) state.skillCalls[callId] = requested;
        } else if (name === 'read') {
          const fromDoc = skillFromPath(String(args.file_path || args.path || ''));
          if (fromDoc) state.skillCalls[callId] = fromDoc;
        }
      }
      if (name === 'skill') {
        const skill = typeof args.name === 'string' ? args.name.trim().toLowerCase() : '';
        if (!MEMO_SKILL.test(skill)) break;
        if (!task || task.deliverable) task = newTask(state, time);
        task.active = true;
        setStage(task, SKILL_STAGE[skill] || 'start', skill === 'memo-txtimporter' ? 'txt' : null);
        task.updatedAt = time;
        changed = true;
        break;
      }
      // A cached skill need not be loaded again: reading its docs or executing its
      // scripts is enough to begin a fresh workflow after the previous delivery.
      if (!task && ((name === 'read' && skillFromPath(String(args.file_path || args.path || ''))) ||
        MEMO_TOUCH.test(typeof data.arguments === 'string' ? data.arguments : JSON.stringify(args)))) {
        task = newTask(state, time);
        changed = true;
      }
      if (!task) break;
      // 任务进行中，每个工具调用都照常处理（AI 看 PDF、截图时也可能紧接着弹问题框）。
      // 这里只记「本轮有没有任务活动」：问题框，或碰到墨卡大师的目录 / 脚本
      if (!task.active && (name === 'ask_user_question' || MEMO_TOUCH.test(typeof data.arguments === 'string' ? data.arguments : JSON.stringify(args)))) {
        task.active = true;
      }
      task.updatedAt = time;
      if (name === 'ask_user_question') {
        const first = Array.isArray(args.questions) ? args.questions[0] : null;
        task.ask = {
          callId,
          header: short(first && first.header, 16),
          question: short(first && first.question, 80),
          count: Array.isArray(args.questions) ? args.questions.length : 1
        };
        if (callId) state.pending[callId] = 'ask';
        changed = true;
      } else if (name === 'read') {
        const path = String(args.file_path || args.path || '');
        if (/memo-cardest[\\/]references[\\/]/i.test(path)) {
          state.memoSignals += 1;
          for (const rule of REFERENCE_STAGE) {
            if (rule[0].test(path)) { setStage(task, rule[1], rule[2]); changed = true; break; }
          }
        }
      } else if (name === 'pwsh' || name === 'bash' || name === 'shell') {
        const command = String(args.command || '');
        // OCR 支链（memo-mineruocr）里的脚本——包括它自己的 secret_resolver.py 读 MinerU Token——
        // 都算 OCR 阶段，不能当成墨墨 API 凭证、更不能据此把路线判成 API
        if (/memo-mineruocr/i.test(command)) {
          setStage(task, 'ocr');
          changed = true;
          break;
        }
        // 任何带 --journal <绝对路径 …journal*.json> 的命令都跟过去：AI 断点续传时常为剩下的卡另建一份清单
        // （实测会话 2ea6f2ec 重启后改用 journal2.json，只在它自己的 write_cards.py 参数里出现）。
        // 换清单时清掉上一份的进度和回读失败——新的一批本来就包含要重做的那几张
        const journalArg = journalPathIn(command, args.workdir);
        if (journalArg) state.memoSignals += 1;
        if (journalArg && journalArg !== task.journalPath) {
          // 上一份清单里已经回读一致的卡算进整个任务（失败的那几张会在新清单里重做，不计入）。
          // 一律标成「待读」，由宿主读一次旧清单文件补上真实数（applyCarried）：
          // 从会话日志里看到的只可能是 AI 某次打印的旧数（实测停在建清单时的 0/200），不能信
          if (task.journalPath) task.previousJournals[task.journalPath] = null;
          task.journalPath = journalArg;
          task.progress = null;
          if (task.error && task.error.kind === 'verify') task.error = null;
          task.deliverable = null;
          setStage(task, 'upload', 'api');
          changed = true;
        }
        for (const rule of SCRIPT_STAGE) {
          if (!rule[0].test(command)) continue;
          state.memoSignals += 1;
          setStage(task, rule[1], rule[2]);
          if (rule[3] && callId) state.pending[callId] = rule[3] === 'finalize' ? { kind: 'finalize', file: basename(txtPathIn(command)) } : rule[3];
          changed = true;
          break;
        }
      } else if (name === 'web_fetch') {
        if (/open\.maimemo\.com/i.test(String(args.url || data.arguments || ''))) { setStage(task, 'docs'); changed = true; }
      } else if (name === 'write' || name === 'edit') {
        if (/\.txt$/i.test(String(args.file_path || args.path || ''))) { setStage(task, 'write', 'txt'); changed = true; }
      }
      break;
    }
    case 'tool/result': {
      const callId = data.message && data.message.source && data.message.source.callId;
      if (typeof callId !== 'string') break;
      const skillCall = state.skillCalls[callId];
      if (skillCall !== undefined) {
        delete state.skillCalls[callId];
        // 失败不点亮；同一轮重复成功只登记一次
        if (!resultIsError(data) && !state.turnSkills.has(skillCall)) {
          state.turnSkills.add(skillCall);
          state.skillsRev += 1;
          changed = true;
        }
      }
      const kind = state.pending[callId];
      if (kind === undefined) break;
      delete state.pending[callId];
      if (!task) break;
      task.updatedAt = time;
      changed = true;
      if (kind === 'ask') {
        if (task.ask && task.ask.callId === callId) task.ask = null;
      } else if (kind === 'journal') {
        const report = parseJournalReport(resultText(data));
        if (!report) break;
        setProgress(task, report.counts, report.total, 0, 0, time);
      } else if (kind && kind.kind === 'finalize') {
        const outcome = parseFinalize(resultText(data));
        if (outcome && outcome.ok) {
          task.deliverable = { kind: 'txt', cards: outcome.cards, chapters: outcome.chapters, file: kind.file };
          if (task.error && task.error.kind === 'lint') task.error = null;
        } else if ((outcome && !outcome.ok) || resultIsError(data)) {
          task.error = { kind: 'lint' };
        }
      }
      break;
    }
    default:
      return false;
  }
  if (changed) state.rev += 1;
  return changed;
}

/**
 * 给岛的公开状态：只有阶段、计数和短文案。
 * phase：idle / working / upload / ask / approval / reply / stopped / done / error
 */
export function publicWorkflowView(state, now) {
  // Same event-derived workflow, without letting a journal replace its phase.
  // The original task and its persistent upload record remain untouched.
  const task = state.task ? { ...state.task, progress: null, journalPath: undefined } : null;
  return publicView({ ...state, task }, now);
}

export function publicView(state, now) {
  const task = state.task;
  const at = typeof now === 'number' ? now : Date.now();
  const skills = state.turnSkills ? [...state.turnSkills] : [];
  if (!task || (!task.journalPath && !state.turnRunning && at - task.updatedAt > STALE_MS)) {
    return { rev: state.rev, phase: 'idle', skills, skillsRev: state.skillsRev || 0, turn: state.turnId };
  }
  let phase;
  if (task.ask) phase = 'ask';
  else if (task.approval) phase = 'approval';
  else if (task.error) phase = 'error';
  else if (task.deliverable) phase = 'done';
  else if (task.progress && task.progress.total > 0 && task.progress.settled < task.progress.total &&
    (state.turnRunning || at - (task.progress.movedAt || 0) < UPLOAD_IDLE_MS)) phase = 'upload';
  else if (state.turnRunning) phase = 'working';
  else if (task.ended === 'aborted' || task.ended === 'interrupted') phase = 'stopped';
  else phase = 'reply';

  // 主技能（memo-cardest）是这条链的总入口：只要本轮确实在干墨卡大师的活
  // （task.active 由技能调用、references 读取、脚本、问题框等真实信号置起），
  // 就一直算「本轮已启用」，不再要求这一轮重新加载一次。
  const continuingTask = task && typeof state.turnStartedAt === 'number' && task.startedAt < state.turnStartedAt;
  if (state.turnRunning && (state.memoSignals > 0 || continuingTask) && skills.indexOf('memo-cardest') < 0) {
    skills.push('memo-cardest');
  }

  const view = {
    rev: state.rev,
    phase,
    stage: task.stage,
    route: task.route,
    startedAt: task.startedAt,
    updatedAt: task.updatedAt,
    running: state.turnRunning
  };
  if (task.ask) view.ask = { header: task.ask.header, question: task.ask.question, count: task.ask.count };
  if (task.approval) view.approval = { tool: task.approval.tool };
  if (task.progress) {
    view.progress = { ...task.progress, etaMs: null };
    view.source = task.progressSource || 'report_snapshot';
    view.health = { code: task.progressHealth || (view.source === 'report_snapshot' ? 'snapshot_only' : 'ok'), readAt: task.progressReadAt || null, lifecycle: 'unknown' };
    if (task.progressHealth && task.progressHealth !== 'ok') view.phase = 'progress_unavailable';
    else if (view.phase !== 'ask' && view.phase !== 'approval') {
      const p = task.progress;
      if (view.source === 'report_snapshot') view.phase = 'progress_unavailable';
      else if (p.verified === p.total) view.phase = 'done';
      else if (p.planned === 0 && p.uncertain === 0 && p.failed === 0 && p.skipped === 0 && p.mismatch === 0) view.phase = 'verifying';
      else view.phase = state.turnRunning ? 'upload' : 'partial';
    }
  }
  if (task.deliverable) view.deliverable = task.deliverable;
  if (task.error) view.error = task.error;
  view.skills = skills;
  view.skillsRev = state.skillsRev || 0;
  view.turn = state.turnId;
  // 等你回答 / 批准时，运行动画暂停并换成静态标记；这只是展示态，不改变启用集合
  view.skillsPaused = view.phase === 'ask' || view.phase === 'approval';
  return view;
}
