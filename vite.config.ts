import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Base './' makes this work at any URL path — important since the BinAI portal
// embeds this app via iframe and the deployed Cloudflare Pages URL can vary.
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Use Sass's modern API (the legacy one is deprecated in Sass 2.0).
        api: 'modern',
        // Auto-inject design tokens + mixins into every .scss file
        additionalData: `@use "@/styles/_tokens.scss" as *; @use "@/styles/_mixins.scss" as *;`,
      },
    },
  },
});