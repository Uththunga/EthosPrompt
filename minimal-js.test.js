// Minimal test file with .test.js extension
const { test, expect } = require('vitest');

console.log('JS test file is being loaded');

test('minimal js test', () => {
  console.log('JS test is running');
  expect(1).toBe(1);
});
