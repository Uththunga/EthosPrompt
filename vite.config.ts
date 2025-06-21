import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Environment variables are automatically loaded by Vite

  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      // Visualize bundle size when in analyze mode
      mode === 'analyze' && visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
    base: '/EthosPrompt/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@styles': path.resolve(__dirname, './src/styles'),
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['lucide-react'],
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: mode !== 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            // Core React libraries
            'react-vendor': ['react', 'react-dom'],
            'react-router': ['react-router-dom'],

            // UI libraries
            'ui-vendor': ['@headlessui/react', 'framer-motion'],

            // Icon library (large)
            'icons': ['lucide-react'],

            // Utility libraries
            'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          },
        },
      },
      chunkSizeWarningLimit: 500, // Reduced from 1000 to enforce smaller chunks
    },
    server: {
      port: 3000,
      open: true,
      cors: true,
    },
    preview: {
      port: 3001,
      open: true,
    },
    define: {
      'process.env': process.env,
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  };
});
