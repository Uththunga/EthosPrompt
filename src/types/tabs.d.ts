import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

// Extend the Radix UI Tabs types with our custom props
declare module '@radix-ui/react-tabs' {
  interface TabsTriggerProps {
    /** Whether to show a notification badge */
    badge?: React.ReactNode;
    /** Whether the tab is in a loading state */
    loading?: boolean;
  }
}

// Base tab configuration type
export interface TabConfig {
  /** The value of the tab */
  value: string;
  /** The label of the tab */
  label: React.ReactNode;
  /** The content of the tab */
  content: React.ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Optional badge to display on the tab */
  badge?: React.ReactNode;
  /** Whether the tab is in a loading state */
  loading?: boolean;
}

// Export the enhanced Tabs component types
export interface TabsProps extends Omit<React.ComponentProps<typeof TabsPrimitive.Root>, 'onValueChange'> {
  className?: string;
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
  dir?: 'ltr' | 'rtl';
  loop?: boolean;
  collapsible?: boolean;
}

export interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {}

export interface TabsContentProps extends React.ComponentProps<typeof TabsPrimitive.Content> {}

export interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  /** Whether to show a notification badge */
  badge?: React.ReactNode;
  /** Whether the tab is in a loading state */
  loading?: boolean;
}

export interface TabsEnhancedProps extends Omit<TabsProps, 'children' | 'activationMode'> {
  /** The default active tab value */
  defaultValue?: string;
  /** The controlled active tab value */
  value?: string;
  /** Callback when the active tab changes */
  onValueChange?: (value: string) => void;
  /** The orientation of the tabs */
  orientation?: 'horizontal' | 'vertical';
  /** Whether to activate tabs on focus */
  activateOnFocus?: boolean;
  /** Additional class name for the tabs list */
  listClassName?: string;
  /** Additional class name for the tab panels */
  contentClassName?: string;
  /** Array of tab definitions */
  tabs: TabConfig[];
}
