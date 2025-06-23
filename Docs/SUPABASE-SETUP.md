# Supabase Setup Guide

This guide will help you set up Supabase for the EthosPrompt application.

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `ethosprompt` (or your preferred name)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (2-3 minutes)

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)
   - **service_role** key (starts with `eyJ`) - **Keep this secret!**

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update your `.env` file with your Supabase credentials:
   ```env
   # Supabase
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

### 4. Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `database/schema.sql`
3. Paste it into the SQL Editor
4. Click **Run** to execute the schema

This will create:
- ✅ Users table with lifetime access tracking
- ✅ Prompts table with categories and access control
- ✅ User favorites system
- ✅ User progress tracking
- ✅ Row Level Security (RLS) policies
- ✅ Database triggers and functions

### 5. Migrate Existing Data

Run the migration script to move your static prompt data to Supabase:

```bash
npm run migrate-to-supabase
```

This will:
- Transform existing prompt data to match the database schema
- Set appropriate access levels (free vs paid)
- Insert all prompts into the database
- Provide migration statistics

## 🔐 Security Configuration

### Row Level Security (RLS)

The schema automatically sets up RLS policies:

- **Users**: Can only view/edit their own profile
- **Prompts**: 
  - Free prompts: Accessible to everyone
  - Paid prompts: Only accessible to users with `has_lifetime_access = true`
- **Favorites**: Users can only manage their own favorites
- **Progress**: Users can only manage their own progress

### Authentication

The setup includes:
- ✅ Email/password authentication
- ✅ Automatic user profile creation
- ✅ Session management
- ✅ Password reset functionality

## 📊 Database Schema Overview

### Tables

#### `users`
- Extends Supabase auth.users
- Tracks `has_lifetime_access` for payment status
- Stores profile information

#### `prompts`
- All prompt content and metadata
- Categories, tags, skill levels
- Access control (free/paid)

#### `user_favorites`
- User bookmark system
- Links users to their favorite prompts

#### `user_progress`
- Optional progress tracking
- Stores completion status for tutorials/guides

### Key Features

- **Automatic timestamps** with triggers
- **UUID primary keys** for security
- **Indexed columns** for performance
- **Type safety** with custom enums
- **Referential integrity** with foreign keys

## 🧪 Testing the Setup

### 1. Test Database Connection

```typescript
import { supabase } from './src/lib/supabase';

// Test connection
const testConnection = async () => {
  const { data, error } = await supabase
    .from('prompts')
    .select('count(*)')
    .limit(1);
  
  if (error) {
    console.error('Database connection failed:', error);
  } else {
    console.log('Database connected successfully!');
  }
};
```

### 2. Test Authentication

```typescript
// Test sign up
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'testpassword123',
  options: {
    data: {
      full_name: 'Test User'
    }
  }
});
```

### 3. Test Data Access

```typescript
// Test prompt access
const { data: freePrompts } = await supabase
  .from('prompts')
  .select('*')
  .eq('access_type', 'free')
  .limit(5);

console.log('Free prompts:', freePrompts);
```

## 🚨 Important Notes

### Security
- **Never commit** your `.env` file to version control
- **Keep service_role key secret** - only use server-side
- **Use anon key** for client-side operations
- **Test RLS policies** thoroughly before production

### Performance
- Database includes optimized indexes
- Use `select()` to specify needed columns
- Implement pagination for large datasets
- Consider caching for frequently accessed data

### Backup
- Supabase provides automatic backups
- Consider additional backup strategy for production
- Export schema regularly during development

## 🔧 Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check environment variables
   - Verify project URL and keys
   - Ensure project is active

2. **RLS Policy Errors**
   - Check user authentication status
   - Verify policy conditions
   - Test with service_role key for debugging

3. **Migration Errors**
   - Check data format compatibility
   - Verify required fields are present
   - Run migration in smaller batches

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## ✅ Next Steps

After completing the Supabase setup:

1. ✅ **Test authentication flow**
2. ✅ **Verify data migration**
3. ✅ **Test RLS policies**
4. ✅ **Implement frontend integration**
5. ✅ **Set up Stripe webhooks** (next phase)

Your Supabase backend is now ready for the EthosPrompt application!
