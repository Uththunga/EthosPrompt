import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PromptErrorBoundary } from '../components/PromptErrorBoundary';
import { useError } from '../contexts/ErrorContext';
import { Copy, Check, ArrowLeft, AlertTriangle } from 'lucide-react';

interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  tags?: string[];
  skill_level: string;
}

const PromptDetailPage: React.FC = () => {
  const { promptId } = useParams<{ promptId: string }>();
  const navigate = useNavigate();
  const { addError } = useError();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadPrompt = async () => {
      if (!promptId) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('prompts')
          .select('*')
          .eq('id', promptId)
          .single();

        if (error) {
          console.error('Error loading prompt:', error);
          addError('Failed to load prompt', 'error', 'PromptDetailPage');
          return;
        }

        setPrompt(data);
      } catch (error) {
        console.error('Error loading prompt:', error);
        addError('Failed to load prompt', 'error', 'PromptDetailPage');
      } finally {
        setLoading(false);
      }
    };

    loadPrompt();
  }, [promptId, addError]);

  const handleCopy = async () => {
    if (prompt) {
      try {
        await navigator.clipboard.writeText(prompt.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      } catch (error) {
        console.error('Failed to copy text:', error);
        addError('Failed to copy prompt to clipboard. Please try selecting and copying manually.', 'warning', 'PromptDetailPage');
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading prompt...</p>
        </div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-6">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-red-400 mb-4">Prompt Not Found</h1>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            The prompt you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{prompt.title}</h1>
        </div>

        {prompt.description && (
          <p className="text-gray-400 mb-4">{prompt.description}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {prompt.skill_level && (
            <span className="text-xs px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 font-medium">
              {prompt.skill_level}
            </span>
          )}
          {prompt.tags?.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-300">
              #{tag}
            </span>
          ))}
        </div>

        <PromptErrorBoundary promptId={promptId}>
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 relative">
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-700"
              title={copied ? 'Copied!' : 'Copy Prompt'}
            >
              {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
            </button>
            <pre className="text-gray-300 whitespace-pre-wrap font-sans text-base leading-relaxed pr-12">
              {prompt.content}
            </pre>
          </div>
        </PromptErrorBoundary>
      </div>
    </div>
  );
};

export default PromptDetailPage;
