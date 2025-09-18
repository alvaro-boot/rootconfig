import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 8080,
    cors: true,
    host: '0.0.0.0'
  },
  preview: {
    port: 8080,
    host: '0.0.0.0'
  }
})
