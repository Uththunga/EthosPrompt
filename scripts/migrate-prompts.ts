import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// This will be included in the build but helps with type checking
import './types';

// Get current directory in a way that works with both ESM and CommonJS
const getDirname = (): string => {
  try {
    // This works in CommonJS
    if (typeof __dirname !== 'undefined') {
      return __dirname;
    }
  } catch (e) {
    // __dirname not available, try ESM approach
  }
  
  try {
    // This works in ESM with import.meta
    // @ts-ignore - import.meta is valid in ESM
    if (typeof import.meta?.url === 'string') {
      // @ts-ignore - fileURLToPath is valid in Node.js
      return dirname(fileURLToPath(import.meta.url));
    }
  } catch (e) {
    // import.meta not available
  }
  
  // Fallback to process.cwd() if neither is available
  return process.cwd();
};

const __dirname = getDirname();

// Define the prompt interface from the source file
interface SourcePrompt {
  id: string;
  categoryId: string;
  subcategoryId: string;
  promptGroupId?: string;
  title: string;
  description: string;
  prompt: string;
  tags?: string[];
}

// Define the target prompt interfaces
interface BasePrompt {
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

interface BeginnerPrompt extends BasePrompt {
  difficulty: 'Very Easy' | 'Easy' | 'Moderate';
}

interface IntermediatePrompt extends BasePrompt {
  difficulty: 'Moderate' | 'Challenging' | 'Advanced';
  expectedOutcome: string;
  followUpActions: string[];
}

interface AdvancedPrompt extends BasePrompt {
  difficulty: 'Advanced' | 'Expert' | 'Master';
  expectedOutcome: string;
  followUpActions: string[];
  complexityFactors: string[];
  industryContext: string;
}

// Helper function to parse JavaScript object without eval
function parsePromptsObject(content: string): SourcePrompt[] {
  // Extract the array content
  const arrayStart = content.indexOf('[');
  const arrayEnd = content.lastIndexOf(']');
  if (arrayStart === -1 || arrayEnd === -1) {
    throw new Error('Could not find array in source file');
  }

  const arrayContent = content.slice(arrayStart, arrayEnd + 1);
  
  // Transform to valid JSON
  const jsonContent = arrayContent
    .replace(/([\w\d_]+):/g, '"$1":') // Add quotes around keys
    .replace(/'/g, '"') // Replace single quotes with double quotes
    .replace(/,\s*\n\s*\}/g, ' }') // Remove trailing commas in objects
    .replace(/,\s*\n\s*\]/g, ' ]'); // Remove trailing commas in arrays

  return JSON.parse(jsonContent);
}

// Read and parse the source file
try {
  const sourcePath = join(__dirname, '../src/data/prompts-data.ts');
  const sourceContent = readFileSync(sourcePath, 'utf-8');
  
  // Parse the prompts
  const prompts = parsePromptsObject(sourceContent);
  console.log(`Found ${prompts.length} prompts to migrate`);
  
  // For testing with a subset
  // const prompts = parsePromptsObject(sourceContent).slice(0, 5);

  // Categorize prompts by difficulty based on their content and structure
  const beginnerPrompts: BeginnerPrompt[] = [];
  const intermediatePrompts: IntermediatePrompt[] = [];
  const advancedPrompts: AdvancedPrompt[] = [];

  // Helper function to estimate prompt complexity
  const estimateComplexity = (prompt: SourcePrompt): 'beginner' | 'intermediate' | 'advanced' => {
    const text = `${prompt.title} ${prompt.description} ${prompt.prompt}`.toLowerCase();
    const wordCount = prompt.prompt.split(/\s+/).length;
    
    // Check for advanced indicators
    const advancedIndicators = [
      'complex', 'advanced', 'expert', 'master', 'comprehensive',
      'multiple', 'strategic', 'analysis', 'evaluate', 'synthesize'
    ];
    
    // Check for beginner indicators
    const beginnerIndicators = [
      'basic', 'introduction', 'beginner', 'simple', 'overview',
      'first', 'fundamental', 'getting started'
    ];
    
    const hasAdvanced = advancedIndicators.some(term => text.includes(term));
    const hasBeginner = beginnerIndicators.some(term => text.includes(term));
    
    if (hasAdvanced) return 'advanced';
    if (hasBeginner) return 'beginner';
    
    // Default to intermediate if no clear indicators
    return wordCount > 100 ? 'intermediate' : 'beginner';
  };

  // Process each prompt
  prompts.forEach(prompt => {
    try {
      // Default values for required fields
      const basePrompt = {
        ...prompt,
        promptGroupId: prompt.promptGroupId || 'general',
        tags: prompt.tags || [],
        estimatedTime: '15-30 minutes',
        prerequisites: ['Basic understanding of the topic'],
      };

      const complexity = estimateComplexity(prompt);
      
      // Categorize based on estimated complexity
      if (complexity === 'beginner') {
        beginnerPrompts.push({
          ...basePrompt,
          difficulty: ['Very Easy', 'Easy', 'Moderate'][Math.floor(Math.random() * 3)] as any,
        });
      } 
      else if (complexity === 'intermediate') {
        intermediatePrompts.push({
          ...basePrompt,
          difficulty: 'Challenging',
          expectedOutcome: 'Practical application and understanding of the concept',
          followUpActions: ['Review materials', 'Practice implementation', 'Seek feedback']
        });
      } 
      else { // advanced
        advancedPrompts.push({
          ...basePrompt,
          difficulty: ['Advanced', 'Expert', 'Master'][Math.floor(Math.random() * 3)] as any,
          expectedOutcome: 'Comprehensive solution ready for implementation',
          followUpActions: ['Review with team', 'Test in staging', 'Gather user feedback'],
          complexityFactors: ['Multiple components', 'Integration requirements', 'High stakes'],
          industryContext: 'Cross-industry application'
        });
      }
    } catch (error) {
      console.error(`Error processing prompt ${prompt.id}:`, error);
    }
  });

  // Write to files
  const outputDir = join(__dirname, '../src/data/prompts');
  
  // Ensure directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // Format a prompt array as TypeScript code
  const formatPrompts = (prompts: any[], type: string) => {
    return `// Auto-generated by migrate-prompts.ts
// Do not edit this file directly - update the source in prompts-data.ts and re-run the migration script

import { ${type} } from './types';

export const ${type.toLowerCase()}Prompts: ${type}[] = ${JSON.stringify(prompts, null, 2)};`;
  };

  // Write beginner prompts
  writeFileSync(
    join(outputDir, 'beginner-prompts.ts'),
    formatPrompts(beginnerPrompts, 'BeginnerPrompt')
  );

  // Write intermediate prompts
  writeFileSync(
    join(outputDir, 'intermediate-prompts.ts'),
    formatPrompts(intermediatePrompts, 'IntermediatePrompt')
  );

  // Write advanced prompts
  writeFileSync(
    join(outputDir, 'advanced-prompts.ts'),
    formatPrompts(advancedPrompts, 'AdvancedPrompt')
  );

  // Print summary
  console.log('\nMigration complete! Summary:');
  console.log('='.repeat(50));
  console.log(`Total prompts processed: ${prompts.length}`);
  console.log(`- Beginner prompts: ${beginnerPrompts.length} (${Math.round((beginnerPrompts.length / prompts.length) * 100)}%)`);
  console.log(`- Intermediate prompts: ${intermediatePrompts.length} (${Math.round((intermediatePrompts.length / prompts.length) * 100)}%)`);
  console.log(`- Advanced prompts: ${advancedPrompts.length} (${Math.round((advancedPrompts.length / prompts.length) * 100)}%)`);
  
  // Check for any uncategorized prompts
  const uncategorized = prompts.length - (beginnerPrompts.length + intermediatePrompts.length + advancedPrompts.length);
  if (uncategorized > 0) {
    console.warn(`\n⚠️  Warning: ${uncategorized} prompts were not categorized!`);
  }
  
  // Verify output files
  console.log('\nOutput files:');
  [
    join(outputDir, 'beginner-prompts.ts'),
    join(outputDir, 'intermediate-prompts.ts'),
    join(outputDir, 'advanced-prompts.ts')
  ].forEach(file => {
    console.log(`- ${file} (${Math.round(require('fs').statSync(file).size / 1024)} KB)`);
  });

} catch (error) {
  console.error('Error during migration:', error);
  process.exit(1);
}
