import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import existing prompt data
import { beginnerpromptPrompts } from '../src/data/prompts/beginner-prompts';
import { intermediatepromptPrompts } from '../src/data/prompts/intermediate-prompts';
import { advancedpromptPrompts } from '../src/data/prompts/advanced-prompts';

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
  process.exit(1);
}

// Use service key if available, otherwise use anon key
const apiKey = supabaseServiceKey || supabaseAnonKey;
const supabase = createClient(supabaseUrl, apiKey);

if (!supabaseServiceKey) {
  console.log('⚠️  Using anon key for migration. Some operations may be limited.');
  console.log('For full functionality, add SUPABASE_SERVICE_ROLE_KEY to your .env file');
}

// Transform existing prompt data to match database schema
const transformPrompt = (prompt: any, skillLevel: 'beginner' | 'intermediate' | 'advanced') => {
  // Map categoryId to a readable category name
  const categoryMap: Record<string, string> = {
    'education': 'Education',
    'business': 'Business Strategy',
    'marketing': 'Marketing',
    'content': 'Content Creation',
    'development': 'Software Development',
    'design': 'Design',
    'research': 'Research & Analysis',
    'communication': 'Communication',
    'productivity': 'Productivity',
    'creative': 'Creative Writing',
    'technical': 'Technical Writing',
    'sales': 'Sales & Customer Service'
  };

  // Map subcategoryId to readable subcategory
  const subcategoryMap: Record<string, string> = {
    'lesson-planning': 'Lesson Planning',
    'classroom-management': 'Classroom Management',
    'assessment-evaluation': 'Assessment & Evaluation',
    'curriculum-development': 'Curriculum Development',
    'student-engagement': 'Student Engagement'
  };

  return {
    title: prompt.title,
    description: prompt.description,
    content: prompt.prompt || prompt.content || '',
    category: categoryMap[prompt.categoryId] || prompt.categoryId || 'General',
    subcategory: subcategoryMap[prompt.subcategoryId] || prompt.subcategoryId || null,
    tags: prompt.tags || [],
    industry: prompt.industryContext || prompt.industry || null,
    use_case: prompt.useCase || prompt.use_case || null,
    skill_level: skillLevel,
    access_type: determineAccessType(prompt, skillLevel),
  };
};

// Determine access type based on skill level and content
const determineAccessType = (prompt: any, skillLevel: string): 'free' | 'paid' => {
  // Make beginner prompts free, intermediate and advanced paid
  // You can adjust this logic based on your business requirements
  if (skillLevel === 'beginner') {
    return 'free';
  }
  
  // For intermediate and advanced, make some free for demo purposes
  const freeCategories = ['Content Creation', 'Business Strategy', 'Marketing'];
  if (freeCategories.includes(prompt.category)) {
    return 'free';
  }
  
  return 'paid';
};

const migratePrompts = async () => {
  console.log('🚀 Starting prompt migration to Supabase...');
  
  try {
    // Prepare all prompts
    const allPrompts = [
      ...beginnerpromptPrompts.map(p => transformPrompt(p, 'beginner')),
      ...intermediatepromptPrompts.map(p => transformPrompt(p, 'intermediate')),
      ...advancedpromptPrompts.map(p => transformPrompt(p, 'advanced')),
    ];

    console.log(`📊 Total prompts to migrate: ${allPrompts.length}`);
    
    // Clear existing prompts (optional - remove if you want to keep existing data)
    console.log('🗑️ Clearing existing prompts...');
    const { error: deleteError } = await supabase
      .from('prompts')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    
    if (deleteError) {
      console.warn('Warning: Could not clear existing prompts:', deleteError.message);
    }

    // Insert prompts in batches
    const batchSize = 50;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < allPrompts.length; i += batchSize) {
      const batch = allPrompts.slice(i, i + batchSize);
      
      console.log(`📤 Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allPrompts.length / batchSize)}...`);
      
      const { data, error } = await supabase
        .from('prompts')
        .insert(batch)
        .select();
      
      if (error) {
        console.error(`❌ Error inserting batch:`, error);
        errorCount += batch.length;
      } else {
        console.log(`✅ Successfully inserted ${data.length} prompts`);
        successCount += data.length;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully migrated: ${successCount} prompts`);
    console.log(`❌ Failed to migrate: ${errorCount} prompts`);
    
    if (successCount > 0) {
      console.log('\n🎉 Migration completed successfully!');
      
      // Show some statistics
      const { data: stats } = await supabase
        .from('prompts')
        .select('skill_level, access_type, category')
        .order('category');
      
      if (stats) {
        console.log('\n📈 Database Statistics:');
        
        // Group by skill level
        const bySkillLevel = stats.reduce((acc, prompt) => {
          acc[prompt.skill_level] = (acc[prompt.skill_level] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        console.log('By Skill Level:', bySkillLevel);
        
        // Group by access type
        const byAccessType = stats.reduce((acc, prompt) => {
          acc[prompt.access_type] = (acc[prompt.access_type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        console.log('By Access Type:', byAccessType);
        
        // Group by category
        const byCategory = stats.reduce((acc, prompt) => {
          acc[prompt.category] = (acc[prompt.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        console.log('By Category:', byCategory);
      }
    }
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  }
};

// Run the migration
if (require.main === module) {
  migratePrompts()
    .then(() => {
      console.log('\n✨ Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

export { migratePrompts };
