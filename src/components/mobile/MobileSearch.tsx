import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Filter, Mic, Camera } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

// Type declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface MobileSearchProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  showVoiceSearch?: boolean;
  showVisualSearch?: boolean;
  showFilters?: boolean;
  autoFocus?: boolean;
  className?: string;
}

const MobileSearch: React.FC<MobileSearchProps> = ({
  placeholder = 'Search...',
  value = '',
  onValueChange,
  onSearch,
  onClear,
  onFocus,
  onBlur,
  showVoiceSearch = false,
  showVisualSearch = false,
  showFilters = false,
  autoFocus = false,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onValueChange?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch?.(value.trim());
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    onValueChange?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      // Add haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onValueChange?.(transcript);
      onSearch?.(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleVisualSearch = () => {
    // Placeholder for visual search functionality
    // In a real implementation, this would open camera or file picker
    console.log('Visual search triggered');
  };

  return (
    <div className={cn('relative w-full', className)}>
      <form onSubmit={handleSubmit} className="relative">
        {/* Search Input */}
        <div
          className={cn(
            'relative flex items-center',
            'bg-gray-800/50 backdrop-blur-sm border rounded-2xl',
            'transition-all duration-200 ease-in-out',
            isFocused
              ? 'border-purple-500/50 shadow-lg shadow-purple-500/10'
              : 'border-gray-600/50',
            'min-h-[48px]'
          )}
        >
          {/* Search Icon */}
          <div className="absolute left-4 flex items-center justify-center">
            <Search className="w-5 h-5 text-gray-400" />
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={cn(
              'w-full h-12 pl-12 pr-4 bg-transparent',
              'text-white placeholder-gray-400',
              'focus:outline-none',
              'mobile-body',
              // Add padding for action buttons
              (showVoiceSearch || showVisualSearch || value) && 'pr-20',
              showFilters && 'pr-28'
            )}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />

          {/* Action Buttons */}
          <div className="absolute right-2 flex items-center gap-1">
            {/* Clear Button */}
            {value && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="touch-target w-8 h-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </Button>
            )}

            {/* Voice Search Button */}
            {showVoiceSearch && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleVoiceSearch}
                className={cn(
                  'touch-target w-8 h-8 p-0 rounded-full',
                  isListening
                    ? 'text-red-400 bg-red-500/20 animate-pulse'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                )}
                aria-label="Voice search"
              >
                <Mic className="w-4 h-4" />
              </Button>
            )}

            {/* Visual Search Button */}
            {showVisualSearch && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleVisualSearch}
                className="touch-target w-8 h-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full"
                aria-label="Visual search"
              >
                <Camera className="w-4 h-4" />
              </Button>
            )}

            {/* Filters Button */}
            {showFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="touch-target w-8 h-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full"
                aria-label="Search filters"
              >
                <Filter className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Hidden submit button for form submission */}
        <button type="submit" className="sr-only" aria-hidden="true">
          Search
        </button>
      </form>

      {/* Voice Search Indicator */}
      {isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-gray-800/90 backdrop-blur-sm border border-gray-600/50 rounded-xl">
          <div className="flex items-center justify-center gap-2 text-red-400">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="mobile-caption font-medium">Listening...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Extended search component with suggestions
export const MobileSearchWithSuggestions: React.FC<MobileSearchProps & {
  suggestions?: string[];
  recentSearches?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}> = ({
  suggestions = [],
  recentSearches = [],
  onSuggestionSelect,
  ...searchProps
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleFocus = () => {
    setShowSuggestions(true);
    searchProps.onFocus?.();
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 150);
    searchProps.onBlur?.();
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionSelect?.(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <MobileSearch
        {...searchProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {/* Suggestions Dropdown */}
      {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-3 border-b border-gray-700/50">
              <h4 className="mobile-caption text-gray-400 mb-2 font-medium">Recent</h4>
              {recentSearches.slice(0, 3).map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full text-left p-2 rounded-lg hover:bg-gray-700/50 transition-colors mobile-body-sm text-gray-300"
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-3">
              <h4 className="mobile-caption text-gray-400 mb-2 font-medium">Suggestions</h4>
              {suggestions.slice(0, 5).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left p-2 rounded-lg hover:bg-gray-700/50 transition-colors mobile-body-sm text-gray-300"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileSearch;
