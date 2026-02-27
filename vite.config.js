import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Guia_4_ContextAPI_y_Reducers/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
