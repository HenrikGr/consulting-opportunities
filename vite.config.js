import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: { './FeatureButton': './src/FeatureButton.jsx' },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
  ],
  build: { target: 'esnext', outDir: 'dist', emptyOutDir: true },
  server: { port: 5001, strictPort: true },
  preview: { port: 5001, strictPort: true },
});
