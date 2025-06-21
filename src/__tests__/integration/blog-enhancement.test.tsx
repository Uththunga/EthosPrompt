import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Blog from '../../pages/resources/Blog';
import { BLOG_POSTS } from '../../data/blog-posts';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined)
  }
});

const renderBlog = () => {
  return render(
    <BrowserRouter>
      <Blog />
    </BrowserRouter>
  );
};

describe('Blog Enhancement Features', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    vi.clearAllMocks();
  });

  describe('Advanced Search Functionality', () => {
    it('renders advanced search component', () => {
      renderBlog();
      expect(screen.getByPlaceholderText('Search articles, authors, topics...')).toBeInTheDocument();
      expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    it('shows search suggestions when typing', async () => {
      renderBlog();
      const searchInput = screen.getByPlaceholderText('Search articles, authors, topics...');
      
      fireEvent.change(searchInput, { target: { value: 'prompt' } });
      
      await waitFor(() => {
        expect(screen.getByText('Suggestions')).toBeInTheDocument();
      });
    });

    it('shows popular searches when input is empty', () => {
      renderBlog();
      const searchInput = screen.getByPlaceholderText('Search articles, authors, topics...');
      
      fireEvent.focus(searchInput);
      
      expect(screen.getByText('Popular Searches')).toBeInTheDocument();
      expect(screen.getByText('prompt engineering')).toBeInTheDocument();
    });

    it('opens and closes filter panel', () => {
      renderBlog();
      const filterButton = screen.getByText('Filters');
      
      fireEvent.click(filterButton);
      expect(screen.getByText('Advanced Filters')).toBeInTheDocument();
      
      fireEvent.click(filterButton);
      expect(screen.queryByText('Advanced Filters')).not.toBeInTheDocument();
    });

    it('filters by category', async () => {
      renderBlog();
      const filterButton = screen.getByText('Filters');
      
      fireEvent.click(filterButton);
      
      const categorySelect = screen.getByDisplayValue('All Categories');
      fireEvent.change(categorySelect, { target: { value: 'tutorials' } });
      
      await waitFor(() => {
        // Should show only tutorial articles
        const tutorialPosts = BLOG_POSTS.filter(post => post.category === 'tutorials');
        expect(screen.getByText(`${tutorialPosts.length} article${tutorialPosts.length !== 1 ? 's' : ''} found`)).toBeInTheDocument();
      });
    });

    it('filters by difficulty', async () => {
      renderBlog();
      const filterButton = screen.getByText('Filters');
      
      fireEvent.click(filterButton);
      
      const difficultySelect = screen.getByDisplayValue('All Levels');
      fireEvent.change(difficultySelect, { target: { value: 'Advanced' } });
      
      await waitFor(() => {
        const advancedPosts = BLOG_POSTS.filter(post => post.difficulty === 'Advanced');
        expect(screen.getByText(`${advancedPosts.length} article${advancedPosts.length !== 1 ? 's' : ''} found`)).toBeInTheDocument();
      });
    });

    it('shows search results with highlighting', async () => {
      renderBlog();
      const searchInput = screen.getByPlaceholderText('Search articles, authors, topics...');
      
      fireEvent.change(searchInput, { target: { value: 'engineering' } });
      
      await waitFor(() => {
        expect(screen.getByText('Search Results')).toBeInTheDocument();
      });
    });
  });

  describe('Trending Articles', () => {
    it('displays trending articles section', () => {
      renderBlog();
      expect(screen.getByText('Trending Articles')).toBeInTheDocument();
      expect(screen.getByText('Hot')).toBeInTheDocument();
    });

    it('shows trending indicators on articles', () => {
      renderBlog();
      const trendingBadges = screen.getAllByText('Trending');
      expect(trendingBadges.length).toBeGreaterThan(0);
    });

    it('displays view counts and engagement metrics', () => {
      renderBlog();
      // Should show view counts like "15.4K views"
      expect(screen.getByText(/views/)).toBeInTheDocument();
      expect(screen.getByText(/shares/)).toBeInTheDocument();
      expect(screen.getByText(/engagement/)).toBeInTheDocument();
    });
  });

  describe('Content Discovery', () => {
    it('shows different content when searching vs browsing', async () => {
      renderBlog();
      
      // Initially should show trending articles
      expect(screen.getByText('Trending Articles')).toBeInTheDocument();
      
      // When searching, trending should be hidden
      const searchInput = screen.getByPlaceholderText('Search articles, authors, topics...');
      fireEvent.change(searchInput, { target: { value: 'test' } });
      
      await waitFor(() => {
        expect(screen.queryByText('Trending Articles')).not.toBeInTheDocument();
        expect(screen.getByText('Search Results')).toBeInTheDocument();
      });
    });

    it('shows category-specific content when filtering', () => {
      renderBlog();
      
      // Click on a category filter (when not searching)
      const tutorialButton = screen.getAllByText('Tutorials')[0]; // Get the filter button
      fireEvent.click(tutorialButton);
      
      expect(screen.getByText('Tutorials')).toBeInTheDocument();
    });
  });

  describe('Bookmark Functionality', () => {
    it('renders bookmark buttons on article cards', () => {
      renderBlog();
      const bookmarkButtons = screen.getAllByLabelText(/bookmark/i);
      expect(bookmarkButtons.length).toBeGreaterThan(0);
    });

    it('toggles bookmark state when clicked', async () => {
      renderBlog();
      const bookmarkButton = screen.getAllByLabelText('Add bookmark')[0];
      
      fireEvent.click(bookmarkButton);
      
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalled();
      });
    });

    it('prevents event propagation when clicking bookmark', () => {
      renderBlog();
      const bookmarkButton = screen.getAllByLabelText('Add bookmark')[0];
      
      // Mock the parent link click
      const parentElement = bookmarkButton.closest('a');
      const clickSpy = vi.fn();
      if (parentElement) {
        parentElement.addEventListener('click', clickSpy);
      }
      
      fireEvent.click(bookmarkButton);
      
      // Parent link should not be triggered
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('Enhanced User Experience', () => {
    it('shows search timing information', async () => {
      renderBlog();
      const searchInput = screen.getByPlaceholderText('Search articles, authors, topics...');
      
      fireEvent.change(searchInput, { target: { value: 'prompt' } });
      
      await waitFor(() => {
        expect(screen.getByText(/ms/)).toBeInTheDocument();
      });
    });

    it('displays article count correctly', () => {
      renderBlog();
      const totalArticles = BLOG_POSTS.length;
      expect(screen.getByText(`${totalArticles} articles found`)).toBeInTheDocument();
    });

    it('shows matched fields in search results', async () => {
      renderBlog();
      const searchInput = screen.getByPlaceholderText('Search articles, authors, topics...');
      
      fireEvent.change(searchInput, { target: { value: 'engineering' } });
      
      await waitFor(() => {
        // Should show badges indicating which fields matched
        const matchBadges = screen.queryAllByText(/title|tags|content|author/);
        expect(matchBadges.length).toBeGreaterThan(0);
      });
    });

    it('handles empty search results gracefully', async () => {
      renderBlog();
      const searchInput = screen.getByPlaceholderText('Search articles, authors, topics...');
      
      fireEvent.change(searchInput, { target: { value: 'nonexistentterm12345' } });
      
      await waitFor(() => {
        expect(screen.getByText('No articles found')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('adapts layout for different screen sizes', () => {
      // Test mobile layout
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      renderBlog();
      
      // Should still render all main components
      expect(screen.getByText('Knowledge Hub')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search articles, authors, topics...')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('renders efficiently with large dataset', () => {
      const startTime = performance.now();
      renderBlog();
      const endTime = performance.now();
      
      // Should render within reasonable time (less than 100ms)
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('handles rapid search input changes', async () => {
      renderBlog();
      const searchInput = screen.getByPlaceholderText('Search articles, authors, topics...');
      
      // Rapidly change search input
      fireEvent.change(searchInput, { target: { value: 'a' } });
      fireEvent.change(searchInput, { target: { value: 'ab' } });
      fireEvent.change(searchInput, { target: { value: 'abc' } });
      
      // Should handle without errors
      await waitFor(() => {
        expect(searchInput).toHaveValue('abc');
      });
    });
  });
});
