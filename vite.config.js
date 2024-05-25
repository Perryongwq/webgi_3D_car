import { defineConfig, normalizePath } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(path.resolve(__dirname, './assets') + '/[!.]*'),
          dest: normalizePath('./assets'),
        },
      ],
    }),
  ],
  server: {
    open: true,
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
})
