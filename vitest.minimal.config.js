// Minimal Vitest configuration for testing React
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    include: [
      '**/minimal.test.js',
      'src/**/__tests__/**/*.test.{js,jsx,ts,tsx}'
    ],
    testTimeout: 30000,
  },
});
