import React, { useState, useEffect } from 'react';
import { Activity, Clock, Database, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { usePerformanceMonitor, useCoreWebVitals, usePerformanceBudget } from '../utils/performanceUtils';

interface PerformanceMonitorProps {
  enabled?: boolean;
  showDetails?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enabled = process.env.NODE_ENV === 'development',
  showDetails = false,
  position = 'bottom-right'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { metrics, measureMemory } = usePerformanceMonitor();
  const vitals = useCoreWebVitals();
  
  const { violations, checkBudget } = usePerformanceBudget({
    renderTime: 16, // 60fps = 16ms per frame
    bundleSize: 200, // 200KB main bundle
    memoryUsage: 50 // 50MB memory usage
  });

  // Update memory usage periodically
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      measureMemory();
      checkBudget(metrics);
    }, 5000);

    return () => clearInterval(interval);
  }, [enabled, measureMemory, checkBudget, metrics]);

  if (!enabled) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  const getVitalStatus = (vital: string, value: number | undefined) => {
    if (!value) return 'unknown';
    
    switch (vital) {
      case 'fcp':
        return value < 1800 ? 'good' : value < 3000 ? 'needs-improvement' : 'poor';
      case 'lcp':
        return value < 2500 ? 'good' : value < 4000 ? 'needs-improvement' : 'poor';
      case 'fid':
        return value < 100 ? 'good' : value < 300 ? 'needs-improvement' : 'poor';
      case 'cls':
        return value < 0.1 ? 'good' : value < 0.25 ? 'needs-improvement' : 'poor';
      case 'ttfb':
        return value < 800 ? 'good' : value < 1800 ? 'needs-improvement' : 'poor';
      default:
        return 'unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400';
      case 'needs-improvement': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-3 h-3" />;
      case 'needs-improvement': return <AlertTriangle className="w-3 h-3" />;
      case 'poor': return <AlertTriangle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg">
        {/* Compact View */}
        <div 
          className="p-3 cursor-pointer flex items-center gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Activity className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-medium text-white">Performance</span>
          {violations.length > 0 && (
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <div className="border-t border-gray-700 p-4 min-w-80">
            {/* Core Web Vitals */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                Core Web Vitals
              </h3>
              <div className="space-y-2">
                {[
                  { key: 'fcp', label: 'FCP', value: vitals.fcp, unit: 'ms' },
                  { key: 'lcp', label: 'LCP', value: vitals.lcp, unit: 'ms' },
                  { key: 'fid', label: 'FID', value: vitals.fid, unit: 'ms' },
                  { key: 'cls', label: 'CLS', value: vitals.cls, unit: '' },
                  { key: 'ttfb', label: 'TTFB', value: vitals.ttfb, unit: 'ms' }
                ].map(({ key, label, value, unit }) => {
                  const status = getVitalStatus(key, value);
                  return (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={getStatusColor(status)}>
                          {getStatusIcon(status)}
                        </span>
                        <span className="text-gray-300">{label}</span>
                      </div>
                      <span className="text-white font-mono">
                        {value ? `${value.toFixed(1)}${unit}` : 'N/A'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Runtime Metrics */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                Runtime Metrics
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300">Last Render</span>
                  <span className="text-white font-mono">
                    {metrics.renderTime.toFixed(1)}ms
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300">Components</span>
                  <span className="text-white font-mono">
                    {metrics.componentCount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300">Memory</span>
                  <span className="text-white font-mono">
                    {metrics.memoryUsage.toFixed(1)}MB
                  </span>
                </div>
              </div>
            </div>



            {/* Performance Violations */}
            {violations.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Budget Violations
                </h3>
                <div className="space-y-1">
                  {violations.map((violation, index) => (
                    <div key={index} className="text-xs text-red-300 bg-red-900/20 p-2 rounded">
                      {violation}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-3 py-1.5 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
              >
                Reload
              </button>
              <button
                onClick={() => {
                  if ('memory' in performance) {
                    (performance as any).memory && console.log('Memory:', (performance as any).memory);
                  }
                  console.log('Performance Metrics:', { metrics, vitals });
                }}
                className="flex-1 px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
              >
                Log Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// HOC for performance monitoring
export const withPerformanceMonitoring = <P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) => {
  return React.memo((props: P) => {
    const { measureRender } = usePerformanceMonitor();

    useEffect(() => {
      const endMeasure = measureRender(componentName);
      return endMeasure;
    });

    return <Component {...props} />;
  });
};

export default PerformanceMonitor;
