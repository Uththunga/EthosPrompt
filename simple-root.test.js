import { test, expect } from 'vitest';

test('simple root test (ESM)', () => {
  expect(1 + 1).toBe(2);
  console.log('Simple root test ran successfully (ESM)');
});
