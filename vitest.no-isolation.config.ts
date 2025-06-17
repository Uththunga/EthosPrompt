// vitest.no-isolation.config.ts
import { defineConfig } from 'vitest/config';

// Configuration with test isolation and threading disabled
export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // Use node environment for simplicity
    include: ['**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    watch: false,
    passWithNoTests: false, // Fail if no tests are found
    reporters: 'verbose',
    testTimeout: 10000,
    
    // Disable test isolation and threading
    isolate: false,
    threads: false,
    
    // Disable coverage for faster execution
    coverage: {
      enabled: false
    },
    
    // Disable type checking for faster execution
    typecheck: {
      enabled: false
    }
  },
  // No plugins to minimize potential issues
  plugins: []
});
