import * as React from 'react';

declare module '@/components/ui/Badge' {
  export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'success' | 'info' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
  }

  const Badge: React.ForwardRefExoticComponent<
    BadgeProps & React.RefAttributes<HTMLDivElement>
  >;

  export default Badge;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
