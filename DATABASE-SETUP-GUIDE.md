# Database Setup Guide

This guide will help you set up the Supabase database for the EthosPrompt application.

## Prerequisites

- Supabase account and project
- Environment variables configured in `.env` file

## Step 1: Set Up Database Schema

1. Go to your Supabase dashboard: https://ccwbryhnsbtiutusgyxn.supabase.co
2. Navigate to **SQL Editor**
3. Copy and paste the following SQL schema:

```sql
-- EthosPrompt Database Schema
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE access_type AS ENUM ('free', 'paid');

-- Categories table
CREATE TABLE public.categories (
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

-- Subcategories table
CREATE TABLE public.subcategories (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    examples TEXT[] DEFAULT '{}',
    skill_level skill_level NOT NULL DEFAULT 'beginner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prompt groups table
CREATE TABLE public.prompt_groups (
    id TEXT PRIMARY KEY,
    subcategory_id TEXT NOT NULL REFERENCES public.subcategories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prompts table
CREATE TABLE public.prompts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    subcategory_id TEXT REFERENCES public.subcategories(id) ON DELETE CASCADE,
    prompt_group_id TEXT REFERENCES public.prompt_groups(id) ON DELETE CASCADE,
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
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, prompt_id)
);

-- Create indexes for better performance
CREATE INDEX idx_subcategories_category_id ON public.subcategories(category_id);
CREATE INDEX idx_prompt_groups_subcategory_id ON public.prompt_groups(subcategory_id);
CREATE INDEX idx_prompts_category_id ON public.prompts(category_id);
CREATE INDEX idx_prompts_subcategory_id ON public.prompts(subcategory_id);
CREATE INDEX idx_prompts_prompt_group_id ON public.prompts(prompt_group_id);
CREATE INDEX idx_prompts_skill_level ON public.prompts(skill_level);
CREATE INDEX idx_prompts_access_type ON public.prompts(access_type);
CREATE INDEX idx_prompts_tags ON public.prompts USING GIN(tags);
CREATE INDEX idx_user_favorites_user_id ON public.user_favorites(user_id);
CREATE INDEX idx_user_favorites_prompt_id ON public.user_favorites(prompt_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subcategories_updated_at BEFORE UPDATE ON public.subcategories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prompt_groups_updated_at BEFORE UPDATE ON public.prompt_groups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prompts_updated_at BEFORE UPDATE ON public.prompts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read access)
CREATE POLICY "Anyone can view categories" ON public.categories
    FOR SELECT USING (true);

-- Subcategories policies (public read access)
CREATE POLICY "Anyone can view subcategories" ON public.subcategories
    FOR SELECT USING (true);

-- Prompt groups policies (public read access)
CREATE POLICY "Anyone can view prompt groups" ON public.prompt_groups
    FOR SELECT USING (true);

-- Prompts policies (all users can read, only authenticated users can see paid content if they have access)
CREATE POLICY "Anyone can view free prompts" ON public.prompts
    FOR SELECT USING (access_type = 'free');

CREATE POLICY "Authenticated users with lifetime access can view paid prompts" ON public.prompts
    FOR SELECT USING (
        access_type = 'paid' AND 
        auth.uid() IS NOT NULL AND 
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE id = auth.uid()
        )
    );

-- User favorites policies
CREATE POLICY "Users can manage their own favorites" ON public.user_favorites
    FOR ALL USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
```

4. Click **Run** to execute the schema

## Step 2: Populate Database with Sample Data

After setting up the schema, run the migration script to populate the database:

```bash
npm run migrate-database
```

This will:
- Create sample categories (Marketing & Content, Education & Teaching, Software Development)
- Add subcategories for each category
- Create prompt groups
- Generate 3 beginner-level sample prompts for each subcategory

## Step 3: Verify Setup

1. Check the **Table Editor** in your Supabase dashboard
2. You should see the following tables:
   - `categories`
   - `subcategories`
   - `prompt_groups`
   - `prompts`
   - `user_favorites`

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Navigate to http://localhost:3003/EthosPrompt/categories
5. You should see the categories loaded from the database

## Troubleshooting

### Database Connection Issues
- Verify your `.env` file has the correct Supabase credentials
- Check that the Supabase project is active and accessible

### Schema Creation Errors
- Make sure you have the correct permissions in Supabase
- Try running the SQL commands one section at a time

### Migration Script Errors
- Ensure the database schema is set up first
- Check the console output for specific error messages

## Next Steps

Once the database is set up and populated:
1. The `/categories` page will load data from the database
2. All visual design and layout remain unchanged
3. The `/prompts` page has been removed as requested
4. Categories serve as the main prompt discovery interface

## Database Structure

The database follows this hierarchy:
- **Categories** (e.g., Marketing & Content)
  - **Subcategories** (e.g., Content Creation & Copywriting)
    - **Prompt Groups** (e.g., Long-Form Content)
      - **Individual Prompts** (e.g., Blog post writing prompt)

This structure allows for flexible organization and easy expansion of the prompt library.
