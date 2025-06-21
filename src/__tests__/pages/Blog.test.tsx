import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Blog from '../../pages/resources/Blog';

const renderBlog = () => {
  return render(
    <BrowserRouter>
      <Blog />
    </BrowserRouter>
  );
};

describe('Blog Page', () => {
  it('renders the main heading', () => {
    renderBlog();
    expect(screen.getByText('Knowledge Hub')).toBeInTheDocument();
  });

  it('renders search functionality', () => {
    renderBlog();
    expect(screen.getByPlaceholderText('Search articles, authors, or tags...')).toBeInTheDocument();
  });

  it('renders category filters', () => {
    renderBlog();
    expect(screen.getAllByText('All Articles')).toHaveLength(2); // Button and heading
    expect(screen.getAllByText('Tutorials')).toHaveLength(4); // Button + badges in articles
    expect(screen.getAllByText('Best Practices')).toHaveLength(3); // Button + badges in articles
    expect(screen.getAllByText('Case Studies')).toHaveLength(2); // Button + badge in article
    expect(screen.getAllByText('Research Updates')).toHaveLength(2); // Button + badge in article
  });

  it('renders featured article', () => {
    renderBlog();
    expect(screen.getByText('Featured Article')).toBeInTheDocument();
    expect(screen.getByText('Advanced Prompt Engineering Patterns: Chain-of-Thought and Beyond')).toBeInTheDocument();
  });

  it('renders article grid', () => {
    renderBlog();
    expect(screen.getByText('Prompt Engineering Fundamentals: A Complete Technical Guide')).toBeInTheDocument();
    expect(screen.getByText('Production-Ready Prompt Optimization: Performance and Cost Analysis')).toBeInTheDocument();
  });

  it('filters articles by category', () => {
    renderBlog();

    // Click on Tutorials category button (first one in the filter buttons)
    const tutorialButtons = screen.getAllByText('Tutorials');
    fireEvent.click(tutorialButtons[0]); // Click the filter button

    // Should show tutorial articles
    expect(screen.getByText('Prompt Engineering Fundamentals: A Complete Technical Guide')).toBeInTheDocument();
    expect(screen.getByText('Multimodal Prompt Engineering: Text, Image, and Code Integration')).toBeInTheDocument();
  });

  it('searches articles', () => {
    renderBlog();
    
    const searchInput = screen.getByPlaceholderText('Search articles, authors, or tags...');
    fireEvent.change(searchInput, { target: { value: 'fundamentals' } });
    
    // Should show articles matching the search
    expect(screen.getByText('Prompt Engineering Fundamentals: A Complete Technical Guide')).toBeInTheDocument();
  });

  it('renders educational features', () => {
    renderBlog();
    expect(screen.getByText('New to Prompt Engineering?')).toBeInTheDocument();
    expect(screen.getByText('Featured Resources')).toBeInTheDocument();
    expect(screen.getByText('Join the Knowledge Community')).toBeInTheDocument();
  });

  it('shows difficulty badges', () => {
    renderBlog();
    expect(screen.getAllByText('Advanced')).toHaveLength(4); // Multiple articles with Advanced difficulty
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getAllByText('Intermediate')).toHaveLength(2); // Multiple articles with Intermediate difficulty
  });

  it('shows code examples and download indicators', () => {
    renderBlog();
    // These should be visible as badges or icons in the articles
    expect(screen.getAllByText('Code Examples')).toHaveLength(1); // Featured article
  });

  it('renders newsletter signup', () => {
    renderBlog();
    expect(screen.getByPlaceholderText('Enter your professional email')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });
});
