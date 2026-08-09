import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fileURLToPath from 'url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/*.mp3', '**/*.jpg', '**/*.png', '**/*.mp4', '**/.git/**'],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath ? new URL('./src', import.meta.url).pathname : './src',
    },
  },
});
