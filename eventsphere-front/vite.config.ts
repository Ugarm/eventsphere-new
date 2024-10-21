import {Simulate} from "react-dom/test-utils";
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import load = Simulate.load;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
    },
  }
})
