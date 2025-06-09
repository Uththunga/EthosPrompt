import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface SubcategoryCardProps {
  id: string;
  name: string;
  description: string;
  examples: string[];
  categoryId: string;
}

const SubcategoryCard: React.FC<SubcategoryCardProps> = ({
  id,
  name,
  description,
  examples,
  categoryId,
}) => {
  const navigate = useNavigate();
  
  const handleViewPrompts = () => {
    // Navigate to subcategory and scroll to top
    window.scrollTo(0, 0);
    navigate(`/categories/${categoryId}/${id}`);
  };
  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">{name}</h3>
        
        <p className="text-gray-300 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {examples.map((example, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600"
            >
              {example}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="default"
            size="default"
            className="group tracking-wide"
            onClick={handleViewPrompts}
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
