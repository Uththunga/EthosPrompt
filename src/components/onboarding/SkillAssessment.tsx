import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowRight, ArrowLeft, Target, Zap, Lightbulb, Rocket } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Heading, Text, Badge } from '../ui/VisualHierarchy';
import type { SkillLevel } from '../../data/categories-data';

interface AssessmentQuestion {
  id: string;
  question: string;
  description: string;
  options: {
    id: string;
    label: string;
    value: number; // Points for this option
    description: string;
  }[];
}

interface SkillAssessmentProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (results: AssessmentResults) => void;
  className?: string;
}

interface AssessmentResults {
  skillLevel: SkillLevel;
  score: number;
  maxScore: number;
  recommendations: string[];
  categories: string[];
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'experience',
    question: 'How would you describe your experience with AI prompts?',
    description: 'This helps us understand your current level',
    options: [
      {
        id: 'beginner',
        label: 'Complete beginner',
        value: 1,
        description: 'I\'m new to AI prompts and need guidance'
      },
      {
        id: 'some',
        label: 'Some experience',
        value: 2,
        description: 'I\'ve used basic prompts before'
      },
      {
        id: 'experienced',
        label: 'Experienced',
        value: 3,
        description: 'I regularly use AI prompts for various tasks'
      },
      {
        id: 'expert',
        label: 'Expert',
        value: 4,
        description: 'I create complex prompts and understand advanced techniques'
      }
    ]
  },
  {
    id: 'complexity',
    question: 'What type of prompts do you typically use?',
    description: 'This helps us gauge your comfort with complexity',
    options: [
      {
        id: 'simple',
        label: 'Simple, direct questions',
        value: 1,
        description: 'Basic questions and requests'
      },
      {
        id: 'structured',
        label: 'Structured prompts with context',
        value: 2,
        description: 'Prompts with background information and specific requirements'
      },
      {
        id: 'advanced',
        label: 'Multi-step prompts with examples',
        value: 3,
        description: 'Complex prompts with examples and detailed instructions'
      },
      {
        id: 'expert',
        label: 'Custom prompt engineering',
        value: 4,
        description: 'I create sophisticated prompts with advanced techniques'
      }
    ]
  },
  {
    id: 'goals',
    question: 'What are your main goals with AI prompts?',
    description: 'This helps us recommend relevant categories',
    options: [
      {
        id: 'learning',
        label: 'Learning and education',
        value: 2,
        description: 'Understanding concepts and getting explanations'
      },
      {
        id: 'work',
        label: 'Professional work tasks',
        value: 3,
        description: 'Business writing, analysis, and productivity'
      },
      {
        id: 'creative',
        label: 'Creative projects',
        value: 2,
        description: 'Content creation, brainstorming, and artistic work'
      },
      {
        id: 'technical',
        label: 'Technical and analytical tasks',
        value: 4,
        description: 'Code, data analysis, and complex problem-solving'
      }
    ]
  }
];

const SkillAssessment: React.FC<SkillAssessmentProps> = ({
  isOpen,
  onClose,
  onComplete,
  className = ''
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleting, setIsCompleting] = useState(false);

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = (): AssessmentResults => {
    let totalScore = 0;
    let maxScore = 0;
    const categories: string[] = [];
    
    assessmentQuestions.forEach(question => {
      const answerId = answers[question.id];
      if (answerId) {
        const option = question.options.find(opt => opt.id === answerId);
        if (option) {
          totalScore += option.value;
        }
      }
      maxScore += Math.max(...question.options.map(opt => opt.value));
    });

    // Determine skill level based on score percentage
    const percentage = (totalScore / maxScore) * 100;
    let skillLevel: SkillLevel;
    let recommendations: string[] = [];

    if (percentage <= 40) {
      skillLevel = 'Basic';
      recommendations = [
        'Start with Basic level prompts to build confidence',
        'Focus on simple, clear instructions',
        'Explore beginner-friendly categories like Writing and Communication'
      ];
      categories.push('Writing', 'Communication', 'Education');
    } else if (percentage <= 75) {
      skillLevel = 'Intermediate';
      recommendations = [
        'Try Intermediate level prompts for more complex tasks',
        'Experiment with structured prompts and examples',
        'Explore categories like Marketing and Business Strategy'
      ];
      categories.push('Marketing', 'Business Strategy', 'Content Creation');
    } else {
      skillLevel = 'Advanced';
      recommendations = [
        'Challenge yourself with Advanced level prompts',
        'Create custom prompts for specific use cases',
        'Explore technical categories like Data Analysis and Development'
      ];
      categories.push('Data Analysis', 'Development', 'Research');
    }

    return {
      skillLevel,
      score: totalScore,
      maxScore,
      recommendations,
      categories
    };
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const results = calculateResults();
    
    // Save results to localStorage
    localStorage.setItem('skillAssessmentResults', JSON.stringify(results));
    
    onComplete(results);
    setIsCompleting(false);
  };

  const getSkillIcon = (level: SkillLevel) => {
    switch (level) {
      case 'Basic':
        return <Zap className="w-5 h-5 text-green-400" />;
      case 'Intermediate':
        return <Lightbulb className="w-5 h-5 text-yellow-400" />;
      case 'Advanced':
        return <Rocket className="w-5 h-5 text-red-400" />;
    }
  };

  if (!isOpen) return null;

  const currentQuestionData = assessmentQuestions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id];
  const isLastQuestion = currentQuestion === assessmentQuestions.length - 1;
  const canProceed = currentAnswer !== undefined;

  if (isCompleting) {
    const results = calculateResults();
    
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-600/20 flex items-center justify-center">
              {getSkillIcon(results.skillLevel)}
            </div>
            <Heading level={3} className="mb-2">Assessment Complete!</Heading>
            <Text color="muted">Analyzing your responses...</Text>
          </div>
          
          <div className="animate-pulse">
            <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
            </div>
            <Text variant="caption" color="muted">
              Personalizing your experience...
            </Text>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={cn(
        'bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl max-w-2xl w-full',
        className
      )}>
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-600/20 text-purple-400">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <Heading level={3}>Skill Assessment</Heading>
                <Text variant="caption" color="muted">
                  Question {currentQuestion + 1} of {assessmentQuestions.length}
                </Text>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Skip Assessment
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / assessmentQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <div className="mb-6">
            <Heading level={4} className="mb-2">
              {currentQuestionData.question}
            </Heading>
            <Text color="muted">
              {currentQuestionData.description}
            </Text>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestionData.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(currentQuestionData.id, option.id)}
                className={cn(
                  'w-full p-4 rounded-xl border transition-all duration-200 text-left',
                  currentAnswer === option.id
                    ? 'border-purple-500 bg-purple-600/10'
                    : 'border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-800/30'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {currentAnswer === option.id ? (
                      <CheckCircle className="w-5 h-5 text-purple-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Text className="font-medium mb-1">
                      {option.label}
                    </Text>
                    <Text variant="caption" color="muted">
                      {option.description}
                    </Text>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={cn(
                'flex items-center gap-2 px-4 py-2 transition-colors',
                currentQuestion === 0
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={cn(
                'flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors',
                canProceed
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              )}
            >
              {isLastQuestion ? 'Complete Assessment' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;
