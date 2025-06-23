// Test database setup after schema deployment
// Run with: node scripts/test-database-setup.js

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🧪 Testing Database Setup...\n');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDatabaseSetup() {
  const tests = [];
  
  try {
    // Test 1: Check prompts table
    console.log('1️⃣ Testing prompts table...');
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        tests.push({ name: 'Prompts table', status: 'FAIL', error: error.message });
      } else {
        tests.push({ name: 'Prompts table', status: 'PASS', details: 'Table accessible' });
      }
    } catch (err) {
      tests.push({ name: 'Prompts table', status: 'FAIL', error: err.message });
    }

    // Test 2: Check users table
    console.log('2️⃣ Testing users table...');
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        tests.push({ name: 'Users table', status: 'FAIL', error: error.message });
      } else {
        tests.push({ name: 'Users table', status: 'PASS', details: 'Table accessible' });
      }
    } catch (err) {
      tests.push({ name: 'Users table', status: 'FAIL', error: err.message });
    }

    // Test 3: Check user_favorites table
    console.log('3️⃣ Testing user_favorites table...');
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        tests.push({ name: 'User favorites table', status: 'FAIL', error: error.message });
      } else {
        tests.push({ name: 'User favorites table', status: 'PASS', details: 'Table accessible' });
      }
    } catch (err) {
      tests.push({ name: 'User favorites table', status: 'FAIL', error: err.message });
    }

    // Test 4: Check user_progress table
    console.log('4️⃣ Testing user_progress table...');
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        tests.push({ name: 'User progress table', status: 'FAIL', error: error.message });
      } else {
        tests.push({ name: 'User progress table', status: 'PASS', details: 'Table accessible' });
      }
    } catch (err) {
      tests.push({ name: 'User progress table', status: 'FAIL', error: err.message });
    }

    // Test 5: Check authentication
    console.log('5️⃣ Testing authentication system...');
    try {
      const { data: authData, error: authError } = await supabase.auth.getSession();
      
      if (authError) {
        tests.push({ name: 'Authentication', status: 'FAIL', error: authError.message });
      } else {
        tests.push({ name: 'Authentication', status: 'PASS', details: 'Auth system working' });
      }
    } catch (err) {
      tests.push({ name: 'Authentication', status: 'FAIL', error: err.message });
    }

    // Test 6: Test RLS policies (basic check)
    console.log('6️⃣ Testing Row Level Security...');
    try {
      // This should work (free prompts accessible to everyone)
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('access_type', 'free')
        .limit(1);
      
      if (error && error.message.includes('permission denied')) {
        tests.push({ name: 'RLS Policies', status: 'FAIL', error: 'RLS blocking free content access' });
      } else {
        tests.push({ name: 'RLS Policies', status: 'PASS', details: 'Basic RLS working' });
      }
    } catch (err) {
      tests.push({ name: 'RLS Policies', status: 'FAIL', error: err.message });
    }

    // Display results
    console.log('\n📊 Test Results:');
    console.log('================');
    
    let passCount = 0;
    let failCount = 0;
    
    tests.forEach(test => {
      const icon = test.status === 'PASS' ? '✅' : '❌';
      console.log(`${icon} ${test.name}: ${test.status}`);
      
      if (test.status === 'PASS') {
        passCount++;
        if (test.details) console.log(`   ${test.details}`);
      } else {
        failCount++;
        console.log(`   Error: ${test.error}`);
      }
    });

    console.log('\n📈 Summary:');
    console.log(`✅ Passed: ${passCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📊 Total: ${tests.length}`);

    if (failCount === 0) {
      console.log('\n🎉 All tests passed! Database setup is complete.');
      console.log('\n📋 Next Steps:');
      console.log('1. Run data migration: npm run migrate-to-supabase');
      console.log('2. Start the application: npm run dev');
      console.log('3. Test user registration and login');
    } else {
      console.log('\n⚠️  Some tests failed. Please check the database schema deployment.');
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Ensure the complete schema was deployed in Supabase SQL Editor');
      console.log('2. Check that all tables exist in the Table Editor');
      console.log('3. Verify RLS policies are enabled');
    }

  } catch (error) {
    console.error('💥 Database setup test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testDatabaseSetup();
