# Data Migration Guide

This guide covers the migration from static prompt data to a dynamic Supabase database system.

## 🎯 Overview

The migration transforms the existing static prompt files into a dynamic database-driven system with:
- **User authentication** and access control
- **Free vs paid content** differentiation
- **Advanced filtering** and search capabilities
- **User favorites** and progress tracking
- **Scalable architecture** for future growth

## 📊 Migration Scope

### **Data Sources**
- `src/data/prompts/beginner-prompts.ts` → Beginner level prompts
- `src/data/prompts/intermediate-prompts.ts` → Intermediate level prompts  
- `src/data/prompts/advanced-prompts.ts` → Advanced level prompts

### **Target Database Schema**
- **prompts** table with access control and metadata
- **users** table with lifetime access tracking
- **user_favorites** table for bookmark functionality
- **user_progress** table for learning tracking

## 🔄 Data Transformation

### **Field Mapping**
```typescript
// Original → Database
{
  id: prompt.id,                    // Preserved
  title: prompt.title,              // Preserved
  description: prompt.description,  // Preserved
  content: prompt.prompt,           // prompt → content
  category: categoryMap[categoryId], // Mapped to readable names
  subcategory: subcategoryMap[subcategoryId], // Mapped to readable names
  tags: prompt.tags,                // Preserved as array
  industry: prompt.industryContext, // Optional field
  use_case: prompt.useCase,         // Optional field
  skill_level: 'beginner|intermediate|advanced', // Based on source file
  access_type: 'free|paid',         // Determined by business logic
}
```

### **Category Mapping**
```typescript
const categoryMap = {
  'education': 'Education',
  'business': 'Business Strategy',
  'marketing': 'Marketing',
  'content': 'Content Creation',
  'development': 'Software Development',
  'design': 'Design',
  'research': 'Research & Analysis',
  'communication': 'Communication',
  'productivity': 'Productivity',
  'creative': 'Creative Writing',
  'technical': 'Technical Writing',
  'sales': 'Sales & Customer Service'
};
```

### **Access Type Logic**
- **Beginner prompts**: Always `free`
- **Intermediate/Advanced**: `paid` (except for demo categories)
- **Demo categories**: Content Creation, Business Strategy, Marketing (some free)

## 🚀 Migration Process

### **Prerequisites**
1. ✅ Supabase project created and configured
2. ✅ Environment variables set in `.env`
3. ✅ Database schema deployed
4. ✅ Dependencies installed (`@supabase/supabase-js`)

### **Step 1: Test Migration Locally**
```bash
# Test the transformation logic
node scripts/test-migration.js
```

### **Step 2: Run Migration**
```bash
# Migrate all prompt data to Supabase
npm run migrate-to-supabase
```

### **Step 3: Verify Migration**
```bash
# Check Supabase dashboard for:
# - Prompt count matches expected
# - Categories are properly mapped
# - Access types are correctly assigned
# - No data corruption or missing fields
```

## 📈 Expected Results

### **Data Volume**
- **Beginner prompts**: ~4 prompts → All marked as `free`
- **Intermediate prompts**: ~3 prompts → Mixed `free`/`paid`
- **Advanced prompts**: ~3 prompts → Mostly `paid`
- **Total**: ~10 prompts (expandable to 500+)

### **Category Distribution**
- **Education**: Primary category from current data
- **Business Strategy**: Secondary category
- **Other categories**: Ready for future content

### **Access Control**
- **Free prompts**: Accessible to all users
- **Paid prompts**: Require `has_lifetime_access = true`
- **Preview mode**: Show truncated content for paid prompts

## 🔧 New Components & Services

### **PromptService**
- `getPrompts()` - Fetch with filtering and pagination
- `getPromptById()` - Single prompt retrieval
- `getCategories()` - Dynamic category list
- `searchPrompts()` - Full-text search
- `getPromptStats()` - Analytics and counts

### **React Components**
- `PromptCard` - Individual prompt display with access control
- `PromptList` - Filterable, paginated prompt listing
- `AccessGate` - Content gating for premium prompts
- `AccessBadge` - Visual access indicators

### **Hooks**
- `usePrompts()` - React hook for prompt data
- `useFavorites()` - User favorites management
- `usePromptAccess()` - Access control logic

## 🎨 User Experience Improvements

### **Before (Static)**
- Fixed prompt categories
- No user accounts
- No access control
- No search/filtering
- No personalization

### **After (Dynamic)**
- ✅ Database-driven categories
- ✅ User authentication and profiles
- ✅ Free vs paid content access
- ✅ Advanced search and filtering
- ✅ User favorites and progress tracking
- ✅ Responsive design with mobile optimization

## 🔒 Security & Access Control

### **Row Level Security (RLS)**
- Users can only access their own data
- Free prompts visible to everyone
- Paid prompts require lifetime access
- Secure API endpoints

### **Access Patterns**
```typescript
// Free prompt - Always accessible
if (prompt.access_type === 'free') {
  return { hasAccess: true };
}

// Paid prompt - Requires authentication + lifetime access
if (prompt.access_type === 'paid') {
  if (!user) return { hasAccess: false, requiresAuth: true };
  if (!hasLifetimeAccess) return { hasAccess: false, requiresUpgrade: true };
  return { hasAccess: true };
}
```

## 📊 Performance Optimizations

### **Database Indexes**
- Category, skill level, access type indexes
- Full-text search on title, description, content
- User favorites lookup optimization

### **Caching Strategy**
- Category lists cached client-side
- Prompt data with stale-while-revalidate
- User favorites cached in React state

### **Pagination**
- Server-side pagination for large datasets
- Configurable page sizes
- Efficient count queries

## 🧪 Testing Strategy

### **Migration Testing**
1. **Data Integrity**: All prompts migrated correctly
2. **Field Mapping**: Categories and access types correct
3. **Access Control**: RLS policies working
4. **Performance**: Query response times acceptable

### **Component Testing**
1. **PromptCard**: Displays correctly with access control
2. **PromptList**: Filtering and pagination work
3. **AccessGate**: Shows appropriate messages
4. **Favorites**: Add/remove functionality

### **Integration Testing**
1. **User Journey**: Sign up → Browse → Upgrade → Access
2. **Search**: Full-text search returns relevant results
3. **Favorites**: Persist across sessions
4. **Mobile**: Responsive design works

## 🚨 Rollback Plan

### **If Migration Fails**
1. **Keep static files**: Original data preserved
2. **Feature flags**: Toggle between static/dynamic
3. **Gradual rollout**: Test with subset of users
4. **Monitoring**: Track errors and performance

### **Rollback Steps**
```bash
# 1. Disable dynamic routes in App.tsx
# 2. Re-enable static prompt imports
# 3. Update navigation to use static pages
# 4. Monitor for issues
```

## ✅ Success Criteria

### **Technical**
- [ ] All prompts migrated successfully
- [ ] Database queries perform well (<200ms)
- [ ] Access control working correctly
- [ ] Search and filtering functional
- [ ] Mobile responsive design

### **User Experience**
- [ ] Smooth authentication flow
- [ ] Clear access control messaging
- [ ] Intuitive navigation and search
- [ ] Fast page load times
- [ ] Error handling and feedback

### **Business**
- [ ] Free vs paid differentiation clear
- [ ] Upgrade flow functional
- [ ] User engagement metrics positive
- [ ] Scalable for future content

## 🎉 Next Steps

After successful migration:
1. **Stripe Integration** - Payment processing
2. **Content Expansion** - Add more prompts and categories
3. **Advanced Features** - AI-powered recommendations
4. **Analytics** - User behavior tracking
5. **Mobile App** - Native mobile experience

---

**Migration Status**: ✅ Ready for execution
**Estimated Time**: 30 minutes setup + 5 minutes migration
**Risk Level**: Low (rollback plan available)
