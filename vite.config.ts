import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import sass from 'sass';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true // Enables optimized SVGs for icons
      }
    }),
    nodePolyfills({
      include: ['events', 'stream', 'util', 'vm']
    })
  ],

  resolve: {
    alias: {
      '@src': '/src',
      '@components': '/src/components'
    },
    preserveSymlinks: true
  },
  css: {
    preprocessorOptions: {
      scss: {}
    },
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]'
    }
  }
});
