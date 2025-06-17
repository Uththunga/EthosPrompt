// Basic React test with a simple component
import { test, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';

// Simple component for testing
const Greeting = ({ name = 'World' }) => (
  <div>
    <h1>Hello, {name}!</h1>
    <p data-testid="greeting-text">Welcome to our app, {name}!</p>
  </div>
);

test('renders greeting with default name', () => {
  render(<Greeting />);
  expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  expect(screen.getByTestId('greeting-text')).toHaveTextContent('Welcome to our app, World!');
});

test('renders greeting with custom name', () => {
  render(<Greeting name="Vitest" />);
  expect(screen.getByText('Hello, Vitest!')).toBeInTheDocument();
  expect(screen.getByTestId('greeting-text')).toHaveTextContent('Welcome to our app, Vitest!');
});
