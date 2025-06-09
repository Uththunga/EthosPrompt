import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Copy, ThumbsUp, Zap, Lightbulb, Rocket } from 'lucide-react';
import { categories } from '../../data/categories-data';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface Prompt {
  id: string;
  title: string;
  content: string;
  likes: number;
  used: number;
  skillLevel: SkillLevel;
  useCase: string;
  steps?: string[];
  tips?: string[];
}

const getSkillLevelIcon = (level: SkillLevel) => {
  switch (level) {
    case 'Beginner':
      return <Zap className="w-4 h-4 mr-1 text-green-400" />;
    case 'Intermediate':
      return <Lightbulb className="w-4 h-4 mr-1 text-yellow-400" />;
    case 'Advanced':
      return <Rocket className="w-4 h-4 mr-1 text-red-400" />;
    default:
      return null;
  }
};

interface SubcategoryDetailProps {
  categoryId: string;
}

const SubcategoryDetail: React.FC<SubcategoryDetailProps> = ({ categoryId }) => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();

  // Find the category and subcategory
  const category = categories.find(cat => cat.id === categoryId);
  const subcategory = category?.subcategories.find(sub => sub.id === subcategoryId);

  if (!category || !subcategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Subcategory not found</h2>
          <Link to="/categories" className="text-purple-400 hover:underline">
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<SkillLevel>('Beginner');

  // Filter prompts based on the current subcategory and skill level
  const getFilteredPrompts = (level: SkillLevel): Prompt[] => {
    // In a real app, these would come from an API or data source
    // For now, we'll use a mapping of subcategory IDs to their prompts
    const promptsBySubcategory: Record<string, Record<SkillLevel, Prompt[]>> = {
      // Marketing category subcategories
      'content-creation': {
        'Beginner': [{
          id: 'b1',
          title: 'Basic Blog Introduction',
          content: 'Write a simple introduction for a blog post about [topic] that introduces the main points in a clear, straightforward manner.',
          likes: 42,
          used: 210,
          skillLevel: 'Beginner',
          useCase: 'Content Creation',
          steps: [
            'Start with a hook or interesting fact',
            'Introduce the main topic',
            'State what the reader will learn',
            'Keep it under 100 words'
          ],
          tips: [
            'Use simple language',
            'Focus on one main idea',
            'Include a question to engage readers'
          ]
        }],
        'Intermediate': [{
          id: 'i1',
          title: 'Comprehensive Blog Post Outline',
          content: 'Create a detailed outline for a blog post about [topic] that covers all key aspects of the subject.',
          likes: 56,
          used: 189,
          skillLevel: 'Intermediate',
          useCase: 'Content Creation',
          steps: [
            'Start with a compelling introduction',
            'Break down into 3-5 main sections',
            'Include relevant examples',
            'End with a strong conclusion'
          ]
        }],
        'Advanced': [{
          id: 'a1',
          title: 'In-Depth Guide',
          content: 'Write a comprehensive guide about [topic] that provides expert-level insights and practical advice.',
          likes: 78,
          used: 245,
          skillLevel: 'Advanced',
          useCase: 'Content Creation',
          steps: [
            'Start with research and data',
            'Provide detailed explanations',
            'Include case studies or examples',
            'Add actionable takeaways'
          ]
        }]
      },
      'social-media': {
        'Beginner': [{
          id: 'b2',
          title: 'Social Media Post',
          content: 'Create a [platform] post about [topic] with a friendly tone and a clear call-to-action.',
          likes: 35,
          used: 178,
          skillLevel: 'Beginner',
          useCase: 'Social Media',
          steps: [
            'Start with an engaging hook',
            'Keep it concise (1-2 sentences)',
            'Add relevant hashtags',
            'Include a clear CTA (Call To Action)'
          ]
        }],
        'Intermediate': [],
        'Advanced': []
      },
      // Add more subcategories as needed
    };

    // Return prompts for the current subcategory and skill level, or empty array if none found
    return subcategoryId ? (promptsBySubcategory[subcategoryId]?.[level] || []) : [];
  };

  const filteredPrompts = getFilteredPrompts(activeTab);

  // Group filtered prompts by use case
  const promptsByUseCase = filteredPrompts.reduce((acc: Record<string, Prompt[]>, prompt) => {
    if (!acc[prompt.useCase]) {
      acc[prompt.useCase] = [];
    }
    acc[prompt.useCase].push(prompt);
    return acc;
  }, {});

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here if needed
  };

  return (
    <div className="pb-16">
      {/* Back Button */}
      <Link 
        to={`/categories/${categoryId}`} 
        className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to {category.name}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">{subcategory.name}</h1>
          <p className="text-gray-400 mt-2">{subcategory.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skill Level Tabs */}
          <div className="bg-gray-800/50 rounded-lg p-1 border border-gray-700">
            <div className="flex space-x-1">
              {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveTab(level)}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === level
                      ? 'bg-gray-700 text-white shadow'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {getSkillLevelIcon(level)}
                    {level}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompts by Use Case */}
          <div className="space-y-8">
            {Object.entries(promptsByUseCase).map(([useCase, prompts]) => (
              <div key={useCase} className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  {useCase}
                </h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  {prompts.map((prompt) => (
                    <Card key={prompt.id} className="bg-gray-800/50 border-gray-700 hover:border-purple-500/30 transition-colors">
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            {getSkillLevelIcon(prompt.skillLevel)}
                            <h3 className="font-medium text-white">{prompt.title}</h3>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs text-gray-400 hover:text-white"
                            onClick={() => handleCopyPrompt(prompt.content)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="bg-gray-900/40 p-3 rounded-lg mb-4">
                          <p className="text-gray-300 text-sm font-mono">{prompt.content}</p>
                        </div>
                        
                        {prompt.steps && (
                          <div className="mb-4">
                            <h4 className="text-xs font-medium text-gray-400 mb-2">STEPS:</h4>
                            <ol className="text-sm text-gray-300 space-y-1.5">
                              {prompt.steps.map((step, i) => (
                                <li key={i} className="flex">
                                  <span className="text-purple-400 mr-2">{i + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                        
                        {prompt.tips && (
                          <div className="mt-4 pt-3 border-t border-gray-700">
                            <h4 className="text-xs font-medium text-gray-400 mb-2">TIPS:</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                              {prompt.tips.map((tip, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-purple-400 mr-1.5">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700 text-xs text-gray-500">
                          <div className="flex items-center">
                            <ThumbsUp className="w-3.5 h-3.5 mr-1" />
                            <span>{prompt.likes}</span>
                            <span className="mx-1.5">•</span>
                            <span>Used {prompt.used} times</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <Card className="bg-gray-800/50 border-gray-700">
            <div className="p-6">
              <h3 className="font-semibold text-white mb-3">Tips for {subcategory.name}</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex">
                  <ChevronRight className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" />
                  <span>Be specific about your target audience and desired tone.</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" />
                  <span>Include relevant keywords for better SEO performance.</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" />
                  <span>Use the prompt as a starting point and refine based on results.</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* About This Subcategory */}
          <Card className="bg-gray-800/50 border-gray-700">
            <div className="p-6">
              <h3 className="font-semibold text-white mb-3">About {subcategory.name}</h3>
              <p className="text-gray-300 text-sm mb-4">
                {subcategory.description}
              </p>
              
              <h4 className="text-sm font-medium text-gray-400 mb-2">Common Use Cases:</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {subcategory.examples.map((example, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600"
                  >
                    {example}
                  </span>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-2">
                Suggest a Prompt
              </Button>
            </div>
          </Card>

          {/* Related Subcategories */}
          {category.subcategories.length > 1 && (
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h3 className="font-semibold text-white mb-3">More in {category.name}</h3>
                <ul className="space-y-2">
                  {category.subcategories
                    .filter(sub => sub.id !== subcategoryId)
                    .map((sub) => (
                      <li key={sub.id}>
                        <Link 
                          to={`/categories/${categoryId}/${sub.id}`}
                          className="flex items-center text-gray-300 hover:text-white transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 mr-1 text-purple-400" />
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryDetail;
