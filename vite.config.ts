import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env variables if you need them in Vite config
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()]
  };
});
