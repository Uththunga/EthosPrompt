import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const switchVariants = cva(
  'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-input',
        primary: 'bg-primary/30',
        success: 'bg-success/30',
        warning: 'bg-warning/30',
        destructive: 'bg-destructive/30',
      },
      size: {
        sm: 'h-5 w-9',
        default: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        className: 'data-[state=checked]:bg-primary',
      },
      {
        variant: 'primary',
        className: 'data-[state=checked]:bg-primary',
      },
      {
        variant: 'success',
        className: 'data-[state=checked]:bg-success',
      },
      {
        variant: 'warning',
        className: 'data-[state=checked]:bg-warning',
      },
      {
        variant: 'destructive',
        className: 'data-[state=checked]:bg-destructive',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
        default: 'h-5 w-5 data-[state=checked]:translate-x-5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-7',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  /** The variant of the switch */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive';
  /** The size of the switch */
  size?: 'sm' | 'default' | 'lg';
  /** Additional class name for the container */
  containerClassName?: string;
  /** Label text */
  label?: React.ReactNode;
  /** Description text */
  description?: string;
  /** Whether the switch is in a loading state */
  loading?: boolean;
  /** Icon to show when the switch is on */
  checkedIcon?: React.ReactNode;
  /** Icon to show when the switch is off */
  uncheckedIcon?: React.ReactNode;
}

/**
 * A toggle switch component that can be toggled on and off.
 * Integrates with Radix UI for accessibility and follows the design system.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(
  (
    {
      className,
      variant,
      size,
      containerClassName,
      label,
      description,
      disabled,
      loading,
      checkedIcon,
      uncheckedIcon,
      checked,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const isDisabled = disabled || loading;
    const [isChecked, setIsChecked] = React.useState(checked);

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    return (
      <div className={cn('flex items-center gap-3', containerClassName)}>
        <div className="relative">
          <SwitchPrimitives.Root
            className={cn(
              switchVariants({ variant, size, className }),
              'data-[state=unchecked]:bg-input',
              isDisabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            id={id}
            disabled={isDisabled}
            aria-busy={loading ? 'true' : 'false'}
            checked={isChecked}
            onCheckedChange={(checked) => {
              if (props.onCheckedChange) {
                props.onCheckedChange(checked);
              }
              if (checked === undefined) {
                setIsChecked(checked);
              }
            }}
            {...props}
            ref={ref}
          >
            <SwitchPrimitives.Thumb
              className={cn(
                switchThumbVariants({ size }),
                'flex items-center justify-center',
                'data-[state=unchecked]:translate-x-0',
                'transition-transform duration-200',
                loading && 'opacity-0'
              )}
            >
              {isChecked ? checkedIcon : uncheckedIcon}
            </SwitchPrimitives.Thumb>
          </SwitchPrimitives.Root>
          
          {loading && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
        </div>
        
        {(label || description) && (
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={id}
              className={cn(
                'text-sm font-medium leading-none',
                'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                isDisabled ? 'text-muted-foreground' : 'text-foreground'
              )}
            >
              {label}
            </label>
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };

// Example usage:
/*
// Basic usage
<Switch />

// Controlled
const [checked, setChecked] = React.useState(false);
<Switch 
  checked={checked} 
  onCheckedChange={setChecked} 
  label="Enable notifications"
  description="Receive email notifications"
/>

// With icons
<Switch 
  checkedIcon={<Check className="h-3 w-3" />} 
  uncheckedIcon={<X className="h-3 w-3" />} 
  variant="success"
  size="sm"
  label="Enable feature"
/>

// Loading state
<Switch 
  loading 
  label="Processing..." 
  disabled 
/>

// Different variants
<div className="space-y-4">
  <Switch variant="default" label="Default" />
  <Switch variant="primary" label="Primary" />
  <Switch variant="success" label="Success" />
  <Switch variant="warning" label="Warning" />
  <Switch variant="destructive" label="Destructive" />
</div>
*/
