import React from 'react';
import { Stethoscope } from 'lucide-react';
import SubcategoryCard from '../../components/subcategories/SubcategoryCard';

const subcategories = [
  {
    id: 'clinical-notes',
    name: 'Clinical Documentation',
    description: 'Professional medical records and clinical documentation',
    examples: ['Patient Notes', 'Treatment Plans', 'Progress Reports'],
    skillLevel: 'Advanced' as const
  },
  {
    id: 'patient-education',
    name: 'Patient Education',
    description: 'Clear and informative patient education materials',
    examples: ['Care Instructions', 'Health Guides', 'Medication Info'],
    skillLevel: 'Intermediate' as const
  },
  {
    id: 'clinical-research',
    name: 'Clinical Research',
    description: 'Comprehensive research documentation and analysis',
    examples: ['Study Protocols', 'Data Analysis', 'Research Reports'],
    skillLevel: 'Advanced' as const
  },
  {
    id: 'healthcare-comms',
    name: 'Healthcare Communications',
    description: 'Professional medical correspondence and team communication',
    examples: ['Referral Letters', 'Case Summaries', 'Team Updates'],
    skillLevel: 'Advanced' as const
  }
];

const Healthcare: React.FC = () => {
  return (
    <div className="pb-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-500/10 rounded-xl">
            <Stethoscope className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Healthcare
            </h1>
            <p className="text-gray-400">
              Clinical documentation and patient care
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
            categoryId="healthcare"
          />
        ))}
      </div>

      {/* Resources Section */}
      <div className="mt-16 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          Healthcare Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-white mb-2">Clinical Tools</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Documentation Templates</li>
              <li>• Clinical Guidelines</li>
              <li>• Patient Education Materials</li>
              <li>• Research Protocols</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Best Practices</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Clinical Documentation Standards</li>
              <li>• Patient Communication Guidelines</li>
              <li>• Research Documentation</li>
              <li>• Healthcare Compliance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Healthcare;
