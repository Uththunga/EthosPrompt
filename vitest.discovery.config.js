// vitest.discovery.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/test/**/*.test.js'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
    watch: false,
    passWithNoTests: false,
    reporters: 'verbose',
    testTimeout: 10000,
  },
});
