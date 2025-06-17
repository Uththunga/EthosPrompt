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

describe('Tabs - Binary Search 1', () => {
  it('renders tabs with content', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <TextContent>Content 1</TextContent>
        </TabsContent>
        <TabsContent value="tab2">
          <TextContent>Content 2</TextContent>
        </TabsContent>
      </Tabs>
    );

    // Check if tabs are rendered
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    
    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    
    // Check tab states - either data-state or aria-selected
    const isTab1Active = tab1.getAttribute('data-state') === 'active' || 
                        tab1.getAttribute('aria-selected') === 'true';
    const isTab2Inactive = tab2.getAttribute('data-state') === 'inactive' || 
                          tab2.getAttribute('aria-selected') === 'false';
    
    expect(isTab1Active).toBe(true);
    expect(isTab2Inactive).toBe(true);
    
    // Active tab content should be visible
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    
    // Inactive tab content might be in the DOM but hidden or not rendered
    const content2 = document.querySelector('[data-value="tab2"], [data-tab="tab2"]');
    if (content2) {
      // If content exists, it should be hidden
      expect(content2).toHaveAttribute('hidden');
    }
  });
});
