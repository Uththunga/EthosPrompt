import React, { useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Wrench, Settings, Rocket, Lightbulb, Target, Clock, TrendingUp, GraduationCap, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const PromptEngineeringGuide: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
              <Wrench size={24} className="text-purple-400 mr-3" /> Purpose & Audience
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                <div className="p-6">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-4">Engineered Prompting</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Purpose: To instruct an AI to generate specific, optimized output
                    </li>
                    <li className="flex items-center">
                      <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Audience: An AI language model (machine)
                    </li>
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
                    <li className="flex items-center">
                      <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Purpose: To communicate an idea to a human
                    </li>
                    <li className="flex items-center">
                      <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Audience: A human reader
                    </li>
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
              <Settings size={24} className="text-purple-400 mr-3" /> Structure & Components
            </h2>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-4">Components of Engineered Prompts</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center">
                        <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Uses explicit roles and instructions
                      </li>
                      <li className="flex items-center">
                        <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Clearly defined inputs and variables
                      </li>
                      <li className="flex items-center">
                        <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Specified output formats
                      </li>
                      <li className="flex items-center">
                        <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Detailed constraints
                      </li>
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
              <Rocket size={24} className="text-purple-400 mr-3" /> Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Best for Engineered Prompting</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-green-400 mr-2" /> Data extraction and summarization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-green-400 mr-2" /> Content generation with specific parameters
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-green-400 mr-2" /> Bulk email template variations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-green-400 mr-2" /> Technical documentation
                    </li>
                  </ul>
                </div>
              </Card>
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Best for Normal Writing</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-green-400 mr-2" /> Personal communication
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-green-400 mr-2" /> Storytelling and creative writing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-green-400 mr-2" /> Emotional expression
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-green-400 mr-2" /> Building human connections
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </section>

          {/* Why It Matters Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Lightbulb size={24} className="text-purple-400 mr-3" /> Why It Really Matters
            </h2>
            <div className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <Target size={20} className="text-purple-400 mr-2" />
                        Quality Makes a Difference
                      </h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Poor prompts = confusing responses
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Good prompts = exact solutions
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Avoid frustrating back-and-forth
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Get consistent, reliable help
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <Clock size={20} className="text-purple-400 mr-2" />
                        Time is Valuable
                      </h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Bad prompts waste your time
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Good prompts save hours
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Faster project completion
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> More time for what matters
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Real Impact */}
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <TrendingUp size={20} className="text-purple-400 mr-2" /> Real Impact on Your Work
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Without Good Prompts</h4>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Vague, unhelpful answers
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Lots of manual corrections
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Wasted API credits
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Frustrating experience
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">With Good Prompts</h4>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Clear, useful responses
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Minimal editing needed
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Efficient resource use
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Enjoyable workflow
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Why Learn It */}
              <Card className="bg-gray-900/80">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <GraduationCap size={20} className="text-purple-400 mr-2" /> Why Learn This Skill
                  </h3>
                  <p className="text-gray-300 mb-6">
                    As AI becomes more common in our daily work, knowing how to communicate effectively with it is becoming as important as knowing how to write a good email:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-purple-400 mb-3">Personal Growth</h4>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Stand out in your field
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Work more efficiently
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Solve problems faster
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Reduce daily stress
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-purple-400 mb-3">Future-Ready</h4>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Essential future skill
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Adapt to AI changes
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Lead AI initiatives
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Share knowledge with others
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-purple-500/5 rounded-lg border border-purple-500/10">
                    <div className="flex items-start">
                      <Lightbulb size={20} className="text-purple-400 mr-3 flex-shrink-0 mt-1" />
                      <p className="text-purple-200 text-sm leading-tight">
                        <strong>Think about it:</strong> Every minute spent learning prompt engineering saves hours of future work. It's like learning the right way to ask questions - once you know how, everything becomes easier, faster, and more productive. Plus, as AI continues to grow, this skill becomes more valuable every day! 
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Deep Dive CTA */}
          <div className="text-center mt-12">
            <div className="inline-block">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>                <Link to="/prompt-engineering-guide/examples">
                  <Button 
                    size="lg" 
                    className="relative bg-gray-900 text-white border border-purple-500/20 hover:border-purple-500/40 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 group"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-200 group-hover:from-purple-100 group-hover:to-indigo-100 transition-all">
                      Dive into Real-World Examples
                    </span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-gray-400 text-sm">
                See how these principles work in practical, everyday scenarios
              </p>
            </div>
          </div>

          {/* Next Lesson Navigation */}          <div className="mt-16 border-t border-gray-800 pt-8">
            <Link to="/prompt-engineering-guide/basics" 
              className="flex items-center justify-between p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all rounded-lg group"
            >
              <div>
                <p className="text-sm text-purple-400">Next Lesson</p>
                <h3 className="text-xl font-semibold text-white mt-1 group-hover:text-purple-200 transition-colors">
                  Prompt Engineering Basics
                </h3>
                <p className="text-gray-400 mt-1">
                  Learn the fundamental concepts and principles of prompt engineering
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

export default PromptEngineeringGuide;
