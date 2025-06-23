#!/usr/bin/env node

/**
 * Frontend Integration Test
 * 
 * This script tests that the frontend can successfully load data from the database
 * using the same methods as the React application.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

// Use the same client configuration as the frontend
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

async function testFrontendIntegration() {
  try {
    console.log('🧪 Testing frontend database integration...\n');

    // Test 1: Load categories (same as frontend)
    console.log('📁 Testing category loading...');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        icon,
        description,
        prompt_count,
        bg_gradient,
        trending,
        featured
      `)
      .order('name');

    if (categoriesError) {
      console.error('❌ Category loading failed:', categoriesError);
      return false;
    }

    console.log(`✅ Loaded ${categories.length} categories`);
    console.log('   Sample categories:', categories.slice(0, 3).map(c => c.name).join(', '));

    // Test 2: Load subcategories for a category
    if (categories.length > 0) {
      const testCategoryId = categories[0].id;
      console.log(`\n📂 Testing subcategory loading for category: ${categories[0].name}`);
      
      const { data: subcategories, error: subcategoriesError } = await supabase
        .from('subcategories')
        .select(`
          id,
          name,
          description,
          examples,
          skill_level
        `)
        .eq('category_id', testCategoryId)
        .order('skill_level, name');

      if (subcategoriesError) {
        console.error('❌ Subcategory loading failed:', subcategoriesError);
        return false;
      }

      console.log(`✅ Loaded ${subcategories.length} subcategories`);
      if (subcategories.length > 0) {
        console.log('   Sample subcategory:', subcategories[0].name);
      }

      // Test 3: Load prompts for a subcategory
      if (subcategories.length > 0) {
        const testSubcategoryId = subcategories[0].id;
        console.log(`\n✍️  Testing prompt loading for subcategory: ${subcategories[0].name}`);
        
        const { data: prompts, error: promptsError } = await supabase
          .from('prompts')
          .select(`
            id,
            title,
            description,
            content,
            tags,
            industry,
            use_case,
            skill_level,
            access_type
          `)
          .eq('subcategory_id', testSubcategoryId)
          .order('title');

        if (promptsError) {
          console.error('❌ Prompt loading failed:', promptsError);
          return false;
        }

        console.log(`✅ Loaded ${prompts.length} prompts`);
        if (prompts.length > 0) {
          console.log('   Sample prompt:', prompts[0].title);
          console.log('   Access type:', prompts[0].access_type);
        }
      }
    }

    // Test 4: Search functionality
    console.log('\n🔍 Testing search functionality...');
    const { data: searchResults, error: searchError } = await supabase
      .from('prompts')
      .select(`
        id,
        title,
        description,
        category_id,
        subcategory_id
      `)
      .or('title.ilike.%business%,description.ilike.%business%')
      .limit(5);

    if (searchError) {
      console.error('❌ Search failed:', searchError);
      return false;
    }

    console.log(`✅ Search returned ${searchResults.length} results`);
    if (searchResults.length > 0) {
      console.log('   Sample search result:', searchResults[0].title);
    }

    // Test 5: Authentication state
    console.log('\n🔐 Testing authentication state...');
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.error('❌ Auth check failed:', authError);
      return false;
    }

    console.log(`✅ Auth state: ${session ? 'Authenticated' : 'Anonymous'}`);

    return true;

  } catch (error) {
    console.error('❌ Frontend integration test failed:', error);
    return false;
  }
}

// Run the test
testFrontendIntegration()
  .then((success) => {
    if (success) {
      console.log('\n🎉 Frontend integration test passed!');
      console.log('✨ The React app should be able to load data from the database');
      console.log('🌐 Check the browser at: http://localhost:3000/EthosPrompt/');
    } else {
      console.log('\n❌ Frontend integration test failed');
      console.log('🔧 Check the database configuration and RLS policies');
    }
  })
  .catch((error) => {
    console.error('💥 Test script failed:', error);
  });
