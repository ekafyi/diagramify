/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

import { svelte } from "@sveltejs/vite-plugin-svelte";

export default getViteConfig({
  plugins: [svelte()],
  // resolve: {
  //   conditions: mode === "test" ? ["browser"] : [],
  // },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["src/vitest-setup.js"],
    // deps: { inline: ["@testing-library/svelte-vitest"] },
  },
});
