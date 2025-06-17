// minimal-jsx-only.test.jsx
import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

test('renders a div', () => {
  const { container } = render(<div>Test</div>);
  expect(container.firstChild).toMatchInlineSnapshot(`<div>Test</div>`);
});
