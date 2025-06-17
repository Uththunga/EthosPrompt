import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import * as TabsModule from '../Tabs';

// Create minimal wrappers for components
const Tabs = (props: React.ComponentProps<typeof TabsModule.default>) => 
  React.createElement(TabsModule.default, props);

const TabsList = (props: React.ComponentProps<typeof TabsModule.TabsList>) => 
  React.createElement(TabsModule.TabsList, props);

const TabsTrigger = (props: React.ComponentProps<typeof TabsModule.TabsTrigger>) => 
  React.createElement(TabsModule.TabsTrigger, props);

const TabsContent = (props: React.ComponentProps<typeof TabsModule.TabsContent>) => 
  React.createElement(TabsModule.TabsContent, props);

describe('Tabs - Step 3', () => {
  it('should render Tabs with TabsContent', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">
            <span data-testid="tab-trigger">Tab 1</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <div data-testid="tab-content">Tab 1 Content</div>
        </TabsContent>
      </Tabs>
    );
    
    expect(screen.getByTestId('tab-trigger')).toHaveTextContent('Tab 1');
    expect(screen.getByTestId('tab-content')).toHaveTextContent('Tab 1 Content');
  });
});
