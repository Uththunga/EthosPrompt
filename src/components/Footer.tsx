import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronDown, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    quickLinks: false,
    resources: false,
    contact: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Mobile-first layout with improved spacing */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {/* Company Info - Always visible, mobile-optimized */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="font-bold text-xl md:text-2xl mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-600">
              EthosPrompt
            </div>
            <p className="mb-6 md:mb-8 text-base md:text-sm leading-relaxed text-gray-400">
              Premium engineered prompts for professionals and creators to enhance AI workflows.
            </p>
            {/* Mobile-optimized social media links with larger touch targets */}
            <div className="flex flex-wrap gap-4 md:gap-3">
              <a
                href="https://facebook.com"
                className="flex items-center justify-center w-12 h-12 md:w-10 md:h-10 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={24} className="md:w-5 md:h-5" />
              </a>
              <a
                href="https://twitter.com"
                className="flex items-center justify-center w-12 h-12 md:w-10 md:h-10 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={24} className="md:w-5 md:h-5" />
              </a>
              <a
                href="https://instagram.com"
                className="flex items-center justify-center w-12 h-12 md:w-10 md:h-10 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={24} className="md:w-5 md:h-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="flex items-center justify-center w-12 h-12 md:w-10 md:h-10 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={24} className="md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Collapsible on mobile */}
          <div>
            <button
              onClick={() => toggleSection('quickLinks')}
              className="flex items-center justify-between w-full text-left md:cursor-default"
              aria-expanded={expandedSections.quickLinks}
              aria-controls="quick-links-content"
            >
              <h3 className="text-white font-semibold text-lg md:text-base mb-0 md:mb-4">Quick Links</h3>
              <ChevronDown
                size={20}
                className={`md:hidden transition-transform duration-200 ${expandedSections.quickLinks ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              id="quick-links-content"
              className={`overflow-hidden transition-all duration-300 md:!block ${
                expandedSections.quickLinks ? 'max-h-96 mt-4' : 'max-h-0 md:max-h-none'
              }`}
            >
              <ul className="space-y-4 md:space-y-3 md:mt-0">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors py-2 md:py-0 text-base md:text-sm min-h-[44px] md:min-h-0 flex items-center"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="text-gray-400 hover:text-white transition-colors py-2 md:py-0 text-base md:text-sm min-h-[44px] md:min-h-0 flex items-center"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/engineering-guide"
                    className="text-gray-400 hover:text-white transition-colors py-2 md:py-0 text-base md:text-sm min-h-[44px] md:min-h-0 flex items-center"
                  >
                    Engineering Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources"
                    className="text-gray-400 hover:text-white transition-colors py-2 md:py-0 text-base md:text-sm min-h-[44px] md:min-h-0 flex items-center"
                  >
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Resources - Collapsible on mobile */}
          <div>
            <button
              onClick={() => toggleSection('resources')}
              className="flex items-center justify-between w-full text-left md:cursor-default"
              aria-expanded={expandedSections.resources}
              aria-controls="resources-content"
            >
              <h3 className="text-white font-semibold text-lg md:text-base mb-0 md:mb-4">Resources</h3>
              <ChevronDown
                size={20}
                className={`md:hidden transition-transform duration-200 ${expandedSections.resources ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              id="resources-content"
              className={`overflow-hidden transition-all duration-300 md:!block ${
                expandedSections.resources ? 'max-h-96 mt-4' : 'max-h-0 md:max-h-none'
              }`}
            >
              <ul className="space-y-4 md:space-y-3 md:mt-0">
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-white transition-colors py-2 md:py-0 text-base md:text-sm min-h-[44px] md:min-h-0 flex items-center"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tutorials"
                    className="text-gray-400 hover:text-white transition-colors py-2 md:py-0 text-base md:text-sm min-h-[44px] md:min-h-0 flex items-center"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-gray-400 hover:text-white transition-colors py-2 md:py-0 text-base md:text-sm min-h-[44px] md:min-h-0 flex items-center"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-gray-400 hover:text-white transition-colors py-2 md:py-0 text-base md:text-sm min-h-[44px] md:min-h-0 flex items-center"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    to="/affiliate-program"
                    className="text-gray-400 hover:text-white transition-colors py-2 md:py-0 text-base md:text-sm min-h-[44px] md:min-h-0 flex items-center"
                  >
                    Affiliate Program
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact - Collapsible on mobile */}
          <div>
            <button
              onClick={() => toggleSection('contact')}
              className="flex items-center justify-between w-full text-left md:cursor-default"
              aria-expanded={expandedSections.contact}
              aria-controls="contact-content"
            >
              <h3 className="text-white font-semibold text-lg md:text-base mb-0 md:mb-4">Contact Us</h3>
              <ChevronDown
                size={20}
                className={`md:hidden transition-transform duration-200 ${expandedSections.contact ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              id="contact-content"
              className={`overflow-hidden transition-all duration-300 md:!block ${
                expandedSections.contact ? 'max-h-96 mt-4' : 'max-h-0 md:max-h-none'
              }`}
            >
              <ul className="space-y-4 md:space-y-3 md:mt-0">
                <li className="flex items-center min-h-[44px] md:min-h-0">
                  <Mail size={20} className="md:w-4 md:h-4 flex-shrink-0 mr-3 text-gray-400" />
                  <a
                    href="mailto:info@ethosprompt.com"
                    className="text-gray-400 hover:text-white transition-colors break-all text-base md:text-sm py-2 md:py-0 flex-1"
                  >
                    info@ethosprompt.com
                  </a>
                </li>
                <li className="flex items-center min-h-[44px] md:min-h-0">
                  <Phone size={20} className="md:w-4 md:h-4 flex-shrink-0 mr-3 text-gray-400" />
                  <a
                    href="tel:+11234567890"
                    className="text-gray-400 hover:text-white transition-colors text-base md:text-sm py-2 md:py-0 flex-1"
                  >
                    (123) 456-7890
                  </a>
                </li>
                <li className="flex items-center min-h-[44px] md:min-h-0">
                  <MapPin size={20} className="md:w-4 md:h-4 flex-shrink-0 mr-3 text-gray-400" />
                  <span className="text-gray-400 text-base md:text-sm py-2 md:py-0 flex-1">
                    San Francisco, CA
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section with mobile-optimized layout */}
        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-base md:text-sm text-gray-500 text-center md:text-left">
            &copy; 2025 EthosPrompt. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-center">
            <Link
              to="/privacy-policy"
              className="text-base md:text-sm text-gray-500 hover:text-white transition-colors py-2 md:py-0 min-h-[44px] md:min-h-0 flex items-center justify-center"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-base md:text-sm text-gray-500 hover:text-white transition-colors py-2 md:py-0 min-h-[44px] md:min-h-0 flex items-center justify-center"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookie-policy"
              className="text-base md:text-sm text-gray-500 hover:text-white transition-colors py-2 md:py-0 min-h-[44px] md:min-h-0 flex items-center justify-center"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;