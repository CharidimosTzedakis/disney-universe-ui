import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@gql": path.resolve(__dirname, "./src/gql"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@test": path.resolve(__dirname, "./src/test"),
    },
  },
  plugins: [react()],
});
