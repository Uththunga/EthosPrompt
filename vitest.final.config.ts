// vitest.final.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// Minimal but complete configuration
// Based on what we know works from our testing
export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // Using node environment for simplicity
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    reporters: 'verbose',
    testTimeout: 10000,
    open: false,
    watch: false,
    passWithNoTests: false, // Fail if no tests are found
    isolate: false, // Disable test isolation
    css: true,
    deps: {
      inline: ['@emotion/react'],
    },
    // Disable type checking for faster test execution
    typecheck: {
      enabled: false
    },
    // Disable coverage for faster test execution
    coverage: {
      enabled: false
    },
  },
  // Minimal plugins
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    })
  ],
  // Resolve aliases
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@lib', replacement: path.resolve(__dirname, 'src/lib') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
    ],
  },
});
