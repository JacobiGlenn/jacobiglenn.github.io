import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import fs from 'node:fs'

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.md': 'text/markdown',
  '.html': 'text/html',
  '.css': 'text/css',
  '.txt': 'text/plain',
}

function copyDir(src: string, dest: string) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(from, to)
    else fs.copyFileSync(from, to)
  }
}

function staticContent(): Plugin {
  const folders = ['assets', 'devProjects', 'designProjects', 'blog', 'data', 'generated']
  return {
    name: 'static-content',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0]
        const folder = folders.find((f) => url === `/${f}` || url.startsWith(`/${f}/`))
        if (!folder) return next()
        const ext = path.extname(url).toLowerCase()
        if (ext === '.json' || ext === '.md') return next()
        const rel = decodeURIComponent(url.slice(1))
        const file = path.resolve(rel)
        if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return next()
        const fileExt = path.extname(file).toLowerCase()
        res.setHeader('Content-Type', MIME[fileExt] || 'application/octet-stream')
        fs.createReadStream(file).pipe(res)
      })
    },
    closeBundle() {
      const dest = path.resolve('dist')
      for (const dir of folders) copyDir(path.resolve(dir), path.join(dest, dir))
      if (fs.existsSync('CNAME')) fs.copyFileSync('CNAME', path.join(dest, 'CNAME'))
      fs.writeFileSync(path.join(dest, '.nojekyll'), '')
      const index = path.join(dest, 'index.html')
      if (fs.existsSync(index)) fs.copyFileSync(index, path.join(dest, '404.html'))
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticContent()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  base: '/',
})
