import * as React from 'react';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '../../lib/utils';

// Base Components
const DropdownMenuRoot = RadixDropdown.Root;
const DropdownMenuTrigger = RadixDropdown.Trigger;
const DropdownMenuPortal = RadixDropdown.Portal;
const DropdownMenuGroup = RadixDropdown.Group;
const DropdownMenuSub = RadixDropdown.Sub;
const DropdownMenuRadioGroup = RadixDropdown.RadioGroup;

// Custom Components
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof RadixDropdown.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <RadixDropdown.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </RadixDropdown.SubTrigger>
));
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.SubContent>,
  React.ComponentPropsWithoutRef<typeof RadixDropdown.SubContent>
>(({ className, ...props }, ref) => (
  <RadixDropdown.Portal>
    <RadixDropdown.SubContent
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </RadixDropdown.Portal>
));
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDropdown.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <RadixDropdown.Portal>
    <RadixDropdown.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        className
      )}
      {...props}
    />
  </RadixDropdown.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.Item>,
  React.ComponentPropsWithoutRef<typeof RadixDropdown.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <RadixDropdown.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof RadixDropdown.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <RadixDropdown.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <RadixDropdown.ItemIndicator>
        <Check className="h-4 w-4" />
      </RadixDropdown.ItemIndicator>
    </span>
    {children}
  </RadixDropdown.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.RadioItem>,
  React.ComponentPropsWithoutRef<typeof RadixDropdown.RadioItem>
>(({ className, children, ...props }, ref) => (
  <RadixDropdown.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <RadixDropdown.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </RadixDropdown.ItemIndicator>
    </span>
    {children}
  </RadixDropdown.RadioItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.Label>,
  React.ComponentPropsWithoutRef<typeof RadixDropdown.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <RadixDropdown.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixDropdown.Separator>
>(({ className, ...props }, ref) => (
  <RadixDropdown.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

// Enhanced DropdownMenu component with common patterns
interface DropdownMenuProps {
  /** The trigger element that opens the dropdown */
  trigger: React.ReactNode;
  /** The content of the dropdown */
  children: React.ReactNode;
  /** Additional class name for the dropdown content */
  contentClassName?: string;
  /** The side of the trigger to render the dropdown */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** The alignment of the dropdown relative to the trigger */
  align?: 'start' | 'center' | 'end';
  /** The offset from the trigger */
  sideOffset?: number;
  /** Whether the dropdown is open (controlled) */
  open?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Additional props for the dropdown content */
  contentProps?: React.ComponentProps<typeof DropdownMenuContent>;
  /** Additional props for the dropdown trigger */
  triggerProps?: React.ComponentProps<typeof DropdownMenuTrigger>;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  contentClassName,
  side = 'bottom',
  align = 'start',
  sideOffset = 8,
  open,
  onOpenChange,
  contentProps,
  triggerProps,
}) => {
  return (
    <DropdownMenuRoot open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild {...triggerProps}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn('min-w-[12rem]', contentClassName)}
        {...contentProps}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};

// Export all components
export {
  DropdownMenuRoot,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  type DropdownMenuProps,
};

export default DropdownMenu;
