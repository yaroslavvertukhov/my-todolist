import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/my-todolist",
  plugins: [react()],
  // @ts-ignore
  test: {
    environment: 'happy-dom',
  }
})
