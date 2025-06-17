import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        primary: 'border-primary bg-background',
        secondary: 'border-secondary bg-background',
      },
      size: {
        sm: 'h-3 w-3',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** The variant of the checkbox */
  variant?: 'default' | 'primary' | 'secondary';
  /** The size of the checkbox */
  size?: 'sm' | 'default' | 'lg';
  /** Whether to show an intermediate state (indeterminate) */
  indeterminate?: boolean;
  /** Additional class name for the container */
  containerClassName?: string;
  /** Label text */
  label?: React.ReactNode;
  /** Description text */
  description?: string;
  /** Error message */
  error?: string;
  /** Whether the checkbox is in a loading state */
  loading?: boolean;
}

/**
 * A customizable checkbox component that supports various states and variants.
 * Integrates with Radix UI for accessibility and follows the design system.
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ 
  className, 
  variant, 
  size, 
  indeterminate, 
  containerClassName,
  label,
  description,
  error,
  disabled,
  loading,
  ...props 
}, ref) => {
  const id = React.useId();
  const isDisabled = disabled || loading;
  
  return (
    <div className={cn('flex items-start gap-3', containerClassName)}>
      <div className="flex h-5 items-center">
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            checkboxVariants({ variant, size, className }),
            'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
            'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
            error && 'border-destructive',
            isDisabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          id={id}
          disabled={isDisabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-busy={loading ? 'true' : 'false'}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            className={cn(
              'flex items-center justify-center text-current',
              loading && 'opacity-0'
            )}
          >
            {indeterminate ? (
              <Minus className="h-3 w-3" />
            ) : (
              <Check className="h-3 w-3" />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        
        {loading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>
      
      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                'text-sm font-medium leading-none',
                'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                error ? 'text-destructive' : 'text-foreground'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };

// Example usage:
/*
<Checkbox 
  id="terms" 
  label="Accept terms and conditions"
  description="You agree to our Terms of Service and Privacy Policy."
  error={errors.terms?.message}
  {...register('terms')}
/>

<Checkbox 
  variant="primary"
  label="Subscribe to newsletter"
  checked={isSubscribed}
  onCheckedChange={setIsSubscribed}
  disabled={isLoading}
  loading={isLoading}
/>

<Checkbox 
  variant="secondary"
  label="Select all"
  checked={allSelected}
  onCheckedChange={handleSelectAll}
  indeterminate={someSelected}
/>
*/
