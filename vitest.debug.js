// Debug configuration for Vitest with React
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Enable debug logging
process.env.DEBUG = 'vite:*';

console.log('Loading vitest.debug.js configuration');

// List all test files for debugging
import { globSync } from 'glob';
const testFiles = globSync('**/*.test.{js,jsx,ts,tsx}', { ignore: 'node_modules/**' });
console.log('Found test files:', testFiles);

export default defineConfig({
  plugins: [
    react({
      // Add any necessary React plugin options here
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    include: ['**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['**/node_modules/**'],
    testTimeout: 30000,
    watch: false,
    passWithNoTests: false,
    logHeapUsage: true,
    
    // Debug options
    debug: true,
    reporters: ['verbose'],
    
    // Environment options
    environmentOptions: {
      jsdom: {
        // JSDOM specific options
        url: 'http://localhost:3000',
      },
    },
  },
  
  // Log the final resolved config
  configResolved: (config) => {
    console.log('Resolved config:', {
      test: {
        include: config.test.include,
        exclude: config.test.exclude,
        environment: config.test.environment,
      },
      plugins: config.plugins.map(p => p?.name || 'unnamed-plugin'),
    });
  },
});
