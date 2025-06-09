import React from 'react';
import { Card } from '../../components/ui/Card';
import { MessageSquare, Copy, CheckCircle2, Circle, Sparkles, MessagesSquare, BrainCircuit, Code, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const PromptExamples: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const examples = [
    {
      title: "1. The Basic Formula",
      icon: <MessageSquare className="text-purple-400" size={24} />,
      description: "Start with this simple but effective pattern:",
      template: `You are [ROLE]
Goal: [SPECIFIC TASK]
Context: [RELEVANT INFORMATION]
Requirements: [SPECIFIC CONSTRAINTS OR PREFERENCES]`,
      example: `You are a professional email writer
Goal: Write a follow-up email to a client
Context: We had a meeting last week about their website redesign
Requirements: Keep it friendly but professional, under 100 words`,
    },
    {
      title: "2. Task Breakdown",
      icon: <BrainCircuit className="text-purple-400" size={24} />,
      description: "Break complex tasks into clear steps:",
      template: `1. First, [INITIAL STEP]
2. Then, [NEXT STEP]
3. Finally, [FINAL STEP]
Format the output as: [DESIRED FORMAT]`,
      example: `1. First, analyze the given text for key points
2. Then, summarize each main idea in one sentence
3. Finally, combine into a coherent paragraph
Format the output as: bullet points followed by summary`,
    },
    {
      title: "3. Format Specification",
      icon: <Code className="text-purple-400" size={24} />,
      description: "Be explicit about your desired output format:",
      template: `Generate [CONTENT TYPE] in this format:
[SECTION 1]: [DESCRIPTION]
[SECTION 2]: [DESCRIPTION]
Length: [SPECIFICATIONS]
Tone: [STYLE PREFERENCES]`,
      example: `Generate a product description in this format:
Headline: Attention-grabbing one-liner
Features: 3-4 bullet points
Benefits: 2-3 sentences
Length: Maximum 150 words
Tone: Professional but enthusiastic`,
    },
    {
      title: "4. Context Enhancement",
      icon: <MessagesSquare className="text-purple-400" size={24} />,
      description: "Add context for better results:",
      template: `Background: [SITUATION/CONTEXT]
Target Audience: [WHO IT'S FOR]
Current Challenge: [PROBLEM TO SOLVE]
Desired Outcome: [WHAT SUCCESS LOOKS LIKE]`,
      example: `Background: Small coffee shop in a college town
Target Audience: Students and young professionals
Current Challenge: Low morning customer traffic
Desired Outcome: Increase breakfast sales by 30%`,
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={32} className="text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Prompt Engineering Examples</h1>
          </div>
          <p className="text-xl text-gray-300">
            Learn the art of crafting effective prompts through simple, practical examples.
            Each template is designed to help you get better results from AI.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="max-w-4xl mx-auto space-y-8">
          {examples.map((example, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700/50 hover:border-purple-500/50 transition-all">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {example.icon}
                  <h2 className="text-2xl font-semibold text-white">{example.title}</h2>
                </div>
                <p className="text-gray-300 mb-6">{example.description}</p>

                {/* Template */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-purple-400 mb-3">Template</h3>
                  <div className="relative">
                    <pre className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 text-gray-300 font-mono text-sm whitespace-pre-wrap">
                      {example.template}
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-purple-400"
                      onClick={() => copyToClipboard(example.template)}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>

                {/* Example */}
                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-3">Example Usage</h3>
                  <div className="relative">
                    <pre className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 text-gray-300 font-mono text-sm whitespace-pre-wrap">
                      {example.example}
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-purple-400"
                      onClick={() => copyToClipboard(example.example)}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* Tips Section */}
          <Card className="bg-purple-900/20 border-purple-500/30">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-purple-400" size={20} />
                Pro Tips
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300">
                  <Circle size={6} className="text-purple-400 mt-2 flex-shrink-0" />
                  Start simple and add complexity only when needed
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <Circle size={6} className="text-purple-400 mt-2 flex-shrink-0" />
                  Be specific about your requirements and constraints
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <Circle size={6} className="text-purple-400 mt-2 flex-shrink-0" />
                  Include relevant context that might affect the output
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <Circle size={6} className="text-purple-400 mt-2 flex-shrink-0" />
                  Use clear, consistent formatting for complex requests
                </li>              </ul>
            </div>
          </Card>

          {/* Categories CTA */}
          <div className="text-center mt-12">
            <div className="inline-block">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <Link to="/categories">
                  <Button 
                    size="lg" 
                    className="relative bg-gray-900 text-white border border-purple-500/20 hover:border-purple-500/40 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 group"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-200 group-hover:from-purple-100 group-hover:to-indigo-100 transition-all">
                      Explore Industry-Specific Prompts
                    </span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-gray-400 text-sm">
                Discover prompts tailored to your industry needs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptExamples;
