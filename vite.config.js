import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import packageJson from './package.json';

const federationName = packageJson.name.replace(/[-_.\s]+(.)?/g, (_, character) =>
  character ? character.toUpperCase() : '',
);

export default defineConfig({
  // Release builds use absolute, versioned GitHub Release URLs for the entry and its chunks.
  // Local builds keep relative URLs so artifacts can still be served from a local directory.
  base: process.env.VITE_REMOTE_ASSET_BASE_URL ?? './',
  plugins: [
    react(),
    federation({
      name: federationName,
      filename: `${federationName}Entry.js`,
      exposes: { './FeatureButton': './src/FeatureButton.jsx' },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  define: {
    __REMOTE_VERSION__: JSON.stringify(packageJson.version),
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: '',
    rollupOptions: {
      output: {
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
      },
    },
  },
  server: { port: 5001, strictPort: true },
  preview: { port: 5001, strictPort: true },
});
