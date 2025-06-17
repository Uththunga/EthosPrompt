import * as React from 'react';

declare module '@/components/ui/Fragment' {
  export interface FragmentProps extends React.HTMLAttributes<HTMLElement> {
    as?: keyof JSX.IntrinsicElements;
    children?: React.ReactNode;
    className?: string;
  }

  const Fragment: React.ForwardRefExoticComponent<
    FragmentProps & React.RefAttributes<HTMLElement>
  >;

  export { Fragment };
  export default Fragment;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'fragment': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
