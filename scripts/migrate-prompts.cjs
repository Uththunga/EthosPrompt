// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');

// In CommonJS, __dirname is already defined
// No need to redefine it

// Define the prompt interface from the source file
/** @typedef {Object} SourcePrompt
 * @property {string} id
 * @property {string} categoryId
 * @property {string} subcategoryId
 * @property {string} [promptGroupId]
 * @property {string} title
 * @property {string} description
 * @property {string} prompt
 * @property {string[]} [tags]
 */

// Define the target prompt interfaces
/** @typedef {Object} BasePrompt
 * @property {string} id
 * @property {string} categoryId
 * @property {string} subcategoryId
 * @property {string} promptGroupId
 * @property {string} title
 * @property {string} description
 * @property {string} prompt
 * @property {string[]} tags
 * @property {string} estimatedTime
 * @property {string[]} prerequisites
 */

/** @typedef {BasePrompt & { difficulty: 'Very Easy' | 'Easy' | 'Moderate' }} BeginnerPrompt */

/** @typedef {BasePrompt & { 
 *   difficulty: 'Moderate' | 'Challenging' | 'Advanced',
 *   expectedOutcome: string,
 *   followUpActions: string[]
 * }} IntermediatePrompt */

/** @typedef {BasePrompt & { 
 *   difficulty: 'Advanced' | 'Expert' | 'Master',
 *   expectedOutcome: string,
 *   followUpActions: string[],
 *   complexityFactors: string[],
 *   industryContext: string
 * }} AdvancedPrompt */

// Parse the prompts from the source file
function parsePromptsObject(content) {
  try {
    // The file is a TypeScript module that exports a prompts array
    // We'll use a more robust approach to extract the prompts array
    
    // First, try to find the start and end of the prompts array
    const startMarker = 'export const prompts: Prompt[] = [';
    const startIndex = content.indexOf(startMarker);
    
    if (startIndex === -1) {
      throw new Error('Could not find the start of the prompts array in the source file');
    }
    
    // Extract everything after the start marker
    const afterStart = content.slice(startIndex + startMarker.length);
    
    // Find the matching closing bracket for the array
    let bracketCount = 1; // We already have one opening bracket
    let endIndex = 0;
    
    for (let i = 0; i < afterStart.length; i++) {
      const char = afterStart[i];
      
      if (char === '[') {
        bracketCount++;
      } else if (char === ']') {
        bracketCount--;
        if (bracketCount === 0) {
          endIndex = i;
          break;
        }
      }
    }
    
    if (endIndex === 0) {
      throw new Error('Could not find the end of the prompts array in the source file');
    }
    
    // Extract the array content
    const arrayContent = afterStart.slice(0, endIndex);
    
    // Create a function that returns the array
    // This is safer than trying to parse the array content directly
    const getPrompts = new Function(`
      const prompts = [${arrayContent}];
      return JSON.parse(JSON.stringify(prompts));
    `);
    
    return getPrompts();
  } catch (error) {
    console.error('Error parsing prompts:', error);
    throw new Error(`Failed to parse prompts array: ${error.message}`);
  }
}

// Main function to run the migration
async function main() {
  try {
    // Read and parse the source file
    const sourcePath = path.join(__dirname, '../src/data/prompts-data.ts');
    const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
    
    // Parse the prompts from the source file
    const prompts = parsePromptsObject(sourceContent);
    
    // Create output directory if it doesn't exist
    const outputDir = path.join(__dirname, '../src/data/generated');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Categorize prompts by difficulty
    const beginnerPrompts = [];
    const intermediatePrompts = [];
    const advancedPrompts = [];
    
    // Helper function to estimate prompt complexity
    function estimateComplexity(prompt) {
      const wordCount = prompt.prompt.split(/\s+/).length;
      const tagCount = prompt.tags ? prompt.tags.length : 0;
      
      // Simple heuristic based on word count and tags
      if (wordCount < 50 && tagCount <= 3) {
        return 'beginner';
      } else if (wordCount < 150 && tagCount <= 6) {
        return 'intermediate';
      } else {
        return 'advanced';
      }
    }
    
    // Process each prompt
    for (const prompt of prompts) {
      try {
        // Default values for required fields
        const basePrompt = {
          id: prompt.id,
          categoryId: prompt.categoryId,
          subcategoryId: prompt.subcategoryId,
          promptGroupId: prompt.promptGroupId || '',
          title: prompt.title,
          description: prompt.description,
          prompt: prompt.prompt,
          tags: prompt.tags || [],
          estimatedTime: '5-10 minutes',
          prerequisites: []
        };
        
        // Categorize based on estimated complexity
        const complexity = estimateComplexity(prompt);
        
        if (complexity === 'beginner') {
          beginnerPrompts.push({
            ...basePrompt,
            difficulty: 'Moderate' // Default to moderate for now
          });
        } else if (complexity === 'intermediate') {
          intermediatePrompts.push({
            ...basePrompt,
            difficulty: 'Moderate',
            expectedOutcome: 'Improved understanding of the topic',
            followUpActions: ['Review the results', 'Try a different approach']
          });
        } else {
          advancedPrompts.push({
            ...basePrompt,
            difficulty: 'Advanced',
            expectedOutcome: 'Comprehensive solution to the problem',
            followUpActions: ['Test the solution', 'Optimize further'],
            complexityFactors: ['Multiple steps', 'Advanced concepts'],
            industryContext: 'Professional use case'
          });
        }
      } catch (error) {
        console.error(`Error processing prompt ${prompt.id}:`, error);
      }
    }
    
    // Helper function to format prompts as TypeScript code
    function formatPrompts(prompts, type) {
      return `// Auto-generated file - DO NOT EDIT DIRECTLY
// Generated by: ${path.basename(__filename)}


import { ${type} } from '../types/prompt';

export const prompts: ${type}[] = ${JSON.stringify(prompts, null, 2)};`;
    }
    
    // Write beginner prompts
    fs.writeFileSync(
      path.join(outputDir, 'beginner-prompts.ts'),
      formatPrompts(beginnerPrompts, 'BeginnerPrompt')
    );
    
    // Write intermediate prompts
    fs.writeFileSync(
      path.join(outputDir, 'intermediate-prompts.ts'),
      formatPrompts(intermediatePrompts, 'IntermediatePrompt')
    );
    
    // Write advanced prompts
    fs.writeFileSync(
      path.join(outputDir, 'advanced-prompts.ts'),
      formatPrompts(advancedPrompts, 'AdvancedPrompt')
    );
    
    console.log('Successfully migrated prompts:');
    console.log(`- ${beginnerPrompts.length} beginner prompts`);
    console.log(`- ${intermediatePrompts.length} intermediate prompts`);
    console.log(`- ${advancedPrompts.length} advanced prompts`);
    console.log(`\nOutput files saved to: ${outputDir}`);
    
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

// Run the migration
main();
