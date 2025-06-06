import React from 'react';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden py-24 md:py-32">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/EthosPrompt/bg.jpg" 
          alt="" 
          className="w-full h-full object-cover opacity-60" 
        />
      </div>
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gray-900/70">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-indigo-900/40"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,40,200,0.25)_0%,transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(80,60,220,0.25)_0%,transparent_40%)]"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0icmdiYSgxMjAsIDg3LCAyNTUsIDAuMDgpIiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            <span className="block">Engineered Prompts for</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
              Professionals & Creators
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Supercharge your AI workflows with premium, engineered prompts designed for content creators, marketers, recruiters, and more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="group"
              onClick={() => navigate('/categories')}
            >
              Browse Categories
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;