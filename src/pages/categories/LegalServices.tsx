import React from 'react';
import { ScrollText } from 'lucide-react';
import SubcategoryCard from '../../components/subcategories/SubcategoryCard';

const subcategories = [
  {
    id: 'document-drafting',
    name: 'Document Drafting',
    description: 'Create professional legal documents and agreements.',
    examples: ['Contracts', 'Agreements', 'Legal Notices'],
    skillLevel: 'Advanced' as const
  },
  {
    id: 'legal-research',
    name: 'Legal Research',
    description: 'Conduct thorough legal research and analysis.',
    examples: ['Case Summaries', 'Legal Analysis', 'Research Memos'],
    skillLevel: 'Advanced' as const
  },
  {
    id: 'client-communication',
    name: 'Client Communication',
    description: 'Professional legal correspondence and client updates.',
    examples: ['Client Letters', 'Case Updates', 'Legal Advice'],
    skillLevel: 'Intermediate' as const
  },
  {
    id: 'compliance',
    name: 'Compliance & Regulation',
    description: 'Ensure regulatory compliance and risk management.',
    examples: ['Policy Reviews', 'Compliance Checks', 'Risk Assessments'],
    skillLevel: 'Advanced' as const
  }
];

const LegalServices: React.FC = () => {
  return (
    <div className="pb-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-slate-500/10 rounded-xl">
            <ScrollText className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Legal Services
            </h1>
            <p className="text-gray-400">
              Legal document creation and analysis
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
            categoryId="legal"
          />
        ))}
      </div>

      {/* Resources Section */}
      <div className="mt-16 p-4 sm:p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
          Legal Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-white mb-2">Legal Tools</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Document Templates</li>
              <li>• Research Databases</li>
              <li>• Compliance Checklists</li>
              <li>• Case Management Tools</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Best Practices</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Legal Writing Guidelines</li>
              <li>• Client Communication Standards</li>
              <li>• Research Methodologies</li>
              <li>• Compliance Frameworks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalServices;
