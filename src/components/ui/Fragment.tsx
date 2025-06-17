import { Fragment as ReactFragment, ReactNode } from 'react';

interface FragmentProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export const Fragment = ({ children, className, ...props }: FragmentProps) => {
  return (
    <ReactFragment {...(className ? { className } : {})} {...props}>
      {children}
    </ReactFragment>
  );
};

export default Fragment;
