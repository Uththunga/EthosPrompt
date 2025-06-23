import React, { useState, useCallback, memo } from 'react';
import type { BasePrompt } from '../data/prompts/types';
import { useError } from '../contexts/ErrorContext';
import { useUserActionRecovery } from '../hooks/useErrorRecovery';
import { Copy, ExternalLink, Check, AlertCircle, RefreshCw } from 'lucide-react';

interface PromptCardProps {
  prompt: BasePrompt & { difficulty?: string };
  onCopy?: () => void;
  onOpenInNewTab?: () => void;
  variant?: 'vertical' | 'horizontal';
}

const PromptCard: React.FC<PromptCardProps> = memo(({
  prompt,
  onCopy,
  onOpenInNewTab,
  variant = 'vertical'
}) => {
  const [copied, setCopied] = useState(false);
  const { addError } = useError();

  // Enhanced copy operation with error recovery
  const copyRecovery = useUserActionRecovery(
    async () => {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    },
    {
      actionName: 'Copy Prompt',
      showSuccessMessage: false, // We handle success with visual feedback
      maxRetries: 2,
      onError: (error) => {
        addError('Failed to copy prompt to clipboard. Please try selecting and copying manually.', 'warning', 'PromptCard');
      }
    }
  );

  const handleCopy = useCallback(() => {
    copyRecovery.execute().catch(() => {
      // Error is handled by the recovery hook
    });
  }, [copyRecovery]);

  const handleOpenInNewTab = useCallback(() => {
    try {
      if (onOpenInNewTab) {
        onOpenInNewTab();
      }
    } catch (error) {
      console.error('Failed to open prompt in new tab:', error);
      addError('Failed to open prompt in new tab. Please try again.', 'warning', 'PromptCard');
    }
  }, [onOpenInNewTab, addError]);

  if (variant === 'horizontal') {
    return (
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 flex items-center gap-4 transition-all hover:border-purple-500/50">
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">{prompt.title}</h3>
          <p className="text-sm text-gray-400 line-clamp-1 mb-2">{prompt.description}</p>
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
            {prompt.tags?.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleCopy}
            disabled={copyRecovery.isLoading}
            className={`p-2 transition-colors rounded-md relative ${
              copyRecovery.isLoading
                ? 'text-gray-500 cursor-not-allowed'
                : copyRecovery.error
                ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            title={
              copyRecovery.isLoading
                ? 'Copying...'
                : copyRecovery.error
                ? 'Copy failed - click to retry'
                : copied
                ? 'Copied!'
                : 'Copy Prompt'
            }
          >
            {copyRecovery.isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : copyRecovery.error ? (
              <AlertCircle className="w-4 h-4" />
            ) : copied ? (
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
    );
  }

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
            disabled={copyRecovery.isLoading}
            className={`p-2 transition-colors rounded-md relative ${
              copyRecovery.isLoading
                ? 'text-gray-500 cursor-not-allowed'
                : copyRecovery.error
                ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            title={
              copyRecovery.isLoading
                ? 'Copying...'
                : copyRecovery.error
                ? 'Copy failed - click to retry'
                : copied
                ? 'Copied!'
                : 'Copy Prompt'
            }
          >
            {copyRecovery.isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : copyRecovery.error ? (
              <AlertCircle className="w-4 h-4" />
            ) : copied ? (
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
});

// Add display name for debugging
PromptCard.displayName = 'PromptCard';

export default PromptCard;
