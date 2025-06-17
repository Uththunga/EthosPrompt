// New test file in __tests__ directory using ES modules
import { test, expect } from 'vitest';

console.log('New test file in __tests__ directory is being loaded (ESM)');

test('New test in __tests__ directory (ESM)', () => {
  console.log('New test in __tests__ directory is running (ESM)');
  expect(1 + 1).toBe(2);
});
