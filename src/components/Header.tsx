import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Menu, X, Bell, LogIn, UserPlus, Crown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MobileMenu from './mobile/MobileMenu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, userProfile, signOut, hasLifetimeAccess } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside of profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
              <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-full animate-pulse" />
              <img 
                src="/EthosPrompt/WhatsApp Image 2025-06-03 at 13.03.32_eb705350.png" 
                alt="EthosPrompt Logo" 
                className="h-5 sm:h-6 md:h-7 transition-all duration-300 hover:scale-105 hover:brightness-125 hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] filter drop-shadow-[0_0_10px_rgba(168,85,247,0.3)] relative z-10"
                width="auto"
                height="auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {[
              { path: '/', label: 'Home' },
              { path: '/prompt-engineering-guide', label: 'Prompting Guide' },
              { path: '/resources', label: 'Resources' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              /* Authenticated User Actions */
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <Bell size={22} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full" />
                </button>
                <button className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <ShoppingCart size={22} />
                </button>
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center justify-center h-10 w-10 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors ${isProfileOpen ? 'ring-2 ring-purple-500/50' : ''}`}
                  >
                    <User size={20} className="text-gray-300" />
                  </button>
                  <div className={`absolute right-0 mt-2 w-56 py-2 bg-gray-800 rounded-xl shadow-xl transition-all border border-gray-700 ${isProfileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="px-4 py-3 border-b border-gray-700">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-300">Signed in as</p>
                        {hasLifetimeAccess && (
                          <Crown className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm font-medium text-white">{user.email}</p>
                      {hasLifetimeAccess && (
                        <p className="text-xs text-yellow-400">Lifetime Access</p>
                      )}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700">Settings</a>
                    {!hasLifetimeAccess && (
                      <Link
                        to="/upgrade"
                        className="block px-4 py-2 text-sm text-yellow-400 hover:text-yellow-300 hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Upgrade to Lifetime
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut();
                        setIsProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Guest User Actions */
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 shadow-sm"
                >
                  <UserPlus size={18} />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 rounded-lg hover:bg-gray-800 transition-colors active:bg-gray-800/50"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
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
            <nav className="flex flex-col space-y-2 px-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/prompt-engineering-guide', label: 'Prompting Guide' },
                { path: '/resources', label: 'Resources' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 text-base font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-gray-800 px-4">
              {user ? (
                /* Authenticated Mobile Menu */
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        className="relative p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors active:bg-gray-800/30"
                        aria-label="Notifications"
                      >
                        <Bell size={22} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full" />
                      </button>
                      <button
                        className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors active:bg-gray-800/30"
                        aria-label="Shopping Cart"
                      >
                        <ShoppingCart size={22} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800">
                        <User size={20} className="text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white">{user.email}</p>
                          {hasLifetimeAccess && (
                            <Crown className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-400">
                          {hasLifetimeAccess ? 'Lifetime Access' : 'Free Account'}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors active:bg-gray-800/30"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <a href="#" className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors active:bg-gray-800/30">Settings</a>
                      {!hasLifetimeAccess && (
                        <Link
                          to="/upgrade"
                          className="block px-3 py-2.5 text-sm text-yellow-400 hover:text-yellow-300 hover:bg-gray-800/50 rounded-lg transition-colors active:bg-gray-800/30"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Upgrade to Lifetime
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors active:bg-gray-800/30"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Guest Mobile Menu */
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 active:bg-gray-800/30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={18} />
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 shadow-sm active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus size={18} />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;