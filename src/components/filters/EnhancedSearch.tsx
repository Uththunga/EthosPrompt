import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'trending' | 'suggestion';
  category?: string;
}

interface EnhancedSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  showSuggestions?: boolean;
  className?: string;
}

const defaultSuggestions: SearchSuggestion[] = [
  { id: '1', text: 'marketing strategy', type: 'trending', category: 'Marketing' },
  { id: '2', text: 'data analysis', type: 'trending', category: 'Analytics' },
  { id: '3', text: 'customer service', type: 'trending', category: 'Support' },
  { id: '4', text: 'content creation', type: 'suggestion', category: 'Content' },
  { id: '5', text: 'project planning', type: 'suggestion', category: 'Management' },
  { id: '6', text: 'email templates', type: 'recent', category: 'Communication' },
  { id: '7', text: 'social media', type: 'recent', category: 'Marketing' },
  { id: '8', text: 'business plan', type: 'recent', category: 'Strategy' }
];

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({
  value,
  onChange,
  onSuggestionSelect,
  placeholder = 'Search prompts...',
  suggestions = defaultSuggestions,
  showSuggestions = true,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(value.toLowerCase()) ||
    suggestion.category?.toLowerCase().includes(value.toLowerCase())
  );

  // Group suggestions by type
  const groupedSuggestions = {
    trending: filteredSuggestions.filter(s => s.type === 'trending'),
    recent: filteredSuggestions.filter(s => s.type === 'recent'),
    suggestions: filteredSuggestions.filter(s => s.type === 'suggestion')
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowDropdown(newValue.length > 0 || isFocused);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (showSuggestions) {
      setShowDropdown(true);
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    // Delay hiding dropdown to allow for suggestion clicks
    setTimeout(() => setShowDropdown(false), 150);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onChange(suggestion.text);
    setShowDropdown(false);
    onSuggestionSelect?.(suggestion);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    onChange('');
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'trending':
        return <TrendingUp className="w-3 h-3 text-orange-400" />;
      case 'recent':
        return <Clock className="w-3 h-3 text-blue-400" />;
      default:
        return <Search className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className={cn('relative', className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-gray-500" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className={cn(
            'w-full pl-10 pr-10 py-2.5 text-sm bg-gray-700/50 border border-gray-600/30 rounded-xl',
            'focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent',
            'transition-all duration-200 text-white placeholder-gray-400',
            isFocused && 'ring-2 ring-purple-500/50 border-transparent'
          )}
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && showSuggestions && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl z-50 max-h-64 overflow-hidden"
        >
          <div className="max-h-64 overflow-y-auto">
            {filteredSuggestions.length > 0 ? (
              <>
                {/* Trending Suggestions */}
                {groupedSuggestions.trending.length > 0 && (
                  <div className="p-2">
                    <div className="text-xs font-medium text-orange-400 mb-2 px-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                    {groupedSuggestions.trending.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-700/50 rounded-lg transition-colors"
                      >
                        {getSuggestionIcon(suggestion.type)}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white truncate">{suggestion.text}</div>
                          {suggestion.category && (
                            <div className="text-xs text-gray-400">{suggestion.category}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Recent Suggestions */}
                {groupedSuggestions.recent.length > 0 && (
                  <div className="p-2 border-t border-gray-700/50">
                    <div className="text-xs font-medium text-blue-400 mb-2 px-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Recent
                    </div>
                    {groupedSuggestions.recent.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-700/50 rounded-lg transition-colors"
                      >
                        {getSuggestionIcon(suggestion.type)}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white truncate">{suggestion.text}</div>
                          {suggestion.category && (
                            <div className="text-xs text-gray-400">{suggestion.category}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* General Suggestions */}
                {groupedSuggestions.suggestions.length > 0 && (
                  <div className="p-2 border-t border-gray-700/50">
                    <div className="text-xs font-medium text-gray-400 mb-2 px-2">Suggestions</div>
                    {groupedSuggestions.suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-700/50 rounded-lg transition-colors"
                      >
                        {getSuggestionIcon(suggestion.type)}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white truncate">{suggestion.text}</div>
                          {suggestion.category && (
                            <div className="text-xs text-gray-400">{suggestion.category}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 text-center text-gray-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No suggestions found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;
