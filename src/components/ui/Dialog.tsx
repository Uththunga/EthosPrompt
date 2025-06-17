import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    /** Whether to show the close button */
    showCloseButton?: boolean;
    /** Additional class name for the close button */
    closeButtonClassName?: string;
  }
>(({ className, children, showCloseButton = true, closeButtonClassName, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 grid w-full gap-4 rounded-b-lg border bg-background p-6 shadow-lg',
        'sm:max-w-lg sm:rounded-lg',
        'duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
        'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          className={cn(
            'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity',
            'hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:pointer-events-none',
            'data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
            closeButtonClassName
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// Extended Dialog component with default props for common use cases
interface ExtendedDialogProps extends React.ComponentProps<typeof Dialog> {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when the open state changes */
  onOpenChange: (open: boolean) => void;
  /** The dialog title */
  title?: React.ReactNode;
  /** The dialog description */
  description?: React.ReactNode;
  /** The dialog content */
  children?: React.ReactNode;
  /** Additional class name for the dialog content */
  contentClassName?: string;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Additional class name for the close button */
  closeButtonClassName?: string;
  /** Additional class name for the overlay */
  overlayClassName?: string;
  /** Additional class name for the header */
  headerClassName?: string;
  /** Additional class name for the footer */
  footerClassName?: string;
  /** Footer content */
  footer?: React.ReactNode;
  /** Whether to close the dialog when clicking outside */
  closeOnOutsideClick?: boolean;
  /** Whether to close the dialog when pressing the escape key */
  closeOnEscape?: boolean;
  /** Additional props for the dialog content */
  contentProps?: React.ComponentProps<typeof DialogContent>;
  /** Additional props for the dialog overlay */
  overlayProps?: React.ComponentProps<typeof DialogOverlay>;
}

/**
 * An enhanced Dialog component that combines Radix UI Dialog primitives with sensible defaults.
 * Provides a simple API for common dialog use cases while maintaining full customization.
 */
const ExtendedDialog: React.FC<ExtendedDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  contentClassName,
  showCloseButton = true,
  closeButtonClassName,
  overlayClassName,
  headerClassName,
  footerClassName,
  footer,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  contentProps,
  overlayProps,
  ...props
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      <DialogContent
        className={contentClassName}
        showCloseButton={showCloseButton}
        closeButtonClassName={closeButtonClassName}
        onPointerDownOutside={(e) => {
          if (!closeOnOutsideClick) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (!closeOnEscape) {
            e.preventDefault();
          }
        }}
        {...contentProps}
      >
        {(title || description) && (
          <DialogHeader className={headerClassName}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
        {footer && (
          <DialogFooter className={footerClassName}>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  ExtendedDialog,
};

// Example usage:
/*
// Basic usage with state management
const [isOpen, setIsOpen] = React.useState(false);

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <p>This is the dialog content.</p>
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Using the extended component
const [isOpen, setIsOpen] = React.useState(false);

<>
  <Button onClick={() => setIsOpen(true)}>Open Extended Dialog</Button>
  <ExtendedDialog
    open={isOpen}
    onOpenChange={setIsOpen}
    title="Extended Dialog"
    description="This is an example of the extended dialog component."
    footer={
      <>
        <Button variant="outline" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button>Continue</Button>
      </>
    }
  >
    <div className="py-4">
      <p>This is the dialog content.</p>
    </div>
  </ExtendedDialog>
</>
*/
