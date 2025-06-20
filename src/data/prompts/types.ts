export interface BasePrompt {
  id: string;
  categoryId: string;
  subcategoryId: string;
  promptGroupId: string;
  title: string;
  description: string;
  prompt: string;
  tags: string[];
  estimatedTime: string;
  prerequisites: string[];
}

export interface BeginnerPrompt extends BasePrompt {
  difficulty: 'Very Easy' | 'Easy' | 'Moderate';
}

export interface IntermediatePrompt extends BasePrompt {
  difficulty: 'Moderate' | 'Challenging' | 'Advanced';
  expectedOutcome: string;
  followUpActions: string[];
}

export interface AdvancedPrompt extends BasePrompt {
  difficulty: 'Advanced' | 'Expert' | 'Master';
  expectedOutcome: string;
  followUpActions: string[];
  complexityFactors: string[];
  industryContext: string;
  createdAt?: string; // Added to match the data structure
}
