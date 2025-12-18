import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Odisea-Digital-pagina-web-educativa-TypeScript-Node.js-Express-HTML5-CSS3/',
  // Directorio donde está el código
  root: 'src',
  build: {
    // Donde se guardará la versión final lista para internet
    outDir: '../dist',
    // Elimina todo lo que no se use para que pese menos (Tree shaking)
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, // Quita los "console.log" para ahorrar espacio
        dead_code: true,    // Borra código que no sirve
      },
    },
    // Crea nombres con "hashes" (ej: main.a1b2c3.js) para el cache
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
      },
    },
  },
  // Optimización para celulares: carga solo lo necesario
  server: {
    open: true,
  },
});