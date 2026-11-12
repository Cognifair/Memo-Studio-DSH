const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const runtimeRequire = createRequire(path.join(process.env.USERPROFILE, '.dsh/profiles/desktop/package.json'));
const { chromium } = runtimeRequire('playwright');
const source = fs.readFileSync(path.join(__dirname, '../client.js'), 'utf8');
const styleStart = source.indexOf('var STYLE = `') + 'var STYLE = `'.length;
const css = source.slice(styleStart, source.indexOf('`;', styleStart));
const glyphStart = source.indexOf('var glyphRoll =');
const glyphEnd = source.indexOf('})();', source.indexOf('return { STANDBY_PRESET:', glyphStart)) + 5;
const copyStart = source.indexOf('    function UploadCapsuleText(');
const copyEnd = source.indexOf('    function clockText(', copyStart);
const uploadCopy = vm.runInNewContext(source.slice(copyStart, copyEnd) + '\nUploadCapsuleText', {
  h: (tag, props, ...children) => ({ tag, props, children }), ElapsedDigits: () => {}
})({ text: '已上传 5/49', view: { progress: { uploaded: 5, total: 49 } } });

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 600, height: 140 } });
    await page.setContent(`<style>body {background:#161616; font:12px 'Segoe UI';} ${css}</style>
      <div class="msi-root" data-pulse="slow" data-light="green">
        <button class="msi-capsule"><span class="msi-capsule__layout"><span class="msi-capsule__dot"></span>
          <span class="msi-copy-live"><span class="msi-capsule__text msi-capsule__text--upload">
            <span class="msi-upload-label">已上传 </span><span class="msi-upload-digits"><span class="msi-elapsed"><span id="host"></span></span></span>
          </span><span class="msi-capsule__meta">约 3 分钟</span></span>
        </span></button>
      </div>`);
    // Use the actual component's inline protection, including when a previous
    // stylesheet is still present during a host reload.
    await page.addStyleTag({ content: '.msi-root[data-pulse="slow"] .msi-capsule__text { background-image:linear-gradient(100deg,#bbb,#fff); background-clip:text; color:transparent; }' });
    await page.evaluate(style => Object.assign(document.querySelector('.msi-capsule__text').style, style), uploadCopy.props.style);
    await page.addScriptTag({ content: source.slice(glyphStart, glyphEnd) });
    await page.evaluate(() => {
      window.roll = glyphRoll.createGlyphRoll(document.querySelector('#host'), {
        ...glyphRoll.STANDBY_PRESET, value: '5/49', duration: 320, bounce: .10, maxBlurRadius: 4, alignment: 'end'
      });
    });
    await page.waitForTimeout(600);
    assert.equal(await page.locator('#host > span > span').first().evaluate(el => getComputedStyle(el).visibility), 'hidden');
    const styles = await page.evaluate(() => Object.fromEntries(['.msi-capsule__text', '.msi-upload-label', '.msi-upload-digits'].map(selector => {
      const c = getComputedStyle(document.querySelector(selector));
      return [selector, { clip: c.backgroundClip, image: c.backgroundImage, color: c.color }];
    })));
    assert.equal(styles['.msi-capsule__text'].image, 'none');
    assert.equal(styles['.msi-upload-digits'].image, 'none');
    assert.notEqual(styles['.msi-upload-label'].image, 'none');
    await page.evaluate(() => roll.update({ value: '6/49' }));
    await page.waitForTimeout(90);
    const out = process.env.TEMP;
    await page.screenshot({ path: path.join(out, 'memo-upload-green-mid.png') });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(out, 'memo-upload-green-settled.png') });
    for (const value of ['7/49', '8/49', '9/49', '10/49', '24/49']) {
      await page.evaluate(value => roll.update({ value }), value);
      await page.waitForTimeout(50);
    }
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(out, 'memo-upload-green-rapid.png') });
    await page.evaluate(() => {
      document.querySelector('.msi-root').dataset.pulse = 'none';
      document.querySelector('.msi-root').dataset.light = 'yellow';
    });
    await page.screenshot({ path: path.join(out, 'memo-upload-yellow-settled.png') });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.evaluate(() => {
      document.querySelector('.msi-root').dataset.pulse = 'slow';
      roll.update({ value: '49/49' });
    });
    await page.waitForTimeout(100);
    assert.equal(await page.locator('.msi-upload-label').evaluate(el => getComputedStyle(el).animationName), 'none');
    console.log(JSON.stringify(styles));
    console.log('PASS: real CSS, old stylesheet coexistence, hidden fallback, rapid updates, yellow state, reduced motion');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
