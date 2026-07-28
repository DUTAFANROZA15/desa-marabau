// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Ganti dengan domain asli setelah deploy (dipakai untuk sitemap.xml & canonical URL)
  site: 'https://desamarabau.example.id',
  integrations: [sitemap()],
});
