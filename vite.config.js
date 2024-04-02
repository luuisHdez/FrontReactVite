import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview:{
    port: 3000,
    strictPort: true,
  },
  server:{
    port: 3000,
    strictPort: true,
    host: 'localhost',
    origin: 'http://localhost',
  },
  esbuild: {
    target: 'esnext',
    // To excecute in windows local just comment
    
    //To execute in docker container
    platform: 'linux',
  }
})
