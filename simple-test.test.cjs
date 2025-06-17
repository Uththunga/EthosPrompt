// Simple test file with .cjs extension
const { test, expect, beforeAll, afterAll, describe } = require('vitest');

describe('Test Suite', () => {
  beforeAll(() => {
    console.log('Test suite is starting...');
  });

  afterAll(() => {
    console.log('Test suite completed');
  });

  test('Simple test with .cjs extension', async () => {
    console.log('Test is running...');
    expect(1 + 1).toBe(2);
    console.log('Test with .cjs extension ran successfully');
  });

  test('Async test example', async () => {
    console.log('Async test is running...');
    const result = await Promise.resolve(42);
    expect(result).toBe(42);
    console.log('Async test completed');
  });
});
