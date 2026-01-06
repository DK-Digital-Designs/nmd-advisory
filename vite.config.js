import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  base: '/nmd-advisory-demo/', // For GitHub Pages
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        services: resolve(__dirname, 'src/services.html'),
        booking: resolve(__dirname, 'src/booking.html'),
        testimonials: resolve(__dirname, 'src/testimonials.html'),
        contact: resolve(__dirname, 'src/contact.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
});
