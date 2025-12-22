import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://mietpark-saar-pfalz.com',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    })
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
});
