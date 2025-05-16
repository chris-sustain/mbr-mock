import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'sass';

export default defineConfig({
  plugins: [
    react(),
  ],

  resolve: {
    alias: {
      src: '/src'
    },
    preserveSymlinks: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass
      }
    },
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]'
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    exclude: ['**/node_modules/**', 'automation'],
    css: true,
    pool: 'forks'
  },
  assetsInclude: ['**/*.docx']
});
