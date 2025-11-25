// Plugins
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import Fonts from 'unplugin-fonts/vite'
import { VitePWA } from 'vite-plugin-pwa'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify(),
    Components(),
    Fonts({
      fontsource: {
        families: [
          {
            name: 'Roboto',
            weights: [100, 300, 400, 500, 700, 900],
            styles: ['normal', 'italic'],
          },
        ],
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets:["favicon.ico", "appe-touch-icon.png"],
      manifest: {
        display: "standalone",
        display_override: ['window-controls-overlay'],
        lang: "es",
        name: "Descríbeme",
        short_name: "Descríbeme",
        description: "Diccionario inverso: te permite ingresar una definición, idea o concepto y obtener la palabra que mejor se ajusta.",
        theme_color: "#FFFFFF",
        background_color: "#FFFFFF",
        icons: [
          {
            src: "/icons/512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icons/384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "/icons/192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icons/180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/icons/152x152.png",
            sizes: "152x152",
            type: "image/png"
          },
          {
            src: "/icons/144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/icons/128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "/icons/96x96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "/icons/72x72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "/icons/64x64.png",
            sizes: "64x64",
            type: "image/png"
          },
        ],
        screenshots: [
          {
            src: "/screenshots/Desktop-1.png",
            sizes: "1920x950",
            type: "image/png",
            label: "Página de inicio",
            form_factor: "wide"
          },
          {
            src: "/screenshots/Desktop-2.png",
            sizes: "1920x950",
            type: "image/png",
            label: "Búsqueda de una descripción",
            form_factor: "wide"
          },
          {
            src: "/screenshots/Mobile-1.png",
            sizes: "386x859",
            type: "image/png",
            label: "Página de inicio",
            form_factor: "narrow"
          },
          {
            src: "/screenshots/Mobile-2.png",
            sizes: "386x859",
            type: "image/png",
            label: "Resultados de la búsqueda",
            form_factor: "narrow"
          },
          {
            src: "/screenshots/Mobile-3.png",
            sizes: "386x859",
            type: "image/png",
            label: "Información",
            form_factor: "narrow"
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['vuetify'],
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  }
})

/*
 registerType: 'autoUpdate',
      manifest: {
        name: 'My Vue PWA',
        short_name: 'VuePWA',
        theme_color: '#42b983',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
        
public/icons/
*/