import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card'

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

  it('renders with custom className', () => {
    render(<Card className="custom-class">Test</Card>)
    expect(screen.getByText('Test')).toHaveClass('custom-class')
  })

  it('renders CardHeader with proper styling', () => {
    render(
      <Card>
        <CardHeader>Test Header</CardHeader>
      </Card>
    )
    const header = screen.getByText('Test Header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
  })

  it('renders CardContent with proper styling', () => {
    render(
      <Card>
        <CardContent>Test Content</CardContent>
      </Card>
    )
    const content = screen.getByText('Test Content')
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass('p-6', 'pt-0')
  })

  describe('Card Advanced Features', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn()
      render(<Card ref={ref}>Test</Card>)
      expect(ref).toHaveBeenCalled()
    })

    it('handles click events', () => {
      const handleClick = vi.fn()
      render(<Card onClick={handleClick}>Clickable Card</Card>)

      fireEvent.click(screen.getByText('Clickable Card'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies default card classes', () => {
      render(<Card>Test</Card>)
      const card = screen.getByText('Test')
      expect(card).toHaveClass('bg-card', 'text-card-foreground', 'rounded-lg', 'border', 'shadow-sm')
    })

    it('does not apply hover effects by default', () => {
      render(<Card>Test</Card>)
      expect(screen.getByText('Test')).not.toHaveClass('hover:border-primary/50')
    })
  })

  describe('Card Sub-components', () => {
    it('renders CardTitle with proper styling', () => {
      render(<CardTitle>Card Title</CardTitle>)
      const title = screen.getByText('Card Title')
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight')
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    })

    it('renders CardDescription with proper styling', () => {
      render(<CardDescription>Card Description</CardDescription>)
      const description = screen.getByText('Card Description')
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-sm', 'text-muted-foreground')
    })

    it('renders CardFooter with proper styling', () => {
      render(<CardFooter>Card Footer</CardFooter>)
      const footer = screen.getByText('Card Footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    })
  })

  describe('Complete Card Structure', () => {
    it('renders all card components together', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>Card Content</CardContent>
          <CardFooter>Card Footer</CardFooter>
        </Card>
      )

      expect(screen.getByText('Card Title')).toBeInTheDocument()
      expect(screen.getByText('Card Description')).toBeInTheDocument()
      expect(screen.getByText('Card Content')).toBeInTheDocument()
      expect(screen.getByText('Card Footer')).toBeInTheDocument()
    })

    it('maintains proper structure hierarchy', () => {
      render(
        <Card data-testid="card">
          <CardHeader data-testid="header">
            <CardTitle data-testid="title">Title</CardTitle>
            <CardDescription data-testid="description">Description</CardDescription>
          </CardHeader>
          <CardContent data-testid="content">Content</CardContent>
          <CardFooter data-testid="footer">Footer</CardFooter>
        </Card>
      )

      const card = screen.getByTestId('card')
      const header = screen.getByTestId('header')
      const title = screen.getByTestId('title')
      const description = screen.getByTestId('description')
      const content = screen.getByTestId('content')
      const footer = screen.getByTestId('footer')

      expect(card).toContainElement(header)
      expect(card).toContainElement(content)
      expect(card).toContainElement(footer)
      expect(header).toContainElement(title)
      expect(header).toContainElement(description)
    })

    it('works with hover effects on complete structure', () => {
      render(
        <Card hoverEffect data-testid="hover-card">
          <CardHeader>
            <CardTitle>Hover Card</CardTitle>
          </CardHeader>
          <CardContent>Hover content</CardContent>
        </Card>
      )

      const card = screen.getByTestId('hover-card')
      expect(card).toHaveClass('hover:border-primary/50', 'hover:shadow-md')
    })
  })
})
