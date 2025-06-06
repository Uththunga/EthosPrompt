import React, { useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { BookOpen, MessageCircle, Brain, Circle, ArrowRight, Target, Wrench, Shield, Zap, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromptEngineeringTechniques: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            Practical Prompt{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Engineering Techniques
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Master the Art of Crafting Effective Prompts
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Core Techniques Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <Wrench size={24} className="text-purple-400 mr-3" /> Core Techniques
            </h2>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
              <div className="p-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Just like a skilled chef knows the right ingredients and techniques to create a perfect dish, a prompt engineer uses specific techniques to get the best results from AI.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div className="bg-gray-900/30 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-purple-200 mb-3">1. Role Setting</h3>
                        <p className="text-gray-300 mb-2">Give the AI a specific role to guide its responses.</p>
                        <div className="bg-gray-900/50 p-3 rounded border border-purple-500/20">
                          <p className="text-sm text-purple-200 mb-2">Examples:</p>
                          <div className="space-y-2 text-gray-300 text-sm">
                            <p>"Act as an experienced Python developer reviewing code for security vulnerabilities..."</p>
                            <p>"You are a data scientist specializing in statistical analysis..."</p>
                            <p>"Take on the role of a UX designer evaluating a website..."</p>
                          </div>
                          <p className="mt-3 text-purple-200 text-sm">💡 Roles help set expectations and context for the interaction.</p>
                        </div>
                      </div>

                      <div className="bg-gray-900/30 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-purple-200 mb-3">2. Context Providing</h3>
                        <p className="text-gray-300 mb-2">Set the background and requirements clearly.</p>
                        <div className="bg-gray-900/50 p-3 rounded border border-purple-500/20">
                          <p className="text-sm text-purple-200 mb-2">Example Structure:</p>
                          <div className="space-y-2 text-gray-300 text-sm">
                            <p><strong>Audience:</strong> "This is for a beginner-level tutorial..."</p>
                            <p><strong>Purpose:</strong> "The goal is to explain complex concepts simply..."</p>
                            <p><strong>Constraints:</strong> "Must be completed within 500 words..."</p>
                          </div>
                          <p className="mt-3 text-purple-200 text-sm">💡 More context leads to more relevant responses.</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div className="bg-gray-900/30 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-purple-200 mb-3">3. Task Breakdown</h3>
                        <p className="text-gray-300 mb-2">Split complex requests into clear steps.</p>
                        <div className="bg-gray-900/50 p-3 rounded border border-purple-500/20">
                          <p className="text-sm text-purple-200 mb-2">Example Format:</p>
                          <div className="space-y-2 text-gray-300 text-sm">
                            <p>1. First, analyze the current state</p>
                            <p>2. Then, identify potential improvements</p>
                            <p>3. Finally, provide actionable recommendations</p>
                            <p>For each step, include: [specific requirements]</p>
                          </div>
                          <p className="mt-3 text-purple-200 text-sm">💡 Breaking down tasks improves clarity and quality.</p>
                        </div>
                      </div>

                      <div className="bg-gray-900/30 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-purple-200 mb-3">4. Output Formatting</h3>
                        <p className="text-gray-300 mb-2">Specify how you want the response structured.</p>
                        <div className="bg-gray-900/50 p-3 rounded border border-purple-500/20">
                          <p className="text-sm text-purple-200 mb-2">Format Examples:</p>
                          <div className="space-y-2 text-gray-300 text-sm">
                            <p>• Bullet points for key findings</p>
                            <p>• Tables for data comparison</p>
                            <p>• Step-by-step instructions</p>
                            <p>• JSON or specific data structures</p>
                          </div>
                          <p className="mt-3 text-purple-200 text-sm">💡 Clear formats make responses more useful and actionable.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Advanced Strategies Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <Zap size={24} className="text-purple-400 mr-3" /> Advanced Strategies
            </h2>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
              <div className="p-6 space-y-6">
                <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-3">Chain-of-Thought Prompting</h3>
                  <p className="text-gray-300 mb-4">
                    Guide the AI through a logical thinking process, like helping a student solve a complex problem step by step.
                  </p>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="text-lg font-semibold text-purple-200 mb-2">Example Structure:</h4>
                    <div className="space-y-2 text-gray-300">
                      <p>1. Let's approach this systematically:</p>
                      <p>2. First, we'll analyze the problem [specific details]</p>
                      <p>3. Then, we'll consider possible solutions [criteria]</p>
                      <p>4. Finally, we'll evaluate each option [evaluation method]</p>
                    </div>
                    <div className="mt-4 bg-purple-500/10 p-3 rounded border border-purple-500/20">
                      <p className="text-purple-200 text-sm">
                        💡 This technique helps AI break down complex problems and explain its reasoning.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-200 mb-3">Few-Shot Learning</h3>
                    <p className="text-gray-300 mb-4">
                      Provide examples of desired input-output pairs before your main request.
                    </p>
                    <div className="bg-gray-900/50 p-3 rounded border border-purple-500/20">
                      <p className="text-sm text-purple-200 mb-2">Example Format:</p>
                      <div className="text-gray-300 text-sm space-y-2">
                        <p><strong>Input 1:</strong> "Website loads slowly"</p>
                        <p><strong>Solution 1:</strong> "Check server response times, optimize images..."</p>
                        <p><strong>Input 2:</strong> "Database queries timeout"</p>
                        <p><strong>Solution 2:</strong> "Review query optimization, check indexes..."</p>
                        <p className="mt-3"><strong>Now, solve this:</strong> [your actual problem]</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-200 mb-3">Temperature Control</h3>
                    <p className="text-gray-300 mb-4">
                      Adjust the AI's creativity level based on your needs.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-gray-900/50 p-3 rounded border border-purple-500/20">
                        <h4 className="text-sm font-semibold text-white mb-2">Low Temperature (0.2-0.4)</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Best for factual responses</li>
                          <li>• Technical documentation</li>
                          <li>• Code generation</li>
                          <li>• Data analysis</li>
                        </ul>
                      </div>
                      <div className="bg-gray-900/50 p-3 rounded border border-purple-500/20">
                        <h4 className="text-sm font-semibold text-white mb-2">High Temperature (0.7-0.9)</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Creative writing</li>
                          <li>• Brainstorming</li>
                          <li>• Content generation</li>
                          <li>• Alternative solutions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-3">System Message Design</h3>
                  <p className="text-gray-300 mb-4">
                    Create effective system messages that set the foundation for AI behavior and responses.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 p-3 rounded border border-purple-500/20">
                      <h4 className="text-sm font-semibold text-white mb-2">Components:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Role definition</li>
                        <li>• Behavioral guidelines</li>
                        <li>• Response format rules</li>
                        <li>• Output constraints</li>
                      </ul>
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded border border-purple-500/20">
                      <h4 className="text-sm font-semibold text-white mb-2">Example:</h4>
                      <p className="text-gray-300 text-sm">
                        "You are an expert software architect. Always provide solutions that are scalable and maintainable. Include code examples when relevant. Format responses with clear headings and bullet points."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Best Practices Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <Shield size={24} className="text-purple-400 mr-3" /> Best Practices & Common Pitfalls
            </h2>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Best Practices */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">✅ Best Practices</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Be Specific:</strong>
                          <p className="text-gray-300 mt-1">Instead of "make it better," say "improve the performance by reducing database calls"</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Provide Context:</strong>
                          <p className="text-gray-300 mt-1">Include relevant background information and constraints</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Use Examples:</strong>
                          <p className="text-gray-300 mt-1">Show what good output looks like with concrete examples</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Common Pitfalls */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">⚠️ Common Pitfalls</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <AlertTriangle size={16} className="text-purple-400 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Being Too Vague:</strong>
                          <p className="text-gray-300 mt-1">"Make it good" vs "Optimize the function for readability and performance"</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle size={16} className="text-purple-400 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Overloading Instructions:</strong>
                          <p className="text-gray-300 mt-1">Break complex tasks into smaller, manageable prompts</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle size={16} className="text-purple-400 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Assuming Context:</strong>
                          <p className="text-gray-300 mt-1">Always provide necessary background, even if it seems obvious</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>          </section>

          {/* Evaluation and Testing Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <Target size={24} className="text-purple-400 mr-3" /> Evaluation & Testing
            </h2>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
              <div className="p-6">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Just like software testing, prompt engineering requires systematic evaluation to ensure reliability and effectiveness.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-gray-900/30 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-200 mb-3">Testing Strategies</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start">
                          <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                          <div>
                            <strong>Edge Cases:</strong>
                            <p className="mt-1">Test with unusual or extreme inputs</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                          <div>
                            <strong>Variations:</strong>
                            <p className="mt-1">Try different phrasings of the same prompt</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                          <div>
                            <strong>Cross-Validation:</strong>
                            <p className="mt-1">Test across different AI models if possible</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-900/30 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-200 mb-3">Success Metrics</h3>
                      <div className="space-y-3">
                        <div className="bg-gray-900/50 p-3 rounded border border-purple-500/20">
                          <p className="text-white text-sm mb-2"><strong>Accuracy</strong></p>
                          <p className="text-gray-300 text-sm">Are the responses correct and relevant?</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded border border-purple-500/20">
                          <p className="text-white text-sm mb-2"><strong>Consistency</strong></p>
                          <p className="text-gray-300 text-sm">Do similar prompts get similar responses?</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded border border-purple-500/20">
                          <p className="text-white text-sm mb-2"><strong>Usability</strong></p>
                          <p className="text-gray-300 text-sm">Is the output format practical and useful?</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-900/30 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-200 mb-3">Iteration Process</h3>
                      <div className="bg-gray-900/50 p-4 rounded border border-gray-700/50">
                        <ol className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <div className="font-bold text-purple-400 mr-3">1.</div>
                            <div>
                              <strong>Initial Testing</strong>
                              <p className="text-sm mt-1">Start with basic test cases</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="font-bold text-purple-400 mr-3">2.</div>
                            <div>
                              <strong>Analyze Results</strong>
                              <p className="text-sm mt-1">Identify patterns in responses</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="font-bold text-purple-400 mr-3">3.</div>
                            <div>
                              <strong>Refine Prompt</strong>
                              <p className="text-sm mt-1">Adjust based on findings</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="font-bold text-purple-400 mr-3">4.</div>
                            <div>
                              <strong>Validate Changes</strong>
                              <p className="text-sm mt-1">Test the refined prompt</p>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>

                    <div className="bg-gray-900/30 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-200 mb-3">Documentation</h3>
                      <p className="text-gray-300 mb-4">
                        Keep track of your prompt engineering process:
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" />
                          Record successful patterns
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" />
                          Document edge cases
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" />
                          Note model-specific behaviors
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" />
                          Share learnings with team
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Next Lesson Navigation */}
          <div className="mt-16 border-t border-gray-800 pt-8">
            <Link 
              to="/prompt-engineering-guide/examples" 
              className="flex items-center justify-between p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all rounded-lg group"
            >
              <div>
                <p className="text-sm text-purple-400">Next Chapter</p>
                <h3 className="text-xl font-semibold text-white mt-1 group-hover:text-purple-200 transition-colors">
                  Real-World Examples & Templates
                </h3>
                <p className="text-gray-400 mt-1">
                  See these techniques in action with practical examples
                </p>
              </div>
              <ArrowRight size={24} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 pointer-events-none" />
    </div>
  );
};

export default PromptEngineeringTechniques;
