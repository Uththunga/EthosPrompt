# Supabase Deployment Guide

## 🎯 Quick Setup Instructions

### **Step 1: Access Supabase Dashboard**
1. Go to [https://ccwbryhnsbtiutusgyxn.supabase.co](https://ccwbryhnsbtiutusgyxn.supabase.co)
2. Sign in to your Supabase account
3. Navigate to the **SQL Editor** tab

### **Step 2: Deploy Database Schema**
1. In the SQL Editor, create a new query
2. Copy the entire contents of `database/schema.sql` (provided below)
3. Paste it into the SQL Editor
4. Click **Run** to execute the schema

### **Step 3: Verify Schema Deployment**
1. Go to **Table Editor** tab
2. Confirm these tables exist:
   - `users`
   - `prompts` 
   - `user_favorites`
   - `user_progress`

### **Step 4: Run Data Migration**
```bash
npm run migrate-to-supabase
```

---

## 📋 Complete Database Schema

Copy and paste this entire SQL script into your Supabase SQL Editor:

```sql
-- EthosPrompt Database Schema
-- This file contains the complete database schema for the EthosPrompt application
-- Run this in your Supabase SQL editor to set up the database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE access_type AS ENUM ('free', 'paid');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    has_lifetime_access BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prompts table
CREATE TABLE public.prompts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    tags TEXT[] DEFAULT '{}',
    industry TEXT,
    use_case TEXT,
    skill_level skill_level NOT NULL DEFAULT 'beginner',
    access_type access_type NOT NULL DEFAULT 'free',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User favorites table
CREATE TABLE public.user_favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, prompt_id)
);

-- User progress tracking (optional MVP feature)
CREATE TABLE public.user_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    content_type TEXT NOT NULL, -- 'prompt', 'tutorial', 'guide'
    content_id TEXT NOT NULL,
    progress_data JSONB DEFAULT '{}',
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, content_type, content_id)
);

-- Create indexes for better performance
CREATE INDEX idx_prompts_category ON public.prompts(category);
CREATE INDEX idx_prompts_skill_level ON public.prompts(skill_level);
CREATE INDEX idx_prompts_access_type ON public.prompts(access_type);
CREATE INDEX idx_prompts_tags ON public.prompts USING GIN(tags);
CREATE INDEX idx_user_favorites_user_id ON public.user_favorites(user_id);
CREATE INDEX idx_user_favorites_prompt_id ON public.user_favorites(prompt_id);
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prompts_updated_at BEFORE UPDATE ON public.prompts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON public.user_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Prompts policies (all users can read, only authenticated users can see paid content if they have access)
CREATE POLICY "Anyone can view free prompts" ON public.prompts
    FOR SELECT USING (access_type = 'free');

CREATE POLICY "Authenticated users with lifetime access can view paid prompts" ON public.prompts
    FOR SELECT USING (
        access_type = 'paid' AND 
        auth.uid() IS NOT NULL AND 
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND has_lifetime_access = true
        )
    );

-- User favorites policies
CREATE POLICY "Users can manage their own favorites" ON public.user_favorites
    FOR ALL USING (auth.uid() = user_id);

-- User progress policies
CREATE POLICY "Users can manage their own progress" ON public.user_progress
    FOR ALL USING (auth.uid() = user_id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to check if user has access to paid content
CREATE OR REPLACE FUNCTION public.user_has_lifetime_access(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = user_id AND has_lifetime_access = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
```

---

## ✅ Verification Steps

After running the schema, verify the setup:

### **1. Check Tables**
In the Supabase dashboard, go to **Table Editor** and confirm:
- ✅ `users` table with `has_lifetime_access` column
- ✅ `prompts` table with `access_type` and `skill_level` columns
- ✅ `user_favorites` table for bookmarks
- ✅ `user_progress` table for tracking

### **2. Test RLS Policies**
- ✅ Free prompts visible to everyone
- ✅ Paid prompts require authentication + lifetime access
- ✅ Users can only access their own data

### **3. Test Authentication**
```bash
# Run the connection test again
npm run test-supabase
```

Should now show:
- ✅ Database connection successful
- ✅ Prompts table exists and accessible
- ✅ Auth system working

---

## 🚀 Next Steps

Once schema is deployed successfully:

1. **Run Data Migration**:
   ```bash
   npm run migrate-to-supabase
   ```

2. **Test the Application**:
   ```bash
   npm run dev
   ```

3. **Verify Features**:
   - User registration/login
   - Dynamic prompt loading
   - Access control working
   - Favorites system functional

---

## 🔧 Troubleshooting

### **Common Issues**

**Error: "relation does not exist"**
- Solution: Ensure the schema was deployed completely
- Check that all tables exist in Table Editor

**Error: "permission denied"**
- Solution: Verify RLS policies are set correctly
- Check that grants were applied

**Error: "function does not exist"**
- Solution: Ensure all functions and triggers were created
- Re-run the complete schema script

### **Reset Database (if needed)**
If you need to start over:
1. Go to **SQL Editor**
2. Run: `DROP SCHEMA public CASCADE; CREATE SCHEMA public;`
3. Re-run the complete schema script above

---

## 📊 Expected Results

After successful deployment:
- **4 tables** created with proper relationships
- **RLS policies** protecting user data
- **Triggers** for automatic timestamps
- **Functions** for user management
- **Indexes** for optimal performance

The application will then be ready for dynamic content and user authentication!
