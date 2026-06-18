import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ReactDateTimePicker'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: [
        {
          format: 'es',
          entryFileNames: 'index.esm.js',
          dir: 'dist'
        },
        {
          format: 'umd',
          name: 'ReactDateTimePicker',
          entryFileNames: 'index.umd.js',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          },
          dir: 'dist'
        }
      ]
    }
  }
})
