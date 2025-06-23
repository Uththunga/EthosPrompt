#!/usr/bin/env node

/**
 * Database Population Script
 * 
 * This script populates the database with the 9-category framework data
 * and sample prompts for testing.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || (!supabaseServiceKey && !supabaseAnonKey)) {
  console.error('❌ Missing Supabase credentials in environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

// Use service key for data insertion to bypass RLS
const apiKey = supabaseServiceKey || supabaseAnonKey;
const supabase = createClient(supabaseUrl, apiKey);

if (!supabaseServiceKey) {
  console.log('⚠️  Using anon key - some operations may fail due to RLS policies');
  console.log('For full functionality, add SUPABASE_SERVICE_ROLE_KEY to your .env file');
}

// Core 9-Category Framework Data
const categories = [
  {
    id: 'strategy-planning',
    name: 'Strategy & Planning',
    icon: 'Target',
    description: 'Business strategy, market research, and strategic planning workflows',
    prompt_count: 0,
    bg_gradient: 'from-blue-600/20 to-indigo-600/20',
    trending: false,
    featured: true
  },
  {
    id: 'content-communication',
    name: 'Content & Communication',
    icon: 'FileText',
    description: 'Content creation, copywriting, and communication strategies',
    prompt_count: 0,
    bg_gradient: 'from-purple-600/20 to-pink-600/20',
    trending: true,
    featured: true
  },
  {
    id: 'data-analysis',
    name: 'Data & Analysis',
    icon: 'BarChart2',
    description: 'Data analysis, reporting, and business intelligence workflows',
    prompt_count: 0,
    bg_gradient: 'from-cyan-600/20 to-blue-600/20',
    trending: false,
    featured: true
  },
  {
    id: 'customer-sales',
    name: 'Customer & Sales',
    icon: 'Users',
    description: 'Customer relationship management, sales processes, and customer success',
    prompt_count: 0,
    bg_gradient: 'from-green-600/20 to-emerald-600/20',
    trending: true,
    featured: true
  },
  {
    id: 'operations-process',
    name: 'Operations & Process',
    icon: 'Settings',
    description: 'Operational efficiency, process improvement, and workflow optimization',
    prompt_count: 0,
    bg_gradient: 'from-orange-600/20 to-yellow-600/20',
    trending: false,
    featured: false
  },
  {
    id: 'learning-development',
    name: 'Learning & Development',
    icon: 'BookOpen',
    description: 'Training programs, skill development, and knowledge management',
    prompt_count: 0,
    bg_gradient: 'from-indigo-600/20 to-purple-600/20',
    trending: false,
    featured: false
  },
  {
    id: 'legal-compliance',
    name: 'Legal & Compliance',
    icon: 'Scale',
    description: 'Legal documentation, regulatory compliance, and risk management',
    prompt_count: 0,
    bg_gradient: 'from-gray-600/20 to-slate-600/20',
    trending: false,
    featured: false
  },
  {
    id: 'healthcare-clinical',
    name: 'Healthcare & Clinical',
    icon: 'Heart',
    description: 'Clinical documentation, patient care, and healthcare administration',
    prompt_count: 0,
    bg_gradient: 'from-red-600/20 to-pink-600/20',
    trending: false,
    featured: false
  },
  {
    id: 'technology-development',
    name: 'Technology & Development',
    icon: 'Code',
    description: 'Software development, technical documentation, and IT workflows',
    prompt_count: 0,
    bg_gradient: 'from-emerald-600/20 to-teal-600/20',
    trending: true,
    featured: false
  }
];

// Sample subcategories for the first few categories
const subcategories = [
  // Strategy & Planning subcategories
  {
    id: 'business-planning-basics',
    category_id: 'strategy-planning',
    name: 'Business Planning Basics',
    description: 'Simple business plans, goal setting, basic market analysis',
    examples: ['Business model canvas', 'SWOT analysis', 'Basic market research'],
    skill_level: 'beginner'
  },
  {
    id: 'competitive-analysis',
    category_id: 'strategy-planning',
    name: 'Competitive Analysis',
    description: 'In-depth competitor research, positioning analysis, market intelligence',
    examples: ['Competitive matrices', 'Positioning maps', 'Market intelligence reports'],
    skill_level: 'intermediate'
  },
  {
    id: 'corporate-strategy-ma',
    category_id: 'strategy-planning',
    name: 'Corporate Strategy & M&A',
    description: 'Corporate development, mergers & acquisitions, portfolio strategy',
    examples: ['M&A analysis', 'Portfolio optimization', 'Corporate restructuring'],
    skill_level: 'advanced'
  },
  // Content & Communication subcategories
  {
    id: 'basic-copywriting',
    category_id: 'content-communication',
    name: 'Basic Copywriting',
    description: 'Simple copy for websites, emails, basic marketing materials',
    examples: ['Website copy', 'Email templates', 'Basic ads'],
    skill_level: 'beginner'
  },
  {
    id: 'content-marketing-strategy',
    category_id: 'content-communication',
    name: 'Content Marketing Strategy',
    description: 'Content calendars, blog strategies, content planning',
    examples: ['Content calendars', 'Blog strategies', 'Content audits'],
    skill_level: 'intermediate'
  },
  {
    id: 'technical-writing-documentation',
    category_id: 'content-communication',
    name: 'Technical Writing & Documentation',
    description: 'API docs, user manuals, technical specifications',
    examples: ['API documentation', 'User guides', 'Technical specifications'],
    skill_level: 'advanced'
  }
];

// Sample prompts
const prompts = [
  {
    title: 'Create a Business Model Canvas',
    description: 'Generate a comprehensive business model canvas for a new startup idea',
    content: 'Help me create a business model canvas for [BUSINESS IDEA]. Include all 9 key components: Key Partners, Key Activities, Key Resources, Value Propositions, Customer Relationships, Channels, Customer Segments, Cost Structure, and Revenue Streams. Provide specific examples and suggestions for each section.',
    category_id: 'strategy-planning',
    subcategory_id: 'business-planning-basics',
    tags: ['business model', 'startup', 'planning', 'canvas'],
    industry: 'General',
    use_case: 'Business Planning',
    skill_level: 'beginner',
    access_type: 'free'
  },
  {
    title: 'Competitive Analysis Framework',
    description: 'Develop a comprehensive competitive analysis for your industry',
    content: 'Create a detailed competitive analysis for [COMPANY/INDUSTRY]. Include: 1) Identify top 5-7 competitors, 2) Analyze their strengths and weaknesses, 3) Compare pricing strategies, 4) Evaluate their market positioning, 5) Assess their digital presence, 6) Identify market gaps and opportunities. Present findings in a structured format with actionable insights.',
    category_id: 'strategy-planning',
    subcategory_id: 'competitive-analysis',
    tags: ['competitive analysis', 'market research', 'strategy'],
    industry: 'General',
    use_case: 'Market Analysis',
    skill_level: 'intermediate',
    access_type: 'free'
  },
  {
    title: 'Website Copy for Landing Page',
    description: 'Write compelling copy for a product landing page',
    content: 'Write persuasive landing page copy for [PRODUCT/SERVICE]. Include: 1) Attention-grabbing headline, 2) Clear value proposition, 3) Benefits-focused bullet points, 4) Social proof section, 5) Strong call-to-action, 6) FAQ section. Target audience: [TARGET AUDIENCE]. Tone: [TONE - professional/casual/friendly]. Focus on conversion optimization.',
    category_id: 'content-communication',
    subcategory_id: 'basic-copywriting',
    tags: ['copywriting', 'landing page', 'conversion', 'marketing'],
    industry: 'Marketing',
    use_case: 'Website Copy',
    skill_level: 'beginner',
    access_type: 'free'
  },
  {
    title: 'Content Marketing Strategy Plan',
    description: 'Develop a comprehensive content marketing strategy',
    content: 'Create a 6-month content marketing strategy for [BUSINESS/BRAND]. Include: 1) Content audit of existing materials, 2) Target audience personas, 3) Content pillars and themes, 4) Content calendar with posting frequency, 5) Distribution channels strategy, 6) KPIs and measurement plan, 7) Resource requirements and budget considerations. Focus on [PRIMARY GOAL - brand awareness/lead generation/customer retention].',
    category_id: 'content-communication',
    subcategory_id: 'content-marketing-strategy',
    tags: ['content strategy', 'marketing plan', 'content calendar'],
    industry: 'Marketing',
    use_case: 'Strategic Planning',
    skill_level: 'intermediate',
    access_type: 'paid'
  }
];

async function populateDatabase() {
  try {
    console.log('🚀 Starting database population...\n');

    // Step 1: Insert categories
    console.log('📁 Inserting categories...');
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .insert(categories)
      .select();

    if (categoryError) {
      console.error('❌ Error inserting categories:', categoryError);
      return false;
    }

    console.log(`✅ Successfully inserted ${categoryData.length} categories`);

    // Step 2: Insert subcategories
    console.log('📂 Inserting subcategories...');
    const { data: subcategoryData, error: subcategoryError } = await supabase
      .from('subcategories')
      .insert(subcategories)
      .select();

    if (subcategoryError) {
      console.error('❌ Error inserting subcategories:', subcategoryError);
      return false;
    }

    console.log(`✅ Successfully inserted ${subcategoryData.length} subcategories`);

    // Step 3: Insert sample prompts
    console.log('✍️  Inserting sample prompts...');
    const { data: promptData, error: promptError } = await supabase
      .from('prompts')
      .insert(prompts)
      .select();

    if (promptError) {
      console.error('❌ Error inserting prompts:', promptError);
      return false;
    }

    console.log(`✅ Successfully inserted ${promptData.length} prompts`);

    // Step 4: Update category prompt counts
    console.log('🔄 Updating category prompt counts...');
    for (const category of categories) {
      const { data: countData } = await supabase
        .from('prompts')
        .select('id', { count: 'exact', head: true })
        .eq('category_id', category.id);

      const promptCount = countData || 0;

      await supabase
        .from('categories')
        .update({ prompt_count: promptCount })
        .eq('id', category.id);
    }

    console.log('✅ Updated category prompt counts');

    return true;

  } catch (error) {
    console.error('❌ Database population failed:', error);
    return false;
  }
}

// Run the population
populateDatabase()
  .then((success) => {
    if (success) {
      console.log('\n🎉 Database population completed successfully!');
      console.log('📊 Database now contains:');
      console.log(`   - ${categories.length} categories`);
      console.log(`   - ${subcategories.length} subcategories`);
      console.log(`   - ${prompts.length} sample prompts`);
      console.log('\n✨ You can now start the development server: npm run dev');
    } else {
      console.log('\n❌ Database population failed');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('💥 Population script failed:', error);
    process.exit(1);
  });
