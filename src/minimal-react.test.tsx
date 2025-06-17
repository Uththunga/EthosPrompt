// minimal-react.test.tsx
import { test, expect } from 'vitest';
import React from 'react';

// Simple test using React without any JSX
test('Minimal React test - passes', () => {
  const element = React.createElement('div', { 'data-testid': 'test' }, 'Hello React');
  expect(element.props['data-testid']).toBe('test');
  expect(element.props.children).toBe('Hello React');
});
