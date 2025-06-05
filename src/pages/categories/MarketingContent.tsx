import React from 'react';
import { Megaphone } from 'lucide-react';
import SubcategoryCard from '../../components/subcategories/SubcategoryCard';

const subcategories = [
  {
    id: 'content-creation',
    name: 'Content Creation',
    description: 'Generate engaging blog posts, articles, and web content optimized for SEO and user engagement.',
    examples: ['SEO Blog Posts', 'Product Descriptions', 'Website Copy'],
    skillLevel: 'Intermediate' as const
  },
  {
    id: 'social-media',
    name: 'Social Media',
    description: 'Create compelling social media content and campaign strategies across platforms.',
    examples: ['Post Series', 'Campaign Ideas', 'Hashtag Strategies'],
    skillLevel: 'Beginner' as const
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description: 'Design effective email campaigns and nurture sequences that convert.',
    examples: ['Newsletter Templates', 'Sales Sequences', 'Welcome Series'],
    skillLevel: 'Intermediate' as const
  },
  {
    id: 'ad-copy',
    name: 'Ad Copywriting',
    description: 'Write high-converting ad copy for various platforms and formats.',
    examples: ['PPC Ads', 'Social Ads', 'Display Ads'],
    skillLevel: 'Advanced' as const
  }
];

const MarketingContentPage: React.FC = () => {
  return (
    <div className="pb-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-500/10 rounded-xl">
            <Megaphone className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Marketing & Content
            </h1>
            <p className="text-gray-400">
              Create engaging content and marketing materials that convert
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
            categoryId="marketing"
          />
        ))}
      </div>

      {/* Resources Section */}
      <div className="mt-16 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          Marketing Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-white mb-2">Popular Tools</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Content Calendar Templates</li>
              <li>• SEO Optimization Guides</li>
              <li>• Campaign Performance Trackers</li>
              <li>• A/B Testing Frameworks</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Best Practices</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Voice & Tone Guidelines</li>
              <li>• Content Distribution Strategies</li>
              <li>• Analytics & Reporting Tips</li>
              <li>• Conversion Optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingContentPage;
