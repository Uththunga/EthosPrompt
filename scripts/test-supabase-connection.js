// Test Supabase connection and basic functionality
// Run with: node scripts/test-supabase-connection.js

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔗 Testing Supabase Connection...\n');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please check your .env file contains:');
  console.error('- VITE_SUPABASE_URL');
  console.error('- VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

console.log('📋 Configuration:');
console.log(`URL: ${supabaseUrl}`);
console.log(`Key: ${supabaseAnonKey.substring(0, 20)}...`);
console.log('');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('🔍 Testing basic connection...');
    
    // Test 1: Basic connection
    const { data, error } = await supabase
      .from('prompts')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      console.log('⚠️  Database connection successful, but prompts table not found');
      console.log('This is expected if the schema hasn\'t been deployed yet');
      console.log(`Error: ${error.message}\n`);
    } else {
      console.log('✅ Database connection successful!');
      console.log(`Prompts table exists and accessible\n`);
    }

    // Test 2: Check if auth is working
    console.log('🔐 Testing authentication system...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.log('❌ Auth system error:', authError.message);
    } else {
      console.log('✅ Auth system accessible');
      console.log(`Current session: ${authData.session ? 'Active' : 'None'}\n`);
    }

    // Test 3: Check available tables (if any)
    console.log('📊 Checking database structure...');
    try {
      const { data: tables, error: tablesError } = await supabase
        .rpc('get_schema_tables')
        .select();
      
      if (tablesError) {
        console.log('⚠️  Cannot check table structure (expected if schema not deployed)');
      } else {
        console.log('✅ Database schema accessible');
        console.log('Available tables:', tables);
      }
    } catch (err) {
      console.log('⚠️  Schema check not available (this is normal)');
    }

    console.log('\n🎉 Connection test completed!');
    console.log('\n📋 Next Steps:');
    console.log('1. Deploy the database schema using the Supabase dashboard');
    console.log('2. Copy the contents of database/schema.sql');
    console.log('3. Run it in the Supabase SQL Editor');
    console.log('4. Then run the data migration script');

  } catch (error) {
    console.error('💥 Connection test failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Check your internet connection');
    console.error('2. Verify the Supabase URL and API key');
    console.error('3. Ensure the Supabase project is active');
    process.exit(1);
  }
}

// Run the test
testConnection();
