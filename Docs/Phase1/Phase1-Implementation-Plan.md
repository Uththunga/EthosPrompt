# EthosPrompt Phase 1 Implementation Plan
## Foundation Infrastructure (Weeks 1-2)

### Overview
This phase focuses on fixing critical infrastructure issues before adding new features. The plan is structured as a day-by-day implementation guide with clear deliverables, validation steps, and rollback procedures.

**Total Duration**: 10 working days (2 weeks)
**Team Size**: 2-3 developers
**Priority**: Critical infrastructure fixes

---

## 📋 Pre-Implementation Checklist

### Day 0: Preparation
- [ ] Create feature branch: `feature/phase1-foundation`
- [ ] Backup current configuration files
- [ ] Set up development environment
- [ ] Review current codebase state
- [ ] Establish team communication channels

### Risk Mitigation Setup
```bash
# Create backup of current configs
mkdir -p .backup/configs
cp vitest*.* .backup/configs/
cp jest.* .backup/configs/
cp vite.config.ts .backup/configs/
```

---

## 🧪 Task 1: Fix Testing Infrastructure (Days 1-4)
**Priority**: CRITICAL
**Estimated Time**: 32 hours
**Assigned**: Senior Frontend Developer

### Current State Analysis
**Problem**: 20+ conflicting Vitest configuration files causing test failures
**Impact**: No reliable testing, blocking development workflow
**Root Cause**: Multiple experimental configs from troubleshooting attempts

### Day 1: Configuration Cleanup

#### Morning (4 hours): Audit and Remove Conflicting Configs
**Files to Remove:**
```bash
# Remove all experimental configs
rm vitest.*.config.*
rm vitest-*.config.*
rm test-vitest/
rm vitest.setup.js  # Keep only .ts version
rm jest.config.js   # Consolidating to Vitest only
rm jest.setup.js
```

**Files to Keep:**
- `vitest.config.ts` (main config)
- `vitest.setup.ts` (setup file)
- `vite.config.ts` (build config)

#### Afternoon (4 hours): Create Clean Vitest Configuration

**Step 1**: Create new `vitest.config.ts`
```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
      '__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}'
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.git/**'
    ],
    css: true,
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
})
```

**Step 2**: Update `vitest.setup.ts`
```typescript
import { expect, vi, beforeAll, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with Jest DOM matchers
expect.extend(matchers)

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
```

**Validation Commands:**
```bash
npm run test -- --run
npm run test:coverage
```

**Success Criteria:**
- [ ] Tests run without configuration errors
- [ ] No conflicting config warnings
- [ ] Coverage report generates successfully
- [ ] All existing tests pass

### Day 2: Remove Vite Config Test Integration

#### Morning (4 hours): Clean Vite Configuration
**Problem**: Test config mixed with build config in `vite.config.ts`

**Step 1**: Update `vite.config.ts` (remove test section)
```typescript
// Remove lines 70-75 from vite.config.ts
// Keep only build-related configuration
```

**Step 2**: Update package.json scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:watch": "vitest watch",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

#### Afternoon (4 hours): Create Sample Tests

**Step 1**: Create test structure
```bash
mkdir -p src/__tests__/components
mkdir -p src/__tests__/utils
mkdir -p src/__tests__/hooks
```

**Step 2**: Create basic component test
```typescript
// src/__tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/ui/Button'

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })
})
```

**Validation Commands:**
```bash
npm run test:run
npm run build  # Ensure build still works
```

**Success Criteria:**
- [ ] Vite build works without test config
- [ ] Vitest runs independently
- [ ] Sample tests pass
- [ ] No configuration conflicts

### Day 3: Component Testing Framework

#### Morning (4 hours): Core Component Tests
**Step 1**: Test existing UI components
```typescript
// src/__tests__/components/Card.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'

describe('Card Components', () => {
  it('renders card with content', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies hover effects when enabled', () => {
    render(<Card hoverEffect>Test</Card>)
    expect(screen.getByText('Test')).toHaveClass('hover:border-primary/50')
  })
})
```

**Step 2**: Test prompt-related components
```typescript
// src/__tests__/components/PromptCard.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PromptCard from '@/components/PromptCard'

const mockPrompt = {
  id: 'test-1',
  title: 'Test Prompt',
  description: 'Test description',
  prompt: 'Test prompt content',
  tags: ['test', 'example'],
  categoryId: 'test',
  subcategoryId: 'test',
  promptGroupId: 'test',
  estimatedTime: '5 minutes',
  prerequisites: [],
  difficulty: 'Easy'
}

describe('PromptCard', () => {
  it('renders prompt information', () => {
    render(<PromptCard prompt={mockPrompt} />)
    expect(screen.getByText('Test Prompt')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('copies prompt to clipboard when copy button clicked', async () => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    })

    render(<PromptCard prompt={mockPrompt} />)

    const copyButton = screen.getByRole('button', { name: /copy/i })
    fireEvent.click(copyButton)

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Test prompt content')
    })
  })
})
```

#### Afternoon (4 hours): Integration Tests
**Step 1**: Test data integration
```typescript
// src/__tests__/data/prompts.test.ts
import { describe, it, expect } from 'vitest'
import { allPrompts } from '@/data/prompts/all-prompts'
import { categories } from '@/data/categories-data'

describe('Data Integration', () => {
  it('all prompts have valid structure', () => {
    allPrompts.forEach(prompt => {
      expect(prompt).toHaveProperty('id')
      expect(prompt).toHaveProperty('title')
      expect(prompt).toHaveProperty('description')
      expect(prompt).toHaveProperty('prompt')
      expect(prompt).toHaveProperty('categoryId')
      expect(prompt).toHaveProperty('subcategoryId')
    })
  })

  it('prompt categories exist in categories data', () => {
    const categoryIds = categories.map(cat => cat.id)

    allPrompts.forEach(prompt => {
      expect(categoryIds).toContain(prompt.categoryId)
    })
  })

  it('prompts have valid difficulty levels', () => {
    const validDifficulties = ['Very Easy', 'Easy', 'Moderate', 'Challenging', 'Advanced', 'Expert', 'Master']

    allPrompts.forEach(prompt => {
      if ('difficulty' in prompt) {
        expect(validDifficulties).toContain(prompt.difficulty)
      }
    })
  })
})
```

**Validation Commands:**
```bash
npm run test:run
npm run test:coverage
```

**Success Criteria:**
- [ ] All component tests pass
- [ ] Data validation tests pass
- [ ] Test coverage > 60%
- [ ] No test failures or warnings

### Day 4: Testing Documentation and CI Integration

#### Morning (4 hours): Testing Guidelines
**Step 1**: Create testing documentation
```markdown
# Testing Guidelines

## Test Structure
- Unit tests: `src/__tests__/`
- Component tests: `src/__tests__/components/`
- Integration tests: `src/__tests__/integration/`

## Naming Conventions
- Test files: `*.test.{ts,tsx}`
- Test descriptions: Use descriptive names
- Test groups: Use `describe` blocks

## Best Practices
1. Test behavior, not implementation
2. Use data-testid for complex queries
3. Mock external dependencies
4. Test error states and edge cases
```

**Step 2**: Update CI/CD pipeline
```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:run

      - name: Generate coverage
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

#### Afternoon (4 hours): Rollback Procedures and Validation

**Rollback Procedure:**
```bash
# If tests fail, restore from backup
cp .backup/configs/* .
npm install
npm run test
```

**Final Validation:**
```bash
# Complete test suite
npm run test:run
npm run test:coverage
npm run build
npm run lint
```

**Success Criteria:**
- [ ] All tests pass consistently
- [ ] CI pipeline runs successfully
- [ ] Documentation is complete
- [ ] Team can run tests locally
- [ ] Coverage reports generate correctly

**Deliverables:**
- ✅ Clean, working test configuration
- ✅ Sample component tests
- ✅ Data validation tests
- ✅ Testing documentation
- ✅ CI/CD integration
- ✅ Rollback procedures documented

---

## 🛡️ Task 2: Implement Error Boundaries (Days 5-7)
**Priority**: HIGH
**Estimated Time**: 24 hours
**Assigned**: Frontend Developer

### Current State Analysis
**Problem**: No error boundaries, basic try-catch blocks without user feedback
**Impact**: Poor user experience when errors occur, difficult debugging
**Goal**: Comprehensive error handling with user-friendly feedback

### Day 5: Error Boundary Infrastructure

#### Morning (4 hours): Create Error Boundary Components

**Step 1**: Create base error boundary
```typescript
// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from './ui/Button'
import { Card, CardContent, CardHeader } from './ui/Card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }

    // Call custom error handler
    this.props.onError?.(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Card className="max-w-lg mx-auto mt-8">
          <CardHeader className="text-center">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-destructive">
              Something went wrong
            </h2>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              We encountered an unexpected error. Please try refreshing the page.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left bg-muted p-4 rounded text-sm">
                <summary className="cursor-pointer font-medium mb-2">
                  Error Details (Development)
                </summary>
                <pre className="whitespace-pre-wrap text-xs">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex gap-2 justify-center">
              <Button onClick={this.handleReset} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}
```

**Step 2**: Create specialized error boundaries
```typescript
// src/components/PromptErrorBoundary.tsx
import React from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { AlertCircle } from 'lucide-react'
import { Card, CardContent } from './ui/Card'

interface PromptErrorBoundaryProps {
  children: React.ReactNode
}

export const PromptErrorBoundary: React.FC<PromptErrorBoundaryProps> = ({ children }) => {
  const fallback = (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardContent className="flex items-center gap-3 p-4">
        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
        <div>
          <p className="font-medium text-destructive">Failed to load prompt</p>
          <p className="text-sm text-muted-foreground">
            This prompt couldn't be displayed. Please try refreshing the page.
          </p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <ErrorBoundary fallback={fallback}>
      {children}
    </ErrorBoundary>
  )
}
```

#### Afternoon (4 hours): Global Error Context

**Step 1**: Create error context
```typescript
// src/contexts/ErrorContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react'

interface ErrorState {
  errors: Array<{
    id: string
    message: string
    type: 'error' | 'warning' | 'info'
    timestamp: Date
  }>
}

type ErrorAction =
  | { type: 'ADD_ERROR'; payload: { message: string; type?: 'error' | 'warning' | 'info' } }
  | { type: 'REMOVE_ERROR'; payload: { id: string } }
  | { type: 'CLEAR_ERRORS' }

const ErrorContext = createContext<{
  state: ErrorState
  addError: (message: string, type?: 'error' | 'warning' | 'info') => void
  removeError: (id: string) => void
  clearErrors: () => void
} | null>(null)

const errorReducer = (state: ErrorState, action: ErrorAction): ErrorState => {
  switch (action.type) {
    case 'ADD_ERROR':
      return {
        ...state,
        errors: [
          ...state.errors,
          {
            id: Date.now().toString(),
            message: action.payload.message,
            type: action.payload.type || 'error',
            timestamp: new Date(),
          },
        ],
      }
    case 'REMOVE_ERROR':
      return {
        ...state,
        errors: state.errors.filter(error => error.id !== action.payload.id),
      }
    case 'CLEAR_ERRORS':
      return { ...state, errors: [] }
    default:
      return state
  }
}

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(errorReducer, { errors: [] })

  const addError = (message: string, type: 'error' | 'warning' | 'info' = 'error') => {
    dispatch({ type: 'ADD_ERROR', payload: { message, type } })
  }

  const removeError = (id: string) => {
    dispatch({ type: 'REMOVE_ERROR', payload: { id } })
  }

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' })
  }

  return (
    <ErrorContext.Provider value={{ state, addError, removeError, clearErrors }}>
      {children}
    </ErrorContext.Provider>
  )
}

export const useError = () => {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}
```

**Validation Commands:**
```bash
npm run test -- ErrorBoundary
npm run build
```

**Success Criteria:**
- [ ] Error boundary components render correctly
- [ ] Error context provides global error handling
- [ ] Development mode shows detailed error info
- [ ] Production mode shows user-friendly messages

### Day 6: Integration and Error Handling Patterns

#### Morning (4 hours): Integrate Error Boundaries

**Step 1**: Update App.tsx
```typescript
// src/App.tsx - Add error boundaries
import { ErrorBoundary } from './components/ErrorBoundary'
import { ErrorProvider } from './contexts/ErrorContext'

function App() {
  return (
    <ErrorProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <Router basename="/EthosPrompt">
            <div className="min-h-screen bg-gray-900 text-white">
              <Header />
              <ErrorBoundary>
                <Routes>
                  {/* All routes */}
                </Routes>
              </ErrorBoundary>
              <Footer />
            </div>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </ErrorProvider>
  )
}
```

**Step 2**: Add error boundaries to critical components
```typescript
// src/pages/CategoryPage.tsx - Wrap with PromptErrorBoundary
import { PromptErrorBoundary } from '@/components/PromptErrorBoundary'

const CategoryPage = () => {
  return (
    <div>
      <PromptErrorBoundary>
        {/* Existing category content */}
      </PromptErrorBoundary>
    </div>
  )
}
```

#### Afternoon (4 hours): Enhanced Error Handling

**Step 1**: Update existing error handling
```typescript
// src/components/PromptCard.tsx - Enhanced error handling
import { useError } from '@/contexts/ErrorContext'

const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const { addError } = useError()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
      addError('Failed to copy prompt to clipboard. Please try selecting and copying manually.')
    }
  }

  // Rest of component...
}
```

**Step 2**: Create error notification component
```typescript
// src/components/ErrorNotifications.tsx
import React, { useEffect } from 'react'
import { useError } from '@/contexts/ErrorContext'
import { toast } from 'react-hot-toast'

export const ErrorNotifications: React.FC = () => {
  const { state, removeError } = useError()

  useEffect(() => {
    state.errors.forEach(error => {
      toast.error(error.message, {
        id: error.id,
        duration: 5000,
        onDismiss: () => removeError(error.id),
      })
    })
  }, [state.errors, removeError])

  return null
}
```

**Validation Commands:**
```bash
npm run test -- --grep="error"
npm run build
npm run dev  # Test error boundaries manually
```

**Success Criteria:**
- [ ] Error boundaries catch and display errors gracefully
- [ ] Global error context works across components
- [ ] Toast notifications show for user errors
- [ ] No console errors in production build

### Day 7: Error Handling Testing and Documentation

#### Morning (4 hours): Error Boundary Tests

**Step 1**: Test error boundaries
```typescript
// src/__tests__/components/ErrorBoundary.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )
    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('renders error UI when there is an error', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Try Again')).toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  it('calls onError callback when error occurs', () => {
    const onError = vi.fn()
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(onError).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
```

#### Afternoon (4 hours): Documentation and Validation

**Step 1**: Create error handling documentation
```markdown
# Error Handling Guide

## Error Boundaries
- `ErrorBoundary`: General-purpose error boundary
- `PromptErrorBoundary`: Specialized for prompt-related errors

## Global Error Context
- Use `useError()` hook for global error management
- Automatically displays toast notifications
- Centralized error logging

## Best Practices
1. Wrap route components with error boundaries
2. Use try-catch for async operations
3. Provide meaningful error messages
4. Log errors for debugging
```

**Final Validation:**
```bash
npm run test:run
npm run build
npm run lint
```

**Success Criteria:**
- [ ] All error boundary tests pass
- [ ] Error handling works in development and production
- [ ] Documentation is complete
- [ ] No regression in existing functionality

**Deliverables:**
- ✅ Error boundary components
- ✅ Global error context
- ✅ Enhanced error handling in existing components
- ✅ Error notification system
- ✅ Comprehensive tests
- ✅ Documentation

## 🚀 Task 3: Performance Optimization (Days 8-10)
**Priority**: MEDIUM
**Estimated Time**: 24 hours
**Assigned**: Senior Frontend Developer

### Current State Analysis
**Problem**: No lazy loading, large data files, missing caching
**Impact**: Slow initial load, poor performance on mobile
**Goal**: Implement code splitting, lazy loading, and caching strategies

### Day 8: Code Splitting and Lazy Loading

#### Morning (4 hours): Route-Based Code Splitting

**Step 1**: Implement lazy loading for routes
```typescript
// src/App.tsx - Add lazy loading
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Lazy load page components
const PromptEngineeringGuide = lazy(() => import('./pages/PromptEngineeringGuide'))
const PromptEngineeringBasics = lazy(() => import('./pages/prompt-engineering/Basics'))
const PromptEngineeringTechniques = lazy(() => import('./pages/prompt-engineering/Techniques'))
const Resources = lazy(() => import('./pages/Resources'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const PromptDetailPage = lazy(() => import('./pages/PromptDetailPage'))

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
)

function App() {
  return (
    <ErrorProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <Router basename="/EthosPrompt">
            <div className="min-h-screen bg-gray-900 text-white">
              <Header />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/prompt-engineering-guide" element={<PromptEngineeringGuide />} />
                  <Route path="/prompt-engineering-guide/basics" element={<PromptEngineeringBasics />} />
                  <Route path="/prompt-engineering-guide/techniques" element={<PromptEngineeringTechniques />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/categories/:id" element={<CategoryPage />} />
                  <Route path="/prompts/:promptId" element={<PromptDetailPage />} />
                </Routes>
              </Suspense>
              <Footer />
            </div>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </ErrorProvider>
  )
}
```

**Step 2**: Create loading components
```typescript
// src/components/LoadingSpinner.tsx
import React from 'react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className={cn(
      'animate-spin rounded-full border-2 border-primary border-t-transparent',
      sizeClasses[size],
      className
    )} />
  )
}

// src/components/SkeletonLoader.tsx
import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonLoaderProps {
  className?: string
  lines?: number
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className,
  lines = 3
}) => {
  return (
    <div className={cn('animate-pulse space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-gray-700 rounded',
            i === lines - 1 && 'w-3/4' // Last line shorter
          )}
        />
      ))}
    </div>
  )
}
```

#### Afternoon (4 hours): Component-Level Lazy Loading

**Step 1**: Lazy load heavy components
```typescript
// src/components/DataTable.lazy.tsx
import { lazy } from 'react'

export const DataTable = lazy(() =>
  import('./ui/DataTable').then(module => ({ default: module.DataTable }))
)

// src/pages/DataTableDemo.tsx - Use lazy loaded component
import { Suspense } from 'react'
import { DataTable } from '@/components/DataTable.lazy'
import { SkeletonLoader } from '@/components/SkeletonLoader'

const DataTableDemo = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">DataTable Demo</h1>
      <Suspense fallback={<SkeletonLoader lines={10} />}>
        <DataTable data={tableData} columns={columns} />
      </Suspense>
    </div>
  )
}
```

**Step 2**: Optimize prompt data loading
```typescript
// src/hooks/usePromptData.ts
import { useState, useEffect } from 'react'
import { useError } from '@/contexts/ErrorContext'

interface UsePromptDataOptions {
  categoryId?: string
  lazy?: boolean
}

export const usePromptData = ({ categoryId, lazy = false }: UsePromptDataOptions = {}) => {
  const [prompts, setPrompts] = useState<any[]>([])
  const [loading, setLoading] = useState(!lazy)
  const [error, setError] = useState<string | null>(null)
  const { addError } = useError()

  const loadPrompts = async () => {
    try {
      setLoading(true)
      setError(null)

      // Dynamic import based on category
      if (categoryId) {
        const { prompts: categoryPrompts } = await import(`@/data/prompts/${categoryId}-prompts`)
        setPrompts(categoryPrompts)
      } else {
        const { allPrompts } = await import('@/data/prompts/all-prompts')
        setPrompts(allPrompts)
      }
    } catch (err) {
      const errorMessage = `Failed to load prompts${categoryId ? ` for ${categoryId}` : ''}`
      setError(errorMessage)
      addError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!lazy) {
      loadPrompts()
    }
  }, [categoryId, lazy])

  return {
    prompts,
    loading,
    error,
    loadPrompts: lazy ? loadPrompts : undefined
  }
}
```

**Validation Commands:**
```bash
npm run build
npm run preview  # Test lazy loading
```

**Success Criteria:**
- [ ] Routes load lazily with loading indicators
- [ ] Heavy components load on demand
- [ ] Bundle size reduced significantly
- [ ] No loading state flickering

### Day 9: Caching and Data Optimization

#### Morning (4 hours): Implement Caching Strategy

**Step 1**: Create cache utility
```typescript
// src/lib/cache.ts
interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

class Cache {
  private storage = new Map<string, CacheItem<any>>()
  private defaultTTL = 5 * 60 * 1000 // 5 minutes

  set<T>(key: string, data: T, ttl = this.defaultTTL): void {
    this.storage.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get<T>(key: string): T | null {
    const item = this.storage.get(key)

    if (!item) return null

    if (Date.now() - item.timestamp > item.ttl) {
      this.storage.delete(key)
      return null
    }

    return item.data
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  clear(): void {
    this.storage.clear()
  }

  delete(key: string): void {
    this.storage.delete(key)
  }
}

export const cache = new Cache()
```

**Step 2**: Implement cached data hooks
```typescript
// src/hooks/useCachedPrompts.ts
import { useState, useEffect } from 'react'
import { cache } from '@/lib/cache'
import { usePromptData } from './usePromptData'

export const useCachedPrompts = (categoryId?: string) => {
  const cacheKey = `prompts-${categoryId || 'all'}`
  const [cachedData, setCachedData] = useState(() => cache.get(cacheKey))

  const { prompts, loading, error } = usePromptData({
    categoryId,
    lazy: !!cachedData
  })

  useEffect(() => {
    if (prompts.length > 0 && !loading) {
      cache.set(cacheKey, prompts)
      setCachedData(prompts)
    }
  }, [prompts, loading, cacheKey])

  return {
    prompts: cachedData || prompts,
    loading: !cachedData && loading,
    error
  }
}
```

#### Afternoon (4 hours): Image and Asset Optimization

**Step 1**: Optimize images
```typescript
// src/components/OptimizedImage.tsx
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  sizes?: string
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjIi8+PC9zdmc+',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {!isLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
        />
      )}

      <img
        src={src}
        alt={alt}
        sizes={sizes}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="lazy"
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          Failed to load image
        </div>
      )}
    </div>
  )
}
```

**Step 2**: Add service worker for caching
```typescript
// public/sw.js
const CACHE_NAME = 'ethosprompt-v1'
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/icon.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})
```

**Validation Commands:**
```bash
npm run build
npm run preview
# Check Network tab for caching
```

**Success Criteria:**
- [ ] Data caching reduces API calls
- [ ] Images load with lazy loading
- [ ] Service worker caches static assets
- [ ] Performance metrics improve

### Day 10: Performance Measurement and Optimization

#### Morning (4 hours): Performance Monitoring

**Step 1**: Add performance monitoring
```typescript
// src/lib/performance.ts
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startMeasure(name: string): void {
    performance.mark(`${name}-start`)
  }

  endMeasure(name: string): number {
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)

    const measure = performance.getEntriesByName(name)[0]
    const duration = measure.duration

    this.metrics.set(name, duration)

    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`)
    }

    return duration
  }

  getMetric(name: string): number | undefined {
    return this.metrics.get(name)
  }

  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics)
  }
}

export const perf = PerformanceMonitor.getInstance()
```

**Step 2**: Integrate performance monitoring
```typescript
// src/hooks/usePerformanceMonitor.ts
import { useEffect } from 'react'
import { perf } from '@/lib/performance'

export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    perf.startMeasure(`${componentName}-render`)

    return () => {
      perf.endMeasure(`${componentName}-render`)
    }
  }, [componentName])
}

// Usage in components
const CategoryPage = () => {
  usePerformanceMonitor('CategoryPage')

  // Component logic...
}
```

#### Afternoon (4 hours): Bundle Analysis and Final Optimization

**Step 1**: Analyze bundle size
```bash
# Add to package.json scripts
"analyze": "vite build --mode analyze"
```

**Step 2**: Final optimizations
```typescript
// vite.config.ts - Enhanced optimization
export default defineConfig(({ mode }) => {
  return {
    // ... existing config
    build: {
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: mode !== 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            ui: ['@headlessui/react', '@heroicons/react', 'framer-motion'],
            utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
            radix: ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-tabs'],
            data: ['./src/data/prompts/all-prompts', './src/data/categories-data']
          },
        },
      },
      chunkSizeWarningLimit: 500, // Reduced from 1000
    },
  }
})
```

**Final Validation:**
```bash
npm run analyze
npm run build
npm run preview
# Run Lighthouse audit
# Check bundle sizes
```

**Success Criteria:**
- [ ] Bundle size reduced by 30%+
- [ ] Lighthouse performance score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Performance monitoring working

**Deliverables:**
- ✅ Route-based code splitting
- ✅ Component lazy loading
- ✅ Data caching system
- ✅ Image optimization
- ✅ Service worker implementation
- ✅ Performance monitoring
- ✅ Bundle optimization

---

## 📊 Phase 1 Summary and Validation

### Final Checklist
- [ ] All tests pass consistently
- [ ] Error boundaries catch and handle errors gracefully
- [ ] Performance improvements are measurable
- [ ] No regression in existing functionality
- [ ] Documentation is complete and accurate
- [ ] CI/CD pipeline works with new changes

### Success Metrics
- **Testing**: 80%+ test coverage, 0 test failures
- **Error Handling**: All critical paths have error boundaries
- **Performance**: 30%+ bundle size reduction, 90+ Lighthouse score
- **Stability**: No production errors, smooth user experience

### Handoff to Phase 2
With Phase 1 complete, the foundation is solid for implementing core business features in Phase 2:
- Search functionality
- User authentication
- Payment processing

The infrastructure improvements ensure these features can be built reliably and tested thoroughly.

---