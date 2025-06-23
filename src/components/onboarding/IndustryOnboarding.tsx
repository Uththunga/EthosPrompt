import React, { useState } from 'react';
import { Building2, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import IndustryFilter from '../filters/IndustryFilter';

interface IndustryOnboardingProps {
  onComplete: (selectedIndustries: string[], skillLevel: string) => void;
  onSkip: () => void;
}

const skillLevels = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'New to AI prompts, looking for simple templates',
    icon: '🌱',
    examples: ['Email templates', 'Basic social posts', 'Simple reports']
  },
  {
    id: 'intermediate',
    name: 'Intermediate', 
    description: 'Some experience, want to improve efficiency',
    icon: '⚡',
    examples: ['Content strategies', 'Process optimization', 'Advanced analysis']
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Expert user, need specialized workflows',
    icon: '🚀',
    examples: ['Complex strategies', 'Technical documentation', 'Innovation planning']
  }
];

const industryBenefits = {
  technology: {
    title: 'Technology & Software',
    benefits: ['Code documentation', 'Technical specs', 'Product roadmaps', 'API documentation']
  },
  healthcare: {
    title: 'Healthcare & Medical',
    benefits: ['Clinical documentation', 'Patient education', 'Research protocols', 'Compliance materials']
  },
  finance: {
    title: 'Finance & Banking',
    benefits: ['Financial analysis', 'Risk assessments', 'Compliance reports', 'Investment strategies']
  },
  education: {
    title: 'Education & Training',
    benefits: ['Curriculum design', 'Assessment creation', 'Learning materials', 'Training programs']
  },
  manufacturing: {
    title: 'Manufacturing & Operations',
    benefits: ['Process optimization', 'Quality control', 'Safety protocols', 'Supply chain management']
  },
  legal: {
    title: 'Legal & Compliance',
    benefits: ['Contract drafting', 'Legal research', 'Compliance documentation', 'Policy development']
  },
  consulting: {
    title: 'Consulting & Services',
    benefits: ['Client presentations', 'Strategy frameworks', 'Analysis reports', 'Proposal writing']
  },
  'real-estate': {
    title: 'Real Estate & Property',
    benefits: ['Property descriptions', 'Market analysis', 'Client communications', 'Investment reports']
  }
};

export const IndustryOnboarding: React.FC<IndustryOnboardingProps> = ({
  onComplete,
  onSkip
}) => {
  const [step, setStep] = useState(1);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>('');

  const handleNext = () => {
    if (step === 1 && selectedIndustries.length > 0) {
      setStep(2);
    } else if (step === 2 && selectedSkillLevel) {
      setStep(3);
    }
  };

  const handleComplete = () => {
    onComplete(selectedIndustries, selectedSkillLevel);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Building2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          What industry do you work in?
        </h2>
        <p className="text-gray-400">
          We'll customize your experience with industry-specific prompts and workflows
        </p>
      </div>

      <IndustryFilter
        selectedIndustries={selectedIndustries}
        onIndustryChange={setSelectedIndustries}
        variant="grid"
        size="lg"
        showIcons={true}
        showClearAll={false}
        className="max-w-2xl mx-auto"
      />

      {selectedIndustries.length > 0 && (
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">You'll get access to:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {selectedIndustries.map(industryId => {
              const industry = industryBenefits[industryId as keyof typeof industryBenefits];
              return industry ? (
                <div key={industryId}>
                  <h4 className="text-purple-300 font-medium text-sm">{industry.title}</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {industry.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-400" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          What's your experience level?
        </h2>
        <p className="text-gray-400">
          This helps us recommend the right prompts for your skill level
        </p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {skillLevels.map((level) => (
          <Card
            key={level.id}
            className={`p-6 cursor-pointer transition-all duration-300 ${
              selectedSkillLevel === level.id
                ? 'border-purple-500 bg-purple-900/20'
                : 'border-gray-700 hover:border-purple-500/50'
            }`}
            onClick={() => setSelectedSkillLevel(level.id)}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{level.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {level.name}
                </h3>
                <p className="text-gray-400 mb-3">
                  {level.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {level.examples.map((example, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
              {selectedSkillLevel === level.id && (
                <Check className="w-6 h-6 text-purple-400" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 text-center">
      <div>
        <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          You're all set!
        </h2>
        <p className="text-gray-400">
          Your personalized experience is ready with industry-specific prompts
        </p>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-white font-medium mb-4">Your Setup:</h3>
        <div className="space-y-3 text-left">
          <div>
            <span className="text-gray-400">Industries:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {selectedIndustries.map(industryId => {
                const industry = industryBenefits[industryId as keyof typeof industryBenefits];
                return (
                  <span key={industryId} className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300">
                    {industry?.title}
                  </span>
                );
              })}
            </div>
          </div>
          <div>
            <span className="text-gray-400">Skill Level:</span>
            <span className="ml-2 text-white">
              {skillLevels.find(level => level.id === selectedSkillLevel)?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Step {step} of 3</span>
            <button
              onClick={onSkip}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Skip setup
            </button>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : onSkip()}
            disabled={step === 3}
          >
            {step === 1 ? 'Skip' : 'Back'}
          </Button>

          <Button
            onClick={step === 3 ? handleComplete : handleNext}
            disabled={
              (step === 1 && selectedIndustries.length === 0) ||
              (step === 2 && !selectedSkillLevel)
            }
            className="flex items-center gap-2"
          >
            {step === 3 ? 'Get Started' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default IndustryOnboarding;
