import React from 'react';
import { MessageCircle } from 'lucide-react';
import SubcategoryCard from '../../components/subcategories/SubcategoryCard';

const subcategories = [
  {
    id: 'response-templates',
    name: 'Response Templates',
    description: 'Professional customer communication templates for various scenarios.',
    examples: ['Email Templates', 'Chat Responses', 'Support Scripts'],
    skillLevel: 'Beginner' as const
  },
  {
    id: 'issue-resolution',
    name: 'Issue Resolution',
    description: 'Effective problem-solving and troubleshooting guidance.',
    examples: ['Solution Guides', 'Escalation Protocols', 'FAQs'],
    skillLevel: 'Intermediate' as const
  },
  {
    id: 'customer-onboarding',
    name: 'Customer Onboarding',
    description: 'Smooth customer welcome and setup process materials.',
    examples: ['Welcome Emails', 'Setup Guides', 'Tutorials'],
    skillLevel: 'Intermediate' as const
  },
  {
    id: 'feedback-management',
    name: 'Feedback Management',
    description: 'Handle and analyze customer feedback effectively.',
    examples: ['Review Responses', 'Feedback Analysis', 'Survey Design'],
    skillLevel: 'Advanced' as const
  }
];

const CustomerSupport: React.FC = () => {
  return (
    <div className="pb-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-orange-500/10 rounded-xl">
            <MessageCircle className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Customer Support
            </h1>
            <p className="text-gray-400">
              Enhance customer service and support operations
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
            categoryId="support"
          />
        ))}
      </div>

      {/* Resources Section */}
      <div className="mt-16 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          Support Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-white mb-2">Support Tools</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Response Templates Library</li>
              <li>• Issue Resolution Flowcharts</li>
              <li>• Customer Feedback Forms</li>
              <li>• Support Metrics Dashboard</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Best Practices</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Customer Communication Guidelines</li>
              <li>• Issue Escalation Procedures</li>
              <li>• Feedback Collection Methods</li>
              <li>• Customer Satisfaction Tips</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
