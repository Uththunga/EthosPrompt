import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  /** Section heading */
  title: string;
  /** Optional icon placed before the title */
  icon?: React.ReactNode;
  /** Additional Tailwind classes */
  className?: string;
  /** Section body */
  children: React.ReactNode;
}

/**
 * Animated content section used across the Prompt Engineering pages.
 * Fades & slides into view when scrolled.
 */
export const Section: React.FC<SectionProps> = ({ title, icon, className = '', children }) => (
  <motion.section
    className={`mb-16 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
      {icon && <span className="mr-3">{icon}</span>}
      {title}
    </h2>
    {children}
  </motion.section>
);

export default Section;
