#!/usr/bin/env node

/**
 * Database Migration Script
 * 
 * This script migrates categories and generates sample prompts for the EthosPrompt application.
 * It uses the Supabase database and the migration service.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_ANON_KEY) are set in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Categories data (simplified version for migration)
const categories = [
  {
    id: 'marketing',
    name: 'Marketing & Content',
    icon: 'Megaphone',
    description: 'Drive growth with AI-powered strategies, from planning and creation to promotion and analytics.',
    prompt_count: 180,
    bg_gradient: 'from-purple-600/20 to-pink-600/20',
    featured: true,
    subcategories: [
      {
        id: 'marketing-strategy-planning',
        name: 'Marketing Strategy & Planning',
        description: 'Develop comprehensive marketing strategies, define target audiences, and plan campaigns.',
        examples: ['Develop a Q3 marketing plan.', 'Define the target audience for a new SaaS product.'],
        skill_level: 'advanced',
        promptGroups: [
          { id: 'market-audience-research', name: 'Market & Audience Research' },
          { id: 'campaign-strategy-briefs', name: 'Campaign Strategy & Briefs' },
          { id: 'content-seo-planning', name: 'Content & SEO Planning' },
        ],
      },
      {
        id: 'content-creation-copywriting',
        name: 'Content Creation & Copywriting',
        description: 'Generate high-quality content for various platforms, from blog posts to ad copy.',
        examples: ['Write a 1000-word blog post on AI in marketing.', 'Generate 5 ad headlines for a new sneaker launch.'],
        skill_level: 'intermediate',
        promptGroups: [
          { id: 'long-form-content', name: 'Long-Form Content' },
          { id: 'social-media-content', name: 'Social Media Content' },
          { id: 'email-ad-copy', name: 'Email & Ad Copy' },
        ],
      },
    ],
  },
  {
    id: 'education',
    name: 'Education & Teaching',
    icon: 'GraduationCap',
    description: 'Design effective learning materials and curricula',
    prompt_count: 38,
    bg_gradient: 'from-blue-600/20 to-cyan-600/20',
    trending: true,
    subcategories: [
      {
        id: 'lesson-planning',
        name: 'Lesson Planning',
        description: 'Structured lesson plans and materials',
        examples: ['Unit Plans', 'Activity Designs', 'Learning Objectives'],
        skill_level: 'beginner',
        promptGroups: [
          { id: 'lesson-plans', name: 'Lesson Plans' },
          { id: 'activity-design', name: 'Activity Design' },
          { id: 'instructional-materials', name: 'Instructional Materials' },
        ]
      },
    ]
  },
  {
    id: 'development',
    name: 'Software Development',
    icon: 'Code',
    description: 'Code generation, documentation, and technical writing',
    prompt_count: 42,
    bg_gradient: 'from-emerald-600/20 to-teal-600/20',
    featured: true,
    subcategories: [
      {
        id: 'code-assistance',
        name: 'Code Assistance',
        description: 'Code generation and problem-solving',
        examples: ['Function Generation', 'Bug Fixing', 'Code Optimization'],
        skill_level: 'advanced',
        promptGroups: [
          { id: 'code-generation', name: 'Code Generation' },
          { id: 'debugging-help', name: 'Debugging Help' },
        ]
      },
    ]
  }
];

// Generate sample prompts for a subcategory
function generateSamplePrompts(categoryName, subcategory) {
  const prompts = [];
  
  for (let i = 1; i <= 3; i++) {
    const example = subcategory.examples[Math.min(i - 1, subcategory.examples.length - 1)] || 'Create content';
    
    prompts.push({
      title: `${subcategory.name} Prompt ${i}`,
      description: `A beginner-friendly prompt for ${subcategory.name.toLowerCase()}. ${subcategory.description}`,
      content: `You are an expert in ${categoryName.toLowerCase()}. Help me with ${example.toLowerCase()}. 

Please provide:
1. A clear and actionable approach
2. Step-by-step guidance
3. Best practices to follow
4. Common mistakes to avoid

Context: [Describe your specific situation here]
Goal: [What you want to achieve]
Constraints: [Any limitations or requirements]

Please tailor your response to be practical and immediately actionable.`,
      category_id: subcategory.category_id,
      subcategory_id: subcategory.id,
      prompt_group_id: subcategory.promptGroups?.[0]?.id || null,
      tags: [
        categoryName.toLowerCase().replace(/\s+/g, '-'),
        subcategory.name.toLowerCase().replace(/\s+/g, '-'),
        'beginner',
        'template'
      ],
      industry: getIndustryForCategory(categoryName),
      use_case: example,
      skill_level: 'beginner',
      access_type: 'free'
    });
  }
  
  return prompts;
}

function getIndustryForCategory(categoryName) {
  const industryMap = {
    'Marketing & Content': 'marketing',
    'Education & Teaching': 'education',
    'Software Development': 'technology'
  };
  
  return industryMap[categoryName] || 'general';
}

async function createTables() {
  console.log('🏗️  Creating database tables...');

  // Create categories table
  const { error: categoriesError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS public.categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        description TEXT NOT NULL,
        prompt_count INTEGER DEFAULT 0,
        bg_gradient TEXT NOT NULL,
        trending BOOLEAN DEFAULT FALSE,
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  });

  if (categoriesError) {
    console.log('Categories table might already exist or using direct SQL...');
  }

  // Create subcategories table
  const { error: subcategoriesError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS public.subcategories (
        id TEXT PRIMARY KEY,
        category_id TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        examples TEXT[] DEFAULT '{}',
        skill_level TEXT NOT NULL DEFAULT 'beginner',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  });

  // Create prompt_groups table
  const { error: promptGroupsError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS public.prompt_groups (
        id TEXT PRIMARY KEY,
        subcategory_id TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  });

  // Create prompts table
  const { error: promptsError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS public.prompts (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        content TEXT NOT NULL,
        category_id TEXT NOT NULL,
        subcategory_id TEXT,
        prompt_group_id TEXT,
        tags TEXT[] DEFAULT '{}',
        industry TEXT,
        use_case TEXT,
        skill_level TEXT NOT NULL DEFAULT 'beginner',
        access_type TEXT NOT NULL DEFAULT 'free',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  });

  console.log('✅ Tables created (or already exist)');
}

async function migrateData() {
  try {
    console.log('🚀 Starting database migration...');

    // Create tables first
    await createTables();

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await supabase.from('prompts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('prompt_groups').delete().neq('id', 'dummy');
    await supabase.from('subcategories').delete().neq('id', 'dummy');
    await supabase.from('categories').delete().neq('id', 'dummy');

    // Migrate categories
    for (const category of categories) {
      console.log(`📁 Migrating category: ${category.name}`);
      
      const { error: categoryError } = await supabase
        .from('categories')
        .insert({
          id: category.id,
          name: category.name,
          icon: category.icon,
          description: category.description,
          prompt_count: category.prompt_count,
          bg_gradient: category.bg_gradient,
          trending: category.trending || false,
          featured: category.featured || false
        });

      if (categoryError) {
        console.error(`❌ Error inserting category ${category.id}:`, categoryError);
        continue;
      }

      // Migrate subcategories
      for (const subcategory of category.subcategories) {
        console.log(`  📂 Migrating subcategory: ${subcategory.name}`);
        
        const { error: subcategoryError } = await supabase
          .from('subcategories')
          .insert({
            id: subcategory.id,
            category_id: category.id,
            name: subcategory.name,
            description: subcategory.description,
            examples: subcategory.examples,
            skill_level: subcategory.skill_level
          });

        if (subcategoryError) {
          console.error(`❌ Error inserting subcategory ${subcategory.id}:`, subcategoryError);
          continue;
        }

        // Migrate prompt groups
        if (subcategory.promptGroups) {
          for (const promptGroup of subcategory.promptGroups) {
            console.log(`    📄 Migrating prompt group: ${promptGroup.name}`);
            
            const { error: promptGroupError } = await supabase
              .from('prompt_groups')
              .insert({
                id: promptGroup.id,
                subcategory_id: subcategory.id,
                name: promptGroup.name
              });

            if (promptGroupError) {
              console.error(`❌ Error inserting prompt group ${promptGroup.id}:`, promptGroupError);
            }
          }
        }

        // Generate and insert sample prompts
        console.log(`    ✍️  Generating sample prompts for: ${subcategory.name}`);
        const samplePrompts = generateSamplePrompts(category.name, {
          ...subcategory,
          category_id: category.id
        });

        for (const prompt of samplePrompts) {
          const { error: promptError } = await supabase
            .from('prompts')
            .insert(prompt);

          if (promptError) {
            console.error(`❌ Error inserting prompt:`, promptError);
          }
        }
      }
    }

    console.log('✅ Database migration completed successfully!');
    console.log('🎉 You can now start the application and see the categories loaded from the database.');

  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateData();
