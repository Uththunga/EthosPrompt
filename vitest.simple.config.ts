// vitest.simple.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Minimal configuration for testing
// This helps isolate the issue by removing potential sources of problems
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
    // Disable all transforms and plugins for minimal testing
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
  },
  // Minimal plugins
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    })
  ],
});
