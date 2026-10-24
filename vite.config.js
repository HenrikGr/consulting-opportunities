import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import packageJson from './package.json';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'consultingOpportunities',
      filename: 'consultingOpportunitiesEntry.js',
      exposes: { './FeatureButton': './src/FeatureButton.jsx' },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true } },
    }),
  ],
  define: {
    __REMOTE_VERSION__: JSON.stringify(packageJson.version),
  },
  build: { target: 'esnext', outDir: 'dist', emptyOutDir: true },
  server: { port: 5001, strictPort: true },
  preview: { port: 5001, strictPort: true },
});
