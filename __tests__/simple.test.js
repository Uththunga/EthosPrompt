import { test, expect } from 'vitest';

// Simple test to verify Vitest is working with ES modules
test('Simple test in __tests__ directory (ESM)', () => {
  expect(1 + 1).toBe(2);
  console.log('Test in __tests__ directory ran successfully (ESM)');
});
