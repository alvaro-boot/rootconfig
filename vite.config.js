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
    host: '0.0.0.0',
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'cootrapps.com',
      'www.cootrapps.com',
      '.cootrapps.com',
      'rootconfig.onrender.com',
      'testmfe.cootravir.app',
      'www.testmfe.cootravir.app',
      '.testmfe.cootravir.app',
      '.onrender.com'
    ]
  }
})
