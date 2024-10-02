import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },

  server:{
    proxy:{
      "/api": {
        target: "http://localhost:3000",
        secure:false,
      },
    },
  },
  
})
