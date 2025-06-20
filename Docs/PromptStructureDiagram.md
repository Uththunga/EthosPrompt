# Prompt Structure Visual Diagram

## Hierarchical Organization

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              AI PROMPT LIBRARY                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
              ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
              │ CATEGORIES│   │SUBCATEGORIES│   │PROMPT GROUPS│
              └───────────┘   └───────────┘   └───────────┘
                    │               │               │
                    │               │               │
        ┌───────────┼───────────────┼───────────────┼───────────┐
        │           │               │               │           │
   ┌────▼────┐ ┌────▼────┐    ┌────▼────┐    ┌────▼────┐ ┌────▼────┐
   │Marketing│ │Education│    │Software │    │Healthcare│ │Finance  │
   │& Content│ │& Teaching│   │Development│   │         │ │& Investing│
   └─────────┘ └─────────┘    └─────────┘    └─────────┘ └─────────┘
        │           │               │               │           │
        │           │               │               │           │
   ┌────▼────┐ ┌────▼────┐    ┌────▼────┐    ┌────▼────┐ ┌────▼────┐
   │Strategy │ │Lesson   │    │Code     │    │Clinical │ │Market   │
   │Planning │ │Planning │    │Assistance│   │Documentation│ │Research │
   └─────────┘ └─────────┘    └─────────┘    └─────────┘ └─────────┘
        │           │               │               │           │
        │           │               │               │           │
   ┌────▼────┐ ┌────▼────┐    ┌────▼────┐    ┌────▼────┐ ┌────▼────┐
   │Content  │ │Assessment│   │Documentation│ │Patient  │ │Portfolio│
   │Creation │ │Creation │    │           │   │Education│ │Management│
   └─────────┘ └─────────┘    └─────────┘    └─────────┘ └─────────┘
        │           │               │               │           │
        │           │               │               │           │
   ┌────▼────┐ ┌────▼────┐    ┌────▼────┐    ┌────▼────┐ ┌────▼────┐
   │Promotion│ │Student  │    │Testing  │    │Research │ │Planning │
   │& Analytics│ │Feedback │   │& QA     │    │         │ │         │
   └─────────┘ └─────────┘    └─────────┘    └─────────┘ └─────────┘
        │           │               │               │           │
        │           │               │               │           │
   ┌────▼────┐ ┌────▼────┐    ┌────▼────┐    ┌────▼────┐ ┌────▼────┐
   │[Individual│ │[Individual│   │[Individual│   │[Individual│ │[Individual│
   │ Prompts] │ │ Prompts] │   │ Prompts] │   │ Prompts] │ │ Prompts] │
   └─────────┘ └─────────┘    └─────────┘    └─────────┘ └─────────┘
```

## Complete Category Tree

```
📁 AI PROMPT LIBRARY (12 Categories, 1000+ Prompts)
├── 🎯 Marketing & Content (180 prompts)
│   ├── 📊 Marketing Strategy & Planning (Advanced)
│   │   ├── 🔍 Market & Audience Research
│   │   ├── 📋 Campaign Strategy & Briefs
│   │   └── 📈 Content & SEO Planning
│   ├── ✍️ Content Creation & Copywriting (Intermediate)
│   │   ├── 📝 Long-Form Content
│   │   ├── 📱 Social Media Content
│   │   └── 📧 Email & Ad Copy
│   ├── 📢 Content Promotion & Distribution (Intermediate)
│   │   ├── 📰 Press & Media Outreach
│   │   ├── 🤝 Influencer & Partner Collaboration
│   │   └── 🔄 Content Repurposing
│   └── 📊 Performance & Analytics (Advanced)
│       ├── 📈 Data Analysis & Insights
│       ├── 📋 Performance Reporting
│       └── 🧪 A/B Testing & Optimization
│
├── 🎬 Digital Creators (230 prompts)
│   ├── 💡 Content & Ideation (Beginner)
│   │   ├── 🚀 Idea Generation
│   │   ├── 📝 Scriptwriting & Storytelling
│   │   └── 🎨 Visual Content Creation
│   ├── 👥 Audience Growth & Engagement (Intermediate)
│   │   ├── 🎣 Captions & Hooks
│   │   ├── 🏘️ Community Management
│   │   └── 🤝 Collaboration & Outreach
│   └── ⚙️ Strategy & Operations (Advanced)
│       ├── 🔄 Content Repurposing
│       ├── 💰 Monetization Strategies
│       └── 📊 Performance Analytics
│
├── 🎓 Education & Teaching (38 prompts)
│   ├── 📚 Lesson Planning (Beginner)
│   │   ├── 📖 Lesson Plans
│   │   ├── 🎯 Activity Design
│   │   ├── 📋 Instructional Materials
│   │   └── 🎨 Differentiation Strategies
│   ├── ✅ Assessment Creation (Intermediate)
│   │   ├── 📝 Formative Assessments
│   │   ├── 📊 Summative Assessments
│   │   ├── 📋 Rubrics & Scoring Guides
│   │   └── ❓ Test Bank Questions
│   ├── 💬 Student Feedback (Intermediate)
│   │   ├── ✍️ Written Feedback
│   │   ├── 📈 Progress Reports
│   │   ├── 🎯 Goal Setting
│   │   └── 📚 Study Strategies
│   └── 🏗️ Curriculum Design (Advanced)
│       ├── 📋 Course Outlines
│       ├── 🎯 Learning Objectives
│       ├── 📅 Scope & Sequence
│       └── 🗺️ Curriculum Mapping
│
├── 💻 Software Development (42 prompts)
│   ├── 🔧 Code Assistance (Advanced)
│   │   ├── ⚡ Code Generation
│   │   ├── 🐛 Debugging Help
│   │   ├── 👀 Code Review
│   │   └── 🔄 Refactoring
│   ├── 📚 Documentation (Intermediate)
│   │   ├── 🔌 API Documentation
│   │   ├── 💬 Code Comments
│   │   ├── 📖 Tutorials & Guides
│   │   └── 📋 Technical Specifications
│   ├── 🧪 Testing & QA (Advanced)
│   │   ├── 🧩 Unit Testing
│   │   ├── 🔗 Integration Testing
│   │   ├── 📋 Test Scenarios
│   │   └── 🤖 Test Automation
│   └── 🏗️ Architecture & Design (Advanced)
│       ├── 🏛️ System Design
│       ├── 🎨 Design Patterns
│       ├── 📐 Architecture Diagrams
│       └── 🛠️ Tech Stack Selection
│
├── 💬 Customer Support (35 prompts)
│   ├── 📝 Response Templates (Beginner)
│   │   ├── 📧 Email Templates
│   │   ├── 💬 Chat Responses
│   │   ├── 📞 Phone Scripts
│   │   └── 📚 Knowledge Base Articles
│   ├── 🔧 Issue Resolution (Intermediate)
│   │   ├── 🔍 Troubleshooting Guides
│   │   ├── 💡 Common Solutions
│   │   ├── ⬆️ Escalation Procedures
│   │   └── 🔧 Technical Troubleshooting
│   ├── 🚀 Customer Onboarding (Intermediate)
│   │   ├── 👋 Welcome Sequences
│   │   ├── 📖 Setup Guides
│   │   ├── 🎯 Product Tours
│   │   └── ✅ Onboarding Checklists
│   └── 📊 Feedback Management (Advanced)
│       ├── ⭐ Review Responses
│       ├── 📈 Feedback Analysis
│       ├── 📋 Survey Design
│       └── 😊 Customer Satisfaction
│
├── ⚖️ Legal Services (32 prompts)
│   ├── 📄 Document Drafting (Advanced)
│   │   ├── 📜 Contracts
│   │   ├── 🤝 Agreements
│   │   ├── 📢 Legal Notices
│   │   └── 📋 Legal Pleadings
│   ├── 🔍 Legal Research (Advanced)
│   │   ├── 📚 Case Summaries
│   │   ├── 📝 Legal Memos
│   │   ├── ⚖️ Statutory Analysis
│   │   └── 🔍 Precedent Research
│   ├── 💬 Client Communication (Intermediate)
│   │   ├── 📧 Client Letters
│   │   ├── 📊 Case Updates
│   │   ├── 💭 Legal Opinions
│   │   └── 🤝 Client Meeting Preparation
│   └── 📋 Compliance & Regulation (Advanced)
│       ├── 📋 Policy Reviews
│       ├── 🔍 Compliance Audits
│       ├── ⚠️ Risk Assessments
│       └── 📢 Regulatory Updates
│
├── 👥 HR & Recruitment (30 prompts)
│   ├── 💼 Job Descriptions (Beginner)
│   │   ├── 👤 Role Descriptions
│   │   ├── 📋 Job Postings
│   │   ├── ✅ Job Requirements
│   │   └── 💰 Compensation & Benefits
│   ├── 🎯 Candidate Assessment (Intermediate)
│   │   ├── ❓ Interview Questions
│   │   ├── 📋 Evaluation Forms
│   │   ├── 🧠 Skills Assessments
│   │   └── 📊 Candidate Evaluation
│   ├── 💬 Employee Communications (Intermediate)
│   │   ├── 📢 Company Announcements
│   │   ├── 📋 Policy Updates
│   │   ├── 💭 Employee Feedback
│   │   └── 🏆 Recognition Communications
│   └── 📋 HR Policies (Advanced)
│       ├── 📖 Employee Handbook
│       ├── 📋 HR Procedures
│       ├── ⚖️ Compliance Policies
│       └── 📋 Workplace Guidelines
│
├── 🏥 Healthcare (28 prompts)
│   ├── 📋 Clinical Documentation (Advanced)
│   │   ├── 📝 SOAP Notes
│   │   ├── 🏥 Treatment Plans
│   │   ├── 📈 Progress Notes
│   │   └── 🏥 Discharge Summaries
│   ├── 📚 Patient Education (Intermediate)
│   │   ├── 📖 Condition Guides
│   │   ├── 💊 Medication Instructions
│   │   ├── 🏥 Post-Procedure Care
│   │   └── 🛡️ Preventive Care
│   ├── 🔬 Clinical Research (Advanced)
│   │   ├── 📋 Study Protocols
│   │   ├── 📝 Research Proposals
│   │   ├── 📊 Data Analysis
│   │   └── 📄 Publication Preparation
│   └── 💬 Healthcare Communications (Advanced)
│       ├── 📧 Referral Letters
│       ├── 📋 Case Summaries
│       ├── 👥 Interdisciplinary Communications
│       └── 👤 Patient Communications
│
├── 📊 Data Science & Analysis (34 prompts)
│   ├── 🔍 Data Analysis (Advanced)
│   │   ├── 🧹 Data Cleaning
│   │   ├── 🔍 Exploratory Analysis
│   │   ├── 📊 Statistical Testing
│   │   └── 📈 Trend Analysis
│   ├── 📊 Data Visualization (Intermediate)
│   │   ├── 📈 Chart Design
│   │   ├── 📊 Dashboard Creation
│   │   ├── 📖 Data Storytelling
│   │   └── 🎨 Interactive Visuals
│   ├── 📋 Reporting (Intermediate)
│   │   ├── 📊 Executive Summaries
│   │   ├── 📈 KPI Dashboards
│   │   ├── 📊 Performance Reports
│   │   └── 💡 Data Insights
│   └── 🤖 Machine Learning (Advanced)
│       ├── 🎯 Model Training
│       ├── 🔧 Feature Engineering
│       ├── 📊 Model Evaluation
│       └── 🚀 MLOps
│
├── 💰 Finance & Investing (120 prompts)
│   ├── 📈 Market Research & Analysis (Advanced)
│   │   ├── 📊 Equity Research
│   │   ├── 📈 Sector Outlooks
│   │   └── 🌍 Macro Trends
│   ├── 💼 Portfolio Management (Intermediate)
│   │   ├── 📊 Asset Allocation
│   │   ├── ⚠️ Risk Assessment
│   │   └── ⚖️ Rebalancing Plans
│   ├── 📋 Financial Planning (Beginner)
│   │   ├── 🎯 Goal Planning
│   │   ├── 🏖️ Retirement Models
│   │   └── 💰 Budget Worksheets
│   └── 📊 Reporting & Compliance (Advanced)
│       ├── 📋 Client Reports
│       ├── 📄 Reg Filings
│       └── 📊 KPI Dashboards
│
├── 🛒 E-commerce & Retail (90 prompts)
│   ├── 📝 Product Listing & SEO (Beginner)
│   │   ├── 📋 Title Generation
│   │   ├── 🔍 Keyword Research
│   │   └── 📝 Description Builder
│   ├── 🎯 CRO & UX (Intermediate)
│   │   ├── 🧪 A/B Hypotheses
│   │   ├── ✍️ UX Copy
│   │   └── 🛒 Checkout Flow
│   ├── 💝 Customer Retention (Intermediate)
│   │   ├── 📧 Email Sequences
│   │   ├── 🎁 Loyalty Ideas
│   │   └── 🔄 Re-engagement
│   └── 📦 Operations & Supply (Advanced)
│       ├── 📊 Demand Forecasting
│       ├── 📧 Supplier Emails
│       └── ⚠️ Restock Alerts
│
└── 🚀 Technology & SaaS (110 prompts)
    ├── 🎯 Product Strategy (Advanced)
    │   ├── 📋 PRDs
    │   ├── 🎯 Feature Prioritization
    │   └── 🗺️ Roadmap Themes
    ├── 🚀 Onboarding & Adoption (Intermediate)
    │   ├── 📖 User Guides
    │   ├── 💬 In-App Messages
    │   └── 🎬 Walkthrough Scripts
    ├── 💼 Customer Success (Intermediate)
    │   ├── 📊 Health Scoring
    │   ├── 📋 QBR Outlines
    │   └── 📈 Churn Insights
    └── 👨‍💻 Developer Relations (Advanced)
        ├── ⚡ Quick-Starts
        ├── 💻 Sample Code
        └── 💬 Community Posts
```

## Data Flow Structure

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   categories-   │    │   prompts-      │    │   UI Components │
│   data.ts       │    │   data.ts       │    │                 │
│                 │    │                 │    │                 │
│ • Category[]    │───▶│ • Prompt[]      │───▶│ • CategorySection│
│ • Subcategory[] │    │ • categoryId    │    │ • SubcategoryCard│
│ • PromptGroup[] │    │ • subcategoryId │    │ • PromptCard     │
└─────────────────┘    │ • promptGroupId │    └─────────────────┘
                       └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Pages         │
                       │                 │
                       │ • CategoriesOverview│
                       │ • SubcategoryDetail│
                       │ • CategoryPage  │
                       └─────────────────┘
```

## Skill Level Distribution

```
Beginner (🟢)     Intermediate (🟡)     Advanced (🔴)
     │                   │                   │
     │                   │                   │
  ┌──┴──┐            ┌──┴──┐            ┌──┴──┐
  │     │            │     │            │     │
  │ 6   │            │ 7   │            │ 9   │
  │Categories│       │Categories│       │Categories│
  │     │            │     │            │     │
  └─────┘            └─────┘            └─────┘
```

## File Organization

```
src/
├── data/
│   ├── categories-data.ts    # Category definitions
│   ├── prompts-data.ts       # Prompt definitions
│   └── resources-data.ts     # Additional resources
├── pages/categories/
│   ├── CategoriesOverview.tsx
│   ├── SubcategoryDetail.tsx
│   └── [category]/
│       └── [subcategory].tsx
└── components/
    ├── CategorySection.tsx
    ├── SubcategoryCard.tsx
    ├── PromptCard.tsx
    └── PromptCardSkeleton.tsx
```

---

*This diagram shows the complete hierarchical structure of the AI Prompt Library system.* 