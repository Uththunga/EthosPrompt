import React from 'react';

const PromptCardSkeleton: React.FC = () => {
  return (
    <div 
      className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 h-full animate-pulse"
      data-testid="prompt-card-skeleton"
    >
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-4" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-700 rounded w-full" />
        <div className="h-3 bg-gray-700 rounded w-5/6" />
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/50">
        <div className="flex flex-wrap gap-2">
          <div className="h-4 bg-gray-700 rounded w-12" />
          <div className="h-4 bg-gray-700 rounded w-16" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-700 rounded-md" />
          <div className="h-6 w-6 bg-gray-700 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default PromptCardSkeleton;
