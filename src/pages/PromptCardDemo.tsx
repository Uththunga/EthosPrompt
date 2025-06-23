import React from 'react';
import { Card } from '../components/ui/Card';
import PromptCard from '../components/prompts/PromptCard';
import ExpandablePromptCard from '../components/prompts/ExpandablePromptCard';
import { Prompt } from '../lib/supabase';

// Sample prompt data for demonstration
const samplePrompt: Prompt = {
  id: 'demo-1',
  title: 'Creative Writing Assistant',
  description: 'A comprehensive prompt for generating creative content with specific tone and style requirements.',
  content: `You are a creative writing assistant. Help me write engaging content by following these guidelines:

1. **Tone & Style**: Maintain a [TONE] tone throughout the piece
2. **Target Audience**: Write for [AUDIENCE] 
3. **Content Type**: Create [CONTENT_TYPE]
4. **Key Elements**: Include these elements:
   - Compelling opening hook
   - Clear structure with logical flow
   - Vivid descriptions and imagery
   - Strong conclusion

**Instructions:**
- Ask clarifying questions if the request is unclear
- Provide multiple options when appropriate
- Explain your creative choices
- Suggest improvements for better engagement

**Example Output Format:**
[Title]
[Opening paragraph with hook]
[Main content with clear sections]
[Compelling conclusion]

Please replace the bracketed placeholders with specific details for your writing project.`,
  access_type: 'free',
  skill_level: 'intermediate',
  category_id: 'content-creation',
  subcategory_id: 'creative-writing',
  tags: ['writing', 'creativity', 'content', 'assistant'],
  estimated_time: '10-15 minutes',
  use_cases: [
    'Blog post creation',
    'Marketing copy',
    'Creative storytelling',
    'Content planning'
  ],
  examples: [
    'Write a blog post about sustainable living for millennials',
    'Create a product description for a new tech gadget',
    'Develop a short story opening for a mystery novel'
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const PromptCardDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Prompt Card Demo</h1>
          <p className="text-gray-400">
            Demonstration of the new prompt card features: modal view and expandable cards with enhanced copy functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Modal Version */}
          <div>
            <Card className="bg-gray-800/50 border-gray-700 p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Modal Version</h2>
              <p className="text-gray-400 text-sm mb-4">
                Click "View Prompt" to open the full prompt in a modal overlay. Features:
              </p>
              <ul className="text-gray-400 text-sm space-y-1 mb-4">
                <li>• Full prompt content display</li>
                <li>• Enhanced copy functionality with visual feedback</li>
                <li>• Tags and metadata display</li>
                <li>• Use cases and examples</li>
                <li>• Favorites integration</li>
                <li>• Access control support</li>
              </ul>
            </Card>
            
            <PromptCard 
              prompt={samplePrompt}
              showPreview={true}
            />
          </div>

          {/* Expandable Version */}
          <div>
            <Card className="bg-gray-800/50 border-gray-700 p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Expandable Version</h2>
              <p className="text-gray-400 text-sm mb-4">
                Click "View Full Prompt" to expand the card inline. Features:
              </p>
              <ul className="text-gray-400 text-sm space-y-1 mb-4">
                <li>• Inline expansion without modal</li>
                <li>• Same rich content display</li>
                <li>• Smooth animations</li>
                <li>• Compact when collapsed</li>
                <li>• Better for mobile devices</li>
                <li>• Preserves page context</li>
              </ul>
            </Card>
            
            <ExpandablePromptCard 
              prompt={samplePrompt}
              showPreview={true}
            />
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="mt-12">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 text-gray-300">Feature</th>
                    <th className="text-center py-2 text-gray-300">Modal Version</th>
                    <th className="text-center py-2 text-gray-300">Expandable Version</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Full content display</td>
                    <td className="text-center py-2">✅</td>
                    <td className="text-center py-2">✅</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Enhanced copy functionality</td>
                    <td className="text-center py-2">✅</td>
                    <td className="text-center py-2">✅</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Preserves page context</td>
                    <td className="text-center py-2">❌</td>
                    <td className="text-center py-2">✅</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Mobile friendly</td>
                    <td className="text-center py-2">✅</td>
                    <td className="text-center py-2">✅</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Keyboard navigation</td>
                    <td className="text-center py-2">✅</td>
                    <td className="text-center py-2">✅</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-2">Focus management</td>
                    <td className="text-center py-2">✅</td>
                    <td className="text-center py-2">✅</td>
                  </tr>
                  <tr>
                    <td className="py-2">Best for</td>
                    <td className="text-center py-2">Detailed review</td>
                    <td className="text-center py-2">Quick access</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">How to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Modal Version</h3>
                <ol className="text-gray-400 text-sm space-y-1">
                  <li>1. Click the "View Prompt" button</li>
                  <li>2. Modal opens with full content</li>
                  <li>3. Use the "Copy Prompt" button to copy</li>
                  <li>4. Click outside or press Escape to close</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Expandable Version</h3>
                <ol className="text-gray-400 text-sm space-y-1">
                  <li>1. Click "View Full Prompt" to expand</li>
                  <li>2. Content expands inline</li>
                  <li>3. Copy button appears in expanded view</li>
                  <li>4. Click "Show Less" to collapse</li>
                </ol>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PromptCardDemo;
