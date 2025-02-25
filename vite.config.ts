import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import stylelint from 'vite-plugin-stylelint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    stylelint({
      dev: true,
      fix: true,
      include: "src/**/*.{vue,css,scss,sass}",
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/style.scss";'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL("./src", import.meta.url)),
      pages: fileURLToPath(new URL("./src/pages", import.meta.url)),
      assets: fileURLToPath(new URL("./src/assets", import.meta.url)),
      composables: fileURLToPath(new URL("./src/composables", import.meta.url)),
      utils: fileURLToPath(new URL("./src/utils", import.meta.url)),
      interfaces: fileURLToPath(new URL("./src/interfaces", import.meta.url)),
      components: fileURLToPath(new URL("./src/components", import.meta.url)),
    },
  },
  server: {
    port: 8080,
  },
})
