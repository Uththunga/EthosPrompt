import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        outline: 'border-input bg-transparent',
        filled: 'bg-muted/50 border-transparent hover:bg-muted/70',
      },
      size: {
        sm: 'min-h-[60px] px-2 py-1 text-xs',
        default: 'min-h-[80px] px-3 py-2 text-sm',
        lg: 'min-h-[100px] px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /** Error state */
  error?: boolean;
  /** Whether the textarea is in a loading state */
  loading?: boolean;
  /** Additional wrapper class name */
  wrapperClassName?: string;
}

/**
 * A customizable textarea component that supports various styles and states.
 * Integrates with the design system for consistent theming and accessibility.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      error,
      disabled,
      loading,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('relative w-full', wrapperClassName)}>
        <textarea
          className={cn(
            textareaVariants({ variant, size, className }),
            error && 'border-destructive focus-visible:ring-destructive/50',
            loading && 'pr-10',
            className
          )}
          ref={ref}
          disabled={disabled || loading}
          aria-invalid={error ? 'true' : 'false'}
          aria-busy={loading ? 'true' : 'false'}
          {...props}
        />
        {loading && (
          <div className="absolute right-3 top-3">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
