# Testing Guidelines (Phase 1 Established)

## Overview

This document provides comprehensive testing guidelines for the EthosPrompt project, established through Phase 1 Implementation (Days 1-3) and validated for production use. We use Vitest as our primary testing framework with React Testing Library for component testing.

## Testing Philosophy

### Core Principles
1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **User-Centric Testing**: Test from the user's perspective using accessible queries
3. **Comprehensive Coverage**: Cover all component states, variants, and interactions
4. **Maintainable Tests**: Write clear, readable tests that are easy to maintain
5. **Fast Feedback**: Tests should run quickly and provide immediate feedback

### Testing Infrastructure Status
✅ **Phase 1 Complete**: Testing framework established and validated
- **Button Component**: 23/23 tests passing (100% success)
- **Card Component**: 15/15 tests passing (100% success)
- **Integration Tests**: 8/8 tests passing (100% success)
- **Core Infrastructure**: 92% success rate

## Test Structure

### Directory Organization
```
src/
├── __tests__/
│   ├── components/     # Component tests
│   ├── data/          # Data validation tests
│   ├── hooks/         # Custom hook tests
│   └── utils/         # Utility function tests
├── components/
│   └── ui/
│       └── __tests__/  # Legacy component tests (to be migrated)
```

### File Naming Conventions
- Test files: `*.test.{ts,tsx}`
- Test descriptions: Use descriptive names that explain the behavior being tested
- Test groups: Use `describe` blocks to organize related tests

## Testing Framework Setup

### Configuration Files
- `vitest.config.ts` - Main Vitest configuration
- `vitest.setup.ts` - Global test setup and mocks
- `package.json` - Test scripts and dependencies

### Available Scripts
```bash
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:watch    # Run tests in watch mode (explicit)
npm run test:ui       # Run tests with UI interface
npm run test:coverage # Run tests with coverage report
```

## Testing Best Practices

### 1. Test Behavior, Not Implementation
```typescript
// ✅ Good - Tests behavior
it('shows error message when form is submitted with empty fields', () => {
  render(<LoginForm />)
  fireEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(screen.getByText(/email is required/i)).toBeInTheDocument()
})

// ❌ Bad - Tests implementation details
it('calls validateForm function when submit is clicked', () => {
  const validateFormSpy = vi.spyOn(LoginForm.prototype, 'validateForm')
  render(<LoginForm />)
  fireEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(validateFormSpy).toHaveBeenCalled()
})
```

### 2. Use data-testid for Complex Queries
```typescript
// For complex components where role/text queries are insufficient
render(<ComplexComponent />)
expect(screen.getByTestId('user-profile-avatar')).toBeInTheDocument()
```

### 3. Mock External Dependencies
```typescript
// Mock API calls
vi.mock('@/lib/api', () => ({
  fetchUserData: vi.fn().mockResolvedValue({ id: 1, name: 'John' })
}))

// Mock React Router
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn().mockReturnValue({ id: '123' })
}))
```

### 4. Test Error States and Edge Cases
```typescript
describe('UserProfile Component', () => {
  it('displays loading state while fetching data', () => {
    render(<UserProfile userId="123" />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('displays error message when fetch fails', async () => {
    vi.mocked(fetchUserData).mockRejectedValue(new Error('Network error'))
    render(<UserProfile userId="123" />)
    await waitFor(() => {
      expect(screen.getByText(/failed to load user/i)).toBeInTheDocument()
    })
  })

  it('handles empty data gracefully', () => {
    vi.mocked(fetchUserData).mockResolvedValue(null)
    render(<UserProfile userId="123" />)
    expect(screen.getByText(/no user found/i)).toBeInTheDocument()
  })
})
```

## Component Testing Patterns (Phase 1 Established)

### 1. Comprehensive Component Structure (Validated Pattern)

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ComponentName } from '@/components/ComponentName'

describe('ComponentName', () => {
  describe('Basic Rendering', () => {
    it('renders with required props', () => {
      render(<ComponentName requiredProp="value" />)
      expect(screen.getByText('Expected Text')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<ComponentName className="custom-class" />)
      expect(screen.getByTestId('component')).toHaveClass('custom-class')
    })

    it('forwards ref correctly', () => {
      const ref = vi.fn()
      render(<ComponentName ref={ref} />)
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('Event Handling', () => {
    it('handles click events', () => {
      const handleClick = vi.fn()
      render(<ComponentName onClick={handleClick} />)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn()
      render(<ComponentName onClick={handleClick} disabled />)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Variants and States', () => {
    it('applies variant classes correctly', () => {
      render(<ComponentName variant="primary" />)
      expect(screen.getByRole('button')).toHaveClass('bg-primary')
    })

    it('handles loading state', () => {
      render(<ComponentName isLoading />)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })
})
```

### 2. Button Component Pattern (100% Success - 23/23 tests)

```typescript
describe('Button Component', () => {
  describe('Variants', () => {
    it('applies default variant classes', () => {
      render(<Button>Default</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-primary')
    })

    it('applies secondary variant classes', () => {
      render(<Button variant="secondary">Secondary</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-secondary')
    })

    it('applies danger variant classes', () => {
      render(<Button variant="danger">Delete</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-destructive')
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<Button size="sm">Small</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-8')
    })

    it('applies large size classes', () => {
      render(<Button size="lg">Large</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-12')
    })
  })

  describe('Icons', () => {
    it('renders left icon', () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>
      render(<Button leftIcon={<LeftIcon />}>With Icon</Button>)
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    })
  })
})
```

### 3. Card Component Pattern (100% Success - 15/15 tests)

```typescript
describe('Card Components', () => {
  describe('Card Structure', () => {
    it('renders all card components together', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      )

      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })

    it('maintains proper structure hierarchy', () => {
      render(
        <Card data-testid="card">
          <CardHeader data-testid="header">
            <CardTitle>Title</CardTitle>
          </CardHeader>
        </Card>
      )

      const card = screen.getByTestId('card')
      const header = screen.getByTestId('header')
      expect(card).toContainElement(header)
    })
  })
})
```

## Integration Testing Patterns (100% Success - 8/8 tests)

### Component Interaction Testing
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Component Interactions', () => {
  describe('Button and Card Interactions', () => {
    it('handles button clicks within cards', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(
        <Card>
          <CardContent>
            <Button onClick={handleClick}>Action Button</Button>
          </CardContent>
        </Card>
      )

      await user.click(screen.getByRole('button', { name: 'Action Button' }))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles multiple buttons with different variants', async () => {
      const user = userEvent.setup()
      const handlePrimary = vi.fn()
      const handleSecondary = vi.fn()

      render(
        <Card>
          <CardContent>
            <Button onClick={handlePrimary}>Primary</Button>
            <Button variant="secondary" onClick={handleSecondary}>Secondary</Button>
          </CardContent>
        </Card>
      )

      await user.click(screen.getByRole('button', { name: 'Primary' }))
      await user.click(screen.getByRole('button', { name: 'Secondary' }))

      expect(handlePrimary).toHaveBeenCalledTimes(1)
      expect(handleSecondary).toHaveBeenCalledTimes(1)
    })
  })

  describe('Complex Component Compositions', () => {
    it('handles nested card interactions with tabs', async () => {
      const user = userEvent.setup()
      const handleAction = vi.fn()

      render(
        <Card>
          <CardContent>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <Button onClick={handleAction}>Tab 1 Action</Button>
              </TabsContent>
              <TabsContent value="tab2">
                <Button onClick={handleAction}>Tab 2 Action</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )

      // Test Tab 1 button
      await user.click(screen.getByRole('button', { name: 'Tab 1 Action' }))
      expect(handleAction).toHaveBeenCalledTimes(1)

      // Switch to Tab 2 and test its button
      await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Tab 2 Action' })).toBeInTheDocument()
      })

      await user.click(screen.getByRole('button', { name: 'Tab 2 Action' }))
      expect(handleAction).toHaveBeenCalledTimes(2)
    })
  })

  describe('Event Propagation', () => {
    it('handles event propagation correctly', async () => {
      const user = userEvent.setup()
      const handleCardClick = vi.fn()
      const handleButtonClick = vi.fn()

      render(
        <Card onClick={handleCardClick} data-testid="clickable-card">
          <CardContent>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                handleButtonClick()
              }}
            >
              Button (stops propagation)
            </Button>
          </CardContent>
        </Card>
      )

      // Click button should not trigger card click
      await user.click(screen.getByRole('button'))
      expect(handleButtonClick).toHaveBeenCalledTimes(1)
      expect(handleCardClick).not.toHaveBeenCalled()

      // Click card should trigger card click
      await user.click(screen.getByTestId('clickable-card'))
      expect(handleCardClick).toHaveBeenCalledTimes(1)
    })
  })
})
```

## Data Testing

### Validation Tests
```typescript
import { describe, it, expect } from 'vitest'
import { allPrompts } from '@/data/prompts/all-prompts'

describe('Data Validation', () => {
  it('all prompts have required fields', () => {
    allPrompts.forEach(prompt => {
      expect(prompt).toHaveProperty('id')
      expect(prompt).toHaveProperty('title')
      expect(prompt.id).toBeTruthy()
      expect(prompt.title).toBeTruthy()
    })
  })
})
```

## Coverage Requirements

### Minimum Coverage Targets
- **Overall**: 80%
- **Components**: 85%
- **Utilities**: 90%
- **Data validation**: 100%

### Coverage Exclusions
- Configuration files (`*.config.*`)
- Type definitions (`*.d.ts`)
- Test files themselves
- Node modules

## Continuous Integration

### GitHub Actions Workflow
Tests run automatically on:
- Push to `main` branch
- Pull requests to `main`
- Manual workflow dispatch

### Required Checks
- All tests must pass
- Coverage must meet minimum thresholds
- No TypeScript errors
- Linting must pass

## Troubleshooting

### Common Issues

1. **Tests timing out**
   - Increase timeout in test configuration
   - Use `waitFor` for async operations

2. **Mock not working**
   - Ensure mock is defined before import
   - Use `vi.hoisted()` for hoisted mocks

3. **Component not rendering**
   - Check for missing providers (Router, Theme, etc.)
   - Verify imports are correct

### Debug Commands
```bash
# Run specific test file
npm run test:run -- Button.test.tsx

# Run tests with verbose output
npm run test:run -- --reporter=verbose

# Run tests in UI mode for debugging
npm run test:ui
```

## Migration Notes

### Legacy Tests
- Existing tests in `src/components/ui/__tests__/` should be gradually migrated to the new structure
- Focus on fixing broken tests and improving coverage
- Maintain backward compatibility during migration

### Future Improvements
- Add visual regression testing
- Implement E2E testing with Playwright
- Add performance testing for critical paths
- Consider snapshot testing for stable components

---

For questions or suggestions about testing practices, please refer to the [Vitest documentation](https://vitest.dev/) or [React Testing Library guides](https://testing-library.com/docs/react-testing-library/intro/).
