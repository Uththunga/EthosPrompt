// Vitest CommonJS configuration
const { defineConfig } = require('vitest/config');
const path = require('path');

module.exports = defineConfig({
  test: {
    globals: true,
    environment: 'node', // Start with node environment for simplicity
    include: [
      '**/__tests__/**/*.{test,spec}.js',
      '**/*.{test,spec}.js',
      '**/test-*.js'
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/.vercel/**',
      '**/.git/**',
      '**/cypress/**',
      '**/playwright-tests/**',
      '**/e2e/**',
      '**/coverage/**',
    ],
    testTimeout: 30000,
    watch: false,
    passWithNoTests: true,
    reporters: ['default'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
