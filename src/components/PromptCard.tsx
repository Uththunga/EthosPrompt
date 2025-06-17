import React, { useState } from 'react';
// No Link import needed as we're using buttons for actions
import { Prompt } from '../data/prompts-data';
import { Copy, ExternalLink, Check } from 'lucide-react';

interface PromptCardProps {
  prompt: Prompt;
  onCopy?: () => void;
  onOpenInNewTab?: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ 
  prompt, 
  onCopy, 
  onOpenInNewTab 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    if (onCopy) onCopy();
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
        <div className="flex flex-wrap gap-2">
          {prompt.tags?.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
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
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          </button>
          <button
            onClick={handleOpenInNewTab}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-700"
            title="Open in new tab"
          >
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
