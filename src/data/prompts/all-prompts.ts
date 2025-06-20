import type { BeginnerPrompt } from './types';
import type { IntermediatePrompt } from './types';
import type { AdvancedPrompt } from './types';
import { beginnerpromptPrompts } from './beginner-prompts';
import { intermediatepromptPrompts } from './intermediate-prompts';
import { advancedpromptPrompts } from './advanced-prompts';

type AnyPrompt = BeginnerPrompt | IntermediatePrompt | AdvancedPrompt;

export const allPrompts: AnyPrompt[] = [
  ...beginnerpromptPrompts,
  ...intermediatepromptPrompts,
  ...advancedpromptPrompts
];

export type { AnyPrompt as Prompt };

export const getDifficultyLevel = (difficulty: string): 'Beginner' | 'Intermediate' | 'Advanced' => {
  if (['Very Easy', 'Easy', 'Moderate'].includes(difficulty)) {
    return 'Beginner';
  }
  if (['Challenging', 'Advanced'].includes(difficulty)) {
    return 'Intermediate';
  }
  return 'Advanced'; // 'Expert', 'Master'
};
