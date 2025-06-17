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

describe('Tabs - Step 2', () => {
  it('should render Tabs with TabsTrigger', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">
            {React.createElement('span', { 'data-testid': 'tab-trigger' }, 'Tab 1')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
    
    expect(screen.getByTestId('tab-trigger')).toHaveTextContent('Tab 1');
  });
});
