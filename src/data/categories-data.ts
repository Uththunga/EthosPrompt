import type { LucideIcon} from 'lucide-react';
import { Target, FileText, BarChart2, Users, Settings, GraduationCap, Scale, Stethoscope, Code } from 'lucide-react';

export type SkillLevel = 'Basic' | 'Intermediate' | 'Advanced';

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
  industryTags?: string[];
  crossIndustry?: boolean;
}

export const categories: Category[] = [
  {
    id: 'strategy-planning',
    name: '🎯 Strategy & Planning',
    icon: Target,
    description: 'Business strategy, market research, and strategic planning workflows',
    promptCount: 0,
    bgGradient: 'from-blue-600/20 to-indigo-600/20',
    featured: true,
    crossIndustry: true,
    subcategories: [
      // Basic Level
      {
        id: 'business-planning-basics',
        name: 'Business Planning Basics',
        description: 'Simple business plans, goal setting, basic market analysis',
        examples: ['Business model canvas', 'SWOT analysis', 'Basic market research'],
        skillLevel: 'Basic'
      },
      {
        id: 'goal-setting-objectives',
        name: 'Goal Setting & Objectives',
        description: 'Setting SMART goals, KPI definition, milestone planning',
        examples: ['Quarterly goals', 'Team objectives', 'Performance metrics'],
        skillLevel: 'Basic'
      },
      {
        id: 'market-research-fundamentals',
        name: 'Market Research Fundamentals',
        description: 'Basic customer research, simple surveys, market sizing',
        examples: ['Customer interviews', 'Market surveys', 'Competitor basics'],
        skillLevel: 'Basic'
      },
      {
        id: 'strategic-communication',
        name: 'Strategic Communication',
        description: 'Presenting strategies, stakeholder updates, vision statements',
        examples: ['Strategy presentations', 'Vision documents', 'Stakeholder reports'],
        skillLevel: 'Basic'
      },
      // Intermediate Level
      {
        id: 'competitive-analysis',
        name: 'Competitive Analysis',
        description: 'In-depth competitor research, positioning analysis, market intelligence',
        examples: ['Competitive matrices', 'Positioning maps', 'Market intelligence reports'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'strategic-planning-roadmaps',
        name: 'Strategic Planning & Roadmaps',
        description: 'Multi-year planning, strategic roadmaps, resource allocation',
        examples: ['3-year plans', 'Strategic roadmaps', 'Resource planning'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'risk-assessment-management',
        name: 'Risk Assessment & Management',
        description: 'Risk identification, mitigation strategies, scenario planning',
        examples: ['Risk matrices', 'Contingency plans', 'Scenario analysis'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'performance-strategy',
        name: 'Performance Strategy',
        description: 'Performance frameworks, optimization strategies, growth planning',
        examples: ['Performance dashboards', 'Optimization plans', 'Growth strategies'],
        skillLevel: 'Intermediate'
      },
      // Advanced Level
      {
        id: 'corporate-strategy-ma',
        name: 'Corporate Strategy & M&A',
        description: 'Corporate development, mergers & acquisitions, portfolio strategy',
        examples: ['M&A analysis', 'Portfolio optimization', 'Corporate restructuring'],
        skillLevel: 'Advanced'
      },
      {
        id: 'innovation-strategy',
        name: 'Innovation Strategy',
        description: 'Innovation frameworks, R&D planning, disruptive strategy',
        examples: ['Innovation pipelines', 'Technology roadmaps', 'Disruption analysis'],
        skillLevel: 'Advanced'
      },
      {
        id: 'digital-transformation-strategy',
        name: 'Digital Transformation Strategy',
        description: 'Technology adoption, digital roadmaps, change management',
        examples: ['Digital roadmaps', 'Technology adoption plans', 'Transformation strategies'],
        skillLevel: 'Advanced'
      },
      {
        id: 'international-expansion-strategy',
        name: 'International & Expansion Strategy',
        description: 'Global expansion, market entry, international business planning',
        examples: ['Market entry strategies', 'International expansion plans', 'Global operations'],
        skillLevel: 'Advanced'
      }
    ]
  },
  {
    id: 'content-communication',
    name: '📝 Content & Communication',
    icon: FileText,
    description: 'Content creation, copywriting, and communication strategies',
    promptCount: 0,
    bgGradient: 'from-purple-600/20 to-pink-600/20',
    featured: true,
    crossIndustry: true,
    subcategories: [
      // Basic Level
      {
        id: 'basic-copywriting',
        name: 'Basic Copywriting',
        description: 'Simple copy for websites, emails, basic marketing materials',
        examples: ['Website copy', 'Email templates', 'Basic ads'],
        skillLevel: 'Basic'
      },
      {
        id: 'social-media-content',
        name: 'Social Media Content',
        description: 'Social posts, captions, basic social media strategy',
        examples: ['Instagram captions', 'Facebook posts', 'LinkedIn updates'],
        skillLevel: 'Basic'
      },
      {
        id: 'email-communication',
        name: 'Email Communication',
        description: 'Professional emails, newsletters, basic email marketing',
        examples: ['Sales emails', 'Customer communications', 'Newsletters'],
        skillLevel: 'Basic'
      },
      {
        id: 'internal-communication',
        name: 'Internal Communication',
        description: 'Team updates, announcements, internal documentation',
        examples: ['Team announcements', 'Policy updates', 'Meeting notes'],
        skillLevel: 'Basic'
      },
      // Intermediate Level
      {
        id: 'content-marketing-strategy',
        name: 'Content Marketing Strategy',
        description: 'Content calendars, blog strategies, content planning',
        examples: ['Content calendars', 'Blog strategies', 'Content audits'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'brand-messaging-voice',
        name: 'Brand Messaging & Voice',
        description: 'Brand guidelines, tone of voice, messaging frameworks',
        examples: ['Brand guidelines', 'Messaging frameworks', 'Voice & tone guides'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'long-form-content-creation',
        name: 'Long-form Content Creation',
        description: 'Blog posts, whitepapers, case studies, thought leadership',
        examples: ['Blog posts', 'Whitepapers', 'Case studies', 'Industry reports'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'video-multimedia-content',
        name: 'Video & Multimedia Content',
        description: 'Video scripts, podcast content, multimedia campaigns',
        examples: ['Video scripts', 'Podcast outlines', 'Multimedia campaigns'],
        skillLevel: 'Intermediate'
      },
      // Advanced Level
      {
        id: 'technical-writing-documentation',
        name: 'Technical Writing & Documentation',
        description: 'API docs, user manuals, technical specifications',
        examples: ['API documentation', 'User guides', 'Technical specifications'],
        skillLevel: 'Advanced'
      },
      {
        id: 'crisis-communication',
        name: 'Crisis Communication',
        description: 'Crisis messaging, reputation management, emergency communications',
        examples: ['Crisis statements', 'Reputation management', 'Emergency protocols'],
        skillLevel: 'Advanced'
      },
      {
        id: 'thought-leadership-pr',
        name: 'Thought Leadership & PR',
        description: 'Industry insights, expert positioning, media relations',
        examples: ['Thought leadership articles', 'Press releases', 'Media pitches'],
        skillLevel: 'Advanced'
      },
      {
        id: 'localization-global-content',
        name: 'Localization & Global Content',
        description: 'Multi-language content, cultural adaptation, global messaging',
        examples: ['Localized campaigns', 'Cultural adaptations', 'Global brand messaging'],
        skillLevel: 'Advanced'
      }
    ]
  },
  {
    id: 'data-analysis',
    name: '📊 Data & Analysis',
    icon: BarChart2,
    description: 'Data analysis, reporting, and business intelligence workflows',
    promptCount: 0,
    bgGradient: 'from-cyan-600/20 to-blue-600/20',
    featured: true,
    crossIndustry: true,
    subcategories: [
      // Basic Level
      {
        id: 'basic-reporting-dashboards',
        name: 'Basic Reporting & Dashboards',
        description: 'Simple reports, basic charts, KPI tracking',
        examples: ['Weekly reports', 'Basic dashboards', 'KPI summaries'],
        skillLevel: 'Basic'
      },
      {
        id: 'data-collection-surveys',
        name: 'Data Collection & Surveys',
        description: 'Survey design, data gathering, basic research methods',
        examples: ['Customer surveys', 'Feedback forms', 'Data collection plans'],
        skillLevel: 'Basic'
      },
      {
        id: 'excel-spreadsheet-analysis',
        name: 'Excel & Spreadsheet Analysis',
        description: 'Spreadsheet formulas, basic data manipulation, simple analysis',
        examples: ['Excel formulas', 'Data cleaning', 'Basic calculations'],
        skillLevel: 'Basic'
      },
      {
        id: 'performance-metrics-kpis',
        name: 'Performance Metrics & KPIs',
        description: 'Metric definition, KPI frameworks, performance tracking',
        examples: ['KPI definitions', 'Performance scorecards', 'Metric frameworks'],
        skillLevel: 'Basic'
      },
      // Intermediate Level
      {
        id: 'business-intelligence-analytics',
        name: 'Business Intelligence & Analytics',
        description: 'BI tools, advanced analytics, data visualization',
        examples: ['BI dashboards', 'Analytics reports', 'Data visualizations'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'market-research-analysis',
        name: 'Market Research & Analysis',
        description: 'Market studies, customer analysis, competitive intelligence',
        examples: ['Market studies', 'Customer segmentation', 'Competitive analysis'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'financial-analysis-modeling',
        name: 'Financial Analysis & Modeling',
        description: 'Financial models, budget analysis, ROI calculations',
        examples: ['Financial models', 'Budget forecasts', 'ROI analysis'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'customer-analytics-insights',
        name: 'Customer Analytics & Insights',
        description: 'Customer behavior analysis, segmentation, journey mapping',
        examples: ['Customer segmentation', 'Behavior analysis', 'Journey maps'],
        skillLevel: 'Intermediate'
      },
      // Advanced Level
      {
        id: 'predictive-analytics-forecasting',
        name: 'Predictive Analytics & Forecasting',
        description: 'Predictive models, forecasting, trend analysis',
        examples: ['Predictive models', 'Demand forecasting', 'Trend analysis'],
        skillLevel: 'Advanced'
      },
      {
        id: 'statistical-analysis-research',
        name: 'Statistical Analysis & Research',
        description: 'Statistical methods, hypothesis testing, research design',
        examples: ['Statistical tests', 'Research methodologies', 'Experimental design'],
        skillLevel: 'Advanced'
      },
      {
        id: 'big-data-advanced-analytics',
        name: 'Big Data & Advanced Analytics',
        description: 'Big data processing, machine learning, advanced algorithms',
        examples: ['Big data pipelines', 'ML models', 'Advanced algorithms'],
        skillLevel: 'Advanced'
      },
      {
        id: 'data-science-machine-learning',
        name: 'Data Science & Machine Learning',
        description: 'ML algorithms, data science workflows, AI model development',
        examples: ['ML pipelines', 'Model development', 'AI algorithms'],
        skillLevel: 'Advanced'
      }
    ]
  },
  {
    id: 'customer-sales',
    name: '🤝 Customer & Sales',
    icon: Users,
    description: 'Customer relationship management, sales processes, and customer success',
    promptCount: 0,
    bgGradient: 'from-green-600/20 to-emerald-600/20',
    featured: true,
    crossIndustry: true,
    subcategories: [
      // Basic Level
      {
        id: 'basic-customer-service',
        name: 'Basic Customer Service',
        description: 'Customer support responses, basic service protocols',
        examples: ['Support emails', 'FAQ responses', 'Basic service scripts'],
        skillLevel: 'Basic'
      },
      {
        id: 'lead-generation-basics',
        name: 'Lead Generation Basics',
        description: 'Simple lead generation, prospect identification, basic outreach',
        examples: ['Lead lists', 'Basic outreach', 'Prospect research'],
        skillLevel: 'Basic'
      },
      {
        id: 'sales-communication',
        name: 'Sales Communication',
        description: 'Sales emails, follow-ups, basic sales conversations',
        examples: ['Sales emails', 'Follow-up messages', 'Meeting requests'],
        skillLevel: 'Basic'
      },
      {
        id: 'customer-onboarding',
        name: 'Customer Onboarding',
        description: 'Welcome sequences, basic onboarding, new customer setup',
        examples: ['Welcome emails', 'Onboarding checklists', 'Setup guides'],
        skillLevel: 'Basic'
      },
      // Intermediate Level
      {
        id: 'sales-process-pipeline-management',
        name: 'Sales Process & Pipeline Management',
        description: 'Sales methodologies, pipeline optimization, deal management',
        examples: ['Sales processes', 'Pipeline reviews', 'Deal strategies'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'customer-relationship-management',
        name: 'Customer Relationship Management',
        description: 'CRM strategies, relationship building, account management',
        examples: ['Account plans', 'Relationship strategies', 'Customer touchpoints'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'customer-success-retention',
        name: 'Customer Success & Retention',
        description: 'Customer health scoring, retention strategies, success planning',
        examples: ['Success plans', 'Health scores', 'Retention campaigns'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'sales-training-enablement',
        name: 'Sales Training & Enablement',
        description: 'Sales training materials, enablement content, skill development',
        examples: ['Training materials', 'Sales playbooks', 'Skill assessments'],
        skillLevel: 'Intermediate'
      },
      // Advanced Level
      {
        id: 'enterprise-sales-account-management',
        name: 'Enterprise Sales & Account Management',
        description: 'Complex sales cycles, enterprise accounts, strategic selling',
        examples: ['Enterprise proposals', 'Strategic account plans', 'Complex negotiations'],
        skillLevel: 'Advanced'
      },
      {
        id: 'sales-operations-analytics',
        name: 'Sales Operations & Analytics',
        description: 'Sales analytics, performance optimization, operations management',
        examples: ['Sales analytics', 'Performance dashboards', 'Operations optimization'],
        skillLevel: 'Advanced'
      },
      {
        id: 'customer-experience-strategy',
        name: 'Customer Experience Strategy',
        description: 'CX design, journey optimization, experience management',
        examples: ['Journey maps', 'Experience strategies', 'CX optimization'],
        skillLevel: 'Advanced'
      },
      {
        id: 'revenue-operations-growth',
        name: 'Revenue Operations & Growth',
        description: 'Revenue optimization, growth strategies, operations alignment',
        examples: ['Revenue models', 'Growth strategies', 'Operations alignment'],
        skillLevel: 'Advanced'
      }
    ]
  },
  {
    id: 'operations-process',
    name: '🔧 Operations & Process',
    icon: Settings,
    description: 'Operational efficiency, process improvement, and workflow optimization',
    promptCount: 0,
    bgGradient: 'from-orange-600/20 to-yellow-600/20',
    crossIndustry: true,
    subcategories: [
      // Basic Level
      {
        id: 'basic-project-management',
        name: 'Basic Project Management',
        description: 'Simple project planning, task management, basic coordination',
        examples: ['Project plans', 'Task lists', 'Basic timelines'],
        skillLevel: 'Basic'
      },
      {
        id: 'standard-operating-procedures',
        name: 'Standard Operating Procedures',
        description: 'Basic SOPs, process documentation, workflow guides',
        examples: ['SOPs', 'Process guides', 'Workflow documentation'],
        skillLevel: 'Basic'
      },
      {
        id: 'team-coordination-communication',
        name: 'Team Coordination & Communication',
        description: 'Team meetings, coordination, basic collaboration',
        examples: ['Meeting agendas', 'Team updates', 'Coordination plans'],
        skillLevel: 'Basic'
      },
      {
        id: 'basic-quality-control',
        name: 'Basic Quality Control',
        description: 'Simple quality checks, basic standards, review processes',
        examples: ['Quality checklists', 'Review processes', 'Basic standards'],
        skillLevel: 'Basic'
      },
      // Intermediate Level
      {
        id: 'process-improvement-optimization',
        name: 'Process Improvement & Optimization',
        description: 'Process analysis, improvement initiatives, efficiency optimization',
        examples: ['Process maps', 'Improvement plans', 'Efficiency analysis'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'project-management-planning',
        name: 'Project Management & Planning',
        description: 'Advanced project management, resource planning, risk management',
        examples: ['Project charters', 'Resource plans', 'Risk assessments'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'workflow-automation-systems',
        name: 'Workflow Automation & Systems',
        description: 'Automation design, system optimization, workflow engineering',
        examples: ['Automation workflows', 'System designs', 'Process automation'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'performance-management-metrics',
        name: 'Performance Management & Metrics',
        description: 'Performance frameworks, operational metrics, improvement tracking',
        examples: ['Performance dashboards', 'Operational metrics', 'Improvement tracking'],
        skillLevel: 'Intermediate'
      },
      // Advanced Level
      {
        id: 'lean-six-sigma-implementation',
        name: 'Lean & Six Sigma Implementation',
        description: 'Lean methodologies, Six Sigma projects, continuous improvement',
        examples: ['Lean implementations', 'Six Sigma projects', 'Continuous improvement'],
        skillLevel: 'Advanced'
      },
      {
        id: 'supply-chain-logistics',
        name: 'Supply Chain & Logistics',
        description: 'Supply chain optimization, logistics management, vendor coordination',
        examples: ['Supply chain strategies', 'Logistics optimization', 'Vendor management'],
        skillLevel: 'Advanced'
      },
      {
        id: 'change-management-transformation',
        name: 'Change Management & Transformation',
        description: 'Organizational change, transformation initiatives, change leadership',
        examples: ['Change strategies', 'Transformation plans', 'Change communication'],
        skillLevel: 'Advanced'
      },
      {
        id: 'enterprise-operations-governance',
        name: 'Enterprise Operations & Governance',
        description: 'Enterprise operations, governance frameworks, strategic operations',
        examples: ['Governance frameworks', 'Enterprise operations', 'Strategic oversight'],
        skillLevel: 'Advanced'
      }
    ]
  },
  {
    id: 'learning-development',
    name: '📚 Learning & Development',
    icon: GraduationCap,
    description: 'Training programs, skill development, and knowledge management',
    promptCount: 0,
    bgGradient: 'from-indigo-600/20 to-purple-600/20',
    crossIndustry: true,
    subcategories: [
      // Basic Level
      {
        id: 'basic-training-materials',
        name: 'Basic Training Materials',
        description: 'Simple training content, basic guides, introductory materials',
        examples: ['Training guides', 'Basic presentations', 'Introductory materials'],
        skillLevel: 'Basic'
      },
      {
        id: 'employee-onboarding',
        name: 'Employee Onboarding',
        description: 'New hire orientation, basic onboarding, welcome programs',
        examples: ['Onboarding checklists', 'Welcome materials', 'Orientation guides'],
        skillLevel: 'Basic'
      },
      {
        id: 'skill-assessment-planning',
        name: 'Skill Assessment & Planning',
        description: 'Basic skill assessments, development planning, learning paths',
        examples: ['Skill assessments', 'Development plans', 'Learning objectives'],
        skillLevel: 'Basic'
      },
      {
        id: 'knowledge-sharing-documentation',
        name: 'Knowledge Sharing & Documentation',
        description: 'Knowledge bases, documentation, information sharing',
        examples: ['Knowledge articles', 'Documentation', 'Information repositories'],
        skillLevel: 'Basic'
      },
      // Intermediate Level
      {
        id: 'training-program-development',
        name: 'Training Program Development',
        description: 'Curriculum design, program development, learning strategies',
        examples: ['Training curricula', 'Program designs', 'Learning strategies'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'performance-coaching-development',
        name: 'Performance Coaching & Development',
        description: 'Coaching frameworks, performance development, skill building',
        examples: ['Coaching plans', 'Development frameworks', 'Skill building programs'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'leadership-development',
        name: 'Leadership Development',
        description: 'Leadership training, management development, executive coaching',
        examples: ['Leadership programs', 'Management training', 'Executive development'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'learning-technology-platforms',
        name: 'Learning Technology & Platforms',
        description: 'LMS management, e-learning development, technology integration',
        examples: ['LMS strategies', 'E-learning content', 'Technology integration'],
        skillLevel: 'Intermediate'
      },
      // Advanced Level
      {
        id: 'organizational-learning-strategy',
        name: 'Organizational Learning Strategy',
        description: 'Learning strategy, organizational development, culture transformation',
        examples: ['Learning strategies', 'Organizational development', 'Culture initiatives'],
        skillLevel: 'Advanced'
      },
      {
        id: 'competency-frameworks-models',
        name: 'Competency Frameworks & Models',
        description: 'Competency modeling, skill frameworks, capability development',
        examples: ['Competency models', 'Skill frameworks', 'Capability assessments'],
        skillLevel: 'Advanced'
      },
      {
        id: 'learning-analytics-measurement',
        name: 'Learning Analytics & Measurement',
        description: 'Learning analytics, ROI measurement, impact assessment',
        examples: ['Learning analytics', 'ROI studies', 'Impact measurements'],
        skillLevel: 'Advanced'
      },
      {
        id: 'innovation-learning-development',
        name: 'Innovation in Learning & Development',
        description: 'Learning innovation, emerging technologies, future of work preparation',
        examples: ['Learning innovation', 'Emerging tech integration', 'Future skills development'],
        skillLevel: 'Advanced'
      }
    ]
  },
  {
    id: 'legal-compliance',
    name: '⚖️ Legal & Compliance',
    icon: Scale,
    description: 'Legal documentation, regulatory compliance, and risk management',
    promptCount: 0,
    bgGradient: 'from-slate-600/20 to-zinc-600/20',
    subcategories: [
      // Basic Level
      {
        id: 'basic-legal-documentation',
        name: 'Basic Legal Documentation',
        description: 'Simple contracts, basic legal forms, standard agreements',
        examples: ['Service agreements', 'Basic contracts', 'Standard forms'],
        skillLevel: 'Basic'
      },
      {
        id: 'compliance-basics',
        name: 'Compliance Basics',
        description: 'Basic compliance requirements, simple policies, standard procedures',
        examples: ['Basic policies', 'Compliance checklists', 'Standard procedures'],
        skillLevel: 'Basic'
      },
      {
        id: 'contract-management-fundamentals',
        name: 'Contract Management Fundamentals',
        description: 'Contract basics, simple negotiations, standard terms',
        examples: ['Contract templates', 'Basic negotiations', 'Standard terms'],
        skillLevel: 'Basic'
      },
      {
        id: 'risk-awareness-basic-mitigation',
        name: 'Risk Awareness & Basic Mitigation',
        description: 'Risk identification, basic mitigation, simple risk management',
        examples: ['Risk checklists', 'Basic mitigation', 'Simple assessments'],
        skillLevel: 'Basic'
      },
      // Intermediate Level
      {
        id: 'regulatory-compliance-management',
        name: 'Regulatory Compliance Management',
        description: 'Regulatory frameworks, compliance programs, audit preparation',
        examples: ['Compliance programs', 'Regulatory frameworks', 'Audit preparations'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'contract-negotiation-management',
        name: 'Contract Negotiation & Management',
        description: 'Contract negotiations, vendor management, agreement optimization',
        examples: ['Contract negotiations', 'Vendor agreements', 'Contract optimization'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'corporate-governance-policies',
        name: 'Corporate Governance & Policies',
        description: 'Governance frameworks, corporate policies, board management',
        examples: ['Governance policies', 'Board materials', 'Corporate procedures'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'employment-law-hr-compliance',
        name: 'Employment Law & HR Compliance',
        description: 'Employment regulations, HR compliance, workplace policies',
        examples: ['Employment policies', 'HR compliance', 'Workplace regulations'],
        skillLevel: 'Intermediate'
      },
      // Advanced Level
      {
        id: 'complex-legal-strategy-litigation',
        name: 'Complex Legal Strategy & Litigation',
        description: 'Legal strategy, litigation management, complex legal matters',
        examples: ['Legal strategies', 'Litigation plans', 'Complex legal analysis'],
        skillLevel: 'Advanced'
      },
      {
        id: 'advanced-regulatory-industry-compliance',
        name: 'Advanced Regulatory & Industry Compliance',
        description: 'Industry-specific regulations, advanced compliance, specialized requirements',
        examples: ['Industry regulations', 'Specialized compliance', 'Regulatory strategy'],
        skillLevel: 'Advanced'
      },
      {
        id: 'intellectual-property-technology-law',
        name: 'Intellectual Property & Technology Law',
        description: 'IP protection, technology law, patent management',
        examples: ['IP strategies', 'Patent applications', 'Technology agreements'],
        skillLevel: 'Advanced'
      },
      {
        id: 'international-law-cross-border-compliance',
        name: 'International Law & Cross-Border Compliance',
        description: 'International regulations, cross-border compliance, global legal matters',
        examples: ['International agreements', 'Cross-border compliance', 'Global legal strategies'],
        skillLevel: 'Advanced'
      }
    ]
  },
  {
    id: 'healthcare-clinical',
    name: '🏥 Healthcare & Clinical',
    icon: Stethoscope,
    description: 'Clinical documentation, patient care, and healthcare administration',
    promptCount: 0,
    bgGradient: 'from-red-600/20 to-rose-600/20',
    subcategories: [
      // Basic Level
      {
        id: 'basic-patient-communication',
        name: 'Basic Patient Communication',
        description: 'Patient interactions, basic communication, appointment scheduling',
        examples: ['Patient communications', 'Appointment reminders', 'Basic instructions'],
        skillLevel: 'Basic'
      },
      {
        id: 'health-education-patient-information',
        name: 'Health Education & Patient Information',
        description: 'Patient education materials, health information, basic wellness content',
        examples: ['Patient education', 'Health information', 'Wellness materials'],
        skillLevel: 'Basic'
      },
      {
        id: 'basic-medical-documentation',
        name: 'Basic Medical Documentation',
        description: 'Simple medical records, basic documentation, routine notes',
        examples: ['Basic medical records', 'Routine documentation', 'Simple notes'],
        skillLevel: 'Basic'
      },
      {
        id: 'healthcare-administration-basics',
        name: 'Healthcare Administration Basics',
        description: 'Basic administrative tasks, scheduling, simple healthcare operations',
        examples: ['Administrative procedures', 'Scheduling systems', 'Basic operations'],
        skillLevel: 'Basic'
      },
      // Intermediate Level
      {
        id: 'clinical-documentation-records',
        name: 'Clinical Documentation & Records',
        description: 'Clinical notes, medical records, documentation standards',
        examples: ['Clinical notes', 'Medical records', 'Documentation protocols'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'patient-care-planning-management',
        name: 'Patient Care Planning & Management',
        description: 'Care plans, patient management, treatment coordination',
        examples: ['Care plans', 'Patient management', 'Treatment coordination'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'healthcare-quality-safety',
        name: 'Healthcare Quality & Safety',
        description: 'Quality improvement, safety protocols, clinical standards',
        examples: ['Quality programs', 'Safety protocols', 'Clinical standards'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'medical-billing-coding',
        name: 'Medical Billing & Coding',
        description: 'Medical coding, billing procedures, insurance processing',
        examples: ['Medical coding', 'Billing procedures', 'Insurance claims'],
        skillLevel: 'Intermediate'
      },
      // Advanced Level
      {
        id: 'advanced-clinical-practice-specialization',
        name: 'Advanced Clinical Practice & Specialization',
        description: 'Specialized clinical practice, advanced procedures, expert care',
        examples: ['Specialized protocols', 'Advanced procedures', 'Expert consultations'],
        skillLevel: 'Advanced'
      },
      {
        id: 'clinical-research-evidence-based-practice',
        name: 'Clinical Research & Evidence-Based Practice',
        description: 'Clinical research, evidence-based medicine, research protocols',
        examples: ['Research protocols', 'Clinical studies', 'Evidence-based guidelines'],
        skillLevel: 'Advanced'
      },
      {
        id: 'healthcare-technology-informatics',
        name: 'Healthcare Technology & Informatics',
        description: 'Health informatics, medical technology, digital health solutions',
        examples: ['Health informatics', 'Medical technology', 'Digital health strategies'],
        skillLevel: 'Advanced'
      },
      {
        id: 'healthcare-leadership-strategic-management',
        name: 'Healthcare Leadership & Strategic Management',
        description: 'Healthcare strategy, leadership, organizational management',
        examples: ['Healthcare strategy', 'Leadership development', 'Organizational management'],
        skillLevel: 'Advanced'
      }
    ]
  },
  {
    id: 'technology-development',
    name: '💻 Technology & Development',
    icon: Code,
    description: 'Software development, system architecture, and technical implementation',
    promptCount: 0,
    bgGradient: 'from-emerald-600/20 to-teal-600/20',
    featured: true,
    subcategories: [
      // Basic Level
      {
        id: 'basic-programming-scripting',
        name: 'Basic Programming & Scripting',
        description: 'Simple coding tasks, basic scripts, introductory programming',
        examples: ['Basic scripts', 'Simple programs', 'Introductory coding'],
        skillLevel: 'Basic'
      },
      {
        id: 'technical-documentation-basics',
        name: 'Technical Documentation Basics',
        description: 'Basic technical writing, simple documentation, user guides',
        examples: ['User guides', 'Basic documentation', 'Simple technical writing'],
        skillLevel: 'Basic'
      },
      {
        id: 'system-administration-fundamentals',
        name: 'System Administration Fundamentals',
        description: 'Basic system management, simple configurations, routine maintenance',
        examples: ['System configurations', 'Basic administration', 'Routine maintenance'],
        skillLevel: 'Basic'
      },
      {
        id: 'web-development-basics',
        name: 'Web Development Basics',
        description: 'Simple websites, basic web development, introductory web technologies',
        examples: ['Simple websites', 'Basic web development', 'Introductory web projects'],
        skillLevel: 'Basic'
      },
      // Intermediate Level
      {
        id: 'software-development-engineering',
        name: 'Software Development & Engineering',
        description: 'Application development, software engineering, development methodologies',
        examples: ['Application development', 'Software engineering', 'Development projects'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'system-architecture-design',
        name: 'System Architecture & Design',
        description: 'System design, architecture planning, technical specifications',
        examples: ['System architecture', 'Design patterns', 'Technical specifications'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'devops-automation',
        name: 'DevOps & Automation',
        description: 'DevOps practices, automation, CI/CD pipelines',
        examples: ['DevOps pipelines', 'Automation scripts', 'Infrastructure management'],
        skillLevel: 'Intermediate'
      },
      {
        id: 'database-design-management',
        name: 'Database Design & Management',
        description: 'Database architecture, data modeling, database administration',
        examples: ['Database design', 'Data modeling', 'Database optimization'],
        skillLevel: 'Intermediate'
      },
      // Advanced Level
      {
        id: 'enterprise-architecture-strategy',
        name: 'Enterprise Architecture & Strategy',
        description: 'Enterprise systems, architectural strategy, technology leadership',
        examples: ['Enterprise architecture', 'Technology strategy', 'Architectural governance'],
        skillLevel: 'Advanced'
      },
      {
        id: 'advanced-development-innovation',
        name: 'Advanced Development & Innovation',
        description: 'Advanced programming, innovative solutions, cutting-edge development',
        examples: ['Advanced algorithms', 'Innovative solutions', 'Research development'],
        skillLevel: 'Advanced'
      },
      {
        id: 'cloud-architecture-infrastructure',
        name: 'Cloud Architecture & Infrastructure',
        description: 'Cloud solutions, infrastructure design, scalable architectures',
        examples: ['Cloud architecture', 'Infrastructure design', 'Scalable solutions'],
        skillLevel: 'Advanced'
      },
      {
        id: 'ai-ml-development-implementation',
        name: 'AI/ML Development & Implementation',
        description: 'AI development, machine learning, intelligent systems',
        examples: ['AI development', 'ML models', 'Intelligent system design'],
        skillLevel: 'Advanced'
      }
    ]
  }
];
