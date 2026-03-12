/**
 * Image compression script using sharp.
 *
 * Prerequisites:
 *   npm install --save-dev sharp
 *
 * Usage:
 *   node scripts/compress-images.mjs
 *
 * What it does:
 *   - Recursively finds all PNGs in public/images/
 *   - Skips files <= 100 KB
 *   - Re-encodes with quality=85, compressionLevel=9 (in-place)
 *   - Reports before/after file sizes
 */

import sharp from 'sharp'
import { readdir, stat, writeFile, readFile } from 'node:fs/promises'
import { join, extname } from 'node:path'

const ROOT = new URL('../public/images', import.meta.url).pathname
const MIN_SIZE_BYTES = 100 * 1024 // 100 KB

/** Recursively collect all .png files under a directory. */
async function collectPngs(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const results = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...(await collectPngs(full)))
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === '.png') {
      results.push(full)
    }
  }
  return results
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

async function main() {
  const pngs = await collectPngs(ROOT)
  console.log(`Found ${pngs.length} PNG file(s) in ${ROOT}\n`)

  let totalBefore = 0
  let totalAfter = 0
  let processed = 0
  let skipped = 0

  for (const filepath of pngs) {
    const { size: sizeBefore } = await stat(filepath)

    if (sizeBefore <= MIN_SIZE_BYTES) {
      console.log(`  SKIP  ${filepath.replace(ROOT, '')} (${formatBytes(sizeBefore)} <= 100 KB)`)
      skipped++
      continue
    }

    const input = await readFile(filepath)
    const output = await sharp(input)
      .png({ quality: 85, compressionLevel: 9 })
      .toBuffer()

    const sizeAfter = output.length
    const saved = sizeBefore - sizeAfter
    const pct = ((saved / sizeBefore) * 100).toFixed(1)

    await writeFile(filepath, output)

    totalBefore += sizeBefore
    totalAfter += sizeAfter
    processed++

    console.log(
      `  OK    ${filepath.replace(ROOT, '')} — ${formatBytes(sizeBefore)} → ${formatBytes(sizeAfter)} (saved ${formatBytes(saved)}, ${pct}%)`
    )
  }

  console.log('\n─────────────────────────────────────────')
  console.log(`Processed : ${processed} file(s)`)
  console.log(`Skipped   : ${skipped} file(s) (≤ 100 KB)`)
  if (processed > 0) {
    const totalSaved = totalBefore - totalAfter
    const totalPct = ((totalSaved / totalBefore) * 100).toFixed(1)
    console.log(`Total     : ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)} (saved ${formatBytes(totalSaved)}, ${totalPct}%)`)
  }
}

main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
