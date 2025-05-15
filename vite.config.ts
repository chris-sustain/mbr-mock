import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import svgr from 'vite-plugin-svgr';
import sass from 'sass';;

export default defineConfig({
  plugins: [
    reactRouter(),
    svgr({
      svgrOptions: {
        icon: true // Enables optimized SVGs for icons
      }
    })
  ],

  resolve: {
    alias: {
      '@src': '/src',
      '@components': '/src/components',
      '@translation': '/src/translation'
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
