import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mietpark-saar-pfalz/', // WICHTIG: Name deines GitHub-Repos
  build: {
    outDir: 'dist'
  }
})
