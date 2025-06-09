import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Wrench, Settings, Rocket, Lightbulb, Target, Clock, GraduationCap, CheckCircle2, ArrowRight, Star, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Ensure React is in scope for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface PromptExampleProps {
  title: string;
  prompt: string;
}

const PromptExample: React.FC<PromptExampleProps> = ({ title, prompt }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className="bg-gray-900/50 rounded-lg border border-gray-800/50 overflow-hidden mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-800/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="text-purple-400 text-sm font-medium">{title}</h4>
        <button className="text-gray-400 hover:text-white">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 relative">
              <pre className="text-gray-300 text-sm whitespace-pre-wrap font-sans">{prompt}</pre>
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                title="Copy to clipboard"
              >
                <Copy size={16} className="text-gray-400" />
              </button>
              {copied && (
                <div className="absolute bottom-2 right-2 text-xs text-green-400">
                  Copied!
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PromptEngineeringGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basics' | 'examples' | 'tips'>('basics');
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const setTab = (tab: 'basics' | 'examples' | 'tips') => {
    setActiveTab(tab);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="max-w-4xl mx-auto mb-16 relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-purple-400 bg-purple-900/30 rounded-full border border-purple-800/50">
            Master AI Communication
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-200 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
            The Art of{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400">
              Prompting
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Unlock the full potential of AI by learning how to craft effective prompts. Get better results with less effort and make AI work for you.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button 
              variant={activeTab === 'basics' ? 'default' : 'outline'}
              onClick={() => setTab('basics')}
              className="transition-all duration-300"
            >
              <Lightbulb size={18} className="mr-2" />
              Basics
            </Button>
            <Button 
              variant={activeTab === 'examples' ? 'default' : 'outline'}
              onClick={() => setTab('examples')}
              className="transition-all duration-300"
            >
              <Rocket size={18} className="mr-2" />
              Examples
            </Button>
            <Button 
              variant={activeTab === 'tips' ? 'default' : 'outline'}
              onClick={() => setTab('tips')}
              className="transition-all duration-300"
            >
              <Star size={18} className="mr-2" />
              Pro Tips
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'basics' && (
            <motion.div
              key="basics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto relative z-10"
            >
              <div className="prose prose-invert max-w-none mb-16">
                <motion.div 
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-gray-700/50 mb-12 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-start mb-6">
                    <div className="p-2 bg-purple-500/20 rounded-lg mr-4">
                      <Settings className="text-purple-400" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">What is Prompting?</h2>
                      <p className="text-gray-300">
                        Think of prompt engineering as having a conversation with your AI assistant. This assistant:
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {[
                      {
                        icon: <Lightbulb size={20} className="text-purple-400" />,
                        title: "Clear Directions",
                        description: "Wants to help you, but needs clear instructions"
                      },
                      {
                        icon: <Settings size={20} className="text-purple-400" />,
                        title: "Literal Understanding",
                        description: "Takes your words exactly as you say them"
                      },
                      {
                        icon: <Target size={20} className="text-purple-400" />,
                        title: "Specificity Matters",
                        description: "Gets better results when you're detailed"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-800/30 p-5 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all hover:-translate-y-1"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                          {item.icon}
                        </div>
                        <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                      <Star className="text-purple-400" size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Quick Start Guide</h3>
                  </div>
                  <div className="grid md:grid-cols-1 gap-6">
                    {[
                      {
                        title: "Be Specific",
                        badExample: "Write me an email",
                        goodExample: "Write a friendly email to schedule a team meeting for next Tuesday at 2 PM. Include an agenda about the Q2 project updates and budget review.",
                        icon: <Target size={18} className="text-purple-400" />
                      },
                      {
                        title: "Provide Context",
                        badExample: "Help me fix this code",
                        goodExample: "I'm building a React contact form and getting an error when submitting. The error says 'Cannot read property of undefined'. Here's my component code...",
                        icon: <Settings size={18} className="text-purple-400" />
                      },
                      {
                        title: "Specify Requirements",
                        badExample: "Give me ideas for my presentation",
                        goodExample: "Generate 3 creative ideas for a 5-minute presentation about healthy eating for teenagers. Include one idea about meal prepping, one about quick breakfasts, and one about healthy snacks. For each, suggest 3 key points to cover.",
                        icon: <Lightbulb size={18} className="text-purple-400" />
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden hover:border-purple-500/30 transition-all"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center mr-3">
                              {item.icon}
                            </div>
                            <h4 className="font-semibold text-white">{item.title}</h4>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-400 mb-1">Instead of:</p>
                              <div className="bg-gray-900/50 p-3 rounded-lg border-l-2 border-red-500/50">
                                <p className="text-gray-300">"{item.badExample}"</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm text-gray-400 mb-1">Try this:</p>
                              <div className="bg-gray-900/50 p-3 rounded-lg border-l-2 border-green-500/50 relative">
                                <p className="text-gray-100">"{item.goodExample}"</p>
                                <button 
                                  onClick={() => {
                                    navigator.clipboard.writeText(item.goodExample);
                                    const button = document.getElementById(`copy-${index}`);
                                    if (button) {
                                      button.textContent = 'Copied!';
                                      setTimeout(() => {
                                        button.textContent = 'Copy';
                                      }, 2000);
                                    }
                                  }}
                                  id={`copy-${index}`}
                                  className="absolute top-2 right-2 text-xs bg-gray-800/70 hover:bg-gray-700/70 px-2 py-1 rounded text-gray-300 hover:text-white transition-colors"
                                >
                                  Copy
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <p className="text-purple-200 flex items-start">
                      <Lightbulb className="flex-shrink-0 mt-1 mr-2" size={20} />
                      <span><strong>Remember:</strong> You don't need to be perfect! Start simple and get better as you go. The more you practice, the better results you'll get.</span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'examples' && (
            <motion.div
              key="examples"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto relative z-10"
            >
              <div className="prose prose-invert max-w-none mb-16">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <Rocket className="text-purple-400 mr-2" size={24} />
                  Example Prompts
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">For Learning</h3>
                    <div className="space-y-4">
                      <PromptExample 
                        title="Explain a complex topic simply"
                        prompt="Explain how quantum computing works using a simple analogy that a high school student could understand. Focus on the key concepts like qubits and superposition."
                      />
                      <PromptExample
                        title="Create a study guide"
                        prompt="Create a study guide for learning Spanish verbs in the present tense. Include the 10 most common regular -ar, -er, and -ir verbs, with example sentences for each."
                      />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">For Work</h3>
                      <div className="space-y-4">
                        <PromptExample
                          title="Draft a professional email"
                          prompt="Write a professional follow-up email after a job interview. Express gratitude, reiterate interest in the position, and mention a specific topic discussed during the interview."
                        />
                        <PromptExample
                          title="Create a project plan"
                          prompt="Outline a 4-week project plan for launching a new company blog. Include key milestones, team roles, and deliverables for each week."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'tips' && (
              <motion.div
                key="tips"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto relative z-10"
              >
                <div className="prose prose-invert max-w-none mb-16">
                  <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <Star className="text-yellow-400 mr-2" size={24} />
                    Pro Tips for Better Prompts
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                      <h3 className="text-xl font-semibold text-white mb-4">Do's</h3>
                      <ul className="space-y-3">
                        {[
                          'Be specific about what you want',
                          'Provide relevant context',
                          'Specify the format you need',
                          'Break complex tasks into steps',
                          'Give examples when possible'
                        ].map((tip, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 size={18} className="text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-300">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                      <h3 className="text-xl font-semibold text-white mb-4">Don'ts</h3>
                      <ul className="space-y-3">
                        {[
                          'Don\'t be too vague or broad',
                          'Avoid ambiguous language',
                          'Don\'t assume AI knows everything',
                          'Avoid multiple questions in one prompt',
                          'Don\'t forget to proofread the output'
                        ].map((tip, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 text-red-400 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-300">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* Structure & Components Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <Settings size={24} className="text-purple-400 mr-3" /> Recipe for Great Prompts
            </h2>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-4">The Magic Formula ✨</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center">
                        <Star size={16} className="text-purple-400 mr-2 flex-shrink-0" /> Tell AI its role (like "teacher" or "writer")
                      </li>
                      <li className="flex items-center">
                        <Star size={16} className="text-purple-400 mr-2 flex-shrink-0" /> Explain what you want to achieve
                      </li>
                      <li className="flex items-center">
                        <Star size={16} className="text-purple-400 mr-2 flex-shrink-0" /> Describe how you want the answer
                      </li>
                      <li className="flex items-center">
                        <Star size={16} className="text-purple-400 mr-2 flex-shrink-0" /> Add any special requirements
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50">                    <div className="flex items-center mb-2">
                      <Star size={16} className="text-purple-400 mr-2" />
                      <p className="text-sm text-purple-400">Try This Example:</p>
                    </div>
                    <pre className="text-gray-400 whitespace-pre-wrap text-sm">
{`Hi AI! 
You're a friendly math teacher
Can you explain fractions to a 10-year old?
Please use fun examples with pizza and cookies
Keep it short - just 3-4 sentences
Make it fun and encouraging!`}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Purpose & Audience Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <Wrench size={24} className="text-purple-400 mr-3" /> AI Chat vs. Human Chat
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                <div className="p-6">                  <div className="flex items-center mb-4">
                    <Settings size={20} className="text-purple-400 mr-2" />
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">Chatting with AI</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-purple-400 mr-2 flex-shrink-0" /> Be clear and specific
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-purple-400 mr-2 flex-shrink-0" /> Give step-by-step instructions
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800/50">
                    <p className="text-sm text-purple-400 mb-2">Example:</p>
                    <p className="text-gray-400">
                      "Write a recipe for chocolate chip cookies. List all ingredients first, then give step-by-step instructions. Make it easy for beginners."
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                <div className="p-6">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-4">Chatting with People</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-purple-400 mr-2 flex-shrink-0" /> Can be casual and brief
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={16} className="text-purple-400 mr-2 flex-shrink-0" /> They can ask questions back
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800/50">
                    <p className="text-sm text-purple-400 mb-2">Example:</p>
                    <p className="text-gray-400">
                      "Hey, got a cookie recipe?"
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <Rocket size={24} className="text-purple-400 mr-3" /> Amazing Things You Can Do
            </h2>
            
            {/* Introduction text */}
            <div className="mb-8 text-center">
              <p className="text-lg text-gray-300">
                Discover how AI can help you with everyday tasks. Here are some popular ways to use it:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <GraduationCap size={20} className="text-purple-400" />
                    </div>                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">Learning Made Easy</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Get help understanding any topic, in ways that make sense to you.</p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center group">
                      <Star size={16} className="text-purple-400 mr-2 group-hover:text-purple-300 transition-colors" /> 
                      <span>Break down complex topics</span>
                    </li>
                    <li className="flex items-center group">
                      <Star size={16} className="text-purple-400 mr-2 group-hover:text-purple-300 transition-colors" /> 
                      <span>Get personalized explanations</span>
                    </li>
                    <li className="flex items-center group">
                      <Star size={16} className="text-purple-400 mr-2 group-hover:text-purple-300 transition-colors" /> 
                      <span>Practice with examples</span>
                    </li>
                    <li className="flex items-center group">
                      <Star size={16} className="text-purple-400 mr-2 group-hover:text-purple-300 transition-colors" /> 
                      <span>Create study materials</span>
                    </li>
                  </ul>

                  <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                    <p className="text-sm text-purple-400 mb-2">Try asking:</p>
                    <p className="text-gray-400 text-sm">"Explain how photosynthesis works using a pizza-making analogy"</p>
                  </div>
                </div>
              </Card>              <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Settings size={20} className="text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent ml-2">Work Smarter</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Save time and effort on your daily tasks and projects.</p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center group">
                      <Star size={16} className="text-purple-400 mr-2 group-hover:text-purple-300 transition-colors" /> 
                      <span>Write better emails quickly</span>
                    </li>
                    <li className="flex items-center group">
                      <Star size={16} className="text-purple-400 mr-2 group-hover:text-purple-300 transition-colors" /> 
                      <span>Get project planning help</span>
                    </li>
                    <li className="flex items-center group">
                      <Star size={16} className="text-purple-400 mr-2 group-hover:text-purple-300 transition-colors" /> 
                      <span>Create clear presentations</span>
                    </li>
                    <li className="flex items-center group">
                      <Star size={16} className="text-purple-400 mr-2 group-hover:text-purple-300 transition-colors" /> 
                      <span>Organize your thoughts</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                    <p className="text-sm text-purple-400 mb-2">Try asking:</p>
                    <p className="text-gray-400 text-sm">"Help me write a polite email to reschedule a meeting"</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Lightbulb size={20} className="text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent ml-2">Creative Ideas</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Get fresh ideas and creative solutions for any project.</p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center group">
                      <Star size={16} className="text-purple-400 mr-2 group-hover:text-purple-300 transition-colors" /> 
                      <span>Brainstorm new ideas</span>
                    </li>
                    <li className="flex items-center group">
                      <Star size={16} className="text-purple-400 mr-2 group-hover:text-purple-300 transition-colors" /> 
                      <span>Get writing feedback</span>
                    </li>
                    <li className="flex items-center group">
                      <Star size={16} className="text-purple-400 mr-2 group-hover:text-purple-300 transition-colors" /> 
                      <span>Design project layouts</span>
                    </li>
                    <li className="flex items-center group">
                      <Star size={16} className="text-purple-400 mr-2 group-hover:text-purple-300 transition-colors" /> 
                      <span>Solve problems creatively</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                    <p className="text-sm text-purple-400 mb-2">Try asking:</p>
                    <p className="text-gray-400 text-sm">"Give me 5 creative ways to organize a small home office"</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Example Prompts Box */}
            <div className="mt-8 p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-4 flex items-center">
                <Star size={20} className="text-purple-400 mr-2" /> Try These Example Prompts
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 rounded border border-gray-800/50">
                    <p className="text-purple-400 text-sm mb-2">For Learning:</p>
                    <p className="text-gray-300">"Explain how photosynthesis works using a pizza-making analogy that a 12-year-old would understand"</p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded border border-gray-800/50">
                    <p className="text-purple-400 text-sm mb-2">For Work:</p>
                    <p className="text-gray-300">"Help me write a polite email to reschedule a meeting that was set for tomorrow at 2 PM to next week"</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 rounded border border-gray-800/50">
                    <p className="text-purple-400 text-sm mb-2">For Projects:</p>
                    <p className="text-gray-300">"Create a step-by-step checklist for organizing a small birthday party, including budget considerations"</p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded border border-gray-800/50">
                    <p className="text-purple-400 text-sm mb-2">For Creativity:</p>
                    <p className="text-gray-300">"Give me 3 unique ideas for designing a bookmark that represents my favorite book genre"</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Journey Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <GraduationCap size={24} className="text-purple-400 mr-3" /> Your Learning Journey
            </h2>
            <div className="space-y-6">
              <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>                      <div className="flex items-center mb-4">
                        <div className="w-6 h-6 flex items-center justify-center mr-2">
                          <Target size={20} className="text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">Better Results</h3>
                      </div>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center">
                          <CheckCircle2 size={16} className="text-purple-400 mr-2 flex-shrink-0" /> Get great answers first time
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 size={16} className="text-purple-400 mr-2 flex-shrink-0" /> Less back-and-forth
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 size={16} className="text-purple-400 mr-2 flex-shrink-0" /> More fun, less confusion
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 size={16} className="text-purple-400 mr-2 flex-shrink-0" /> AI becomes your helper
                        </li>
                      </ul>
                    </div>
                    <div>                      <div className="flex items-center mb-4">
                        <div className="w-6 h-6 flex items-center justify-center mr-2">
                          <Clock size={20} className="text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">Save Time</h3>
                      </div>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center">
                          <CheckCircle2 size={16} className="text-purple-400 mr-2 flex-shrink-0" /> Work faster
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 size={16} className="text-purple-400 mr-2 flex-shrink-0" /> Focus on what you love
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 size={16} className="text-purple-400 mr-2 flex-shrink-0" /> Let AI do the boring stuff
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 size={16} className="text-purple-400 mr-2 flex-shrink-0" /> More time for creativity
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Tips Box with theme-consistent styling */}
              <Card className="bg-purple-500/5 backdrop-blur-sm border border-purple-500/20">
                <div className="p-6">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-4 flex items-center">
                    <Lightbulb size={20} className="text-purple-400 mr-2" /> Remember These Tips
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start text-gray-300">
                      <Star size={16} className="text-purple-400 mr-2 mt-1" />
                      <span>Start simple - you'll get better with practice</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <Star size={16} className="text-purple-400 mr-2 mt-1" />
                      <span>Be clear about what you want</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <Star size={16} className="text-purple-400 mr-2 mt-1" />
                      <span>Try different ways if needed</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <Star size={16} className="text-purple-400 mr-2 mt-1" />
                      <span>Have fun exploring!</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </section>

          {/* Deep Dive CTA */}
          <div className="text-center mt-12">
            <div className="inline-block">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <Link to="/prompt-engineering-guide/examples">
                  <Button 
                    size="lg" 
                    className="relative bg-gray-900 text-white border border-purple-500/20 hover:border-purple-500/40 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 group"
                  >                    <div className="flex items-center">
                      <Star size={18} className="text-purple-400 mr-2" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-200 group-hover:from-purple-100 group-hover:to-indigo-100 transition-all">
                        Try Real Examples
                      </span>
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </div>
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-gray-400 text-sm">
                Learn from simple examples you can try right now!
              </p>
            </div>
          </div>

          {/* Next Lesson Navigation */}
          <div className="mt-16 border-t border-gray-800 pt-8">
            <Link to="/prompt-engineering-guide/basics" 
              className="flex items-center justify-between p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all rounded-lg group"
            >              <div className="flex items-center">
                <div className="h-8 w-8 flex items-center justify-center mr-4">
                  <GraduationCap size={24} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-purple-400">Next Step</p>
                  <h3 className="text-xl font-semibold text-white mt-1 group-hover:text-purple-200 transition-colors">
                    Start Your Journey
                  </h3>
                  <p className="text-gray-400 mt-1">
                    Learn the basics with simple, practical examples
                  </p>
                </div>
              </div>
              <ArrowRight size={24} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Quick Tips Box */}
          <div className="mt-8 p-6 bg-purple-500/5 rounded-lg border border-purple-500/20">
            <h3 className="text-lg font-semibold text-purple-200 mb-4 flex items-center">
              <Lightbulb size={20} className="text-purple-400 mr-2" />
              Quick Tips to Remember
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-300">
                <CheckCircle2 size={16} className="text-green-400 mr-2 mt-1" />
                <span>Start simple - you can always add more details later</span>
              </li>
              <li className="flex items-start text-gray-300">
                <CheckCircle2 size={16} className="text-green-400 mr-2 mt-1" />
                <span>Be specific about what you want - think who, what, why, how</span>
              </li>
              <li className="flex items-start text-gray-300">
                <CheckCircle2 size={16} className="text-green-400 mr-2 mt-1" />
                <span>If you don't get what you want, try asking differently</span>
              </li>
              <li className="flex items-start text-gray-300">
                <CheckCircle2 size={16} className="text-green-400 mr-2 mt-1" />
                <span>Have fun exploring - there's no "wrong" way to learn!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 pointer-events-none" />
    </div>
  );
};

export default PromptEngineeringGuide;
