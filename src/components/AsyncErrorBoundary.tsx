import React, { useState, useEffect, ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { useError } from '@/contexts/ErrorContext'
import { Loader2, AlertTriangle, RefreshCw } from 'lucide-react'
import { Card, CardContent } from './ui/Card'
import { Button } from './ui/Button'

interface AsyncErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  loadingFallback?: ReactNode
  onRetry?: () => void | Promise<void>
  retryable?: boolean
  source?: string
}

interface AsyncErrorState {
  isLoading: boolean
  error: Error | null
  retryCount: number
}

export const AsyncErrorBoundary: React.FC<AsyncErrorBoundaryProps> = ({
  children,
  fallback,
  loadingFallback,
  onRetry,
  retryable = true,
  source = 'AsyncOperation'
}) => {
  const [asyncState, setAsyncState] = useState<AsyncErrorState>({
    isLoading: false,
    error: null,
    retryCount: 0
  })
  const { addError } = useError()

  const handleRetry = async () => {
    if (!onRetry) return

    setAsyncState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      retryCount: prev.retryCount + 1
    }))

    try {
      await onRetry()
      setAsyncState(prev => ({
        ...prev,
        isLoading: false,
        error: null
      }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Retry failed'
      setAsyncState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error
      }))
      addError(errorMessage, 'error', source, { retryCount: asyncState.retryCount + 1 })
    }
  }

  // Loading state fallback
  if (asyncState.isLoading) {
    if (loadingFallback) {
      return <>{loadingFallback}</>
    }

    return (
      <Card className="bg-blue-500/5 border-blue-500/20 my-4">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            <div>
              <h3 className="text-sm font-medium text-blue-400">Loading...</h3>
              <p className="text-sm text-gray-400">
                {asyncState.retryCount > 0 ? 'Retrying...' : 'Please wait while we load the content.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Async error state fallback
  if (asyncState.error) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <Card className="bg-red-500/5 border-red-500/20 my-4">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-red-400">
                Loading Failed
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {asyncState.error.message}
              </p>
              
              {asyncState.retryCount > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Retry attempts: {asyncState.retryCount}
                </p>
              )}
              
              {retryable && onRetry && (
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    onClick={handleRetry}
                    disabled={asyncState.retryCount >= 3}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    {asyncState.retryCount >= 3 ? 'Max Retries Reached' : 'Retry'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Wrap children in regular error boundary
  return (
    <ErrorBoundary
      level="component"
      onError={(error, errorInfo) => {
        addError(error.message, 'error', source, { 
          componentStack: errorInfo.componentStack,
          asyncState 
        })
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

// Hook for managing async operations with error handling
export const useAsyncOperation = <T,>(
  operation: () => Promise<T>,
  dependencies: React.DependencyList = [],
  options?: {
    source?: string
    autoRetry?: boolean
    maxRetries?: number
  }
) => {
  const [state, setState] = useState<{
    data: T | null
    loading: boolean
    error: Error | null
    retryCount: number
  }>({
    data: null,
    loading: false,
    error: null,
    retryCount: 0
  })

  const { addError } = useError()

  const execute = async (isRetry = false) => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      retryCount: isRetry ? prev.retryCount + 1 : 0
    }))

    try {
      const result = await operation()
      setState(prev => ({
        ...prev,
        data: result,
        loading: false,
        error: null
      }))
      return result
    } catch (error) {
      const err = error as Error
      setState(prev => ({
        ...prev,
        loading: false,
        error: err
      }))
      
      addError(err.message, 'error', options?.source, { 
        retryCount: state.retryCount,
        autoRetry: options?.autoRetry 
      })
      
      // Auto-retry logic
      if (options?.autoRetry && state.retryCount < (options.maxRetries || 2)) {
        setTimeout(() => execute(true), 1000 * Math.pow(2, state.retryCount)) // Exponential backoff
      }
      
      throw err
    }
  }

  const retry = () => execute(true)

  useEffect(() => {
    execute()
  }, dependencies)

  return {
    ...state,
    execute,
    retry,
    canRetry: state.retryCount < (options?.maxRetries || 3)
  }
}
