// @ts-check
import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue"
import icon from "astro-icon"
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    integrations: [vue(), icon()],
    vite: {
    plugins: [tailwindcss()],
  },
    
  
  
});
