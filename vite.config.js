import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// A user site (itsApurba.github.io) is served from the domain root, so the
// default base of "/" is correct.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
  },
});
