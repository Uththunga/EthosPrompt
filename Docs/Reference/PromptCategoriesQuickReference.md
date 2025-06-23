# EthosPrompt 9-Category Quick Reference

## Category Summary

| Category | ID | Type | Skill Levels | Primary Users |
|----------|----|------|--------------|---------------|
| 🎯 Strategy & Planning | `strategy-planning` | Core | Basic → Intermediate → Advanced | Entrepreneurs, Managers, Executives |
| 📝 Content & Communication | `content-communication` | Core | Basic → Intermediate → Advanced | Marketers, Writers, Communicators |
| 📊 Data & Analysis | `data-analysis` | Core | Basic → Intermediate → Advanced | Analysts, Researchers, Data Scientists |
| 🤝 Customer & Sales | `customer-sales` | Core | Basic → Intermediate → Advanced | Sales Teams, Customer Success |
| 🔧 Operations & Process | `operations-process` | Core | Basic → Intermediate → Advanced | Operations Managers, Project Managers |
| 📚 Learning & Development | `learning-development` | Core | Basic → Intermediate → Advanced | Trainers, HR, Educators |
| ⚖️ Legal & Compliance | `legal-compliance` | Specialized | Basic → Intermediate → Advanced | Legal Professionals, Compliance |
| 🏥 Healthcare & Clinical | `healthcare-clinical` | Specialized | Basic → Intermediate → Advanced | Healthcare Professionals |
| 💻 Technology & Development | `technology-development` | Specialized | Basic → Intermediate → Advanced | Developers, Engineers, Architects |

## Core Categories (6)

### 🎯 Strategy & Planning
- **Subcategories**: 12 (4 per skill level)
- **Key Areas**: Business planning, competitive analysis, strategic planning, innovation strategy
- **Skill Progression**: Business basics → Strategic planning → Corporate strategy

### 📝 Content & Communication
- **Subcategories**: 12 (4 per skill level)
- **Key Areas**: Copywriting, content marketing, brand messaging, technical writing
- **Skill Progression**: Basic copywriting → Content strategy → Thought leadership

### 📊 Data & Analysis
- **Subcategories**: 12 (4 per skill level)
- **Key Areas**: Reporting, business intelligence, analytics, data science
- **Skill Progression**: Basic reporting → BI & analytics → Predictive analytics

### 🤝 Customer & Sales
- **Subcategories**: 12 (4 per skill level)
- **Key Areas**: Customer service, sales processes, CRM, customer success
- **Skill Progression**: Basic service → Sales management → Enterprise sales

### 🔧 Operations & Process
- **Subcategories**: 12 (4 per skill level)
- **Key Areas**: Project management, process improvement, workflow automation, operations
- **Skill Progression**: Basic PM → Process optimization → Enterprise operations

### 📚 Learning & Development
- **Subcategories**: 12 (4 per skill level)
- **Key Areas**: Training, skill development, knowledge management, organizational learning
- **Skill Progression**: Basic training → Program development → Learning strategy

## Specialized Categories (3)

### ⚖️ Legal & Compliance
- **Subcategories**: 12 (4 per skill level)
- **Key Areas**: Legal documentation, compliance, contract management, risk management
- **Skill Progression**: Basic legal docs → Regulatory compliance → Complex legal strategy

### 🏥 Healthcare & Clinical
- **Subcategories**: 12 (4 per skill level)
- **Key Areas**: Patient communication, clinical documentation, healthcare administration, clinical research
- **Skill Progression**: Basic patient care → Clinical documentation → Advanced practice

### 💻 Technology & Development
- **Subcategories**: 12 (4 per skill level)
- **Key Areas**: Programming, system architecture, DevOps, enterprise technology
- **Skill Progression**: Basic programming → Software engineering → Enterprise architecture

## Skill Level System

### 3-Level Progression Model

**Level 1: Basic/Foundational**
- Target: Beginners, small business owners, coordinators
- Focus: Simple tasks, foundational concepts, getting started
- Available in: All 9 categories (4 subcategories each)

**Level 2: Intermediate/Professional**
- Target: Experienced professionals, managers, specialists
- Focus: Complex workflows, professional expertise, strategic thinking
- Available in: All 9 categories (4 subcategories each)

**Level 3: Advanced/Specialized**
- Target: Experts, executives, specialized professionals
- Focus: Sophisticated analysis, strategic leadership, innovation
- Available in: All 9 categories (4 subcategories each)

## Quick Navigation

### By User Type
- **Entrepreneurs & Small Business**: Strategy & Planning (Basic), Operations & Process (Basic)
- **Marketing Professionals**: Content & Communication, Customer & Sales, Data & Analysis
- **Technical Professionals**: Technology & Development, Data & Analysis, Operations & Process
- **Healthcare Professionals**: Healthcare & Clinical, Learning & Development, Operations & Process
- **Legal Professionals**: Legal & Compliance, Content & Communication, Operations & Process
- **Managers & Executives**: Strategy & Planning (Advanced), Operations & Process (Advanced), Learning & Development

### By Workflow
- **Planning & Strategy**: Strategy & Planning, Operations & Process
- **Content & Marketing**: Content & Communication, Customer & Sales
- **Analysis & Insights**: Data & Analysis, Strategy & Planning
- **Process & Operations**: Operations & Process, Technology & Development
- **People & Development**: Learning & Development, Customer & Sales
- **Compliance & Risk**: Legal & Compliance, Operations & Process

## Implementation Details

### File Locations
- **Categories Data**: `src/data/categories-data.ts` (updated for 9-category structure)
- **Prompts Data**: `src/data/prompts-data.ts`
- **Category Pages**: `src/pages/categories/`
- **Components**: `src/components/`
- **Framework Documentation**: `Docs/9-Category-Framework.md`

### ID Naming Convention
- **Categories**: `kebab-case` (e.g., `strategy-planning`, `content-communication`)
- **Subcategories**: `kebab-case` with skill level (e.g., `business-planning-basics`, `competitive-analysis`)
- **Prompt Groups**: `kebab-case` (e.g., `business-model-canvas`, `market-research`)

### Database Schema
```sql
-- skill_level enum supports 3-level progression
CREATE TYPE skill_level_enum AS ENUM ('basic', 'intermediate', 'advanced');

-- Categories table for 9-category structure
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  prompt_count INTEGER DEFAULT 0,
  bg_gradient TEXT NOT NULL
);

-- Subcategories with skill level classification
CREATE TABLE subcategories (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES categories(id),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  skill_level skill_level_enum NOT NULL
);
```

## Migration Benefits

### User Experience Improvements
- **Reduced Decision Fatigue**: 9 categories vs. 12+ reduces cognitive load
- **Workflow Alignment**: Categories match how users actually work
- **Skill Progression**: Clear path from basic to advanced
- **Better Discoverability**: Function-based organization improves findability

### Business Impact
- **Higher Conversion**: Improved UX leads to better conversion rates
- **Reduced Support**: Better navigation reduces support requests
- **Competitive Advantage**: Superior categorization system
- **Scalable Growth**: Framework supports future expansion

---

*For complete implementation details, see [9-Category Framework Documentation](../9-Category-Framework.md) and [Prompt Categories Documentation](../Components/PromptCategories.md)*