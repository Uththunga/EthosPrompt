import React, { useState, useEffect, useCallback } from 'react';
import { Clock, BookOpen, ChevronUp, Eye } from 'lucide-react';
import { Button } from '../ui/Button';

interface ReadingProgressProps {
  content: string;
  readTime: string;
  tableOfContents?: Array<{
    id: string;
    title: string;
    level: number;
  }>;
  className?: string;
}

interface ReadingStats {
  progress: number;
  timeRemaining: string;
  currentSection: string;
  wordsRead: number;
  totalWords: number;
  readingSpeed: number; // words per minute
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({
  content,
  readTime,
  tableOfContents = [],
  className = ''
}) => {
  const [readingStats, setReadingStats] = useState<ReadingStats>({
    progress: 0,
    timeRemaining: readTime,
    currentSection: '',
    wordsRead: 0,
    totalWords: 0,
    readingSpeed: 200 // average reading speed
  });

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Calculate total words in content
  const calculateTotalWords = useCallback((text: string): number => {
    // Remove code blocks and markdown syntax for more accurate word count
    const cleanText = text
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`[^`]*`/g, '') // Remove inline code
      .replace(/[#*_\[\]()]/g, '') // Remove markdown syntax
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    return cleanText.split(' ').filter(word => word.length > 0).length;
  }, []);

  // Calculate reading progress based on scroll position
  const calculateProgress = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min((scrollTop / docHeight) * 100, 100);
    
    return Math.max(0, progress);
  }, []);

  // Calculate words read based on scroll position
  const calculateWordsRead = useCallback((progress: number, totalWords: number): number => {
    return Math.floor((progress / 100) * totalWords);
  }, []);

  // Calculate time remaining
  const calculateTimeRemaining = useCallback((wordsRemaining: number, readingSpeed: number): string => {
    const minutesRemaining = Math.ceil(wordsRemaining / readingSpeed);
    
    if (minutesRemaining <= 0) return '0 min';
    if (minutesRemaining === 1) return '1 min';
    if (minutesRemaining < 60) return `${minutesRemaining} min`;
    
    const hours = Math.floor(minutesRemaining / 60);
    const minutes = minutesRemaining % 60;
    
    if (hours === 1 && minutes === 0) return '1 hour';
    if (hours === 1) return `1 hour ${minutes} min`;
    if (minutes === 0) return `${hours} hours`;
    
    return `${hours} hours ${minutes} min`;
  }, []);

  // Find current section based on scroll position
  const findCurrentSection = useCallback((): string => {
    if (tableOfContents.length === 0) return '';

    const scrollPosition = window.pageYOffset + 100; // Offset for header
    let currentSection = '';

    for (const section of tableOfContents) {
      const element = document.getElementById(section.id);
      if (element && element.offsetTop <= scrollPosition) {
        currentSection = section.title;
      } else {
        break;
      }
    }

    return currentSection;
  }, [tableOfContents]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    const progress = calculateProgress();
    const totalWords = calculateTotalWords(content);
    const wordsRead = calculateWordsRead(progress, totalWords);
    const wordsRemaining = totalWords - wordsRead;
    const timeRemaining = calculateTimeRemaining(wordsRemaining, readingStats.readingSpeed);
    const currentSection = findCurrentSection();

    setReadingStats(prev => ({
      ...prev,
      progress,
      timeRemaining,
      currentSection,
      wordsRead,
      totalWords
    }));

    // Show scroll to top button when user has scrolled down
    setShowScrollToTop(window.pageYOffset > 500);

    // Hide progress bar when at the very top
    setIsVisible(window.pageYOffset > 100);
  }, [calculateProgress, calculateTotalWords, calculateWordsRead, calculateTimeRemaining, findCurrentSection, content, readingStats.readingSpeed]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Initialize and set up event listeners
  useEffect(() => {
    const totalWords = calculateTotalWords(content);
    setReadingStats(prev => ({
      ...prev,
      totalWords
    }));

    // Initial calculation
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [content, handleScroll, calculateTotalWords]);

  if (!isVisible) return null;

  return (
    <>
      {/* Fixed Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
        <div className="h-1 bg-gray-800/50 backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 ease-out"
            style={{ width: `${readingStats.progress}%` }}
          />
        </div>
        
        {/* Progress Info Bar */}
        <div className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 px-4 py-2">
          <div className="container mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6 text-gray-300">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2 text-purple-400" />
                <span>{Math.round(readingStats.progress)}% read</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-400" />
                <span>{readingStats.timeRemaining} remaining</span>
              </div>
              
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-green-400" />
                <span>{readingStats.wordsRead.toLocaleString()} / {readingStats.totalWords.toLocaleString()} words</span>
              </div>
            </div>

            {readingStats.currentSection && (
              <div className="hidden md:block text-gray-400 truncate max-w-xs">
                <span className="text-purple-400">Current:</span> {readingStats.currentSection}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Navigation (Table of Contents) */}
      {tableOfContents.length > 0 && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 max-w-xs">
            <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Quick Navigation
            </h4>
            <div className="space-y-1 max-h-80 overflow-y-auto">
              {tableOfContents.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                    readingStats.currentSection === section.title
                      ? 'bg-purple-500/20 text-purple-300 font-medium'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                  } ${section.level === 3 ? 'ml-4' : ''}`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}
    </>
  );
};

export default ReadingProgress;
