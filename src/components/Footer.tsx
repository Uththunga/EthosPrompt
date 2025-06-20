import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="font-bold text-2xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-600">
              EthosPrompt
            </div>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Premium engineered prompts for professionals and creators to enhance AI workflows.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/engineering-guide" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Engineering Guide
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors inline-block">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/affiliate-program" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={16} className="flex-shrink-0 mt-1 mr-3 text-gray-400" />
                <a href="mailto:info@ethosprompt.com" className="text-gray-400 hover:text-white transition-colors break-all">
                  info@ethosprompt.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone size={16} className="flex-shrink-0 mt-1 mr-3 text-gray-400" />
                <a href="tel:+11234567890" className="text-gray-400 hover:text-white transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="flex-shrink-0 mt-1 mr-3 text-gray-400" />
                <span className="text-gray-400">San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; 2025 EthosPrompt. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-sm text-gray-500 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;