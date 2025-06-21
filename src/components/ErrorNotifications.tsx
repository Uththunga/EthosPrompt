import React, { useEffect } from 'react'
import { useError } from '@/contexts/ErrorContext'
import { useToast } from '@/components/ui/Toast'
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react'

export const ErrorNotifications: React.FC = () => {
  const { state, removeError, dismissError } = useError()
  const { toast } = useToast()

  useEffect(() => {
    // Process new errors that haven't been dismissed
    const newErrors = state.errors.filter(error => !error.dismissed)
    
    newErrors.forEach(error => {
      const icon = error.type === 'error' 
        ? <AlertTriangle className="w-4 h-4" />
        : error.type === 'warning'
        ? <AlertCircle className="w-4 h-4" />
        : <Info className="w-4 h-4" />

      toast({
        id: error.id,
        variant: error.type === 'error' ? 'error' : error.type === 'warning' ? 'warning' : 'info',
        title: error.type === 'error' ? 'Error' : error.type === 'warning' ? 'Warning' : 'Info',
        description: (
          <div className="flex items-start gap-2">
            {icon}
            <div className="flex-1">
              <p className="text-sm">{error.message}</p>
              {error.source && (
                <p className="text-xs opacity-70 mt-1">Source: {error.source}</p>
              )}
            </div>
          </div>
        ),
        duration: error.type === 'error' ? 8000 : error.type === 'warning' ? 6000 : 4000,
        action: error.type === 'error' ? {
          altText: 'Dismiss error',
          onClick: () => {
            dismissError(error.id)
            // Auto-remove after dismissal
            setTimeout(() => removeError(error.id), 1000)
          },
          children: <X className="w-4 h-4" />
        } : undefined,
        onOpenChange: (open) => {
          if (!open) {
            dismissError(error.id)
            // Auto-remove after toast closes
            setTimeout(() => removeError(error.id), 1000)
          }
        }
      })

      // Mark as dismissed to prevent re-showing
      dismissError(error.id)
    })
  }, [state.errors, toast, dismissError, removeError])

  // Clean up dismissed errors periodically
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now()
      const oldErrors = state.errors.filter(
        error => error.dismissed && (now - error.timestamp.getTime()) > 30000 // 30 seconds
      )
      
      oldErrors.forEach(error => removeError(error.id))
    }, 10000) // Check every 10 seconds

    return () => clearInterval(cleanup)
  }, [state.errors, removeError])

  return null // This component only manages side effects
}

// Error notification hook for manual triggering
export const useErrorNotification = () => {
  const { addError, addWarning, addInfo } = useError()

  return {
    notifyError: (message: string, source?: string, details?: any) => 
      addError(message, 'error', source, details),
    notifyWarning: (message: string, source?: string, details?: any) => 
      addWarning(message, source, details),
    notifyInfo: (message: string, source?: string, details?: any) => 
      addInfo(message, source, details),
  }
}
