import React from 'react';
import { Card } from '../components/ui/Card';

const PromptEngineeringGuide: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            The Art of{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Prompt Engineering
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Master the difference between engineered prompting and normal writing to get better results from AI.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Introduction */}
          <div className="prose prose-invert max-w-none mb-16">
            <p className="text-lg text-gray-300">
              The difference between <strong className="text-purple-400">engineered prompting</strong> and{' '}
              <strong className="text-purple-400">normal writing</strong> comes down to intent, structure, 
              and purpose—especially in how you communicate with AI systems like ChatGPT.
            </p>
          </div>

          {/* Purpose & Audience Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <span className="text-2xl mr-3">🔧</span> Purpose & Audience
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                <div className="p-6">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-4">Engineered Prompting</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• Purpose: To instruct an AI to generate specific, optimized output</li>
                    <li>• Audience: An AI language model (machine)</li>
                  </ul>
                  <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800/50">
                    <p className="text-sm text-purple-400 mb-2">Example:</p>
                    <p className="text-gray-400">
                      "You are a resume expert. Rewrite this resume to be ATS-friendly and focused on marketing roles."
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                <div className="p-6">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-4">Normal Writing</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• Purpose: To communicate an idea to a human</li>
                    <li>• Audience: A human reader</li>
                  </ul>
                  <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800/50">
                    <p className="text-sm text-purple-400 mb-2">Example:</p>
                    <p className="text-gray-400">
                      "Hey Jane, here's the new version of my resume. Let me know what you think."
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Structure & Components Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <span className="text-2xl mr-3">⚙️</span> Structure & Components
            </h2>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-4">Components of Engineered Prompts</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>• Uses explicit roles and instructions</li>
                      <li>• Clearly defined inputs and variables</li>
                      <li>• Specified output formats</li>
                      <li>• Detailed constraints</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50">
                    <p className="text-sm text-purple-400 mb-2">Example Structure:</p>
                    <pre className="text-gray-400 whitespace-pre-wrap text-sm">
{`[ROLE]: You are a professional LinkedIn strategist.
[GOAL]: Optimize my LinkedIn bio for recruiters.
[INPUT]: "Marketing specialist with 5 years..."
[OUTPUT FORMAT]: Concise paragraph, 2-3 sentences.
[CONSTRAINT]: Use digital marketing keywords.`}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Use Cases Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <span className="text-2xl mr-3">🚀</span> Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Best for Engineered Prompting</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span> Data extraction and summarization
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span> Content generation with specific parameters
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span> Bulk email template variations
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span> Technical documentation
                    </li>
                  </ul>
                </div>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Best for Normal Writing</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span> Personal communication
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span> Storytelling and creative writing
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span> Emotional expression
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span> Building human connections
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </section>

          {/* Why It Matters Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <span className="text-2xl mr-3">💡</span> Why It Really Matters
            </h2>
            <div className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="text-purple-400 mr-2">🎯</span>
                        Quality Makes a Difference
                      </h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Poor prompts = confusing responses</li>
                        <li>• Good prompts = exact solutions</li>
                        <li>• Avoid frustrating back-and-forth</li>
                        <li>• Get consistent, reliable help</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="text-purple-400 mr-2">⏱️</span>
                        Time is Valuable
                      </h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Bad prompts waste your time</li>
                        <li>• Good prompts save hours</li>
                        <li>• Faster project completion</li>
                        <li>• More time for what matters</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Real Impact */}
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="text-purple-400 mr-2">💪</span> Real Impact on Your Work
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Without Good Prompts</h4>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Vague, unhelpful answers</li>
                        <li>• Lots of manual corrections</li>
                        <li>• Wasted API credits</li>
                        <li>• Frustrating experience</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">With Good Prompts</h4>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Clear, useful responses</li>
                        <li>• Minimal editing needed</li>
                        <li>• Efficient resource use</li>
                        <li>• Enjoyable workflow</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Why Learn It */}
              <Card className="bg-gray-900/80">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-3">🎓</span> Why Learn This Skill
                  </h3>
                  <p className="text-gray-300 mb-6">
                    As AI becomes more common in our daily work, knowing how to communicate effectively with it is becoming as important as knowing how to write a good email:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-purple-400 mb-3">Personal Growth</h4>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Stand out in your field</li>
                        <li>• Work more efficiently</li>
                        <li>• Solve problems faster</li>
                        <li>• Reduce daily stress</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-purple-400 mb-3">Future-Ready</h4>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Essential future skill</li>
                        <li>• Adapt to AI changes</li>
                        <li>• Lead AI initiatives</li>
                        <li>• Share knowledge with others</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-purple-500/5 rounded-lg border border-purple-500/10">
                    <div className="flex items-start">
                      <span className="text-purple-400 text-xl mr-3">💡</span>
                      <p className="text-purple-200 text-sm leading-tight">
                        <strong>Think about it:</strong> Every minute spent learning prompt engineering saves hours of future work. It's like learning the right way to ask questions - once you know how, everything becomes easier, faster, and more productive. Plus, as AI continues to grow, this skill becomes more valuable every day! 🚀
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </div>
      </div>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 pointer-events-none" />
    </div>
  );
};

export default PromptEngineeringGuide;
