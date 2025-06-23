import React, { useState } from 'react';
import { Heart, Copy, Clock, Tag, Eye, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import AccessBadge from '../access/AccessBadge';
import { Prompt } from '../../lib/supabase';
import { usePromptAccess } from '../../hooks/usePromptAccess';
import { useFavorites } from '../../hooks/useFavorites';
import PromptModal from './PromptModal';
import toast from 'react-hot-toast';

interface PromptCardProps {
  prompt: Prompt;
  showPreview?: boolean;
  className?: string;
}

const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  showPreview = false,
  className = ''
}) => {
  const { checkPromptAccess } = usePromptAccess();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    await toggleFavorite(prompt.id);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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
        {showPreview && (
          <div className="mb-4 p-3 bg-gray-900 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">
              {accessInfo.hasAccess 
                ? truncateText(prompt.content, 150)
                : 'Sign in or upgrade to view this premium prompt content...'
              }
            </p>
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>5-10 min</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            <span>{prompt.category}</span>
          </div>
          {prompt.subcategory && (
            <span>• {prompt.subcategory}</span>
          )}
        </div>

        {/* Tags */}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {prompt.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {prompt.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                +{prompt.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsModalOpen(true)}
            size="sm"
            variant="outline"
            className="flex-1 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Prompt
          </Button>

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
            title={copied ? 'Copied!' : copying ? 'Copying...' : 'Copy Prompt'}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>

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

      {/* Prompt Modal */}
      <PromptModal
        prompt={prompt}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
};

export default PromptCard;
