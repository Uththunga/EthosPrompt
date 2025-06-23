#!/usr/bin/env node

/**
 * 9-Category Framework Rollback Script
 * 
 * This script provides rollback capabilities for the 9-category framework migration.
 * It can restore the database to its previous state using backup files.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to find the most recent backup file
function findLatestBackup() {
  try {
    const files = fs.readdirSync('.');
    const backupFiles = files.filter(file => file.startsWith('backup-') && file.endsWith('.json'));
    
    if (backupFiles.length === 0) {
      console.error('❌ No backup files found');
      return null;
    }
    
    // Sort by timestamp (newest first)
    backupFiles.sort((a, b) => {
      const timestampA = parseInt(a.match(/backup-(\d+)\.json/)[1]);
      const timestampB = parseInt(b.match(/backup-(\d+)\.json/)[1]);
      return timestampB - timestampA;
    });
    
    return backupFiles[0];
  } catch (error) {
    console.error('❌ Error finding backup files:', error);
    return null;
  }
}

// Function to load backup data
function loadBackupData(backupFile) {
  try {
    const backupPath = path.resolve(backupFile);
    const backupContent = fs.readFileSync(backupPath, 'utf8');
    return JSON.parse(backupContent);
  } catch (error) {
    console.error('❌ Error loading backup file:', error);
    return null;
  }
}

// Function to restore database schema to original state
async function restoreOriginalSchema() {
  console.log('🔧 Restoring original database schema...');
  
  try {
    // Restore original skill_level enum
    console.log('📝 Restoring original skill_level enum...');
    const { error: enumError } = await supabase.rpc('exec_sql', {
      sql: `
        -- Drop current enum and recreate with original values
        DO $$ BEGIN
          IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'skill_level') THEN
            DROP TYPE skill_level CASCADE;
          END IF;
        END $$;
        
        CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced');
      `
    });

    if (enumError) {
      console.error('❌ Error restoring skill_level enum:', enumError);
      return false;
    }

    // Remove industry columns from categories table
    console.log('🏭 Removing industry columns from categories...');
    const { error: categoriesError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.categories 
        DROP COLUMN IF EXISTS industry_tags,
        DROP COLUMN IF EXISTS cross_industry;
      `
    });

    if (categoriesError) {
      console.error('❌ Error updating categories table:', categoriesError);
      return false;
    }

    // Update subcategories table with original skill_level enum
    console.log('📂 Updating subcategories table...');
    const { error: subcategoriesError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.subcategories 
        ALTER COLUMN skill_level TYPE skill_level USING skill_level::skill_level;
      `
    });

    if (subcategoriesError) {
      console.error('❌ Error updating subcategories table:', subcategoriesError);
      return false;
    }

    // Remove industry columns from prompts table
    console.log('✍️ Removing industry columns from prompts...');
    const { error: promptsError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.prompts 
        DROP COLUMN IF EXISTS industry_tags,
        ALTER COLUMN skill_level TYPE skill_level USING skill_level::skill_level;
      `
    });

    if (promptsError) {
      console.error('❌ Error updating prompts table:', promptsError);
      return false;
    }

    console.log('✅ Original database schema restored successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Schema restoration failed:', error);
    return false;
  }
}

// Function to restore data from backup
async function restoreBackupData(backupData) {
  console.log('📦 Restoring data from backup...');
  
  try {
    // Clear current data
    console.log('🧹 Clearing current data...');
    await supabase.from('prompts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('prompt_groups').delete().neq('id', 'dummy');
    await supabase.from('subcategories').delete().neq('id', 'dummy');
    await supabase.from('categories').delete().neq('id', 'dummy');

    // Restore categories
    if (backupData.categories && backupData.categories.length > 0) {
      console.log(`📁 Restoring ${backupData.categories.length} categories...`);
      
      for (const category of backupData.categories) {
        const { error: categoryError } = await supabase
          .from('categories')
          .insert(category);

        if (categoryError) {
          console.error(`❌ Error restoring category ${category.id}:`, categoryError);
        }
      }
    }

    // Restore subcategories
    if (backupData.subcategories && backupData.subcategories.length > 0) {
      console.log(`📂 Restoring ${backupData.subcategories.length} subcategories...`);
      
      for (const subcategory of backupData.subcategories) {
        const { error: subcategoryError } = await supabase
          .from('subcategories')
          .insert(subcategory);

        if (subcategoryError) {
          console.error(`❌ Error restoring subcategory ${subcategory.id}:`, subcategoryError);
        }
      }
    }

    // Restore prompts
    if (backupData.prompts && backupData.prompts.length > 0) {
      console.log(`✍️ Restoring ${backupData.prompts.length} prompts...`);
      
      for (const prompt of backupData.prompts) {
        const { error: promptError } = await supabase
          .from('prompts')
          .insert(prompt);

        if (promptError) {
          console.error(`❌ Error restoring prompt ${prompt.id}:`, promptError);
        }
      }
    }

    console.log('✅ Backup data restored successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Data restoration failed:', error);
    return false;
  }
}

// Main rollback function
async function runRollback(backupFile = null) {
  try {
    console.log('🔄 Starting 9-Category Framework Rollback...');
    console.log('==========================================');
    
    // Find backup file if not specified
    if (!backupFile) {
      backupFile = findLatestBackup();
      if (!backupFile) {
        console.error('❌ Rollback aborted: No backup file found');
        process.exit(1);
      }
    }
    
    console.log(`📦 Using backup file: ${backupFile}`);
    
    // Load backup data
    const backupData = loadBackupData(backupFile);
    if (!backupData) {
      console.error('❌ Rollback aborted: Could not load backup data');
      process.exit(1);
    }
    
    console.log(`📅 Backup created: ${backupData.timestamp}`);
    console.log(`📊 Backup contains:`);
    console.log(`   - Categories: ${backupData.categories?.length || 0}`);
    console.log(`   - Subcategories: ${backupData.subcategories?.length || 0}`);
    console.log(`   - Prompts: ${backupData.prompts?.length || 0}`);
    
    // Confirm rollback
    console.log('\n⚠️  WARNING: This will restore your database to the backup state.');
    console.log('⚠️  All current data will be lost!');
    
    // In a real scenario, you might want to add user confirmation here
    // For automation purposes, we'll proceed automatically
    
    // Step 1: Restore original schema
    const schemaRestored = await restoreOriginalSchema();
    if (!schemaRestored) {
      console.error('❌ Rollback aborted: Schema restoration failed');
      process.exit(1);
    }
    
    // Step 2: Restore backup data
    const dataRestored = await restoreBackupData(backupData);
    if (!dataRestored) {
      console.error('❌ Rollback aborted: Data restoration failed');
      process.exit(1);
    }
    
    console.log('==========================================');
    console.log('✅ 9-Category Framework Rollback Complete!');
    console.log('🔄 Your database has been restored to the backup state');
    console.log('📋 Next steps:');
    console.log('   1. Verify data integrity in your application');
    console.log('   2. Update frontend code if necessary');
    console.log('   3. Test application functionality');
    
  } catch (error) {
    console.error('💥 Rollback failed:', error);
    process.exit(1);
  }
}

// Function to list available backups
function listBackups() {
  try {
    const files = fs.readdirSync('.');
    const backupFiles = files.filter(file => file.startsWith('backup-') && file.endsWith('.json'));
    
    if (backupFiles.length === 0) {
      console.log('📦 No backup files found');
      return;
    }
    
    console.log('📦 Available backup files:');
    console.log('==========================');
    
    backupFiles.forEach((file, index) => {
      try {
        const backupData = loadBackupData(file);
        const timestamp = new Date(backupData.timestamp).toLocaleString();
        console.log(`${index + 1}. ${file}`);
        console.log(`   Created: ${timestamp}`);
        console.log(`   Categories: ${backupData.categories?.length || 0}`);
        console.log(`   Subcategories: ${backupData.subcategories?.length || 0}`);
        console.log(`   Prompts: ${backupData.prompts?.length || 0}`);
        console.log('');
      } catch (error) {
        console.log(`${index + 1}. ${file} (corrupted backup)`);
      }
    });
  } catch (error) {
    console.error('❌ Error listing backups:', error);
  }
}

// Command line interface
const command = process.argv[2];
const backupFile = process.argv[3];

switch (command) {
  case 'list':
    listBackups();
    break;
  case 'rollback':
    runRollback(backupFile);
    break;
  default:
    console.log('9-Category Framework Rollback Script');
    console.log('====================================');
    console.log('');
    console.log('Usage:');
    console.log('  node rollback-9-category-migration.mjs list                    - List available backups');
    console.log('  node rollback-9-category-migration.mjs rollback [backup-file]  - Rollback to backup');
    console.log('');
    console.log('Examples:');
    console.log('  node rollback-9-category-migration.mjs list');
    console.log('  node rollback-9-category-migration.mjs rollback');
    console.log('  node rollback-9-category-migration.mjs rollback backup-1703123456789.json');
    break;
}

export { runRollback, listBackups, restoreOriginalSchema, restoreBackupData };
