import { useState, useMemo, useCallback } from 'react';
import { BLOG_POSTS, type BlogPost, type CategoryId } from '../data/blog-posts';

export interface SearchFilters {
  category: CategoryId | 'all';
  difficulty: 'all' | 'Beginner' | 'Intermediate' | 'Advanced';
  hasCodeExamples: boolean | null;
  hasDownloads: boolean | null;
  author: string;
  tags: string[];
  dateRange: 'all' | 'last-month' | 'last-3-months' | 'last-year';
}

export interface SearchResult {
  post: BlogPost;
  relevanceScore: number;
  matchedFields: string[];
  highlightedExcerpt: string;
}

export interface SearchState {
  query: string;
  filters: SearchFilters;
  results: SearchResult[];
  isSearching: boolean;
  totalResults: number;
  searchTime: number;
  suggestions: string[];
}

const defaultFilters: SearchFilters = {
  category: 'all',
  difficulty: 'all',
  hasCodeExamples: null,
  hasDownloads: null,
  author: '',
  tags: [],
  dateRange: 'all'
};

export const useSearch = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    filters: defaultFilters,
    results: [],
    isSearching: false,
    totalResults: 0,
    searchTime: 0,
    suggestions: []
  });

  // Calculate relevance score for a post based on query
  const calculateRelevanceScore = useCallback((post: BlogPost, query: string): { score: number; matchedFields: string[] } => {
    if (!query.trim()) return { score: 0, matchedFields: [] };

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    let totalScore = 0;
    const matchedFields: string[] = [];

    // Weight different fields differently
    const fieldWeights = {
      title: 10,
      tags: 8,
      excerpt: 6,
      content: 3,
      author: 5,
      category: 4
    };

    searchTerms.forEach(term => {
      // Title matching
      if (post.title.toLowerCase().includes(term)) {
        totalScore += fieldWeights.title;
        if (!matchedFields.includes('title')) matchedFields.push('title');
      }

      // Tags matching
      if (post.tags.some(tag => tag.toLowerCase().includes(term))) {
        totalScore += fieldWeights.tags;
        if (!matchedFields.includes('tags')) matchedFields.push('tags');
      }

      // Excerpt matching
      if (post.excerpt.toLowerCase().includes(term)) {
        totalScore += fieldWeights.excerpt;
        if (!matchedFields.includes('excerpt')) matchedFields.push('excerpt');
      }

      // Content matching (sample first 1000 chars for performance)
      const contentSample = post.content.substring(0, 1000).toLowerCase();
      if (contentSample.includes(term)) {
        totalScore += fieldWeights.content;
        if (!matchedFields.includes('content')) matchedFields.push('content');
      }

      // Author matching
      if (post.author.name.toLowerCase().includes(term) || post.author.role.toLowerCase().includes(term)) {
        totalScore += fieldWeights.author;
        if (!matchedFields.includes('author')) matchedFields.push('author');
      }

      // Category matching
      if (post.category.toLowerCase().includes(term)) {
        totalScore += fieldWeights.category;
        if (!matchedFields.includes('category')) matchedFields.push('category');
      }
    });

    // Boost score for exact phrase matches
    if (post.title.toLowerCase().includes(query.toLowerCase())) {
      totalScore += 15;
    }
    if (post.excerpt.toLowerCase().includes(query.toLowerCase())) {
      totalScore += 10;
    }

    return { score: totalScore, matchedFields };
  }, []);

  // Generate highlighted excerpt
  const generateHighlightedExcerpt = useCallback((post: BlogPost, query: string): string => {
    if (!query.trim()) return post.excerpt;

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    let excerpt = post.excerpt;

    // Find the best excerpt section that contains search terms
    const sentences = excerpt.split('. ');
    let bestSentence = sentences[0];
    let maxMatches = 0;

    sentences.forEach(sentence => {
      const matches = searchTerms.filter(term => 
        sentence.toLowerCase().includes(term)
      ).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestSentence = sentence;
      }
    });

    // Highlight search terms in the best sentence
    let highlighted = bestSentence;
    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    });

    return highlighted + (bestSentence !== excerpt ? '...' : '');
  }, []);

  // Apply filters to posts
  const applyFilters = useCallback((posts: BlogPost[], filters: SearchFilters): BlogPost[] => {
    return posts.filter(post => {
      // Category filter
      if (filters.category !== 'all' && post.category !== filters.category) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty !== 'all' && post.difficulty !== filters.difficulty) {
        return false;
      }

      // Code examples filter
      if (filters.hasCodeExamples !== null && post.hasCodeExamples !== filters.hasCodeExamples) {
        return false;
      }

      // Downloads filter
      if (filters.hasDownloads !== null && post.hasDownloads !== filters.hasDownloads) {
        return false;
      }

      // Author filter
      if (filters.author && !post.author.name.toLowerCase().includes(filters.author.toLowerCase())) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(filterTag =>
          post.tags.some(postTag => postTag.toLowerCase().includes(filterTag.toLowerCase()))
        );
        if (!hasMatchingTag) return false;
      }

      // Date range filter (simplified - in real app would parse actual dates)
      if (filters.dateRange !== 'all') {
        // For demo purposes, we'll assume all posts are recent
        // In a real implementation, you'd parse post.date and compare
      }

      return true;
    });
  }, []);

  // Generate search suggestions
  const generateSuggestions = useCallback((query: string): string[] => {
    if (!query.trim() || query.length < 2) return [];

    const suggestions = new Set<string>();
    const queryLower = query.toLowerCase();

    // Collect suggestions from various sources
    BLOG_POSTS.forEach(post => {
      // Title words
      post.title.split(' ').forEach(word => {
        if (word.toLowerCase().startsWith(queryLower) && word.length > 2) {
          suggestions.add(word);
        }
      });

      // Tags
      post.tags.forEach(tag => {
        if (tag.toLowerCase().includes(queryLower)) {
          suggestions.add(tag);
        }
      });

      // Author names
      const authorWords = post.author.name.split(' ');
      authorWords.forEach(word => {
        if (word.toLowerCase().startsWith(queryLower)) {
          suggestions.add(post.author.name);
        }
      });
    });

    return Array.from(suggestions).slice(0, 5);
  }, []);

  // Main search function
  const search = useCallback((query: string, filters: SearchFilters = defaultFilters) => {
    const startTime = performance.now();
    
    setSearchState(prev => ({ ...prev, isSearching: true }));

    // Apply filters first
    const filteredPosts = applyFilters(BLOG_POSTS, filters);

    // If no query, return filtered results
    if (!query.trim()) {
      const results: SearchResult[] = filteredPosts.map(post => ({
        post,
        relevanceScore: 0,
        matchedFields: [],
        highlightedExcerpt: post.excerpt
      }));

      const endTime = performance.now();
      
      setSearchState({
        query,
        filters,
        results,
        isSearching: false,
        totalResults: results.length,
        searchTime: endTime - startTime,
        suggestions: generateSuggestions(query)
      });
      
      return;
    }

    // Calculate relevance scores and create results
    const searchResults: SearchResult[] = filteredPosts
      .map(post => {
        const { score, matchedFields } = calculateRelevanceScore(post, query);
        return {
          post,
          relevanceScore: score,
          matchedFields,
          highlightedExcerpt: generateHighlightedExcerpt(post, query)
        };
      })
      .filter(result => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    const endTime = performance.now();

    setSearchState({
      query,
      filters,
      results: searchResults,
      isSearching: false,
      totalResults: searchResults.length,
      searchTime: endTime - startTime,
      suggestions: generateSuggestions(query)
    });
  }, [calculateRelevanceScore, generateHighlightedExcerpt, applyFilters, generateSuggestions]);

  // Update search query
  const updateQuery = useCallback((query: string) => {
    search(query, searchState.filters);
  }, [search, searchState.filters]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...searchState.filters, ...newFilters };
    search(searchState.query, updatedFilters);
  }, [search, searchState.query, searchState.filters]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchState({
      query: '',
      filters: defaultFilters,
      results: [],
      isSearching: false,
      totalResults: 0,
      searchTime: 0,
      suggestions: []
    });
  }, []);

  // Get popular search terms (mock data for demo)
  const getPopularSearches = useCallback((): string[] => {
    return [
      'prompt engineering',
      'chain of thought',
      'production optimization',
      'multimodal AI',
      'AI safety',
      'enterprise implementation'
    ];
  }, []);

  return {
    searchState,
    search,
    updateQuery,
    updateFilters,
    clearSearch,
    getPopularSearches
  };
};
