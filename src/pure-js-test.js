// pure-js-test.js
import { test, expect } from 'vitest';

test('pure js test - should pass', () => {
  expect(1 + 1).toBe(2);
});

test('pure js test - should fail', () => {
  expect(1 + 1).toBe(3);
});
