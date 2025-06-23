/**
 * 9-Category Framework Integration Tests
 * 
 * Comprehensive test suite validating the complete 9-category framework
 * implementation including database integration, frontend components,
 * and industry customization features.
 */

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { categories } from '../src/data/categories-data.js';
import IndustryCustomizationService from '../src/services/IndustryCustomizationService.js';
import UserPreferencesService from '../src/services/UserPreferencesService.js';

describe('9-Category Framework Integration Tests', () => {
  
  describe('Category Structure Validation', () => {
    test('should have exactly 9 categories', () => {
      expect(categories).toHaveLength(9);
    });

    test('should have all expected category IDs', () => {
      const expectedCategoryIds = [
        'strategy-planning',
        'content-communication', 
        'data-analysis',
        'customer-sales',
        'operations-process',
        'learning-development',
        'legal-compliance',
        'healthcare-clinical',
        'technology-development'
      ];
      
      const actualCategoryIds = categories.map(cat => cat.id).sort();
      expect(actualCategoryIds).toEqual(expectedCategoryIds.sort());
    });

    test('should have 12 subcategories per category', () => {
      categories.forEach(category => {
        expect(category.subcategories).toHaveLength(12);
      });
    });

    test('should have proper skill level distribution', () => {
      categories.forEach(category => {
        const skillLevels = category.subcategories.map(sub => sub.skillLevel);
        const basicCount = skillLevels.filter(level => level === 'Basic').length;
        const intermediateCount = skillLevels.filter(level => level === 'Intermediate').length;
        const advancedCount = skillLevels.filter(level => level === 'Advanced').length;
        
        expect(basicCount).toBe(4);
        expect(intermediateCount).toBe(4);
        expect(advancedCount).toBe(4);
      });
    });

    test('should have valid category properties', () => {
      categories.forEach(category => {
        expect(category.id).toBeTruthy();
        expect(category.name).toBeTruthy();
        expect(category.icon).toBeTruthy();
        expect(category.description).toBeTruthy();
        expect(category.bgGradient).toBeTruthy();
        expect(typeof category.promptCount).toBe('number');
        expect(Array.isArray(category.subcategories)).toBe(true);
      });
    });

    test('should have valid subcategory properties', () => {
      categories.forEach(category => {
        category.subcategories.forEach(subcategory => {
          expect(subcategory.id).toBeTruthy();
          expect(subcategory.name).toBeTruthy();
          expect(subcategory.description).toBeTruthy();
          expect(Array.isArray(subcategory.examples)).toBe(true);
          expect(subcategory.examples.length).toBeGreaterThan(0);
          expect(['Basic', 'Intermediate', 'Advanced']).toContain(subcategory.skillLevel);
        });
      });
    });
  });

  describe('Industry Customization Service', () => {
    test('should prioritize categories based on industry relevance', () => {
      const techIndustries = ['technology'];
      const prioritized = IndustryCustomizationService.prioritizeCategories(categories, techIndustries);
      
      expect(prioritized).toHaveLength(9);
      // Technology category should be prioritized for tech industry
      const techCategoryIndex = prioritized.findIndex(cat => cat.id === 'technology-development');
      expect(techCategoryIndex).toBeLessThan(3); // Should be in top 3
    });

    test('should return custom category descriptions for industries', () => {
      const techDescription = IndustryCustomizationService.getCustomCategoryDescription(
        'technology-development', 
        ['technology']
      );
      expect(techDescription).toBeTruthy();
      expect(typeof techDescription).toBe('string');
    });

    test('should get featured subcategories for industries', () => {
      const featured = IndustryCustomizationService.getFeaturedSubcategories(
        'technology-development',
        ['technology']
      );
      expect(Array.isArray(featured)).toBe(true);
      expect(featured.length).toBeGreaterThan(0);
    });

    test('should provide onboarding recommendations', () => {
      const recommendations = IndustryCustomizationService.getOnboardingRecommendations(
        ['technology'], 
        'Intermediate'
      );
      
      expect(recommendations).toHaveProperty('recommendedCategories');
      expect(recommendations).toHaveProperty('recommendedSubcategories');
      expect(recommendations).toHaveProperty('startingPrompts');
      expect(Array.isArray(recommendations.recommendedCategories)).toBe(true);
    });

    test('should handle multiple industries', () => {
      const multiIndustry = ['technology', 'healthcare'];
      const prioritized = IndustryCustomizationService.prioritizeCategories(categories, multiIndustry);
      
      expect(prioritized).toHaveLength(9);
      // Both tech and healthcare categories should be prioritized
      const techIndex = prioritized.findIndex(cat => cat.id === 'technology-development');
      const healthcareIndex = prioritized.findIndex(cat => cat.id === 'healthcare-clinical');
      expect(techIndex).toBeLessThan(5);
      expect(healthcareIndex).toBeLessThan(5);
    });
  });

  describe('User Preferences Service', () => {
    beforeAll(() => {
      // Clear any existing preferences
      UserPreferencesService.resetPreferences();
    });

    afterAll(() => {
      // Clean up after tests
      UserPreferencesService.resetPreferences();
    });

    test('should load default preferences', () => {
      const preferences = UserPreferencesService.loadPreferences();
      
      expect(preferences).toHaveProperty('industries');
      expect(preferences).toHaveProperty('skillLevel');
      expect(preferences).toHaveProperty('onboardingCompleted');
      expect(preferences).toHaveProperty('favoriteCategories');
      expect(preferences).toHaveProperty('customizations');
      
      expect(Array.isArray(preferences.industries)).toBe(true);
      expect(preferences.onboardingCompleted).toBe(false);
    });

    test('should save and load industry preferences', () => {
      const testIndustries = ['technology', 'healthcare'];
      UserPreferencesService.updateIndustries(testIndustries);
      
      const loaded = UserPreferencesService.getIndustries();
      expect(loaded).toEqual(testIndustries);
    });

    test('should save and load skill level preferences', () => {
      UserPreferencesService.updateSkillLevel('Intermediate');
      
      const loaded = UserPreferencesService.getSkillLevel();
      expect(loaded).toBe('Intermediate');
    });

    test('should manage favorite categories', () => {
      const categoryId = 'technology-development';
      
      // Add favorite
      UserPreferencesService.addFavoriteCategory(categoryId);
      expect(UserPreferencesService.isCategoryFavorited(categoryId)).toBe(true);
      
      // Remove favorite
      UserPreferencesService.removeFavoriteCategory(categoryId);
      expect(UserPreferencesService.isCategoryFavorited(categoryId)).toBe(false);
    });

    test('should complete onboarding', () => {
      const industries = ['technology'];
      const skillLevel = 'Advanced';
      
      UserPreferencesService.completeOnboarding(industries, skillLevel);
      
      const preferences = UserPreferencesService.loadPreferences();
      expect(preferences.onboardingCompleted).toBe(true);
      expect(preferences.industries).toEqual(industries);
      expect(preferences.skillLevel).toBe(skillLevel);
    });

    test('should provide personalized recommendations', () => {
      // Set up user with preferences
      UserPreferencesService.updateIndustries(['technology']);
      UserPreferencesService.updateSkillLevel('Basic');
      
      const recommendations = UserPreferencesService.getPersonalizedRecommendations();
      
      expect(recommendations).toHaveProperty('suggestedCategories');
      expect(recommendations).toHaveProperty('suggestedSkillLevel');
      expect(recommendations).toHaveProperty('showOnboarding');
      
      // Should suggest skill level progression
      expect(recommendations.suggestedSkillLevel).toBe('Intermediate');
    });

    test('should export and import preferences', () => {
      // Set up some preferences
      UserPreferencesService.updateIndustries(['finance', 'legal']);
      UserPreferencesService.updateSkillLevel('Advanced');
      UserPreferencesService.addFavoriteCategory('data-analysis');
      
      // Export
      const exported = UserPreferencesService.exportPreferences();
      expect(typeof exported).toBe('string');
      
      // Reset and import
      UserPreferencesService.resetPreferences();
      const importSuccess = UserPreferencesService.importPreferences(exported);
      expect(importSuccess).toBe(true);
      
      // Verify imported data
      const preferences = UserPreferencesService.loadPreferences();
      expect(preferences.industries).toEqual(['finance', 'legal']);
      expect(preferences.skillLevel).toBe('Advanced');
      expect(preferences.favoriteCategories).toContain('data-analysis');
    });
  });

  describe('Integration Scenarios', () => {
    test('should provide complete user journey flow', () => {
      // 1. New user starts onboarding
      expect(UserPreferencesService.needsOnboarding()).toBe(true);
      
      // 2. User selects industries and skill level
      const selectedIndustries = ['technology', 'finance'];
      const selectedSkillLevel = 'Intermediate';
      UserPreferencesService.completeOnboarding(selectedIndustries, selectedSkillLevel);
      
      // 3. Categories are customized based on preferences
      const customizedCategories = IndustryCustomizationService.prioritizeCategories(
        categories, 
        selectedIndustries
      );
      expect(customizedCategories).toHaveLength(9);
      
      // 4. User gets personalized recommendations
      const recommendations = UserPreferencesService.getPersonalizedRecommendations();
      expect(recommendations.showOnboarding).toBe(false);
      expect(recommendations.suggestedSkillLevel).toBe('Advanced');
      
      // 5. User favorites some categories
      UserPreferencesService.addFavoriteCategory('technology-development');
      UserPreferencesService.addFavoriteCategory('data-analysis');
      
      const favorites = UserPreferencesService.getFavoriteCategories();
      expect(favorites).toContain('technology-development');
      expect(favorites).toContain('data-analysis');
    });

    test('should handle industry-specific category customization', () => {
      const healthcareIndustries = ['healthcare'];
      
      // Get healthcare-specific customizations
      const customizations = IndustryCustomizationService.getCategoryCustomizations(healthcareIndustries);
      expect(customizations.length).toBeGreaterThan(0);
      
      // Healthcare category should have high relevance
      const healthcareCustomization = customizations.find(
        custom => custom.categoryId === 'healthcare-clinical'
      );
      expect(healthcareCustomization).toBeTruthy();
      expect(healthcareCustomization.industryRelevance).toBe('high');
      
      // Get custom description
      const customDescription = IndustryCustomizationService.getCustomCategoryDescription(
        'healthcare-clinical',
        healthcareIndustries
      );
      expect(customDescription).toBeTruthy();
      expect(customDescription).toContain('Clinical');
    });

    test('should maintain data consistency across services', () => {
      // Set preferences
      const industries = ['legal', 'consulting'];
      const skillLevel = 'Advanced';
      UserPreferencesService.updateIndustries(industries);
      UserPreferencesService.updateSkillLevel(skillLevel);
      
      // Get customizations based on preferences
      const userIndustries = UserPreferencesService.getIndustries();
      const userSkillLevel = UserPreferencesService.getSkillLevel();
      
      expect(userIndustries).toEqual(industries);
      expect(userSkillLevel).toBe(skillLevel);
      
      // Use preferences for customization
      const prioritizedCategories = IndustryCustomizationService.prioritizeCategories(
        categories,
        userIndustries
      );
      
      expect(prioritizedCategories).toHaveLength(9);
      
      // Legal category should be prioritized
      const legalIndex = prioritizedCategories.findIndex(cat => cat.id === 'legal-compliance');
      expect(legalIndex).toBeLessThan(5);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('should handle empty industry preferences', () => {
      const emptyIndustries = [];
      const prioritized = IndustryCustomizationService.prioritizeCategories(categories, emptyIndustries);
      
      // Should return all categories in original order
      expect(prioritized).toHaveLength(9);
      expect(prioritized.map(cat => cat.id)).toEqual(categories.map(cat => cat.id));
    });

    test('should handle invalid industry IDs', () => {
      const invalidIndustries = ['invalid-industry', 'another-invalid'];
      const prioritized = IndustryCustomizationService.prioritizeCategories(categories, invalidIndustries);
      
      // Should still return all categories
      expect(prioritized).toHaveLength(9);
    });

    test('should handle corrupted preferences gracefully', () => {
      // Simulate corrupted localStorage
      const invalidJson = '{"invalid": json}';
      const importResult = UserPreferencesService.importPreferences(invalidJson);
      expect(importResult).toBe(false);
      
      // Should still load default preferences
      const preferences = UserPreferencesService.loadPreferences();
      expect(preferences).toBeTruthy();
      expect(preferences.industries).toEqual([]);
    });

    test('should handle missing category data', () => {
      const emptyCategories = [];
      const prioritized = IndustryCustomizationService.prioritizeCategories(emptyCategories, ['technology']);
      
      expect(prioritized).toEqual([]);
    });
  });
});

// Performance benchmarks
describe('Performance Benchmarks', () => {
  test('category prioritization should complete within performance threshold', () => {
    const startTime = performance.now();
    
    for (let i = 0; i < 100; i++) {
      IndustryCustomizationService.prioritizeCategories(categories, ['technology', 'healthcare']);
    }
    
    const endTime = performance.now();
    const averageTime = (endTime - startTime) / 100;
    
    // Should complete within 1ms on average
    expect(averageTime).toBeLessThan(1);
  });

  test('preference operations should be fast', () => {
    const startTime = performance.now();
    
    for (let i = 0; i < 50; i++) {
      UserPreferencesService.updateIndustries(['technology']);
      UserPreferencesService.getIndustries();
      UserPreferencesService.addFavoriteCategory(`category-${i}`);
      UserPreferencesService.isCategoryFavorited(`category-${i}`);
    }
    
    const endTime = performance.now();
    const averageTime = (endTime - startTime) / 50;
    
    // Should complete within 2ms on average
    expect(averageTime).toBeLessThan(2);
  });
});
