import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import PinyVite from '@pinegrow/piny-vite';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    PinyVite()
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react-quill', 'quill'],
  },
});
