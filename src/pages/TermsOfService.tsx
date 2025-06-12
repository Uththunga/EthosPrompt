import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, FileText, AlertTriangle, Shield, AlertCircle, Mail } from 'lucide-react';

const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 mb-8 transition-colors"
          aria-label="Back to home"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
        
        <div className="bg-gray-800/30 rounded-xl p-6 sm:p-8 border border-gray-700/50">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-purple-400 mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Terms of Service</h1>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
              Welcome to EthosPrompt! These Terms of Service ("Terms") govern your access to and use of our website, 
              products, and services (collectively, "Services"). By accessing or using our Services, you agree to be 
              bound by these Terms and our Privacy Policy.
            </p>
            
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-5 h-5 text-purple-400 mr-2" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Acceptance of Terms
                </h2>
              </div>
              <div className="pl-7">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  By accessing or using our Services, you confirm that you can form a binding contract with EthosPrompt, 
                  that you accept these Terms, and that you agree to comply with them. Your access to and use of our 
                  Services is also subject to our Privacy Policy, which governs our collection and use of your information.
                </p>
              </div>
            </section>
            
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-purple-400 mr-2" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Use of Services
                </h2>
              </div>
              <div className="pl-7">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to use our Services:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-6">
                  <li>In any way that violates any applicable law or regulation</li>
                  <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors</li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material</li>
                  <li>To impersonate or attempt to impersonate EthosPrompt, an employee, another user, or any other entity</li>
                  <li>To engage in any other conduct that restricts or inhibits anyone's use of the Services</li>
                </ul>
              </div>
            </section>
            
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-5 h-5 text-purple-400 mr-2" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Account Security
                </h2>
              </div>
              <div className="pl-7">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  If you create an account with us, you are responsible for maintaining the security of your account and 
                  for all activities that occur under your account. You agree to provide and maintain accurate, current, 
                  and complete information, including your contact information.
                </p>
              </div>
            </section>
            
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-5 h-5 text-purple-400 mr-2" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Termination
                </h2>
              </div>
              <div className="pl-7">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  We may terminate or suspend your access to our Services immediately, without prior notice or liability, 
                  for any reason whatsoever, including without limitation if you breach these Terms.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Upon termination, your right to use the Services will immediately cease. All provisions of these Terms 
                  which by their nature should survive termination shall survive termination, including ownership provisions, 
                  warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </div>
            </section>
            
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-purple-400 mr-2" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  Limitation of Liability
                </h2>
              </div>
              <div className="pl-7">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  In no event shall EthosPrompt, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                  be liable for any indirect, incidental, special, consequential or punitive damages, including without 
                  limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-6">
                  <li>Your access to or use of or inability to access or use the Services</li>
                  <li>Any conduct or content of any third party on the Services</li>
                  <li>Any content obtained from the Services</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                </ul>
              </div>
            </section>
            
            <section className="mt-12 pt-6 border-t border-gray-700">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Contact Us</h3>
              <p className="text-gray-300 mb-2">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="flex items-center text-purple-300 hover:text-purple-200 transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:legal@ethosprompt.com" className="text-sm">legal@ethosprompt.com</a>
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

export default TermsOfService;
