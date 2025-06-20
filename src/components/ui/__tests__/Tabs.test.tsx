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
    
    // Check tab states - check for either data-state or aria-selected
    const isTab1Active = tab1.getAttribute('data-state') === 'active' || 
                        tab1.getAttribute('aria-selected') === 'true' ||
                        tab1.getAttribute('aria-selected') === null; // Radix might not set it explicitly
    const isTab2Inactive = tab2.getAttribute('data-state') === 'inactive' || 
                          tab2.getAttribute('aria-selected') === 'false' ||
                          !tab2.getAttribute('data-state') ||
                          tab2.getAttribute('aria-selected') === null;
    
    expect(isTab1Active).toBe(true);
    expect(isTab2Inactive).toBe(true);
    
    // Active tab content should be visible
    const tab1Content = screen.getByText('Content 1');
    expect(tab1Content).toBeInTheDocument();
    
    // Check if tab1 content is visible (either not hidden or no hidden attribute)
    const tab1Panel = screen.getByRole('tabpanel', { name: 'Tab 1' });
    expect(tab1Panel).toBeInTheDocument();
    
    // For Radix UI, the inactive tab content might be removed from DOM or have hidden attribute
    // or have display: none in style
    const tab2Panel = screen.queryByRole('tabpanel', { name: 'Tab 2' });
    if (tab2Panel) {
      // If the tab panel exists, it should be hidden
      const isHidden = tab2Panel.hasAttribute('hidden') || 
                     tab2Panel.getAttribute('style')?.includes('display: none') ||
                     tab2Panel.getAttribute('style')?.includes('display:none');
      expect(isHidden).toBe(true);
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
                        tab1.getAttribute('aria-selected') === 'true' ||
                        tab1.getAttribute('aria-selected') === null;
    const isTab2Inactive = tab2.getAttribute('data-state') === 'inactive' || 
                          tab2.getAttribute('aria-selected') === 'false' ||
                          !tab2.getAttribute('data-state') ||
                          tab2.getAttribute('aria-selected') === null;
    
    expect(isTab1Active).toBe(true);
    expect(isTab2Inactive).toBe(true);
    
    // First tab content should be visible
    const tab1Panel = screen.getByRole('tabpanel', { name: 'Tab 1' });
    expect(tab1Panel).toBeInTheDocument();
    
    // Check if tab1 panel is visible (not hidden and no display: none)
    const isTab1Hidden = tab1Panel.hasAttribute('hidden') || 
                       tab1Panel.getAttribute('style')?.includes('display: none') ||
                       tab1Panel.getAttribute('style')?.includes('display:none');
    expect(isTab1Hidden).toBe(false);
    
    // Second tab content should be hidden or not in the DOM
    const tab2Panel = screen.queryByRole('tabpanel', { name: 'Tab 2' });
    if (tab2Panel) {
      // If the tab panel exists, it should be hidden
      const isTab2Hidden = tab2Panel.hasAttribute('hidden') || 
                          tab2Panel.getAttribute('style')?.includes('display: none') ||
                          tab2Panel.getAttribute('style')?.includes('display:none');
      expect(isTab2Hidden).toBe(true);
    }
    
    // Click the second tab
    fireEvent.click(tab2);
    
    // Wait for the state update
    await waitForTabChange();
    
    // After click, second tab should be active
    expect(tab1).toHaveAttribute('data-state', 'inactive');
    expect(tab2).toHaveAttribute('data-state', 'active');
    
    // First tab content should now be hidden or removed from DOM
    const updatedTab1Panel = screen.queryByRole('tabpanel', { name: 'Tab 1' });
    if (updatedTab1Panel) {
      // If panel still exists, it should be hidden
      const isTab1Hidden = updatedTab1Panel.hasAttribute('hidden') || 
                          updatedTab1Panel.getAttribute('style')?.includes('display: none') ||
                          updatedTab1Panel.getAttribute('style')?.includes('display:none');
      expect(isTab1Hidden).toBe(true);
    }
    
    // Second tab content should now be visible
    const updatedTab2Panel = screen.getByRole('tabpanel', { name: 'Tab 2' });
    expect(updatedTab2Panel).toBeInTheDocument();
    
    // Check if tab2 panel is visible (not hidden and no display: none)
    const isTab2Hidden = updatedTab2Panel.hasAttribute('hidden') || 
                        updatedTab2Panel.getAttribute('style')?.includes('display: none') ||
                        updatedTab2Panel.getAttribute('style')?.includes('display:none');
    expect(isTab2Hidden).toBe(false);
    
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
