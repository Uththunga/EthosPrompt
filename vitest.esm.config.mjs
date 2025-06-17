import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // Try with node environment first
    include: ['**/*.test.{js,mjs,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
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
    // Force ESM
    transformMode: {
      web: [/.[tj]sx?$/],
    },
  },
});
