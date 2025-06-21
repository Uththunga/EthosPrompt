import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { BLOG_POSTS, getFeaturedPost } from '../../data/blog-posts';

describe('Blog Data Integration', () => {
  it('has valid blog post data structure', () => {
    expect(BLOG_POSTS).toBeDefined();
    expect(BLOG_POSTS.length).toBeGreaterThan(0);
    
    // Check first post has required fields
    const firstPost = BLOG_POSTS[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('excerpt');
    expect(firstPost).toHaveProperty('content');
    expect(firstPost).toHaveProperty('path');
    expect(firstPost).toHaveProperty('author');
    expect(firstPost).toHaveProperty('difficulty');
  });

  it('has a featured post', () => {
    const featuredPost = getFeaturedPost();
    expect(featuredPost).toBeDefined();
    expect(featuredPost?.featured).toBe(true);
  });

  it('has valid blog post paths', () => {
    BLOG_POSTS.forEach(post => {
      expect(post.path).toMatch(/^\/blog\/[a-z0-9-]+$/);
    });
  });

  it('has valid author information', () => {
    BLOG_POSTS.forEach(post => {
      expect(post.author).toHaveProperty('name');
      expect(post.author).toHaveProperty('role');
      expect(post.author).toHaveProperty('bio');
      expect(post.author.name).toBeTruthy();
      expect(post.author.role).toBeTruthy();
    });
  });

  it('has valid content structure', () => {
    BLOG_POSTS.forEach(post => {
      expect(post.content).toBeTruthy();
      expect(post.content.length).toBeGreaterThan(100); // Substantial content
      
      if (post.hasCodeExamples) {
        expect(post.content).toMatch(/```/); // Should contain code blocks
      }
      
      if (post.tableOfContents) {
        expect(post.tableOfContents.length).toBeGreaterThan(0);
        post.tableOfContents.forEach(item => {
          expect(item).toHaveProperty('id');
          expect(item).toHaveProperty('title');
          expect(item).toHaveProperty('level');
        });
      }
    });
  });

  it('has valid difficulty levels', () => {
    const validDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
    
    BLOG_POSTS.forEach(post => {
      expect(validDifficulties).toContain(post.difficulty);
    });
  });

  it('has valid categories', () => {
    const validCategories = ['tutorials', 'best-practices', 'case-studies', 'research'];
    
    BLOG_POSTS.forEach(post => {
      expect(validCategories).toContain(post.category);
    });
  });

  it('has valid tags', () => {
    BLOG_POSTS.forEach(post => {
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.tags.length).toBeGreaterThan(0);
      
      post.tags.forEach(tag => {
        expect(typeof tag).toBe('string');
        expect(tag.length).toBeGreaterThan(0);
      });
    });
  });

  it('has valid download resources when specified', () => {
    BLOG_POSTS.forEach(post => {
      if (post.hasDownloads && post.downloads) {
        expect(post.downloads.length).toBeGreaterThan(0);
        
        post.downloads.forEach(download => {
          expect(download).toHaveProperty('title');
          expect(download).toHaveProperty('description');
          expect(download).toHaveProperty('url');
          expect(download).toHaveProperty('size');
          expect(download).toHaveProperty('type');
          
          const validTypes = ['pdf', 'template', 'code', 'guide'];
          expect(validTypes).toContain(download.type);
        });
      }
    });
  });

  it('has valid SEO metadata', () => {
    BLOG_POSTS.forEach(post => {
      if (post.seoTitle) {
        expect(post.seoTitle).toContain(post.title.substring(0, 20)); // Should contain part of title
        expect(post.seoTitle).toContain('EthosPrompt'); // Should contain brand
      }
      
      if (post.seoDescription) {
        expect(post.seoDescription.length).toBeLessThanOrEqual(160); // SEO best practice
        expect(post.seoDescription.length).toBeGreaterThan(50); // Minimum meaningful length
      }
    });
  });
});
