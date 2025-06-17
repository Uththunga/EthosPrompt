import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import * as TabsModule from '../Tabs';

// Create minimal wrappers for components
const TabsEnhanced = (props: React.ComponentProps<typeof TabsModule.TabsEnhanced>) => 
  React.createElement(TabsModule.TabsEnhanced, props);

describe('Tabs - Step 4', () => {
  it('should render TabsEnhanced with minimal props', () => {
    const tabs = [
      {
        value: 'tab1',
        label: 'Tab 1',
        content: React.createElement('div', { 'data-testid': 'tab1-content' }, 'Tab 1 Content')
      }
    ];

    render(
      React.createElement(TabsEnhanced, { tabs })
    );
    
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByTestId('tab1-content')).toHaveTextContent('Tab 1 Content');
  });
});
