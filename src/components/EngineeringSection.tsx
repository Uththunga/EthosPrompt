import React from 'react';
import { Pencil, Bot, Zap, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

const EngineeringSection: React.FC = () => {
  return (    <section className="py-12 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/90">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            Understanding Engineered Prompting
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">          {/* Normal Writing Card */}
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
            <div className="flex items-center mb-4">              
              <div className="p-2 bg-indigo-500/10 rounded-lg">
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
              If you want the AI to help you create, solve, or automate — you need to write like a prompt engineer, not just a storyteller.
            </p>          
          </div>
        </div>

        {/* Why Use Section */}
        <div className="mt-16 bg-gray-800/50 rounded-xl p-8 max-w-6xl mx-auto border border-gray-700/50">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Why Use Engineered Prompts?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-violet-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Save Time</h4>
                <p className="text-gray-300">
                  Get the right results on your first try
                </p>
                <span className="mt-3 text-violet-400 text-sm">70% faster results</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-violet-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Better Quality</h4>
                <p className="text-gray-300">
                  Clear, accurate answers that match your needs
                </p>
                <span className="mt-3 text-violet-400 text-sm">50% more accurate</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                  <Pencil className="w-6 h-6 text-violet-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Stay Ahead</h4>
                <p className="text-gray-300">
                  Use AI effectively to boost productivity
                </p>
                <span className="mt-3 text-violet-400 text-sm">3x faster workflow</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-purple-500/5 rounded-lg border border-purple-500/10">
              <p className="text-center text-gray-300">
                <strong className="text-purple-400">Get Started:</strong> Skip the learning curve with our ready-to-use engineered prompts. Professional results from day one.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-gray-300 mb-6">
            Want to master the art of prompting? Our comprehensive guide will teach you how to craft perfect prompts for any AI task.
          </p>          <Link 
            to="/prompt-engineering-guide" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Button size="lg" className="group w-full sm:w-auto">
              Learn More About Prompting
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EngineeringSection;
