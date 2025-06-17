// vitest.minimal.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.{js,jsx,ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    reporters: 'verbose',
  },
  plugins: [
    react()
  ]
});
