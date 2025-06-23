/**
 * Analytics Service for 9-Category Framework
 * 
 * Tracks user interactions, category usage, and system performance
 * to provide insights for continuous improvement.
 */

import type { SkillLevel } from '../data/categories-data';

export interface AnalyticsEvent {
  eventType: string;
  category?: string;
  subcategory?: string;
  skillLevel?: SkillLevel;
  industry?: string;
  timestamp: string;
  sessionId: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface CategoryUsageMetrics {
  categoryId: string;
  categoryName: string;
  totalViews: number;
  uniqueUsers: number;
  averageTimeSpent: number;
  skillLevelDistribution: Record<SkillLevel, number>;
  industryDistribution: Record<string, number>;
  conversionRate: number; // Views to prompt usage
}

export interface OnboardingMetrics {
  totalStarts: number;
  completionRate: number;
  dropoffByStep: Record<number, number>;
  industrySelectionDistribution: Record<string, number>;
  skillLevelDistribution: Record<SkillLevel, number>;
  averageCompletionTime: number;
}

export interface SystemPerformanceMetrics {
  averageLoadTime: number;
  categoryQueryTime: number;
  filterResponseTime: number;
  errorRate: number;
  userSatisfactionScore: number;
}

class AnalyticsService {
  private sessionId: string;
  private events: AnalyticsEvent[] = [];
  private isEnabled: boolean = true;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeAnalytics();
  }

  /**
   * Initialize analytics service
   */
  private initializeAnalytics(): void {
    // Check if analytics is enabled (could be disabled for privacy)
    const analyticsEnabled = localStorage.getItem('analytics_enabled');
    this.isEnabled = analyticsEnabled !== 'false';

    // Set up periodic event flushing
    setInterval(() => {
      this.flushEvents();
    }, 30000); // Flush every 30 seconds

    // Flush events before page unload
    window.addEventListener('beforeunload', () => {
      this.flushEvents();
    });
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Track category view
   */
  trackCategoryView(categoryId: string, categoryName: string, metadata?: Record<string, any>): void {
    this.trackEvent('category_view', {
      category: categoryId,
      categoryName,
      ...metadata
    });
  }

  /**
   * Track subcategory interaction
   */
  trackSubcategoryView(
    categoryId: string, 
    subcategoryId: string, 
    skillLevel: SkillLevel,
    metadata?: Record<string, any>
  ): void {
    this.trackEvent('subcategory_view', {
      category: categoryId,
      subcategory: subcategoryId,
      skillLevel,
      ...metadata
    });
  }

  /**
   * Track filter usage
   */
  trackFilterUsage(filterType: 'skill_level' | 'industry', filterValue: string): void {
    this.trackEvent('filter_applied', {
      filterType,
      filterValue
    });
  }

  /**
   * Track onboarding events
   */
  trackOnboardingStart(): void {
    this.trackEvent('onboarding_start');
  }

  trackOnboardingStep(step: number, stepName: string): void {
    this.trackEvent('onboarding_step', {
      step,
      stepName
    });
  }

  trackOnboardingComplete(industries: string[], skillLevel: SkillLevel, completionTime: number): void {
    this.trackEvent('onboarding_complete', {
      industries,
      skillLevel,
      completionTime
    });
  }

  trackOnboardingSkip(step: number): void {
    this.trackEvent('onboarding_skip', {
      step
    });
  }

  /**
   * Track user preferences
   */
  trackPreferenceChange(preferenceType: string, oldValue: any, newValue: any): void {
    this.trackEvent('preference_change', {
      preferenceType,
      oldValue,
      newValue
    });
  }

  /**
   * Track industry customization usage
   */
  trackIndustryCustomization(industries: string[], customizationsApplied: string[]): void {
    this.trackEvent('industry_customization', {
      industries,
      customizationsApplied
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metricType: string, value: number, metadata?: Record<string, any>): void {
    this.trackEvent('performance_metric', {
      metricType,
      value,
      ...metadata
    });
  }

  /**
   * Track errors
   */
  trackError(errorType: string, errorMessage: string, context?: Record<string, any>): void {
    this.trackEvent('error', {
      errorType,
      errorMessage,
      context
    });
  }

  /**
   * Track user satisfaction
   */
  trackSatisfaction(rating: number, feedback?: string, context?: string): void {
    this.trackEvent('user_satisfaction', {
      rating,
      feedback,
      context
    });
  }

  /**
   * Generic event tracking
   */
  private trackEvent(eventType: string, metadata?: Record<string, any>): void {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      eventType,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      metadata
    };

    // Add user context if available
    const userPreferences = this.getUserContext();
    if (userPreferences) {
      event.industry = userPreferences.industries?.[0];
      event.skillLevel = userPreferences.skillLevel;
    }

    this.events.push(event);

    // Flush immediately for critical events
    if (['error', 'onboarding_complete'].includes(eventType)) {
      this.flushEvents();
    }
  }

  /**
   * Get user context from preferences
   */
  private getUserContext(): any {
    try {
      const preferences = localStorage.getItem('ethosprompt_user_preferences');
      return preferences ? JSON.parse(preferences) : null;
    } catch {
      return null;
    }
  }

  /**
   * Flush events to analytics backend
   */
  private flushEvents(): void {
    if (this.events.length === 0) return;

    const eventsToFlush = [...this.events];
    this.events = [];

    // In a real implementation, send to analytics service
    // For now, store locally for development
    this.storeEventsLocally(eventsToFlush);
  }

  /**
   * Store events locally for development/debugging
   */
  private storeEventsLocally(events: AnalyticsEvent[]): void {
    try {
      const existingEvents = localStorage.getItem('analytics_events');
      const allEvents = existingEvents ? JSON.parse(existingEvents) : [];
      allEvents.push(...events);
      
      // Keep only last 1000 events to prevent storage overflow
      const recentEvents = allEvents.slice(-1000);
      localStorage.setItem('analytics_events', JSON.stringify(recentEvents));
    } catch (error) {
      console.warn('Failed to store analytics events:', error);
    }
  }

  /**
   * Get analytics summary for debugging
   */
  getAnalyticsSummary(): {
    totalEvents: number;
    eventTypes: Record<string, number>;
    categoryViews: Record<string, number>;
    recentEvents: AnalyticsEvent[];
  } {
    try {
      const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      
      const eventTypes: Record<string, number> = {};
      const categoryViews: Record<string, number> = {};
      
      events.forEach((event: AnalyticsEvent) => {
        eventTypes[event.eventType] = (eventTypes[event.eventType] || 0) + 1;
        
        if (event.eventType === 'category_view' && event.category) {
          categoryViews[event.category] = (categoryViews[event.category] || 0) + 1;
        }
      });
      
      return {
        totalEvents: events.length,
        eventTypes,
        categoryViews,
        recentEvents: events.slice(-10)
      };
    } catch {
      return {
        totalEvents: 0,
        eventTypes: {},
        categoryViews: {},
        recentEvents: []
      };
    }
  }

  /**
   * Enable/disable analytics
   */
  setAnalyticsEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    localStorage.setItem('analytics_enabled', enabled.toString());
    
    if (!enabled) {
      // Clear stored events when disabled
      localStorage.removeItem('analytics_events');
    }
  }

  /**
   * Check if analytics is enabled
   */
  isAnalyticsEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Clear all analytics data
   */
  clearAnalyticsData(): void {
    localStorage.removeItem('analytics_events');
    this.events = [];
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();
export default analyticsService;
