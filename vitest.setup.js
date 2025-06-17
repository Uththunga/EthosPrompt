// Setup file for Vitest + Testing Library
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Check if matchers is a module with a default export
const matchersToExtend = matchers.default || matchers;

// Extend Vitest's expect with Jest DOM matchers
if (matchersToExtend) {
  expect.extend(matchersToExtend);
} else {
  console.error('Failed to load @testing-library/jest-dom matchers');
}
