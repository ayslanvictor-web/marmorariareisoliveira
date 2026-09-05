import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { fileURLToPath } from 'node:url';

const project = fileURLToPath(new URL('.', import.meta.url));
const base = '/marmoraria-reis-oliveira/';

export default defineConfig({
  root: `${project}pages`,
  base,
  publicDir: `${project}public`,
  resolve: { alias: { '@': project } },
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [
    {
      name: 'github-pages-image-paths',
      enforce: 'pre',
      transform(code, id) {
        if (!id.includes('node_modules') && /\.[jt]sx?$/.test(id)) {
          return code.replace(/(["'`])\/images\//g, `$1${base}images/`);
        }
      },
    },
    react(),
  ],
  build: { outDir: `${project}docs`, emptyOutDir: true },
});
