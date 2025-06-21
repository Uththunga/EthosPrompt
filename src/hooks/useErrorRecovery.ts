import { useState, useCallback, useRef } from 'react'
import { useError } from '@/contexts/ErrorContext'

interface ErrorRecoveryOptions {
  maxRetries?: number
  retryDelay?: number
  exponentialBackoff?: boolean
  onRetry?: (attempt: number) => void
  onMaxRetriesReached?: () => void
  onSuccess?: () => void
  onError?: (error: Error, attempt: number) => void
}

interface ErrorRecoveryState {
  isLoading: boolean
  error: Error | null
  retryCount: number
  canRetry: boolean
  lastAttempt: Date | null
}

export const useErrorRecovery = <T>(
  operation: () => Promise<T>,
  options: ErrorRecoveryOptions = {}
) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    exponentialBackoff = true,
    onRetry,
    onMaxRetriesReached,
    onSuccess,
    onError
  } = options

  const { addError } = useError()
  const retryTimeoutRef = useRef<NodeJS.Timeout>()

  const [state, setState] = useState<ErrorRecoveryState>({
    isLoading: false,
    error: null,
    retryCount: 0,
    canRetry: true,
    lastAttempt: null
  })

  const calculateDelay = useCallback((attempt: number) => {
    if (!exponentialBackoff) return retryDelay
    return retryDelay * Math.pow(2, attempt - 1)
  }, [retryDelay, exponentialBackoff])

  const execute = useCallback(async (isRetry = false): Promise<T | null> => {
    const currentAttempt = isRetry ? state.retryCount + 1 : 1

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      retryCount: currentAttempt,
      lastAttempt: new Date()
    }))

    try {
      const result = await operation()
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: null,
        canRetry: true
      }))

      onSuccess?.()
      return result
    } catch (error) {
      const err = error as Error
      const canRetryAgain = currentAttempt < maxRetries

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err,
        canRetry: canRetryAgain
      }))

      onError?.(err, currentAttempt)

      if (canRetryAgain) {
        addError(
          `Operation failed (attempt ${currentAttempt}/${maxRetries}). Retrying...`,
          'warning',
          'ErrorRecovery'
        )
      } else {
        addError(
          `Operation failed after ${maxRetries} attempts: ${err.message}`,
          'error',
          'ErrorRecovery'
        )
        onMaxRetriesReached?.()
      }

      throw err
    }
  }, [operation, state.retryCount, maxRetries, addError, onError, onSuccess, onMaxRetriesReached])

  const retry = useCallback(() => {
    if (!state.canRetry || state.isLoading) return

    onRetry?.(state.retryCount + 1)

    const delay = calculateDelay(state.retryCount + 1)
    
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
    }

    retryTimeoutRef.current = setTimeout(() => {
      execute(true).catch(() => {
        // Error is already handled in execute
      })
    }, delay)
  }, [state.canRetry, state.isLoading, state.retryCount, calculateDelay, execute, onRetry])

  const reset = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
    }

    setState({
      isLoading: false,
      error: null,
      retryCount: 0,
      canRetry: true,
      lastAttempt: null
    })
  }, [])

  const autoRetry = useCallback(() => {
    if (state.canRetry && !state.isLoading) {
      retry()
    }
  }, [state.canRetry, state.isLoading, retry])

  return {
    ...state,
    execute,
    retry,
    autoRetry,
    reset,
    nextRetryDelay: state.canRetry ? calculateDelay(state.retryCount + 1) : null
  }
}

// Hook for handling network-specific errors with smart retry logic
export const useNetworkErrorRecovery = <T>(
  operation: () => Promise<T>,
  options: Omit<ErrorRecoveryOptions, 'maxRetries'> & { 
    networkTimeoutMs?: number 
  } = {}
) => {
  const { networkTimeoutMs = 10000, ...recoveryOptions } = options

  const isNetworkError = useCallback((error: Error) => {
    const message = error.message.toLowerCase()
    return (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('timeout') ||
      message.includes('connection') ||
      error.name === 'NetworkError' ||
      error.name === 'TypeError'
    )
  }, [])

  const wrappedOperation = useCallback(async () => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), networkTimeoutMs)

    try {
      const result = await operation()
      clearTimeout(timeoutId)
      return result
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }, [operation, networkTimeoutMs])

  return useErrorRecovery(wrappedOperation, {
    maxRetries: 5, // More retries for network errors
    retryDelay: 2000,
    exponentialBackoff: true,
    ...recoveryOptions,
    onError: (error, attempt) => {
      if (isNetworkError(error)) {
        console.log(`Network error on attempt ${attempt}:`, error.message)
      }
      recoveryOptions.onError?.(error, attempt)
    }
  })
}

// Hook for handling user action errors with immediate feedback
export const useUserActionRecovery = <T>(
  operation: () => Promise<T>,
  options: ErrorRecoveryOptions & {
    actionName?: string
    showSuccessMessage?: boolean
  } = {}
) => {
  const { actionName = 'Action', showSuccessMessage = true, ...recoveryOptions } = options
  const { addInfo } = useError()

  return useErrorRecovery(operation, {
    maxRetries: 2, // Fewer retries for user actions
    retryDelay: 500,
    exponentialBackoff: false,
    ...recoveryOptions,
    onSuccess: () => {
      if (showSuccessMessage) {
        addInfo(`${actionName} completed successfully`, 'info', 'UserAction')
      }
      recoveryOptions.onSuccess?.()
    },
    onError: (error, attempt) => {
      console.log(`${actionName} failed on attempt ${attempt}:`, error.message)
      recoveryOptions.onError?.(error, attempt)
    }
  })
}
