import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary/10 text-primary hover:bg-primary/20',
        secondary:
          'border-transparent bg-secondary/10 text-secondary-foreground hover:bg-secondary/20',
        success:
          'border-transparent bg-success/10 text-success-foreground hover:bg-success/20',
        warning:
          'border-transparent bg-warning/10 text-warning-foreground hover:bg-warning/20',
        destructive:
          'border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20',
        outline: 'text-foreground',
      },
      size: {
        sm: 'h-5 px-1.5 text-[10px]',
        default: 'h-6 px-2.5',
        lg: 'h-8 px-3.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? 'span' : 'div';
  
  return (
    <Comp 
      className={cn(badgeVariants({ variant, size }), className)} 
      {...props} 
    />
  );
}

export { Badge, badgeVariants };