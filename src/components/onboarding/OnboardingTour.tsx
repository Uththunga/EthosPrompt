import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Target, Filter, Grid3X3 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Heading, Text } from '../ui/VisualHierarchy';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for highlighting
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  variant?: 'category' | 'general';
  className?: string;
}

const categoryOnboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Categories!',
    description: 'You\'re now viewing our comprehensive 9-category framework. Each category contains specialized prompts organized by skill level to help you find exactly what you need.',
    position: 'center',
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: 'navigation',
    title: 'Browse Subcategories',
    description: 'Look at the sidebar on the left to see subcategories. Each one is color-coded by skill level: Green (Basic), Orange (Intermediate), Red (Advanced). Click any subcategory to explore its prompts.',
    target: '[data-onboarding="sidebar"]',
    position: 'center',
    icon: <Target className="w-6 h-6" />
  },
  {
    id: 'filters',
    title: 'Find Prompts Quickly',
    description: 'See the search and filter options at the top? Use these to quickly find prompts by keyword, skill level, or category. The filter pills help you narrow down results instantly.',
    target: '[data-onboarding="filters"]',
    position: 'bottom',
    icon: <Filter className="w-6 h-6" />
  },
  {
    id: 'view-modes',
    title: 'Choose Your View',
    description: 'Notice the grid/list toggle buttons? Switch between card view (shows more details) and list view (more compact) based on your preference.',
    target: '[data-onboarding="view-toggle"]',
    position: 'bottom',
    icon: <Grid3X3 className="w-6 h-6" />
  },
  {
    id: 'prompts',
    title: 'Click Any Prompt',
    description: 'Each prompt card shows a preview, skill level, and tags. Click on any prompt to view the full content, copy it, or save it to your favorites.',
    position: 'center',
    icon: <Sparkles className="w-6 h-6" />
  }
];

const generalOnboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to EthosPrompt!',
    description: 'You\'ve discovered a comprehensive platform with over 1,000 engineered AI prompts across 9 specialized categories. Let\'s show you how to get the most out of it.',
    position: 'center',
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: 'framework',
    title: 'How It\'s Organized',
    description: 'Everything is organized into 9 main categories (like Content Creation, Marketing, Data Analysis). Each category has 12 subcategories with prompts at Basic, Intermediate, and Advanced levels.',
    position: 'center',
    icon: <Target className="w-6 h-6" />
  },
  {
    id: 'skill-levels',
    title: 'Start at Your Level',
    description: 'New to AI prompts? Start with Basic (green badges). Have some experience? Try Intermediate (orange). Expert user? Jump to Advanced (red). You can always level up!',
    position: 'center',
    icon: <Check className="w-6 h-6" />
  },
  {
    id: 'getting-started',
    title: 'Ready to Explore?',
    description: 'Click "Explore Categories" to browse all 9 categories, or use the search bar to find specific prompts. Each prompt includes instructions, examples, and tips for best results.',
    position: 'center',
    icon: <ArrowRight className="w-6 h-6" />
  }
];

const OnboardingTour: React.FC<OnboardingTourProps> = ({
  isOpen,
  onClose,
  onComplete,
  variant = 'category',
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  const steps = variant === 'category' ? categoryOnboardingSteps : generalOnboardingSteps;

  // Memoized handleClose function to avoid useEffect dependency issues
  const handleClose = useCallback(() => {
    if (highlightedElement) {
      highlightedElement.style.position = '';
      highlightedElement.style.zIndex = '';
      highlightedElement.style.boxShadow = '';
      highlightedElement.style.borderRadius = '';
      highlightedElement.style.backgroundColor = '';
    }
    setCurrentStep(0);
    onClose();
  }, [highlightedElement, onClose]);

  // Handle highlighting target elements
  useEffect(() => {
    if (!isOpen) return;

    const step = steps[currentStep];
    if (step.target) {
      const element = document.querySelector(step.target) as HTMLElement;
      if (element) {
        setHighlightedElement(element);
        element.style.position = 'relative';
        element.style.zIndex = '9999';
        element.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.8), 0 0 0 6px rgba(147, 51, 234, 0.4), 0 0 20px rgba(147, 51, 234, 0.3)';
        element.style.borderRadius = '12px';
        element.style.backgroundColor = 'rgba(147, 51, 234, 0.05)';
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setHighlightedElement(null);
    }

    return () => {
      if (highlightedElement) {
        highlightedElement.style.position = '';
        highlightedElement.style.zIndex = '';
        highlightedElement.style.boxShadow = '';
        highlightedElement.style.borderRadius = '';
        highlightedElement.style.backgroundColor = '';
      }
    };
  }, [currentStep, isOpen, steps, highlightedElement]);

  // Close onboarding when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
    handleClose();
  };



  const handleSkip = () => {
    handleClose();
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <>
      {/* Backdrop - Lighter and less blurred so users can see what they're learning about */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-9998" />

      {/* Onboarding Modal - Enhanced visibility with stronger contrast */}
      <div className={cn(
        'fixed z-9999 bg-gray-900/98 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/10 max-w-md w-full mx-4',
        'ring-1 ring-purple-400/20 animate-in fade-in-0 zoom-in-95 duration-300',
        currentStepData.position === 'center' && 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        currentStepData.position === 'top' && 'top-4 left-1/2 transform -translate-x-1/2',
        currentStepData.position === 'bottom' && 'bottom-4 left-1/2 transform -translate-x-1/2',
        currentStepData.position === 'left' && 'top-1/2 left-4 transform -translate-y-1/2',
        currentStepData.position === 'right' && 'top-1/2 right-4 transform -translate-y-1/2',

        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
          <div className="flex items-center gap-3">
            {currentStepData.icon && (
              <div className="p-2 rounded-lg bg-purple-600/20 text-purple-400">
                {currentStepData.icon}
              </div>
            )}
            <div>
              <Heading level={4}>{currentStepData.title}</Heading>
              <Text variant="caption" color="muted">
                Step {currentStep + 1} of {steps.length}
              </Text>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-white z-10 relative"
            aria-label="Close onboarding tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <Text color="muted" className="mb-6 leading-relaxed">
            {currentStepData.description}
          </Text>

          {/* Action Button */}
          {currentStepData.action && (
            <button
              onClick={currentStepData.action.onClick}
              className="w-full mb-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              {currentStepData.action.label}
            </button>
          )}

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Progress</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors relative z-10"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors relative z-10"
              >
                Skip Tour
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors relative z-10"
              >
                {isLastStep ? (
                  <>
                    <Check className="w-4 h-4" />
                    Complete
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Hook to manage onboarding state
export const useOnboarding = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenOnboarding');
    if (!seen) {
      setIsOnboardingOpen(true);
    } else {
      setHasSeenOnboarding(true);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setHasSeenOnboarding(true);
    setIsOnboardingOpen(false);
  };

  const startOnboarding = () => {
    setIsOnboardingOpen(true);
  };

  return {
    hasSeenOnboarding,
    isOnboardingOpen,
    completeOnboarding,
    startOnboarding,
    closeOnboarding: () => setIsOnboardingOpen(false)
  };
};

export default OnboardingTour;
