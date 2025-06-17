// Simple React component test
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import React from 'react';

function Greeting({ name = 'World' }) {
  return <h1>Hello, {name}!</h1>;
}

test('renders greeting', () => {
  render(<Greeting />);
  expect(screen.getByText('Hello, World!')).toBeInTheDocument();
});

test('renders with custom name', () => {
  render(<Greeting name="Vitest" />);
  expect(screen.getByText('Hello, Vitest!')).toBeInTheDocument();
});
