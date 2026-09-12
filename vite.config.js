import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load .env / .env.[mode] without requiring a VITE_ prefix.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // Serve from the domain root (medlem.d-sektionen.se / custom domain via
    // static/CNAME on GitHub Pages).
    base: "/",
    publicDir: "static",
    plugins: [react()],
    css: {
      modules: {
        // Export class names as written and as camelCase. Vite's default
        // ("camelCaseOnly") lowercases e.g. `.Error` which breaks imports that
        // rely on the original casing; with "camelCase" the as-written name is
        // available on the default export object.
        localsConvention: "camelCase",
      },
      preprocessorOptions: {
        scss: {
          // Silence deprecation warnings about @import
          silenceDeprecations: ["import"],
        },
      },
    },
    server: {
      port: 4000,
    },
    // Make BASE_URL from the env file available to client code.
    // By default, Vite only exposes env vars prefixed with VITE_ to client code, but we want
    // to use BASE_URL without the prefix.
    define: {
      "process.env.BASE_URL": JSON.stringify(
        env.BASE_URL || "https://backend.d-sektionen.se",
      ),
    },
    build: {
      // All the app's JS is built into a single file which exceeds Vite's default chunk size warning limit of 500kb.
      chunkSizeWarningLimit: 1500,
    },
  };
});
