import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// A user site (itsApurba.github.io) is served from the domain root, so the
// default base of "/" is correct.
export default defineConfig({
  plugins: [react()],
  build: {
    // Keep images as separate files: inlining small ones as base64 would put
    // them in the JavaScript bundle and the page twice.
    assetsInlineLimit: 0,
  },
  test: {
    environment: "node",
  },
});
