import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dod-app/',  // 👈 Required for GitHub Pages
  plugins: [react()],
});
