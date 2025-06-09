import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-gray-900/50 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center group relative" onClick={() => setIsMenuOpen(false)}>
              <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse"></div>
              <img 
                src="/EthosPrompt/WhatsApp Image 2025-06-03 at 13.03.32_eb705350.png" 
                alt="EthosPrompt Logo" 
                className="h-5 sm:h-6 md:h-7 transition-all duration-300 hover:scale-105 hover:brightness-125 hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.5)] filter drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] relative z-10"
                width="auto"
                height="auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { path: '/', label: 'Home' },
              { path: '/prompt-engineering-guide', label: 'Engineering Guide' },
              { path: '/resources', label: 'Resources' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  isActivePath(item.path)
                    ? 'text-white bg-purple-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
                <Bell size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
                <ShoppingCart size={22} />
              </button>
              <div className="relative group">
                <button className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group-hover:ring-2 group-hover:ring-purple-500/50">
                  <User size={20} className="text-gray-300 group-hover:text-white transition-colors" />
                </button>
                <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm text-gray-300">Signed in as</p>
                    <p className="text-sm font-medium text-white">user@example.com</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700">Sign out</a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 -mr-2 rounded-lg hover:bg-gray-800 transition-colors active:bg-gray-800/50"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X size={24} className="text-gray-300 w-6 h-6" />
            ) : (
              <Menu size={24} className="text-gray-300 w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen 
              ? 'max-h-screen opacity-100 visible' 
              : 'max-h-0 opacity-0 invisible'
          }`}
          style={{
            transitionProperty: 'max-height, opacity, visibility',
            transitionDuration: '300ms',
            transitionTimingFunction: 'ease-in-out'
          }}
        >
          <div className="py-3 border-t border-gray-800">
            <nav className="flex flex-col space-y-1 px-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/prompt-engineering-guide', label: 'Engineering Guide' },
                { path: '/resources', label: 'Resources' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-lg transition-colors text-base ${
                    isActivePath(item.path)
                      ? 'text-white bg-purple-500/10 font-medium'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 pt-3 border-t border-gray-800 px-2">
              <div className="flex items-center justify-between px-2 py-2">
                <div className="flex items-center space-x-3">
                  <button 
                    className="relative p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors active:bg-gray-800/30"
                    aria-label="Notifications"
                  >
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full"></span>
                  </button>
                  <button 
                    className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors active:bg-gray-800/30"
                    aria-label="Shopping Cart"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
                <button 
                  className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-800 hover:bg-gray-700/80 transition-colors active:bg-gray-700/60"
                  aria-label="User Account"
                >
                  <User size={18} className="text-gray-300" />
                </button>
              </div>
              <div className="mt-2 pt-3 border-t border-gray-700 space-y-1">
                <a href="#" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors active:bg-gray-800/30">Profile</a>
                <a href="#" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors active:bg-gray-800/30">Settings</a>
                <a href="#" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors active:bg-gray-800/30">Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;