import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CategoryPage from './CategoryPage';

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}));

// Mock the difficultyUtils module
vi.mock('../../utils/difficultyUtils', () => ({
  getDifficultyLevel: (difficulty: string) => {
    if (['Very Easy', 'Easy', 'Moderate'].includes(difficulty)) return 'Beginner';
    if (['Challenging', 'Advanced'].includes(difficulty)) return 'Intermediate';
    return 'Advanced';
  }
}));

// Mock the prompts data
vi.mock('../data/prompts-data', () => ({
  prompts: [
    {
      id: '1',
      title: 'Beginner Prompt',
      difficulty: 'Easy',
      categoryId: 'marketing',
      subcategoryId: 'social-media',
      promptGroupId: 'content',
      prompt: 'This is a beginner prompt',
      description: 'A beginner level prompt',
      tags: []
    },
    {
      id: '2',
      title: 'Advanced Prompt',
      difficulty: 'Expert',
      categoryId: 'marketing',
      subcategoryId: 'social-media',
      promptGroupId: 'strategy',
      prompt: 'This is an advanced prompt',
      description: 'An advanced level prompt',
      tags: []
    }
  ]
}));

// Mock the categories data
vi.mock('../data/categories-data', () => ({
  categories: [
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Marketing related prompts',
      subcategories: [
        {
          id: 'social-media',
          name: 'Social Media',
          description: 'Social media marketing',
          promptGroups: []
        }
      ]
    }
  ]
}));

const renderComponent = (initialRoute = '/categories/marketing') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/categories/:id" element={<CategoryPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('CategoryPage', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('renders category name', async () => {
    renderComponent();
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    expect(screen.getByText('Marketing')).toBeInTheDocument();
  });

  test('filters prompts by difficulty', async () => {
    // Mock the loading delay to be immediate
    vi.useFakeTimers();
    
    // Render the component
    renderComponent();
    
    // Fast-forward through the loading state
    await act(async () => {
      vi.advanceTimersByTime(600); // 500ms loading + buffer
    });
    
    // Verify the difficulty filter section is rendered
    const difficultySection = screen.getByText('Filter by Difficulty');
    expect(difficultySection).toBeInTheDocument();
    
    // Verify all difficulty filter buttons are present
    const difficultyButtons = screen.getAllByRole('button', { 
      name: /^(Beginner|Intermediate|Advanced)$/ 
    });
    expect(difficultyButtons).toHaveLength(3);
    
    // Get the beginner button for testing
    const beginnerButton = screen.getByRole('button', { name: 'Beginner' });
    
    // Verify both prompts are visible initially
    expect(screen.getByText('Beginner Prompt')).toBeInTheDocument();
    expect(screen.getByText('Advanced Prompt')).toBeInTheDocument();
    
    // Test filtering to Beginner only
    fireEvent.click(beginnerButton);
    await act(async () => {
      vi.advanceTimersByTime(600);
    });
    
    // Check if only beginner prompt is visible
    expect(screen.getByText('Beginner Prompt')).toBeInTheDocument();
    expect(screen.queryByText('Advanced Prompt')).not.toBeInTheDocument();
    
    // Clean up fake timers
    vi.useRealTimers();
  });
});
