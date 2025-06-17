// Enhanced React test with multiple test cases
import { test, expect, describe, beforeEach } from 'vitest';
import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Simple component for testing
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <span data-testid="count">{count}</span>
    </div>
  );
};

// Component with props
const Greeting = ({ name = 'World' }) => (
  <div>
    <h1>Hello, {name}!</h1>
    <p data-testid="greeting-text">Welcome to our app, {name}!</p>
  </div>
);

describe('React Component Tests', () => {
  test('renders hello world', () => {
    render(<Greeting />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    expect(screen.getByTestId('greeting-text')).toHaveTextContent('Welcome to our app, World!');
  });

  test('renders with custom name', () => {
    render(<Greeting name="Vitest" />);
    expect(screen.getByText('Hello, Vitest!')).toBeInTheDocument();
    expect(screen.getByTestId('greeting-text')).toHaveTextContent('Welcome to our app, Vitest!');
  });

  test('counter increments when button is clicked', () => {
    render(<Counter />);
    const button = screen.getByRole('button', { name: /increment/i });
    const count = screen.getByTestId('count');
    
    expect(count).toHaveTextContent('0');
    
    fireEvent.click(button);
    expect(count).toHaveTextContent('1');
    
    fireEvent.click(button);
    expect(count).toHaveTextContent('2');
  });

  test('matches snapshot', () => {
    const { container } = render(<Greeting name="Snapshot" />);
    expect(container).toMatchSnapshot();
  });
});
