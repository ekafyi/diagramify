/// <reference types="astro/client" />

/**
 * https://vitejs.dev/guide/env-and-mode#intellisense-for-typescript
 */
interface ImportMetaEnv {
  readonly GOOGLE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
