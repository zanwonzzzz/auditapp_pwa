import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['auditap.png'],
      manifest: {
        name: 'AuditApp',
        short_name: 'AuditApp',
        description: 'Aplicación de Auditoría',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/auditap.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/auditap.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
})
