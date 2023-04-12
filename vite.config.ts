/// <reference types='vite/client' />

import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
// import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    preact(),
    // VitePWA({ registerType: 'autoUpdate' })
  ],
  build: {
    target: 'esnext',
    modulePreload: {
      polyfill: true
    }
  },
  resolve: {
    alias: {
      '@sass': path.resolve(__dirname, './src/styles/sass'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@images': path.resolve(__dirname, './src/assets/img'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/common/utils'),
      '@store': path.resolve(__dirname, './src/store'),
      '@helpers': path.resolve(__dirname, './src/common/helpers'),
      '@hooks': path.resolve(__dirname, './src/common/hooks'),
      '@reducers': path.resolve(__dirname, './src/common/reducers'),
      '@routers': path.resolve(__dirname, './src/common/routers'),
      '@common': path.resolve(__dirname, './src/common'),
    },
    conditions: ['development', 'browser'],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx'],
  },
  css: {
    postcss: './postcss.config.js',
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@sass/variables'; @import '@sass/mixins';`,
      }
    },
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'dashes'
    }
  },
  server: {
    port: 3000,
  },
})