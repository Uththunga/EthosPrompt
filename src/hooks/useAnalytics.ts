import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import analyticsService from '../services/AnalyticsService';
import type { SkillLevel } from '../data/categories-data';

interface UseAnalyticsReturn {
  // Category tracking
  trackCategoryView: (categoryId: string, categoryName: string) => void;
  trackSubcategoryView: (categoryId: string, subcategoryId: string, skillLevel: SkillLevel) => void;
  
  // Filter tracking
  trackSkillLevelFilter: (skillLevel: SkillLevel | null) => void;
  trackIndustryFilter: (industries: string[]) => void;
  
  // Onboarding tracking
  trackOnboardingStart: () => void;
  trackOnboardingStep: (step: number, stepName: string) => void;
  trackOnboardingComplete: (industries: string[], skillLevel: SkillLevel, completionTime: number) => void;
  trackOnboardingSkip: (step: number) => void;
  
  // User interaction tracking
  trackPreferenceChange: (preferenceType: string, oldValue: any, newValue: any) => void;
  trackError: (errorType: string, errorMessage: string, context?: Record<string, any>) => void;
  trackSatisfaction: (rating: number, feedback?: string, context?: string) => void;
  
  // Performance tracking
  trackPerformance: (metricType: string, value: number) => void;
  
  // Analytics management
  getAnalyticsSummary: () => any;
  setAnalyticsEnabled: (enabled: boolean) => void;
  isAnalyticsEnabled: () => boolean;
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const location = useLocation();
  const pageLoadTime = useRef<number>(Date.now());
  const lastPath = useRef<string>('');

  // Track page views and performance
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Track page view
    if (currentPath !== lastPath.current) {
      const loadTime = Date.now() - pageLoadTime.current;
      
      // Track page performance
      if (lastPath.current) {
        analyticsService.trackPerformance('page_load_time', loadTime, {
          fromPage: lastPath.current,
          toPage: currentPath
        });
      }
      
      // Track page view
      analyticsService.trackEvent('page_view', {
        path: currentPath,
        referrer: lastPath.current
      });
      
      lastPath.current = currentPath;
      pageLoadTime.current = Date.now();
    }
  }, [location.pathname]);

  // Track category view
  const trackCategoryView = useCallback((categoryId: string, categoryName: string) => {
    analyticsService.trackCategoryView(categoryId, categoryName, {
      source: 'category_grid',
      timestamp: Date.now()
    });
  }, []);

  // Track subcategory view
  const trackSubcategoryView = useCallback((
    categoryId: string, 
    subcategoryId: string, 
    skillLevel: SkillLevel
  ) => {
    analyticsService.trackSubcategoryView(categoryId, subcategoryId, skillLevel, {
      source: 'subcategory_list',
      timestamp: Date.now()
    });
  }, []);

  // Track skill level filter usage
  const trackSkillLevelFilter = useCallback((skillLevel: SkillLevel | null) => {
    analyticsService.trackFilterUsage('skill_level', skillLevel || 'all');
  }, []);

  // Track industry filter usage
  const trackIndustryFilter = useCallback((industries: string[]) => {
    analyticsService.trackFilterUsage('industry', industries.join(',') || 'all');
  }, []);

  // Track onboarding start
  const trackOnboardingStart = useCallback(() => {
    analyticsService.trackOnboardingStart();
  }, []);

  // Track onboarding step
  const trackOnboardingStep = useCallback((step: number, stepName: string) => {
    analyticsService.trackOnboardingStep(step, stepName);
  }, []);

  // Track onboarding completion
  const trackOnboardingComplete = useCallback((
    industries: string[], 
    skillLevel: SkillLevel, 
    completionTime: number
  ) => {
    analyticsService.trackOnboardingComplete(industries, skillLevel, completionTime);
  }, []);

  // Track onboarding skip
  const trackOnboardingSkip = useCallback((step: number) => {
    analyticsService.trackOnboardingSkip(step);
  }, []);

  // Track preference changes
  const trackPreferenceChange = useCallback((
    preferenceType: string, 
    oldValue: any, 
    newValue: any
  ) => {
    analyticsService.trackPreferenceChange(preferenceType, oldValue, newValue);
  }, []);

  // Track errors
  const trackError = useCallback((
    errorType: string, 
    errorMessage: string, 
    context?: Record<string, any>
  ) => {
    analyticsService.trackError(errorType, errorMessage, {
      ...context,
      page: location.pathname,
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    });
  }, [location.pathname]);

  // Track user satisfaction
  const trackSatisfaction = useCallback((
    rating: number, 
    feedback?: string, 
    context?: string
  ) => {
    analyticsService.trackSatisfaction(rating, feedback, context);
  }, []);

  // Track performance metrics
  const trackPerformance = useCallback((metricType: string, value: number) => {
    analyticsService.trackPerformance(metricType, value, {
      page: location.pathname,
      timestamp: Date.now()
    });
  }, [location.pathname]);

  // Get analytics summary
  const getAnalyticsSummary = useCallback(() => {
    return analyticsService.getAnalyticsSummary();
  }, []);

  // Set analytics enabled
  const setAnalyticsEnabled = useCallback((enabled: boolean) => {
    analyticsService.setAnalyticsEnabled(enabled);
  }, []);

  // Check if analytics is enabled
  const isAnalyticsEnabled = useCallback(() => {
    return analyticsService.isAnalyticsEnabled();
  }, []);

  return {
    trackCategoryView,
    trackSubcategoryView,
    trackSkillLevelFilter,
    trackIndustryFilter,
    trackOnboardingStart,
    trackOnboardingStep,
    trackOnboardingComplete,
    trackOnboardingSkip,
    trackPreferenceChange,
    trackError,
    trackSatisfaction,
    trackPerformance,
    getAnalyticsSummary,
    setAnalyticsEnabled,
    isAnalyticsEnabled
  };
};

export default useAnalytics;
