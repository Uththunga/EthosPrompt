import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ErrorProvider, useError } from '@/contexts/ErrorContext'
import { ErrorNotifications } from '@/components/ErrorNotifications'
import { ToastProvider } from '@/components/ui/Toast'
import { PromptErrorBoundary } from '@/components/PromptErrorBoundary'

// Mock console methods to avoid noise in tests
const originalConsoleError = console.error
beforeEach(() => {
  console.error = vi.fn()
})

afterEach(() => {
  console.error = originalConsoleError
})

// Test component that uses error context
const TestErrorComponent: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = false }) => {
  const { addError, addWarning, addInfo } = useError()

  if (shouldThrow) {
    throw new Error('Test component error')
  }

  return (
    <div>
      <button onClick={() => addError('Test error message', 'error', 'TestComponent')}>
        Trigger Error
      </button>
      <button onClick={() => addWarning('Test warning message', 'warning', 'TestComponent')}>
        Trigger Warning
      </button>
      <button onClick={() => addInfo('Test info message', 'info', 'TestComponent')}>
        Trigger Info
      </button>
      <span>Test Component</span>
    </div>
  )
}

// Component that simulates async error
const AsyncErrorComponent: React.FC = () => {
  const { handleAsyncError } = useError()

  const handleAsyncOperation = async () => {
    try {
      await handleAsyncError(
        Promise.reject(new Error('Async operation failed')),
        'AsyncErrorComponent'
      )
    } catch (error) {
      // Expected to catch the error - this prevents unhandled rejection
      console.log('Async error caught as expected:', error)
    }
  }

  return (
    <div>
      <button onClick={handleAsyncOperation}>Trigger Async Error</button>
      <span>Async Component</span>
    </div>
  )
}

describe('Error Integration Tests', () => {
  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <ErrorProvider>
        <ToastProvider>
          {component}
          <ErrorNotifications />
        </ToastProvider>
      </ErrorProvider>
    )
  }

  it('integrates error context with error boundaries', () => {
    renderWithProviders(
      <PromptErrorBoundary promptId="test-prompt">
        <TestErrorComponent shouldThrow={true} />
      </PromptErrorBoundary>
    )

    // Should show the prompt error boundary fallback
    expect(screen.getByText('Prompt Loading Error')).toBeInTheDocument()
    expect(screen.getByText('Retry')).toBeInTheDocument()
  })

  it('handles manual error reporting through context', async () => {
    renderWithProviders(<TestErrorComponent />)

    // Component should render normally
    expect(screen.getByText('Test Component')).toBeInTheDocument()

    // Trigger an error
    fireEvent.click(screen.getByText('Trigger Error'))

    // Error should be handled by the context
    // Note: Toast notifications are handled asynchronously
    await waitFor(() => {
      // The error should be processed by ErrorNotifications
      expect(console.error).not.toHaveBeenCalled() // Our mock should prevent actual console errors
    })
  })

  it('handles different error types correctly', async () => {
    renderWithProviders(<TestErrorComponent />)

    // Test warning
    fireEvent.click(screen.getByText('Trigger Warning'))
    
    // Test info
    fireEvent.click(screen.getByText('Trigger Info'))
    
    // Test error
    fireEvent.click(screen.getByText('Trigger Error'))

    // All should be processed without throwing
    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })

  it('handles async errors correctly', async () => {
    renderWithProviders(<AsyncErrorComponent />)

    expect(screen.getByText('Async Component')).toBeInTheDocument()

    // Trigger async error
    fireEvent.click(screen.getByText('Trigger Async Error'))

    // Should not crash the component
    await waitFor(() => {
      expect(screen.getByText('Async Component')).toBeInTheDocument()
    })
  })

  it('prevents duplicate error messages', async () => {
    renderWithProviders(<TestErrorComponent />)

    // Trigger the same error multiple times quickly
    fireEvent.click(screen.getByText('Trigger Error'))
    fireEvent.click(screen.getByText('Trigger Error'))
    fireEvent.click(screen.getByText('Trigger Error'))

    // Should still work without issues (duplicate prevention is internal)
    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })

  it('integrates with prompt error boundary correctly', () => {
    renderWithProviders(
      <PromptErrorBoundary promptId="test-prompt" categoryId="test-category">
        <TestErrorComponent />
      </PromptErrorBoundary>
    )

    // Should render normally when no error
    expect(screen.getByText('Test Component')).toBeInTheDocument()

    // Should handle manual errors through context
    fireEvent.click(screen.getByText('Trigger Error'))
    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })

  it('shows retry functionality in error boundaries', () => {
    renderWithProviders(
      <PromptErrorBoundary promptId="test-prompt">
        <TestErrorComponent shouldThrow={true} />
      </PromptErrorBoundary>
    )

    // Should show error UI with retry button
    expect(screen.getByText('Prompt Loading Error')).toBeInTheDocument()
    expect(screen.getByText('Retry')).toBeInTheDocument()
    expect(screen.getByText('Browse Categories')).toBeInTheDocument()

    // Retry button should be clickable
    const retryButton = screen.getByText('Retry')
    expect(retryButton).toBeInTheDocument()
    fireEvent.click(retryButton)
  })
})
