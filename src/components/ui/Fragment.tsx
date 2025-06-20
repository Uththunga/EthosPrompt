import type { ReactNode } from 'react';
import { Fragment as ReactFragment } from 'react';

interface FragmentProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

export const Fragment = ({ children, className, ...props }: FragmentProps) => {
  return (
    <ReactFragment {...(className ? { className } : {})} {...props}>
      {children}
    </ReactFragment>
  );
};

export default Fragment;
