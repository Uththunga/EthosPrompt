// vitest.esbuild.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    reporters: 'verbose',
    testTimeout: 10000,
    open: false,
    watch: false,
    passWithNoTests: true,
    css: true,
    // Configure esbuild for JSX transformation
    esbuild: {
      include: /.*\.[tj]sx?$/,
      exclude: [],
      jsx: 'automatic',
      jsxImportSource: '@emotion/react',
      tsconfig: 'tsconfig.json',
    },
  },
  plugins: [
    react({
      // Disable the default React plugin's JSX transform
      jsxRuntime: 'automatic',
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  }
});
