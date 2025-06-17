// @ts-check
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.js'],
    testTimeout: 30000,
    hookTimeout: 10000,
    watch: false,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    passWithNoTests: true,
    logHeapUsage: true,
    isolate: true,
    reporters: ['default'],
  },
});
