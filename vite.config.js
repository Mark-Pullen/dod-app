import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dod-app/', // ✅ MUST match repo name
  plugins: [react()],
});
