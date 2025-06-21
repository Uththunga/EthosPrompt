import React from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { AlertCircle, RefreshCw, FileText } from 'lucide-react'
import { Card, CardContent } from './ui/Card'
import { Button } from './ui/Button'

interface PromptErrorBoundaryProps {
  children: React.ReactNode
  promptId?: string
  categoryId?: string
}

const PromptErrorFallback: React.FC<{ 
  error?: Error
  resetError: () => void
  promptId?: string
  categoryId?: string
}> = ({ error, resetError, promptId, categoryId }) => {
  return (
    <Card className="bg-orange-500/5 border-orange-500/20 my-4">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-orange-400">
              Prompt Loading Error
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              We couldn't load this prompt right now. This might be due to a temporary issue with the data.
            </p>
            
            {(promptId || categoryId) && (
              <div className="mt-2 text-xs text-gray-500">
                {promptId && <span>Prompt ID: {promptId}</span>}
                {categoryId && <span className="ml-3">Category: {categoryId}</span>}
              </div>
            )}
            
            <div className="flex gap-2 mt-4">
              <Button 
                size="sm" 
                onClick={resetError}
                className="flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Retry
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.location.href = '/categories'}
                className="flex items-center gap-1"
              >
                <FileText className="w-3 h-3" />
                Browse Categories
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const PromptErrorBoundary: React.FC<PromptErrorBoundaryProps> = ({ 
  children, 
  promptId, 
  categoryId 
}) => {
  return (
    <ErrorBoundary
      level="component"
      fallback={
        <PromptErrorFallback 
          resetError={() => window.location.reload()}
          promptId={promptId}
          categoryId={categoryId}
        />
      }
      onError={(error, errorInfo) => {
        // Log prompt-specific error details
        console.error('Prompt Error:', {
          promptId,
          categoryId,
          error: error.message,
          componentStack: errorInfo.componentStack
        })
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
