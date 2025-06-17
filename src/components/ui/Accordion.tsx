import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    /** Whether to hide the chevron icon */
    hideChevron?: boolean;
    /** Custom chevron icon */
    chevronIcon?: React.ReactNode;
    /** Whether the accordion item is loading */
    loading?: boolean;
  }
>(({ className, children, hideChevron, chevronIcon, loading, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      disabled={loading}
      {...props}
    >
      {children}
      {!hideChevron && (
        <>
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : chevronIcon ? (
            <span className="shrink-0 transition-transform duration-200">
              {chevronIcon}
            </span>
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
          )}
        </>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
    /** Whether to add padding to the content */
    noPadding?: boolean;
  }
>(({ className, children, noPadding = false, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm transition-all',
      'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      !noPadding && 'pb-4',
      className
    )}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// Extended Accordion component with additional features
interface AccordionProps {
  /** The type of accordion (single or multiple) */
  type?: 'single' | 'multiple';
  /** The value of the currently expanded item(s) */
  value?: string | string[];
  /** The default expanded item(s) */
  defaultValue?: string | string[];
  /** Callback when the expanded item(s) change */
  onValueChange?: (value: string | string[]) => void;
  /** Whether to allow multiple items to be expanded at once (shorthand for type="multiple") */
  multiple?: boolean;
  /** Whether to allow all items to be collapsed */
  collapsible?: boolean;
  /** Additional class name for the accordion */
  className?: string;
  /** The accordion items */
  items: Array<{
    /** The unique value of the accordion item */
    value: string;
    /** The trigger content of the accordion item */
    trigger: React.ReactNode;
    /** The content of the accordion item */
    content: React.ReactNode;
    /** Whether the accordion item is disabled */
    disabled?: boolean;
    /** Whether to hide the chevron icon */
    hideChevron?: boolean;
    /** Custom chevron icon */
    chevronIcon?: React.ReactNode;
    /** Whether the accordion item is loading */
    loading?: boolean;
    /** Additional class name for the accordion item */
    className?: string;
    /** Additional class name for the accordion trigger */
    triggerClassName?: string;
    /** Additional class name for the accordion content */
    contentClassName?: string;
    /** Whether to add padding to the content */
    noPadding?: boolean;
  }>;
}

/**
 * An enhanced Accordion component that provides a simple API for common accordion use cases.
 * Integrates with Radix UI for accessibility and follows the design system.
 */
const AccordionEnhanced: React.FC<AccordionProps> = ({
  type,
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  collapsible = true,
  className,
  items,
  ...props
}) => {
  // Determine the accordion type based on the multiple prop if type is not provided
  const accordionType = type || (multiple ? 'multiple' : 'single');
  
  return (
    <Accordion
      type={accordionType as any}
      collapsible={collapsible}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={cn('w-full', className)}
      {...props}
    >
      {items.map((item) => (
        <AccordionItem 
          key={item.value} 
          value={item.value} 
          disabled={item.disabled}
          className={item.className}
        >
          <AccordionTrigger 
            className={item.triggerClassName}
            hideChevron={item.hideChevron}
            chevronIcon={item.chevronIcon}
            loading={item.loading}
          >
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent 
            className={item.contentClassName}
            noPadding={item.noPadding}
          >
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionEnhanced,
};

// Example usage:
/*
// Basic usage
<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match the other components' aesthetic.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>
      Yes. It's animated by default, but you can disable it if you prefer.
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Using the enhanced component
<AccordionEnhanced
  items={[
    {
      value: 'item-1',
      trigger: 'How do I get started?',
      content: 'Getting started is easy! Just follow our step-by-step guide...',
    },
    {
      value: 'item-2',
      trigger: 'What are the system requirements?',
      content: 'Our software works on Windows, macOS, and Linux...',
      disabled: false,
    },
    {
      value: 'item-3',
      trigger: 'How do I contact support?',
      content: 'You can reach our support team at support@example.com...',
      loading: true,
    },
  ]}
  multiple
  className="w-full max-w-2xl mx-auto"
  onValueChange={(value) => console.log('Expanded items:', value)}
/>

// With custom icons and styling
<AccordionEnhanced
  items={[
    {
      value: 'item-1',
      trigger: 'Custom Icon',
      content: 'This accordion item uses a custom icon.',
      chevronIcon: <Plus className="h-4 w-4" />,
      triggerClassName: "hover:bg-accent/20 px-4 rounded-md",
      contentClassName: "px-4 text-muted-foreground"
    },
    {
      value: 'item-2',
      trigger: 'No Padding',
      content: (
        <div className="p-4 bg-muted/30 rounded-md">
          This content has no padding, allowing for custom layouts.
        </div>
      ),
      noPadding: true,
      hideChevron: true,
    },
  ]}
/>
*/
