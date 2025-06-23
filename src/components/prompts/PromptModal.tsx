import React, { useState } from 'react';
import { Copy, Check, Heart, Clock, Tag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';
import { Button } from '../ui/Button';
import AccessBadge from '../access/AccessBadge';
import { Prompt } from '../../lib/supabase';
import { usePromptAccess } from '../../hooks/usePromptAccess';
import { useFavorites } from '../../hooks/useFavorites';
import toast from 'react-hot-toast';

interface PromptModalProps {
  prompt: Prompt;
  isOpen: boolean;
  onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ prompt, isOpen, onClose }) => {
  const { checkPromptAccess } = usePromptAccess();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false);

  const accessInfo = checkPromptAccess(prompt);
  const favorited = isFavorited(prompt.id);

  const handleCopyPrompt = async () => {
    if (!accessInfo.hasAccess) {
      toast.error('Please upgrade to access this premium prompt');
      return;
    }

    setCopying(true);
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      toast.success('Prompt copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy prompt');
    } finally {
      setCopying(false);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite(prompt.id);
      toast.success(favorited ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  const formatPromptContent = (content: string) => {
    // Split content into paragraphs and preserve formatting
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="mb-3 last:mb-0">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-gray-800 border-gray-700">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-2">
                <AccessBadge accessType={prompt.access_type} size="sm" />
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  {prompt.skill_level}
                </span>
                {(prompt as any).estimated_time && (
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {(prompt as any).estimated_time}
                  </div>
                )}
                {prompt.industry && (
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Tag className="w-3 h-3" />
                    {prompt.industry}
                  </div>
                )}
              </div>
              <DialogTitle className="text-xl font-semibold text-white mb-2">
                {prompt.title}
              </DialogTitle>
              {prompt.description && (
                <p className="text-gray-300 text-sm">
                  {prompt.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-lg transition-colors ${
                  favorited
                    ? 'text-red-400 hover:text-red-300 bg-red-400/10'
                    : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                }`}
                aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Tags */}
          {prompt.tags && Array.isArray(prompt.tags) && prompt.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-400">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prompt Content */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Prompt Content</h3>
              <Button
                onClick={handleCopyPrompt}
                disabled={copying || !accessInfo.hasAccess}
                size="sm"
                className={`${
                  accessInfo.hasAccess
                    ? copied
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    {copying ? 'Copying...' : accessInfo.hasAccess ? 'Copy Prompt' : 'Upgrade to Copy'}
                  </>
                )}
              </Button>
            </div>
            
            <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
              {accessInfo.hasAccess ? (
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                  {formatPromptContent(prompt.content)}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">
                    {accessInfo.requiresAuth 
                      ? 'Sign in to access this premium prompt'
                      : 'Upgrade to lifetime access to unlock this prompt'
                    }
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                  >
                    {accessInfo.requiresAuth ? 'Sign In' : 'Upgrade Now'}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          {(prompt.use_case || (prompt as any).use_cases || (prompt as any).examples) && (
            <div className="space-y-4">
              {/* Single use case from Supabase */}
              {prompt.use_case && (
                <div>
                  <h4 className="text-md font-semibold text-white mb-2">Use Case</h4>
                  <div className="text-gray-300 text-sm flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    {prompt.use_case}
                  </div>
                </div>
              )}

              {/* Multiple use cases (if available) */}
              {(prompt as any).use_cases && Array.isArray((prompt as any).use_cases) && (prompt as any).use_cases.length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-white mb-2">Use Cases</h4>
                  <ul className="space-y-1">
                    {(prompt as any).use_cases.map((useCase: string, index: number) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Examples (if available) */}
              {(prompt as any).examples && Array.isArray((prompt as any).examples) && (prompt as any).examples.length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-white mb-2">Examples</h4>
                  <div className="space-y-2">
                    {(prompt as any).examples.map((example: string, index: number) => (
                      <div key={index} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                        <p className="text-gray-300 text-sm">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromptModal;
