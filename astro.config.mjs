import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

const isBuild = process.argv.includes('build');

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: isBuild ? netlify() : undefined,
  vite: {
    plugins: [tailwindcss()]
  }
});