import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';

function HelloWorld({ name = 'World' }) {
  return <h1>Hello, {name}!</h1>;
}

describe('HelloWorld', () => {
  it('renders hello world', () => {
    render(<HelloWorld />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  it('renders with custom name', () => {
    render(<HelloWorld name="Vitest" />);
    expect(screen.getByText('Hello, Vitest!')).toBeInTheDocument();
  });
});
