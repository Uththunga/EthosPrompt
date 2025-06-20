export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export const getDifficultyLevel = (difficulty: string): DifficultyLevel => {
  // First check for exact matches to handle 'Intermediate' directly
  if (difficulty === 'Beginner') return 'Beginner';
  if (difficulty === 'Intermediate') return 'Intermediate';
  if (difficulty === 'Advanced') return 'Advanced';
  
  // Then handle legacy difficulty levels
  if (['Very Easy', 'Easy', 'Moderate'].includes(difficulty)) return 'Beginner';
  if (['Challenging'].includes(difficulty)) return 'Intermediate';
  
  // Default to Advanced for any other values
  return 'Advanced';
};
