import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react'

export interface AppError {
  id: string
  message: string
  type: 'error' | 'warning' | 'info'
  timestamp: Date
  source?: string
  details?: any
  dismissed?: boolean
}

interface ErrorState {
  errors: AppError[]
  isLoading: boolean
}

type ErrorAction =
  | { type: 'ADD_ERROR'; payload: Omit<AppError, 'id' | 'timestamp'> }
  | { type: 'REMOVE_ERROR'; payload: { id: string } }
  | { type: 'DISMISS_ERROR'; payload: { id: string } }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'CLEAR_DISMISSED_ERRORS' }
  | { type: 'SET_LOADING'; payload: { isLoading: boolean } }

const errorReducer = (state: ErrorState, action: ErrorAction): ErrorState => {
  switch (action.type) {
    case 'ADD_ERROR': {
      const newError: AppError = {
        ...action.payload,
        id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        dismissed: false
      }
      
      // Prevent duplicate errors (same message within 5 seconds)
      const recentDuplicate = state.errors.find(
        error => 
          error.message === newError.message && 
          Date.now() - error.timestamp.getTime() < 5000
      )
      
      if (recentDuplicate) {
        return state
      }
      
      return {
        ...state,
        errors: [...state.errors, newError]
      }
    }
    
    case 'REMOVE_ERROR':
      return {
        ...state,
        errors: state.errors.filter(error => error.id !== action.payload.id)
      }
    
    case 'DISMISS_ERROR':
      return {
        ...state,
        errors: state.errors.map(error =>
          error.id === action.payload.id
            ? { ...error, dismissed: true }
            : error
        )
      }
    
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: []
      }
    
    case 'CLEAR_DISMISSED_ERRORS':
      return {
        ...state,
        errors: state.errors.filter(error => !error.dismissed)
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    
    default:
      return state
  }
}

interface ErrorContextValue {
  state: ErrorState
  addError: (message: string, type?: AppError['type'], source?: string, details?: any) => string
  removeError: (id: string) => void
  dismissError: (id: string) => void
  clearErrors: () => void
  clearDismissedErrors: () => void
  setLoading: (isLoading: boolean) => void
  
  // Convenience methods
  addWarning: (message: string, source?: string, details?: any) => string
  addInfo: (message: string, source?: string, details?: any) => string
  
  // Error handling helpers
  handleAsyncError: <T>(promise: Promise<T>, source?: string) => Promise<T>
  withErrorHandling: <T extends any[], R>(
    fn: (...args: T) => R | Promise<R>,
    source?: string
  ) => (...args: T) => Promise<R>
}

const ErrorContext = createContext<ErrorContextValue | null>(null)

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(errorReducer, { 
    errors: [],
    isLoading: false
  })

  const addError = useCallback((
    message: string, 
    type: AppError['type'] = 'error',
    source?: string,
    details?: any
  ): string => {
    const action = {
      type: 'ADD_ERROR' as const,
      payload: { message, type, source, details }
    }
    dispatch(action)
    
    // Return the error ID for tracking
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }, [])

  const removeError = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ERROR', payload: { id } })
  }, [])

  const dismissError = useCallback((id: string) => {
    dispatch({ type: 'DISMISS_ERROR', payload: { id } })
  }, [])

  const clearErrors = useCallback(() => {
    dispatch({ type: 'CLEAR_ERRORS' })
  }, [])

  const clearDismissedErrors = useCallback(() => {
    dispatch({ type: 'CLEAR_DISMISSED_ERRORS' })
  }, [])

  const setLoading = useCallback((isLoading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: { isLoading } })
  }, [])

  // Convenience methods
  const addWarning = useCallback((message: string, source?: string, details?: any) => 
    addError(message, 'warning', source, details), [addError])

  const addInfo = useCallback((message: string, source?: string, details?: any) => 
    addError(message, 'info', source, details), [addError])

  // Async error handling helper
  const handleAsyncError = useCallback(async <T>(
    promise: Promise<T>, 
    source?: string
  ): Promise<T> => {
    try {
      return await promise
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred'
      addError(message, 'error', source, error)
      throw error
    }
  }, [addError])

  // Function wrapper with error handling
  const withErrorHandling = useCallback(<T extends any[], R>(
    fn: (...args: T) => R | Promise<R>,
    source?: string
  ) => {
    return async (...args: T): Promise<R> => {
      try {
        const result = fn(...args)
        if (result instanceof Promise) {
          return await result
        }
        return result
      } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred'
        addError(message, 'error', source, error)
        throw error
      }
    }
  }, [addError])

  const value: ErrorContextValue = {
    state,
    addError,
    removeError,
    dismissError,
    clearErrors,
    clearDismissedErrors,
    setLoading,
    addWarning,
    addInfo,
    handleAsyncError,
    withErrorHandling
  }

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  )
}

export const useError = (): ErrorContextValue => {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}

// Hook for handling async operations with automatic error handling
export const useAsyncError = () => {
  const { handleAsyncError, addError, setLoading } = useError()
  
  return useCallback(async <T>(
    asyncFn: () => Promise<T>,
    options?: {
      source?: string
      loadingState?: boolean
      onError?: (error: Error) => void
    }
  ): Promise<T | null> => {
    try {
      if (options?.loadingState) {
        setLoading(true)
      }
      
      const result = await handleAsyncError(asyncFn(), options?.source)
      return result
    } catch (error) {
      options?.onError?.(error as Error)
      return null
    } finally {
      if (options?.loadingState) {
        setLoading(false)
      }
    }
  }, [handleAsyncError, addError, setLoading])
}
