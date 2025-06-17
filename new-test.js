// Simple test to verify Vitest execution
import { test, expect } from 'vitest';

test('new test', () => {
  console.log('New test is running');
  expect(1 + 1).toBe(2);
});
