import React, { useState, useEffect, useRef } from 'react';
import { Activity, Wifi, Battery, Smartphone, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  
  // Mobile-specific metrics
  networkType?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  
  // Device metrics
  deviceMemory?: number;
  hardwareConcurrency?: number;
  batteryLevel?: number;
  batteryCharging?: boolean;
  
  // Performance metrics
  domContentLoaded?: number;
  loadComplete?: number;
  jsHeapSizeLimit?: number;
  usedJSHeapSize?: number;
  totalJSHeapSize?: number;
}

interface MobilePerformanceMonitorProps {
  enabled?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showDetails?: boolean;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  className?: string;
}

const MobilePerformanceMonitor: React.FC<MobilePerformanceMonitorProps> = ({
  enabled = process.env.NODE_ENV === 'development',
  position = 'bottom-right',
  showDetails = false,
  onMetricsUpdate,
  className,
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) return;

    const updateMetrics = async () => {
      const newMetrics: PerformanceMetrics = {};

      // Network Information API
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        newMetrics.networkType = connection.type;
        newMetrics.effectiveType = connection.effectiveType;
        newMetrics.downlink = connection.downlink;
        newMetrics.rtt = connection.rtt;
        newMetrics.saveData = connection.saveData;
      }

      // Device Memory API
      if ('deviceMemory' in navigator) {
        newMetrics.deviceMemory = (navigator as any).deviceMemory;
      }

      // Hardware Concurrency
      newMetrics.hardwareConcurrency = navigator.hardwareConcurrency;

      // Battery API
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          newMetrics.batteryLevel = Math.round(battery.level * 100);
          newMetrics.batteryCharging = battery.charging;
        } catch (error) {
          // Battery API not supported
        }
      }

      // Performance API
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          newMetrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.navigationStart;
          newMetrics.loadComplete = navigation.loadEventEnd - navigation.navigationStart;
          newMetrics.ttfb = navigation.responseStart - navigation.navigationStart;
        }

        // Memory API
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          newMetrics.jsHeapSizeLimit = memory.jsHeapSizeLimit;
          newMetrics.usedJSHeapSize = memory.usedJSHeapSize;
          newMetrics.totalJSHeapSize = memory.totalJSHeapSize;
        }
      }

      // Core Web Vitals (simplified)
      if ('PerformanceObserver' in window) {
        try {
          // LCP
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            newMetrics.lcp = lastEntry.startTime;
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // FCP
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
              newMetrics.fcp = fcpEntry.startTime;
            }
          });
          fcpObserver.observe({ entryTypes: ['paint'] });

          // CLS
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            newMetrics.cls = clsValue;
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
          // PerformanceObserver not fully supported
        }
      }

      setMetrics(newMetrics);
      onMetricsUpdate?.(newMetrics);

      // Check for performance warnings
      const newWarnings: string[] = [];
      
      if (newMetrics.effectiveType === 'slow-2g' || newMetrics.effectiveType === '2g') {
        newWarnings.push('Slow network detected');
      }
      
      if (newMetrics.deviceMemory && newMetrics.deviceMemory < 4) {
        newWarnings.push('Low device memory');
      }
      
      if (newMetrics.batteryLevel && newMetrics.batteryLevel < 20 && !newMetrics.batteryCharging) {
        newWarnings.push('Low battery');
      }
      
      if (newMetrics.lcp && newMetrics.lcp > 2500) {
        newWarnings.push('Poor LCP performance');
      }
      
      if (newMetrics.cls && newMetrics.cls > 0.1) {
        newWarnings.push('High layout shift');
      }

      setWarnings(newWarnings);
    };

    updateMetrics();
    intervalRef.current = setInterval(updateMetrics, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, onMetricsUpdate]);

  if (!enabled) return null;

  const formatBytes = (bytes?: number) => {
    if (!bytes) return 'N/A';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const formatTime = (time?: number) => {
    if (!time) return 'N/A';
    return `${Math.round(time)}ms`;
  };

  const getNetworkIcon = () => {
    switch (metrics.effectiveType) {
      case 'slow-2g':
      case '2g':
        return <Wifi className="w-4 h-4 text-red-400" />;
      case '3g':
        return <Wifi className="w-4 h-4 text-yellow-400" />;
      case '4g':
        return <Wifi className="w-4 h-4 text-green-400" />;
      default:
        return <Wifi className="w-4 h-4 text-gray-400" />;
    }
  };

  const getBatteryIcon = () => {
    const level = metrics.batteryLevel || 0;
    const charging = metrics.batteryCharging;
    
    if (charging) {
      return <Battery className="w-4 h-4 text-green-400" />;
    } else if (level < 20) {
      return <Battery className="w-4 h-4 text-red-400" />;
    } else if (level < 50) {
      return <Battery className="w-4 h-4 text-yellow-400" />;
    } else {
      return <Battery className="w-4 h-4 text-green-400" />;
    }
  };

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div
      className={cn(
        'fixed z-50 max-w-sm',
        positionClasses[position],
        className
      )}
    >
      {/* Compact View */}
      <div
        className={cn(
          'bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3',
          'transition-all duration-200 cursor-pointer',
          isExpanded ? 'rounded-b-none' : 'hover:bg-gray-900/95'
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-white font-medium">Performance</span>
          
          {warnings.length > 0 && (
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          )}
          
          <div className="flex items-center gap-1 ml-auto">
            {getNetworkIcon()}
            {getBatteryIcon()}
            <Smartphone className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 border-t-0 rounded-b-lg p-4 max-h-96 overflow-y-auto">
          {/* Warnings */}
          {warnings.length > 0 && (
            <div className="mb-4 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-medium text-yellow-400">Warnings</span>
              </div>
              {warnings.map((warning, index) => (
                <p key={index} className="text-xs text-yellow-300">
                  • {warning}
                </p>
              ))}
            </div>
          )}

          {/* Core Web Vitals */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-white mb-2">Core Web Vitals</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">LCP:</span>
                <span className="text-white ml-1">{formatTime(metrics.lcp)}</span>
              </div>
              <div>
                <span className="text-gray-400">FCP:</span>
                <span className="text-white ml-1">{formatTime(metrics.fcp)}</span>
              </div>
              <div>
                <span className="text-gray-400">CLS:</span>
                <span className="text-white ml-1">{metrics.cls?.toFixed(3) || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400">TTFB:</span>
                <span className="text-white ml-1">{formatTime(metrics.ttfb)}</span>
              </div>
            </div>
          </div>

          {/* Network */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-white mb-2">Network</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Type:</span>
                <span className="text-white ml-1">{metrics.effectiveType || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400">Speed:</span>
                <span className="text-white ml-1">{metrics.downlink ? `${metrics.downlink} Mbps` : 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400">RTT:</span>
                <span className="text-white ml-1">{metrics.rtt ? `${metrics.rtt}ms` : 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400">Save Data:</span>
                <span className="text-white ml-1">{metrics.saveData ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Device */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-white mb-2">Device</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Memory:</span>
                <span className="text-white ml-1">{metrics.deviceMemory ? `${metrics.deviceMemory} GB` : 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400">CPU Cores:</span>
                <span className="text-white ml-1">{metrics.hardwareConcurrency || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400">Battery:</span>
                <span className="text-white ml-1">
                  {metrics.batteryLevel ? `${metrics.batteryLevel}%` : 'N/A'}
                  {metrics.batteryCharging && ' ⚡'}
                </span>
              </div>
            </div>
          </div>

          {/* Memory Usage */}
          {metrics.usedJSHeapSize && (
            <div>
              <h4 className="text-xs font-medium text-white mb-2">Memory Usage</h4>
              <div className="text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Used:</span>
                  <span className="text-white">{formatBytes(metrics.usedJSHeapSize)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-white">{formatBytes(metrics.totalJSHeapSize)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Limit:</span>
                  <span className="text-white">{formatBytes(metrics.jsHeapSizeLimit)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobilePerformanceMonitor;
