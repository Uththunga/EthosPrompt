import React from 'react';
import { UserCircle } from 'lucide-react';
import SubcategoryCard from '../../components/subcategories/SubcategoryCard';

const subcategories = [
  {
    id: 'job-descriptions',
    name: 'Job Descriptions',
    description: 'Create engaging and effective job postings that attract top talent',
    examples: ['Role Descriptions', 'Requirements', 'Benefits'],
    skillLevel: 'Beginner' as const
  },
  {
    id: 'candidate-assessment',
    name: 'Candidate Assessment',
    description: 'Comprehensive tools for evaluating and interviewing candidates',
    examples: ['Interview Questions', 'Evaluation Forms', 'Skills Tests'],
    skillLevel: 'Intermediate' as const
  },
  {
    id: 'employee-comms',
    name: 'Employee Communications',
    description: 'Professional internal communication and HR documentation',
    examples: ['Policy Updates', 'Announcements', 'Feedback Forms'],
    skillLevel: 'Intermediate' as const
  },
  {
    id: 'hr-policy',
    name: 'HR Policies',
    description: 'Develop and document comprehensive HR policies and procedures',
    examples: ['Employee Handbook', 'Procedures', 'Guidelines'],
    skillLevel: 'Advanced' as const
  }
];

const HRRecruitment: React.FC = () => {
  return (
    <div className="pb-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-violet-500/10 rounded-xl">
            <UserCircle className="w-8 h-8 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              HR & Recruitment
            </h1>
            <p className="text-gray-400">
              Streamline hiring and HR processes
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
            categoryId="hr"
          />
        ))}
      </div>

      {/* Resources Section */}
      <div className="mt-16 p-4 sm:p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
          HR Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-white mb-2">Recruitment Tools</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Job Description Templates</li>
              <li>• Interview Question Banks</li>
              <li>• Assessment Frameworks</li>
              <li>• Onboarding Checklists</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Best Practices</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Inclusive Hiring Guidelines</li>
              <li>• Employee Development Plans</li>
              <li>• Performance Review Systems</li>
              <li>• Policy Management Tips</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRRecruitment;
