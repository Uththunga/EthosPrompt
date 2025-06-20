// minimal-jsx.test.jsx
import React from 'react';
import { test, expect } from 'vitest';
import { render } from '@testing-library/react';

// Simple test with JSX syntax
test('Minimal JSX test - passes', () => {
  const { container } = render(<div>Hello JSX</div>);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      Hello JSX
    </div>
  `);
});
