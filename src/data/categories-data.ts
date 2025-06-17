import { LucideIcon, Code, Megaphone, GraduationCap, ScrollText, Stethoscope, UserCircle, BarChart2, MessageCircle, Video, DollarSign, ShoppingCart, Server } from 'lucide-react';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface PromptGroup {
  id: string;
  name: string;
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  examples: string[];
  skillLevel: SkillLevel;
  promptGroups?: PromptGroup[];
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  promptCount: number;
  subcategories: Subcategory[];
  bgGradient: string;
  trending?: boolean;
  featured?: boolean;
}

export const categories: Category[] = [
  {
    id: 'marketing',
    name: 'Marketing & Content',
    icon: Megaphone,
    description: 'Drive growth with AI-powered strategies, from planning and creation to promotion and analytics.',
    promptCount: 180,
    bgGradient: 'from-purple-600/20 to-pink-600/20',
    featured: true,
    subcategories: [
      {
        id: 'marketing-strategy-planning',
        name: 'Marketing Strategy & Planning',
        description: 'Develop comprehensive marketing strategies, define target audiences, and plan campaigns.',
        examples: ['Develop a Q3 marketing plan.', 'Define the target audience for a new SaaS product.'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'market-audience-research', name: 'Market & Audience Research' },
          { id: 'campaign-strategy-briefs', name: 'Campaign Strategy & Briefs' },
          { id: 'content-seo-planning', name: 'Content & SEO Planning' },
        ],
      },
      {
        id: 'content-creation-copywriting',
        name: 'Content Creation & Copywriting',
        description: 'Generate high-quality content for various platforms, from blog posts to ad copy.',
        examples: ['Write a 1000-word blog post on AI in marketing.', 'Generate 5 ad headlines for a new sneaker launch.'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'long-form-content', name: 'Long-Form Content' },
          { id: 'social-media-content', name: 'Social Media Content' },
          { id: 'email-ad-copy', name: 'Email & Ad Copy' },
        ],
      },
      {
        id: 'content-promotion-distribution',
        name: 'Content Promotion & Distribution',
        description: 'Amplify your content\'s reach through strategic promotion and outreach.',
        examples: ['Draft a press release for our new funding round.', 'Write an outreach email to a potential collaborator.'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'press-media-outreach', name: 'Press & Media Outreach' },
          { id: 'influencer-partner-collaboration', name: 'Influencer & Partner Collaboration' },
          { id: 'content-repurposing', name: 'Content Repurposing' },
        ],
      },
      {
        id: 'performance-analytics',
        name: 'Performance & Analytics',
        description: 'Measure campaign success, analyze data, and generate reports to optimize future efforts.',
        examples: ['Analyze this customer survey data for key insights.', 'Create a monthly marketing KPI report.'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'data-analysis-insights', name: 'Data Analysis & Insights' },
          { id: 'performance-reporting', name: 'Performance Reporting' },
          { id: 'ab-testing-optimization', name: 'A/B Testing & Optimization' },
        ],
      },
    ],
  },
  {
    id: 'digital-creators',
    name: 'Digital Creators',
    icon: Video,
    description: 'Supercharge your content with AI-driven tools for ideation, creation, and growth.',
    promptCount: 230,
    bgGradient: 'from-purple-600/20 to-indigo-600/20',
    featured: true,
    subcategories: [
      {
        id: 'content-creation-ideation',
        name: 'Content & Ideation',
        description: 'Brainstorm fresh ideas, craft compelling narratives, and design stunning visuals.',
        examples: ['Generate 10 viral video ideas for a cooking channel.', 'Write a 60-second video script about meditation.'],
        skillLevel: 'Beginner',
        promptGroups: [
          { id: 'idea-generation', name: 'Idea Generation' },
          { id: 'scriptwriting-storytelling', name: 'Scriptwriting & Storytelling' },
          { id: 'visual-content-creation', name: 'Visual Content Creation' },
        ],
      },
      {
        id: 'audience-growth-engagement',
        name: 'Audience Growth & Engagement',
        description: 'Expand your reach, foster a loyal community, and build meaningful connections.',
        examples: ['Write 3 engaging Instagram captions for a photo of a sunset.', 'Draft a response to a negative comment.'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'captions-hooks', name: 'Captions & Hooks' },
          { id: 'community-management', name: 'Community Management' },
          { id: 'collaboration-outreach', name: 'Collaboration & Outreach' },
        ],
      },
      {
        id: 'strategy-operations',
        name: 'Strategy & Operations',
        description: 'Optimize your workflow, analyze performance, and turn your passion into a business.',
        examples: ['Turn a blog post about healthy eating into a Twitter thread.', 'List 5 ways a travel blogger can monetize their content.'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'content-repurposing', name: 'Content Repurposing' },
          { id: 'monetization-strategies', name: 'Monetization Strategies' },
          { id: 'performance-analytics', name: 'Performance Analytics' },
        ],
      },
    ],
  },
  {
    id: 'education',
    name: 'Education & Teaching',
    icon: GraduationCap,
    description: 'Design effective learning materials and curricula',
    promptCount: 38,
    bgGradient: 'from-blue-600/20 to-cyan-600/20',
    trending: true,
    subcategories: [
      {
        id: 'lesson-planning',
        name: 'Lesson Planning',
        description: 'Structured lesson plans and materials',
        examples: ['Unit Plans', 'Activity Designs', 'Learning Objectives'],
        skillLevel: 'Beginner',
        promptGroups: [
          { id: 'lesson-plans', name: 'Lesson Plans' },
          { id: 'activity-design', name: 'Activity Design' },
          { id: 'instructional-materials', name: 'Instructional Materials' },
          { id: 'differentiation-strategies', name: 'Differentiation Strategies' }
        ]
      },
      {
        id: 'assessment',
        name: 'Assessment Creation',
        description: 'Tests, quizzes, and evaluation tools',
        examples: ['Quiz Questions', 'Rubrics', 'Assessment Criteria'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'formative-assessments', name: 'Formative Assessments' },
          { id: 'summative-assessments', name: 'Summative Assessments' },
          { id: 'rubrics-scoring-guides', name: 'Rubrics & Scoring Guides' },
          { id: 'test-bank-questions', name: 'Test Bank Questions' }
        ]
      },
      {
        id: 'student-feedback',
        name: 'Student Feedback',
        description: 'Constructive feedback and guidance',
        examples: ['Progress Reports', 'Performance Reviews', 'Study Tips'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'written-feedback', name: 'Written Feedback' },
          { id: 'progress-reports', name: 'Progress Reports' },
          { id: 'goal-setting', name: 'Goal Setting' },
          { id: 'study-strategies', name: 'Study Strategies' }
        ]
      },
      {
        id: 'curriculum-design',
        name: 'Curriculum Design',
        description: 'Complete course and program development',
        examples: ['Course Outlines', 'Module Planning', 'Learning Paths'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'course-outlines', name: 'Course Outlines' },
          { id: 'learning-objectives', name: 'Learning Objectives' },
          { id: 'scope-sequence', name: 'Scope & Sequence' },
          { id: 'curriculum-mapping', name: 'Curriculum Mapping' }
        ]
      }
    ]
  },
  {
    id: 'development',
    name: 'Software Development',
    icon: Code,
    description: 'Code generation, documentation, and technical writing',
    promptCount: 42,
    bgGradient: 'from-emerald-600/20 to-teal-600/20',
    featured: true,
    subcategories: [
      {
        id: 'code-assistance',
        name: 'Code Assistance',
        description: 'Code generation and problem-solving',
        examples: ['Function Generation', 'Bug Fixing', 'Code Optimization'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'code-generation', name: 'Code Generation' },
          { id: 'debugging-help', name: 'Debugging Help' },
          { id: 'code-review', name: 'Code Review' },
          { id: 'refactoring', name: 'Refactoring' }
        ]
      },
      {
        id: 'documentation',
        name: 'Documentation',
        description: 'Technical documentation and guides',
        examples: ['API Docs', 'User Guides', 'Code Comments'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'api-documentation', name: 'API Documentation' },
          { id: 'code-comments', name: 'Code Comments' },
          { id: 'tutorials-guides', name: 'Tutorials & Guides' },
          { id: 'technical-specs', name: 'Technical Specifications' }
        ]
      },
      {
        id: 'testing',
        name: 'Testing & QA',
        description: 'Test cases and quality assurance',
        examples: ['Unit Tests', 'Test Scenarios', 'Bug Reports'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'unit-testing', name: 'Unit Testing' },
          { id: 'integration-testing', name: 'Integration Testing' },
          { id: 'test-scenarios', name: 'Test Scenarios' },
          { id: 'test-automation', name: 'Test Automation' }
        ]
      },
      {
        id: 'architecture',
        name: 'Architecture & Design',
        description: 'System design and architecture',
        examples: ['Design Patterns', 'Architecture Docs', 'System Diagrams'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'system-design', name: 'System Design' },
          { id: 'design-patterns', name: 'Design Patterns' },
          { id: 'architecture-diagrams', name: 'Architecture Diagrams' },
          { id: 'tech-stack-selection', name: 'Tech Stack Selection' }
        ]
      }
    ]
  },
  {
    id: 'support',
    name: 'Customer Support',
    icon: MessageCircle,
    description: 'Enhance customer service and support operations',
    promptCount: 35,
    bgGradient: 'from-orange-600/20 to-yellow-600/20',
    subcategories: [
      {
        id: 'response-templates',
        name: 'Response Templates',
        description: 'Professional customer communication',
        examples: ['Email Templates', 'Chat Responses', 'Support Scripts'],
        skillLevel: 'Beginner',
        promptGroups: [
          { id: 'email-templates', name: 'Email Templates' },
          { id: 'chat-responses', name: 'Chat Responses' },
          { id: 'phone-scripts', name: 'Phone Scripts' },
          { id: 'knowledge-base-articles', name: 'Knowledge Base Articles' }
        ]
      },
      {
        id: 'issue-resolution',
        name: 'Issue Resolution',
        description: 'Problem-solving and troubleshooting',
        examples: ['Solution Guides', 'Escalation Protocols', 'FAQs'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'troubleshooting-guides', name: 'Troubleshooting Guides' },
          { id: 'common-solutions', name: 'Common Solutions' },
          { id: 'escalation-procedures', name: 'Escalation Procedures' },
          { id: 'technical-troubleshooting', name: 'Technical Troubleshooting' }
        ]
      },
      {
        id: 'customer-onboarding',
        name: 'Customer Onboarding',
        description: 'Welcome and setup assistance',
        examples: ['Welcome Emails', 'Setup Guides', 'Tutorials'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'welcome-sequences', name: 'Welcome Sequences' },
          { id: 'setup-guides', name: 'Setup Guides' },
          { id: 'product-tours', name: 'Product Tours' },
          { id: 'onboarding-checklists', name: 'Onboarding Checklists' }
        ]
      },
      {
        id: 'feedback-management',
        name: 'Feedback Management',
        description: 'Handle customer feedback and reviews',
        examples: ['Review Responses', 'Feedback Analysis', 'Survey Design'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'review-responses', name: 'Review Responses' },
          { id: 'feedback-analysis', name: 'Feedback Analysis' },
          { id: 'survey-design', name: 'Survey Design' },
          { id: 'customer-satisfaction', name: 'Customer Satisfaction' }
        ]
      }
    ]
  },
  {
    id: 'legal',
    name: 'Legal Services',
    icon: ScrollText,
    description: 'Legal document creation and analysis',
    promptCount: 32,
    bgGradient: 'from-slate-600/20 to-zinc-600/20',
    subcategories: [
      {
        id: 'document-drafting',
        name: 'Document Drafting',
        description: 'Legal document preparation',
        examples: ['Contracts', 'Agreements', 'Legal Notices'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'contracts', name: 'Contracts' },
          { id: 'agreements', name: 'Agreements' },
          { id: 'legal-notices', name: 'Legal Notices' },
          { id: 'legal-pleadings', name: 'Legal Pleadings' }
        ]
      },
      {
        id: 'legal-research',
        name: 'Legal Research',
        description: 'Case law and precedent research',
        examples: ['Case Summaries', 'Legal Analysis', 'Research Memos'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'case-summaries', name: 'Case Summaries' },
          { id: 'legal-memos', name: 'Legal Memos' },
          { id: 'statutory-analysis', name: 'Statutory Analysis' },
          { id: 'precedent-research', name: 'Precedent Research' }
        ]
      },
      {
        id: 'client-communication',
        name: 'Client Communication',
        description: 'Professional legal correspondence',
        examples: ['Client Letters', 'Case Updates', 'Legal Advice'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'client-letters', name: 'Client Letters' },
          { id: 'case-updates', name: 'Case Updates' },
          { id: 'legal-opinions', name: 'Legal Opinions' },
          { id: 'client-meeting-preparation', name: 'Client Meeting Preparation' }
        ]
      },
      {
        id: 'compliance',
        name: 'Compliance & Regulation',
        description: 'Regulatory compliance guidance',
        examples: ['Policy Reviews', 'Compliance Checks', 'Risk Assessments'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'policy-reviews', name: 'Policy Reviews' },
          { id: 'compliance-audits', name: 'Compliance Audits' },
          { id: 'risk-assessments', name: 'Risk Assessments' },
          { id: 'regulatory-updates', name: 'Regulatory Updates' }
        ]
      }
    ]
  },
  {
    id: 'hr',
    name: 'HR & Recruitment',
    icon: UserCircle,
    description: 'Streamline hiring and HR processes',
    promptCount: 30,
    bgGradient: 'from-violet-600/20 to-indigo-600/20',
    trending: true,
    subcategories: [
      {
        id: 'job-descriptions',
        name: 'Job Descriptions',
        description: 'Compelling job postings',
        examples: ['Role Descriptions', 'Requirements', 'Benefits'],
        skillLevel: 'Beginner',
        promptGroups: [
          { id: 'role-descriptions', name: 'Role Descriptions' },
          { id: 'job-postings', name: 'Job Postings' },
          { id: 'job-requirements', name: 'Job Requirements' },
          { id: 'compensation-benefits', name: 'Compensation & Benefits' }
        ]
      },
      {
        id: 'candidate-assessment',
        name: 'Candidate Assessment',
        description: 'Interview and evaluation tools',
        examples: ['Interview Questions', 'Evaluation Forms', 'Skills Tests'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'interview-questions', name: 'Interview Questions' },
          { id: 'evaluation-forms', name: 'Evaluation Forms' },
          { id: 'skills-assessments', name: 'Skills Assessments' },
          { id: 'candidate-evaluation', name: 'Candidate Evaluation' }
        ]
      },
      {
        id: 'employee-comms',
        name: 'Employee Communications',
        description: 'Internal communication templates',
        examples: ['Policy Updates', 'Announcements', 'Feedback Forms'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'company-announcements', name: 'Company Announcements' },
          { id: 'policy-updates', name: 'Policy Updates' },
          { id: 'employee-feedback', name: 'Employee Feedback' },
          { id: 'recognition-communications', name: 'Recognition Communications' }
        ]
      },
      {
        id: 'hr-policy',
        name: 'HR Policies',
        description: 'Policy development and documentation',
        examples: ['Employee Handbook', 'Procedures', 'Guidelines'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'employee-handbook', name: 'Employee Handbook' },
          { id: 'hr-procedures', name: 'HR Procedures' },
          { id: 'compliance-policies', name: 'Compliance Policies' },
          { id: 'workplace-guidelines', name: 'Workplace Guidelines' }
        ]
      }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Stethoscope,
    description: 'Clinical documentation and patient care',
    promptCount: 28,
    bgGradient: 'from-red-600/20 to-rose-600/20',
    subcategories: [
      {
        id: 'clinical-notes',
        name: 'Clinical Documentation',
        description: 'Medical records and notes',
        examples: ['Patient Notes', 'Treatment Plans', 'Progress Reports'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'soap-notes', name: 'SOAP Notes' },
          { id: 'treatment-plans', name: 'Treatment Plans' },
          { id: 'progress-notes', name: 'Progress Notes' },
          { id: 'discharge-summaries', name: 'Discharge Summaries' }
        ]
      },
      {
        id: 'patient-education',
        name: 'Patient Education',
        description: 'Patient information materials',
        examples: ['Care Instructions', 'Health Guides', 'Medication Info'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'condition-guides', name: 'Condition Guides' },
          { id: 'medication-instructions', name: 'Medication Instructions' },
          { id: 'post-procedure-care', name: 'Post-Procedure Care' },
          { id: 'preventive-care', name: 'Preventive Care' }
        ]
      },
      {
        id: 'clinical-research',
        name: 'Clinical Research',
        description: 'Research documentation',
        examples: ['Study Protocols', 'Data Analysis', 'Research Reports'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'study-protocols', name: 'Study Protocols' },
          { id: 'research-proposals', name: 'Research Proposals' },
          { id: 'data-analysis', name: 'Data Analysis' },
          { id: 'publication-preparation', name: 'Publication Preparation' }
        ]
      },
      {
        id: 'healthcare-comms',
        name: 'Healthcare Communications',
        description: 'Professional medical correspondence',
        examples: ['Referral Letters', 'Case Summaries', 'Team Updates'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'referral-letters', name: 'Referral Letters' },
          { id: 'case-summaries', name: 'Case Summaries' },
          { id: 'interdisciplinary-communications', name: 'Interdisciplinary Communications' },
          { id: 'patient-communications', name: 'Patient Communications' }
        ]
      }
    ]
  },
  {
    id: 'data-science',
    name: 'Data Science & Analysis',
    icon: BarChart2,
    description: 'Data analysis and insights generation',
    promptCount: 34,
    bgGradient: 'from-cyan-600/20 to-blue-600/20',
    featured: true,
    subcategories: [
      {
        id: 'data-analysis',
        name: 'Data Analysis',
        description: 'Statistical analysis and insights',
        examples: ['Data Cleaning', 'Statistical Tests', 'Trend Analysis'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'data-cleaning', name: 'Data Cleaning' },
          { id: 'exploratory-analysis', name: 'Exploratory Analysis' },
          { id: 'statistical-testing', name: 'Statistical Testing' },
          { id: 'trend-analysis', name: 'Trend Analysis' }
        ]
      },
      {
        id: 'visualization',
        name: 'Data Visualization',
        description: 'Create compelling data visuals',
        examples: ['Chart Design', 'Dashboard Layout', 'Visual Stories'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'chart-design', name: 'Chart Design' },
          { id: 'dashboard-creation', name: 'Dashboard Creation' },
          { id: 'data-storytelling', name: 'Data Storytelling' },
          { id: 'interactive-visuals', name: 'Interactive Visuals' }
        ]
      },
      {
        id: 'reporting',
        name: 'Reporting',
        description: 'Data-driven report creation',
        examples: ['Executive Reports', 'KPI Updates', 'Performance Analytics'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'executive-summaries', name: 'Executive Summaries' },
          { id: 'kpi-dashboards', name: 'KPI Dashboards' },
          { id: 'performance-reports', name: 'Performance Reports' },
          { id: 'data-insights', name: 'Data Insights' }
        ]
      },
      {
        id: 'ml-prompts',
        name: 'Machine Learning',
        description: 'ML model development and analysis',
        examples: ['Model Training', 'Feature Engineering', 'Model Evaluation'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'model-training', name: 'Model Training' },
          { id: 'feature-engineering', name: 'Feature Engineering' },
          { id: 'model-evaluation', name: 'Model Evaluation' },
          { id: 'mlops', name: 'MLOps' }
        ]
      }
    ]
  },
  {
    id: 'finance',
    name: 'Finance & Investing',
    icon: DollarSign,
    description: 'Empower analysts, advisors, and investors with AI-driven research, planning, and reporting tools.',
    promptCount: 120,
    bgGradient: 'from-amber-600/20 to-yellow-600/20',
    subcategories: [
      {
        id: 'market-research-analysis',
        name: 'Market Research & Analysis',
        description: 'Equity, sector, and macro-economic analysis.',
        examples: ['Summarize today’s market movers', 'Compare performance of tech vs energy sector', 'Outline macro trends impacting inflation'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'equity-research', name: 'Equity Research' },
          { id: 'sector-outlooks', name: 'Sector Outlooks' },
          { id: 'macro-trends', name: 'Macro Trends' },
        ],
      },
      {
        id: 'portfolio-management',
        name: 'Portfolio Management',
        description: 'Asset allocation, risk analysis, and rebalancing strategies.',
        examples: ['Design a balanced ETF portfolio', 'Estimate portfolio VaR', 'Rebalance a 60/40 allocation'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'asset-allocation', name: 'Asset Allocation' },
          { id: 'risk-assessment', name: 'Risk Assessment' },
          { id: 'rebalancing-plans', name: 'Rebalancing Plans' },
        ],
      },
      {
        id: 'financial-planning',
        name: 'Financial Planning',
        description: 'Goal-based planning, retirement, and budgeting frameworks.',
        examples: ['Create a retirement plan for a 35-year-old', 'Draft a monthly budget worksheet', 'Estimate savings needed for college fund'],
        skillLevel: 'Beginner',
        promptGroups: [
          { id: 'goal-planning', name: 'Goal Planning' },
          { id: 'retirement-models', name: 'Retirement Models' },
          { id: 'budget-worksheets', name: 'Budget Worksheets' },
        ],
      },
      {
        id: 'reporting-compliance',
        name: 'Reporting & Compliance',
        description: 'Performance reports, regulatory filings, and summaries.',
        examples: ['Draft a quarterly performance report', 'Generate an SEC filing summary', 'Create KPI dashboard outline'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'client-reports', name: 'Client Reports' },
          { id: 'reg-filings', name: 'Reg Filings' },
          { id: 'kpi-dashboards', name: 'KPI Dashboards' },
        ],
      },
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Retail',
    icon: ShoppingCart,
    description: 'Optimize online stores and retail operations with conversion-focused AI prompts.',
    promptCount: 90,
    bgGradient: 'from-fuchsia-600/20 to-rose-600/20',
    subcategories: [
      {
        id: 'product-listing-seo',
        name: 'Product Listing & SEO',
        description: 'Titles, descriptions, and keyword research.',
        examples: ['Write an SEO-friendly product description', 'Generate keyword list for handmade candles', 'Optimize title length for Amazon'],
        skillLevel: 'Beginner',
        promptGroups: [
          { id: 'title-generation', name: 'Title Generation' },
          { id: 'keyword-research', name: 'Keyword Research' },
          { id: 'description-builder', name: 'Description Builder' },
        ],
      },
      {
        id: 'cro-ux',
        name: 'CRO & UX',
        description: 'A/B ideas, layout suggestions, and checkout optimization.',
        examples: ['Suggest A/B tests to reduce cart abandonment', 'Rewrite checkout headline', 'Propose UX improvements for mobile'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'ab-hypotheses', name: 'A/B Hypotheses' },
          { id: 'ux-copy', name: 'UX Copy' },
          { id: 'checkout-flow', name: 'Checkout Flow' },
        ],
      },
      {
        id: 'customer-retention',
        name: 'Customer Retention',
        description: 'Loyalty programs, email flows, and win-back campaigns.',
        examples: ['Draft a post-purchase email sequence', 'Design loyalty program tiers', 'Create win-back campaign copy'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'email-sequences', name: 'Email Sequences' },
          { id: 'loyalty-ideas', name: 'Loyalty Ideas' },
          { id: 'reengagement', name: 'Re-engagement' },
        ],
      },
      {
        id: 'operations-supply',
        name: 'Operations & Supply',
        description: 'Inventory forecasts and supplier communication.',
        examples: ['Forecast Q4 inventory', 'Write supplier restock email', 'Generate demand planning report'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'demand-forecasting', name: 'Demand Forecasting' },
          { id: 'supplier-emails', name: 'Supplier Emails' },
          { id: 'restock-alerts', name: 'Restock Alerts' },
        ],
      },
    ],
  },
  {
    id: 'technology',
    name: 'Technology & SaaS',
    icon: Server,
    description: 'Accelerate product-led growth with prompts for roadmap planning, onboarding, and customer success.',
    promptCount: 110,
    bgGradient: 'from-sky-600/20 to-indigo-600/20',
    subcategories: [
      {
        id: 'product-strategy',
        name: 'Product Strategy',
        description: 'Vision docs, PRDs, and feature prioritization.',
        examples: ['Draft a PRD for real-time collaboration', 'Prioritize features for Q3 roadmap', 'Write product vision statement'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'prds', name: 'PRDs' },
          { id: 'feature-prioritization', name: 'Feature Prioritization' },
          { id: 'roadmap-themes', name: 'Roadmap Themes' },
        ],
      },
      {
        id: 'onboarding-adoption',
        name: 'Onboarding & Adoption',
        description: 'Tutorials, in-app messaging, and walkthrough scripts.',
        examples: ['Write onboarding checklist', 'Create in-app tooltip copy', 'Design walkthrough script'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'user-guides', name: 'User Guides' },
          { id: 'inapp-messages', name: 'In-App Messages' },
          { id: 'walkthrough-scripts', name: 'Walkthrough Scripts' },
        ],
      },
      {
        id: 'customer-success',
        name: 'Customer Success',
        description: 'QBRs, health scoring, and churn analysis.',
        examples: ['Generate QBR outline', 'Create customer health score rubric', 'List churn risk indicators'],
        skillLevel: 'Intermediate',
        promptGroups: [
          { id: 'health-scoring', name: 'Health Scoring' },
          { id: 'qbr-outlines', name: 'QBR Outlines' },
          { id: 'churn-insights', name: 'Churn Insights' },
        ],
      },
      {
        id: 'developer-relations',
        name: 'Developer Relations',
        description: 'API docs, sample apps, and community engagement.',
        examples: ['Create quick-start guide for REST API', 'Draft sample app tutorial', 'Write community forum post'],
        skillLevel: 'Advanced',
        promptGroups: [
          { id: 'quick-starts', name: 'Quick-Starts' },
          { id: 'sample-code', name: 'Sample Code' },
          { id: 'community-posts', name: 'Community Posts' },
        ],
      },
    ],
  }
];
