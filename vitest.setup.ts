// vitest.setup.ts
import { expect, vi, beforeAll } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { configure } from '@testing-library/react';

// Extend Vitest's expect with Jest DOM matchers
expect.extend(matchers);

// Configure test-id attribute for React Testing Library
configure({ testIdAttribute: 'data-testid' });

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn((event: Event) => false),
  })),
});

// Mock ResizeObserver
class ResizeObserverStub {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

// Add type declaration for ResizeObserver
declare global {
  interface Window {
    ResizeObserver: typeof ResizeObserverStub;
  }
}

// Setup mocks before tests
beforeAll(() => {
  window.ResizeObserver = ResizeObserverStub;
});
