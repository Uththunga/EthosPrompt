import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 mb-6 transition-colors"
          aria-label="Back to home"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
        
        <div className="bg-gray-800/30 rounded-xl p-6 sm:p-8 border border-gray-700/50">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Cookie Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="mb-6 text-gray-300 leading-relaxed">
              This Cookie Policy explains how we use cookies and similar technologies to recognize you when you visit our website.
            </p>
            
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
                What Are Cookies?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Cookies are small data files placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide a better user experience.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
                How We Use Cookies
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Deliver personalized content and ads</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
                Your Choices
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You can control and manage cookies in various ways. Please note that removing or blocking cookies can impact your user experience.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. The Help menu on the menu bar of most browsers will tell you how to prevent your browser from accepting new cookies, how to have the browser notify you when you receive a new cookie, and how to disable cookies altogether.
              </p>
            </section>
            
            <div className="mt-10 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
