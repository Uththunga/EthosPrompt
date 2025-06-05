import React from 'react';
import { Code } from 'lucide-react';
import SubcategoryCard from '../../components/subcategories/SubcategoryCard';

const subcategories = [
  {
    id: 'code-assistance',
    name: 'Code Assistance',
    description: 'Generate efficient code solutions and optimizations for various programming tasks.',
    examples: ['Function Generation', 'Bug Fixing', 'Code Optimization'],
    skillLevel: 'Advanced' as const
  },
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Create comprehensive technical documentation and guides.',
    examples: ['API Docs', 'User Guides', 'Code Comments'],
    skillLevel: 'Intermediate' as const
  },
  {
    id: 'testing',
    name: 'Testing & QA',
    description: 'Develop test cases and quality assurance procedures.',
    examples: ['Unit Tests', 'Test Scenarios', 'Bug Reports'],
    skillLevel: 'Advanced' as const
  },
  {
    id: 'architecture',
    name: 'Architecture & Design',
    description: 'Plan and document system architectures and design patterns.',
    examples: ['Design Patterns', 'Architecture Docs', 'System Diagrams'],
    skillLevel: 'Advanced' as const
  }
];

const SoftwareDevelopment: React.FC = () => {
  return (
    <div className="pb-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <Code className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Software Development
            </h1>
            <p className="text-gray-400">
              Code generation, documentation, and technical writing
            </p>
          </div>
        </div>
      </div>

      {/* Subcategories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subcategories.map((subcategory) => (
          <SubcategoryCard
            key={subcategory.id}
            {...subcategory}
            categoryId="development"
          />
        ))}
      </div>

      {/* Resources Section */}
      <div className="mt-16 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          Development Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-white mb-2">Development Tools</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Code Review Checklists</li>
              <li>• Documentation Templates</li>
              <li>• Testing Frameworks</li>
              <li>• Architecture Patterns</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Best Practices</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Clean Code Guidelines</li>
              <li>• Testing Strategies</li>
              <li>• Code Documentation Tips</li>
              <li>• Performance Optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareDevelopment;
