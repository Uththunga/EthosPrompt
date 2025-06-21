import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/ui/Button'

describe('Button Component', () => {
  describe('Basic Rendering', () => {
    it('renders with text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button')).toHaveTextContent('Click me')
    })

    it('renders with custom className', () => {
      render(<Button className="custom-class">Test</Button>)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    it('forwards ref correctly', () => {
      const ref = vi.fn()
      render(<Button ref={ref}>Test</Button>)
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('Event Handling', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} disabled>Disabled</Button>)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} isLoading>Loading</Button>)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Variants', () => {
    it('applies default variant classes', () => {
      render(<Button>Default</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-primary')
    })

    it('applies secondary variant classes', () => {
      render(<Button variant="secondary">Secondary</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-secondary')
    })

    it('applies outline variant classes', () => {
      render(<Button variant="outline">Outline</Button>)
      expect(screen.getByRole('button')).toHaveClass('border-input')
    })

    it('applies ghost variant classes', () => {
      render(<Button variant="ghost">Ghost</Button>)
      expect(screen.getByRole('button')).toHaveClass('hover:bg-accent')
    })

    it('applies link variant classes', () => {
      render(<Button variant="link">Link</Button>)
      expect(screen.getByRole('button')).toHaveClass('text-primary')
    })

    it('applies danger variant classes', () => {
      render(<Button variant="danger">Delete</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-destructive')
    })
  })

  describe('Sizes', () => {
    it('applies default size classes', () => {
      render(<Button>Default Size</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-10')
    })

    it('applies small size classes', () => {
      render(<Button size="sm">Small</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-8')
    })

    it('applies large size classes', () => {
      render(<Button size="lg">Large Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-12')
    })

    it('applies icon size classes', () => {
      render(<Button size="icon">Icon</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-10', 'w-10')
    })
  })

  describe('States', () => {
    it('can be disabled', () => {
      render(<Button disabled>Disabled Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass('disabled:pointer-events-none')
    })

    it('renders with loading state', () => {
      render(<Button isLoading>Loading Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveTextContent('Loading Button')
    })

    it('shows loading spinner when loading', () => {
      render(<Button isLoading>Loading</Button>)
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('hides content when loading', () => {
      render(<Button isLoading>Button Text</Button>)
      const buttonText = screen.getByText('Button Text')
      // The text should be in a span with opacity-0 class when loading
      const contentSpan = buttonText.closest('span')
      expect(contentSpan).toHaveClass('opacity-0')
    })
  })

  describe('Icons', () => {
    it('renders left icon', () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>
      render(<Button leftIcon={<LeftIcon />}>With Left Icon</Button>)
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    })

    it('renders right icon', () => {
      const RightIcon = () => <span data-testid="right-icon">→</span>
      render(<Button rightIcon={<RightIcon />}>With Right Icon</Button>)
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    })

    it('renders both left and right icons', () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>
      const RightIcon = () => <span data-testid="right-icon">→</span>
      render(
        <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
          Both Icons
        </Button>
      )
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    })
  })
})
