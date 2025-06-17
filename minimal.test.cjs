// Minimal test file with .test.cjs extension
const { test, expect } = require('vitest');

console.log('Test file is being loaded');

test('minimal test', () => {
  console.log('Test is running');
  expect(1).toBe(1);
});
