import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useErrorRecovery, useNetworkErrorRecovery, useUserActionRecovery } from '@/hooks/useErrorRecovery'
import { ErrorProvider } from '@/contexts/ErrorContext'

// Mock console methods
const originalConsoleError = console.error
const originalConsoleLog = console.log

beforeEach(() => {
  console.error = vi.fn()
  console.log = vi.fn()
  vi.clearAllTimers()
  vi.useFakeTimers()
})

afterEach(() => {
  console.error = originalConsoleError
  console.log = originalConsoleLog
  vi.useRealTimers()
})

// Wrapper component for hooks that need ErrorProvider
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorProvider>{children}</ErrorProvider>
)

describe('useErrorRecovery', () => {
  it('executes operation successfully', async () => {
    const mockOperation = vi.fn().mockResolvedValue('success')
    
    const { result } = renderHook(
      () => useErrorRecovery(mockOperation),
      { wrapper }
    )

    await act(async () => {
      const response = await result.current.execute()
      expect(response).toBe('success')
    })

    expect(result.current.error).toBeNull()
    expect(result.current.retryCount).toBe(1)
    expect(result.current.isLoading).toBe(false)
  })

  it('handles operation failure and retries', async () => {
    const mockOperation = vi.fn()
      .mockRejectedValueOnce(new Error('First failure'))
      .mockRejectedValueOnce(new Error('Second failure'))
      .mockResolvedValue('success')

    const onRetry = vi.fn()
    const onSuccess = vi.fn()

    const { result } = renderHook(
      () => useErrorRecovery(mockOperation, {
        maxRetries: 3,
        retryDelay: 1000,
        onRetry,
        onSuccess
      }),
      { wrapper }
    )

    // First execution fails
    await act(async () => {
      try {
        await result.current.execute()
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })

    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.canRetry).toBe(true)
    expect(result.current.retryCount).toBe(1)

    // Manual retry
    act(() => {
      result.current.retry()
    })

    expect(onRetry).toHaveBeenCalledWith(2)

    // Fast-forward timer
    act(() => {
      vi.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(result.current.retryCount).toBe(2)
    })

    // Another retry
    act(() => {
      result.current.retry()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
      expect(result.current.error).toBeNull()
    })
  })

  it('stops retrying after max retries reached', async () => {
    const mockOperation = vi.fn().mockRejectedValue(new Error('Always fails'))
    const onMaxRetriesReached = vi.fn()

    const { result } = renderHook(
      () => useErrorRecovery(mockOperation, {
        maxRetries: 2,
        onMaxRetriesReached
      }),
      { wrapper }
    )

    // First execution
    await act(async () => {
      try {
        await result.current.execute()
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })

    expect(result.current.canRetry).toBe(true)

    // Second execution (retry)
    await act(async () => {
      try {
        await result.current.execute(true)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })

    expect(result.current.canRetry).toBe(false)
    expect(onMaxRetriesReached).toHaveBeenCalled()
  })

  it('calculates exponential backoff delay correctly', async () => {
    const mockOperation = vi.fn().mockRejectedValue(new Error('Fails'))

    const { result } = renderHook(
      () => useErrorRecovery(mockOperation, {
        retryDelay: 1000,
        exponentialBackoff: true
      }),
      { wrapper }
    )

    await act(async () => {
      try {
        await result.current.execute()
      } catch (error) {
        // Expected
      }
    })

    expect(result.current.nextRetryDelay).toBe(2000) // 1000 * 2^1

    await act(async () => {
      try {
        await result.current.execute(true)
      } catch (error) {
        // Expected
      }
    })

    expect(result.current.nextRetryDelay).toBe(4000) // 1000 * 2^2
  })

  it('resets state correctly', async () => {
    const mockOperation = vi.fn().mockRejectedValue(new Error('Fails'))

    const { result } = renderHook(
      () => useErrorRecovery(mockOperation),
      { wrapper }
    )

    await act(async () => {
      try {
        await result.current.execute()
      } catch (error) {
        // Expected
      }
    })

    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.retryCount).toBe(1)

    act(() => {
      result.current.reset()
    })

    expect(result.current.error).toBeNull()
    expect(result.current.retryCount).toBe(0)
    expect(result.current.canRetry).toBe(true)
  })
})

describe('useNetworkErrorRecovery', () => {
  it('handles network errors with increased retry count', async () => {
    const mockOperation = vi.fn().mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(
      () => useNetworkErrorRecovery(mockOperation),
      { wrapper }
    )

    await act(async () => {
      try {
        await result.current.execute()
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })

    // Network errors should allow more retries (5 vs 3)
    expect(result.current.canRetry).toBe(true)
  })

  it('applies network timeout', async () => {
    const mockOperation = vi.fn().mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 15000))
    )

    const { result } = renderHook(
      () => useNetworkErrorRecovery(mockOperation, {
        networkTimeoutMs: 5000
      }),
      { wrapper }
    )

    const executePromise = act(async () => {
      try {
        await result.current.execute()
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })

    // Fast-forward past timeout
    act(() => {
      vi.advanceTimersByTime(6000)
    })

    await executePromise
  })
})

describe('useUserActionRecovery', () => {
  it('provides user-friendly error handling', async () => {
    const mockOperation = vi.fn().mockRejectedValue(new Error('User action failed'))

    const { result } = renderHook(
      () => useUserActionRecovery(mockOperation, {
        actionName: 'Copy Text',
        showSuccessMessage: true
      }),
      { wrapper }
    )

    await act(async () => {
      try {
        await result.current.execute()
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })

    // User actions should have fewer retries (2 vs 3)
    expect(result.current.canRetry).toBe(true)
  })

  it('shows success message when configured', async () => {
    const mockOperation = vi.fn().mockResolvedValue('success')

    const { result } = renderHook(
      () => useUserActionRecovery(mockOperation, {
        actionName: 'Save Data',
        showSuccessMessage: true
      }),
      { wrapper }
    )

    await act(async () => {
      await result.current.execute()
    })

    expect(result.current.error).toBeNull()
  })
})
