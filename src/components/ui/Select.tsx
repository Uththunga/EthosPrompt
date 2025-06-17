import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

const selectVariants = cva(
  'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        outline: 'border-input bg-transparent',
        filled: 'bg-muted/50 border-transparent hover:bg-muted/70',
      },
      size: {
        sm: 'h-8 px-2 py-1 text-xs',
        default: 'h-10 px-3 py-2 text-sm',
        lg: 'h-12 px-4 py-3 text-base',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  /** Options for the select dropdown */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Error state */
  error?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Whether to show the chevron icon */
  showChevron?: boolean;
  /** Custom icon to replace the default chevron */
  icon?: React.ReactNode;
  /** Additional class name for the wrapper */
  wrapperClassName?: string;
}

/**
 * A customizable select component that supports various styles and states.
 * Integrates with the design system for consistent theming and accessibility.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      options,
      placeholder = 'Select an option',
      error,
      disabled,
      loading,
      showChevron = true,
      icon,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const showCustomChevron = showChevron || loading || icon;
    
    return (
      <div className={cn('relative', wrapperClassName)}>
        <select
          className={cn(
            selectVariants({
              variant,
              size,
              className,
            }),
            'appearance-none', // Hide default arrow
            error && 'border-destructive focus:ring-destructive/50',
            showCustomChevron && 'pr-10', // Add padding for custom chevron
            className
          )}
          ref={ref}
          disabled={disabled || loading}
          aria-invalid={error ? 'true' : 'false'}
          aria-busy={loading ? 'true' : 'false'}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {showCustomChevron && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : icon ? (
              icon
            ) : (
              <ChevronDown className="h-4 w-4 opacity-70" />
            )}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };

// Example usage:
/*
<Select
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ]}
  placeholder="Select an option"
  variant="outline"
  size="default"
  error={false}
  loading={false}
  className="w-full"
  wrapperClassName="max-w-md"
/>
*/
