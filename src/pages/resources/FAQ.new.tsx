import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Mail, MessageSquare, Zap } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const faqItems = [
    {
      question: 'How do I get started?',
      answer: 'To get started, create an account and explore our template library. You can then create your first prompt and start generating content immediately.'
    },
    {
      question: 'What are the pricing plans?',
      answer: 'We offer a free tier with basic features and several paid plans starting at $9.99/month. Paid plans include additional features and higher usage limits.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take security very seriously. All data is encrypted both in transit and at rest, and we follow industry best practices for data protection.'
    },
    {
      question: 'How can I contact support?',
      answer: 'You can reach our support team at support@ethosprompt.com. We typically respond within 24 hours.'
    },
    {
      question: 'What features are included?',
      answer: 'Our platform includes features like prompt templates, version history, team collaboration, and API access. Check our features page for a complete list.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = searchTerm
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqItems;

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 sm:pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center bg-purple-500/10 rounded-full px-6 py-2 mb-4">
            <HelpCircle className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-sm font-medium text-purple-300">HOW CAN WE HELP?</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            Find answers to common questions about EthosPrompt.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 sm:mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2.5 px-4 sm:py-3 sm:px-5 text-base text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <Card 
              key={index}
              className="overflow-hidden bg-gray-800/30 border border-gray-700/50 hover:border-purple-500/50 transition-colors"
            >
              <button
                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-base sm:text-lg font-medium text-gray-100">
                  {item.question}
                </h3>
                <div className="ml-4 flex-shrink-0">
                  {activeIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              {activeIndex === index && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 sm:pt-2 text-gray-400 text-sm sm:text-base">
                  <p>{item.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-6">
            <MessageSquare className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-3 sm:mb-4">Still need help?</h2>
          <p className="text-gray-400 mb-5 sm:mb-6">
            Our support team is here to help you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:support@ethosprompt.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </a>
            <a
              href="/resources/documentation"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
            >
              <Zap className="w-5 h-5 mr-2" />
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
