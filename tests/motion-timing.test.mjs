import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../client.js', import.meta.url), 'utf8');
const start = source.indexOf('    function advanceIslandSpring(');
const end = source.indexOf('    // Visual time', start);
const advance = vm.runInNewContext('(' + source.slice(start, end).trim() + ')');

test('a delayed frame consumes the same spring time as normal frames', () => {
  for (const [stiffness, damping] of [[200, .75], [200, 1], [300, .8], [400, 1]]) {
    const delayed = advance(0, 2, 1, stiffness, damping, .4);
    let normal = { value: 0, velocity: 2 };
    for (let i = 0; i < 24; i++) {
      normal = advance(normal.value, normal.velocity, 1, stiffness, damping, 1 / 60);
    }
    assert.ok(Math.abs(delayed.value - normal.value) < 1e-10);
    assert.ok(Math.abs(delayed.velocity - normal.velocity) < 1e-10);
    const resumed = advance(0, 2, 1, stiffness, damping, 3600);
    assert.equal(resumed.value, 1);
    assert.equal(Math.abs(resumed.velocity), 0);
  }
});


test('width spring starts visibly after delayed first frame and preserves velocity', () => {
  const begin = source.indexOf('    function useWidthSpring(');
  const end = source.indexOf('    function IslandMorph(', begin);
  let effect, tick, value;
  const physics = { value: 100, velocity: 9 };
  const hook = vm.runInNewContext('(' + source.slice(begin, end).trim() + ')', {
    React: { useState: () => [100, v => { value = v; }], useRef: () => ({ current: physics }), useEffect: fn => { effect = fn; } },
    performance: { now: () => 1000 }, motionTrace() {}, advanceIslandSpring: advance, islandVisualDelta: visualDelta,
    window: { matchMedia: () => ({ matches: false }), requestAnimationFrame: fn => { tick = fn; return 1; }, cancelAnimationFrame() {} }
  });
  hook(200); effect(); tick(1250);
  const expected = advance(100, 9, 200, 300, .8, 1 / 60);
  assert.ok(Math.abs(value - expected.value) < 1e-10);
  assert.ok(Math.abs(physics.velocity - expected.velocity) < 1e-10);
});

const visualStart = source.indexOf('    function islandVisualDelta(');
const visualEnd = source.indexOf('    function useIslandSpring(', visualStart);
const visualDelta = vm.runInNewContext('(' + source.slice(visualStart, visualEnd).trim() + ')');
test('normal frame timing stays exact but a host stall cannot skip the visual transition', () => {
  assert.equal(visualDelta(1 / 60, false), 1 / 60);
  assert.equal(visualDelta(1 / 120, false), 1 / 120);
  assert.equal(visualDelta(.25, false), .032);
  assert.equal(visualDelta(1, true), 1 / 60);
  assert.equal(visualDelta(-.1, false), 0);
});


function sampleMergeDirection(detached) {
  const begin = source.indexOf('    function useIslandSpring(');
  const end = source.indexOf('\n    }', source.indexOf('      return motion;', begin)) + '\n    }'.length;
  const physics = { x: detached ? -.2 : 1, v: 0, nudge: 0, nudgeVelocity: 0,
    stretch: detached ? 0 : 32, stretchVelocity: 0, bubbleWidth: 1, bubbleVelocity: 0,
    scale: 1, scaleVelocity: 0, visible: !detached };
  let effect, tick, refs = 0;
  const samples = [];
  const hook = vm.runInNewContext('(' + source.slice(begin, end).trim() + ')', {
    React: { useState: initial => [initial, value => samples.push(value)],
      useRef: () => ({ current: refs++ === 0 ? physics : true }), useEffect: fn => { effect = fn; } },
    ISLAND_REFERENCE: { scale: .64, push: 3.2 }, ISLAND_MERGED_SCALE: 0,
    islandAbsorb: () => 1, advanceIslandSpring: advance, islandVisualDelta: visualDelta, motionTrace() {},
    performance: { now: () => 0 }, window: {
      matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
      requestAnimationFrame: fn => { tick = fn; return 1; }, cancelAnimationFrame() {}
    }
  });
  hook(detached); effect();
  for (let i = 1; i <= 45; i++) { const next = tick; tick = null; if (!next) break; next(i * 1000 / 60); }
  return samples;
}

test('merging a settled bubble does not push the capsule outward before returning', () => {
  const samples = sampleMergeDirection(false);
  assert.ok(samples.length > 2);
  assert.ok(samples.every(s => Math.abs(s.nudge) < .0001), 'merge must not restart the outward push');
  assert.ok(samples[0].x < 1);
});

test('detaching still keeps the original outward push', () => {
  assert.ok(sampleMergeDirection(true).some(s => s.nudge > .5));
});
