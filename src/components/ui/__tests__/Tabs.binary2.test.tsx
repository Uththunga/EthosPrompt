import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as React from 'react';
import * as TabsModule from '../Tabs';

// Simple type for tab items
interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

// Simple wrapper for components to avoid type issues
const createComponent = <P extends object>(
  Component: React.ComponentType<P>,
  props: P & { children?: React.ReactNode }
) => React.createElement(Component, props);

// Create typed components
const Tabs = (props: React.ComponentProps<typeof TabsModule.default>) => 
  createComponent(TabsModule.default, props);

const TabsTrigger = (props: React.ComponentProps<typeof TabsModule.TabsTrigger>) => 
  createComponent(TabsModule.TabsTrigger, props);

const TabsList = (props: React.ComponentProps<typeof TabsModule.TabsList>) => 
  createComponent(TabsModule.TabsList, props);

const TabsContent = (props: React.ComponentProps<typeof TabsModule.TabsContent>) => 
  createComponent(TabsModule.TabsContent, props);

// Helper function to wait for tab changes
const waitForTabChange = async (): Promise<void> => {
  await waitFor(() => new Promise(resolve => setTimeout(resolve, 0)));
};

// Simple text content component to avoid JSX issues
const TextContent = ({ children }: { children: string }) => (
  <div>{children}</div>
);

describe('Tabs - Binary Search 2', () => {
  it('switches between tabs', async () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <div>Content 1</div>
        </TabsContent>
        <TabsContent value="tab2">
          <div>Content 2</div>
        </TabsContent>
      </Tabs>
    );

    // Get tab elements
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    
    // Check initial tab states
    const isTab1Active = tab1.getAttribute('data-state') === 'active' || 
                        tab1.getAttribute('aria-selected') === 'true';
    const isTab2Inactive = tab2.getAttribute('data-state') === 'inactive' || 
                          tab2.getAttribute('aria-selected') === 'false';
    
    expect(isTab1Active).toBe(true);
    expect(isTab2Inactive).toBe(true);
    
    // First tab content should be visible
    const tab1Panel = screen.getByRole('tabpanel', { name: 'Tab 1' });
    expect(tab1Panel).toBeInTheDocument();
    expect(tab1Panel).not.toHaveAttribute('hidden');
    
    // Second tab content should be hidden or not in the DOM
    const tab2Panel = screen.queryByRole('tabpanel', { name: 'Tab 2' });
    if (tab2Panel) {
      expect(tab2Panel).toHaveAttribute('hidden');
    }
    
    // Click the second tab
    fireEvent.click(tab2);
    
    // Wait for the state update
    await waitForTabChange();
    
    // After click, second tab should be active
    expect(tab1).toHaveAttribute('data-state', 'inactive');
    expect(tab2).toHaveAttribute('data-state', 'active');
    
    // First tab content should now be hidden
    if (tab1Panel) {
      expect(tab1Panel).toHaveAttribute('hidden');
    } else {
      const allPanels = document.querySelectorAll('[role="tabpanel"]');
      const hiddenTab1Panel = Array.from(allPanels).find(
        (el) => el.getAttribute('aria-labelledby')?.includes('tab1')
      );
      expect(hiddenTab1Panel).toBeDefined();
      expect(hiddenTab1Panel).toHaveAttribute('hidden');
    }
    
    // Second tab content should now be visible
    const updatedTab2Panel = screen.getByRole('tabpanel', { name: 'Tab 2' });
    expect(updatedTab2Panel).toBeInTheDocument();
    expect(updatedTab2Panel).not.toHaveAttribute('hidden');
    
    // Verify content is rendered
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});
