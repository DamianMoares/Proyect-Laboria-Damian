import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    },
    // Base path dinámico según plataforma:
    // - GitHub Pages: VITE_BASE_PATH=/Proyect-Laboria-Damian/
    // - Netlify: VITE_BASE_PATH=/
    // - Local: usa '/' por defecto
    base: env.VITE_BASE_PATH || '/',
  };
});
