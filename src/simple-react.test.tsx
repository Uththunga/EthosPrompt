// simple-react.test.tsx
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Basic test to verify React component testing works
test('Simple React Test - renders a div with text', () => {
  render(<div>Test Content</div>);
  expect(screen.getByText('Test Content')).toBeInTheDocument();
});
