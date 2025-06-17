// vitest.minimal-discovery.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // Use node environment for minimal testing
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
    // Disable all plugins
    plugins: [],
  },
  // Disable all other config overrides
  resolve: {},
  esbuild: {},
});
