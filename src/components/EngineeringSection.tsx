import React from 'react';
import { Pencil, Bot, Zap, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

const EngineeringSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/90">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            Understanding Engineered Prompting
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Normal Writing Card */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Pencil className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold ml-3 text-white">Normal Writing</h3>
            </div>
            <p className="text-gray-300 mb-4">For humans — full of feelings, tone, and personal touch.</p>
            <p className="text-gray-400 text-sm">
              You write to express yourself, tell stories, or connect emotionally. It's flexible, creative, and flows naturally.
            </p>
          </div>

          {/* Engineered Prompting Card */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur">
            <div className="flex items-center mb-4">              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Bot className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold ml-3 text-white">Engineered Prompting</h3>
            </div>
            <p className="text-gray-300 mb-4">For AI — structured, clear, and purpose-driven.</p>
            <p className="text-gray-400 text-sm">
              You give step-by-step instructions so AI knows exactly what to do. It's not about feelings — it's about results.
            </p>
          </div>

          {/* Why It Matters Card */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-violet-500/10 rounded-lg">
                <Zap className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold ml-3 text-white">Why It Matters</h3>
            </div>
            <p className="text-gray-300 mb-4">Humans have emotions. AI follows commands.</p>
            <p className="text-gray-400 text-sm">
              If you want the AI to help you create, solve, or automate — you need to write like a prompt engineer, not just a storyteller.            </p>          
          </div>
        </div>

        {/* Consequences Section */}
        <div className="mt-16 bg-gray-800/50 rounded-xl p-8 max-w-6xl mx-auto border border-gray-700/50">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              What Happens Without Engineered Prompts?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-red-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Wasted Time & Money</h4>
                <p className="text-gray-300">
                  You'll spend hours repeating requests, fixing unclear outputs, and paying for API tokens that didn't give you what you needed
                </p>
                <span className="mt-3 text-red-400 text-sm">Up to 70% more time wasted</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-red-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Poor Quality Results</h4>
                <p className="text-gray-300">
                  Get vague, off-topic, or inconsistent responses that need extensive editing and don't match what you actually wanted
                </p>
                <span className="mt-3 text-red-400 text-sm">50% less accurate outputs</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                  <Pencil className="w-6 h-6 text-red-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Lost Opportunities</h4>
                <p className="text-gray-300">
                  Miss out on AI's full potential while competitors use it effectively. Fall behind in productivity and innovation
                </p>
                <span className="mt-3 text-red-400 text-sm">3x slower workflow</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-purple-500/5 rounded-lg border border-purple-500/10">
              <p className="text-center text-gray-300">
                <strong className="text-purple-400">The Solution:</strong> Our engineered prompts help you skip the learning curve and start getting reliable, high-quality results from day one. No more trial and error – just consistent, professional outputs that match your needs exactly.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-gray-300 mb-6">
            Want to master the art of prompt engineering? Our comprehensive guide will teach you how to craft perfect prompts for any AI task.
          </p>
          <Link to="/prompt-engineering-guide">
            <Button size="lg" className="group">
              Learn More About Prompt Engineering
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EngineeringSection;
