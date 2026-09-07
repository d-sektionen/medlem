import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration
export default defineConfig(({ mode }) => {
  // Load .env / .env.[mode] without requiring a VITE_ prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // Serve from the domain root (medlem.d-sektionen.se / custom domain via
    // static/CNAME on GitHub Pages).
    base: '/',
    // Reuse the existing "static" folder as Vite's public directory.
    publicDir: 'static',
    plugins: [react()],
    css: {
      modules: {
        // Export class names as written and as camelCase. Vite's default
        // ("camelCaseOnly") lowercases e.g. `.Error` which breaks imports that
        // rely on the original casing; with "camelCase" the as-written name is
        // available on the default export object.
        localsConvention: 'camelCase',
      },
    },
    // The codebase historically uses JSX inside .js files (Gatsby heritage).
    // Make esbuild treat source .js files as JSX so they can be parsed and
    // transformed in production builds (plugin-react's babel pass is only
    // used during development).
    esbuild: {
      loader: 'jsx',
      include: /[/\\]src[/\\].*\.[cm]?jsx?$/,
      exclude: [],
    },
    server: {
      port: 4000,
    },
    // Make BASE_URL from the env file available to client code the same way
    // it was under Gatsby (process.env.BASE_URL).
    define: {
      'process.env.BASE_URL': JSON.stringify(
        env.BASE_URL || 'https://backend.d-sektionen.se'
      ),
    },
  }
})
