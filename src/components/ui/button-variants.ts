import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        // Primary button
        default: [
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90',
          'active:bg-primary/80',
          'shadow-sm',
          'focus-visible:ring-ring',
        ],
        // Secondary button
        secondary: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary/80',
          'active:bg-secondary/70',
          'shadow-sm',
          'focus-visible:ring-secondary',
        ],
        // Outline button
        outline: [
          'border border-input',
          'bg-background hover:bg-accent hover:text-accent-foreground',
          'active:bg-accent/80',
          'shadow-sm',
          'focus-visible:ring-ring',
        ],
        // Ghost button (minimal)
        ghost: [
          'hover:bg-accent hover:text-accent-foreground',
          'active:bg-accent/80',
          'focus-visible:ring-ring',
        ],
        // Link button (text only)
        link: [
          'text-primary underline-offset-4',
          'hover:underline',
          'focus-visible:ring-ring',
        ],
        // Danger button
        danger: [
          'bg-destructive text-destructive-foreground',
          'hover:bg-destructive/90',
          'active:bg-destructive/80',
          'shadow-sm',
          'focus-visible:ring-destructive',
        ],
      },
      size: {
        sm: 'h-8 rounded-md px-3 text-xs',
        default: 'h-10 rounded-md px-4 py-2',
        lg: 'h-12 rounded-md px-6 text-base',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'md',
    },
    compoundVariants: [
      // Apply full width if fullWidth is true
      {
        fullWidth: true,
        className: 'w-full',
      },
      // Add icon spacing when button has children
      {
        size: 'sm',
        className: 'gap-1.5',
      },
      {
        size: 'default',
        className: 'gap-2',
      },
      {
        size: 'lg',
        className: 'gap-2.5',
      },
    ],
  }
);