// Simple test file for debugging
import { test, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';

const Simple = () => <div>Simple Test</div>;

test('renders simple component', () => {
  render(<Simple />);
  expect(screen.getByText('Simple Test')).toBeInTheDocument();
});
