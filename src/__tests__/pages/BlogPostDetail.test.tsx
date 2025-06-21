import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import BlogPostDetail from '../../pages/BlogPostDetail';

// Mock the blog data
const mockGetPostByPath = vi.fn();
const mockGetRelatedPosts = vi.fn();

vi.mock('../../data/blog-posts', () => ({
  getPostByPath: mockGetPostByPath,
  getRelatedPosts: mockGetRelatedPosts,
  CATEGORIES: [
    { id: 'tutorials', name: 'Tutorials', icon: vi.fn() },
    { id: 'best-practices', name: 'Best Practices', icon: vi.fn() },
  ]
}));

const mockPost = {
  id: 'test-post',
  title: 'Test Blog Post',
  excerpt: 'This is a test blog post excerpt',
  content: `# Test Blog Post

This is test content with code:

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

## Section 2

More content here.`,
  date: 'December 1, 2024',
  readTime: '5 min read',
  category: 'tutorials' as const,
  tags: ['test', 'example'],
  path: '/blog/test-post',
  author: {
    name: 'Test Author',
    role: 'Test Engineer',
    avatar: '/test-avatar.jpg',
    bio: 'Test author bio'
  },
  difficulty: 'Beginner' as const,
  hasCodeExamples: true,
  hasDownloads: true,
  tableOfContents: [
    { id: 'test-blog-post', title: 'Test Blog Post', level: 1 },
    { id: 'section-2', title: 'Section 2', level: 2 }
  ],
  downloads: [
    {
      title: 'Test Resource',
      description: 'A test downloadable resource',
      url: '/test-resource.pdf',
      size: '1.0 MB',
      type: 'pdf' as const
    }
  ],
  seoTitle: 'Test Blog Post | EthosPrompt',
  seoDescription: 'Test blog post description'
};

const mockRelatedPosts = [
  {
    id: 'related-post-1',
    title: 'Related Post 1',
    path: '/blog/related-post-1',
    readTime: '3 min read'
  }
];

const renderBlogPostDetail = (slug: string = 'test-post') => {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <BlogPostDetail />
    </MemoryRouter>
  );
};

describe('BlogPostDetail', () => {
  beforeEach(() => {
    mockGetPostByPath.mockReturnValue(mockPost);
    mockGetRelatedPosts.mockReturnValue(mockRelatedPosts);
    
    // Mock document.title and meta description
    Object.defineProperty(document, 'title', {
      writable: true,
      value: ''
    });
    
    const mockMetaElement = {
      setAttribute: vi.fn()
    };
    vi.spyOn(document, 'querySelector').mockReturnValue(mockMetaElement);
  });

  it('renders blog post content correctly', () => {
    renderBlogPostDetail();
    
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test blog post excerpt')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Engineer')).toBeInTheDocument();
  });

  it('displays breadcrumb navigation', () => {
    renderBlogPostDetail();
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Back to Blog')).toBeInTheDocument();
  });

  it('shows meta information badges', () => {
    renderBlogPostDetail();
    
    expect(screen.getByText('Tutorials')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Code Examples')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('displays author information', () => {
    renderBlogPostDetail();
    
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Engineer')).toBeInTheDocument();
    expect(screen.getByText('Test author bio')).toBeInTheDocument();
  });

  it('shows publication date and read time', () => {
    renderBlogPostDetail();
    
    expect(screen.getByText('December 1, 2024')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('renders table of contents', () => {
    renderBlogPostDetail();
    
    expect(screen.getByText('Table of Contents')).toBeInTheDocument();
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('displays download resources section', () => {
    renderBlogPostDetail();
    
    expect(screen.getByText('Download Resources')).toBeInTheDocument();
    expect(screen.getByText('Test Resource')).toBeInTheDocument();
    expect(screen.getByText('A test downloadable resource')).toBeInTheDocument();
    expect(screen.getByText('1.0 MB')).toBeInTheDocument();
  });

  it('shows related articles', () => {
    renderBlogPostDetail();
    
    expect(screen.getByText('Related Articles')).toBeInTheDocument();
    expect(screen.getByText('Related Post 1')).toBeInTheDocument();
  });

  it('handles share functionality', async () => {
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });

    renderBlogPostDetail();
    
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);
    
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('redirects to blog page when post not found', () => {
    mockGetPostByPath.mockReturnValue(null);

    renderBlogPostDetail('non-existent-post');

    // Should redirect to blog page (tested via Navigate component)
    expect(mockGetPostByPath).toHaveBeenCalledWith('/blog/non-existent-post');
  });

  it('sets page title and meta description', () => {
    renderBlogPostDetail();
    
    expect(document.title).toBe('Test Blog Post | EthosPrompt');
    expect(document.querySelector).toHaveBeenCalledWith('meta[name="description"]');
  });

  it('renders code blocks with syntax highlighting', () => {
    renderBlogPostDetail();
    
    // Check if code content is present (syntax highlighter component)
    expect(screen.getByText(/def hello_world/)).toBeInTheDocument();
    expect(screen.getByText(/print\("Hello, World!"\)/)).toBeInTheDocument();
  });

  it('handles scroll spy for table of contents', () => {
    // Mock window.scrollY and element.offsetTop
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 100
    });

    const mockElement = {
      offsetTop: 50
    };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);

    renderBlogPostDetail();
    
    // Trigger scroll event
    fireEvent.scroll(window);
    
    // Verify scroll spy functionality (active section highlighting)
    expect(document.getElementById).toHaveBeenCalled();
  });
});
