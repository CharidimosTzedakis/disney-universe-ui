import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig({
  resolve: { ...viteConfig.resolve },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: './src/test/setup.ts',
    include: [
      '**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: [
      'node_modules',
    ],
  },
});
