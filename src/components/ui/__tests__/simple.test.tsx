// simple.test.tsx
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Basic test to verify the testing setup is working
test('Simple Test - basic assertion', () => {
  expect(1 + 1).toBe(2);
});

test('Simple Test - render div with text', () => {
  render(<div>Test</div>);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
