import type { Category, Subcategory, SkillLevel } from '../data/categories-data';

export interface IndustryCustomization {
  industryId: string;
  industryName: string;
  categoryCustomizations: CategoryCustomization[];
  promptVariations: PromptVariation[];
  skillLevelAdjustments: SkillLevelAdjustment[];
}

export interface CategoryCustomization {
  categoryId: string;
  industryRelevance: 'high' | 'medium' | 'low';
  customDescription?: string;
  featuredSubcategories: string[];
  industrySpecificSubcategories?: Subcategory[];
}

export interface PromptVariation {
  basePromptId: string;
  industryId: string;
  variation: string;
  context: string;
  examples: string[];
}

export interface SkillLevelAdjustment {
  industryId: string;
  categoryId: string;
  skillLevel: SkillLevel;
  adjustments: {
    complexity: 'simplified' | 'enhanced' | 'specialized';
    terminology: 'basic' | 'technical' | 'expert';
    examples: string[];
  };
}

// Industry-specific customizations
const industryCustomizations: Record<string, IndustryCustomization> = {
  technology: {
    industryId: 'technology',
    industryName: 'Technology & Software',
    categoryCustomizations: [
      {
        categoryId: 'technology-development',
        industryRelevance: 'high',
        customDescription: 'Software development, system architecture, and technical implementation workflows optimized for tech teams',
        featuredSubcategories: ['software-development-engineering', 'system-architecture-design', 'devops-automation']
      },
      {
        categoryId: 'strategy-planning',
        industryRelevance: 'high',
        customDescription: 'Product strategy, technical roadmaps, and innovation planning for technology companies',
        featuredSubcategories: ['innovation-strategy', 'digital-transformation-strategy']
      },
      {
        categoryId: 'data-analysis',
        industryRelevance: 'high',
        featuredSubcategories: ['data-science-machine-learning', 'big-data-advanced-analytics']
      }
    ],
    promptVariations: [
      {
        basePromptId: 'strategy-planning-basic',
        industryId: 'technology',
        variation: 'Create a product roadmap for a SaaS application focusing on [feature/goal]. Include technical milestones, user story priorities, and sprint planning considerations.',
        context: 'Software product development',
        examples: ['Feature prioritization', 'Technical debt planning', 'API development roadmap']
      }
    ],
    skillLevelAdjustments: [
      {
        industryId: 'technology',
        categoryId: 'technology-development',
        skillLevel: 'Basic',
        adjustments: {
          complexity: 'simplified',
          terminology: 'basic',
          examples: ['Simple scripts', 'Basic documentation', 'Code comments']
        }
      }
    ]
  },
  healthcare: {
    industryId: 'healthcare',
    industryName: 'Healthcare & Medical',
    categoryCustomizations: [
      {
        categoryId: 'healthcare-clinical',
        industryRelevance: 'high',
        customDescription: 'Clinical documentation, patient care protocols, and healthcare administration workflows',
        featuredSubcategories: ['clinical-documentation-records', 'patient-care-planning-management']
      },
      {
        categoryId: 'legal-compliance',
        industryRelevance: 'high',
        customDescription: 'Healthcare compliance, HIPAA documentation, and medical regulatory requirements',
        featuredSubcategories: ['regulatory-compliance-management', 'advanced-regulatory-industry-compliance']
      }
    ],
    promptVariations: [
      {
        basePromptId: 'documentation-basic',
        industryId: 'healthcare',
        variation: 'Create patient education materials about [condition/treatment] that are easy to understand and HIPAA-compliant.',
        context: 'Patient education and communication',
        examples: ['Treatment explanations', 'Discharge instructions', 'Preventive care guides']
      }
    ],
    skillLevelAdjustments: [
      {
        industryId: 'healthcare',
        categoryId: 'healthcare-clinical',
        skillLevel: 'Advanced',
        adjustments: {
          complexity: 'specialized',
          terminology: 'expert',
          examples: ['Clinical research protocols', 'Specialized procedures', 'Medical device documentation']
        }
      }
    ]
  },
  finance: {
    industryId: 'finance',
    industryName: 'Finance & Banking',
    categoryCustomizations: [
      {
        categoryId: 'data-analysis',
        industryRelevance: 'high',
        customDescription: 'Financial analysis, risk modeling, and investment research workflows',
        featuredSubcategories: ['financial-analysis-modeling', 'predictive-analytics-forecasting']
      },
      {
        categoryId: 'legal-compliance',
        industryRelevance: 'high',
        customDescription: 'Financial regulations, compliance reporting, and risk management documentation',
        featuredSubcategories: ['regulatory-compliance-management', 'advanced-regulatory-industry-compliance']
      }
    ],
    promptVariations: [
      {
        basePromptId: 'analysis-intermediate',
        industryId: 'finance',
        variation: 'Analyze the financial performance of [company/portfolio] focusing on key metrics like ROI, risk-adjusted returns, and market volatility.',
        context: 'Financial analysis and reporting',
        examples: ['Portfolio analysis', 'Risk assessments', 'Investment recommendations']
      }
    ],
    skillLevelAdjustments: []
  }
};

export class IndustryCustomizationService {
  /**
   * Get industry-specific customizations for categories
   */
  static getCategoryCustomizations(industryIds: string[]): CategoryCustomization[] {
    const customizations: CategoryCustomization[] = [];
    
    industryIds.forEach(industryId => {
      const industry = industryCustomizations[industryId];
      if (industry) {
        customizations.push(...industry.categoryCustomizations);
      }
    });
    
    return customizations;
  }

  /**
   * Filter and prioritize categories based on industry relevance
   */
  static prioritizeCategories(categories: Category[], industryIds: string[]): Category[] {
    if (industryIds.length === 0) return categories;
    
    const customizations = this.getCategoryCustomizations(industryIds);
    const relevanceMap = new Map<string, 'high' | 'medium' | 'low'>();
    
    customizations.forEach(custom => {
      const existing = relevanceMap.get(custom.categoryId);
      if (!existing || custom.industryRelevance === 'high') {
        relevanceMap.set(custom.categoryId, custom.industryRelevance);
      }
    });
    
    return categories.sort((a, b) => {
      const aRelevance = relevanceMap.get(a.id) || 'medium';
      const bRelevance = relevanceMap.get(b.id) || 'medium';
      
      const relevanceOrder = { high: 3, medium: 2, low: 1 };
      return relevanceOrder[bRelevance] - relevanceOrder[aRelevance];
    });
  }

  /**
   * Get industry-specific prompt variations
   */
  static getPromptVariations(basePromptId: string, industryIds: string[]): PromptVariation[] {
    const variations: PromptVariation[] = [];
    
    industryIds.forEach(industryId => {
      const industry = industryCustomizations[industryId];
      if (industry) {
        const industryVariations = industry.promptVariations.filter(
          variation => variation.basePromptId === basePromptId
        );
        variations.push(...industryVariations);
      }
    });
    
    return variations;
  }

  /**
   * Get featured subcategories for industries
   */
  static getFeaturedSubcategories(categoryId: string, industryIds: string[]): string[] {
    const featured = new Set<string>();
    
    industryIds.forEach(industryId => {
      const industry = industryCustomizations[industryId];
      if (industry) {
        const categoryCustomization = industry.categoryCustomizations.find(
          custom => custom.categoryId === categoryId
        );
        if (categoryCustomization) {
          categoryCustomization.featuredSubcategories.forEach(subId => featured.add(subId));
        }
      }
    });
    
    return Array.from(featured);
  }

  /**
   * Get industry-specific category description
   */
  static getCustomCategoryDescription(categoryId: string, industryIds: string[]): string | null {
    for (const industryId of industryIds) {
      const industry = industryCustomizations[industryId];
      if (industry) {
        const customization = industry.categoryCustomizations.find(
          custom => custom.categoryId === categoryId
        );
        if (customization?.customDescription) {
          return customization.customDescription;
        }
      }
    }
    return null;
  }

  /**
   * Get skill level adjustments for industry and category
   */
  static getSkillLevelAdjustments(
    categoryId: string, 
    skillLevel: SkillLevel, 
    industryIds: string[]
  ): SkillLevelAdjustment | null {
    for (const industryId of industryIds) {
      const industry = industryCustomizations[industryId];
      if (industry) {
        const adjustment = industry.skillLevelAdjustments.find(
          adj => adj.categoryId === categoryId && 
                 adj.skillLevel === skillLevel && 
                 adj.industryId === industryId
        );
        if (adjustment) return adjustment;
      }
    }
    return null;
  }

  /**
   * Get all available industries
   */
  static getAvailableIndustries(): Array<{id: string, name: string}> {
    return Object.values(industryCustomizations).map(industry => ({
      id: industry.industryId,
      name: industry.industryName
    }));
  }

  /**
   * Check if an industry has customizations
   */
  static hasIndustryCustomizations(industryId: string): boolean {
    return industryId in industryCustomizations;
  }

  /**
   * Get industry-specific onboarding recommendations
   */
  static getOnboardingRecommendations(industryIds: string[], skillLevel: SkillLevel): {
    recommendedCategories: string[];
    recommendedSubcategories: string[];
    startingPrompts: string[];
  } {
    const customizations = this.getCategoryCustomizations(industryIds);
    const highRelevanceCategories = customizations
      .filter(custom => custom.industryRelevance === 'high')
      .map(custom => custom.categoryId);
    
    const featuredSubcategories = customizations
      .flatMap(custom => custom.featuredSubcategories)
      .slice(0, 6); // Limit to top 6
    
    // Basic starting prompts based on skill level
    const startingPrompts = skillLevel === 'Basic' 
      ? ['basic-email-template', 'simple-report-structure', 'meeting-agenda-template']
      : skillLevel === 'Intermediate'
      ? ['content-strategy-framework', 'process-optimization-plan', 'data-analysis-template']
      : ['strategic-planning-framework', 'advanced-analysis-methodology', 'innovation-strategy-template'];
    
    return {
      recommendedCategories: highRelevanceCategories.slice(0, 3),
      recommendedSubcategories: featuredSubcategories,
      startingPrompts
    };
  }
}

export default IndustryCustomizationService;
