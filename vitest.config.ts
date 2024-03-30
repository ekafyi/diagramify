/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

import { svelte } from "@sveltejs/vite-plugin-svelte";

export default getViteConfig({
  plugins: [svelte()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["src/vitest-setup.js"],
  },
});
