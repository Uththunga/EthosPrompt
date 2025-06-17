// vitest.final-fix.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Minimal configuration based on what we know works
export default defineConfig({
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
    environment: 'node', // Use node environment for now
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
});
