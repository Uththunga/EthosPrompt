import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="font-bold text-2xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-600">
              EthosPrompt
            </div>
            <p className="mb-4">
              Premium engineered prompts for professionals and creators to enhance AI workflows.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-purple-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-purple-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-purple-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-purple-400 transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-purple-400 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/prompt-engineering-guide" className="hover:text-purple-400 transition-colors">
                  Engineering Guide
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-purple-400 transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="hover:text-purple-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="hover:text-purple-400 transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-purple-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-purple-400 transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/affiliate-program" className="hover:text-purple-400 transition-colors">
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@ethosprompt.com" className="hover:text-purple-400 transition-colors">
                  info@ethosprompt.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+1234567890" className="hover:text-purple-400 transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} EthosPrompt. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-sm hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-sm hover:text-purple-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;