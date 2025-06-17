import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const radioGroupItemVariants = cva(
  'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        primary: 'border-primary',
        secondary: 'border-secondary',
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

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioGroupItemVariants> {
  /** Additional class name for the container */
  containerClassName?: string;
  /** Label text */
  label?: React.ReactNode;
  /** Description text */
  description?: string;
  /** Whether the radio is in a loading state */
  loading?: boolean;
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
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
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const isDisabled = disabled || loading;
    
    return (
      <div className={cn('flex items-start gap-3', containerClassName)}>
        <div className="flex h-5 items-center">
          <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
              radioGroupItemVariants({ variant, size, className }),
              'data-[state=checked]:text-primary',
              isDisabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            id={id}
            disabled={isDisabled}
            aria-busy={loading ? 'true' : 'false'}
            {...props}
          >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
              <Circle className="h-2.5 w-2.5 fill-current text-current" />
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>
          
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
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };

// Example usage:
/*
<RadioGroup defaultValue="comfortable">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>

// With label and description
<RadioGroup defaultValue="startup">
  <RadioGroupItem 
    value="startup" 
    label="Startup" 
    description="Best for small teams and individuals." 
  />
  <RadioGroupItem 
    value="business" 
    label="Business" 
    description="Ideal for growing teams and organizations." 
  />
  <RadioGroupItem 
    value="enterprise" 
    label="Enterprise" 
    description="For large organizations with advanced needs." 
  />
</RadioGroup>

// With loading state
<RadioGroup>
  <RadioGroupItem 
    value="loading" 
    label="Loading option" 
    loading 
  />
</RadioGroup>
*/
