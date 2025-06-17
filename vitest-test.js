// Simple test to verify Vitest works with Node.js v20.18.0
import { test, expect } from 'vitest';

test('addition works', () => {
  console.log('Running test with Node.js version:', process.version);
  expect(1 + 1).toBe(2);
});

test('async test', async () => {
  const result = await Promise.resolve('test');
  expect(result).toBe('test');
});
