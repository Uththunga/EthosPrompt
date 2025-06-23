#!/usr/bin/env node

/**
 * 9-Category Framework Migration Testing Script
 * 
 * This script tests the 9-category framework migration on a development database
 * to ensure everything works correctly before production deployment.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test functions
async function testDatabaseConnection() {
  console.log('🔌 Testing database connection...');
  
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error);
      return false;
    }
    
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    return false;
  }
}

async function testSchemaStructure() {
  console.log('🏗️ Testing database schema structure...');
  
  try {
    // Test categories table structure
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(1);
    
    if (categoriesError) {
      console.error('❌ Categories table test failed:', categoriesError);
      return false;
    }
    
    // Test subcategories table structure
    const { data: subcategoriesData, error: subcategoriesError } = await supabase
      .from('subcategories')
      .select('*')
      .limit(1);
    
    if (subcategoriesError) {
      console.error('❌ Subcategories table test failed:', subcategoriesError);
      return false;
    }
    
    // Test prompts table structure
    const { data: promptsData, error: promptsError } = await supabase
      .from('prompts')
      .select('*')
      .limit(1);
    
    if (promptsError) {
      console.error('❌ Prompts table test failed:', promptsError);
      return false;
    }
    
    console.log('✅ Database schema structure is valid');
    return true;
  } catch (error) {
    console.error('❌ Schema structure test error:', error);
    return false;
  }
}

async function test9CategoryStructure() {
  console.log('🎯 Testing 9-category structure...');
  
  try {
    // Test that we have exactly 9 categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name');
    
    if (categoriesError) {
      console.error('❌ Error fetching categories:', categoriesError);
      return false;
    }
    
    if (categories.length !== 9) {
      console.error(`❌ Expected 9 categories, found ${categories.length}`);
      return false;
    }
    
    // Expected category IDs
    const expectedCategories = [
      'strategy-planning',
      'content-communication',
      'data-analysis',
      'customer-sales',
      'operations-process',
      'learning-development',
      'legal-compliance',
      'healthcare-clinical',
      'technology-development'
    ];
    
    const actualCategoryIds = categories.map(cat => cat.id).sort();
    const expectedCategoryIds = expectedCategories.sort();
    
    const missingCategories = expectedCategoryIds.filter(id => !actualCategoryIds.includes(id));
    const extraCategories = actualCategoryIds.filter(id => !expectedCategoryIds.includes(id));
    
    if (missingCategories.length > 0) {
      console.error(`❌ Missing categories: ${missingCategories.join(', ')}`);
      return false;
    }
    
    if (extraCategories.length > 0) {
      console.error(`❌ Extra categories: ${extraCategories.join(', ')}`);
      return false;
    }
    
    console.log('✅ 9-category structure is correct');
    console.log(`📊 Categories found: ${categories.map(cat => cat.name).join(', ')}`);
    return true;
  } catch (error) {
    console.error('❌ 9-category structure test error:', error);
    return false;
  }
}

async function testSkillLevelHierarchy() {
  console.log('📈 Testing skill level hierarchy...');
  
  try {
    // Test that each category has subcategories with all three skill levels
    const { data: subcategories, error: subcategoriesError } = await supabase
      .from('subcategories')
      .select('category_id, skill_level');
    
    if (subcategoriesError) {
      console.error('❌ Error fetching subcategories:', subcategoriesError);
      return false;
    }
    
    // Group subcategories by category
    const categoriesSkillLevels = {};
    subcategories.forEach(sub => {
      if (!categoriesSkillLevels[sub.category_id]) {
        categoriesSkillLevels[sub.category_id] = new Set();
      }
      categoriesSkillLevels[sub.category_id].add(sub.skill_level);
    });
    
    // Check that each category has all three skill levels
    const expectedSkillLevels = ['basic', 'intermediate', 'advanced'];
    let allCategoriesValid = true;
    
    for (const [categoryId, skillLevels] of Object.entries(categoriesSkillLevels)) {
      const missingLevels = expectedSkillLevels.filter(level => !skillLevels.has(level));
      if (missingLevels.length > 0) {
        console.error(`❌ Category ${categoryId} missing skill levels: ${missingLevels.join(', ')}`);
        allCategoriesValid = false;
      }
    }
    
    if (!allCategoriesValid) {
      return false;
    }
    
    console.log('✅ Skill level hierarchy is complete');
    console.log(`📊 Total subcategories: ${subcategories.length}`);
    return true;
  } catch (error) {
    console.error('❌ Skill level hierarchy test error:', error);
    return false;
  }
}

async function testIndustrySupport() {
  console.log('🏭 Testing industry support features...');
  
  try {
    // Test that categories table has industry columns
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id, industry_tags, cross_industry')
      .limit(1);
    
    if (categoryError) {
      console.error('❌ Industry support test failed:', categoryError);
      return false;
    }
    
    // Test that prompts table has industry columns
    const { data: promptData, error: promptError } = await supabase
      .from('prompts')
      .select('id, industry_tags')
      .limit(1);
    
    if (promptError) {
      console.error('❌ Prompts industry support test failed:', promptError);
      return false;
    }
    
    console.log('✅ Industry support features are available');
    return true;
  } catch (error) {
    console.error('❌ Industry support test error:', error);
    return false;
  }
}

async function testDataIntegrity() {
  console.log('🔍 Testing data integrity...');
  
  try {
    // Test foreign key relationships
    const { data: subcategories, error: subcategoriesError } = await supabase
      .from('subcategories')
      .select(`
        id,
        category_id,
        categories!inner(id, name)
      `);
    
    if (subcategoriesError) {
      console.error('❌ Subcategory-Category relationship test failed:', subcategoriesError);
      return false;
    }
    
    // Test that all subcategories have valid category references
    const orphanedSubcategories = subcategories.filter(sub => !sub.categories);
    if (orphanedSubcategories.length > 0) {
      console.error(`❌ Found ${orphanedSubcategories.length} orphaned subcategories`);
      return false;
    }
    
    console.log('✅ Data integrity checks passed');
    console.log(`📊 Verified ${subcategories.length} subcategory-category relationships`);
    return true;
  } catch (error) {
    console.error('❌ Data integrity test error:', error);
    return false;
  }
}

async function testPerformance() {
  console.log('⚡ Testing query performance...');
  
  try {
    const startTime = Date.now();
    
    // Test complex query performance
    const { data, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        description,
        subcategories(
          id,
          name,
          skill_level,
          prompts(count)
        )
      `);
    
    const endTime = Date.now();
    const queryTime = endTime - startTime;
    
    if (error) {
      console.error('❌ Performance test query failed:', error);
      return false;
    }
    
    if (queryTime > 5000) { // 5 seconds threshold
      console.warn(`⚠️ Query took ${queryTime}ms (>5000ms threshold)`);
      return false;
    }
    
    console.log(`✅ Query performance acceptable: ${queryTime}ms`);
    return true;
  } catch (error) {
    console.error('❌ Performance test error:', error);
    return false;
  }
}

// Main testing function
async function runTests() {
  try {
    console.log('🧪 9-Category Framework Migration Tests');
    console.log('=======================================');
    
    const tests = [
      { name: 'Database Connection', fn: testDatabaseConnection },
      { name: 'Schema Structure', fn: testSchemaStructure },
      { name: '9-Category Structure', fn: test9CategoryStructure },
      { name: 'Skill Level Hierarchy', fn: testSkillLevelHierarchy },
      { name: 'Industry Support', fn: testIndustrySupport },
      { name: 'Data Integrity', fn: testDataIntegrity },
      { name: 'Query Performance', fn: testPerformance }
    ];
    
    let passedTests = 0;
    let failedTests = 0;
    
    for (const test of tests) {
      console.log(`\n🧪 Running test: ${test.name}`);
      const result = await test.fn();
      
      if (result) {
        passedTests++;
      } else {
        failedTests++;
      }
    }
    
    console.log('\n=======================================');
    console.log('📊 Test Results Summary');
    console.log('=======================================');
    console.log(`✅ Passed: ${passedTests}`);
    console.log(`❌ Failed: ${failedTests}`);
    console.log(`📈 Success Rate: ${Math.round((passedTests / tests.length) * 100)}%`);
    
    if (failedTests === 0) {
      console.log('\n🎉 All tests passed! Migration is ready for production.');
      process.exit(0);
    } else {
      console.log('\n⚠️ Some tests failed. Please review and fix issues before production deployment.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('💥 Test suite failed:', error);
    process.exit(1);
  }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests();
}

export { 
  runTests, 
  testDatabaseConnection, 
  testSchemaStructure, 
  test9CategoryStructure, 
  testSkillLevelHierarchy, 
  testIndustrySupport, 
  testDataIntegrity, 
  testPerformance 
};
