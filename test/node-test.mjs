import { test } from 'node:test';
import assert from 'node:assert';

// Simple test using Node's built-in test runner
test('Node test', (t) => {
  assert.strictEqual(1 + 1, 2);
  console.log('Node test ran successfully');
});
