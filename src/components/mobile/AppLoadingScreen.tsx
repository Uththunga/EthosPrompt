import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface AppLoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
  showProgress?: boolean;
  message?: string;
  className?: string;
}

const AppLoadingScreen: React.FC<AppLoadingScreenProps> = ({
  isVisible,
  onComplete,
  duration = 2000,
  showProgress = true,
  message = 'Loading EthosPrompt...',
  className,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(message);

  const loadingMessages = [
    'Loading EthosPrompt...',
    'Preparing your workspace...',
    'Loading latest content...',
    'Almost ready...',
  ];

  useEffect(() => {
    if (!isVisible) return;

    let progressInterval: NodeJS.Timeout;
    let messageInterval: NodeJS.Timeout;

    if (showProgress) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / (duration / 50));
          return Math.min(newProgress, 100);
        });
      }, 50);
    }

    // Update loading messages
    messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, duration / 4);

    // Complete loading
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        onComplete?.();
      }, 300);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(completeTimer);
    };
  }, [isVisible, duration, showProgress, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex flex-col items-center justify-center',
        'bg-gray-900 text-white',
        'transition-opacity duration-300',
        className
      )}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(79,70,229,0.3),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-sm mx-auto px-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse" />
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/EthosPrompt/icon.png"
                alt="EthosPrompt Logo"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-2xl font-bold mb-2 text-center">EthosPrompt</h1>
        <p className="text-gray-400 text-center mb-8">AI Prompt Engineering Hub</p>

        {/* Loading Animation */}
        <div className="mb-6">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s',
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="w-full mb-4">
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
              <span className="text-xs text-gray-500">Loading...</span>
            </div>
          </div>
        )}

        {/* Loading Message */}
        <p className="text-sm text-gray-400 text-center animate-pulse">
          {currentMessage}
        </p>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4 w-full">
          {[
            { icon: '📝', label: 'Prompts' },
            { icon: '📚', label: 'Learn' },
            { icon: '💡', label: 'Insights' },
          ].map((feature, index) => (
            <div
              key={feature.label}
              className="flex flex-col items-center p-3 rounded-lg bg-gray-800/30 border border-gray-700/30"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <span className="text-lg mb-1">{feature.icon}</span>
              <span className="text-xs text-gray-400">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Version Info */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-xs text-gray-500">Version 1.0.0</p>
      </div>
    </div>
  );
};

// Skeleton loading component for content
export const SkeletonLoader: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className }) => {
  return (
    <div className={cn('animate-pulse space-y-3', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-4 bg-gray-700/50 rounded',
            index === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
};

// Card skeleton loader
export const CardSkeleton: React.FC<{
  showImage?: boolean;
  className?: string;
}> = ({ showImage = true, className }) => {
  return (
    <div className={cn('animate-pulse', className)}>
      {showImage && (
        <div className="h-48 bg-gray-700/50 rounded-lg mb-4" />
      )}
      <div className="space-y-3">
        <div className="h-4 bg-gray-700/50 rounded w-1/4" />
        <div className="h-6 bg-gray-700/50 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-700/50 rounded" />
          <div className="h-3 bg-gray-700/50 rounded w-5/6" />
        </div>
        <div className="flex justify-between items-center pt-3">
          <div className="h-3 bg-gray-700/50 rounded w-1/3" />
          <div className="h-3 bg-gray-700/50 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
};

// Grid skeleton loader
export const GridSkeleton: React.FC<{
  items?: number;
  columns?: number;
  showImages?: boolean;
  className?: string;
}> = ({ items = 6, columns = 3, showImages = true, className }) => {
  return (
    <div
      className={cn(
        'grid gap-6',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 md:grid-cols-2',
        columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {Array.from({ length: items }).map((_, index) => (
        <CardSkeleton key={index} showImage={showImages} />
      ))}
    </div>
  );
};

export default AppLoadingScreen;
