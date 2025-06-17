import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  test: {
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
    environment: 'jsdom',
    include: [
      '**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}',
      '**/*.{test,spec}.{js,jsx,ts,tsx}',
      '**/test-*.{js,jsx,ts,tsx}',
      '**/test/**/*.{test,spec}.{js,jsx,ts,tsx}',
      'src/**/*.{test,spec}.{js,jsx,ts,tsx}'
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
    hookTimeout: 10000,
    watch: false,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    passWithNoTests: true,
    logHeapUsage: true,
    logHeapUsageDetails: true,
    isolate: true,
    reporters: ['default', 'verbose'],
    setupFiles: ['./vitest.setup.js'],
    testMatch: ['**/*.test.{js,jsx,ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      // Add any necessary aliases here
      '@': path.resolve(__dirname, './src'),
    },
  },
});
