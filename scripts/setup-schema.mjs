#!/usr/bin/env node

/**
 * Database Schema Setup Script
 * 
 * This script sets up the database schema for the EthosPrompt application.
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

async function setupSchema() {
  try {
    console.log('🚀 Setting up database schema...');

    // Create categories table
    console.log('📁 Creating categories table...');
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
      console.error('❌ Error creating categories table:', categoriesError);
    } else {
      console.log('✅ Categories table created successfully');
    }

    // Create subcategories table
    console.log('📂 Creating subcategories table...');
    const { error: subcategoriesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.subcategories (
          id TEXT PRIMARY KEY,
          category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
          name TEXT NOT NULL,
          description TEXT NOT NULL,
          examples TEXT[] DEFAULT '{}',
          skill_level TEXT NOT NULL DEFAULT 'beginner',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (subcategoriesError) {
      console.error('❌ Error creating subcategories table:', subcategoriesError);
    } else {
      console.log('✅ Subcategories table created successfully');
    }

    // Create prompt_groups table
    console.log('📄 Creating prompt_groups table...');
    const { error: promptGroupsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.prompt_groups (
          id TEXT PRIMARY KEY,
          subcategory_id TEXT NOT NULL REFERENCES public.subcategories(id) ON DELETE CASCADE,
          name TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (promptGroupsError) {
      console.error('❌ Error creating prompt_groups table:', promptGroupsError);
    } else {
      console.log('✅ Prompt groups table created successfully');
    }

    // Create prompts table
    console.log('✍️  Creating prompts table...');
    const { error: promptsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.prompts (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          content TEXT NOT NULL,
          category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
          subcategory_id TEXT REFERENCES public.subcategories(id) ON DELETE CASCADE,
          prompt_group_id TEXT REFERENCES public.prompt_groups(id) ON DELETE CASCADE,
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

    if (promptsError) {
      console.error('❌ Error creating prompts table:', promptsError);
    } else {
      console.log('✅ Prompts table created successfully');
    }

    console.log('✅ Database schema setup completed successfully!');
    console.log('🎉 You can now run the migration script to populate the database.');

  } catch (error) {
    console.error('💥 Schema setup failed:', error);
    process.exit(1);
  }
}

// Run schema setup
setupSchema();
