import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../../lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
      'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Extended Tooltip component with default props for common use cases
interface ExtendedTooltipProps {
  /** The element that triggers the tooltip */
  children: React.ReactNode;
  /** The content to display in the tooltip */
  content: React.ReactNode;
  /** Additional class name for the tooltip content */
  className?: string;
  /** The side of the trigger to render the tooltip */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** The alignment of the tooltip relative to the trigger */
  align?: 'start' | 'center' | 'end';
  /** The offset from the trigger */
  sideOffset?: number;
  /** Whether the tooltip is open by default (uncontrolled) */
  defaultOpen?: boolean;
  /** Whether the tooltip is open (controlled) */
  open?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Delay in milliseconds before showing the tooltip */
  delayDuration?: number;
  /** Whether to disable the tooltip */
  disabled?: boolean;
  /** Whether the tooltip should close when clicking the trigger */
  closeOnTriggerClick?: boolean;
  /** Additional props for the tooltip content */
  contentProps?: React.ComponentPropsWithoutRef<typeof TooltipContent>;
  /** Additional props for the tooltip trigger */
  triggerProps?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>;
}

/**
 * An enhanced Tooltip component that combines Radix UI Tooltip primitives with sensible defaults.
 * Provides a simple API for common tooltip use cases while maintaining full customization.
 */
const ExtendedTooltip: React.FC<ExtendedTooltipProps> = ({
  children,
  content,
  className,
  side = 'top',
  align = 'center',
  sideOffset = 4,
  defaultOpen,
  open,
  onOpenChange,
  delayDuration = 300,
  disabled = false,
  closeOnTriggerClick = false,
  contentProps,
  triggerProps,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const controlled = open !== undefined;
  const isOpenState = controlled ? open : isOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!controlled) {
      setIsOpen(newOpen);
    }
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (closeOnTriggerClick && isOpenState) {
      e.preventDefault();
      handleOpenChange(false);
    }
  };

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Tooltip
      defaultOpen={defaultOpen}
      open={controlled ? open : undefined}
      onOpenChange={handleOpenChange}
      delayDuration={delayDuration}
    >
      <TooltipTrigger 
        asChild 
        onClick={handleTriggerClick}
        {...triggerProps}
      >
        <span>{children}</span>
      </TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn('max-w-xs', className)}
        {...contentProps}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  ExtendedTooltip as TooltipEnhanced,
};

// Example usage:
/*
// Basic usage
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>This is a tooltip</TooltipContent>
  </Tooltip>
</TooltipProvider>

// Using the enhanced component
<TooltipEnhanced content="This is an enhanced tooltip">
  <Button variant="outline">Hover me</Button>
</TooltipEnhanced>

// With custom positioning and delay
<TooltipEnhanced 
  content="This tooltip appears on the right with a delay"
  side="right"
  delayDuration={500}
>
  <Button variant="outline">Hover me (right)</Button>
</TooltipEnhanced>

// Disabled tooltip
<TooltipEnhanced 
  content="This tooltip is disabled"
  disabled
>
  <Button variant="outline">Hover me (disabled)</Button>
</TooltipEnhanced>

// With rich content
<TooltipEnhanced 
  content={
    <div className="space-y-2">
      <h4 className="font-semibold">Rich Tooltip</h4>
      <p className="text-sm">This tooltip contains rich content.</p>
      <Button size="sm" className="mt-2">Click me</Button>
    </div>
  }
  sideOffset={8}
>
  <Button variant="outline">Hover for rich content</Button>
</TooltipEnhanced>
*/
