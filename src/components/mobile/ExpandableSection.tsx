import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  onToggle?: (expanded: boolean) => void;
  disabled?: boolean;
  animationDuration?: number;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  children,
  defaultExpanded = false,
  icon,
  badge,
  className,
  headerClassName,
  contentClassName,
  onToggle,
  disabled = false,
  animationDuration = 300,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [height, setHeight] = useState<number | 'auto'>(defaultExpanded ? 'auto' : 0);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(isExpanded ? contentHeight : 0);
    }
  }, [isExpanded, children]);

  const handleToggle = () => {
    if (disabled) return;

    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onToggle?.(newExpanded);

    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    // Set height to auto after animation completes
    if (newExpanded) {
      timeoutRef.current = setTimeout(() => {
        setHeight('auto');
      }, animationDuration);
    } else {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={cn('border border-gray-700/50 rounded-lg overflow-hidden', className)}>
      {/* Header */}
      <button
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between p-4',
          'bg-gray-800/40 hover:bg-gray-800/60 transition-colors duration-200',
          'text-left focus:outline-none focus:ring-2 focus:ring-purple-500/50',
          'touch-target active:bg-gray-800/80',
          disabled && 'opacity-50 cursor-not-allowed',
          headerClassName
        )}
        aria-expanded={isExpanded}
        aria-controls={`expandable-content-${title}`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {icon && (
            <div className="flex-shrink-0 w-5 h-5 text-gray-400">
              {icon}
            </div>
          )}
          <h3 className="text-white font-medium truncate">{title}</h3>
          {badge && (
            <span className="flex-shrink-0 px-2 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
              {badge}
            </span>
          )}
        </div>
        <div className="flex-shrink-0 ml-2">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400 transition-transform duration-200" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200" />
          )}
        </div>
      </button>

      {/* Content */}
      <div
        ref={contentRef}
        id={`expandable-content-${title}`}
        className="overflow-hidden transition-all ease-in-out"
        style={{
          height: height === 'auto' ? 'auto' : `${height}px`,
          transitionDuration: `${animationDuration}ms`,
        }}
      >
        <div className={cn('p-4 bg-gray-800/20', contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
};

// Accordion component for multiple expandable sections
export const Accordion: React.FC<{
  children: React.ReactElement<ExpandableSectionProps>[];
  allowMultiple?: boolean;
  className?: string;
}> = ({ children, allowMultiple = false, className }) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const handleToggle = (index: number, expanded: boolean) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      
      if (expanded) {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      } else {
        newSet.delete(index);
      }
      
      return newSet;
    });
  };

  return (
    <div className={cn('space-y-2', className)}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        const isExpanded = expandedItems.has(index);
        
        return React.cloneElement(child, {
          ...child.props,
          defaultExpanded: isExpanded,
          onToggle: (expanded: boolean) => {
            handleToggle(index, expanded);
            child.props.onToggle?.(expanded);
          },
        });
      })}
    </div>
  );
};

// FAQ Section component
export const FAQSection: React.FC<{
  faqs: Array<{
    question: string;
    answer: string | React.ReactNode;
    category?: string;
  }>;
  className?: string;
}> = ({ faqs, className }) => {
  return (
    <Accordion className={className}>
      {faqs.map((faq, index) => (
        <ExpandableSection
          key={index}
          title={faq.question}
          badge={faq.category}
          className="bg-gray-800/20"
        >
          <div className="text-gray-300 leading-relaxed">
            {typeof faq.answer === 'string' ? (
              <p>{faq.answer}</p>
            ) : (
              faq.answer
            )}
          </div>
        </ExpandableSection>
      ))}
    </Accordion>
  );
};

// Table of Contents component
export const TableOfContents: React.FC<{
  sections: Array<{
    id: string;
    title: string;
    level: number;
    subsections?: Array<{
      id: string;
      title: string;
    }>;
  }>;
  activeSection?: string;
  onSectionClick?: (id: string) => void;
  className?: string;
}> = ({ sections, activeSection, onSectionClick, className }) => {
  return (
    <ExpandableSection
      title="Table of Contents"
      icon={<div className="w-4 h-4 bg-purple-500 rounded" />}
      className={className}
      defaultExpanded={false}
    >
      <nav className="space-y-1">
        {sections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => onSectionClick?.(section.id)}
              className={cn(
                'w-full text-left p-2 rounded-lg transition-colors duration-200',
                'hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50',
                activeSection === section.id
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-gray-300 hover:text-white',
                section.level > 1 && 'ml-4 text-sm'
              )}
              style={{ paddingLeft: `${section.level * 0.5}rem` }}
            >
              {section.title}
            </button>
            
            {section.subsections && section.subsections.map((subsection) => (
              <button
                key={subsection.id}
                onClick={() => onSectionClick?.(subsection.id)}
                className={cn(
                  'w-full text-left p-2 rounded-lg transition-colors duration-200 text-sm',
                  'hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50',
                  'ml-6',
                  activeSection === subsection.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'text-gray-400 hover:text-gray-200'
                )}
              >
                {subsection.title}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </ExpandableSection>
  );
};

export default ExpandableSection;
