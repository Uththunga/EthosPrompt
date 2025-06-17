// vitest.new.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// New clean configuration based on our working minimal config
export default defineConfig({
  // No root setting to avoid path resolution issues
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
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
    css: false, // Disable CSS processing
    typecheck: {
      enabled: false // Disable type checking for now
    },
    coverage: {
      enabled: false // Disable coverage for now
    },
    deps: {
      inline: ['@emotion/react'],
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@lib', replacement: path.resolve(__dirname, 'src/lib') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
    ],
  },
});
