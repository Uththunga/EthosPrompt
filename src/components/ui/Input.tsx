import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        outline: 'border-input bg-transparent',
        filled: 'bg-muted/50 border-transparent hover:bg-muted/70',
        ghost: 'border-transparent bg-transparent hover:bg-muted/50',
      },
      size: {
        sm: 'h-8 px-2 py-1 text-xs',
        default: 'h-10 px-3 py-2 text-sm',
        lg: 'h-12 px-4 py-3 text-base',
      },
      hasLeftElement: {
        true: 'pl-10',
      },
      hasRightElement: {
        true: 'pr-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Leading element (e.g., icon) */
  leftElement?: React.ReactNode;
  /** Trailing element (e.g., icon, clear button) */
  rightElement?: React.ReactNode;
  /** Error state */
  error?: boolean;
  /** Additional wrapper class name */
  wrapperClassName?: string;
  /** Whether the input is in a loading state */
  loading?: boolean;
}

/**
 * A customizable input component that supports various styles and states.
 * Integrates with the design system for consistent theming and accessibility.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      leftElement,
      rightElement,
      error,
      wrapperClassName,
      disabled,
      loading,
      ...props
    },
    ref
  ) => {
    const hasLeftElement = !!leftElement || loading;
    const hasRightElement = !!rightElement;

    return (
      <div className={cn('relative w-full', wrapperClassName)}>
        {leftElement && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftElement}
          </div>
        )}
        {loading && !leftElement && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
        <input
          className={cn(
            inputVariants({
              variant,
              size,
              hasLeftElement,
              hasRightElement,
              className,
            }),
            error && 'border-destructive focus-visible:ring-destructive/50',
            className
          )}
          ref={ref}
          disabled={disabled || loading}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
