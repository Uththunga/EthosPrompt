# Prompt Categories Documentation

## Overview

This document provides a comprehensive guide to the prompt category structure used in the AI Prompt Library application. The system is organized into a hierarchical structure: **Categories** → **Subcategories** → **Prompt Groups** → **Individual Prompts**.

## Structure Hierarchy

```
Category (e.g., Marketing & Content)
├── Subcategory (e.g., Content Creation & Copywriting)
    ├── Prompt Group (e.g., Long-Form Content)
        └── Individual Prompts (e.g., Blog post writing, Article creation)
```

## Data Structure

### Category Interface
```typescript
interface Category {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  icon: LucideIcon;              // Visual icon
  description: string;           // Category description
  promptCount: number;           // Total number of prompts
  subcategories: Subcategory[];  // List of subcategories
  bgGradient: string;            // Background gradient for UI
  trending?: boolean;            // Trending category flag
  featured?: boolean;            // Featured category flag
}
```

### Subcategory Interface
```typescript
interface Subcategory {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  description: string;           // Subcategory description
  examples: string[];            // Example use cases
  skillLevel: SkillLevel;        // Beginner/Intermediate/Advanced
  promptGroups?: PromptGroup[];  // List of prompt groups
}
```

### Prompt Group Interface
```typescript
interface PromptGroup {
  id: string;                    // Unique identifier
  name: string;                  // Display name
}
```

### Individual Prompt Interface
```typescript
interface Prompt {
  id: string;                    // Unique identifier
  categoryId: string;            // Parent category ID
  subcategoryId: string;         // Parent subcategory ID
  promptGroupId?: string;        // Parent prompt group ID
  title: string;                 // Prompt title
  description: string;           // Short description
  prompt: string;                // Full prompt text
  tags?: string[];               // Search tags
}
```

## Categories Overview

### 1. Marketing & Content
- **ID**: `marketing`
- **Icon**: Megaphone
- **Description**: Drive growth with AI-powered strategies, from planning and creation to promotion and analytics.
- **Prompt Count**: 180
- **Status**: Featured
- **Background**: Purple to Pink gradient

#### Subcategories:
1. **Marketing Strategy & Planning** (Advanced)
   - Market & Audience Research
   - Campaign Strategy & Briefs
   - Content & SEO Planning

2. **Content Creation & Copywriting** (Intermediate)
   - Long-Form Content
   - Social Media Content
   - Email & Ad Copy

3. **Content Promotion & Distribution** (Intermediate)
   - Press & Media Outreach
   - Influencer & Partner Collaboration
   - Content Repurposing

4. **Performance & Analytics** (Advanced)
   - Data Analysis & Insights
   - Performance Reporting
   - A/B Testing & Optimization

### 2. Digital Creators
- **ID**: `digital-creators`
- **Icon**: Video
- **Description**: Supercharge your content with AI-driven tools for ideation, creation, and growth.
- **Prompt Count**: 230
- **Status**: Featured
- **Background**: Purple to Indigo gradient

#### Subcategories:
1. **Content & Ideation** (Beginner)
   - Idea Generation
   - Scriptwriting & Storytelling
   - Visual Content Creation

2. **Audience Growth & Engagement** (Intermediate)
   - Captions & Hooks
   - Community Management
   - Collaboration & Outreach

3. **Strategy & Operations** (Advanced)
   - Content Repurposing
   - Monetization Strategies
   - Performance Analytics

### 3. Education & Teaching
- **ID**: `education`
- **Icon**: GraduationCap
- **Description**: Design effective learning materials and curricula
- **Prompt Count**: 38
- **Status**: Trending
- **Background**: Blue to Cyan gradient

#### Subcategories:
1. **Lesson Planning** (Beginner)
   - Lesson Plans
   - Activity Design
   - Instructional Materials
   - Differentiation Strategies

2. **Assessment Creation** (Intermediate)
   - Formative Assessments
   - Summative Assessments
   - Rubrics & Scoring Guides
   - Test Bank Questions

3. **Student Feedback** (Intermediate)
   - Written Feedback
   - Progress Reports
   - Goal Setting
   - Study Strategies

4. **Curriculum Design** (Advanced)
   - Course Outlines
   - Learning Objectives
   - Scope & Sequence
   - Curriculum Mapping

### 4. Software Development
- **ID**: `development`
- **Icon**: Code
- **Description**: Code generation, documentation, and technical writing
- **Prompt Count**: 42
- **Status**: Featured
- **Background**: Emerald to Teal gradient

#### Subcategories:
1. **Code Assistance** (Advanced)
   - Code Generation
   - Debugging Help
   - Code Review
   - Refactoring

2. **Documentation** (Intermediate)
   - API Documentation
   - Code Comments
   - Tutorials & Guides
   - Technical Specifications

3. **Testing & QA** (Advanced)
   - Unit Testing
   - Integration Testing
   - Test Scenarios
   - Test Automation

4. **Architecture & Design** (Advanced)
   - System Design
   - Design Patterns
   - Architecture Diagrams
   - Tech Stack Selection

### 5. Customer Support
- **ID**: `support`
- **Icon**: MessageCircle
- **Description**: Enhance customer service and support operations
- **Prompt Count**: 35
- **Background**: Orange to Yellow gradient

#### Subcategories:
1. **Response Templates** (Beginner)
   - Email Templates
   - Chat Responses
   - Phone Scripts
   - Knowledge Base Articles

2. **Issue Resolution** (Intermediate)
   - Troubleshooting Guides
   - Common Solutions
   - Escalation Procedures
   - Technical Troubleshooting

3. **Customer Onboarding** (Intermediate)
   - Welcome Sequences
   - Setup Guides
   - Product Tours
   - Onboarding Checklists

4. **Feedback Management** (Advanced)
   - Review Responses
   - Feedback Analysis
   - Survey Design
   - Customer Satisfaction

### 6. Legal Services
- **ID**: `legal`
- **Icon**: ScrollText
- **Description**: Legal document creation and analysis
- **Prompt Count**: 32
- **Background**: Slate to Zinc gradient

#### Subcategories:
1. **Document Drafting** (Advanced)
   - Contracts
   - Agreements
   - Legal Notices
   - Legal Pleadings

2. **Legal Research** (Advanced)
   - Case Summaries
   - Legal Memos
   - Statutory Analysis
   - Precedent Research

3. **Client Communication** (Intermediate)
   - Client Letters
   - Case Updates
   - Legal Opinions
   - Client Meeting Preparation

4. **Compliance & Regulation** (Advanced)
   - Policy Reviews
   - Compliance Audits
   - Risk Assessments
   - Regulatory Updates

### 7. HR & Recruitment
- **ID**: `hr`
- **Icon**: UserCircle
- **Description**: Streamline hiring and HR processes
- **Prompt Count**: 30
- **Status**: Trending
- **Background**: Violet to Indigo gradient

#### Subcategories:
1. **Job Descriptions** (Beginner)
   - Role Descriptions
   - Job Postings
   - Job Requirements
   - Compensation & Benefits

2. **Candidate Assessment** (Intermediate)
   - Interview Questions
   - Evaluation Forms
   - Skills Assessments
   - Candidate Evaluation

3. **Employee Communications** (Intermediate)
   - Company Announcements
   - Policy Updates
   - Employee Feedback
   - Recognition Communications

4. **HR Policies** (Advanced)
   - Employee Handbook
   - HR Procedures
   - Compliance Policies
   - Workplace Guidelines

### 8. Healthcare
- **ID**: `healthcare`
- **Icon**: Stethoscope
- **Description**: Clinical documentation and patient care
- **Prompt Count**: 28
- **Background**: Red to Rose gradient

#### Subcategories:
1. **Clinical Documentation** (Advanced)
   - SOAP Notes
   - Treatment Plans
   - Progress Notes
   - Discharge Summaries

2. **Patient Education** (Intermediate)
   - Condition Guides
   - Medication Instructions
   - Post-Procedure Care
   - Preventive Care

3. **Clinical Research** (Advanced)
   - Study Protocols
   - Research Proposals
   - Data Analysis
   - Publication Preparation

4. **Healthcare Communications** (Advanced)
   - Referral Letters
   - Case Summaries
   - Interdisciplinary Communications
   - Patient Communications

### 9. Data Science & Analysis
- **ID**: `data-science`
- **Icon**: BarChart2
- **Description**: Data analysis and insights generation
- **Prompt Count**: 34
- **Status**: Featured
- **Background**: Cyan to Blue gradient

#### Subcategories:
1. **Data Analysis** (Advanced)
   - Data Cleaning
   - Exploratory Analysis
   - Statistical Testing
   - Trend Analysis

2. **Data Visualization** (Intermediate)
   - Chart Design
   - Dashboard Creation
   - Data Storytelling
   - Interactive Visuals

3. **Reporting** (Intermediate)
   - Executive Summaries
   - KPI Dashboards
   - Performance Reports
   - Data Insights

4. **Machine Learning** (Advanced)
   - Model Training
   - Feature Engineering
   - Model Evaluation
   - MLOps

### 10. Finance & Investing
- **ID**: `finance`
- **Icon**: DollarSign
- **Description**: Empower analysts, advisors, and investors with AI-driven research, planning, and reporting tools.
- **Prompt Count**: 120
- **Background**: Amber to Yellow gradient

#### Subcategories:
1. **Market Research & Analysis** (Advanced)
   - Equity Research
   - Sector Outlooks
   - Macro Trends

2. **Portfolio Management** (Intermediate)
   - Asset Allocation
   - Risk Assessment
   - Rebalancing Plans

3. **Financial Planning** (Beginner)
   - Goal Planning
   - Retirement Models
   - Budget Worksheets

4. **Reporting & Compliance** (Advanced)
   - Client Reports
   - Reg Filings
   - KPI Dashboards

### 11. E-commerce & Retail
- **ID**: `ecommerce`
- **Icon**: ShoppingCart
- **Description**: Optimize online stores and retail operations with conversion-focused AI prompts.
- **Prompt Count**: 90
- **Background**: Fuchsia to Rose gradient

#### Subcategories:
1. **Product Listing & SEO** (Beginner)
   - Title Generation
   - Keyword Research
   - Description Builder

2. **CRO & UX** (Intermediate)
   - A/B Hypotheses
   - UX Copy
   - Checkout Flow

3. **Customer Retention** (Intermediate)
   - Email Sequences
   - Loyalty Ideas
   - Re-engagement

4. **Operations & Supply** (Advanced)
   - Demand Forecasting
   - Supplier Emails
   - Restock Alerts

### 12. Technology & SaaS
- **ID**: `technology`
- **Icon**: Server
- **Description**: Accelerate product-led growth with prompts for roadmap planning, onboarding, and customer success.
- **Prompt Count**: 110
- **Background**: Sky to Indigo gradient

#### Subcategories:
1. **Product Strategy** (Advanced)
   - PRDs
   - Feature Prioritization
   - Roadmap Themes

2. **Onboarding & Adoption** (Intermediate)
   - User Guides
   - In-App Messages
   - Walkthrough Scripts

3. **Customer Success** (Intermediate)
   - Health Scoring
   - QBR Outlines
   - Churn Insights

4. **Developer Relations** (Advanced)
   - Quick-Starts
   - Sample Code
   - Community Posts

## Skill Levels

The system uses three skill levels to help users find appropriate prompts:

- **Beginner**: Basic prompts suitable for those new to the field
- **Intermediate**: More complex prompts requiring some experience
- **Advanced**: Sophisticated prompts for experienced professionals

## Usage Guidelines

### For Developers
1. **Adding New Categories**: Follow the existing structure and add to `categories-data.ts`
2. **Adding New Prompts**: Use the `Prompt` interface and add to `prompts-data.ts`
3. **ID Naming Convention**: Use kebab-case for IDs (e.g., `marketing-strategy`)
4. **Icon Selection**: Use Lucide React icons for consistency

### For Content Creators
1. **Prompt Quality**: Ensure prompts are specific, actionable, and well-structured
2. **Tagging**: Use relevant tags for better searchability
3. **Examples**: Provide clear examples in subcategory descriptions
4. **Skill Level**: Accurately assess the complexity level

### For Users
1. **Browse by Category**: Start with your industry or field of interest
2. **Filter by Skill Level**: Choose prompts matching your experience
3. **Use Tags**: Search for specific topics or use cases
4. **Combine Prompts**: Mix and match prompts for complex tasks

## File Structure

```
src/
├── data/
│   ├── categories-data.ts    # Category and subcategory definitions
│   ├── prompts-data.ts       # Individual prompt data
│   └── resources-data.ts     # Additional resources
├── pages/categories/
│   ├── CategoriesOverview.tsx
│   ├── SubcategoryDetail.tsx
│   └── [category]/
│       └── [subcategory].tsx
└── components/
    ├── CategorySection.tsx
    ├── SubcategoryCard.tsx
    └── PromptCard.tsx
```

## Best Practices

1. **Consistent Naming**: Use clear, descriptive names for categories and subcategories
2. **Comprehensive Coverage**: Ensure each category covers the full spectrum of use cases
3. **Regular Updates**: Keep prompts current with industry trends and best practices
4. **User Feedback**: Incorporate user suggestions for new categories and prompts
5. **Quality Control**: Review and refine prompts regularly for clarity and effectiveness

## Future Enhancements

- **Dynamic Categories**: Allow user-created categories
- **Prompt Ratings**: User feedback and rating system
- **Advanced Filtering**: Filter by industry, use case, or complexity
- **Prompt Templates**: Reusable prompt templates
- **Integration APIs**: Connect with external AI platforms
- **Analytics Dashboard**: Track prompt usage and effectiveness

---

*This documentation is maintained as part of the AI Prompt Library project. For questions or contributions, please refer to the project repository.* 