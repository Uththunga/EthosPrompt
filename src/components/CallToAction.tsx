import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-indigo-900/90 opacity-90 z-0"></div>
      
      {/* Enhanced glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full filter blur-[128px] animate-pulse delay-1000"></div>
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your AI Workflows?
          </h2>
          
          <p className="text-xl text-purple-200 mb-8">
            Join thousands of professionals using our engineered prompts to save time, increase productivity, and achieve better results with AI.
          </p>
          
          <div className="flex justify-center">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-100 group">
              Get Started Today
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>
          
          <p className="mt-6 text-purple-200 text-sm">
            No subscription required. Purchase individual prompts or save with bundles.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;