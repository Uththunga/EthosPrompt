import type { SkillLevel } from '../data/categories-data';

export interface UserPreferences {
  industries: string[];
  skillLevel: SkillLevel | null;
  onboardingCompleted: boolean;
  favoriteCategories: string[];
  recentlyUsedPrompts: string[];
  customizations: {
    showIndustryFilters: boolean;
    showSkillLevelFilters: boolean;
    defaultView: 'grid' | 'list';
    promptsPerPage: number;
  };
  lastUpdated: string;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  industries: [],
  skillLevel: null,
  onboardingCompleted: false,
  favoriteCategories: [],
  recentlyUsedPrompts: [],
  customizations: {
    showIndustryFilters: true,
    showSkillLevelFilters: true,
    defaultView: 'grid',
    promptsPerPage: 12
  },
  lastUpdated: new Date().toISOString()
};

const STORAGE_KEY = 'ethosprompt_user_preferences';

export class UserPreferencesService {
  /**
   * Load user preferences from localStorage
   */
  static loadPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure all properties exist
        return {
          ...DEFAULT_PREFERENCES,
          ...parsed,
          customizations: {
            ...DEFAULT_PREFERENCES.customizations,
            ...parsed.customizations
          }
        };
      }
    } catch (error) {
      console.warn('Failed to load user preferences:', error);
    }
    return DEFAULT_PREFERENCES;
  }

  /**
   * Save user preferences to localStorage
   */
  static savePreferences(preferences: Partial<UserPreferences>): void {
    try {
      const current = this.loadPreferences();
      const updated = {
        ...current,
        ...preferences,
        customizations: {
          ...current.customizations,
          ...preferences.customizations
        },
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save user preferences:', error);
    }
  }

  /**
   * Update industry preferences
   */
  static updateIndustries(industries: string[]): void {
    this.savePreferences({ industries });
  }

  /**
   * Update skill level preference
   */
  static updateSkillLevel(skillLevel: SkillLevel): void {
    this.savePreferences({ skillLevel });
  }

  /**
   * Mark onboarding as completed
   */
  static completeOnboarding(industries: string[], skillLevel: SkillLevel): void {
    this.savePreferences({
      industries,
      skillLevel,
      onboardingCompleted: true
    });
  }

  /**
   * Add category to favorites
   */
  static addFavoriteCategory(categoryId: string): void {
    const preferences = this.loadPreferences();
    if (!preferences.favoriteCategories.includes(categoryId)) {
      const favoriteCategories = [...preferences.favoriteCategories, categoryId];
      this.savePreferences({ favoriteCategories });
    }
  }

  /**
   * Remove category from favorites
   */
  static removeFavoriteCategory(categoryId: string): void {
    const preferences = this.loadPreferences();
    const favoriteCategories = preferences.favoriteCategories.filter(id => id !== categoryId);
    this.savePreferences({ favoriteCategories });
  }

  /**
   * Add prompt to recently used
   */
  static addRecentlyUsedPrompt(promptId: string): void {
    const preferences = this.loadPreferences();
    const recentlyUsedPrompts = [
      promptId,
      ...preferences.recentlyUsedPrompts.filter(id => id !== promptId)
    ].slice(0, 20); // Keep only last 20
    this.savePreferences({ recentlyUsedPrompts });
  }

  /**
   * Update customization settings
   */
  static updateCustomizations(customizations: Partial<UserPreferences['customizations']>): void {
    const preferences = this.loadPreferences();
    this.savePreferences({
      customizations: {
        ...preferences.customizations,
        ...customizations
      }
    });
  }

  /**
   * Check if user needs onboarding
   */
  static needsOnboarding(): boolean {
    const preferences = this.loadPreferences();
    return !preferences.onboardingCompleted;
  }

  /**
   * Get user's industry preferences
   */
  static getIndustries(): string[] {
    return this.loadPreferences().industries;
  }

  /**
   * Get user's skill level preference
   */
  static getSkillLevel(): SkillLevel | null {
    return this.loadPreferences().skillLevel;
  }

  /**
   * Get user's favorite categories
   */
  static getFavoriteCategories(): string[] {
    return this.loadPreferences().favoriteCategories;
  }

  /**
   * Get recently used prompts
   */
  static getRecentlyUsedPrompts(): string[] {
    return this.loadPreferences().recentlyUsedPrompts;
  }

  /**
   * Get customization settings
   */
  static getCustomizations(): UserPreferences['customizations'] {
    return this.loadPreferences().customizations;
  }

  /**
   * Reset all preferences to defaults
   */
  static resetPreferences(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to reset preferences:', error);
    }
  }

  /**
   * Export preferences for backup
   */
  static exportPreferences(): string {
    const preferences = this.loadPreferences();
    return JSON.stringify(preferences, null, 2);
  }

  /**
   * Import preferences from backup
   */
  static importPreferences(preferencesJson: string): boolean {
    try {
      const preferences = JSON.parse(preferencesJson);
      // Validate the structure
      if (typeof preferences === 'object' && preferences !== null) {
        this.savePreferences(preferences);
        return true;
      }
    } catch (error) {
      console.error('Failed to import preferences:', error);
    }
    return false;
  }

  /**
   * Get preferences summary for display
   */
  static getPreferencesSummary(): {
    industries: string[];
    skillLevel: SkillLevel | null;
    favoriteCount: number;
    recentPromptCount: number;
    onboardingCompleted: boolean;
  } {
    const preferences = this.loadPreferences();
    return {
      industries: preferences.industries,
      skillLevel: preferences.skillLevel,
      favoriteCount: preferences.favoriteCategories.length,
      recentPromptCount: preferences.recentlyUsedPrompts.length,
      onboardingCompleted: preferences.onboardingCompleted
    };
  }

  /**
   * Check if user has specific industry preference
   */
  static hasIndustryPreference(industryId: string): boolean {
    return this.getIndustries().includes(industryId);
  }

  /**
   * Check if category is favorited
   */
  static isCategoryFavorited(categoryId: string): boolean {
    return this.getFavoriteCategories().includes(categoryId);
  }

  /**
   * Get personalized recommendations based on preferences
   */
  static getPersonalizedRecommendations(): {
    suggestedCategories: string[];
    suggestedSkillLevel: SkillLevel | null;
    showOnboarding: boolean;
  } {
    const preferences = this.loadPreferences();
    
    // If no industries selected, suggest popular ones
    const suggestedCategories = preferences.industries.length > 0
      ? [] // User already has preferences
      : ['strategy-planning', 'content-communication', 'data-analysis']; // Default suggestions
    
    // Suggest skill level progression
    const suggestedSkillLevel = preferences.skillLevel === 'Basic' 
      ? 'Intermediate' 
      : preferences.skillLevel === 'Intermediate'
      ? 'Advanced'
      : null;
    
    return {
      suggestedCategories,
      suggestedSkillLevel,
      showOnboarding: !preferences.onboardingCompleted
    };
  }
}

export default UserPreferencesService;
