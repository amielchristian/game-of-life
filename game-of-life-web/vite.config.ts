import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vite.dev/config/
export default defineConfig({
  base: '/<REPO>/',
  plugins: [preact(), wasm(), topLevelAwait()],
});
