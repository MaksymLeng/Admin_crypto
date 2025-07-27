import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import type { MinifyOptions } from 'terser';
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

const terserOptions: MinifyOptions = {
  format: {
    comments: false, // ❌ Удаляем все комменты
  },
  compress: {
    drop_console: true, // ❌ Удаляем console.log
    drop_debugger: true, // ❌ Удаляем debugger
  },
};

const config: UserConfig = {
  build: {
    minify: 'terser',
    terserOptions,
  },
  plugins: [react(), tailwindcss()]
};

export default defineConfig(config);
