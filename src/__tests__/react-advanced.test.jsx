// Advanced React test with various testing scenarios
import { test, expect, describe, beforeEach } from 'vitest';
import React, { useState, useEffect } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Component with state and effects
const Counter = ({ initialValue = 0, onIncrement, onDecrement }) => {
  const [count, setCount] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onIncrement?.(newCount);
  };

  const handleDecrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    onDecrement?.(newCount);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={handleDecrement} data-testid="decrement">-</button>
      <span data-testid="count">{count}</span>
      <button onClick={handleIncrement} data-testid="increment">+</button>
      {count < 0 && <div data-testid="warning">Count cannot be negative!</div>}
    </div>
  );
};

// Form component for testing user interactions
const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Both fields are required');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      {error && <div data-testid="error-message">{error}</div>}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          data-testid="email-input"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          data-testid="password-input"
        />
      </div>
      <button type="submit" data-testid="submit-button">Login</button>
    </form>
  );
};

describe('Advanced React Component Tests', () => {
  describe('Counter Component', () => {
    test('renders with initial value', async () => {
      render(<Counter initialValue={5} />);
      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.getByTestId('count')).toHaveTextContent('5');
      });
    });

    test('increments counter when + is clicked', async () => {
      const user = userEvent.setup();
      render(<Counter initialValue={0} />);
      // Wait for loading to complete
      await waitFor(async () => {
        await user.click(screen.getByTestId('increment'));
        expect(screen.getByTestId('count')).toHaveTextContent('1');
      });
    });

    test('decrements counter when - is clicked', async () => {
      const user = userEvent.setup();
      render(<Counter initialValue={1} />);
      // Wait for loading to complete
      await waitFor(async () => {
        await user.click(screen.getByTestId('decrement'));
        expect(screen.getByTestId('count')).toHaveTextContent('0');
      });
    });

    test('shows warning when count is negative', async () => {
      const user = userEvent.setup();
      render(<Counter initialValue={0} />);
      // Wait for loading to complete
      await waitFor(async () => {
        await user.click(screen.getByTestId('decrement'));
        expect(screen.getByTestId('warning')).toBeInTheDocument();
      });
    });

    test('calls onIncrement callback when counter is incremented', async () => {
      const user = userEvent.setup();
      const handleIncrement = vi.fn();
      render(<Counter initialValue={0} onIncrement={handleIncrement} />);
      // Wait for loading to complete
      await waitFor(async () => {
        await user.click(screen.getByTestId('increment'));
        expect(handleIncrement).toHaveBeenCalledWith(1);
      });
    });

    test('shows loading state initially', () => {
      render(<Counter />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('hides loading state after data loads', async () => {
      render(<Counter />);
      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
    });
  });

  describe('LoginForm Component', () => {
    test('renders form with all fields', () => {
      render(<LoginForm />);
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
      expect(screen.getByTestId('password-input')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    test('shows error when form is submitted with empty fields', async () => {
      const user = userEvent.setup();
      render(<LoginForm />);
      await user.click(screen.getByTestId('submit-button'));
      expect(screen.getByTestId('error-message')).toHaveTextContent('Both fields are required');
    });

    test('calls onSubmit with form data when form is valid', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<LoginForm onSubmit={handleSubmit} />);
      
      await user.type(screen.getByTestId('email-input'), 'test@example.com');
      await user.type(screen.getByTestId('password-input'), 'password123');
      await user.click(screen.getByTestId('submit-button'));
      
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
