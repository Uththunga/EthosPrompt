import React from 'react';
import { Card } from './ui/Card';

const ExplanationSection: React.FC = () => {
  const explanations = [
    {
      title: "What is AI Prompting?",
      icon: "💬",
      description: "Think of prompting as having a conversation with AI. The better you ask, the better answers you get. We provide you with pre-written, tested instructions that work every time.",
      points: [
        "Simple instructions that work",
        "Ready to use templates",
        "No AI expertise needed"
      ]
    },    {
      title: "Why Use Our Prompts?",
      icon: "✨",
      description: "Without engineered prompts, you'll face vague responses, repeated attempts, and inconsistent results. Our prompts eliminate these frustrations, giving you clear, accurate answers every time.",
      points: [
        "No more unclear or off-topic responses",
        "Skip hours of rewriting and retrying",
        "Avoid common AI conversation mistakes"
      ]
    },
    {
      title: "How It Works",
      icon: "🎯",
      description: "Just choose a prompt, fill in your specific details, and get high-quality results. It's that simple. Works with ChatGPT, Claude, and other AI tools.",
      points: [
        "Choose from our collection",
        "Customize for your needs",
        "Get instant results"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Enhanced AI Interaction
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Make AI work better for you with engineered prompts
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {explanations.map((item) => (
            <Card 
              key={item.title} 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500/50 transition-all"
            >
              <div className="p-6">
                <div className="text-4xl mb-6 text-center">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-white text-center">
                  {item.title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {item.description}
                </p>
                  <div className="space-y-4">
                  <ul className="space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-center text-gray-400">
                        <span className="text-purple-400 mr-2">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExplanationSection;
