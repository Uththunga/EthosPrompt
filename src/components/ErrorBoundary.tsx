import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'
import { Button } from './ui/Button'
import { Card, CardContent, CardHeader } from './ui/Card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  showDetails?: boolean
  level?: 'page' | 'component' | 'critical'
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  errorId?: string
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    return { 
      hasError: true, 
      error,
      errorId
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught Error')
      console.error('Error:', error)
      console.error('Error Info:', errorInfo)
      console.error('Component Stack:', errorInfo.componentStack)
      console.groupEnd()
    }

    // Log error for production monitoring
    this.logError(error, errorInfo)

    // Call custom error handler
    this.props.onError?.(error, errorInfo)
  }

  private logError = (error: Error, errorInfo: ErrorInfo) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorId: this.state.errorId,
      level: this.props.level || 'component'
    }

    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrate with error tracking service (Sentry, LogRocket, etc.)
      console.error('Error logged:', errorData)
    }
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      errorId: undefined 
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      const { error, errorInfo, errorId } = this.state
      const { level = 'component', showDetails = process.env.NODE_ENV === 'development' } = this.props

      // Critical errors get full-page treatment
      if (level === 'critical') {
        return (
          <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-gray-800 border-red-500/20">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-red-400">Application Error</h1>
                <p className="text-gray-400 mt-2">
                  We're sorry, but something went wrong. Our team has been notified.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {showDetails && error && (
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Error Details:</h3>
                    <p className="text-sm text-red-400 font-mono">{error.message}</p>
                    {errorId && (
                      <p className="text-xs text-gray-500 mt-2">Error ID: {errorId}</p>
                    )}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={this.handleReload} className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Reload Page
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={this.handleGoHome}
                    className="flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Go Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      }

      // Component-level errors get inline treatment
      return (
        <Card className="bg-red-500/5 border-red-500/20 my-4">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-red-400">
                  {level === 'page' ? 'Page Error' : 'Component Error'}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  This section couldn't load properly. You can try refreshing or continue using other parts of the app.
                </p>
                
                {showDetails && error && (
                  <details className="mt-3">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                      Show technical details
                    </summary>
                    <div className="mt-2 p-3 bg-gray-900/50 rounded border border-gray-700">
                      <p className="text-xs text-red-400 font-mono break-all">{error.message}</p>
                      {errorId && (
                        <p className="text-xs text-gray-600 mt-1">ID: {errorId}</p>
                      )}
                    </div>
                  </details>
                )}
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    onClick={this.handleReset}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Try Again
                  </Button>
                  {process.env.NODE_ENV === 'development' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => console.log('Error details:', { error, errorInfo })}
                      className="flex items-center gap-1"
                    >
                      <Bug className="w-3 h-3" />
                      Debug
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}

// Higher-order component for easy wrapping
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  return WrappedComponent
}
