// vitest.minimal-working.config.ts
import { defineConfig } from 'vitest/config';

// Minimal working configuration based on our testing
export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // Using node environment for simplicity
    setupFiles: [], // No setup files for minimal test
    include: ['**/*.test.js'], // Only include .test.js files
    exclude: ['**/node_modules/**', '**/dist/**'],
    reporters: 'verbose',
    testTimeout: 5000,
    open: false,
    watch: false,
    passWithNoTests: false, // Fail if no tests are found
    isolate: false, // Disable test isolation
    css: false, // Disable CSS processing
    typecheck: {
      enabled: false // Disable type checking
    },
    coverage: {
      enabled: false // Disable coverage
    },
  },
  // No plugins for minimal test
  plugins: []
});
