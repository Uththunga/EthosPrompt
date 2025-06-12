import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileText, Code } from 'lucide-react';

interface ResourceItem {
  name: string;
  path: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const resources: ResourceItem[] = [
  {
    name: 'Documentation & Guides',
    path: '/resources/documentation',
    description: 'Comprehensive documentation, user guides, and technical references for all features and capabilities.',
    icon: <BookOpen className="w-6 h-6" />,
    category: 'Technical'
  },
  {
    name: 'Implementation Examples',
    path: '/resources/examples',
    description: 'Real-world implementation examples, code snippets, and best practices for common scenarios.',
    icon: <Code className="w-6 h-6" />,
    category: 'Development'
  },
  {
    name: 'Best Practices & Standards',
    path: '/resources/standards',
    description: 'Industry standards, best practices, and guidelines for professional implementation.',
    icon: <FileText className="w-6 h-6" />,
    category: 'Professional'
  }
];

const ResourceCard: React.FC<{ resource: ResourceItem }> = ({ resource }) => {
  return (
    <article className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all hover:shadow-lg group">
      <div className="p-6">
        <div className="mb-4 w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
          {resource.icon}
        </div>
        <div className="mb-2">
          <span className="text-sm font-medium text-purple-400/80">{resource.category}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
          <Link to={resource.path}>{resource.name}</Link>
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{resource.description}</p>
        <Link
          to={resource.path}
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
        >
          Learn More
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};

const ResourcesSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Resources & Documentation</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">Access our comprehensive resources to get the most out of EthosPrompt</p>
          <p className="text-gray-400 mb-8">
            Explore our curated collection of guides, examples, and best practices to enhance your experience.
            Perfect for both beginners and advanced users looking to maximize their productivity.
          </p>
          <Link 
            to="/resources" 
            className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium group transition-colors"
          >
            View all resources
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resources.slice(0, 3).map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
