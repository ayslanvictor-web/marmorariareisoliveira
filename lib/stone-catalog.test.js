import test from 'node:test';
import assert from 'node:assert/strict';
import { tones, stones, filterStones, inquiryUrl } from './stone-catalog.js';
test('every displayed tone has at least one reference', () => {
  for (const tone of tones)
    assert.ok(filterStones(stones, { color: tone.id }).length > 0, tone.id);
});
test('combined filters intersect rather than broaden results', () => {
  const found = filterStones(stones, {
    color: 'black',
    family: 'Granito',
    finish: 'Polido',
  });
  assert.deepEqual(
    found.map((s) => s.id),
    ['granite-dark'],
  );
  assert.equal(
    filterStones(stones, {
      color: 'black',
      family: 'Mármore',
      finish: 'Polido',
    }).length,
    0,
  );
  assert.equal(filterStones(stones).length, 6);
});
test('reference inquiry preserves chosen attributes and asks for confirmation', () => {
  const url = new URL(inquiryUrl(stones[1]));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/5511932992410');
  const message = url.searchParams.get('text');
  assert.match(message, /bege, creme e terrosos/);
  assert.match(message, /acetinado/);
  assert.match(message, /confirmar disponibilidade/);
});
test('floating contact contains requested message', () => {
  assert.equal(
    new URL(inquiryUrl()).searchParams.get('text'),
    'Olá! Gostaria de conhecer as opções de pedras, cores e acabamentos disponíveis.',
  );
});
