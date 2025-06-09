import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const GettingStarted: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-20 md:pt-24 pb-12 md:pb-16 px-4 sm:px-6">
      <div className="container mx-auto px-0 sm:px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-12 relative z-10 px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 sm:mb-4">
            <div className="flex items-center mb-3 sm:mb-0">
              <Rocket className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 mr-3" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
                Getting Started
              </h1>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-300">
            Welcome to EthosPrompt! Follow these steps to get started with our platform.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto relative z-10 space-y-6 md:space-y-8">
          <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-5 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4 sm:mb-6">Quick Start Guide</h2>
            
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold mr-3 sm:mr-4 mt-0.5">1</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-100">Create an Account</h3>
                  <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-300">
                    Sign up for a free account to get started. No credit card required.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold mr-3 sm:mr-4 mt-0.5">2</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-100">Explore the Dashboard</h3>
                  <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-300">
                    Familiarize yourself with the interface and available tools.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold mr-3 sm:mr-4 mt-0.5">3</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-100">Create Your First Prompt</h3>
                  <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-300">
                    Start by creating a simple prompt and see the AI in action.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold mr-3 sm:mr-4 mt-0.5">4</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-100">Explore Advanced Features</h3>
                  <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-300">
                    Dive deeper into advanced features and customization options.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-100 mb-3 sm:mb-4">Next Steps</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Link 
                  to="/resources/documentation" 
                  className="group flex items-center justify-between p-3 sm:p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-colors active:scale-[0.98]"
                >
                  <div className="pr-2">
                    <h4 className="text-sm sm:text-base font-medium text-gray-100 group-hover:text-white">Documentation</h4>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Explore our comprehensive documentation</p>
                  </div>
                  <ArrowRight className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </Link>
                <Link 
                  to="/resources/best-practices" 
                  className="group flex items-center justify-between p-3 sm:p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-colors active:scale-[0.98]"
                >
                  <div className="pr-2">
                    <h4 className="text-sm sm:text-base font-medium text-gray-100 group-hover:text-white">Best Practices</h4>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Learn how to create effective prompts</p>
                  </div>
                  <ArrowRight className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 pointer-events-none" />
    </div>
  );
};

export default GettingStarted;
