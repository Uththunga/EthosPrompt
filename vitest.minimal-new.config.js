// Vitest configuration with ES modules support
const { defineConfig } = require('vitest/config');
const path = require('path');

module.exports = defineConfig({
  // Enable ESM support
  esbuild: {
    target: 'es2020',
  },
  
  test: {
    // Global test configuration
    globals: true,
    environment: 'node',
    testTimeout: 30000,
    
    // Test file patterns
    include: [
      '**/*.test.js',
      '**/__tests__/**/*.js',
      '**/test/**/*.js',
      '**/src/**/*.test.js',
      '**/src/**/__tests__/**/*.js',
      '**/test-*/**/*.js',
      '**/test-*.js'
    ],
    
    // Exclude patterns
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/cypress/**',
      '**/playwright-tests/**',
      '**/e2e/**',
      '**/coverage/**',
    ],
    
    // Watch mode exclusions
    watchExclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**',
    ],
    
    // Performance optimizations
    threads: false,
    isolate: false,
    
    // Enable coverage reporting (to be configured later)
    coverage: {
      enabled: false, // Will be enabled in a later step
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        '**/node_modules/**',
        '**/test/**',
        '**/__tests__/**',
        '**/*.test.js',
        '**/coverage/**',
      ],
    },
  },
  
  // Module resolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Clear screen between test runs
  clearScreen: true,
});
