import { useState, useEffect, useCallback } from 'react';
import UserPreferencesService, { type UserPreferences } from '../services/UserPreferencesService';
import type { SkillLevel } from '../data/categories-data';

interface UseUserPreferencesReturn {
  preferences: UserPreferences;
  industries: string[];
  skillLevel: SkillLevel | null;
  favoriteCategories: string[];
  recentlyUsedPrompts: string[];
  customizations: UserPreferences['customizations'];
  onboardingCompleted: boolean;
  
  // Actions
  updateIndustries: (industries: string[]) => void;
  updateSkillLevel: (skillLevel: SkillLevel) => void;
  completeOnboarding: (industries: string[], skillLevel: SkillLevel) => void;
  addFavoriteCategory: (categoryId: string) => void;
  removeFavoriteCategory: (categoryId: string) => void;
  toggleFavoriteCategory: (categoryId: string) => void;
  addRecentlyUsedPrompt: (promptId: string) => void;
  updateCustomizations: (customizations: Partial<UserPreferences['customizations']>) => void;
  resetPreferences: () => void;
  
  // Utilities
  needsOnboarding: () => boolean;
  hasIndustryPreference: (industryId: string) => boolean;
  isCategoryFavorited: (categoryId: string) => boolean;
  getPersonalizedRecommendations: () => {
    suggestedCategories: string[];
    suggestedSkillLevel: SkillLevel | null;
    showOnboarding: boolean;
  };
}

export const useUserPreferences = (): UseUserPreferencesReturn => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => 
    UserPreferencesService.loadPreferences()
  );

  // Reload preferences when localStorage changes (e.g., from another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ethosprompt_user_preferences') {
        setPreferences(UserPreferencesService.loadPreferences());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update industries
  const updateIndustries = useCallback((industries: string[]) => {
    UserPreferencesService.updateIndustries(industries);
    setPreferences(UserPreferencesService.loadPreferences());
  }, []);

  // Update skill level
  const updateSkillLevel = useCallback((skillLevel: SkillLevel) => {
    UserPreferencesService.updateSkillLevel(skillLevel);
    setPreferences(UserPreferencesService.loadPreferences());
  }, []);

  // Complete onboarding
  const completeOnboarding = useCallback((industries: string[], skillLevel: SkillLevel) => {
    UserPreferencesService.completeOnboarding(industries, skillLevel);
    setPreferences(UserPreferencesService.loadPreferences());
  }, []);

  // Add favorite category
  const addFavoriteCategory = useCallback((categoryId: string) => {
    UserPreferencesService.addFavoriteCategory(categoryId);
    setPreferences(UserPreferencesService.loadPreferences());
  }, []);

  // Remove favorite category
  const removeFavoriteCategory = useCallback((categoryId: string) => {
    UserPreferencesService.removeFavoriteCategory(categoryId);
    setPreferences(UserPreferencesService.loadPreferences());
  }, []);

  // Toggle favorite category
  const toggleFavoriteCategory = useCallback((categoryId: string) => {
    if (UserPreferencesService.isCategoryFavorited(categoryId)) {
      removeFavoriteCategory(categoryId);
    } else {
      addFavoriteCategory(categoryId);
    }
  }, [addFavoriteCategory, removeFavoriteCategory]);

  // Add recently used prompt
  const addRecentlyUsedPrompt = useCallback((promptId: string) => {
    UserPreferencesService.addRecentlyUsedPrompt(promptId);
    setPreferences(UserPreferencesService.loadPreferences());
  }, []);

  // Update customizations
  const updateCustomizations = useCallback((customizations: Partial<UserPreferences['customizations']>) => {
    UserPreferencesService.updateCustomizations(customizations);
    setPreferences(UserPreferencesService.loadPreferences());
  }, []);

  // Reset preferences
  const resetPreferences = useCallback(() => {
    UserPreferencesService.resetPreferences();
    setPreferences(UserPreferencesService.loadPreferences());
  }, []);

  // Check if onboarding is needed
  const needsOnboarding = useCallback(() => {
    return UserPreferencesService.needsOnboarding();
  }, []);

  // Check if user has specific industry preference
  const hasIndustryPreference = useCallback((industryId: string) => {
    return UserPreferencesService.hasIndustryPreference(industryId);
  }, []);

  // Check if category is favorited
  const isCategoryFavorited = useCallback((categoryId: string) => {
    return UserPreferencesService.isCategoryFavorited(categoryId);
  }, []);

  // Get personalized recommendations
  const getPersonalizedRecommendations = useCallback(() => {
    return UserPreferencesService.getPersonalizedRecommendations();
  }, []);

  return {
    preferences,
    industries: preferences.industries,
    skillLevel: preferences.skillLevel,
    favoriteCategories: preferences.favoriteCategories,
    recentlyUsedPrompts: preferences.recentlyUsedPrompts,
    customizations: preferences.customizations,
    onboardingCompleted: preferences.onboardingCompleted,
    
    // Actions
    updateIndustries,
    updateSkillLevel,
    completeOnboarding,
    addFavoriteCategory,
    removeFavoriteCategory,
    toggleFavoriteCategory,
    addRecentlyUsedPrompt,
    updateCustomizations,
    resetPreferences,
    
    // Utilities
    needsOnboarding,
    hasIndustryPreference,
    isCategoryFavorited,
    getPersonalizedRecommendations
  };
};

export default useUserPreferences;
