import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import * as TabsModule from '../Tabs';

// Create minimal wrappers for components
const Tabs = (props: React.ComponentProps<typeof TabsModule.default>) => 
  React.createElement(TabsModule.default, props);

const TabsList = (props: React.ComponentProps<typeof TabsModule.TabsList>) => 
  React.createElement(TabsModule.TabsList, props);

describe('Tabs - Step 1', () => {
  it('should render Tabs with TabsList', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          {React.createElement('div', { 'data-testid': 'tabs-list' }, 'Tabs List')}
        </TabsList>
      </Tabs>
    );
    
    expect(screen.getByTestId('tabs-list')).toBeInTheDocument();
  });
});
