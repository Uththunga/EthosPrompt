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

const TabsEnhanced = (props: React.ComponentProps<typeof TabsModule.TabsEnhanced>) => 
  createComponent(TabsModule.TabsEnhanced, props);

// Helper function to wait for tab changes
const waitForTabChange = async (): Promise<void> => {
  await waitFor(() => new Promise(resolve => setTimeout(resolve, 0)));
};

// Simple text content component to avoid JSX issues
const TextContent = ({ children }: { children: string }) => (
  <div>{children}</div>
);

describe('Tabs', () => {
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

  it('shows badge when provided', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" badge="New">
            <span>Tab 1</span>
          </TabsTrigger>
          <TabsTrigger value="tab2">
            <span>Tab 2</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <TextContent>Content 1</TextContent>
        </TabsContent>
        <TabsContent value="tab2">
          <TextContent>Content 2</TextContent>
        </TabsContent>
      </Tabs>
    );

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders basic tabs', () => {
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

    // Check tab buttons
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    
    // Check tab panels
    const tab1Panel = screen.getByRole('tabpanel', { name: 'Tab 1' });
    const tab2Panel = screen.queryByRole('tabpanel', { name: 'Tab 2' });
    
    // Verify initial states
    expect(tab1).toHaveAttribute('data-state', 'active');
    expect(tab2).toHaveAttribute('data-state', 'inactive');
    expect(tab1Panel).toBeInTheDocument();
    expect(tab2Panel).not.toBeInTheDocument();
    
    // Verify content
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });
});

describe('TabsEnhanced', () => {
  it('renders TabsEnhanced with tabs', () => {
    const tabs: TabItem[] = [
      { 
        value: 'tab1', 
        label: 'Tab 1', 
        content: <TextContent>Content 1</TextContent>
      },
      { 
        value: 'tab2', 
        label: 'Tab 2', 
        content: <TextContent>Content 2</TextContent>
      },
    ];

    render(<TabsEnhanced tabs={tabs} />);

    // Check if tabs are rendered
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
    
    // Only the active tab's content should be visible
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    // Content 2 is in the DOM but might be hidden
    const content2 = document.querySelector('[data-value="tab2"]');
    expect(content2).toBeInTheDocument();
  });

  it('switches between tabs in TabsEnhanced', async () => {
    const tabs: TabItem[] = [
      { value: 'tab1', label: 'Tab 1', content: <TextContent>Content 1</TextContent> },
      { value: 'tab2', label: 'Tab 2', content: <TextContent>Content 2</TextContent> },
    ];

    render(<TabsEnhanced tabs={tabs} />);

    // Get tab elements
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    
    // Verify initial active tab
    expect(tab1).toHaveAttribute('data-state', 'active');
    expect(tab2).toHaveAttribute('data-state', 'inactive');
    
    // First tab content should be visible
    const tab1Panel = screen.getByRole('tabpanel', { name: 'Tab 1' });
    expect(tab1Panel).toBeInTheDocument();
    
    // Second tab content should not be in the document yet
    expect(screen.queryByRole('tabpanel', { name: 'Tab 2' })).not.toBeInTheDocument();
    
    // Click the second tab
    fireEvent.click(tab2);
    
    // Wait for the state update
    await waitForTabChange();
    
    // After click, second tab should be active
    expect(tab1).toHaveAttribute('data-state', 'inactive');
    expect(tab2).toHaveAttribute('data-state', 'active');
    
    // First tab content should now be hidden
    const hiddenTab1Panel = screen.queryByRole('tabpanel', { name: 'Tab 1' });
    if (hiddenTab1Panel) {
      expect(hiddenTab1Panel).toHaveAttribute('hidden');
    } else {
      // Check if it's in the DOM but hidden
      const allPanels = document.querySelectorAll('[role="tabpanel"]');
      const hiddenPanel = Array.from(allPanels).find(
        (el) => el.getAttribute('aria-labelledby')?.includes('tab1')
      );
      expect(hiddenPanel).toBeDefined();
      expect(hiddenPanel).toHaveAttribute('hidden');
    }
    
    // Second tab content should now be visible
    const tab2Panel = screen.getByRole('tabpanel', { name: 'Tab 2' });
    expect(tab2Panel).toBeInTheDocument();
    
    // Verify content is rendered
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    // Content 2 should be in the DOM, might be hidden or visible
    const content2 = document.querySelector('[data-value="tab2"]');
    expect(content2).toBeInTheDocument();
  });
});
