import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
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

// Simple wait helper
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('Tabs - Wait Test', () => {
  it('should switch tabs with wait', async () => {
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

    // Initial state
    expect(screen.getByText('Tab 1')).toHaveAttribute('data-state', 'active');
    
    // Click the second tab
    fireEvent.click(screen.getByText('Tab 2'));
    
    // Wait for the next tick
    await wait(0);
    
    // Verify tab switch
    expect(screen.getByText('Tab 2')).toHaveAttribute('data-state', 'active');
  });
});
