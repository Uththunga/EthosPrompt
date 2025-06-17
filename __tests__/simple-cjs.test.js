const { test, expect } = require('vitest');

// Simple test to verify Vitest is working
test('CJS test in __tests__', () => {
  expect(1 + 1).toBe(2);
  console.log('CJS test in __tests__ ran successfully');
});
