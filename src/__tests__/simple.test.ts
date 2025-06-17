import { describe, it, expect } from 'vitest';

// Simple test to verify Vitest is working
describe('Simple Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('should fail', () => {
    expect(1 + 2).toBe(3);
  });
});
