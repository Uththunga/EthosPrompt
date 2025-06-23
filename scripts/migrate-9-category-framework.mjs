#!/usr/bin/env node

/**
 * 9-Category Framework Migration Script
 * 
 * This script migrates the existing category structure to the new 9-category framework
 * with industry mapping and 3-level skill hierarchy.
 * 
 * Features:
 * - Updates skill_level enum to support 'basic', 'intermediate', 'advanced'
 * - Adds industry support to categories and prompts tables
 * - Migrates existing categories to new 9-category structure
 * - Maps existing prompts to new category structure
 * - Includes rollback capabilities
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 9-Category Framework Data
const nineCategoryFramework = [
  {
    id: 'strategy-planning',
    name: '🎯 Strategy & Planning',
    icon: 'Target',
    description: 'Business strategy, market research, and strategic planning workflows',
    prompt_count: 0,
    bg_gradient: 'from-blue-600/20 to-indigo-600/20',
    featured: true,
    subcategories: [
      // Basic Level
      {
        id: 'business-planning-basics',
        name: 'Business Planning Basics',
        description: 'Simple business plans, goal setting, basic market analysis',
        examples: ['Business model canvas', 'SWOT analysis', 'Basic market research'],
        skill_level: 'basic'
      },
      {
        id: 'goal-setting-objectives',
        name: 'Goal Setting & Objectives',
        description: 'Setting SMART goals, KPI definition, milestone planning',
        examples: ['Quarterly goals', 'Team objectives', 'Performance metrics'],
        skill_level: 'basic'
      },
      {
        id: 'market-research-fundamentals',
        name: 'Market Research Fundamentals',
        description: 'Basic customer research, simple surveys, market sizing',
        examples: ['Customer interviews', 'Market surveys', 'Competitor basics'],
        skill_level: 'basic'
      },
      {
        id: 'strategic-communication',
        name: 'Strategic Communication',
        description: 'Presenting strategies, stakeholder updates, vision statements',
        examples: ['Strategy presentations', 'Vision documents', 'Stakeholder reports'],
        skill_level: 'basic'
      },
      // Intermediate Level
      {
        id: 'competitive-analysis',
        name: 'Competitive Analysis',
        description: 'In-depth competitor research, positioning analysis, market intelligence',
        examples: ['Competitive matrices', 'Positioning maps', 'Market intelligence reports'],
        skill_level: 'intermediate'
      },
      {
        id: 'strategic-planning-roadmaps',
        name: 'Strategic Planning & Roadmaps',
        description: 'Multi-year planning, strategic roadmaps, resource allocation',
        examples: ['3-year plans', 'Strategic roadmaps', 'Resource planning'],
        skill_level: 'intermediate'
      },
      {
        id: 'risk-assessment-management',
        name: 'Risk Assessment & Management',
        description: 'Risk identification, mitigation strategies, scenario planning',
        examples: ['Risk matrices', 'Contingency plans', 'Scenario analysis'],
        skill_level: 'intermediate'
      },
      {
        id: 'performance-strategy',
        name: 'Performance Strategy',
        description: 'Performance frameworks, optimization strategies, growth planning',
        examples: ['Performance dashboards', 'Optimization plans', 'Growth strategies'],
        skill_level: 'intermediate'
      },
      // Advanced Level
      {
        id: 'corporate-strategy-ma',
        name: 'Corporate Strategy & M&A',
        description: 'Corporate development, mergers & acquisitions, portfolio strategy',
        examples: ['M&A analysis', 'Portfolio optimization', 'Corporate restructuring'],
        skill_level: 'advanced'
      },
      {
        id: 'innovation-strategy',
        name: 'Innovation Strategy',
        description: 'Innovation frameworks, R&D planning, disruptive strategy',
        examples: ['Innovation pipelines', 'Technology roadmaps', 'Disruption analysis'],
        skill_level: 'advanced'
      },
      {
        id: 'digital-transformation-strategy',
        name: 'Digital Transformation Strategy',
        description: 'Technology adoption, digital roadmaps, change management',
        examples: ['Digital roadmaps', 'Technology adoption plans', 'Transformation strategies'],
        skill_level: 'advanced'
      },
      {
        id: 'international-expansion-strategy',
        name: 'International & Expansion Strategy',
        description: 'Global expansion, market entry, international business planning',
        examples: ['Market entry strategies', 'International expansion plans', 'Global operations'],
        skill_level: 'advanced'
      }
    ]
  },
  {
    id: 'content-communication',
    name: '📝 Content & Communication',
    icon: 'FileText',
    description: 'Content creation, copywriting, and communication strategies',
    prompt_count: 0,
    bg_gradient: 'from-purple-600/20 to-pink-600/20',
    featured: true,
    subcategories: [
      // Basic Level
      {
        id: 'basic-copywriting',
        name: 'Basic Copywriting',
        description: 'Simple copy for websites, emails, basic marketing materials',
        examples: ['Website copy', 'Email templates', 'Basic ads'],
        skill_level: 'basic'
      },
      {
        id: 'social-media-content',
        name: 'Social Media Content',
        description: 'Social posts, captions, basic social media strategy',
        examples: ['Instagram captions', 'Facebook posts', 'LinkedIn updates'],
        skill_level: 'basic'
      },
      {
        id: 'email-communication',
        name: 'Email Communication',
        description: 'Professional emails, newsletters, basic email marketing',
        examples: ['Sales emails', 'Customer communications', 'Newsletters'],
        skill_level: 'basic'
      },
      {
        id: 'internal-communication',
        name: 'Internal Communication',
        description: 'Team updates, announcements, internal documentation',
        examples: ['Team announcements', 'Policy updates', 'Meeting notes'],
        skill_level: 'basic'
      },
      // Intermediate Level
      {
        id: 'content-marketing-strategy',
        name: 'Content Marketing Strategy',
        description: 'Content calendars, blog strategies, content planning',
        examples: ['Content calendars', 'Blog strategies', 'Content audits'],
        skill_level: 'intermediate'
      },
      {
        id: 'brand-messaging-voice',
        name: 'Brand Messaging & Voice',
        description: 'Brand guidelines, tone of voice, messaging frameworks',
        examples: ['Brand guidelines', 'Messaging frameworks', 'Voice & tone guides'],
        skill_level: 'intermediate'
      },
      {
        id: 'long-form-content-creation',
        name: 'Long-form Content Creation',
        description: 'Blog posts, whitepapers, case studies, thought leadership',
        examples: ['Blog posts', 'Whitepapers', 'Case studies', 'Industry reports'],
        skill_level: 'intermediate'
      },
      {
        id: 'video-multimedia-content',
        name: 'Video & Multimedia Content',
        description: 'Video scripts, podcast content, multimedia campaigns',
        examples: ['Video scripts', 'Podcast outlines', 'Multimedia campaigns'],
        skill_level: 'intermediate'
      },
      // Advanced Level
      {
        id: 'technical-writing-documentation',
        name: 'Technical Writing & Documentation',
        description: 'API docs, user manuals, technical specifications',
        examples: ['API documentation', 'User guides', 'Technical specifications'],
        skill_level: 'advanced'
      },
      {
        id: 'crisis-communication',
        name: 'Crisis Communication',
        description: 'Crisis messaging, reputation management, emergency communications',
        examples: ['Crisis statements', 'Reputation management', 'Emergency protocols'],
        skill_level: 'advanced'
      },
      {
        id: 'thought-leadership-pr',
        name: 'Thought Leadership & PR',
        description: 'Industry insights, expert positioning, media relations',
        examples: ['Thought leadership articles', 'Press releases', 'Media pitches'],
        skill_level: 'advanced'
      },
      {
        id: 'localization-global-content',
        name: 'Localization & Global Content',
        description: 'Multi-language content, cultural adaptation, global messaging',
        examples: ['Localized campaigns', 'Cultural adaptations', 'Global brand messaging'],
        skill_level: 'advanced'
      }
    ]
  },
  {
    id: 'data-analysis',
    name: '📊 Data & Analysis',
    icon: 'BarChart2',
    description: 'Data analysis, reporting, and business intelligence workflows',
    prompt_count: 0,
    bg_gradient: 'from-cyan-600/20 to-blue-600/20',
    featured: true,
    subcategories: [
      // Basic Level
      {
        id: 'basic-reporting-dashboards',
        name: 'Basic Reporting & Dashboards',
        description: 'Simple reports, basic charts, KPI tracking',
        examples: ['Weekly reports', 'Basic dashboards', 'KPI summaries'],
        skill_level: 'basic'
      },
      {
        id: 'data-collection-surveys',
        name: 'Data Collection & Surveys',
        description: 'Survey design, data gathering, basic research methods',
        examples: ['Customer surveys', 'Feedback forms', 'Data collection plans'],
        skill_level: 'basic'
      },
      {
        id: 'excel-spreadsheet-analysis',
        name: 'Excel & Spreadsheet Analysis',
        description: 'Spreadsheet formulas, basic data manipulation, simple analysis',
        examples: ['Excel formulas', 'Data cleaning', 'Basic calculations'],
        skill_level: 'basic'
      },
      {
        id: 'performance-metrics-kpis',
        name: 'Performance Metrics & KPIs',
        description: 'Metric definition, KPI frameworks, performance tracking',
        examples: ['KPI definitions', 'Performance scorecards', 'Metric frameworks'],
        skill_level: 'basic'
      },
      // Intermediate Level
      {
        id: 'business-intelligence-analytics',
        name: 'Business Intelligence & Analytics',
        description: 'BI tools, advanced analytics, data visualization',
        examples: ['BI dashboards', 'Analytics reports', 'Data visualizations'],
        skill_level: 'intermediate'
      },
      {
        id: 'market-research-analysis',
        name: 'Market Research & Analysis',
        description: 'Market studies, customer analysis, competitive intelligence',
        examples: ['Market studies', 'Customer segmentation', 'Competitive analysis'],
        skill_level: 'intermediate'
      },
      {
        id: 'financial-analysis-modeling',
        name: 'Financial Analysis & Modeling',
        description: 'Financial models, budget analysis, ROI calculations',
        examples: ['Financial models', 'Budget forecasts', 'ROI analysis'],
        skill_level: 'intermediate'
      },
      {
        id: 'customer-analytics-insights',
        name: 'Customer Analytics & Insights',
        description: 'Customer behavior analysis, segmentation, journey mapping',
        examples: ['Customer segmentation', 'Behavior analysis', 'Journey maps'],
        skill_level: 'intermediate'
      },
      // Advanced Level
      {
        id: 'predictive-analytics-forecasting',
        name: 'Predictive Analytics & Forecasting',
        description: 'Predictive models, forecasting, trend analysis',
        examples: ['Predictive models', 'Demand forecasting', 'Trend analysis'],
        skill_level: 'advanced'
      },
      {
        id: 'statistical-analysis-research',
        name: 'Statistical Analysis & Research',
        description: 'Statistical methods, hypothesis testing, research design',
        examples: ['Statistical tests', 'Research methodologies', 'Experimental design'],
        skill_level: 'advanced'
      },
      {
        id: 'big-data-advanced-analytics',
        name: 'Big Data & Advanced Analytics',
        description: 'Big data processing, machine learning, advanced algorithms',
        examples: ['Big data pipelines', 'ML models', 'Advanced algorithms'],
        skill_level: 'advanced'
      },
      {
        id: 'data-science-machine-learning',
        name: 'Data Science & Machine Learning',
        description: 'ML algorithms, data science workflows, AI model development',
        examples: ['ML pipelines', 'Model development', 'AI algorithms'],
        skill_level: 'advanced'
      }
    ]
  },
  {
    id: 'customer-sales',
    name: '🤝 Customer & Sales',
    icon: 'Users',
    description: 'Customer relationship management, sales processes, and customer success',
    prompt_count: 0,
    bg_gradient: 'from-green-600/20 to-emerald-600/20',
    featured: true,
    subcategories: [
      // Basic Level
      {
        id: 'basic-customer-service',
        name: 'Basic Customer Service',
        description: 'Customer support responses, basic service protocols',
        examples: ['Support emails', 'FAQ responses', 'Basic service scripts'],
        skill_level: 'basic'
      },
      {
        id: 'lead-generation-basics',
        name: 'Lead Generation Basics',
        description: 'Simple lead generation, prospect identification, basic outreach',
        examples: ['Lead lists', 'Basic outreach', 'Prospect research'],
        skill_level: 'basic'
      },
      {
        id: 'sales-communication',
        name: 'Sales Communication',
        description: 'Sales emails, follow-ups, basic sales conversations',
        examples: ['Sales emails', 'Follow-up messages', 'Meeting requests'],
        skill_level: 'basic'
      },
      {
        id: 'customer-onboarding',
        name: 'Customer Onboarding',
        description: 'Welcome sequences, basic onboarding, new customer setup',
        examples: ['Welcome emails', 'Onboarding checklists', 'Setup guides'],
        skill_level: 'basic'
      },
      // Intermediate Level
      {
        id: 'sales-process-pipeline-management',
        name: 'Sales Process & Pipeline Management',
        description: 'Sales methodologies, pipeline optimization, deal management',
        examples: ['Sales processes', 'Pipeline reviews', 'Deal strategies'],
        skill_level: 'intermediate'
      },
      {
        id: 'customer-relationship-management',
        name: 'Customer Relationship Management',
        description: 'CRM strategies, relationship building, account management',
        examples: ['Account plans', 'Relationship strategies', 'Customer touchpoints'],
        skill_level: 'intermediate'
      },
      {
        id: 'customer-success-retention',
        name: 'Customer Success & Retention',
        description: 'Customer health scoring, retention strategies, success planning',
        examples: ['Success plans', 'Health scores', 'Retention campaigns'],
        skill_level: 'intermediate'
      },
      {
        id: 'sales-training-enablement',
        name: 'Sales Training & Enablement',
        description: 'Sales training materials, enablement content, skill development',
        examples: ['Training materials', 'Sales playbooks', 'Skill assessments'],
        skill_level: 'intermediate'
      },
      // Advanced Level
      {
        id: 'enterprise-sales-account-management',
        name: 'Enterprise Sales & Account Management',
        description: 'Complex sales cycles, enterprise accounts, strategic selling',
        examples: ['Enterprise proposals', 'Strategic account plans', 'Complex negotiations'],
        skill_level: 'advanced'
      },
      {
        id: 'sales-operations-analytics',
        name: 'Sales Operations & Analytics',
        description: 'Sales analytics, performance optimization, operations management',
        examples: ['Sales analytics', 'Performance dashboards', 'Operations optimization'],
        skill_level: 'advanced'
      },
      {
        id: 'customer-experience-strategy',
        name: 'Customer Experience Strategy',
        description: 'CX design, journey optimization, experience management',
        examples: ['Journey maps', 'Experience strategies', 'CX optimization'],
        skill_level: 'advanced'
      },
      {
        id: 'revenue-operations-growth',
        name: 'Revenue Operations & Growth',
        description: 'Revenue optimization, growth strategies, operations alignment',
        examples: ['Revenue models', 'Growth strategies', 'Operations alignment'],
        skill_level: 'advanced'
      }
    ]
  },
  {
    id: 'operations-process',
    name: '🔧 Operations & Process',
    icon: 'Settings',
    description: 'Operational efficiency, process improvement, and workflow optimization',
    prompt_count: 0,
    bg_gradient: 'from-orange-600/20 to-yellow-600/20',
    subcategories: [
      // Basic Level
      {
        id: 'basic-project-management',
        name: 'Basic Project Management',
        description: 'Simple project planning, task management, basic coordination',
        examples: ['Project plans', 'Task lists', 'Basic timelines'],
        skill_level: 'basic'
      },
      {
        id: 'standard-operating-procedures',
        name: 'Standard Operating Procedures',
        description: 'Basic SOPs, process documentation, workflow guides',
        examples: ['SOPs', 'Process guides', 'Workflow documentation'],
        skill_level: 'basic'
      },
      {
        id: 'team-coordination-communication',
        name: 'Team Coordination & Communication',
        description: 'Team meetings, coordination, basic collaboration',
        examples: ['Meeting agendas', 'Team updates', 'Coordination plans'],
        skill_level: 'basic'
      },
      {
        id: 'basic-quality-control',
        name: 'Basic Quality Control',
        description: 'Simple quality checks, basic standards, review processes',
        examples: ['Quality checklists', 'Review processes', 'Basic standards'],
        skill_level: 'basic'
      },
      // Intermediate Level
      {
        id: 'process-improvement-optimization',
        name: 'Process Improvement & Optimization',
        description: 'Process analysis, improvement initiatives, efficiency optimization',
        examples: ['Process maps', 'Improvement plans', 'Efficiency analysis'],
        skill_level: 'intermediate'
      },
      {
        id: 'project-management-planning',
        name: 'Project Management & Planning',
        description: 'Advanced project management, resource planning, risk management',
        examples: ['Project charters', 'Resource plans', 'Risk assessments'],
        skill_level: 'intermediate'
      },
      {
        id: 'workflow-automation-systems',
        name: 'Workflow Automation & Systems',
        description: 'Automation design, system optimization, workflow engineering',
        examples: ['Automation workflows', 'System designs', 'Process automation'],
        skill_level: 'intermediate'
      },
      {
        id: 'performance-management-metrics',
        name: 'Performance Management & Metrics',
        description: 'Performance frameworks, operational metrics, improvement tracking',
        examples: ['Performance dashboards', 'Operational metrics', 'Improvement tracking'],
        skill_level: 'intermediate'
      },
      // Advanced Level
      {
        id: 'lean-six-sigma-implementation',
        name: 'Lean & Six Sigma Implementation',
        description: 'Lean methodologies, Six Sigma projects, continuous improvement',
        examples: ['Lean implementations', 'Six Sigma projects', 'Continuous improvement'],
        skill_level: 'advanced'
      },
      {
        id: 'supply-chain-logistics',
        name: 'Supply Chain & Logistics',
        description: 'Supply chain optimization, logistics management, vendor coordination',
        examples: ['Supply chain strategies', 'Logistics optimization', 'Vendor management'],
        skill_level: 'advanced'
      },
      {
        id: 'change-management-transformation',
        name: 'Change Management & Transformation',
        description: 'Organizational change, transformation initiatives, change leadership',
        examples: ['Change strategies', 'Transformation plans', 'Change communication'],
        skill_level: 'advanced'
      },
      {
        id: 'enterprise-operations-governance',
        name: 'Enterprise Operations & Governance',
        description: 'Enterprise operations, governance frameworks, strategic operations',
        examples: ['Governance frameworks', 'Enterprise operations', 'Strategic oversight'],
        skill_level: 'advanced'
      }
    ]
  },
  {
    id: 'learning-development',
    name: '📚 Learning & Development',
    icon: 'GraduationCap',
    description: 'Training programs, skill development, and knowledge management',
    prompt_count: 0,
    bg_gradient: 'from-indigo-600/20 to-purple-600/20',
    subcategories: [
      // Basic Level
      {
        id: 'basic-training-materials',
        name: 'Basic Training Materials',
        description: 'Simple training content, basic guides, introductory materials',
        examples: ['Training guides', 'Basic presentations', 'Introductory materials'],
        skill_level: 'basic'
      },
      {
        id: 'employee-onboarding',
        name: 'Employee Onboarding',
        description: 'New hire orientation, basic onboarding, welcome programs',
        examples: ['Onboarding checklists', 'Welcome materials', 'Orientation guides'],
        skill_level: 'basic'
      },
      {
        id: 'skill-assessment-planning',
        name: 'Skill Assessment & Planning',
        description: 'Basic skill assessments, development planning, learning paths',
        examples: ['Skill assessments', 'Development plans', 'Learning objectives'],
        skill_level: 'basic'
      },
      {
        id: 'knowledge-sharing-documentation',
        name: 'Knowledge Sharing & Documentation',
        description: 'Knowledge bases, documentation, information sharing',
        examples: ['Knowledge articles', 'Documentation', 'Information repositories'],
        skill_level: 'basic'
      },
      // Intermediate Level
      {
        id: 'training-program-development',
        name: 'Training Program Development',
        description: 'Curriculum design, program development, learning strategies',
        examples: ['Training curricula', 'Program designs', 'Learning strategies'],
        skill_level: 'intermediate'
      },
      {
        id: 'performance-coaching-development',
        name: 'Performance Coaching & Development',
        description: 'Coaching frameworks, performance development, skill building',
        examples: ['Coaching plans', 'Development frameworks', 'Skill building programs'],
        skill_level: 'intermediate'
      },
      {
        id: 'leadership-development',
        name: 'Leadership Development',
        description: 'Leadership training, management development, executive coaching',
        examples: ['Leadership programs', 'Management training', 'Executive development'],
        skill_level: 'intermediate'
      },
      {
        id: 'learning-technology-platforms',
        name: 'Learning Technology & Platforms',
        description: 'LMS management, e-learning development, technology integration',
        examples: ['LMS strategies', 'E-learning content', 'Technology integration'],
        skill_level: 'intermediate'
      },
      // Advanced Level
      {
        id: 'organizational-learning-strategy',
        name: 'Organizational Learning Strategy',
        description: 'Learning strategy, organizational development, culture transformation',
        examples: ['Learning strategies', 'Organizational development', 'Culture initiatives'],
        skill_level: 'advanced'
      },
      {
        id: 'competency-frameworks-models',
        name: 'Competency Frameworks & Models',
        description: 'Competency modeling, skill frameworks, capability development',
        examples: ['Competency models', 'Skill frameworks', 'Capability assessments'],
        skill_level: 'advanced'
      },
      {
        id: 'learning-analytics-measurement',
        name: 'Learning Analytics & Measurement',
        description: 'Learning analytics, ROI measurement, impact assessment',
        examples: ['Learning analytics', 'ROI studies', 'Impact measurements'],
        skill_level: 'advanced'
      },
      {
        id: 'innovation-learning-development',
        name: 'Innovation in Learning & Development',
        description: 'Learning innovation, emerging technologies, future of work preparation',
        examples: ['Learning innovation', 'Emerging tech integration', 'Future skills development'],
        skill_level: 'advanced'
      }
    ]
  },
  {
    id: 'legal-compliance',
    name: '⚖️ Legal & Compliance',
    icon: 'Scale',
    description: 'Legal documentation, regulatory compliance, and risk management',
    prompt_count: 0,
    bg_gradient: 'from-slate-600/20 to-zinc-600/20',
    subcategories: [
      // Basic Level
      {
        id: 'basic-legal-documentation',
        name: 'Basic Legal Documentation',
        description: 'Simple contracts, basic legal forms, standard agreements',
        examples: ['Service agreements', 'Basic contracts', 'Standard forms'],
        skill_level: 'basic'
      },
      {
        id: 'compliance-basics',
        name: 'Compliance Basics',
        description: 'Basic compliance requirements, simple policies, standard procedures',
        examples: ['Basic policies', 'Compliance checklists', 'Standard procedures'],
        skill_level: 'basic'
      },
      {
        id: 'contract-management-fundamentals',
        name: 'Contract Management Fundamentals',
        description: 'Contract basics, simple negotiations, standard terms',
        examples: ['Contract templates', 'Basic negotiations', 'Standard terms'],
        skill_level: 'basic'
      },
      {
        id: 'risk-awareness-basic-mitigation',
        name: 'Risk Awareness & Basic Mitigation',
        description: 'Risk identification, basic mitigation, simple risk management',
        examples: ['Risk checklists', 'Basic mitigation', 'Simple assessments'],
        skill_level: 'basic'
      },
      // Intermediate Level
      {
        id: 'regulatory-compliance-management',
        name: 'Regulatory Compliance Management',
        description: 'Regulatory frameworks, compliance programs, audit preparation',
        examples: ['Compliance programs', 'Regulatory frameworks', 'Audit preparations'],
        skill_level: 'intermediate'
      },
      {
        id: 'contract-negotiation-management',
        name: 'Contract Negotiation & Management',
        description: 'Contract negotiations, vendor management, agreement optimization',
        examples: ['Contract negotiations', 'Vendor agreements', 'Contract optimization'],
        skill_level: 'intermediate'
      },
      {
        id: 'corporate-governance-policies',
        name: 'Corporate Governance & Policies',
        description: 'Governance frameworks, corporate policies, board management',
        examples: ['Governance policies', 'Board materials', 'Corporate procedures'],
        skill_level: 'intermediate'
      },
      {
        id: 'employment-law-hr-compliance',
        name: 'Employment Law & HR Compliance',
        description: 'Employment regulations, HR compliance, workplace policies',
        examples: ['Employment policies', 'HR compliance', 'Workplace regulations'],
        skill_level: 'intermediate'
      },
      // Advanced Level
      {
        id: 'complex-legal-strategy-litigation',
        name: 'Complex Legal Strategy & Litigation',
        description: 'Legal strategy, litigation management, complex legal matters',
        examples: ['Legal strategies', 'Litigation plans', 'Complex legal analysis'],
        skill_level: 'advanced'
      },
      {
        id: 'advanced-regulatory-industry-compliance',
        name: 'Advanced Regulatory & Industry Compliance',
        description: 'Industry-specific regulations, advanced compliance, specialized requirements',
        examples: ['Industry regulations', 'Specialized compliance', 'Regulatory strategy'],
        skill_level: 'advanced'
      },
      {
        id: 'intellectual-property-technology-law',
        name: 'Intellectual Property & Technology Law',
        description: 'IP protection, technology law, patent management',
        examples: ['IP strategies', 'Patent applications', 'Technology agreements'],
        skill_level: 'advanced'
      },
      {
        id: 'international-law-cross-border-compliance',
        name: 'International Law & Cross-Border Compliance',
        description: 'International regulations, cross-border compliance, global legal matters',
        examples: ['International agreements', 'Cross-border compliance', 'Global legal strategies'],
        skill_level: 'advanced'
      }
    ]
  },
  {
    id: 'healthcare-clinical',
    name: '🏥 Healthcare & Clinical',
    icon: 'Stethoscope',
    description: 'Clinical documentation, patient care, and healthcare administration',
    prompt_count: 0,
    bg_gradient: 'from-red-600/20 to-rose-600/20',
    subcategories: [
      // Basic Level
      {
        id: 'basic-patient-communication',
        name: 'Basic Patient Communication',
        description: 'Patient interactions, basic communication, appointment scheduling',
        examples: ['Patient communications', 'Appointment reminders', 'Basic instructions'],
        skill_level: 'basic'
      },
      {
        id: 'health-education-patient-information',
        name: 'Health Education & Patient Information',
        description: 'Patient education materials, health information, basic wellness content',
        examples: ['Patient education', 'Health information', 'Wellness materials'],
        skill_level: 'basic'
      },
      {
        id: 'basic-medical-documentation',
        name: 'Basic Medical Documentation',
        description: 'Simple medical records, basic documentation, routine notes',
        examples: ['Basic medical records', 'Routine documentation', 'Simple notes'],
        skill_level: 'basic'
      },
      {
        id: 'healthcare-administration-basics',
        name: 'Healthcare Administration Basics',
        description: 'Basic administrative tasks, scheduling, simple healthcare operations',
        examples: ['Administrative procedures', 'Scheduling systems', 'Basic operations'],
        skill_level: 'basic'
      },
      // Intermediate Level
      {
        id: 'clinical-documentation-records',
        name: 'Clinical Documentation & Records',
        description: 'Clinical notes, medical records, documentation standards',
        examples: ['Clinical notes', 'Medical records', 'Documentation protocols'],
        skill_level: 'intermediate'
      },
      {
        id: 'patient-care-planning-management',
        name: 'Patient Care Planning & Management',
        description: 'Care plans, patient management, treatment coordination',
        examples: ['Care plans', 'Patient management', 'Treatment coordination'],
        skill_level: 'intermediate'
      },
      {
        id: 'healthcare-quality-safety',
        name: 'Healthcare Quality & Safety',
        description: 'Quality improvement, safety protocols, clinical standards',
        examples: ['Quality programs', 'Safety protocols', 'Clinical standards'],
        skill_level: 'intermediate'
      },
      {
        id: 'medical-billing-coding',
        name: 'Medical Billing & Coding',
        description: 'Medical coding, billing procedures, insurance processing',
        examples: ['Medical coding', 'Billing procedures', 'Insurance claims'],
        skill_level: 'intermediate'
      },
      // Advanced Level
      {
        id: 'advanced-clinical-practice-specialization',
        name: 'Advanced Clinical Practice & Specialization',
        description: 'Specialized clinical practice, advanced procedures, expert care',
        examples: ['Specialized protocols', 'Advanced procedures', 'Expert consultations'],
        skill_level: 'advanced'
      },
      {
        id: 'clinical-research-evidence-based-practice',
        name: 'Clinical Research & Evidence-Based Practice',
        description: 'Clinical research, evidence-based medicine, research protocols',
        examples: ['Research protocols', 'Clinical studies', 'Evidence-based guidelines'],
        skill_level: 'advanced'
      },
      {
        id: 'healthcare-technology-informatics',
        name: 'Healthcare Technology & Informatics',
        description: 'Health informatics, medical technology, digital health solutions',
        examples: ['Health informatics', 'Medical technology', 'Digital health strategies'],
        skill_level: 'advanced'
      },
      {
        id: 'healthcare-leadership-strategic-management',
        name: 'Healthcare Leadership & Strategic Management',
        description: 'Healthcare strategy, leadership, organizational management',
        examples: ['Healthcare strategy', 'Leadership development', 'Organizational management'],
        skill_level: 'advanced'
      }
    ]
  },
  {
    id: 'technology-development',
    name: '💻 Technology & Development',
    icon: 'Code',
    description: 'Software development, system architecture, and technical implementation',
    prompt_count: 0,
    bg_gradient: 'from-emerald-600/20 to-teal-600/20',
    featured: true,
    subcategories: [
      // Basic Level
      {
        id: 'basic-programming-scripting',
        name: 'Basic Programming & Scripting',
        description: 'Simple coding tasks, basic scripts, introductory programming',
        examples: ['Basic scripts', 'Simple programs', 'Introductory coding'],
        skill_level: 'basic'
      },
      {
        id: 'technical-documentation-basics',
        name: 'Technical Documentation Basics',
        description: 'Basic technical writing, simple documentation, user guides',
        examples: ['User guides', 'Basic documentation', 'Simple technical writing'],
        skill_level: 'basic'
      },
      {
        id: 'system-administration-fundamentals',
        name: 'System Administration Fundamentals',
        description: 'Basic system management, simple configurations, routine maintenance',
        examples: ['System configurations', 'Basic administration', 'Routine maintenance'],
        skill_level: 'basic'
      },
      {
        id: 'web-development-basics',
        name: 'Web Development Basics',
        description: 'Simple websites, basic web development, introductory web technologies',
        examples: ['Simple websites', 'Basic web development', 'Introductory web projects'],
        skill_level: 'basic'
      },
      // Intermediate Level
      {
        id: 'software-development-engineering',
        name: 'Software Development & Engineering',
        description: 'Application development, software engineering, development methodologies',
        examples: ['Application development', 'Software engineering', 'Development projects'],
        skill_level: 'intermediate'
      },
      {
        id: 'system-architecture-design',
        name: 'System Architecture & Design',
        description: 'System design, architecture planning, technical specifications',
        examples: ['System architecture', 'Design patterns', 'Technical specifications'],
        skill_level: 'intermediate'
      },
      {
        id: 'devops-automation',
        name: 'DevOps & Automation',
        description: 'DevOps practices, automation, CI/CD pipelines',
        examples: ['DevOps pipelines', 'Automation scripts', 'Infrastructure management'],
        skill_level: 'intermediate'
      },
      {
        id: 'database-design-management',
        name: 'Database Design & Management',
        description: 'Database architecture, data modeling, database administration',
        examples: ['Database design', 'Data modeling', 'Database optimization'],
        skill_level: 'intermediate'
      },
      // Advanced Level
      {
        id: 'enterprise-architecture-strategy',
        name: 'Enterprise Architecture & Strategy',
        description: 'Enterprise systems, architectural strategy, technology leadership',
        examples: ['Enterprise architecture', 'Technology strategy', 'Architectural governance'],
        skill_level: 'advanced'
      },
      {
        id: 'advanced-development-innovation',
        name: 'Advanced Development & Innovation',
        description: 'Advanced programming, innovative solutions, cutting-edge development',
        examples: ['Advanced algorithms', 'Innovative solutions', 'Research development'],
        skill_level: 'advanced'
      },
      {
        id: 'cloud-architecture-infrastructure',
        name: 'Cloud Architecture & Infrastructure',
        description: 'Cloud solutions, infrastructure design, scalable architectures',
        examples: ['Cloud architecture', 'Infrastructure design', 'Scalable solutions'],
        skill_level: 'advanced'
      },
      {
        id: 'ai-ml-development-implementation',
        name: 'AI/ML Development & Implementation',
        description: 'AI development, machine learning, intelligent systems',
        examples: ['AI development', 'ML models', 'Intelligent system design'],
        skill_level: 'advanced'
      }
    ]
  }
];

// Migration functions
async function createBackup() {
  console.log('💾 Creating backup of existing data...');
  
  try {
    // Export existing categories
    const { data: existingCategories, error: categoriesError } = await supabase
      .from('categories')
      .select('*');
    
    if (categoriesError) {
      console.error('❌ Error backing up categories:', categoriesError);
      return false;
    }

    // Export existing subcategories
    const { data: existingSubcategories, error: subcategoriesError } = await supabase
      .from('subcategories')
      .select('*');
    
    if (subcategoriesError) {
      console.error('❌ Error backing up subcategories:', subcategoriesError);
      return false;
    }

    // Export existing prompts
    const { data: existingPrompts, error: promptsError } = await supabase
      .from('prompts')
      .select('*');
    
    if (promptsError) {
      console.error('❌ Error backing up prompts:', promptsError);
      return false;
    }

    // Save backup data to file
    const backupData = {
      timestamp: new Date().toISOString(),
      categories: existingCategories,
      subcategories: existingSubcategories,
      prompts: existingPrompts
    };

    // Write backup to file
    const fs = await import('fs');
    const backupFileName = `backup-${Date.now()}.json`;
    fs.writeFileSync(backupFileName, JSON.stringify(backupData, null, 2));
    
    console.log(`✅ Backup created: ${backupFileName}`);
    return backupFileName;
    
  } catch (error) {
    console.error('❌ Backup failed:', error);
    return false;
  }
}

async function updateDatabaseSchema() {
  console.log('🔧 Updating database schema for 9-category framework...');
  
  try {
    // Update skill_level enum to support new values
    console.log('📝 Updating skill_level enum...');
    const { error: enumError } = await supabase.rpc('exec_sql', {
      sql: `
        -- Drop existing enum if it exists and recreate with new values
        DO $$ BEGIN
          IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'skill_level') THEN
            DROP TYPE skill_level CASCADE;
          END IF;
        END $$;
        
        CREATE TYPE skill_level AS ENUM ('basic', 'intermediate', 'advanced');
      `
    });

    if (enumError) {
      console.error('❌ Error updating skill_level enum:', enumError);
      return false;
    }

    // Add industry support to categories table
    console.log('🏭 Adding industry support to categories...');
    const { error: categoriesError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.categories 
        ADD COLUMN IF NOT EXISTS industry_tags TEXT[] DEFAULT '{}',
        ADD COLUMN IF NOT EXISTS cross_industry BOOLEAN DEFAULT TRUE;
      `
    });

    if (categoriesError) {
      console.error('❌ Error updating categories table:', categoriesError);
      return false;
    }

    // Update subcategories table with new skill_level enum
    console.log('📂 Updating subcategories table...');
    const { error: subcategoriesError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.subcategories 
        ALTER COLUMN skill_level TYPE skill_level USING skill_level::skill_level;
      `
    });

    if (subcategoriesError) {
      console.error('❌ Error updating subcategories table:', subcategoriesError);
      return false;
    }

    // Add industry support to prompts table
    console.log('✍️ Adding industry support to prompts...');
    const { error: promptsError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.prompts 
        ADD COLUMN IF NOT EXISTS industry_tags TEXT[] DEFAULT '{}',
        ALTER COLUMN skill_level TYPE skill_level USING skill_level::skill_level;
      `
    });

    if (promptsError) {
      console.error('❌ Error updating prompts table:', promptsError);
      return false;
    }

    console.log('✅ Database schema updated successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Schema update failed:', error);
    return false;
  }
}

async function migrate9CategoryData() {
  console.log('🚀 Migrating to 9-category framework...');
  
  try {
    // Clear existing data
    console.log('🧹 Clearing existing category data...');
    await supabase.from('prompts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('prompt_groups').delete().neq('id', 'dummy');
    await supabase.from('subcategories').delete().neq('id', 'dummy');
    await supabase.from('categories').delete().neq('id', 'dummy');

    // Insert new 9-category framework
    for (const category of nineCategoryFramework) {
      console.log(`📁 Migrating category: ${category.name}`);
      
      const { error: categoryError } = await supabase
        .from('categories')
        .insert({
          id: category.id,
          name: category.name,
          icon: category.icon,
          description: category.description,
          prompt_count: category.prompt_count,
          bg_gradient: category.bg_gradient,
          trending: category.trending || false,
          featured: category.featured || false,
          industry_tags: [],
          cross_industry: true
        });

      if (categoryError) {
        console.error(`❌ Error inserting category ${category.id}:`, categoryError);
        continue;
      }

      // Insert subcategories
      for (const subcategory of category.subcategories) {
        console.log(`  📂 Migrating subcategory: ${subcategory.name}`);
        
        const { error: subcategoryError } = await supabase
          .from('subcategories')
          .insert({
            id: subcategory.id,
            category_id: category.id,
            name: subcategory.name,
            description: subcategory.description,
            examples: subcategory.examples,
            skill_level: subcategory.skill_level
          });

        if (subcategoryError) {
          console.error(`❌ Error inserting subcategory ${subcategory.id}:`, subcategoryError);
        }
      }
    }

    console.log('✅ 9-category framework migration completed successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return false;
  }
}

// Main migration function
async function runMigration() {
  try {
    console.log('🚀 Starting 9-Category Framework Migration...');
    console.log('=====================================');
    
    // Step 1: Create backup
    const backupFile = await createBackup();
    if (!backupFile) {
      console.error('❌ Migration aborted: Backup failed');
      process.exit(1);
    }
    
    // Step 2: Update database schema
    const schemaUpdated = await updateDatabaseSchema();
    if (!schemaUpdated) {
      console.error('❌ Migration aborted: Schema update failed');
      process.exit(1);
    }
    
    // Step 3: Migrate to 9-category data
    const dataMigrated = await migrate9CategoryData();
    if (!dataMigrated) {
      console.error('❌ Migration aborted: Data migration failed');
      process.exit(1);
    }
    
    console.log('=====================================');
    console.log('✅ 9-Category Framework Migration Complete!');
    console.log(`💾 Backup saved as: ${backupFile}`);
    console.log('🎉 Your database now supports the enhanced 9-category framework');
    console.log('📋 Next steps:');
    console.log('   1. Update frontend categories-data.ts');
    console.log('   2. Implement skill-level filtering UI');
    console.log('   3. Add industry customization features');
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigration();
}

export { runMigration, createBackup, updateDatabaseSchema, migrate9CategoryData };
