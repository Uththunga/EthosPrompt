import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 text-sm sm:text-base">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-bold text-2xl sm:text-3xl mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-600">
              EthosPrompt
            </div>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
              Premium engineered prompts for professionals and creators to enhance AI workflows.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-purple-400 transition-colors p-1 -m-1" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={18} className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-purple-400 transition-colors p-1 -m-1" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={18} className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-purple-400 transition-colors p-1 -m-1" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={18} className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-purple-400 transition-colors p-1 -m-1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <Link to="/" className="hover:text-purple-400 transition-colors inline-block py-1 sm:py-1.5">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-purple-400 transition-colors inline-block py-1 sm:py-1.5">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/prompt-engineering-guide" className="hover:text-purple-400 transition-colors inline-block py-1 sm:py-1.5">
                  Engineering Guide
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-purple-400 transition-colors inline-block py-1 sm:py-1.5">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">Resources</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <Link to="/blog" className="hover:text-purple-400 transition-colors inline-block py-1 sm:py-1.5">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="hover:text-purple-400 transition-colors inline-block py-1 sm:py-1.5">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-purple-400 transition-colors inline-block py-1 sm:py-1.5">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-purple-400 transition-colors inline-block py-1 sm:py-1.5">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/affiliate-program" className="hover:text-purple-400 transition-colors inline-block py-1 sm:py-1.5">
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contact Us</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <Mail size={16} className="flex-shrink-0 mt-1 mr-2" />
                <a href="mailto:info@ethosprompt.com" className="hover:text-purple-400 transition-colors break-all">
                  info@ethosprompt.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone size={16} className="flex-shrink-0 mt-1 mr-2" />
                <a href="tel:+11234567890" className="hover:text-purple-400 transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="flex-shrink-0 mt-1 mr-2" />
                <span>123 AI Street, Tech City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-0 text-center sm:text-left">
            &copy; {new Date().getFullYear()} EthosPrompt. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-6">
            <Link to="/privacy-policy" className="text-xs sm:text-sm text-gray-500 hover:text-purple-400 transition-colors whitespace-nowrap">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-xs sm:text-sm text-gray-500 hover:text-purple-400 transition-colors whitespace-nowrap">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-xs sm:text-sm text-gray-500 hover:text-purple-400 transition-colors whitespace-nowrap">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;