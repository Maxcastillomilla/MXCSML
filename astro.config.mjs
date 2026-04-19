// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages: el sitio vive en username.github.io/MXCSML
  site: 'https://Maxcastillomilla.github.io',
  base: '/MXCSML',
  // Trailing slash evita el redirect 301 de GitHub Pages en links de proyectos
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});