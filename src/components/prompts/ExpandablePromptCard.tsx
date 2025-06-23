import React, { useState } from 'react';
import { Heart, Copy, Clock, Tag, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import AccessBadge from '../access/AccessBadge';
import { Prompt } from '../../lib/supabase';
import { usePromptAccess } from '../../hooks/usePromptAccess';
import { useFavorites } from '../../hooks/useFavorites';
import toast from 'react-hot-toast';

interface ExpandablePromptCardProps {
  prompt: Prompt;
  showPreview?: boolean;
  className?: string;
  defaultExpanded?: boolean;
}

const ExpandablePromptCard: React.FC<ExpandablePromptCardProps> = ({ 
  prompt, 
  showPreview = false,
  className = '',
  defaultExpanded = false
}) => {
  const { checkPromptAccess } = usePromptAccess();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatPromptContent = (content: string) => {
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
    <Card className={`bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-200 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <AccessBadge accessType={prompt.access_type} size="sm" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                {prompt.skill_level}
              </span>
              {prompt.estimated_time && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {prompt.estimated_time}
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
              {prompt.title}
            </h3>
          </div>
          
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

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {prompt.description}
        </p>

        {/* Preview Content */}
        {showPreview && !isExpanded && (
          <div className="mb-4 p-3 bg-gray-900 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">
              {accessInfo.hasAccess 
                ? truncateText(prompt.content, 150)
                : 'Sign in or upgrade to view this premium prompt content...'
              }
            </p>
          </div>
        )}

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mb-6 space-y-4">
            {/* Tags */}
            {prompt.tags && prompt.tags.length > 0 && (
              <div>
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

            {/* Full Prompt Content */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-md font-semibold text-white">Prompt Content</h4>
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
            {(prompt.use_cases || prompt.examples) && (
              <div className="space-y-4">
                {prompt.use_cases && prompt.use_cases.length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold text-white mb-2">Use Cases</h4>
                    <ul className="space-y-1">
                      {prompt.use_cases.map((useCase, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {prompt.examples && prompt.examples.length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold text-white mb-2">Examples</h4>
                    <div className="space-y-2">
                      {prompt.examples.map((example, index) => (
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
        )}

        {/* Expand/Collapse Button */}
        <div className="mb-4">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            size="sm"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                View Full Prompt
              </>
            )}
          </Button>
        </div>

        {/* Actions */}
        {!isExpanded && (
          <div className="flex items-center gap-2">
            <Button
              onClick={handleCopyPrompt}
              disabled={copying || !accessInfo.hasAccess}
              size="sm"
              className={`flex-1 ${
                accessInfo.hasAccess
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Copy className="w-4 h-4 mr-2" />
              {copying ? 'Copying...' : accessInfo.hasAccess ? 'Copy Prompt' : 'Upgrade to Copy'}
            </Button>
          </div>
        )}

        {/* Access Message */}
        {!accessInfo.hasAccess && (
          <div className="mt-3 p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
            <p className="text-sm text-gray-400 text-center">
              {accessInfo.requiresAuth 
                ? 'Sign in to access this premium prompt'
                : 'Upgrade to lifetime access to unlock this prompt'
              }
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExpandablePromptCard;
