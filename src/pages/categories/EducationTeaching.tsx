import React from 'react';
import { GraduationCap } from 'lucide-react';
import SubcategoryCard from '../../components/subcategories/SubcategoryCard';

const subcategories = [
  {
    id: 'lesson-planning',
    name: 'Lesson Planning',
    description: 'Create structured lesson plans and educational materials for effective teaching.',
    examples: ['Unit Plans', 'Activity Designs', 'Learning Objectives'],
    skillLevel: 'Beginner' as const
  },
  {
    id: 'assessment',
    name: 'Assessment Creation',
    description: 'Design comprehensive assessments and evaluation tools.',
    examples: ['Quiz Questions', 'Rubrics', 'Assessment Criteria'],
    skillLevel: 'Intermediate' as const
  },
  {
    id: 'student-feedback',
    name: 'Student Feedback',
    description: 'Generate constructive feedback and guidance for student improvement.',
    examples: ['Progress Reports', 'Performance Reviews', 'Study Tips'],
    skillLevel: 'Intermediate' as const
  },
  {
    id: 'curriculum-design',
    name: 'Curriculum Design',
    description: 'Develop complete courses and educational programs.',
    examples: ['Course Outlines', 'Module Planning', 'Learning Paths'],
    skillLevel: 'Advanced' as const
  }
];

const EducationTeaching: React.FC = () => {
  return (
    <div className="pb-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <GraduationCap className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Education & Teaching
            </h1>
            <p className="text-gray-400">
              Design effective learning materials and curricula
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
            categoryId="education"
          />
        ))}
      </div>

      {/* Resources Section */}
      <div className="mt-16 p-4 sm:p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
          Educational Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-white mb-2">Teaching Tools</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Lesson Plan Templates</li>
              <li>• Assessment Frameworks</li>
              <li>• Learning Objective Generators</li>
              <li>• Student Progress Trackers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Best Practices</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Differentiated Learning Strategies</li>
              <li>• Student Engagement Tips</li>
              <li>• Assessment Design Guidelines</li>
              <li>• Curriculum Mapping Tools</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationTeaching;
