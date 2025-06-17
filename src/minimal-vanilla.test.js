// minimal-vanilla.test.js
import { test, expect } from 'vitest';

// This is a minimal test file that doesn't rely on React or any other dependencies
test('1 + 1 equals 2', () => {
  expect(1 + 1).toBe(2);
});

test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});
