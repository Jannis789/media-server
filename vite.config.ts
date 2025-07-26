// vite.config.ts
import { defineConfig } from 'vite';
import scssToCSSSheet from './vite-plugins/vite-plugin-scss-import';
import htmlToFragment from './vite-plugins/vite-plugin-html-import';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  plugins: [scssToCSSSheet(), htmlToFragment()],
});
