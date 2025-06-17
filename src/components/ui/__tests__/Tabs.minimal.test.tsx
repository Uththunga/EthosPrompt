import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import * as TabsModule from '../Tabs';

// Create minimal component wrappers
const Tabs = (props: any) => React.createElement(TabsModule.default, props);
const TabsList = (props: any) => React.createElement(TabsModule.TabsList, props);
const TabsTrigger = (props: any) => React.createElement(TabsModule.TabsTrigger, props);
const TabsContent = (props: any) => React.createElement(TabsModule.TabsContent, props);

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

    const tab1 = screen.getByTestId('tab1');
    const tab2 = screen.getByTestId('tab2');
    
    fireEvent.click(tab2);
    expect(tab2).toHaveAttribute('data-state', 'active');
  });
});
