import React from 'react';
import { Zap, Lightbulb, Rocket, Star, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { SkillLevel } from '../../data/categories-data';

interface SkillProgressIndicatorProps {
  currentLevel: SkillLevel;
  variant?: 'compact' | 'detailed' | 'progress';
  showLabel?: boolean;
  showIcon?: boolean;
  className?: string;
}

const skillLevels: Array<{
  level: SkillLevel;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  order: number;
}> = [
  {
    level: 'Basic',
    icon: <Zap className="w-4 h-4" />,
    color: 'text-green-400',
    bgColor: 'bg-green-900/40 border-green-800/50',
    description: 'Perfect for beginners',
    order: 1
  },
  {
    level: 'Intermediate',
    icon: <Lightbulb className="w-4 h-4" />,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/40 border-yellow-800/50',
    description: 'For those with some experience',
    order: 2
  },
  {
    level: 'Advanced',
    icon: <Rocket className="w-4 h-4" />,
    color: 'text-red-400',
    bgColor: 'bg-red-900/40 border-red-800/50',
    description: 'For experts and professionals',
    order: 3
  }
];

const SkillProgressIndicator: React.FC<SkillProgressIndicatorProps> = ({
  currentLevel,
  variant = 'compact',
  showLabel = true,
  showIcon = true,
  className = ''
}) => {
  const currentSkill = skillLevels.find(skill => skill.level === currentLevel);
  const currentOrder = currentSkill?.order || 1;
  const progressPercentage = (currentOrder / skillLevels.length) * 100;

  if (variant === 'compact') {
    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        {showIcon && currentSkill && (
          <span className={currentSkill.color}>
            {currentSkill.icon}
          </span>
        )}
        {showLabel && (
          <span className={cn(
            'px-2 py-1 rounded-full text-xs font-medium border',
            currentSkill?.bgColor || 'bg-gray-700/50 border-gray-600/50 text-gray-300'
          )}>
            {currentLevel}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'progress') {
    return (
      <div className={cn('space-y-2', className)}>
        {showLabel && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Skill Level</span>
            <span className={currentSkill?.color || 'text-gray-400'}>
              {currentLevel}
            </span>
          </div>
        )}
        
        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full transition-all duration-500 ease-out',
                currentLevel === 'Basic' && 'bg-gradient-to-r from-green-500 to-green-400',
                currentLevel === 'Intermediate' && 'bg-gradient-to-r from-yellow-500 to-yellow-400',
                currentLevel === 'Advanced' && 'bg-gradient-to-r from-red-500 to-red-400'
              )}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Progress Dots */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-1">
            {skillLevels.map((skill, index) => (
              <div
                key={skill.level}
                className={cn(
                  'w-3 h-3 rounded-full border-2 transition-all duration-300',
                  skill.order <= currentOrder
                    ? `${skill.color.replace('text-', 'bg-')} border-current`
                    : 'bg-gray-700 border-gray-600'
                )}
              />
            ))}
          </div>
        </div>
        
        {/* Level Labels */}
        <div className="flex justify-between text-xs text-gray-500">
          {skillLevels.map((skill) => (
            <span
              key={skill.level}
              className={cn(
                'transition-colors',
                skill.order <= currentOrder && skill.color
              )}
            >
              {skill.level}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={cn('space-y-3', className)}>
        {/* Current Level Badge */}
        <div className={cn(
          'inline-flex items-center gap-2 px-3 py-2 rounded-lg border',
          currentSkill?.bgColor || 'bg-gray-700/50 border-gray-600/50'
        )}>
          {showIcon && currentSkill && (
            <span className={currentSkill.color}>
              {currentSkill.icon}
            </span>
          )}
          <div>
            <span className="font-medium text-white text-sm">
              {currentLevel} Level
            </span>
            {currentSkill && (
              <p className="text-xs text-gray-400 mt-0.5">
                {currentSkill.description}
              </p>
            )}
          </div>
        </div>

        {/* Progression Path */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Skill Progression
          </h4>
          <div className="flex items-center gap-2">
            {skillLevels.map((skill, index) => (
              <React.Fragment key={skill.level}>
                <div className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all',
                  skill.order <= currentOrder
                    ? `${skill.bgColor} ${skill.color}`
                    : 'bg-gray-800/50 text-gray-500'
                )}>
                  {skill.icon}
                  <span className="font-medium">{skill.level}</span>
                  {skill.order === currentOrder && (
                    <Star className="w-3 h-3 ml-1" />
                  )}
                </div>
                {index < skillLevels.length - 1 && (
                  <div className={cn(
                    'w-2 h-0.5 transition-colors',
                    skill.order < currentOrder ? 'bg-purple-400' : 'bg-gray-600'
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Next Level Hint */}
        {currentOrder < skillLevels.length && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <TrendingUp className="w-3 h-3" />
            <span>
              Next: {skillLevels.find(s => s.order === currentOrder + 1)?.level} Level
            </span>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default SkillProgressIndicator;
