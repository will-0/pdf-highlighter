import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'

// Convert the URL to a directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

function transformWebpackIgnore() {
  return {
    name: 'transform-webpack-ignore', // this name will show up in warnings and errors
    transform(code, id) {
      // This regex looks for the specific pattern of the webpackIgnore directive
      const webpackIgnoreRegex = /\/\* webpackIgnore: true \*\//g;

      // Check if the current file contains the webpackIgnore directive
      if (webpackIgnoreRegex.test(code)) {
        // Replace the webpackIgnore directive with vite-ignore
        return code.replace(webpackIgnoreRegex, '/* @vite-ignore */');
      }
      return code;
    }
  };
}

function mockNodeModules() {
  return {
    name: 'mock-node-modules',
    resolveId(id) {
      if (id === 'canvas' || id === 'fs' || id === 'https' || id === 'http' || id === 'path2d-polyfill') {
        return id; // this signals that id will be handled by this plugin
      }
    },
    load(id) {
      if (id === 'canvas' || id === 'fs' || id === 'https' || id === 'http' || id === 'path2d-polyfill') {
        return 'export default {}'; // Replace 'canvas' with a mock or empty object
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mockNodeModules(), transformWebpackIgnore()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: "es2022",
    emptyOutDir: true,
    outDir: 'build',
    rollupOptions: {
      input: {
        pdf: path.resolve(__dirname, './pdfjs/web/viewer.html'),
      },
      output: {
        chunkFileNames: 'assets/[name].js',
      },
      external: [
        "fs",
        "https",
        "http",
        "canvas",
        "path2d-polyfill"
      ]
    },
  },
  esbuild: {
    target: "es2022"
  },
  optimizeDeps:{
    esbuildOptions: {
      target: "es2022",
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@state': path.resolve(__dirname, './src/state'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
})


