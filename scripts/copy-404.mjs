/**
 * Copies the built index.html to 404.html so that unknown paths on static
 * hosts (e.g. GitHub Pages) serve the SPA entry point, letting React Router
 * render the correct route (deep links / direct navigation).
 */
import { copyFileSync, existsSync } from 'node:fs'

if (!existsSync('dist/index.html')) {
  console.error('dist/index.html not found. Run `vite build` first.')
  process.exit(1)
}

copyFileSync('dist/index.html', 'dist/404.html')
console.log('Copied dist/index.html -> dist/404.html (SPA fallback).')
