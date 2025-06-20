import React, { useState } from 'react';
import type { BasePrompt } from '../data/prompts/types';
import { Copy, ExternalLink, Check } from 'lucide-react';

interface PromptCardProps {
  prompt: BasePrompt & { difficulty?: string };
  onCopy?: () => void;
  onOpenInNewTab?: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ 
  prompt, 
  onCopy, 
  onOpenInNewTab 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    } catch (error) {
      console.error('Failed to copy text:', error);
      // Optionally show error to user
    }
  };

  const handleOpenInNewTab = () => {
    if (onOpenInNewTab) {
      onOpenInNewTab();
    }
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 flex flex-col justify-between transition-all hover:border-purple-500/50 h-full">
      <div>
        <h3 className="font-semibold text-white mb-2">{prompt.title}</h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-4">{prompt.description}</p>
      </div>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50">
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty Badge */}
          {prompt.difficulty && (
            <span 
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                ['Very Easy', 'Easy', 'Moderate'].includes(prompt.difficulty) ? 'bg-green-900/50 text-green-300' :
                ['Challenging', 'Advanced'].includes(prompt.difficulty) ? 'bg-blue-900/50 text-blue-300' :
                'bg-purple-900/50 text-purple-300'
              }`}
            >
              {prompt.difficulty}
            </span>
          )}
          
          {/* Tags */}
          {prompt.tags?.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-300">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-700 relative"
            title={copied ? 'Copied!' : 'Copy Prompt'}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleOpenInNewTab}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-700"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
