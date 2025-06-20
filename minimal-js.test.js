// Minimal test file with .test.js extension
import { test, expect } from 'vitest';

console.log('JS test file is being loaded');

test('minimal js test', () => {
  console.log('JS test is running');
  expect(1).toBe(1);
});
