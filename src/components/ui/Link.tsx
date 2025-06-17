import * as React from 'react';
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom';
import { cn } from '../../lib/utils';

type LinkVariant = 'default' | 'primary' | 'secondary' | 'muted' | 'destructive';

export interface LinkProps extends Omit<RouterLinkProps, 'to' | 'className'> {
  /** The URL to navigate to */
  to: string;
  /** Additional class names to apply */
  className?: string;
  /** The visual style of the link */
  variant?: LinkVariant;
  /** Whether to show an external link icon for external links */
  showExternalIcon?: boolean;
  /** Whether the link is disabled */
  disabled?: boolean;
  /** The size of the link */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to inherit parent styles */
  inheritStyle?: boolean;
  /** Additional props for the underlying anchor element */
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

const variantStyles: Record<LinkVariant, string> = {
  default: 'text-foreground hover:text-primary hover:underline',
  primary: 'text-primary hover:text-primary/90 hover:underline',
  secondary: 'text-secondary-foreground hover:text-secondary-foreground/90 hover:underline',
  muted: 'text-muted-foreground hover:text-foreground hover:underline',
  destructive: 'text-destructive hover:text-destructive/90 hover:underline',
};

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

/**
 * A versatile link component that handles both internal and external links
 * with consistent styling and accessibility features.
 */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({
  to,
  className,
  children,
  variant = 'primary',
  showExternalIcon = true,
  disabled = false,
  size = 'md',
  inheritStyle = false,
  anchorProps = {},
  ...props
}, ref) => {
  const isExternal = React.useMemo(
    () => 
      typeof to === 'string' && 
      (to.startsWith('http') || 
       to.startsWith('https') || 
       to.startsWith('//') ||
       to.startsWith('mailto:') || 
       to.startsWith('tel:')),
    [to]
  );

  const externalProps = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
        ...anchorProps,
      }
    : {};

  const baseClasses = cn(
    'inline-flex items-center gap-1.5 transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'rounded-sm',
    !inheritStyle && variantStyles[variant],
    !inheritStyle && sizeStyles[size],
    disabled && 'pointer-events-none opacity-50',
    className
  );

  if (isExternal) {
    return (
      <a
        ref={ref}
        href={to}
        className={baseClasses}
        {...externalProps}
        {...props}
      >
        {children}
        {showExternalIcon && (
          <span className="inline-block h-3.5 w-3.5" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
      </a>
    );
  }

  return (
    <RouterLink
      ref={ref}
      to={to}
      className={baseClasses}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </RouterLink>
  );
});

Link.displayName = 'Link';

export { Link };