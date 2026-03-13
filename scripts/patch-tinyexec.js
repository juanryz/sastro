import fs from 'node:fs'
import path from 'node:path'

const pkgDir = path.join(process.cwd(), 'node_modules', 'tinyexec', 'dist')
const src = path.join(pkgDir, 'main.mjs')
const dest = path.join(pkgDir, 'main.js')

try {
  if (!fs.existsSync(src)) {
    console.warn('tinyexec patch: source file not found', src)
    process.exit(0)
  }

  if (!fs.existsSync(dest)) {
    fs.copyFileSync(src, dest)
    console.log('tinyexec patch: created main.js from main.mjs')
  } else {
    console.log('tinyexec patch: main.js already exists')
  }
} catch (error) {
  console.error('tinyexec patch failed:', error)
  process.exit(1)
}
