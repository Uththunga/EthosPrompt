# 9-Category Framework Migration Guide
## Complete Database Migration for Enhanced Category System

### Overview

This guide provides step-by-step instructions for migrating your EthosPrompt database to the new 9-category framework with industry mapping and 3-level skill hierarchy.

### Migration Features

- **9-Category Structure**: Streamlined workflow-based categories
- **3-Level Skill Hierarchy**: Basic → Intermediate → Advanced progression
- **Industry Support**: Industry tagging and customization capabilities
- **Rollback Capability**: Safe migration with backup and rollback options
- **Development Testing**: Comprehensive testing suite for validation

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Supabase project configured
- Environment variables set in `.env` file
- Database backup recommended

### Basic Migration

```bash
# 1. Test current database connection
npm run test-supabase

# 2. Run migration (includes automatic backup)
npm run migrate-9-category

# 3. Test migration results
npm run test-9-category

# 4. Verify in application
npm run dev
```

---

## 📋 Detailed Migration Process

### Step 1: Pre-Migration Preparation

#### 1.1 Verify Environment Setup
```bash
# Check environment variables
cat .env | grep SUPABASE

# Test database connection
npm run test-supabase
```

#### 1.2 Manual Backup (Optional)
```bash
# The migration script creates automatic backups, but you can create manual ones
node scripts/migrate-9-category-framework.mjs backup-only
```

### Step 2: Run Migration

#### 2.1 Execute Migration Script
```bash
npm run migrate-9-category
```

**What this does:**
- Creates automatic backup of existing data
- Updates database schema with new skill_level enum
- Adds industry support columns
- Migrates to 9-category structure
- Inserts all subcategories with skill levels

#### 2.2 Monitor Migration Output
```
🚀 Starting 9-Category Framework Migration...
=====================================
💾 Creating backup of existing data...
✅ Backup created: backup-1703123456789.json
🔧 Updating database schema for 9-category framework...
📝 Updating skill_level enum...
🏭 Adding industry support to categories...
📂 Updating subcategories table...
✍️ Adding industry support to prompts...
✅ Database schema updated successfully
🚀 Migrating to 9-category framework...
🧹 Clearing existing category data...
📁 Migrating category: 🎯 Strategy & Planning
  📂 Migrating subcategory: Business Planning Basics
  📂 Migrating subcategory: Goal Setting & Objectives
  ... (continues for all categories)
✅ 9-category framework migration completed successfully!
=====================================
✅ 9-Category Framework Migration Complete!
💾 Backup saved as: backup-1703123456789.json
🎉 Your database now supports the enhanced 9-category framework
```

### Step 3: Validation and Testing

#### 3.1 Run Comprehensive Tests
```bash
npm run test-9-category
```

**Test Coverage:**
- Database connection
- Schema structure validation
- 9-category structure verification
- Skill level hierarchy testing
- Industry support validation
- Data integrity checks
- Query performance testing

#### 3.2 Expected Test Output
```
🧪 9-Category Framework Migration Tests
=======================================

🧪 Running test: Database Connection
✅ Database connection successful

🧪 Running test: Schema Structure
✅ Database schema structure is valid

🧪 Running test: 9-Category Structure
✅ 9-category structure is correct
📊 Categories found: 🎯 Strategy & Planning, 📝 Content & Communication, ...

🧪 Running test: Skill Level Hierarchy
✅ Skill level hierarchy is complete
📊 Total subcategories: 108

🧪 Running test: Industry Support
✅ Industry support features are available

🧪 Running test: Data Integrity
✅ Data integrity checks passed
📊 Verified 108 subcategory-category relationships

🧪 Running test: Query Performance
✅ Query performance acceptable: 245ms

=======================================
📊 Test Results Summary
=======================================
✅ Passed: 7
❌ Failed: 0
📈 Success Rate: 100%

🎉 All tests passed! Migration is ready for production.
```

### Step 4: Application Verification

#### 4.1 Start Development Server
```bash
npm run dev
```

#### 4.2 Verify Categories Page
- Navigate to `/categories`
- Verify 9 categories are displayed
- Check category names and descriptions
- Ensure visual design is preserved

#### 4.3 Test Database Integration
- Categories should load from database
- Subcategories should display correctly
- Skill levels should be properly categorized

---

## 🔄 Rollback Procedures

### When to Rollback

- Migration tests fail
- Application functionality breaks
- Data integrity issues discovered
- Performance problems identified

### Rollback Commands

#### List Available Backups
```bash
npm run rollback-9-category list
```

#### Automatic Rollback (Latest Backup)
```bash
npm run rollback-9-category rollback
```

#### Specific Backup Rollback
```bash
npm run rollback-9-category rollback backup-1703123456789.json
```

### Rollback Process

1. **Schema Restoration**: Reverts database schema to original state
2. **Data Restoration**: Restores all data from backup file
3. **Validation**: Verifies rollback completed successfully

---

## 📊 New Database Structure

### Categories Table
```sql
CREATE TABLE public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  prompt_count INTEGER DEFAULT 0,
  bg_gradient TEXT NOT NULL,
  trending BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  industry_tags TEXT[] DEFAULT '{}',        -- NEW
  cross_industry BOOLEAN DEFAULT TRUE,      -- NEW
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Subcategories Table
```sql
CREATE TABLE public.subcategories (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES public.categories(id),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  examples TEXT[] DEFAULT '{}',
  skill_level skill_level NOT NULL,         -- UPDATED ENUM
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Updated Skill Level Enum
```sql
CREATE TYPE skill_level AS ENUM ('basic', 'intermediate', 'advanced');
```

### Prompts Table
```sql
CREATE TABLE public.prompts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES public.categories(id),
  subcategory_id TEXT REFERENCES public.subcategories(id),
  prompt_group_id TEXT REFERENCES public.prompt_groups(id),
  tags TEXT[] DEFAULT '{}',
  industry TEXT,
  use_case TEXT,
  skill_level skill_level NOT NULL,         -- UPDATED ENUM
  access_type access_type NOT NULL DEFAULT 'free',
  industry_tags TEXT[] DEFAULT '{}',        -- NEW
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🎯 9-Category Structure

### Core Categories (6)

1. **🎯 Strategy & Planning** (`strategy-planning`)
   - 12 subcategories across 3 skill levels
   - Business strategy, market research, strategic planning

2. **📝 Content & Communication** (`content-communication`)
   - 12 subcategories across 3 skill levels
   - Content creation, copywriting, communication strategies

3. **📊 Data & Analysis** (`data-analysis`)
   - 12 subcategories across 3 skill levels
   - Data analysis, reporting, business intelligence

4. **🤝 Customer & Sales** (`customer-sales`)
   - 12 subcategories across 3 skill levels
   - Customer relationship management, sales processes

5. **🔧 Operations & Process** (`operations-process`)
   - 12 subcategories across 3 skill levels
   - Operational efficiency, process improvement

6. **📚 Learning & Development** (`learning-development`)
   - 12 subcategories across 3 skill levels
   - Training programs, skill development

### Specialized Categories (3)

7. **⚖️ Legal & Compliance** (`legal-compliance`)
   - 12 subcategories across 3 skill levels
   - Legal documentation, regulatory compliance

8. **🏥 Healthcare & Clinical** (`healthcare-clinical`)
   - 12 subcategories across 3 skill levels
   - Clinical documentation, patient care

9. **💻 Technology & Development** (`technology-development`)
   - 12 subcategories across 3 skill levels
   - Software development, system architecture

---

## 🛠️ Troubleshooting

### Common Issues

#### Migration Fails with Schema Error
```bash
# Check current database state
npm run test-supabase

# Verify permissions
# Ensure your Supabase user has schema modification permissions
```

#### Backup Creation Fails
```bash
# Check disk space
df -h

# Verify write permissions
ls -la scripts/
```

#### Tests Fail After Migration
```bash
# Run individual tests to identify specific issues
node scripts/test-9-category-migration.mjs

# Check database state
npm run test-database
```

#### Application Doesn't Load Categories
```bash
# Verify database connection
npm run test-supabase

# Check category count
# Should be exactly 9 categories
```

### Recovery Procedures

#### Partial Migration Failure
1. Run rollback: `npm run rollback-9-category rollback`
2. Fix underlying issue
3. Re-run migration: `npm run migrate-9-category`

#### Data Corruption
1. Stop application
2. Run rollback with specific backup
3. Verify data integrity
4. Investigate root cause

#### Performance Issues
1. Check query performance in tests
2. Verify database indexes
3. Monitor resource usage
4. Consider rollback if severe

---

## 📈 Success Metrics

### Migration Success Indicators

- ✅ All 9 categories present in database
- ✅ 108 total subcategories (12 per category)
- ✅ All subcategories have proper skill levels
- ✅ Industry support columns added
- ✅ All tests pass (100% success rate)
- ✅ Application loads categories correctly
- ✅ Query performance <1000ms

### Post-Migration Validation

1. **Category Count**: Exactly 9 categories
2. **Subcategory Distribution**: 12 subcategories per category
3. **Skill Level Coverage**: Each category has basic, intermediate, advanced
4. **Data Integrity**: All foreign key relationships valid
5. **Performance**: Category queries complete in <1 second
6. **Application Function**: Categories page loads without errors

---

## 📋 Next Steps

After successful migration:

1. **Update Frontend**: Implement new categories-data.ts structure
2. **Add Skill Filtering**: Implement skill-level filtering UI
3. **Industry Features**: Add industry customization capabilities
4. **Content Migration**: Map existing prompts to new structure
5. **User Testing**: Validate improved user experience

For detailed implementation guidance, see:
- `Docs/9-Category-Framework.md` - Complete framework documentation
- `Docs/Industry-Mapping-Enhancement.md` - Industry customization strategy
- `Docs/Components/PromptCategories.md` - Frontend implementation guide
