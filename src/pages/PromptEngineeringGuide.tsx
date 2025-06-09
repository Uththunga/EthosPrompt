import React, { useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Wrench, Settings, Rocket, Lightbulb, Target, Clock, GraduationCap, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const PromptEngineeringGuide: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            The Art of{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Prompting
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            Want to get better results from AI? Learn how to talk to AI in a way it understands best - it's easier than you think!
          </p>
        </div>

        {/* Step-by-Step Value & Concept Section */}
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="prose prose-invert max-w-none mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-purple-300 mb-4 flex items-center">
              <Settings className="text-purple-400 mr-2 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              What is Prompting?
            </h2>
            <div className="bg-gray-800/30 p-4 sm:p-6 rounded-lg border border-gray-700/50 mb-6 sm:mb-8">
              <p className="text-base sm:text-lg text-gray-300 mb-3 sm:mb-4 leading-relaxed">
                Think of prompt engineering as having a conversation with your AI assistant. This assistant:
              </p>
              <ul className="list-none pl-0 text-base sm:text-lg text-gray-300 space-y-3 sm:space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 size={18} className="text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Wants to help you, but needs clear directions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={18} className="text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Takes your words exactly as you say them</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={18} className="text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Gets better results when you're specific</span>
                </li>
              </ul>
            </div>
            
            <h3 className="text-lg sm:text-xl font-bold text-purple-200 mb-3 sm:mb-4 flex items-center">
              <Star className="text-purple-400 mr-2 w-5 h-5 flex-shrink-0" />
              Quick Start Guide
            </h3>
            <ol className="list-decimal pl-5 sm:pl-6 text-base sm:text-lg text-gray-300 space-y-4 sm:space-y-5">
              <li className="pl-2">
                <strong className="text-white">Be specific</strong>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base">Instead of saying: "Write me an email"</p>
                <p className="mt-1 text-green-400 text-sm sm:text-base">Say: "Write me a friendly email to schedule a team meeting for next Tuesday at 2 PM"</p>
              </li>
              <li className="pl-2">
                <strong className="text-white">Give context</strong>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base">Instead of saying: "Help me fix this code"</p>
                <p className="mt-1 text-green-400 text-sm sm:text-base">Say: "I'm building a website contact form and getting an error. Here's my code..."</p>
              </li>
              <li className="pl-2">
                <strong className="text-white">Specify what you want</strong>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base">Instead of saying: "Give me ideas for my presentation"</p>
                <p className="mt-1 text-green-400 text-sm sm:text-base">Say: "Give me 3 creative ideas for a 5-minute presentation about healthy eating for teenagers"</p>
              </li>
            </ol>
            <div className="mt-6 p-3 sm:p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <p className="text-sm sm:text-base text-purple-200 flex items-start">
                <Lightbulb className="inline-block mr-2 mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <span><strong>Remember:</strong> You don't need to be perfect! Start simple and get better as you go. The more you practice, the better results you'll get.</span>
              </p>
            </div>
          </div>

          {/* Structure & Components Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-6 sm:mb-8 flex items-center">
              <Settings size={20} className="text-purple-400 mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              Recipe for Great Prompts
            </h2>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
              <div className="p-4 sm:p-6">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-3 sm:mb-4">The Magic Formula ✨</h3>
                    <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
                      <li className="flex items-start">
                        <Star size={14} className="text-purple-400 mr-2 mt-1 flex-shrink-0" />
                        <span>Tell AI its role (like "teacher" or "writer")</span>
                      </li>
                      <li className="flex items-start">
                        <Star size={14} className="text-purple-400 mr-2 mt-1 flex-shrink-0" />
                        <span>Explain what you want to achieve</span>
                      </li>
                      <li className="flex items-start">
                        <Star size={14} className="text-purple-400 mr-2 mt-1 flex-shrink-0" />
                        <span>Describe how you want the answer</span>
                      </li>
                      <li className="flex items-start">
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
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/40 via-indigo-400/30 to-purple-400/40 rounded-3xl blur-md opacity-60 group-hover:opacity-80 transition-all duration-300 group-hover:duration-200 transform group-hover:scale-105"></div>
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
