// Simple debug test to verify test execution
import { test, expect } from 'vitest';

console.log('Debug test file is being loaded');

test('debug test', () => {
  console.log('Debug test is running');
  expect(1 + 1).toBe(2);
});
