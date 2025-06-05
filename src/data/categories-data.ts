import { LucideIcon, Code, Megaphone, GraduationCap, ScrollText, Stethoscope, UserCircle, BarChart2, MessageCircle } from 'lucide-react';

type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface Subcategory {
  id: string;
  name: string;
  description: string;
  examples: string[];
  skillLevel: SkillLevel;
}

interface Category {
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
    description: 'Create engaging content and marketing materials that convert',
    promptCount: 45,
    bgGradient: 'from-purple-600/20 to-pink-600/20',
    featured: true,
    subcategories: [
      {
        id: 'content-creation',
        name: 'Content Creation',
        description: 'Blog posts, articles, and web content',
        examples: ['SEO Blog Posts', 'Product Descriptions', 'Website Copy'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'social-media',
        name: 'Social Media',
        description: 'Engaging social content and campaigns',
        examples: ['Post Series', 'Campaign Ideas', 'Hashtag Strategies'],
        skillLevel: 'Beginner'
      },
      {
        id: 'email-marketing',
        name: 'Email Marketing',
        description: 'Compelling email campaigns and sequences',
        examples: ['Newsletter Templates', 'Sales Sequences', 'Welcome Series'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'ad-copy',
        name: 'Ad Copywriting',
        description: 'Converting ad copy across platforms',
        examples: ['PPC Ads', 'Social Ads', 'Display Ads'],
        skillLevel: 'Advanced'
      }
    ]
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
        skillLevel: 'Beginner'
      },
      {
        id: 'assessment',
        name: 'Assessment Creation',
        description: 'Tests, quizzes, and evaluation tools',
        examples: ['Quiz Questions', 'Rubrics', 'Assessment Criteria'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'student-feedback',
        name: 'Student Feedback',
        description: 'Constructive feedback and guidance',
        examples: ['Progress Reports', 'Performance Reviews', 'Study Tips'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'curriculum-design',
        name: 'Curriculum Design',
        description: 'Complete course and program development',
        examples: ['Course Outlines', 'Module Planning', 'Learning Paths'],
        skillLevel: 'Advanced'
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
        skillLevel: 'Advanced'
      },
      {
        id: 'documentation',
        name: 'Documentation',
        description: 'Technical documentation and guides',
        examples: ['API Docs', 'User Guides', 'Code Comments'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'testing',
        name: 'Testing & QA',
        description: 'Test cases and quality assurance',
        examples: ['Unit Tests', 'Test Scenarios', 'Bug Reports'],
        skillLevel: 'Advanced'
      },
      {
        id: 'architecture',
        name: 'Architecture & Design',
        description: 'System design and architecture',
        examples: ['Design Patterns', 'Architecture Docs', 'System Diagrams'],
        skillLevel: 'Advanced'
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
        skillLevel: 'Beginner'
      },
      {
        id: 'issue-resolution',
        name: 'Issue Resolution',
        description: 'Problem-solving and troubleshooting',
        examples: ['Solution Guides', 'Escalation Protocols', 'FAQs'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'customer-onboarding',
        name: 'Customer Onboarding',
        description: 'Welcome and setup assistance',
        examples: ['Welcome Emails', 'Setup Guides', 'Tutorials'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'feedback-management',
        name: 'Feedback Management',
        description: 'Handle customer feedback and reviews',
        examples: ['Review Responses', 'Feedback Analysis', 'Survey Design'],
        skillLevel: 'Advanced'
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
        skillLevel: 'Advanced'
      },
      {
        id: 'legal-research',
        name: 'Legal Research',
        description: 'Case law and precedent research',
        examples: ['Case Summaries', 'Legal Analysis', 'Research Memos'],
        skillLevel: 'Advanced'
      },
      {
        id: 'client-communication',
        name: 'Client Communication',
        description: 'Professional legal correspondence',
        examples: ['Client Letters', 'Case Updates', 'Legal Advice'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'compliance',
        name: 'Compliance & Regulation',
        description: 'Regulatory compliance guidance',
        examples: ['Policy Reviews', 'Compliance Checks', 'Risk Assessments'],
        skillLevel: 'Advanced'
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
        skillLevel: 'Beginner'
      },
      {
        id: 'candidate-assessment',
        name: 'Candidate Assessment',
        description: 'Interview and evaluation tools',
        examples: ['Interview Questions', 'Evaluation Forms', 'Skills Tests'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'employee-comms',
        name: 'Employee Communications',
        description: 'Internal communication templates',
        examples: ['Policy Updates', 'Announcements', 'Feedback Forms'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'hr-policy',
        name: 'HR Policies',
        description: 'Policy development and documentation',
        examples: ['Employee Handbook', 'Procedures', 'Guidelines'],
        skillLevel: 'Advanced'
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
        skillLevel: 'Advanced'
      },
      {
        id: 'patient-education',
        name: 'Patient Education',
        description: 'Patient information materials',
        examples: ['Care Instructions', 'Health Guides', 'Medication Info'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'clinical-research',
        name: 'Clinical Research',
        description: 'Research documentation',
        examples: ['Study Protocols', 'Data Analysis', 'Research Reports'],
        skillLevel: 'Advanced'
      },
      {
        id: 'healthcare-comms',
        name: 'Healthcare Communications',
        description: 'Professional medical correspondence',
        examples: ['Referral Letters', 'Case Summaries', 'Team Updates'],
        skillLevel: 'Advanced'
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
        skillLevel: 'Advanced'
      },
      {
        id: 'visualization',
        name: 'Data Visualization',
        description: 'Create compelling data visuals',
        examples: ['Chart Design', 'Dashboard Layout', 'Visual Stories'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'reporting',
        name: 'Reporting',
        description: 'Data-driven report creation',
        examples: ['Executive Reports', 'KPI Updates', 'Performance Analytics'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'ml-prompts',
        name: 'ML & AI',
        description: 'Machine learning workflows',
        examples: ['Model Documentation', 'Feature Engineering', 'Model Evaluation'],
        skillLevel: 'Advanced'
      }
    ]
  }
];
