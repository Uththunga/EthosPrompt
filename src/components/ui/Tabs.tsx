import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

// Import types from our type declaration file
import type { 
  TabsProps as TabsPropsType
} from '@/types/tabs';

// Base Tabs component
const Tabs = React.forwardRef<HTMLDivElement, TabsPropsType>(({ className, ...props }, ref) => {
  return React.createElement(TabsPrimitive.Root, {
    ref,
    className: cn('flex flex-col', className),
    ...props
  }) as React.ReactElement;
});

Tabs.displayName = 'Tabs';

// TabsList component
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
        className
      )}
      {...props}
    />
  ) as React.ReactNode;
});

TabsList.displayName = TabsPrimitive.List.displayName;

// TabsTrigger component with local type
type TabsTriggerPropsInternal = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  badge?: React.ReactNode;
  loading?: boolean;
};

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerPropsInternal>(
  ({ className, children, badge, loading, ...props }, ref) => {
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium',
          'ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
          'disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground',
          'data-[state=active]:shadow-sm',
          className
        )}
        {...props}
      >
        {children}
        {badge && (
          <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {badge}
          </span>
        )}
        {loading && (
          <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-muted-foreground/60" />
        )}
      </TabsPrimitive.Trigger>
    ) as React.ReactNode;
  }
);

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// TabsContent component
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    />
  ) as React.ReactNode;
});

TabsContent.displayName = TabsPrimitive.Content.displayName;

// Enhanced Tabs component with simpler API
type TabItem = {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: React.ReactNode;
  loading?: boolean;
};

interface TabsEnhancedProps extends Omit<React.ComponentProps<typeof Tabs>, 'onValueChange'> {
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
  tabs: TabItem[];
}

/**
 * An enhanced Tabs component that provides a simple API for common tab use cases.
 * Integrates with Radix UI for accessibility and follows the design system.
 */
const TabsEnhanced = React.forwardRef<HTMLDivElement, TabsEnhancedProps>(({
  defaultValue,
  value: controlledValue,
  onValueChange,
  orientation = 'horizontal',
  activateOnFocus = true,
  listClassName,
  contentClassName,
  tabs,
  className,
  ...props
}, ref): React.ReactElement => {
  // Determine if we're using controlled or uncontrolled state
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState(
    isControlled ? controlledValue : defaultValue || (tabs.length > 0 ? tabs[0].value : '')
  );

  // Update internal value when controlled value changes
  React.useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue, isControlled]);

  // Handle tab change
  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  // Current active value
  const currentValue = isControlled ? controlledValue : internalValue;

  return React.createElement(
    Tabs,
    {
      ref,
      value: currentValue,
      onValueChange: handleValueChange,
      orientation,
      activationMode: activateOnFocus ? 'automatic' : 'manual',
      className: cn('w-full', className),
      ...props
    },
    React.createElement(
      TabsList,
      { className: listClassName },
      tabs.map((tab) =>
        React.createElement(
          TabsTrigger,
          {
            key: tab.value,
            value: tab.value,
            disabled: tab.disabled,
            badge: tab.badge,
            loading: tab.loading
          },
          tab.label
        )
      )
    ),
    tabs.map((tab) =>
      React.createElement(
        TabsContent,
        {
          key: `${tab.value}-content`,
          value: tab.value,
          className: contentClassName
        },
        tab.content
      )
    )
  ) as React.ReactElement;
});

TabsEnhanced.displayName = 'TabsEnhanced';

// Export all components
export {
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsEnhanced,
  TabsPrimitive,
};

export default Tabs;

/**
 * @example
 * // Basic usage
 * <Tabs defaultValue="account" className="w-[400px]">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="password">Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">Account content</TabsContent>
 *   <TabsContent value="password">Password content</TabsContent>
 * </Tabs>
 * 
 * @example
 * // Using the enhanced component
 * <TabsEnhanced
 *   tabs={[
 *     {
 *       value: 'profile',
 *       label: 'Profile',
 *       content: <div>Profile content</div>,
 *     },
 *     {
 *       value: 'settings',
 *       label: 'Settings',
 *       content: <div>Settings content</div>,
 *       badge: 'New',
 *     },
 *   ]}
 *   orientation="vertical"
 *   className="h-[400px]"
 *   listClassName="w-48 mr-4"
 *   contentClassName="p-4 border rounded-md"
 * />
 */
