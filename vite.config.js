import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ReactDateTimePicker',
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: [
        {
          format: 'es',
          entryFileNames: 'index.js'
        },
        {
          format: 'umd',
          name: 'ReactDateTimePicker',
          entryFileNames: 'index.umd.js',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          }
        }
      ]
    }
  }
})
