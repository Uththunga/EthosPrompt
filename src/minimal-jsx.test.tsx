// minimal-jsx.test.tsx
import { test, expect } from 'vitest';

// Test with JSX syntax
test('Minimal JSX test - passes', () => {
  const element = <div>Hello JSX</div>;
  expect(element.props.children).toBe('Hello JSX');
});
