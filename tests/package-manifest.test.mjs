import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';

test('DSH can strictly parse the plugin manifest without a BOM', () => {
  const url = new URL('../package.json', import.meta.url);
  const raw = readFileSync(url, 'utf8');
  assert.notEqual(raw.charCodeAt(0), 0xfeff, 'Save package.json as UTF-8 without BOM');
  const manifest = JSON.parse(raw);
  assert.ok(['dsh-memo-skill-island', 'memo-studio-dsh'].includes(manifest.name));
  for (const target of [manifest.main, manifest.dsh.bundle.patch, manifest.exports['./client']]) {
    assert.ok(existsSync(new URL(target, url)), `Missing plugin entry: ${target}`);
  }
});

 test('all locale JSON files are strictly parseable without BOM', () => {
  const dir = new URL('../locale/', import.meta.url);
  for (const name of readdirSync(dir).filter(name => name.endsWith('.json'))) {
    const raw = readFileSync(new URL(name, dir), 'utf8');
    assert.notEqual(raw.charCodeAt(0), 0xfeff, name);
    assert.doesNotThrow(() => JSON.parse(raw), name);
  }
});
