import React from 'react';
import PromptCard from './PromptCard';
import { Prompt } from '../../lib/supabase';
import type { UIPrompt } from '../../services/DatabaseService';

interface PromptCardAdapterProps {
  prompt: UIPrompt;
  showPreview?: boolean;
  className?: string;
}

/**
 * Adapter component that converts UIPrompt to Supabase Prompt format
 * for use with the enhanced PromptCard component
 */
const PromptCardAdapter: React.FC<PromptCardAdapterProps> = ({ 
  prompt, 
  showPreview = false,
  className = '' 
}) => {
  // Convert UIPrompt to Supabase Prompt format
  const adaptedPrompt: Prompt = {
    id: prompt.id,
    title: prompt.title,
    description: prompt.description,
    content: prompt.prompt, // UIPrompt uses 'prompt', Supabase uses 'content'
    category_id: prompt.categoryId,
    subcategory_id: prompt.subcategoryId || null,
    prompt_group_id: prompt.promptGroupId || null,
    tags: prompt.tags || [],
    industry: prompt.industry || null,
    use_case: prompt.useCase || null,
    skill_level: mapSkillLevel(prompt.difficulty),
    access_type: mapAccessType(prompt.accessType),
    created_at: new Date().toISOString(), // Default value
    updated_at: new Date().toISOString() // Default value
  };

  return (
    <PromptCard 
      prompt={adaptedPrompt}
      showPreview={showPreview}
      className={className}
    />
  );
};

/**
 * Maps UIPrompt difficulty to Supabase skill_level
 */
function mapSkillLevel(difficulty: string): 'beginner' | 'intermediate' | 'advanced' {
  const lowerDifficulty = difficulty.toLowerCase();
  
  if (lowerDifficulty.includes('easy') || lowerDifficulty.includes('beginner') || lowerDifficulty === 'very easy') {
    return 'beginner';
  } else if (lowerDifficulty.includes('intermediate') || lowerDifficulty.includes('moderate') || lowerDifficulty.includes('challenging')) {
    return 'intermediate';
  } else {
    return 'advanced';
  }
}

/**
 * Maps UIPrompt accessType to Supabase access_type
 */
function mapAccessType(accessType: 'free' | 'paid'): 'free' | 'paid' {
  return accessType; // These are already compatible
}

export default PromptCardAdapter;
