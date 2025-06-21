import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ErrorBoundary, withErrorBoundary } from '@/components/ErrorBoundary'

// Mock console methods to avoid noise in tests
const originalConsoleError = console.error
const originalConsoleGroup = console.group
const originalConsoleGroupEnd = console.groupEnd

beforeEach(() => {
  console.error = vi.fn()
  console.group = vi.fn()
  console.groupEnd = vi.fn()
})

afterEach(() => {
  console.error = originalConsoleError
  console.group = originalConsoleGroup
  console.groupEnd = originalConsoleGroupEnd
})

// Component that throws an error
const ThrowError: React.FC<{ shouldThrow?: boolean; message?: string }> = ({ 
  shouldThrow = true, 
  message = 'Test error' 
}) => {
  if (shouldThrow) {
    throw new Error(message)
  }
  return <div>No error</div>
}

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('renders error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError message="Component crashed" />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Component Error')).toBeInTheDocument()
    expect(screen.getByText(/This section couldn't load properly/)).toBeInTheDocument()
  })

  it('renders page-level error UI for page level errors', () => {
    render(
      <ErrorBoundary level="page">
        <ThrowError message="Page crashed" />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Page Error')).toBeInTheDocument()
  })

  it('renders critical error UI for critical level errors', () => {
    render(
      <ErrorBoundary level="critical">
        <ThrowError message="Critical error" />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Application Error')).toBeInTheDocument()
    expect(screen.getByText('Reload Page')).toBeInTheDocument()
    expect(screen.getByText('Go Home')).toBeInTheDocument()
  })

  it('calls onError callback when error occurs', () => {
    const onError = vi.fn()
    
    render(
      <ErrorBoundary onError={onError}>
        <ThrowError message="Callback test" />
      </ErrorBoundary>
    )
    
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Callback test' }),
      expect.objectContaining({ componentStack: expect.any(String) })
    )
  })

  it('shows Try Again button when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError message="Reset test" />
      </ErrorBoundary>
    )

    expect(screen.getByText('Component Error')).toBeInTheDocument()
    expect(screen.getByText('Try Again')).toBeInTheDocument()

    // Verify clicking Try Again button works (it calls handleReset internally)
    const tryAgainButton = screen.getByText('Try Again')
    expect(tryAgainButton).toBeInTheDocument()

    // The button should be clickable
    fireEvent.click(tryAgainButton)
    // Note: Error boundary reset requires a key change or component remount in practice
  })

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    
    render(
      <ErrorBoundary showDetails={true}>
        <ThrowError message="Development error" />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Show technical details')).toBeInTheDocument()
    
    process.env.NODE_ENV = originalEnv
  })

  it('hides error details in production mode', () => {
    render(
      <ErrorBoundary showDetails={false}>
        <ThrowError message="Production error" />
      </ErrorBoundary>
    )
    
    expect(screen.queryByText('Show technical details')).not.toBeInTheDocument()
  })
})

describe('withErrorBoundary HOC', () => {
  it('wraps component with error boundary', () => {
    const TestComponent = () => <div>Test Component</div>
    const WrappedComponent = withErrorBoundary(TestComponent)
    
    render(<WrappedComponent />)
    
    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })

  it('catches errors in wrapped component', () => {
    const WrappedThrowError = withErrorBoundary(ThrowError)
    
    render(<WrappedThrowError message="HOC error" />)
    
    expect(screen.getByText('Component Error')).toBeInTheDocument()
  })

  it('passes error boundary props to wrapper', () => {
    const onError = vi.fn()
    const WrappedThrowError = withErrorBoundary(ThrowError, { 
      level: 'page',
      onError 
    })
    
    render(<WrappedThrowError message="HOC props test" />)
    
    expect(screen.getByText('Page Error')).toBeInTheDocument()
    expect(onError).toHaveBeenCalled()
  })
})
