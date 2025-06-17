// Minimal Vitest configuration (CommonJS)
const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.js', '**/*.test.cjs'],
    testTimeout: 30000,
    // Disable threads to avoid worker issues
    threads: false,
    // Disable isolation for better compatibility
    isolate: false,
  },
});
