import React from 'react';
import { BarChart2 } from 'lucide-react';
import SubcategoryCard from '../../components/subcategories/SubcategoryCard';

const subcategories = [
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Comprehensive statistical analysis and insights generation',
    examples: ['Data Cleaning', 'Statistical Tests', 'Trend Analysis'],
    skillLevel: 'Advanced' as const
  },
  {
    id: 'visualization',
    name: 'Data Visualization',
    description: 'Create compelling and informative data visualizations',
    examples: ['Chart Design', 'Dashboard Layout', 'Visual Stories'],
    skillLevel: 'Intermediate' as const
  },
  {
    id: 'reporting',
    name: 'Reporting',
    description: 'Professional data-driven reports and presentations',
    examples: ['Executive Reports', 'KPI Updates', 'Performance Analytics'],
    skillLevel: 'Intermediate' as const
  },
  {
    id: 'ml-prompts',
    name: 'ML & AI',
    description: 'Machine learning and AI workflow documentation',
    examples: ['Model Documentation', 'Feature Engineering', 'Model Evaluation'],
    skillLevel: 'Advanced' as const
  }
];

const DataScience: React.FC = () => {
  return (
    <div className="pb-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-cyan-500/10 rounded-xl">
            <BarChart2 className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Data Science & Analysis
            </h1>
            <p className="text-gray-400">
              Data analysis and insights generation
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
            categoryId="data-science"
          />
        ))}
      </div>

      {/* Resources Section */}
      <div className="mt-16 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          Data Science Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-white mb-2">Analysis Tools</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Statistical Analysis Templates</li>
              <li>• Visualization Libraries</li>
              <li>• ML Model Documentation</li>
              <li>• Data Quality Frameworks</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Best Practices</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Data Analysis Methodology</li>
              <li>• Visualization Guidelines</li>
              <li>• ML Model Development</li>
              <li>• Reporting Standards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataScience;
