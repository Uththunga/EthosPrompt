import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/Card'
import Tabs, { TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

describe('Component Interactions Integration Tests', () => {
  describe('Button and Card Interactions', () => {
    it('handles button clicks within cards', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(
        <Card>
          <CardHeader>
            <CardTitle>Interactive Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card content with interactive elements</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleClick}>Action Button</Button>
          </CardFooter>
        </Card>
      )
      
      const button = screen.getByRole('button', { name: 'Action Button' })
      await user.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles multiple buttons in card with different variants', async () => {
      const user = userEvent.setup()
      const handlePrimary = vi.fn()
      const handleSecondary = vi.fn()
      const handleDanger = vi.fn()
      
      render(
        <Card>
          <CardContent>
            <div className="flex gap-2">
              <Button onClick={handlePrimary}>Primary</Button>
              <Button variant="secondary" onClick={handleSecondary}>Secondary</Button>
              <Button variant="danger" onClick={handleDanger}>Delete</Button>
            </div>
          </CardContent>
        </Card>
      )
      
      await user.click(screen.getByRole('button', { name: 'Primary' }))
      await user.click(screen.getByRole('button', { name: 'Secondary' }))
      await user.click(screen.getByRole('button', { name: 'Delete' }))
      
      expect(handlePrimary).toHaveBeenCalledTimes(1)
      expect(handleSecondary).toHaveBeenCalledTimes(1)
      expect(handleDanger).toHaveBeenCalledTimes(1)
    })

    it('handles loading states in card interactions', async () => {
      const user = userEvent.setup()
      let isLoading = false
      const handleClick = vi.fn(() => {
        isLoading = true
      })
      
      const TestComponent = () => {
        const [loading, setLoading] = React.useState(false)
        
        const handleButtonClick = async () => {
          setLoading(true)
          handleClick()
          // Simulate async operation
          setTimeout(() => setLoading(false), 100)
        }
        
        return (
          <Card>
            <CardContent>
              <Button isLoading={loading} onClick={handleButtonClick}>
                {loading ? 'Processing...' : 'Submit'}
              </Button>
            </CardContent>
          </Card>
        )
      }
      
      render(<TestComponent />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Submit')
      
      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Tabs and Content Interactions', () => {
    it('switches between tabs with different content', async () => {
      const user = userEvent.setup()
      
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardContent>Content for Tab 1</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab2">
            <Card>
              <CardContent>Content for Tab 2</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab3">
            <Card>
              <CardContent>Content for Tab 3</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )
      
      // Initially Tab 1 should be active
      expect(screen.getByText('Content for Tab 1')).toBeInTheDocument()
      expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument()
      
      // Switch to Tab 2
      await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
      await waitFor(() => {
        expect(screen.getByText('Content for Tab 2')).toBeInTheDocument()
      })
      
      // Switch to Tab 3
      await user.click(screen.getByRole('tab', { name: 'Tab 3' }))
      await waitFor(() => {
        expect(screen.getByText('Content for Tab 3')).toBeInTheDocument()
      })
    })

    it('handles interactive elements within tab content', async () => {
      const user = userEvent.setup()
      const handleTab1Action = vi.fn()
      const handleTab2Action = vi.fn()
      
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Settings</TabsTrigger>
            <TabsTrigger value="tab2">Actions</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={handleTab1Action}>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab2">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="danger" onClick={handleTab2Action}>
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )
      
      // Test Tab 1 button
      await user.click(screen.getByRole('button', { name: 'Save Settings' }))
      expect(handleTab1Action).toHaveBeenCalledTimes(1)
      
      // Switch to Tab 2 and test its button
      await user.click(screen.getByRole('tab', { name: 'Actions' }))
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Delete Account' })).toBeInTheDocument()
      })
      
      await user.click(screen.getByRole('button', { name: 'Delete Account' }))
      expect(handleTab2Action).toHaveBeenCalledTimes(1)
    })
  })

  describe('Complex Component Compositions', () => {
    it('handles nested card interactions with tabs', async () => {
      const user = userEvent.setup()
      const handleCardAction = vi.fn()
      
      render(
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Main Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card>
                    <CardContent>
                      <p>Overview content</p>
                      <Button onClick={handleCardAction}>View Details</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="details">
                  <Card>
                    <CardContent>
                      <p>Detailed information</p>
                      <Button variant="secondary" onClick={handleCardAction}>
                        Export Data
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )
      
      // Test overview tab button
      await user.click(screen.getByRole('button', { name: 'View Details' }))
      expect(handleCardAction).toHaveBeenCalledTimes(1)
      
      // Switch to details tab and test its button
      await user.click(screen.getByRole('tab', { name: 'Details' }))
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Export Data' })).toBeInTheDocument()
      })
      
      await user.click(screen.getByRole('button', { name: 'Export Data' }))
      expect(handleCardAction).toHaveBeenCalledTimes(2)
    })

    it('handles form-like interactions across components', async () => {
      const user = userEvent.setup()
      const handleSubmit = vi.fn()
      const handleCancel = vi.fn()
      
      render(
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal">
              <TabsList>
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              <TabsContent value="personal">
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    data-testid="name-input"
                    className="w-full p-2 border rounded"
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    data-testid="email-input"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </TabsContent>
              <TabsContent value="security">
                <div className="space-y-4">
                  <input 
                    type="password" 
                    placeholder="Current Password" 
                    data-testid="current-password"
                    className="w-full p-2 border rounded"
                  />
                  <input 
                    type="password" 
                    placeholder="New Password" 
                    data-testid="new-password"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      )
      
      // Fill out personal info
      await user.type(screen.getByTestId('name-input'), 'John Doe')
      await user.type(screen.getByTestId('email-input'), 'john@example.com')
      
      // Switch to security tab
      await user.click(screen.getByRole('tab', { name: 'Security' }))
      await waitFor(() => {
        expect(screen.getByTestId('current-password')).toBeInTheDocument()
      })
      
      await user.type(screen.getByTestId('current-password'), 'oldpassword')
      await user.type(screen.getByTestId('new-password'), 'newpassword')
      
      // Test form actions
      await user.click(screen.getByRole('button', { name: 'Save Changes' }))
      expect(handleSubmit).toHaveBeenCalledTimes(1)
      
      await user.click(screen.getByRole('button', { name: 'Cancel' }))
      expect(handleCancel).toHaveBeenCalledTimes(1)
    })
  })

  describe('Event Propagation and State Management', () => {
    it('handles event propagation correctly', async () => {
      const user = userEvent.setup()
      const handleCardClick = vi.fn()
      const handleButtonClick = vi.fn()
      
      render(
        <Card onClick={handleCardClick} data-testid="clickable-card">
          <CardContent>
            <p>Click the card or button</p>
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
