import React from 'react';
import { Filter, Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MobileFilterFABProps {
  onClick: () => void;
  activeFiltersCount: number;
  className?: string;
}

const MobileFilterFAB: React.FC<MobileFilterFABProps> = ({
  onClick,
  activeFiltersCount,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-20 right-4 z-30 lg:hidden',
        'w-14 h-14 bg-purple-600 hover:bg-purple-700 active:bg-purple-800',
        'rounded-full shadow-lg shadow-purple-500/25',
        'flex items-center justify-center',
        'transition-all duration-200 ease-in-out',
        'touch-target-large',
        'hover:scale-105 active:scale-95',
        className
      )}
    >
      <Filter className="w-6 h-6 text-white" />
      
      {/* Active Filters Badge */}
      {activeFiltersCount > 0 && (
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {activeFiltersCount > 9 ? '9+' : activeFiltersCount}
        </span>
      )}
    </button>
  );
};

export default MobileFilterFAB;
