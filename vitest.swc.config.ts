// vitest.swc.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

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
    }
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react'
    })
  ]
});
