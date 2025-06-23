#!/usr/bin/env node

/**
 * Verify 9-Category Framework Implementation
 * 
 * This script comprehensively verifies that the 9-category framework
 * has been properly implemented with all expected data and relationships.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase service key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyImplementation() {
  try {
    console.log('🔍 Verifying 9-Category Framework Implementation...');
    console.log('==================================================\n');

    let allTestsPassed = true;

    // Test 1: Verify 9 categories exist
    console.log('📁 Test 1: Verifying categories...');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (categoriesError) {
      console.error('❌ Categories test failed:', categoriesError);
      allTestsPassed = false;
    } else {
      console.log(`✅ Found ${categories.length} categories`);
      
      const expectedCategories = [
        'Strategy & Planning',
        'Content & Communication',
        'Data & Analysis',
        'Customer & Sales',
        'Operations & Process',
        'Learning & Development',
        'Legal & Compliance',
        'Healthcare & Clinical',
        'Technology & Development'
      ];

      const actualCategories = categories.map(c => c.name).sort();
      const expectedSorted = expectedCategories.sort();
      
      if (JSON.stringify(actualCategories) === JSON.stringify(expectedSorted)) {
        console.log('✅ All expected categories present');
      } else {
        console.error('❌ Category mismatch');
        console.log('Expected:', expectedSorted);
        console.log('Actual:', actualCategories);
        allTestsPassed = false;
      }

      // Check featured and trending flags
      const featuredCount = categories.filter(c => c.featured).length;
      const trendingCount = categories.filter(c => c.trending).length;
      console.log(`   Featured categories: ${featuredCount}`);
      console.log(`   Trending categories: ${trendingCount}`);
    }

    // Test 2: Verify 108 subcategories (12 per category)
    console.log('\n📂 Test 2: Verifying subcategories...');
    const { data: subcategories, error: subcategoriesError } = await supabase
      .from('subcategories')
      .select('*')
      .order('category_id, skill_level, name');

    if (subcategoriesError) {
      console.error('❌ Subcategories test failed:', subcategoriesError);
      allTestsPassed = false;
    } else {
      console.log(`✅ Found ${subcategories.length} subcategories`);
      
      if (subcategories.length === 108) {
        console.log('✅ Correct total number of subcategories (108)');
      } else {
        console.error(`❌ Expected 108 subcategories, found ${subcategories.length}`);
        allTestsPassed = false;
      }

      // Verify 12 subcategories per category
      const subcategoriesByCategory = {};
      subcategories.forEach(sub => {
        subcategoriesByCategory[sub.category_id] = (subcategoriesByCategory[sub.category_id] || 0) + 1;
      });

      console.log('   Subcategories per category:');
      let allCategoriesHave12 = true;
      for (const [categoryId, count] of Object.entries(subcategoriesByCategory)) {
        console.log(`     ${categoryId}: ${count}`);
        if (count !== 12) {
          allCategoriesHave12 = false;
        }
      }

      if (allCategoriesHave12) {
        console.log('✅ All categories have exactly 12 subcategories');
      } else {
        console.error('❌ Some categories do not have 12 subcategories');
        allTestsPassed = false;
      }

      // Verify skill level distribution (4 per level per category)
      const skillLevelCounts = {};
      subcategories.forEach(sub => {
        const key = `${sub.category_id}-${sub.skill_level}`;
        skillLevelCounts[key] = (skillLevelCounts[key] || 0) + 1;
      });

      console.log('   Skill level distribution verification:');
      let skillDistributionCorrect = true;
      for (const category of categories) {
        const beginnerCount = skillLevelCounts[`${category.id}-beginner`] || 0;
        const intermediateCount = skillLevelCounts[`${category.id}-intermediate`] || 0;
        const advancedCount = skillLevelCounts[`${category.id}-advanced`] || 0;
        
        console.log(`     ${category.name}: B:${beginnerCount} I:${intermediateCount} A:${advancedCount}`);
        
        if (beginnerCount !== 4 || intermediateCount !== 4 || advancedCount !== 4) {
          skillDistributionCorrect = false;
        }
      }

      if (skillDistributionCorrect) {
        console.log('✅ Skill level distribution correct (4 per level per category)');
      } else {
        console.error('❌ Skill level distribution incorrect');
        allTestsPassed = false;
      }
    }

    // Test 3: Verify prompts migration
    console.log('\n✍️  Test 3: Verifying prompts...');
    const { data: prompts, error: promptsError } = await supabase
      .from('prompts')
      .select('*')
      .order('category_id, title');

    if (promptsError) {
      console.error('❌ Prompts test failed:', promptsError);
      allTestsPassed = false;
    } else {
      console.log(`✅ Found ${prompts.length} prompts`);

      // Verify prompts are properly categorized
      const promptsByCategory = {};
      prompts.forEach(prompt => {
        promptsByCategory[prompt.category_id] = (promptsByCategory[prompt.category_id] || 0) + 1;
      });

      console.log('   Prompts per category:');
      for (const category of categories) {
        const count = promptsByCategory[category.id] || 0;
        console.log(`     ${category.name}: ${count} prompts`);
      }

      // Verify skill levels
      const promptsBySkillLevel = {};
      prompts.forEach(prompt => {
        promptsBySkillLevel[prompt.skill_level] = (promptsBySkillLevel[prompt.skill_level] || 0) + 1;
      });

      console.log('   Prompts by skill level:', promptsBySkillLevel);

      // Verify access types
      const promptsByAccessType = {};
      prompts.forEach(prompt => {
        promptsByAccessType[prompt.access_type] = (promptsByAccessType[prompt.access_type] || 0) + 1;
      });

      console.log('   Prompts by access type:', promptsByAccessType);
    }

    // Test 4: Verify data integrity
    console.log('\n🔗 Test 4: Verifying data integrity...');
    
    // Check for orphaned subcategories
    const categoryIds = categories.map(c => c.id);
    let orphanedSubcategoriesCount = 0;

    for (const subcategory of subcategories) {
      if (!categoryIds.includes(subcategory.category_id)) {
        orphanedSubcategoriesCount++;
        console.error(`   Orphaned subcategory: ${subcategory.name} (category: ${subcategory.category_id})`);
      }
    }

    if (orphanedSubcategoriesCount > 0) {
      console.error(`❌ Found ${orphanedSubcategoriesCount} orphaned subcategories`);
      allTestsPassed = false;
    } else {
      console.log('✅ No orphaned subcategories');
    }

    // Check for orphaned prompts
    const subcategoryIds = subcategories.map(s => s.id);
    let orphanedPromptsCount = 0;

    for (const prompt of prompts) {
      const categoryExists = categoryIds.includes(prompt.category_id);
      const subcategoryExists = !prompt.subcategory_id || subcategoryIds.includes(prompt.subcategory_id);

      if (!categoryExists || !subcategoryExists) {
        orphanedPromptsCount++;
        console.error(`   Orphaned prompt: ${prompt.title} (category: ${prompt.category_id}, subcategory: ${prompt.subcategory_id})`);
      }
    }

    if (orphanedPromptsCount > 0) {
      console.error(`❌ Found ${orphanedPromptsCount} orphaned prompts`);
      allTestsPassed = false;
    } else {
      console.log('✅ No orphaned prompts');
    }

    // Test 5: Frontend compatibility test
    console.log('\n🌐 Test 5: Frontend compatibility...');
    
    // Test the same queries the frontend would use
    const { data: frontendCategories, error: frontendError } = await supabase
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

    if (frontendError) {
      console.error('❌ Frontend compatibility test failed:', frontendError);
      allTestsPassed = false;
    } else {
      console.log('✅ Frontend category queries work correctly');
      
      // Test subcategory loading for first category
      const testCategory = frontendCategories[0];
      const { data: frontendSubcategories, error: subError } = await supabase
        .from('subcategories')
        .select(`
          id,
          name,
          description,
          examples,
          skill_level
        `)
        .eq('category_id', testCategory.id)
        .order('skill_level, name');

      if (subError) {
        console.error('❌ Frontend subcategory queries failed:', subError);
        allTestsPassed = false;
      } else {
        console.log(`✅ Frontend subcategory queries work (${frontendSubcategories.length} loaded)`);
      }
    }

    // Final summary
    console.log('\n📊 Implementation Verification Summary:');
    console.log('=====================================');
    
    if (allTestsPassed) {
      console.log('🎉 ALL TESTS PASSED!');
      console.log('✅ 9-Category Framework successfully implemented');
      console.log('✅ Data integrity maintained');
      console.log('✅ Frontend compatibility confirmed');
      console.log('✅ Ready for production use');
    } else {
      console.log('❌ SOME TESTS FAILED');
      console.log('🔧 Please review the errors above and fix any issues');
    }

    return allTestsPassed;

  } catch (error) {
    console.error('❌ Verification failed:', error);
    return false;
  }
}

// Run verification
verifyImplementation()
  .then((success) => {
    if (success) {
      console.log('\n🚀 9-Category Framework is ready for use!');
    } else {
      console.log('\n⚠️  Issues found - please review and fix');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('💥 Verification script failed:', error);
    process.exit(1);
  });
