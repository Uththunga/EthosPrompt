import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface SubcategoryCardProps {
  id: string;
  name: string;
  description: string;
  examples: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  categoryId: string;
}

const SubcategoryCard: React.FC<SubcategoryCardProps> = ({
  id,
  name,
  description,
  examples,
  skillLevel,
  categoryId,
}) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            skillLevel === 'Beginner' ? 'bg-green-500/20 text-green-300' :
            skillLevel === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-red-500/20 text-red-300'
          }`}>
            {skillLevel}
          </span>
        </div>
        
        <p className="text-gray-300 mb-4">{description}</p>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Popular Use Cases:</h4>
          <div className="flex flex-wrap gap-2">
            {examples.map((example, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600"
              >
                {example}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            className="group"
            onClick={() => {
              // Navigate to subcategory
              window.location.href = `/categories/${categoryId}/${id}`;
            }}
          >
            View Prompts
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SubcategoryCard;
