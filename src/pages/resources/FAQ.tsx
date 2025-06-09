import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Mail, MessageSquare, Zap } from 'lucide-react';
import { Card } from '../../components/ui/Card';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqItems: FAQItem[] = [
    {
      question: 'What is EthosPrompt?',
      answer: 'EthosPrompt is a platform designed to help users create, manage, and optimize AI prompts for various applications. It provides tools and resources to enhance your prompt engineering workflow.',
      category: 'general'
    },
    {
      question: 'Is there a free tier available?',
      answer: 'Yes, we offer a free tier with basic features to get you started. You can upgrade to our premium plans for access to advanced features and higher usage limits.',
      category: 'pricing'
    },
    {
      question: 'How do I get started with prompt engineering?',
      answer: 'Getting started is easy! Check out our "Getting Started" guide and "Best Practices" documentation to learn the basics of prompt engineering and how to create effective prompts.',
      category: 'getting-started'
    },
    {
      question: 'What file formats do you support for imports?',
      answer: 'We support various file formats including JSON, CSV, and TXT for importing prompts and datasets. Check our documentation for specific formatting requirements.',
      category: 'features'
    },
    {
      question: 'How can I contact support?',
      answer: 'You can reach our support team through the contact form in the support section or email us at support@ethosprompt.com. We typically respond within 24 hours.',
      category: 'support'
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen pt-20 sm:pt-24 pb-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-12 relative z-10 text-center">
          <div className="inline-flex items-center justify-center bg-purple-500/10 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 mb-3 sm:mb-4">
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mr-2" />
            <span className="text-xs sm:text-sm font-medium text-purple-300">HOW CAN WE HELP?</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about EthosPrompt and how to get the most out of our platform.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search FAQs"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-6">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <Card 
                key={index} 
                className="overflow-hidden bg-gray-800/30 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/5"
              >
                <button
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-start sm:items-center justify-between focus:outline-none group"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-${index}`}
                >
                  <h3 className="text-base sm:text-lg font-medium text-gray-100 text-left pr-2">
                    {item.question}
                  </h3>
                  <div className="ml-4 flex-shrink-0 mt-0.5 sm:mt-0">
                    {activeIndex === index ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    )}
                  </div>
                </button>
                {activeIndex === index && (
                  <div id={`faq-${index}`} className="px-4 sm:px-6 pb-5 sm:pb-6 pt-0 sm:pt-1">
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <div className="text-center py-10 sm:py-12 px-4">
              <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-300">No results found</h3>
              <p className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2 max-w-md mx-auto">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="max-w-3xl mx-auto mt-12 sm:mt-16 text-center px-2">
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 sm:p-8">
            <div className="bg-purple-500/10 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Still have questions?</h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 max-w-md mx-auto leading-relaxed">
              Our support team is here to help you with any questions you might have.
            </p>
            <button 
              className="inline-flex items-center px-5 sm:px-6 py-2 sm:py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Contact support"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Contact Support
            </button>
            <a
              href="/resources/documentation"
              className="mt-3 sm:mt-0 sm:ml-4 inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-2.5 border border-gray-600 text-sm sm:text-base font-medium rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              View Documentation
            </a>
          </div>
        </div>
      </div>
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 pointer-events-none" />
    </div>
  );
};

export default FAQ;
