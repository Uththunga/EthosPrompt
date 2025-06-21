# Error Handling Guide

## Overview

This guide covers the comprehensive error handling system implemented in EthosPrompt. Our error handling strategy focuses on graceful degradation, user-friendly feedback, and automatic recovery mechanisms.

## Architecture

### Error Boundary Hierarchy

```
App (Critical Level)
├── ErrorProvider (Global Context)
├── ToastProvider (Notifications)
└── Router
    ├── ErrorBoundary (Page Level)
    └── Routes
        ├── CategoryPage
        │   └── PromptErrorBoundary (Component Level)
        └── PromptDetailPage
            └── PromptErrorBoundary (Component Level)
```

### Error Types and Handling

1. **Critical Errors** - Application-level failures
2. **Page Errors** - Route/page-level failures  
3. **Component Errors** - Individual component failures
4. **Async Errors** - Network and data fetching failures
5. **User Action Errors** - Clipboard, form submission, etc.

## Components

### ErrorBoundary

The main error boundary component with multiple levels of error handling.

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary'

// Critical level - full page error
<ErrorBoundary level="critical">
  <App />
</ErrorBoundary>

// Page level - route error with navigation
<ErrorBoundary level="page">
  <Routes />
</ErrorBoundary>

// Component level - inline error display
<ErrorBoundary level="component">
  <SomeComponent />
</ErrorBoundary>
```

### PromptErrorBoundary

Specialized error boundary for prompt-related components.

```typescript
import { PromptErrorBoundary } from '@/components/PromptErrorBoundary'

<PromptErrorBoundary promptId="123" categoryId="abc">
  <PromptCard prompt={prompt} />
</PromptErrorBoundary>
```

### AsyncErrorBoundary

Error boundary with loading states and retry functionality for async operations.

```typescript
import { AsyncErrorBoundary } from '@/components/AsyncErrorBoundary'

<AsyncErrorBoundary
  onRetry={refetchData}
  retryable={true}
  source="DataFetching"
>
  <DataComponent />
</AsyncErrorBoundary>
```

## Context and Hooks

### ErrorContext

Global error management with centralized error handling.

```typescript
import { useError } from '@/contexts/ErrorContext'

const { addError, addWarning, addInfo, clearErrors } = useError()

// Add different types of errors
addError('Something went wrong', 'error', 'ComponentName')
addWarning('This might cause issues', 'warning', 'ComponentName')
addInfo('Operation completed', 'info', 'ComponentName')
```

### Error Recovery Hooks

#### useErrorRecovery

General-purpose error recovery with automatic retry logic.

```typescript
import { useErrorRecovery } from '@/hooks/useErrorRecovery'

const { execute, retry, isLoading, error, canRetry } = useErrorRecovery(
  async () => {
    const response = await fetch('/api/data')
    return response.json()
  },
  {
    maxRetries: 3,
    retryDelay: 1000,
    exponentialBackoff: true,
    onRetry: (attempt) => console.log(`Retry attempt ${attempt}`),
    onMaxRetriesReached: () => console.log('Max retries reached'),
    onSuccess: () => console.log('Operation successful')
  }
)
```

#### useNetworkErrorRecovery

Specialized for network operations with timeout handling.

```typescript
import { useNetworkErrorRecovery } from '@/hooks/useErrorRecovery'

const { execute, retry, isLoading } = useNetworkErrorRecovery(
  async () => {
    return await fetchPrompts()
  },
  {
    networkTimeoutMs: 10000,
    onError: (error, attempt) => {
      console.log(`Network error on attempt ${attempt}:`, error)
    }
  }
)
```

#### useUserActionRecovery

For user-initiated actions with immediate feedback.

```typescript
import { useUserActionRecovery } from '@/hooks/useErrorRecovery'

const { execute } = useUserActionRecovery(
  async () => {
    await navigator.clipboard.writeText(text)
  },
  {
    actionName: 'Copy to Clipboard',
    showSuccessMessage: true,
    maxRetries: 2
  }
)
```

## Error Notification System

### Toast Integration

Errors are automatically displayed as toast notifications through the ErrorNotifications component.

```typescript
// Automatic toast notifications for all errors added to context
<ErrorNotifications />
```

### Notification Types

- **Error** (Red) - Critical issues requiring attention
- **Warning** (Orange) - Potential issues or failed operations
- **Info** (Blue) - Successful operations or informational messages

## Best Practices

### 1. Error Boundary Placement

```typescript
// ✅ Good - Wrap at appropriate levels
<ErrorBoundary level="page">
  <CategoryPage />
</ErrorBoundary>

// ❌ Bad - Too granular
<ErrorBoundary>
  <Button />
</ErrorBoundary>
```

### 2. Error Context Usage

```typescript
// ✅ Good - Descriptive error messages
addError('Failed to copy prompt to clipboard. Please try selecting and copying manually.', 'warning', 'PromptCard')

// ❌ Bad - Generic error messages
addError('Error occurred', 'error')
```

### 3. Async Error Handling

```typescript
// ✅ Good - Use error recovery hooks
const { execute, retry, isLoading, error } = useErrorRecovery(asyncOperation)

// ❌ Bad - Manual try-catch without recovery
try {
  await asyncOperation()
} catch (error) {
  console.error(error)
}
```

### 4. User Feedback

```typescript
// ✅ Good - Provide actionable feedback
if (error) {
  return (
    <div>
      <p>Failed to load prompts. Please check your connection.</p>
      <button onClick={retry}>Try Again</button>
    </div>
  )
}

// ❌ Bad - Generic error message
if (error) {
  return <div>Error occurred</div>
}
```

## Error Recovery Strategies

### 1. Automatic Retry

- Network errors: 5 retries with exponential backoff
- User actions: 2 retries with fixed delay
- Data fetching: 3 retries with exponential backoff

### 2. Graceful Degradation

- Show skeleton loaders during retry attempts
- Provide alternative actions when operations fail
- Maintain app functionality even with partial failures

### 3. User-Initiated Recovery

- Clear retry buttons in error states
- "Go Back" navigation for page errors
- "Reload Page" option for critical errors

## Monitoring and Debugging

### Development Mode

- Detailed error information in error boundaries
- Console logging for all error context operations
- Component stack traces in error details

### Production Mode

- User-friendly error messages
- Error IDs for tracking
- Automatic error reporting (when configured)

### Error Logging

```typescript
// Error data structure for monitoring
{
  message: string,
  stack: string,
  componentStack: string,
  timestamp: string,
  userAgent: string,
  url: string,
  errorId: string,
  level: 'critical' | 'page' | 'component'
}
```

## Testing Error Handling

### Error Boundary Tests

```typescript
// Test error boundary behavior
it('renders error UI when child component throws', () => {
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  )
  
  expect(screen.getByText('Component Error')).toBeInTheDocument()
})
```

### Error Context Tests

```typescript
// Test error context integration
it('handles manual error reporting', () => {
  const { addError } = useError()
  
  addError('Test error', 'error', 'TestComponent')
  
  // Verify error is handled appropriately
})
```

### Recovery Hook Tests

```typescript
// Test retry functionality
it('retries failed operations', async () => {
  const { retry, execute } = useErrorRecovery(failingOperation)
  
  await expect(execute()).rejects.toThrow()
  
  // Test retry mechanism
  retry()
})
```

## Configuration

### Error Boundary Configuration

```typescript
// Customize error boundary behavior
<ErrorBoundary
  level="component"
  showDetails={process.env.NODE_ENV === 'development'}
  onError={(error, errorInfo) => {
    // Custom error handling
    sendToErrorTracking(error, errorInfo)
  }}
>
  <Component />
</ErrorBoundary>
```

### Recovery Hook Configuration

```typescript
// Customize retry behavior
const recovery = useErrorRecovery(operation, {
  maxRetries: 5,
  retryDelay: 2000,
  exponentialBackoff: true,
  onMaxRetriesReached: () => {
    // Handle max retries reached
  }
})
```

## Integration with External Services

### Error Tracking

```typescript
// Example Sentry integration
import * as Sentry from '@sentry/react'

const logError = (error: Error, errorInfo: ErrorInfo) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack
        }
      }
    })
  }
}
```

### Analytics

```typescript
// Track error patterns
const trackError = (error: Error, context: string) => {
  analytics.track('Error Occurred', {
    error: error.message,
    context,
    timestamp: new Date().toISOString()
  })
}
```

---

This error handling system provides a robust foundation for managing errors gracefully while maintaining a positive user experience. The combination of error boundaries, context management, and recovery mechanisms ensures that users can continue using the application even when individual components or operations fail.
