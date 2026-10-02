import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import type { IncomingMessage, ServerResponse } from 'http'

// Map of photo key -> relative path inside /public
const PHOTO_KEY_TO_PATH: Record<string, string> = {
  'main-us':   'images/main-us.jpg',
  'song-cover':'images/song-cover.jpg',
  // Memories
  'mem-01': 'images/memories/first-meeting.jpg',
  'mem-02': 'images/memories/first-hug.jpg',
  'mem-03': 'images/memories/alibagh.jpg',
  'mem-04': 'images/memories/hanuman-tikdi.jpg',
  'mem-05': 'images/memories/birthday.jpg',
  'mem-06': 'images/memories/symbiii.jpg',
  'mem-07': 'images/memories/first-gift.jpg',
  'mem-08': 'images/memories/at-your-place.jpg',
  // Nimu solo photos
  'nimu-01': 'images/nimu/01.jpg',
  'nimu-02': 'images/nimu/02.jpg',
  'nimu-03': 'images/nimu/03.jpg',
  'nimu-04': 'images/nimu/04.jpg',
  'nimu-05': 'images/nimu/05.jpg',
  'nimu-06': 'images/nimu/06.jpg',
  // Us photos
  'us-01': 'images/us/01.jpg',
  'us-02': 'images/us/02.jpg',
  'us-03': 'images/us/03.jpg',
  'us-04': 'images/us/04.jpg',
  'us-05': 'images/us/05.jpg',
  'us-06': 'images/us/06.jpg',
  'us-07': 'images/us/07.jpg',
  'us-08': 'images/us/08.jpg',
}

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

// Vite plugin to handle photo-save API requests
function photoSavePlugin() {
  return {
    name: 'photo-save-api',
    configureServer(server: { middlewares: { use: (fn: (req: IncomingMessage, res: ServerResponse, next: () => void) => void) => void }; config: { root: string } }) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.url !== '/api/save-photo' || req.method !== 'POST') {
          return next()
        }

        try {
          const body = await readBody(req)
          const { key, dataUrl } = JSON.parse(body.toString()) as { key: string; dataUrl: string }

          if (!key || !dataUrl) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'Missing key or dataUrl' }))
            return
          }

          const relPath = PHOTO_KEY_TO_PATH[key]
          if (!relPath) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: `Unknown photo key: ${key}` }))
            return
          }

          // Decode base64 data URL → binary buffer
          const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '')
          const imgBuffer = Buffer.from(base64Data, 'base64')

          const absolutePath = path.join(server.config.root, 'public', relPath)
          fs.mkdirSync(path.dirname(absolutePath), { recursive: true })
          fs.writeFileSync(absolutePath, imgBuffer)

          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ ok: true, savedTo: relPath }))
        } catch (err) {
          console.error('[photo-save-api] Error:', err)
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Internal server error' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), photoSavePlugin()],
})
