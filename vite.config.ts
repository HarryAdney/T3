import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Removed PinyVite plugin for better performance
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react-quill', 'quill', 'framer-motion', '@supabase/supabase-js'],
  },
  server: {
    port: 5173,
    host: true,
    // Enable faster HMR
    hmr: {
      overlay: false,
    },
  },
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          editor: ['react-quill', 'quill'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
});
