import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import * as TabsModule from '../Tabs';

// Create minimal wrappers for components
const Tabs = (props: React.ComponentProps<typeof TabsModule.default>) => 
  React.createElement(TabsModule.default, props);

const TabsTrigger = (props: React.ComponentProps<typeof TabsModule.TabsTrigger>) => 
  React.createElement(TabsModule.TabsTrigger, props);

const TabsList = (props: React.ComponentProps<typeof TabsModule.TabsList>) => 
  React.createElement(TabsModule.TabsList, props);

const TabsContent = (props: React.ComponentProps<typeof TabsModule.TabsContent>) => 
  React.createElement(TabsModule.TabsContent, props);

describe('Tabs - Binary 2 Simple', () => {
  it('should render tabs with content', () => {
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

    // Simple assertion to verify rendering
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
  });

  it('should switch tabs on click', () => {
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

    // Click the second tab
    fireEvent.click(screen.getByText('Tab 2'));
    
    // Simple assertion to verify tab change
    expect(screen.getByText('Tab 2')).toHaveAttribute('data-state', 'active');
  });
});
