import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center text-sm font-medium tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {      variant: {
        default: [
          'bg-purple-500 hover:bg-purple-600',
          'text-white',
          'rounded-full shadow-sm',
          'focus:ring-purple-500 focus:ring-offset-0',
        ],
        secondary: [
          'bg-gray-800 hover:bg-gray-700',
          'text-white',
          'rounded-full shadow-sm',
          'focus:ring-purple-500 focus:ring-offset-0',
        ],
        outline: [
          'border border-purple-500/50',
          'text-purple-400 hover:bg-purple-500 hover:text-white',
          'rounded-full shadow-sm',
          'focus:ring-purple-500 focus:ring-offset-0',
        ],
      },      size: {
        default: 'px-6 py-2 md:px-8 md:py-3',
        sm: 'px-4 py-1.5 md:px-6 md:py-2',
        lg: 'px-8 py-3 md:px-10 md:py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);