#!/usr/bin/env node

/**
 * Database Status Checker
 * 
 * This script checks the current status of the Supabase database
 * and provides setup instructions if needed.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabaseStatus() {
  try {
    console.log('🔍 Checking database status...\n');

    // Test basic connection by trying to access auth
    console.log('🔗 Testing database connection...');

    try {
      const { data: authData, error: authError } = await supabase.auth.getSession();
      console.log('✅ Database connection successful\n');
    } catch (connectionError) {
      console.error('❌ Database connection failed:', connectionError.message);
      process.exit(1);
    }

    // Check if our main tables exist by trying to query them
    const tablesToCheck = ['categories', 'subcategories', 'prompt_groups', 'prompts', 'users'];
    const tableStatus = {};

    for (const tableName of tablesToCheck) {
      try {
        const { count, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });

        if (error) {
          tableStatus[tableName] = { exists: false, error: error.message };
        } else {
          tableStatus[tableName] = { exists: true, count: count || 0 };
        }
      } catch (err) {
        tableStatus[tableName] = { exists: false, error: err.message };
      }
    }

    // Display results
    console.log('📊 Database Table Status:');
    console.log('========================');
    
    let allTablesExist = true;
    let totalRecords = 0;

    for (const [tableName, status] of Object.entries(tableStatus)) {
      if (status.exists) {
        console.log(`✅ ${tableName}: ${status.count} records`);
        totalRecords += status.count;
      } else {
        console.log(`❌ ${tableName}: Not found`);
        allTablesExist = false;
      }
    }

    console.log('\n📈 Summary:');
    console.log(`Tables found: ${Object.values(tableStatus).filter(s => s.exists).length}/${tablesToCheck.length}`);
    console.log(`Total records: ${totalRecords}`);

    if (!allTablesExist) {
      console.log('\n🎯 SETUP REQUIRED:');
      console.log('The database schema needs to be deployed manually through Supabase.\n');
      
      console.log('📋 Follow these steps:');
      console.log('1. Go to your Supabase dashboard:');
      console.log('   https://ccwbryhnsbtiutusgyxn.supabase.co/project/ccwbryhnsbtiutusgyxn/sql');
      console.log('2. Navigate to SQL Editor');
      console.log('3. Copy the contents of database/schema.sql');
      console.log('4. Paste and run the SQL in the editor');
      console.log('5. Then run: npm run migrate-data\n');
      
      // Check if schema file exists
      const schemaPath = path.join(__dirname, '../database/schema.sql');
      if (fs.existsSync(schemaPath)) {
        console.log('📄 Schema file found at: database/schema.sql');
        console.log('✅ Ready to copy to Supabase SQL Editor');
      } else {
        console.log('❌ Schema file not found at: database/schema.sql');
      }
      
    } else if (totalRecords === 0) {
      console.log('\n🎯 TABLES EXIST BUT EMPTY:');
      console.log('Database schema is deployed but no data has been populated.');
      console.log('Run: npm run migrate-data');
      
    } else {
      console.log('\n✅ DATABASE READY:');
      console.log('Database is set up and populated!');
      console.log('You can start the development server: npm run dev');
    }

    // Test authentication
    console.log('\n🔐 Testing authentication system...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.log('⚠️  Auth system error:', authError.message);
    } else {
      console.log('✅ Auth system accessible');
      console.log(`Current session: ${authData.session ? 'Active' : 'None'}`);
    }

  } catch (error) {
    console.error('❌ Error checking database status:', error);
    process.exit(1);
  }
}

// Run the check
checkDatabaseStatus();
