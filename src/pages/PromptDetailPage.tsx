import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { prompts } from '../data/prompts-data';
import { Copy, Check } from 'lucide-react';

const PromptDetailPage: React.FC = () => {
  const { promptId } = useParams<{ promptId: string }>();
  const prompt = prompts.find(p => p.id === promptId);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }
  };

  if (!prompt) {
    return <div className="text-white text-center p-10">Prompt not found</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">{prompt.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {prompt.tags?.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-300">
              #{tag}
            </span>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 relative">
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-700"
            title={copied ? 'Copied!' : 'Copy Prompt'}
          >
            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
          </button>
          <pre className="text-gray-300 whitespace-pre-wrap font-sans text-base leading-relaxed">
            {prompt.prompt}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PromptDetailPage;
