import React from 'react';
import { Pencil, Bot, Zap, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

const EngineeringSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              From Conversation to Command
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Mastering AI requires a new way of thinking. It's not about talking to a machine; it's about giving it precise, powerful instructions.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-4xl mx-auto">
          <div className="bg-gray-800/30 p-8 rounded-xl border border-gray-700/50">
            <div className="flex items-center mb-4">
              <Pencil className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-semibold ml-4 text-white">Natural Language</h3>
            </div>
            <p className="text-gray-400">
              For humans. It's expressive, emotional, and relies on shared context. Great for stories, not for specs.
            </p>
          </div>
          <div className="bg-gray-800/30 p-8 rounded-xl border border-gray-700/50">
            <div className="flex items-center mb-4">
              <Bot className="w-8 h-8 text-indigo-400" />
              <h3 className="text-2xl font-semibold ml-4 text-white">Engineered Prompt</h3>
            </div>
            <p className="text-gray-400">
              For AI. It's structured, logical, and provides explicit instructions. Built for precision and results.
            </p>
          </div>
        </div>

        <div className="mt-20 max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            Unlock the True Potential of AI
          </h3>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center mr-4">
                <Bot className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Reusable & Scalable</h4>
                <p className="text-gray-300">
                  Craft a powerful prompt once, then reuse it across countless scenarios. This ensures consistency and saves you enormous amounts of time, letting you scale your best ideas instantly.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mr-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Embed Complex Logic</h4>
                <p className="text-gray-300">
                  Go beyond simple commands. Engineer prompts with conditional logic, variables, and multi-step instructions to tackle sophisticated problems that a basic query could never handle.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mr-4">
                <Pencil className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Unlock Advanced Capabilities</h4>
                <p className="text-gray-300">
                  Truly harness the AI's power. Engineered prompts allow you to specify tone, format, and perspective, unlocking creative and analytical abilities for superior results in any field.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mr-4">
                <ArrowRight className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Drive Predictable Outcomes</h4>
                <p className="text-gray-300">
                  Eliminate guesswork. By providing a structured and detailed blueprint, engineered prompts guide the AI to produce reliable, accurate, and predictable outputs every single time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center max-w-2xl mx-auto">
          <p className="text-lg text-gray-300 mb-6">
            Ready to go from basic queries to expert commands? Our guide is the perfect place to start.
          </p>
          <Link 
            to="/prompt-engineering-guide" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Button size="lg" className="group w-full sm:w-auto">
            Prompting Guide
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EngineeringSection;
