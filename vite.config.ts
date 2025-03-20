import path from "path"

import { defineConfig } from 'vite'



export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    cors: true
  }
})
