import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'demo',
  resolve: {
    alias: {
      'glass-alert-animation': path.resolve(__dirname, '../src/index.ts'),
    },
  },
  server: {
    port: 3000,
  },
});
