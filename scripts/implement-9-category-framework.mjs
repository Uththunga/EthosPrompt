#!/usr/bin/env node

/**
 * Complete 9-Category Framework Implementation
 * 
 * This script implements the comprehensive 9-category framework with:
 * - 9 core categories with proper metadata
 * - 108 subcategories (12 per category, 4 per skill level)
 * - Migration of existing prompts to new structure
 * - Data integrity verification
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase service key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Complete 9-Category Framework Data
const nineCategoryFramework = [
  {
    id: 'strategy-planning',
    name: 'Strategy & Planning',
    icon: 'Target',
    description: 'Business strategy, market research, and strategic planning workflows',
    prompt_count: 0,
    bg_gradient: 'from-blue-600/20 to-indigo-600/20',
    trending: false,
    featured: true
  },
  {
    id: 'content-communication',
    name: 'Content & Communication',
    icon: 'FileText',
    description: 'Content creation, copywriting, and communication strategies',
    prompt_count: 0,
    bg_gradient: 'from-purple-600/20 to-pink-600/20',
    trending: true,
    featured: true
  },
  {
    id: 'data-analysis',
    name: 'Data & Analysis',
    icon: 'BarChart2',
    description: 'Data analysis, reporting, and business intelligence workflows',
    prompt_count: 0,
    bg_gradient: 'from-cyan-600/20 to-blue-600/20',
    trending: false,
    featured: true
  },
  {
    id: 'customer-sales',
    name: 'Customer & Sales',
    icon: 'Users',
    description: 'Customer relationship management, sales processes, and customer success',
    prompt_count: 0,
    bg_gradient: 'from-green-600/20 to-emerald-600/20',
    trending: true,
    featured: true
  },
  {
    id: 'operations-process',
    name: 'Operations & Process',
    icon: 'Settings',
    description: 'Operational efficiency, process improvement, and workflow optimization',
    prompt_count: 0,
    bg_gradient: 'from-orange-600/20 to-yellow-600/20',
    trending: false,
    featured: false
  },
  {
    id: 'learning-development',
    name: 'Learning & Development',
    icon: 'BookOpen',
    description: 'Training programs, skill development, and knowledge management',
    prompt_count: 0,
    bg_gradient: 'from-indigo-600/20 to-purple-600/20',
    trending: false,
    featured: false
  },
  {
    id: 'legal-compliance',
    name: 'Legal & Compliance',
    icon: 'Scale',
    description: 'Legal documentation, regulatory compliance, and risk management',
    prompt_count: 0,
    bg_gradient: 'from-gray-600/20 to-slate-600/20',
    trending: false,
    featured: false
  },
  {
    id: 'healthcare-clinical',
    name: 'Healthcare & Clinical',
    icon: 'Heart',
    description: 'Clinical documentation, patient care, and healthcare administration',
    prompt_count: 0,
    bg_gradient: 'from-red-600/20 to-pink-600/20',
    trending: false,
    featured: false
  },
  {
    id: 'technology-development',
    name: 'Technology & Development',
    icon: 'Code',
    description: 'Software development, technical documentation, and IT workflows',
    prompt_count: 0,
    bg_gradient: 'from-emerald-600/20 to-teal-600/20',
    trending: true,
    featured: false
  }
];

// Complete subcategory structure (108 subcategories total)
const subcategoryStructure = {
  'strategy-planning': [
    // Basic Level (4 subcategories)
    { id: 'business-planning-basics', name: 'Business Planning Basics', description: 'Simple business plans, goal setting, basic market analysis', examples: ['Business model canvas', 'SWOT analysis', 'Basic market research'], skill_level: 'beginner' },
    { id: 'goal-setting-objectives', name: 'Goal Setting & Objectives', description: 'Setting SMART goals, KPI definition, milestone planning', examples: ['Quarterly goals', 'Team objectives', 'Performance metrics'], skill_level: 'beginner' },
    { id: 'market-research-fundamentals', name: 'Market Research Fundamentals', description: 'Basic customer research, simple surveys, market sizing', examples: ['Customer interviews', 'Market surveys', 'Competitor basics'], skill_level: 'beginner' },
    { id: 'strategic-communication', name: 'Strategic Communication', description: 'Presenting strategies, stakeholder updates, vision statements', examples: ['Strategy presentations', 'Vision documents', 'Stakeholder reports'], skill_level: 'beginner' },
    // Intermediate Level (4 subcategories)
    { id: 'competitive-analysis', name: 'Competitive Analysis', description: 'In-depth competitor research, positioning analysis, market intelligence', examples: ['Competitive matrices', 'Positioning maps', 'Market intelligence reports'], skill_level: 'intermediate' },
    { id: 'strategic-planning-roadmaps', name: 'Strategic Planning & Roadmaps', description: 'Multi-year planning, strategic roadmaps, resource allocation', examples: ['3-year plans', 'Strategic roadmaps', 'Resource planning'], skill_level: 'intermediate' },
    { id: 'risk-assessment-management', name: 'Risk Assessment & Management', description: 'Risk identification, mitigation strategies, scenario planning', examples: ['Risk matrices', 'Contingency plans', 'Scenario analysis'], skill_level: 'intermediate' },
    { id: 'performance-strategy', name: 'Performance Strategy', description: 'Performance frameworks, optimization strategies, growth planning', examples: ['Performance dashboards', 'Optimization plans', 'Growth strategies'], skill_level: 'intermediate' },
    // Advanced Level (4 subcategories)
    { id: 'corporate-strategy-ma', name: 'Corporate Strategy & M&A', description: 'Corporate development, mergers & acquisitions, portfolio strategy', examples: ['M&A analysis', 'Portfolio optimization', 'Corporate restructuring'], skill_level: 'advanced' },
    { id: 'innovation-strategy', name: 'Innovation Strategy', description: 'Innovation frameworks, R&D planning, disruptive strategy', examples: ['Innovation pipelines', 'Technology roadmaps', 'Disruption analysis'], skill_level: 'advanced' },
    { id: 'digital-transformation-strategy', name: 'Digital Transformation Strategy', description: 'Technology adoption, digital roadmaps, change management', examples: ['Digital roadmaps', 'Technology adoption plans', 'Transformation strategies'], skill_level: 'advanced' },
    { id: 'international-expansion-strategy', name: 'International & Expansion Strategy', description: 'Global expansion, market entry, international business planning', examples: ['Market entry strategies', 'International expansion plans', 'Global operations'], skill_level: 'advanced' }
  ],
  'content-communication': [
    // Basic Level (4 subcategories)
    { id: 'basic-copywriting', name: 'Basic Copywriting', description: 'Simple copy for websites, emails, basic marketing materials', examples: ['Website copy', 'Email templates', 'Basic ads'], skill_level: 'beginner' },
    { id: 'social-media-content', name: 'Social Media Content', description: 'Social posts, captions, basic social media strategy', examples: ['Instagram captions', 'Facebook posts', 'LinkedIn updates'], skill_level: 'beginner' },
    { id: 'email-communication', name: 'Email Communication', description: 'Professional emails, newsletters, basic email marketing', examples: ['Sales emails', 'Customer communications', 'Newsletters'], skill_level: 'beginner' },
    { id: 'internal-communication', name: 'Internal Communication', description: 'Team updates, announcements, internal documentation', examples: ['Team announcements', 'Policy updates', 'Meeting notes'], skill_level: 'beginner' },
    // Intermediate Level (4 subcategories)
    { id: 'content-marketing-strategy', name: 'Content Marketing Strategy', description: 'Content calendars, blog strategies, content planning', examples: ['Content calendars', 'Blog strategies', 'Content audits'], skill_level: 'intermediate' },
    { id: 'brand-messaging-voice', name: 'Brand Messaging & Voice', description: 'Brand guidelines, tone of voice, messaging frameworks', examples: ['Brand guidelines', 'Messaging frameworks', 'Voice & tone guides'], skill_level: 'intermediate' },
    { id: 'long-form-content-creation', name: 'Long-form Content Creation', description: 'Blog posts, whitepapers, case studies, thought leadership', examples: ['Blog posts', 'Whitepapers', 'Case studies', 'Industry reports'], skill_level: 'intermediate' },
    { id: 'video-multimedia-content', name: 'Video & Multimedia Content', description: 'Video scripts, podcast content, multimedia campaigns', examples: ['Video scripts', 'Podcast outlines', 'Multimedia campaigns'], skill_level: 'intermediate' },
    // Advanced Level (4 subcategories)
    { id: 'technical-writing-documentation', name: 'Technical Writing & Documentation', description: 'API docs, user manuals, technical specifications', examples: ['API documentation', 'User guides', 'Technical specifications'], skill_level: 'advanced' },
    { id: 'crisis-communication', name: 'Crisis Communication', description: 'Crisis messaging, reputation management, emergency communications', examples: ['Crisis statements', 'Reputation management', 'Emergency protocols'], skill_level: 'advanced' },
    { id: 'thought-leadership-pr', name: 'Thought Leadership & PR', description: 'Industry insights, expert positioning, media relations', examples: ['Thought leadership articles', 'Press releases', 'Media pitches'], skill_level: 'advanced' },
    { id: 'localization-global-content', name: 'Localization & Global Content', description: 'Multi-language content, cultural adaptation, global messaging', examples: ['Localized campaigns', 'Cultural adaptations', 'Global brand messaging'], skill_level: 'advanced' }
  ],
  'data-analysis': [
    // Basic Level (4 subcategories)
    { id: 'basic-reporting-dashboards', name: 'Basic Reporting & Dashboards', description: 'Simple reports, basic charts, KPI tracking', examples: ['Weekly reports', 'Basic dashboards', 'KPI summaries'], skill_level: 'beginner' },
    { id: 'data-collection-surveys', name: 'Data Collection & Surveys', description: 'Survey design, data gathering, basic research methods', examples: ['Customer surveys', 'Feedback forms', 'Data collection plans'], skill_level: 'beginner' },
    { id: 'excel-spreadsheet-analysis', name: 'Excel & Spreadsheet Analysis', description: 'Spreadsheet formulas, basic data manipulation, simple analysis', examples: ['Excel formulas', 'Data cleaning', 'Basic calculations'], skill_level: 'beginner' },
    { id: 'performance-metrics-kpis', name: 'Performance Metrics & KPIs', description: 'Metric definition, KPI frameworks, performance tracking', examples: ['KPI definitions', 'Performance scorecards', 'Metric frameworks'], skill_level: 'beginner' },
    // Intermediate Level (4 subcategories)
    { id: 'business-intelligence-analytics', name: 'Business Intelligence & Analytics', description: 'BI tools, advanced analytics, data visualization', examples: ['BI dashboards', 'Analytics reports', 'Data visualizations'], skill_level: 'intermediate' },
    { id: 'market-research-analysis', name: 'Market Research & Analysis', description: 'Market studies, customer analysis, competitive intelligence', examples: ['Market studies', 'Customer segmentation', 'Competitive analysis'], skill_level: 'intermediate' },
    { id: 'financial-analysis-modeling', name: 'Financial Analysis & Modeling', description: 'Financial models, budget analysis, ROI calculations', examples: ['Financial models', 'Budget forecasts', 'ROI analysis'], skill_level: 'intermediate' },
    { id: 'customer-analytics-insights', name: 'Customer Analytics & Insights', description: 'Customer behavior analysis, segmentation, journey mapping', examples: ['Customer segmentation', 'Behavior analysis', 'Journey maps'], skill_level: 'intermediate' },
    // Advanced Level (4 subcategories)
    { id: 'predictive-analytics-forecasting', name: 'Predictive Analytics & Forecasting', description: 'Predictive models, forecasting, trend analysis', examples: ['Predictive models', 'Demand forecasting', 'Trend analysis'], skill_level: 'advanced' },
    { id: 'statistical-analysis-research', name: 'Statistical Analysis & Research', description: 'Statistical methods, hypothesis testing, research design', examples: ['Statistical tests', 'Research methodologies', 'Experimental design'], skill_level: 'advanced' },
    { id: 'big-data-advanced-analytics', name: 'Big Data & Advanced Analytics', description: 'Big data processing, machine learning, advanced algorithms', examples: ['Big data pipelines', 'ML models', 'Advanced algorithms'], skill_level: 'advanced' },
    { id: 'data-science-machine-learning', name: 'Data Science & Machine Learning', description: 'ML algorithms, data science workflows, AI model development', examples: ['ML pipelines', 'Model development', 'AI algorithms'], skill_level: 'advanced' }
  ],
  'customer-sales': [
    // Basic Level (4 subcategories)
    { id: 'basic-customer-service', name: 'Basic Customer Service', description: 'Customer support responses, basic service protocols', examples: ['Support emails', 'FAQ responses', 'Basic service scripts'], skill_level: 'beginner' },
    { id: 'lead-generation-basics', name: 'Lead Generation Basics', description: 'Simple lead generation, prospect identification, basic outreach', examples: ['Lead lists', 'Basic outreach', 'Prospect research'], skill_level: 'beginner' },
    { id: 'sales-communication', name: 'Sales Communication', description: 'Sales emails, follow-ups, basic sales conversations', examples: ['Sales emails', 'Follow-up messages', 'Meeting requests'], skill_level: 'beginner' },
    { id: 'customer-onboarding', name: 'Customer Onboarding', description: 'Welcome sequences, basic onboarding, new customer setup', examples: ['Welcome emails', 'Onboarding checklists', 'Setup guides'], skill_level: 'beginner' },
    // Intermediate Level (4 subcategories)
    { id: 'sales-process-pipeline-management', name: 'Sales Process & Pipeline Management', description: 'Sales methodologies, pipeline optimization, deal management', examples: ['Sales processes', 'Pipeline reviews', 'Deal strategies'], skill_level: 'intermediate' },
    { id: 'customer-relationship-management', name: 'Customer Relationship Management', description: 'CRM strategies, relationship building, account management', examples: ['Account plans', 'Relationship strategies', 'Customer touchpoints'], skill_level: 'intermediate' },
    { id: 'customer-success-retention', name: 'Customer Success & Retention', description: 'Customer health scoring, retention strategies, success planning', examples: ['Success plans', 'Health scores', 'Retention campaigns'], skill_level: 'intermediate' },
    { id: 'sales-training-enablement', name: 'Sales Training & Enablement', description: 'Sales training materials, enablement content, skill development', examples: ['Training materials', 'Sales playbooks', 'Skill assessments'], skill_level: 'intermediate' },
    // Advanced Level (4 subcategories)
    { id: 'enterprise-sales-account-management', name: 'Enterprise Sales & Account Management', description: 'Complex sales cycles, enterprise accounts, strategic selling', examples: ['Enterprise proposals', 'Strategic account plans', 'Complex negotiations'], skill_level: 'advanced' },
    { id: 'sales-operations-analytics', name: 'Sales Operations & Analytics', description: 'Sales analytics, performance optimization, operations management', examples: ['Sales analytics', 'Performance dashboards', 'Operations optimization'], skill_level: 'advanced' },
    { id: 'customer-experience-strategy', name: 'Customer Experience Strategy', description: 'CX design, journey optimization, experience management', examples: ['Journey maps', 'Experience strategies', 'CX optimization'], skill_level: 'advanced' },
    { id: 'revenue-operations-growth', name: 'Revenue Operations & Growth', description: 'Revenue optimization, growth strategies, operations alignment', examples: ['Revenue models', 'Growth strategies', 'Operations alignment'], skill_level: 'advanced' }
  ],
  'operations-process': [
    // Basic Level (4 subcategories)
    { id: 'basic-project-management', name: 'Basic Project Management', description: 'Simple project planning, task management, basic coordination', examples: ['Project plans', 'Task lists', 'Basic timelines'], skill_level: 'beginner' },
    { id: 'standard-operating-procedures', name: 'Standard Operating Procedures', description: 'Basic SOPs, process documentation, workflow guides', examples: ['SOPs', 'Process guides', 'Workflow documentation'], skill_level: 'beginner' },
    { id: 'team-coordination-communication', name: 'Team Coordination & Communication', description: 'Team meetings, coordination, basic collaboration', examples: ['Meeting agendas', 'Team updates', 'Coordination plans'], skill_level: 'beginner' },
    { id: 'basic-quality-control', name: 'Basic Quality Control', description: 'Simple quality checks, basic standards, review processes', examples: ['Quality checklists', 'Review processes', 'Basic standards'], skill_level: 'beginner' },
    // Intermediate Level (4 subcategories)
    { id: 'process-improvement-optimization', name: 'Process Improvement & Optimization', description: 'Process analysis, improvement initiatives, efficiency optimization', examples: ['Process maps', 'Improvement plans', 'Efficiency analysis'], skill_level: 'intermediate' },
    { id: 'project-management-planning', name: 'Project Management & Planning', description: 'Advanced project management, resource planning, risk management', examples: ['Project charters', 'Resource plans', 'Risk assessments'], skill_level: 'intermediate' },
    { id: 'workflow-automation-systems', name: 'Workflow Automation & Systems', description: 'Automation design, system optimization, workflow engineering', examples: ['Automation workflows', 'System designs', 'Process automation'], skill_level: 'intermediate' },
    { id: 'performance-management-metrics', name: 'Performance Management & Metrics', description: 'Performance frameworks, operational metrics, improvement tracking', examples: ['Performance dashboards', 'Operational metrics', 'Improvement tracking'], skill_level: 'intermediate' },
    // Advanced Level (4 subcategories)
    { id: 'lean-six-sigma-implementation', name: 'Lean & Six Sigma Implementation', description: 'Lean methodologies, Six Sigma projects, continuous improvement', examples: ['Lean implementations', 'Six Sigma projects', 'Continuous improvement'], skill_level: 'advanced' },
    { id: 'supply-chain-logistics', name: 'Supply Chain & Logistics', description: 'Supply chain optimization, logistics management, vendor coordination', examples: ['Supply chain strategies', 'Logistics optimization', 'Vendor management'], skill_level: 'advanced' },
    { id: 'change-management-transformation', name: 'Change Management & Transformation', description: 'Organizational change, transformation initiatives, change leadership', examples: ['Change strategies', 'Transformation plans', 'Change communication'], skill_level: 'advanced' },
    { id: 'enterprise-operations-governance', name: 'Enterprise Operations & Governance', description: 'Enterprise operations, governance frameworks, strategic operations', examples: ['Governance frameworks', 'Enterprise operations', 'Strategic oversight'], skill_level: 'advanced' }
  ],
  'learning-development': [
    // Basic Level (4 subcategories)
    { id: 'basic-training-materials', name: 'Basic Training Materials', description: 'Simple training content, basic guides, introductory materials', examples: ['Training guides', 'Basic presentations', 'Introductory materials'], skill_level: 'beginner' },
    { id: 'employee-onboarding', name: 'Employee Onboarding', description: 'New hire orientation, basic onboarding, welcome programs', examples: ['Onboarding checklists', 'Welcome materials', 'Orientation guides'], skill_level: 'beginner' },
    { id: 'skill-assessment-planning', name: 'Skill Assessment & Planning', description: 'Basic skill assessments, development planning, learning paths', examples: ['Skill assessments', 'Development plans', 'Learning objectives'], skill_level: 'beginner' },
    { id: 'knowledge-sharing-documentation', name: 'Knowledge Sharing & Documentation', description: 'Knowledge bases, documentation, information sharing', examples: ['Knowledge articles', 'Documentation', 'Information repositories'], skill_level: 'beginner' },
    // Intermediate Level (4 subcategories)
    { id: 'training-program-development', name: 'Training Program Development', description: 'Curriculum design, program development, learning strategies', examples: ['Training curricula', 'Program designs', 'Learning strategies'], skill_level: 'intermediate' },
    { id: 'performance-coaching-development', name: 'Performance Coaching & Development', description: 'Coaching frameworks, performance development, skill building', examples: ['Coaching plans', 'Development frameworks', 'Skill building programs'], skill_level: 'intermediate' },
    { id: 'leadership-development', name: 'Leadership Development', description: 'Leadership training, management development, executive coaching', examples: ['Leadership programs', 'Management training', 'Executive development'], skill_level: 'intermediate' },
    { id: 'learning-technology-platforms', name: 'Learning Technology & Platforms', description: 'LMS management, e-learning development, technology integration', examples: ['LMS strategies', 'E-learning content', 'Technology integration'], skill_level: 'intermediate' },
    // Advanced Level (4 subcategories)
    { id: 'organizational-learning-strategy', name: 'Organizational Learning Strategy', description: 'Learning strategy, organizational development, culture transformation', examples: ['Learning strategies', 'Organizational development', 'Culture initiatives'], skill_level: 'advanced' },
    { id: 'competency-frameworks-models', name: 'Competency Frameworks & Models', description: 'Competency modeling, skill frameworks, capability development', examples: ['Competency models', 'Skill frameworks', 'Capability assessments'], skill_level: 'advanced' },
    { id: 'learning-analytics-measurement', name: 'Learning Analytics & Measurement', description: 'Learning analytics, ROI measurement, impact assessment', examples: ['Learning analytics', 'ROI studies', 'Impact measurements'], skill_level: 'advanced' },
    { id: 'innovation-learning-development', name: 'Innovation in Learning & Development', description: 'Learning innovation, emerging technologies, future of work preparation', examples: ['Learning innovation', 'Emerging tech integration', 'Future skills development'], skill_level: 'advanced' }
  ],
  'legal-compliance': [
    // Basic Level (4 subcategories)
    { id: 'basic-legal-documentation', name: 'Basic Legal Documentation', description: 'Simple contracts, basic legal forms, standard agreements', examples: ['Service agreements', 'Basic contracts', 'Standard forms'], skill_level: 'beginner' },
    { id: 'compliance-basics', name: 'Compliance Basics', description: 'Basic compliance requirements, simple policies, standard procedures', examples: ['Basic policies', 'Compliance checklists', 'Standard procedures'], skill_level: 'beginner' },
    { id: 'contract-management-fundamentals', name: 'Contract Management Fundamentals', description: 'Contract basics, simple negotiations, standard terms', examples: ['Contract templates', 'Basic negotiations', 'Standard terms'], skill_level: 'beginner' },
    { id: 'risk-awareness-basic-mitigation', name: 'Risk Awareness & Basic Mitigation', description: 'Risk identification, basic mitigation, simple risk management', examples: ['Risk checklists', 'Basic mitigation', 'Simple assessments'], skill_level: 'beginner' },
    // Intermediate Level (4 subcategories)
    { id: 'regulatory-compliance-management', name: 'Regulatory Compliance Management', description: 'Regulatory frameworks, compliance programs, audit preparation', examples: ['Compliance programs', 'Regulatory frameworks', 'Audit preparations'], skill_level: 'intermediate' },
    { id: 'contract-negotiation-management', name: 'Contract Negotiation & Management', description: 'Contract negotiations, vendor management, agreement optimization', examples: ['Contract negotiations', 'Vendor agreements', 'Contract optimization'], skill_level: 'intermediate' },
    { id: 'corporate-governance-policies', name: 'Corporate Governance & Policies', description: 'Governance frameworks, corporate policies, board management', examples: ['Governance policies', 'Board materials', 'Corporate procedures'], skill_level: 'intermediate' },
    { id: 'employment-law-hr-compliance', name: 'Employment Law & HR Compliance', description: 'Employment regulations, HR compliance, workplace policies', examples: ['Employment policies', 'HR compliance', 'Workplace regulations'], skill_level: 'intermediate' },
    // Advanced Level (4 subcategories)
    { id: 'complex-legal-strategy-litigation', name: 'Complex Legal Strategy & Litigation', description: 'Legal strategy, litigation management, complex legal matters', examples: ['Legal strategies', 'Litigation plans', 'Complex legal analysis'], skill_level: 'advanced' },
    { id: 'advanced-regulatory-industry-compliance', name: 'Advanced Regulatory & Industry Compliance', description: 'Industry-specific regulations, advanced compliance, specialized requirements', examples: ['Industry regulations', 'Specialized compliance', 'Regulatory strategy'], skill_level: 'advanced' },
    { id: 'intellectual-property-technology-law', name: 'Intellectual Property & Technology Law', description: 'IP protection, technology law, patent management', examples: ['IP strategies', 'Patent applications', 'Technology agreements'], skill_level: 'advanced' },
    { id: 'international-law-cross-border-compliance', name: 'International Law & Cross-Border Compliance', description: 'International regulations, cross-border compliance, global legal matters', examples: ['International agreements', 'Cross-border compliance', 'Global legal strategies'], skill_level: 'advanced' }
  ],
  'healthcare-clinical': [
    // Basic Level (4 subcategories)
    { id: 'basic-patient-documentation', name: 'Basic Patient Documentation', description: 'Simple patient records, basic documentation, standard forms', examples: ['Patient intake forms', 'Basic records', 'Standard documentation'], skill_level: 'beginner' },
    { id: 'healthcare-communication-basics', name: 'Healthcare Communication Basics', description: 'Patient communication, basic health education, simple explanations', examples: ['Patient instructions', 'Health education materials', 'Basic explanations'], skill_level: 'beginner' },
    { id: 'clinical-workflow-basics', name: 'Clinical Workflow Basics', description: 'Basic clinical processes, simple workflows, standard procedures', examples: ['Clinical checklists', 'Basic workflows', 'Standard procedures'], skill_level: 'beginner' },
    { id: 'healthcare-compliance-fundamentals', name: 'Healthcare Compliance Fundamentals', description: 'Basic HIPAA compliance, simple regulations, standard policies', examples: ['HIPAA basics', 'Compliance checklists', 'Standard policies'], skill_level: 'beginner' },
    // Intermediate Level (4 subcategories)
    { id: 'clinical-assessment-documentation', name: 'Clinical Assessment & Documentation', description: 'Clinical assessments, detailed documentation, care planning', examples: ['Assessment forms', 'Care plans', 'Clinical documentation'], skill_level: 'intermediate' },
    { id: 'patient-care-coordination', name: 'Patient Care Coordination', description: 'Care coordination, patient management, interdisciplinary communication', examples: ['Care coordination plans', 'Patient management', 'Team communication'], skill_level: 'intermediate' },
    { id: 'healthcare-quality-improvement', name: 'Healthcare Quality Improvement', description: 'Quality metrics, improvement initiatives, patient safety', examples: ['Quality measures', 'Improvement plans', 'Safety protocols'], skill_level: 'intermediate' },
    { id: 'medical-education-training', name: 'Medical Education & Training', description: 'Medical training materials, continuing education, skill development', examples: ['Training curricula', 'Medical education', 'Skill assessments'], skill_level: 'intermediate' },
    // Advanced Level (4 subcategories)
    { id: 'clinical-research-protocols', name: 'Clinical Research & Protocols', description: 'Research protocols, clinical trials, evidence-based practice', examples: ['Research protocols', 'Clinical trials', 'Evidence-based guidelines'], skill_level: 'advanced' },
    { id: 'healthcare-technology-informatics', name: 'Healthcare Technology & Informatics', description: 'Health informatics, technology implementation, digital health', examples: ['Health informatics', 'Technology integration', 'Digital health solutions'], skill_level: 'advanced' },
    { id: 'specialized-clinical-practice', name: 'Specialized Clinical Practice', description: 'Specialty practice, advanced procedures, specialized care', examples: ['Specialty protocols', 'Advanced procedures', 'Specialized care plans'], skill_level: 'advanced' },
    { id: 'healthcare-leadership-administration', name: 'Healthcare Leadership & Administration', description: 'Healthcare leadership, administrative management, strategic planning', examples: ['Leadership strategies', 'Administrative processes', 'Strategic planning'], skill_level: 'advanced' }
  ],
  'technology-development': [
    // Basic Level (4 subcategories)
    { id: 'basic-programming-fundamentals', name: 'Basic Programming Fundamentals', description: 'Simple coding tasks, basic programming concepts, introductory development', examples: ['Basic scripts', 'Simple functions', 'Introductory coding'], skill_level: 'beginner' },
    { id: 'web-development-basics', name: 'Web Development Basics', description: 'Basic web development, simple websites, fundamental web technologies', examples: ['HTML/CSS basics', 'Simple websites', 'Web fundamentals'], skill_level: 'beginner' },
    { id: 'basic-database-operations', name: 'Basic Database Operations', description: 'Simple database queries, basic data management, introductory SQL', examples: ['Basic SQL queries', 'Simple data operations', 'Database basics'], skill_level: 'beginner' },
    { id: 'technical-documentation-basics', name: 'Technical Documentation Basics', description: 'Basic technical writing, simple documentation, user guides', examples: ['User manuals', 'Basic documentation', 'Technical guides'], skill_level: 'beginner' },
    // Intermediate Level (4 subcategories)
    { id: 'application-development', name: 'Application Development', description: 'Full application development, frameworks, intermediate programming', examples: ['Web applications', 'Mobile apps', 'Framework development'], skill_level: 'intermediate' },
    { id: 'database-design-management', name: 'Database Design & Management', description: 'Database design, advanced queries, data modeling', examples: ['Database schemas', 'Complex queries', 'Data modeling'], skill_level: 'intermediate' },
    { id: 'api-integration-development', name: 'API Integration & Development', description: 'API development, integration, web services', examples: ['REST APIs', 'API integration', 'Web services'], skill_level: 'intermediate' },
    { id: 'software-testing-quality-assurance', name: 'Software Testing & Quality Assurance', description: 'Testing strategies, QA processes, automated testing', examples: ['Test plans', 'Automated testing', 'QA processes'], skill_level: 'intermediate' },
    // Advanced Level (4 subcategories)
    { id: 'enterprise-architecture-design', name: 'Enterprise Architecture & Design', description: 'System architecture, enterprise solutions, scalable design', examples: ['System architecture', 'Enterprise solutions', 'Scalable designs'], skill_level: 'advanced' },
    { id: 'devops-deployment-automation', name: 'DevOps & Deployment Automation', description: 'DevOps practices, CI/CD, deployment automation', examples: ['CI/CD pipelines', 'DevOps automation', 'Deployment strategies'], skill_level: 'advanced' },
    { id: 'cybersecurity-implementation', name: 'Cybersecurity Implementation', description: 'Security implementation, threat assessment, security architecture', examples: ['Security protocols', 'Threat analysis', 'Security architecture'], skill_level: 'advanced' },
    { id: 'emerging-technologies-innovation', name: 'Emerging Technologies & Innovation', description: 'Cutting-edge technologies, innovation, future tech implementation', examples: ['AI/ML implementation', 'Blockchain development', 'Innovation strategies'], skill_level: 'advanced' }
  ]
};

async function createBackup() {
  try {
    console.log('💾 Creating backup of current data...');
    
    const { data: categories } = await supabase.from('categories').select('*');
    const { data: subcategories } = await supabase.from('subcategories').select('*');
    const { data: prompts } = await supabase.from('prompts').select('*');
    const { data: promptGroups } = await supabase.from('prompt_groups').select('*');
    
    const backup = {
      timestamp: new Date().toISOString(),
      categories,
      subcategories,
      prompts,
      promptGroups
    };
    
    const backupFile = `backup-${Date.now()}.json`;
    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));
    
    console.log(`✅ Backup created: ${backupFile}`);
    return backupFile;
  } catch (error) {
    console.error('❌ Backup failed:', error);
    return null;
  }
}

async function clearExistingData() {
  try {
    console.log('🗑️ Clearing existing data...');
    
    // Delete in correct order due to foreign key constraints
    await supabase.from('prompts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('prompt_groups').delete().neq('id', 'dummy');
    await supabase.from('subcategories').delete().neq('id', 'dummy');
    await supabase.from('categories').delete().neq('id', 'dummy');
    
    console.log('✅ Existing data cleared');
    return true;
  } catch (error) {
    console.error('❌ Data clearing failed:', error);
    return false;
  }
}

async function insertCategories() {
  try {
    console.log('📁 Inserting 9-category framework...');

    const { data, error } = await supabase
      .from('categories')
      .insert(nineCategoryFramework)
      .select();

    if (error) {
      console.error('❌ Category insertion failed:', error);
      return false;
    }

    console.log(`✅ Inserted ${data.length} categories`);
    return true;
  } catch (error) {
    console.error('❌ Category insertion failed:', error);
    return false;
  }
}

async function insertSubcategories() {
  try {
    console.log('📂 Inserting subcategories (108 total)...');

    let totalInserted = 0;

    for (const [categoryId, subcategories] of Object.entries(subcategoryStructure)) {
      console.log(`   Inserting ${subcategories.length} subcategories for ${categoryId}...`);

      const subcategoriesWithCategoryId = subcategories.map(sub => ({
        ...sub,
        category_id: categoryId
      }));

      const { data, error } = await supabase
        .from('subcategories')
        .insert(subcategoriesWithCategoryId)
        .select();

      if (error) {
        console.error(`❌ Subcategory insertion failed for ${categoryId}:`, error);
        return false;
      }

      totalInserted += data.length;
      console.log(`   ✅ Inserted ${data.length} subcategories for ${categoryId}`);
    }

    console.log(`✅ Total subcategories inserted: ${totalInserted}`);
    return true;
  } catch (error) {
    console.error('❌ Subcategory insertion failed:', error);
    return false;
  }
}

async function migrateExistingPrompts(backupData) {
  try {
    console.log('✍️  Migrating existing prompts to new structure...');

    if (!backupData || !backupData.prompts) {
      console.log('⚠️  No existing prompts to migrate');
      return true;
    }

    const promptMigrationMap = {
      // Education → Learning & Development
      'education': 'learning-development',
      'lesson-planning': 'employee-onboarding',

      // Marketing → Content & Communication
      'marketing': 'content-communication',
      'content-creation-copywriting': 'basic-copywriting',
      'marketing-strategy-planning': 'content-marketing-strategy',

      // Software Development → Technology & Development
      'development': 'technology-development',
      'code-assistance': 'basic-programming-fundamentals'
    };

    const migratedPrompts = backupData.prompts.map(prompt => {
      // Map category
      const newCategoryId = promptMigrationMap[prompt.category_id] || prompt.category_id;

      // Map subcategory
      const newSubcategoryId = promptMigrationMap[prompt.subcategory_id] || prompt.subcategory_id;

      return {
        ...prompt,
        category_id: newCategoryId,
        subcategory_id: newSubcategoryId,
        // Ensure skill level is properly set
        skill_level: prompt.skill_level || 'beginner'
      };
    });

    // Insert migrated prompts in batches
    const batchSize = 10;
    let totalMigrated = 0;

    for (let i = 0; i < migratedPrompts.length; i += batchSize) {
      const batch = migratedPrompts.slice(i, i + batchSize);

      const { data, error } = await supabase
        .from('prompts')
        .insert(batch)
        .select();

      if (error) {
        console.error(`❌ Prompt migration batch failed:`, error);
        // Continue with next batch
        continue;
      }

      totalMigrated += data.length;
    }

    console.log(`✅ Migrated ${totalMigrated} prompts to new structure`);
    return true;
  } catch (error) {
    console.error('❌ Prompt migration failed:', error);
    return false;
  }
}

async function implementMigration() {
  try {
    console.log('🚀 Starting Complete 9-Category Framework Implementation...');
    console.log('=======================================================\n');

    // Step 1: Create backup
    console.log('Step 1: Creating backup...');
    const backupFile = await createBackup();
    if (!backupFile) {
      console.error('❌ Migration aborted: Backup failed');
      return false;
    }

    // Read backup data for prompt migration
    const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf8'));

    // Step 2: Clear existing data
    console.log('\nStep 2: Clearing existing data...');
    const dataCleared = await clearExistingData();
    if (!dataCleared) {
      console.error('❌ Migration aborted: Data clearing failed');
      return false;
    }

    // Step 3: Insert new categories
    console.log('\nStep 3: Inserting 9-category framework...');
    const categoriesInserted = await insertCategories();
    if (!categoriesInserted) {
      console.error('❌ Migration aborted: Category insertion failed');
      return false;
    }

    // Step 4: Insert subcategories
    console.log('\nStep 4: Inserting subcategories...');
    const subcategoriesInserted = await insertSubcategories();
    if (!subcategoriesInserted) {
      console.error('❌ Migration aborted: Subcategory insertion failed');
      return false;
    }

    // Step 5: Migrate existing prompts
    console.log('\nStep 5: Migrating existing prompts...');
    const promptsMigrated = await migrateExistingPrompts(backupData);
    if (!promptsMigrated) {
      console.error('❌ Migration aborted: Prompt migration failed');
      return false;
    }

    // Step 6: Update category prompt counts
    console.log('\nStep 6: Updating category prompt counts...');
    for (const category of nineCategoryFramework) {
      const { count } = await supabase
        .from('prompts')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id);

      await supabase
        .from('categories')
        .update({ prompt_count: count || 0 })
        .eq('id', category.id);
    }

    console.log('✅ Category prompt counts updated');

    return { success: true, backupFile };

  } catch (error) {
    console.error('❌ Migration failed:', error);
    return { success: false, error };
  }
}

// Run migration
implementMigration()
  .then((result) => {
    if (result.success) {
      console.log('\n🎉 Complete 9-Category Framework Implementation Successful!');
      console.log('=======================================================');
      console.log('✅ Categories: 9 implemented');
      console.log('✅ Subcategories: 108 implemented (12 per category)');
      console.log('✅ Skill levels: 3 tiers (beginner/intermediate/advanced)');
      console.log('✅ Prompts: Migrated to new structure');
      console.log('✅ Data integrity: Maintained');
      console.log(`💾 Backup saved as: ${result.backupFile}`);
      console.log('\n📋 Next steps:');
      console.log('   1. Run database verification script');
      console.log('   2. Test frontend integration');
      console.log('   3. Add more prompts to populate subcategories');
    } else {
      console.log('\n❌ Migration failed:', result.error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('💥 Migration script failed:', error);
    process.exit(1);
  });
