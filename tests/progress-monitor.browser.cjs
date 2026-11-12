// Runs the actual React plugin against simulated, read-only status responses.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const profile = createRequire(path.join(process.env.USERPROFILE, '.dsh/profiles/desktop/package.json'));
const previewDir = process.env.MEMO_PREVIEW_RUNTIME || path.join(process.env.USERPROFILE,
  'Documents/ChatGPT/Memo-Cardest 墨卡大师/work/memo-studio-portable-20261105-183755');
const preview = createRequire(path.join(previewDir, 'package.json'));
const { chromium } = profile('playwright');

(async () => {
  const bundle = await preview('esbuild').build({ stdin: {
    contents: 'import React from "react"; import {createRoot} from "react-dom/client"; window.React=React; window.createRoot=createRoot;',
    resolveDir: previewDir }, bundle: true, write: false, platform: 'browser', define: { 'process.env.NODE_ENV': '"production"' } });
  const now = Date.now();
  const latest = { taskId: 'upload-new', startedAt: now - 30000, updatedAt: now, phase: 'upload', stage: 'upload',
    running: true, source: 'registered', progress: { uploaded: 6, verified: 5, total: 49, planned: 43, written: 1, failed: 0,
      uncertain: 0, skipped: 0, mismatch: 0, etaMs: 180000 }, health: { code: 'ok', lifecycle: 'running' } };
  const previous = { ...latest, taskId: 'upload-old', startedAt: now - 60000, phase: 'done', running: false,
    progress: { ...latest.progress, uploaded: 77, verified: 77, total: 77, planned: 0, written: 0 },
    deliverable: { kind: 'api', cards: 77 }, health: { code: 'ok', lifecycle: 'completed' } };
  const data = { ...latest, rev: 1, instanceId: 'fixture', turn: 2, skills: ['memo-cardest'],
    workflow: { phase: 'working', stage: 'design', startedAt: now - 20000, updatedAt: now, running: true },
    uploads: [latest, previous], tasks: [latest, previous] };
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('http://memo-fixture.test/**', route => route.fulfill({ contentType: 'text/html', body:
      '<html><body style="background:#171717;color:#eee;font:14px Segoe UI"><div id="overlay"></div><div id="dock"></div></body></html>' }));
    await page.route('**/memo-island/status*', async route => {
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.fulfill({ contentType: 'application/json', body: JSON.stringify({ ok: true, value: data, now: Date.now() }) }).catch(() => {});
    });
    await page.goto('http://memo-fixture.test/');
    await page.addScriptTag({ content: bundle.outputFiles[0].text });
    await page.evaluate(() => {
      window.__ModuleLoader__ = { load({ factory }) { window.plugin = factory(() => window.React); } };
    });
    await page.addScriptTag({ content: fs.readFileSync(path.join(__dirname, '../client.js'), 'utf8') });
    await page.evaluate(() => window.plugin.apply({ get() { return null; }, effect(fn) { fn(); }, slots: {
      inject(_name, fn) { fn(); }, register(options, component) {
        const dock = options.name === 'conversation.input.dock';
        window.createRoot(document.querySelector(dock ? '#dock' : '#overlay')).render(
          React.createElement(component, dock ? { sessionId: 'session-browser' } : {}));
        return () => {};
      }
    } }));
    await page.locator('.msi-capsule').click();
    assert.deepEqual(await page.locator('.msi-tasks__group:not(.msi-tasks__group--aux) button').allTextContents(),
      ['制卡核心技能', 'TXT 导入', '材料转文字', '图片与表格']);
    assert.deepEqual(await page.locator('.msi-tasks__group--aux button').allTextContents(),
      ['使用答疑', '批量删除', 'Anki 迁移', '卡片互链']);
    await page.locator('.msi-current__status').filter({ hasText: '设计' }).waitFor();
    assert.equal(await page.locator('.msi-monitor button[aria-pressed="true"]').textContent(), '当前任务');
    await page.getByRole('button', { name: 'API 上传', exact: true }).click();
    await page.locator('.msi-current__status').filter({ hasText: '6/49' }).waitFor();
    await page.waitForTimeout(1200); // Let the preserved blur transition settle before checking the capsule.
    assert.match((await page.locator('.msi-capsule').innerText()).replace(/\s/g, ''), /6\/49/);
    await page.screenshot({ path: path.join(process.env.TEMP, 'memo-monitor-api.png') });
    assert.equal(await page.locator('.msi-monitor-task').count(), 0);
    await page.locator('.msi-task-history > summary').click();
    assert.equal(await page.locator('.msi-task-history select').count(), 0);
    await page.locator('.msi-current__status').filter({ hasText: '6/49' }).waitFor();
    await page.getByRole('button', { name: '当前任务', exact: true }).click();
    await page.locator('.msi-current__status').filter({ hasText: '设计' }).waitFor();
    await page.waitForTimeout(1200);
    assert.doesNotMatch((await page.locator('.msi-capsule').innerText()).replace(/\s/g, ''), /77\/77/);
    await page.screenshot({ path: path.join(process.env.TEMP, 'memo-monitor-workflow.png') });
    assert.equal(JSON.parse(await page.evaluate(() => localStorage.getItem('memo-skill-island:progress-view:session-browser'))).mode, 'workflow');
    assert.deepEqual(errors, []);
    await page.getByRole('button', { name: '使用答疑', exact: true }).click();
    await page.waitForFunction(() => {
      const icon = document.querySelector('.msi-skill-hero__icon');
      return icon && icon.complete && icon.naturalWidth === 64;
    });
    await page.screenshot({ path: path.join(process.env.TEMP, 'memo-qa-avatar-preview.png') });
    data.workflow = { phase: 'idle' };
    data.uploads = []; data.tasks = []; data.rev += 1;
    await page.waitForFunction(() => !document.querySelector('.msi-panel .msi-current'));
    assert.equal(await page.locator('.msi-panel .msi-current').count(), 0);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(process.env.TEMP, 'memo-monitor-idle.png') });
    console.log('PASS: workflow/API switch works; uploads always show latest with read-only history and no task selector');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
