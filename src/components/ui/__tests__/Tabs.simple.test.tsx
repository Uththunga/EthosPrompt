import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Tabs, { TabsList, TabsTrigger, TabsContent } from '../Tabs';

describe('Tabs - Minimal Test', () => {
  beforeAll(() => {
    console.log('Setting up Tabs test environment');
  });

  afterAll(() => {
    console.log('Tearing down Tabs test environment');
  });

  it('should render basic tabs with content', () => {
    console.log('Running test: should render basic tabs with content');
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <div data-testid="tab1-content">Tab 1 Content</div>
        </TabsContent>
        <TabsContent value="tab2">
          <div data-testid="tab2-content">Tab 2 Content</div>
        </TabsContent>
      </Tabs>
    );
    
    // Verify the active tab content is visible
    expect(screen.getByTestId('tab1-content')).toBeInTheDocument();
    expect(screen.queryByTestId('tab2-content')).not.toBeInTheDocument();
    
    // Verify the active tab has the correct attributes
    const tab1 = screen.getByText('Tab 1');
    const tab2 = screen.getByText('Tab 2');
    
    expect(tab1).toHaveAttribute('data-state', 'active');
    expect(tab2).toHaveAttribute('data-state', 'inactive');
  });

  it('should switch tabs when clicked', async () => {
    console.log('Running test: should switch tabs when clicked');
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <div data-testid="tab1-content">Tab 1 Content</div>
        </TabsContent>
        <TabsContent value="tab2">
          <div data-testid="tab2-content">Tab 2 Content</div>
        </TabsContent>
      </Tabs>
    );
    
    // Get the tab elements
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    
    // Verify initial state
    expect(tab1).toHaveAttribute('data-state', 'active');
    expect(tab2).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByTestId('tab1-content')).toBeInTheDocument();
    
    // Use userEvent to click on Tab 2 within act()
    await act(async () => {
      await userEvent.click(tab2);
    });
    
    // Wait for the tab switch to complete
    await waitFor(() => {
      // Check if Tab 2 is now active
      expect(tab2).toHaveAttribute('data-state', 'active');
      expect(tab1).toHaveAttribute('data-state', 'inactive');
      
      // Check if Tab 2 content is visible
      expect(screen.getByTestId('tab2-content')).toBeInTheDocument();
    }, { timeout: 10000 });
  });
});
