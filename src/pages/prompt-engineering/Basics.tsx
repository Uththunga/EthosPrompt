import React, { useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { BookOpen, MessageCircle, Brain, Circle, ArrowRight, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Section from '../../components/prompt/Section';
import ModelCard from '../../components/prompt/ModelCard';

const PromptEngineeringBasics: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">            The Story of{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Prompting
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300">
            How AI Learns to Talk Like a Human – An Interactive Journey
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto relative z-10">          {/* Terminology Section */}
          <Section title='From "AI" to "LLM"' icon={<MessageCircle size={24} className="text-purple-400" />}>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
              <div className="p-4 sm:p-6">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                  You might know these as "AI" tools, but we'll call them "LLMs" (Large Language Models). Why? Because that's exactly what they are - large models that understand and generate human language. Understanding LLMs is crucial because prompt engineering is all about effectively communicating with these models - the better you understand how they work, the more effectively you can craft your prompts.
                </p>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                  <p className="text-purple-200">
                    💡 Think of it this way: "AI" is like saying "vehicle", while "LLM" is specifically saying "car" - it's more precise about what we're actually using! And just like knowing how a car works helps you drive better, understanding LLMs will help you write better prompts.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/30 p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3">"AI" (The Big Family)</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                        <div>Image recognition</div>
                      </li>
                      <li className="flex items-start">
                        <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                        <div>Speech processing</div>
                      </li>
                      <li className="flex items-start">
                        <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                        <div>And many more...</div>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/30 p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3">"LLM" (Our Text Expert)</h3>
                    <p className="text-gray-300 mb-4">These are the specific AI models we'll be working with in prompt engineering:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                        <div>ChatGPT</div>
                      </li>
                      <li className="flex items-start">
                        <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                        <div>Claude</div>
                      </li>
                      <li className="flex items-start">
                        <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                        <div>Gemini</div>
                      </li>
                    </ul>
                    <div className="mt-4 bg-purple-500/10 p-3 rounded border border-purple-500/20">
                      <p className="text-purple-200 text-sm">
                        👉 Throughout this guide, you'll learn how to effectively communicate with these LLMs through well-crafted prompts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Section>

          {/* Chapter 1: The Birth of AI Brain */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <BookOpen size={24} className="text-purple-400 mr-3" /> What Is an LLM Really?
            </h2>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">              <div className="p-4 sm:p-6">
                <div className="prose prose-invert max-w-none">                  <div className="mb-6">
                    <div className="bg-gray-900/30 p-6 rounded-lg border border-purple-500/20">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="text-center group">
                          <div className="bg-purple-500/10 rounded-lg p-3 sm:p-4 border border-purple-500/20 transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/20">                            <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2 block">L</span>
                            <h4 className="text-white font-semibold mb-2">Large</h4>
                            <p className="text-base sm:text-lg text-gray-400">Vast knowledge bank - like having read millions of books!</p>
                          </div>
                        </div>
                        <div className="text-center group">
                          <div className="bg-purple-500/10 rounded-lg p-3 sm:p-4 border border-purple-500/20 transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/20">
                            <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2 block">L</span>
                            <h4 className="text-white font-semibold mb-2">Language</h4>
                            <p className="text-base sm:text-lg text-gray-400">Speaks and understands human languages!</p>
                          </div>
                        </div>
                        <div className="text-center group">
                          <div className="bg-purple-500/10 rounded-lg p-3 sm:p-4 border border-purple-500/20 transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/20">
                            <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2 block">M</span>
                            <h4 className="text-white font-semibold mb-2">Model</h4>
                            <p className="text-base sm:text-lg text-gray-400">The intelligent part that processes patterns and thinks!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                    Think of a Large Language Model (LLM) like a super-smart student who has read every book in the world's biggest library. Just like how a student learns by reading books, an LLM learns by processing vast amounts of text from the internet.
                  </p>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                    <p className="text-purple-200">
                      🎓 Real-Life Example: Imagine teaching someone a new language by having them read millions of books in that language. That's similar to how GPT-4, Claude, or Gemini learn language patterns!
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Like a Student Who:</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Has an incredible memory bank
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Can spot patterns in language
                        </li>
                        <li className="flex items-center">
                          <Circle size={6} className="text-purple-400 mr-2 flex-shrink-0" /> Makes educated guesses based on what they've read
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-3">But Remember:</h3>
                      <p className="text-gray-300">
                        It's like having a very knowledgeable parrot - it can respond intelligently based on patterns, but doesn't truly understand concepts like humans do. It's pattern recognition, not true comprehension.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>          {/* Chapter 2: Pre-Training */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <Brain size={24} className="text-purple-400 mr-3" /> What Is Pre-Training?
            </h2>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">              
              <div className="p-4 sm:p-6">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                  This is where the "L" (Large) in LLM comes to life! Pre-training is the foundational phase where an AI model acquires its vast knowledge by processing enormous amounts of text data - like a student speed-reading through millions of books, articles, and documents simultaneously.
                </p>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                  <p className="text-purple-200">
                    💡 The "L" in LLM represents the model's vast knowledge bank. Pre-training builds this knowledge base by exposing the model to trillions of words across diverse topics - creating an AI that knows a little about almost everything!
                  </p>
                </div>
                <div className="bg-gray-900/30 p-4 rounded-lg mb-6">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">The Knowledge Foundation:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-300 mb-2">Before Pre-training (Raw Neural Network):</p>
                      <ul className="space-y-2 text-gray-300">
                        <li>• No knowledge base</li>
                        <li>• Can't recognize patterns</li>
                        <li>• No understanding of language</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-300 mb-2">After Pre-training (Knowledge Giant):</p>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Vast knowledge across topics</li>
                        <li>• Recognizes language patterns</li>
                        <li>• Basic understanding of concepts</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Two Types of Knowledge Building:</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-purple-200 mb-2">1. Pattern Recognition</h4>
                        <div className="bg-gray-900/30 p-4 rounded-lg">
                          <p className="text-gray-300 mb-2">Like learning to read and understand:</p>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Understanding grammar and syntax</div>
                            </li>
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Recognizing word relationships</div>
                            </li>
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Learning basic language rules</div>
                            </li>
                          </ul>
                          <div className="mt-4 bg-purple-500/10 p-3 rounded border border-purple-500/20">
                            <p className="text-purple-200 text-sm">
                              💡 Pattern recognition is like teaching the model to understand the building blocks of language, just like how we learn to read and write.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-purple-200 mb-2">2. Knowledge Absorption</h4>
                        <div className="bg-gray-900/30 p-4 rounded-lg">
                          <p className="text-gray-300 mb-2">Like building a vast knowledge base:</p>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Learning facts and information</div>
                            </li>
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Understanding different topics</div>
                            </li>
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Building contextual awareness</div>
                            </li>
                          </ul>
                          <div className="mt-4 bg-purple-500/10 p-3 rounded border border-purple-500/20">
                            <p className="text-purple-200 text-sm">
                              💡 Knowledge absorption is like reading millions of books simultaneously, building a massive foundation of information across countless topics.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3">🧠 The Learning Journey:</h3>
                    <p className="text-gray-300 mb-3">
                      Think of a student's journey through all of human knowledge:
                    </p>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                        <div><strong>Raw Processing Power</strong> - Starts with a powerful but empty brain, ready to learn and absorb information at incredible speeds.</div>
                      </li>
                      <li className="flex items-start">
                        <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                        <div><strong>Knowledge Acquisition</strong> - Through pre-training, processes trillions of words from books, articles, websites, and documents, building a vast knowledge foundation.</div>
                      </li>
                    </ul>
                    <div className="mt-4 bg-purple-500/10 p-3 rounded border border-purple-500/20">
                      <p className="text-purple-200">
                        💡 Real-World Scale: GPT-4's pre-training involved processing over 1 trillion words - equivalent to reading millions of books in every field of human knowledge!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Chapter 3: Fine-Tuning */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <MessageCircle size={24} className="text-purple-400 mr-3" /> What Is Fine-Tuning?
            </h2>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">              <div className="p-4 sm:p-6">                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                  This is where the "M" (Model) in LLM truly comes to life! While pre-training provides vast knowledge, fine-tuning transforms this raw knowledge into sophisticated thinking and decision-making abilities - it's like transforming a medical student who has memorized textbooks into a skilled doctor who can diagnose and treat patients effectively.
                </p>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                  <p className="text-purple-200">
                    💡 The "M" in LLM represents the model's ability to process information intelligently. Fine-tuning shapes HOW the model thinks - teaching it to reason, make connections, and apply its knowledge in meaningful ways.
                  </p>
                </div>
                <div className="bg-gray-900/30 p-4 rounded-lg mb-6">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">The Model's Evolution:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-300 mb-2">Before Fine-tuning (Raw Knowledge):</p>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Has encyclopedic knowledge (Like a medical student)</li>
                        <li>• Recognizes patterns but doesn't understand context</li>
                        <li>• Can recall facts but struggles with application</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-300 mb-2">After Fine-tuning (Intelligent Processing):</p>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Reasons through problems (Like a doctor)</li>
                        <li>• Understands context and nuance</li>
                        <li>• Makes intelligent connections between concepts</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Two Types of Intelligence Training:</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-purple-200 mb-2">1. Pattern Recognition (SFT)</h4>
                        <div className="bg-gray-900/30 p-4 rounded-lg">
                          <p className="text-gray-300 mb-2">Like teaching critical thinking:</p>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Learning to identify relevant information</div>
                            </li>
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Making connections between concepts</div>
                            </li>
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Developing problem-solving strategies</div>
                            </li>
                          </ul>
                          <div className="mt-4 bg-purple-500/10 p-3 rounded border border-purple-500/20">
                            <p className="text-purple-200 text-sm">
                              💡 SFT (Supervised Fine-Tuning) develops the model's ability to think systematically and make reasoned decisions, just like training your brain to solve complex problems.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-purple-200 mb-2">2. Intelligent Decision Making (RLHF)</h4>
                        <div className="bg-gray-900/30 p-4 rounded-lg">
                          <p className="text-gray-300 mb-2">Like developing wisdom and judgment:</p>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Learning from feedback and experience</div>
                            </li>
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Adapting responses to different contexts</div>
                            </li>
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Building intuition about what works best</div>
                            </li>
                          </ul>
                          <div className="mt-4 bg-purple-500/10 p-3 rounded border border-purple-500/20">
                            <p className="text-purple-200 text-sm">
                              💡 RLHF (Reinforcement Learning from Human Feedback) refines the model's judgment - like developing wisdom through experience and mentorship.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50">                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3">🧠 From Knowledge to Intelligence:</h3>
                    <p className="text-gray-300 mb-3">
                      Think of an aspiring chef's journey:
                    </p>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                        <div><strong>L (Large Knowledge)</strong> - Through pre-training, they acquire vast culinary knowledge: every recipe, technique, and ingredient combination possible - like having a complete library of cooking wisdom in their mind.</div>
                      </li>
                      <li className="flex items-start">
                        <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                        <div><strong>M (Model's Intelligence)</strong> - Through fine-tuning at a high-end restaurant, they develop the intelligence to use that knowledge: adapting recipes on the fly, handling special requests, and making creative decisions about flavor combinations.</div>
                      </li>
                    </ul>
                    <p className="mt-3 text-purple-200">
                      💡 Just like ChatGPT transforms from a vast knowledge bank into an intelligent assistant that can think, reason, and adapt its knowledge to help users effectively.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>          {/* Chapter 4: Prompting */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <Target size={24} className="text-purple-400 mr-3" /> What Is Prompting
            </h2>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
              <div className="p-6">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                  This is where the second "L" (Language) in LLM comes to life! Prompting is like having a conversation with a highly knowledgeable assistant - you communicate your needs in plain language, and the AI understands and responds accordingly.
                </p>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                  <p className="text-purple-200">
                    💡 The second "L" in LLM is your control interface - instead of writing code, you simply tell the AI what you want in natural language, just like talking to a human assistant!
                  </p>
                </div>
                <div className="bg-gray-900/30 p-4 rounded-lg mb-6">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">From Instructions to Results:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-300 mb-2">Traditional Programming:</p>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Write code in specific languages</li>
                        <li>• Follow strict syntax rules</li>
                        <li>• Debug technical errors</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-300 mb-2">Prompting (Natural Programming):</p>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Write in plain language</li>
                        <li>• Natural conversation flow</li>
                        <li>• Clarify through dialogue</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Two Types of Prompt Elements:</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-purple-200 mb-2">1. Context Setting</h4>
                        <div className="bg-gray-900/30 p-4 rounded-lg">
                          <p className="text-gray-300 mb-2">Like setting up a conversation:</p>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Background information</div>
                            </li>
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Goals and requirements</div>
                            </li>
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Important constraints</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-purple-200 mb-2">2. Instructions</h4>
                        <div className="bg-gray-900/30 p-4 rounded-lg">
                          <p className="text-gray-300 mb-2">Like giving specific directions:</p>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Clear action items</div>
                            </li>
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Expected format</div>
                            </li>
                            <li className="flex items-start">
                              <Circle size={6} className="text-purple-400 mr-2 mt-2 flex-shrink-0" />
                              <div>Step-by-step tasks</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3">🌟 Real-World Example:</h3>
                    <p className="text-gray-300 mb-4">
                      Like asking a chef to prepare a special dish:
                    </p>
                    <div className="space-y-4">
                      <div className="bg-gray-900/30 p-3 rounded">
                        <p className="text-purple-200 mb-2"><strong>Context:</strong></p>
                        <p className="text-gray-300 text-sm">"We have a vegetarian guest with a nut allergy who loves Italian food..."</p>
                      </div>
                      <div className="bg-gray-900/30 p-3 rounded">
                        <p className="text-purple-200 mb-2"><strong>Instructions:</strong></p>
                        <p className="text-gray-300 text-sm">"Please prepare a pasta dish using seasonal vegetables, avoiding all nuts, and present it with traditional Italian plating."</p>
                      </div>
                      <div className="mt-4 bg-purple-500/10 p-3 rounded border border-purple-500/20">
                        <p className="text-purple-200 text-sm">
                          💡 Just like the chef uses their expertise to create the perfect dish based on your requirements, the LLM uses its knowledge to generate the perfect response based on your prompt.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Comparison Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-8 flex items-center">
              <Target size={24} className="text-purple-400 mr-3" /> Understanding the Differences
            </h2>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
              <div className="p-6">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                  Let's understand the difference between pre-training, fine-tuning, and prompting using a real-world example of becoming a professional chef:
                </p>

                <div className="grid gap-6">
                  <div className="bg-gray-900/30 p-6 rounded-lg border border-purple-500/20">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Next Steps</h2>
                    <div className="space-y-6">
                      {/* Pre-training */}
                      <div className="bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="text-base sm:text-lg font-semibold text-purple-200 mb-2">1. Pre-training Stage (Building Knowledge)</h4>
                        <p className="text-gray-300 mb-2">Like a new AI reading millions of cookbooks:</p>
                        <ul className="space-y-2 text-gray-300 ml-4">
                          <li>• Learns every possible recipe and technique</li>
                          <li>• Understands basic cooking principles</li>
                          <li>• Memorizes ingredient combinations</li>
                          <li>• One-time foundational learning</li>
                        </ul>
                        <p className="mt-2 text-purple-200 text-sm">🔍 Example: Learning what ingredients go together in theory</p>
                      </div>

                      {/* Fine-tuning */}
                      <div className="bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="text-base sm:text-lg font-semibold text-purple-200 mb-2">2. Fine-tuning Stage (Developing Intelligence)</h4>
                        <p className="text-gray-300 mb-2">Like an AI practicing in a virtual restaurant:</p>
                        <ul className="space-y-2 text-gray-300 ml-4">
                          <li>• Learning to adapt recipes based on feedback</li>
                          <li>• Understanding flavor balance in practice</li>
                          <li>• Developing cooking intuition</li>
                          <li>• Permanent behavioral changes</li>
                        </ul>
                        <p className="mt-2 text-purple-200 text-sm">🔍 Example: Learning how to adjust recipes based on customer preferences</p>
                      </div>

                      {/* Prompting */}
                      <div className="bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="text-base sm:text-lg font-semibold text-purple-200 mb-2">3. Prompting Stage (Real-world Application)</h4>
                        <p className="text-gray-300 mb-2">Like giving specific instructions to the AI chef:</p>
                        <ul className="space-y-2 text-gray-300 ml-4">
                          <li>• Following specific customer requests</li>
                          <li>• Adjusting to dietary restrictions</li>
                          <li>• Creating custom menu items</li>
                          <li>• Temporary task-specific guidance</li>
                        </ul>
                        <p className="mt-2 text-purple-200 text-sm">🔍 Example: "Create a gluten-free version of the chocolate cake recipe"</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-3">🔄 Key Differences:</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-900/30 p-3 rounded">
                          <p className="text-purple-200 mb-2"><strong>Pre-training vs Fine-tuning:</strong></p>
                          <p className="text-gray-300 text-sm">Pre-training builds knowledge breadth, while fine-tuning develops depth and expertise in specific areas</p>
                        </div>
                        <div className="bg-gray-900/30 p-3 rounded">
                          <p className="text-purple-200 mb-2"><strong>Fine-tuning vs Prompting:</strong></p>
                          <p className="text-gray-300 text-sm">Fine-tuning makes permanent changes to behavior, while prompting provides temporary guidance for specific tasks</p>
                        </div>
                        <div className="bg-gray-900/30 p-3 rounded">
                          <p className="text-purple-200 mb-2"><strong>Pre-training vs Prompting:</strong></p>
                          <p className="text-gray-300 text-sm">Pre-training creates the foundation of knowledge, while prompting helps access and apply that knowledge effectively</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-3">💡 Working Together:</h3>
                      <p className="text-gray-300 mb-4">How the three stages complement each other:</p>
                      <ul className="space-y-3 text-gray-300">
                        <li>• <strong>Pre-training</strong> creates the knowledge foundation (L)</li>
                        <li>• <strong>Fine-tuning</strong> develops intelligent processing (M)</li>
                        <li>• <strong>Prompting</strong> directs the knowledge and intelligence (Second L)</li>
                      </ul>
                      <div className="mt-4 bg-gray-900/30 p-3 rounded">
                        <p className="text-purple-200 text-sm">
                          Like a master chef who knows all possible recipes (pre-training), has developed cooking intuition (fine-tuning), and can follow specific customer requests (prompting) to create the perfect dish.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>          {/* Popular LLM Models Section */}
          <Section title="Popular LLMs" icon={<Target size={24} className="text-purple-400" />}>
            <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
              <div className="p-6 grid md:grid-cols-3 gap-6">
                <ModelCard
                  name="ChatGPT"
                  img="/images/ai-logos/chatgpt-logo.svg"
                  description="OpenAI's versatile language model, excelling in natural conversations and creative content generation."
                  bestFor="Creative writing, coding assistance, and general knowledge tasks"
                />
                <ModelCard
                  name="Claude"
                  img="/images/ai-logos/claude-logo.svg"
                  description="Anthropic's analytical powerhouse, delivering precise and well-reasoned responses with high accuracy."
                  bestFor="Complex analysis, technical writing, and detailed explanations"
                />
                <ModelCard
                  name="Gemini"
                  img="/images/ai-logos/gemini-logo.svg"
                  description="Google's multimodal marvel, seamlessly handling text, code, and visual information."
                  bestFor="Multimodal tasks, visual analysis, and integrated problem-solving"
                />
              </div>
            </Card>
          </Section>

          {/* Next Lesson Navigation */}
          <div className="mt-16 border-t border-gray-800 pt-8">
            <Link 
              to="/prompt-engineering-guide/techniques" 
              className="flex items-center justify-between p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all rounded-lg group"
            >
              <div>
                <p className="text-sm text-purple-400">Next Chapter</p>
                <h3 className="text-xl font-semibold text-white mt-1 group-hover:text-purple-200 transition-colors">
                  Practical Prompting Techniques
                </h3>
                <p className="text-gray-400 mt-1">
                  Learn how to write effective prompts using what you've learned about LLMs
                </p>
              </div>
              <ArrowRight size={24} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 pointer-events-none" />
    </div>
  );
};

export default PromptEngineeringBasics;
