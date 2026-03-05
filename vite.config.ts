import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath, URL } from 'node:url';

const resolvePath = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@components': resolvePath('./src/components'),
      '@assets': resolvePath('./src/assets'),
      '@features': resolvePath('./src/features'),
      '@hooks': resolvePath('./src/hooks'),
      '@pages': resolvePath('./src/pages'),
      '@services': resolvePath('./src/services'),
      '@styles': resolvePath('./src/styles'),
      '@data': resolvePath('./src/data'),
      '@common': resolvePath('./src/common')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@styles/utils/variables' as *;
          @use '@styles/utils/mixins' as *;
        `
      }
    }
  }
});
