import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Shield, Lock, Database, Mail, User } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
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
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-purple-400 mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Privacy Policy</h1>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our services.
              By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
            
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <Database className="w-5 h-5 text-purple-400 mr-2" />
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  Information We Collect
                </h2>
              </div>
              <div className="pl-7">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  We collect several different types of information for various purposes to provide and improve our service to you.
                </p>
                <h3 className="text-lg font-medium text-white mt-6 mb-3">Personal Data</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data").
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-6">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and tracking data</li>
                </ul>
              </div>
            </section>
            
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <Lock className="w-5 h-5 text-purple-400 mr-2" />
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  How We Use Your Information
                </h2>
              </div>
              <div className="pl-7">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  We use the collected data for various purposes:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-6">
                  <li>To provide and maintain our service</li>
                  <li>To notify you about changes to our service</li>
                  <li>To allow you to participate in interactive features</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information</li>
                  <li>To monitor the usage of our service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </div>
            </section>
            
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-purple-400 mr-2" />
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  Your Data Protection Rights
                </h2>
              </div>
              <div className="pl-7">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  You have certain data protection rights. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  In certain circumstances, you have the right to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-6">
                  <li>Access, update or delete your information</li>
                  <li>Rectify any inaccurate or incomplete data</li>
                  <li>Object to our processing of your data</li>
                  <li>Request restriction of processing your data</li>
                  <li>Data portability</li>
                  <li>Withdraw consent</li>
                </ul>
              </div>
            </section>
            
            <section className="mt-12 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
              <p className="text-gray-300 mb-2">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="flex items-center text-purple-300 hover:text-purple-200 transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:privacy@ethosprompt.com" className="text-sm">privacy@ethosprompt.com</a>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
