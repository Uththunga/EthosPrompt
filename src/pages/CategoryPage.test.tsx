import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import CategoryPage from './CategoryPage';

// Mock the data to have a predictable test environment
vi.mock('../data/categories-data', () => ({
  categories: [
    {
      id: 'marketing',
      name: 'Marketing & Content',
      description: 'Test Description',
      subcategories: [
        { 
          id: 'marketing-strategy-planning', 
          name: 'Strategy & Planning', 
          description: 'Plan your marketing.',
          promptGroups: [] 
        },
      ],
    },
  ]
}));

vi.mock('../data/prompts-data', () => ({
  prompts: [
    { 
      id: 'p1', 
      categoryId: 'marketing', 
      subcategoryId: 'marketing-strategy-planning', 
      title: 'Strategy Prompt 1', 
      description: 'Desc 1', 
      prompt: 'Prompt 1',
      promptGroupId: null
    },
  ]
}));

const renderComponent = (initialRoute: string) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/categories/:id" element={<CategoryPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('CategoryPage', () => {
  beforeEach(() => {
    // Mock timers before each test
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Clean up timers after each test
    vi.useRealTimers();
  });

  test('renders loading state initially', () => {
    renderComponent('/categories/marketing');
    // Check for the skeleton loading state
    const skeletons = screen.getAllByTestId('prompt-card-skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test('displays category name after loading', async () => {
    renderComponent('/categories/marketing');
    
    // Fast-forward timers to skip loading state
    await vi.runAllTimersAsync();
    
    // Wait for the content to be loaded
    await waitFor(() => {
      expect(screen.getByText('Marketing & Content')).toBeInTheDocument();
    });
    
    // Clean up timers
    vi.runOnlyPendingTimers();
  });

  test('shows 404 for non-existent category', async () => {
    renderComponent('/categories/non-existent');
    
    // Fast-forward timers to skip loading state
    await vi.runAllTimersAsync();
    
    // Wait for the 404 content
    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
    
    // Clean up timers
    vi.runOnlyPendingTimers();
  });
});
