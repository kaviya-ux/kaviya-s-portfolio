// GitHub Pages serves 404.html for unknown paths, so the legal pages
// (/legal, /privacy) still load the single-page app.
import { copyFileSync } from 'node:fs'

copyFileSync('dist/index.html', 'dist/404.html')
