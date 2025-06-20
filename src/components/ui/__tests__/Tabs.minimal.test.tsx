import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import * as TabsModule from '../Tabs';
import type { TabsProps } from '@/types/tabs';

// Create typed component wrappers
const Tabs = (props: TabsProps) => 
  React.createElement(TabsModule.default, props);

const TabsList = (props: React.ComponentProps<typeof TabsModule.TabsList>) => 
  React.createElement(TabsModule.TabsList, props);

const TabsTrigger = ({
  value,
  children,
  ...props
}: { value: string } & React.ComponentProps<typeof TabsModule.TabsTrigger>) => 
  React.createElement(TabsModule.TabsTrigger, { value, ...props }, children);

const TabsContent = ({
  value,
  children,
  ...props
}: { value: string } & React.ComponentProps<typeof TabsModule.TabsContent>) => 
  React.createElement(TabsModule.TabsContent, { value, ...props }, children);

describe('Tabs - Minimal Test', () => {
  it('should render tabs', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
  });

  it('should switch tabs', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" data-testid="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" data-testid="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    const tab2 = screen.getByTestId('tab2');
    
    fireEvent.click(tab2);
    expect(tab2).toHaveAttribute('data-state', 'active');
  });
});
