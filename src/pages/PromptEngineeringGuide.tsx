import type { ReactNode } from 'react';
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// AnimatedSection Component
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '', as = 'section' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`mb-24 ${className}`}
    >
      {children}
    </MotionComponent>
  );
};

// Main Component
const PromptingGuide: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 pb-16">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <AnimatedSection as="div" className="text-center">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-purple-300 bg-purple-500/10 rounded-full">
            Master the Art of AI Communication
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-[1.1] py-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Prompting Guide
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300/90 mt-8 backdrop-blur-sm px-4 py-4 rounded-lg">
            Unlock the full potential of AI models by learning how to craft effective prompts. Turn your ideas into powerful results.
          </p>
        </AnimatedSection>

        {/* Step-by-step Guide */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Your Journey to Becoming a Prompt Expert</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 bg-purple-500/10 rounded-full border border-purple-500/30">
                <span className="text-2xl font-bold text-purple-300">1</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Understand the Basics</h3>
              <p className="text-gray-400">Learn the core principles of how AI interprets your requests.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 bg-purple-500/10 rounded-full border border-purple-500/30">
                <span className="text-2xl font-bold text-purple-300">2</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Master Advanced Techniques</h3>
              <p className="text-gray-400">Explore methods like zero-shot, few-shot, and chain-of-thought prompting.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 bg-purple-500/10 rounded-full border border-purple-500/30">
                <span className="text-2xl font-bold text-purple-300">3</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Apply and Innovate</h3>
              <p className="text-gray-400">Use your skills to solve complex problems and create amazing things.</p>
            </div>
          </div>
        </AnimatedSection>

        {/* What is Prompting? */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">What is Prompting?</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-base sm:text-lg text-gray-400 mb-6">
              Think of prompting as having a conversation with an AI. It's the art of giving clear, specific instructions to guide the AI towards the exact result you want. In essence, you're not just asking a question; you're <span className="text-purple-400 font-semibold">programming the AI with words</span>.
            </p>
            <p className="text-base sm:text-lg text-gray-400">
              A great prompt is like a good recipe—it gives the AI all the right ingredients and steps to create something amazing for you.
            </p>
          </div>
        </AnimatedSection>

        {/* AI vs. Human Conversation */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">AI vs. Human Conversation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-gray-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-pink-400 mb-4">Talking to a Human</h3>
              <p className="text-gray-400">Humans understand context, read between the lines, and use shared experiences to fill in the gaps. You can be vague, and they'll likely still get what you mean.</p>
              <p className="text-gray-300 font-mono text-xs sm:text-sm mt-4 p-4 bg-gray-900/50 rounded">"Hey, can you suggest a dinner spot? Something not too fancy."</p>
            </div>
            <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-gray-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">Talking to an AI</h3>
              <p className="text-gray-400">AI needs clear, direct instructions. It doesn't have personal experiences or intuition, so you need to provide all the necessary details for it to give you the best response.</p>
              <p className="text-gray-300 font-mono text-xs sm:text-sm mt-4 p-4 bg-gray-900/50 rounded">"Suggest 3 casual Italian restaurants in San Francisco suitable for a date night, with an average price under $50 per person."</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Anatomy of a Prompt - Redesigned */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Let's Break Down a Prompt</h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">A good prompt is made of several key parts. Let's look at an example and see how they work together.</p>
          
          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
            <div className="p-6 md:p-8">
              {/* The Full Prompt Example */}
              <div className="bg-gray-900/50 p-4 sm:p-6 rounded-lg border border-gray-700 mb-8">
                <p className="text-gray-300 font-mono text-sm sm:text-base leading-relaxed">
                  <span className="text-pink-400">As an expert storyteller,</span> <span className="text-cyan-400">write a short, suspenseful story (around 200 words)</span> <span className="text-green-400">about a mysterious key found in an old library.</span> <span className="text-yellow-400">End the story on a cliffhanger.</span>
                </p>
              </div>

              {/* The Breakdown */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-pink-500/20 flex-shrink-0 mr-4" />
                  <div>
                    <h4 className="font-semibold text-base text-pink-400">The Role: Set the Persona</h4>
                    <p className="text-gray-400">Tells the AI <span className="font-bold">who to be</span>. This sets the tone, style, and expertise. 'Expert storyteller' gets a very different result than 'news reporter'.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex-shrink-0 mr-4" />
                  <div>
                    <h4 className="font-semibold text-base text-cyan-400">The Task: Define the Goal</h4>
                    <p className="text-gray-400">This is the core instruction—<span className="font-bold">what you want the AI to do</span>. Being clear and concise is key. Here, it's to 'write a short, suspenseful story'.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex-shrink-0 mr-4" />
                  <div>
                    <h4 className="font-semibold text-base text-green-400">The Context: Provide the Details</h4>
                    <p className="text-gray-400">This gives the AI the <span className="font-bold">'who, what, where'</span> to work with. 'A mysterious key in an old library' provides the essential creative ingredients.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex-shrink-0 mr-4" />
                  <div>
                    <h4 className="font-semibold text-base text-yellow-400">The Constraint: Set the Rules</h4>
                    <p className="text-gray-400">These are boundaries or specific instructions that guide the output. 'End on a cliffhanger' is a direct rule that shapes the final result.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection as="div" className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Practice?</h2>
          <p className="max-w-2xl mx-auto text-base text-gray-400 mb-8">
            Put your new skills to the test in our interactive AI Playground. Experiment, iterate, and become a prompt engineering pro.
          </p>
          <Link to="/prompt-engineering-guide/examples" className="inline-block">
            <Button size="lg" className="group w-full sm:w-auto">
              Go to Playground
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </AnimatedSection>

        {/* Learning Resources Section */}
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Start Your Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 text-center flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Learn the Basics</h3>
              <p className="text-gray-400 mb-6 flex-grow">Grasp the fundamental concepts and start writing effective prompts from day one.</p>
              <Link to="/prompt-engineering-guide/basics" className="mt-auto">
                <Button variant="outline" className="w-full group text-purple-300 border-purple-500/30 hover:bg-purple-500/10">
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 text-center flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Explore Techniques</h3>
              <p className="text-gray-400 mb-6 flex-grow">Dive into advanced methods to tackle more complex tasks and refine your AI interactions.</p>
              <Link to="/prompt-engineering-guide/techniques" className="mt-auto">
                <Button variant="outline" className="w-full group text-purple-300 border-purple-500/30 hover:bg-purple-500/10">
                  Explore Techniques
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
};

export default PromptingGuide;
