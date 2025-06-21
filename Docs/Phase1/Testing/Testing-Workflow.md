# Testing Workflow and Commands

## Overview

This document provides a comprehensive guide to the testing workflow and available commands for the EthosPrompt project. The testing framework has been established and validated through Phase 1 Implementation with 92% core infrastructure success rate.

## Quick Start

### Essential Commands
```bash
# Run all tests once
npm run test:run

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests with UI interface
npm run test:ui
```

### Verify Setup
```bash
# Check if testing framework is working
npm run test:run src/__tests__/components/Button.test.tsx

# Expected: 23/23 tests passing (100% success)
```

## Development Workflow

### 1. Test-Driven Development (TDD) Cycle

#### Step 1: Write Failing Test
```typescript
// src/__tests__/components/NewComponent.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NewComponent } from '@/components/NewComponent'

describe('NewComponent', () => {
  it('renders with title prop', () => {
    render(<NewComponent title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
```

#### Step 2: Run Test (Should Fail)
```bash
npm run test:watch NewComponent.test.tsx
# Expected: Test fails because component doesn't exist
```

#### Step 3: Implement Component
```typescript
// src/components/NewComponent.tsx
interface NewComponentProps {
  title: string
}

export const NewComponent = ({ title }: NewComponentProps) => {
  return <h1>{title}</h1>
}
```

#### Step 4: Run Test (Should Pass)
```bash
# Test should now pass automatically in watch mode
```

#### Step 5: Refactor and Add More Tests
```typescript
describe('NewComponent', () => {
  describe('Basic Rendering', () => {
    it('renders with title prop', () => {
      render(<NewComponent title="Test Title" />)
      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<NewComponent title="Test" className="custom-class" />)
      expect(screen.getByRole('heading')).toHaveClass('custom-class')
    })
  })
})
```

### 2. Component Development Workflow

#### Phase 1: Basic Tests
```bash
# Start with basic rendering tests
npm run test:watch ComponentName.test.tsx

# Add tests for:
# - Basic rendering
# - Props handling
# - Custom className
# - Ref forwarding
```

#### Phase 2: Interaction Tests
```bash
# Add interaction tests
# - Event handling
# - State changes
# - User interactions
```

#### Phase 3: Variant Tests
```bash
# Add variant and state tests
# - All component variants
# - All component sizes
# - Disabled/loading states
```

#### Phase 4: Integration Tests
```bash
# Add integration tests if needed
# - Component interactions
# - Complex compositions
# - Real-world scenarios
```

### 3. Bug Fix Workflow

#### Step 1: Reproduce Bug with Test
```typescript
describe('Bug Fix: Component Issue', () => {
  it('reproduces the bug', () => {
    // Write test that demonstrates the bug
    render(<Component problematicProp="value" />)
    // This test should fail, showing the bug
  })
})
```

#### Step 2: Fix Implementation
```bash
# Run test in watch mode
npm run test:watch BugFix.test.tsx

# Fix the component implementation
# Test should pass when bug is fixed
```

#### Step 3: Add Regression Tests
```typescript
describe('Regression Tests', () => {
  it('prevents regression of fixed bug', () => {
    // Add comprehensive test to prevent regression
  })
})
```

## Available Commands

### Core Testing Commands

#### `npm run test:run`
- **Purpose**: Run all tests once and exit
- **Use Case**: CI/CD, pre-commit checks, final validation
- **Output**: Complete test results with pass/fail summary

```bash
# Run all tests
npm run test:run

# Run specific test file
npm run test:run Button.test.tsx

# Run tests matching pattern
npm run test:run --grep "Button"

# Run tests with verbose output
npm run test:run --reporter=verbose
```

#### `npm run test:watch`
- **Purpose**: Run tests in watch mode (re-run on file changes)
- **Use Case**: Active development, TDD workflow
- **Output**: Interactive test runner with file watching

```bash
# Start watch mode
npm run test:watch

# Watch specific file
npm run test:watch Button.test.tsx

# Watch with coverage
npm run test:watch --coverage
```

#### `npm run test:coverage`
- **Purpose**: Run tests with coverage report
- **Use Case**: Coverage analysis, quality gates
- **Output**: Detailed coverage report in terminal and HTML

```bash
# Generate coverage report
npm run test:coverage

# Coverage with specific threshold
npm run test:coverage --coverage.threshold.global.statements=90
```

#### `npm run test:ui`
- **Purpose**: Run tests with web-based UI interface
- **Use Case**: Visual test debugging, test exploration
- **Output**: Opens browser with interactive test interface

```bash
# Start UI mode
npm run test:ui

# UI mode on specific port
npm run test:ui --port=3001
```

### Advanced Commands

#### Debugging Commands
```bash
# Run single test file with debug info
npm run test:run -- --reporter=verbose Button.test.tsx

# Run tests with stack traces
npm run test:run -- --reporter=verbose --stack-trace

# Run tests with timing information
npm run test:run -- --reporter=verbose --timing
```

#### Filtering Commands
```bash
# Run tests by name pattern
npm run test:run -- --grep "renders with"

# Run tests in specific directory
npm run test:run src/__tests__/components/

# Run only changed tests (with git)
npm run test:run --changed

# Run tests related to specific files
npm run test:run --related src/components/Button.tsx
```

#### Coverage Commands
```bash
# Coverage with HTML report
npm run test:coverage --coverage.reporter=html

# Coverage for specific files
npm run test:coverage src/components/

# Coverage with custom thresholds
npm run test:coverage --coverage.threshold.global.lines=85
```

## File Organization

### Test File Structure
```
src/
├── __tests__/
│   ├── components/           # Component tests
│   │   ├── Button.test.tsx   # ✅ 23/23 tests (100% success)
│   │   ├── Card.test.tsx     # ✅ 15/15 tests (100% success)
│   │   └── DataTable.test.tsx
│   ├── integration/          # Integration tests
│   │   └── ComponentInteractions.test.tsx  # ✅ 8/8 tests (100% success)
│   ├── hooks/               # Hook tests
│   ├── data/                # Data validation tests
│   └── utils/               # Utility tests
```

### Naming Conventions
- **Test Files**: `ComponentName.test.tsx`
- **Test Descriptions**: Descriptive behavior-focused names
- **Test Groups**: Use `describe` blocks for organization

## Performance Optimization

### Test Execution Performance

#### Current Performance (Phase 1 Validated)
- **Core Tests**: ~4 seconds execution time
- **Full Suite**: ~14 seconds execution time
- **Individual Test**: <100ms average

#### Optimization Strategies
```bash
# Run tests in parallel (default)
npm run test:run --threads

# Limit concurrent tests
npm run test:run --threads=2

# Run tests with minimal output
npm run test:run --reporter=basic

# Skip coverage for faster execution
npm run test:run --coverage=false
```

### Watch Mode Optimization
```bash
# Watch only specific directories
npm run test:watch src/__tests__/components/

# Watch with minimal re-runs
npm run test:watch --watch-exclude="**/node_modules/**"
```

## CI/CD Integration

### GitHub Actions Commands
```yaml
# In .github/workflows/test.yml
- name: Run Tests
  run: npm run test:run

- name: Generate Coverage
  run: npm run test:coverage

- name: Upload Coverage
  run: npm run test:coverage --coverage.reporter=lcov
```

### Pre-commit Hooks
```bash
# Add to package.json scripts
"pre-commit": "npm run test:run && npm run lint"

# Or use husky
npx husky add .husky/pre-commit "npm run test:run"
```

## Troubleshooting

### Common Issues

#### Tests Not Running
```bash
# Check Node version
node --version  # Requires Node 16+

# Clear cache
rm -rf node_modules package-lock.json
npm install

# Verify configuration
npm run test:run -- --reporter=verbose
```

#### Slow Test Execution
```bash
# Run with timing info
npm run test:run -- --reporter=verbose --timing

# Identify slow tests
npm run test:run -- --reporter=verbose | grep "slow"

# Run subset of tests
npm run test:run src/__tests__/components/Button.test.tsx
```

#### Watch Mode Issues
```bash
# Restart watch mode
# Press 'r' in watch mode to restart

# Clear watch cache
npm run test:watch -- --no-cache

# Watch specific files only
npm run test:watch Button.test.tsx
```

### Debug Techniques

#### Test Debugging
```typescript
// Add debug output in tests
import { screen } from '@testing-library/react'

it('debug test', () => {
  render(<Component />)
  screen.debug() // Prints DOM to console
})
```

#### Coverage Debugging
```bash
# Generate detailed coverage report
npm run test:coverage --coverage.reporter=html

# Open coverage report
open coverage/index.html
```

## Best Practices

### Command Usage
1. **Development**: Use `npm run test:watch` for active development
2. **Validation**: Use `npm run test:run` before commits
3. **Coverage**: Use `npm run test:coverage` for quality checks
4. **Debugging**: Use `npm run test:ui` for visual debugging

### Performance
1. **Run specific tests** during development
2. **Use watch mode** for immediate feedback
3. **Generate coverage** only when needed
4. **Optimize test files** for faster execution

### Team Workflow
1. **Consistent commands** across team members
2. **Shared configurations** in version control
3. **Documented patterns** for common scenarios
4. **Regular performance** monitoring

---

**Status**: ✅ Testing workflow established and documented

For additional help, refer to `Docs/Testing-Guidelines.md` or `Docs/Team-Adoption-Guidelines.md`.
