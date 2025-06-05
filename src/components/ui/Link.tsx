import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ href, children, className = '' }) => {
  const isExternal = href.startsWith('http') || href.startsWith('https') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:');
  
  if (isExternal) {
    return (
      <a 
        href={href} 
        className={className}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink 
      to={href} 
      className={className}
    >
      {children}
    </RouterLink>
  );
};