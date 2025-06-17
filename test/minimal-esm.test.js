// @vitest-environment node
import { test, expect } from 'vitest';

// Simple test to verify ESM imports work
test('minimal ESM test', () => {
  expect(1 + 1).toBe(2);
  console.log('Minimal ESM test ran successfully');
});
