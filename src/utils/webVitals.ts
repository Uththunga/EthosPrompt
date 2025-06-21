import React from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

export interface WebVitalsReport {
  fcp?: WebVitalsMetric;
  lcp?: WebVitalsMetric;
  inp?: WebVitalsMetric; // Interaction to Next Paint (replaces FID)
  cls?: WebVitalsMetric;
  ttfb?: WebVitalsMetric;
  timestamp: number;
  url: string;
  userAgent: string;
}

// Thresholds for Core Web Vitals (in milliseconds, except CLS)
const THRESHOLDS = {
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  INP: { good: 200, poor: 500 }, // Interaction to Next Paint (replaces FID)
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 }
};

// Get rating based on thresholds
const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

// Convert web-vitals metric to our format
const convertMetric = (metric: any): WebVitalsMetric => ({
  name: metric.name,
  value: metric.value,
  rating: getRating(metric.name, metric.value),
  delta: metric.delta,
  id: metric.id,
  navigationType: metric.navigationType || 'unknown'
});

// Analytics reporting function
const sendToAnalytics = (metric: WebVitalsMetric) => {
  // In a real application, you would send this to your analytics service
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals Metric:', metric);
  }
  
  // Example: Send to Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      custom_map: {
        metric_rating: metric.rating,
        metric_delta: metric.delta
      }
    });
  }
  
  // Example: Send to custom analytics endpoint
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    }).catch(console.error);
  }
};

// Main function to measure and report Core Web Vitals
export const measureWebVitals = (onMetric?: (metric: WebVitalsMetric) => void) => {
  const handleMetric = (metric: any) => {
    const convertedMetric = convertMetric(metric);
    
    // Call custom callback if provided
    onMetric?.(convertedMetric);
    
    // Send to analytics
    sendToAnalytics(convertedMetric);
  };

  // Measure all Core Web Vitals
  onCLS(handleMetric);
  onFCP(handleMetric);
  onINP(handleMetric); // Interaction to Next Paint (replaces FID)
  onLCP(handleMetric);
  onTTFB(handleMetric);
};

// Hook for React components
export const useWebVitals = () => {
  const [report, setReport] = React.useState<WebVitalsReport>({
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent
  });

  React.useEffect(() => {
    measureWebVitals((metric) => {
      setReport(prev => ({
        ...prev,
        [metric.name.toLowerCase()]: metric,
        timestamp: Date.now()
      }));
    });
  }, []);

  return report;
};

// Performance budget checker
export const checkPerformanceBudget = (report: WebVitalsReport) => {
  const violations: string[] = [];
  
  Object.entries(report).forEach(([key, metric]) => {
    if (metric && typeof metric === 'object' && 'rating' in metric) {
      if (metric.rating === 'poor') {
        violations.push(`${metric.name}: ${metric.value.toFixed(1)}ms (poor)`);
      } else if (metric.rating === 'needs-improvement') {
        violations.push(`${metric.name}: ${metric.value.toFixed(1)}ms (needs improvement)`);
      }
    }
  });
  
  return violations;
};

// Generate performance score (0-100)
export const calculatePerformanceScore = (report: WebVitalsReport): number => {
  const metrics = [report.fcp, report.lcp, report.inp, report.cls, report.ttfb].filter(Boolean);
  
  if (metrics.length === 0) return 0;
  
  const scores = metrics.map(metric => {
    switch (metric!.rating) {
      case 'good': return 100;
      case 'needs-improvement': return 50;
      case 'poor': return 0;
      default: return 0;
    }
  });
  
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
};

// Export for use in main.tsx
export const initWebVitals = () => {
  // Only measure in production or when explicitly enabled
  if (process.env.NODE_ENV === 'production' || process.env.VITE_MEASURE_WEB_VITALS === 'true') {
    measureWebVitals();
  }
};

// Performance monitoring class for advanced usage
export class PerformanceMonitor {
  private metrics: Map<string, WebVitalsMetric> = new Map();
  private observers: ((metric: WebVitalsMetric) => void)[] = [];
  
  constructor() {
    this.init();
  }
  
  private init() {
    measureWebVitals((metric) => {
      this.metrics.set(metric.name, metric);
      this.notifyObservers(metric);
    });
  }
  
  subscribe(callback: (metric: WebVitalsMetric) => void) {
    this.observers.push(callback);
    
    // Send existing metrics to new subscriber
    this.metrics.forEach(metric => callback(metric));
    
    return () => {
      const index = this.observers.indexOf(callback);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }
  
  private notifyObservers(metric: WebVitalsMetric) {
    this.observers.forEach(callback => callback(metric));
  }
  
  getMetrics() {
    return Array.from(this.metrics.values());
  }
  
  getReport(): WebVitalsReport {
    return {
      fcp: this.metrics.get('FCP'),
      lcp: this.metrics.get('LCP'),
      inp: this.metrics.get('INP'),
      cls: this.metrics.get('CLS'),
      ttfb: this.metrics.get('TTFB'),
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
  }
  
  getScore() {
    return calculatePerformanceScore(this.getReport());
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();
