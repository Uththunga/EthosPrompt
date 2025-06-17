// vitest.classic-jsx.config.ts
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
    server: {
      deps: {
        inline: ['@emotion/react']
      }
    },
    deps: {
      optimizer: {
        web: {
          include: ['@emotion/react']
        }
      }
    },
    // Force classic runtime for JSX
    alias: [
      {
        find: /^react$/,
        replacement: 'react/cjs/react.development.js'
      },
      {
        find: /^react-dom$/,
        replacement: 'react-dom/cjs/react-dom.development.js'
      }
    ]
  },
  plugins: [
    react({
      // Force classic runtime
      jsxRuntime: 'classic',
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    })
  ]
});
