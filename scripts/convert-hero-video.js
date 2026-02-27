#!/usr/bin/env node
/**
 * Converts the hero background video from .mov to .mp4 for browser compatibility.
 * Requires ffmpeg: brew install ffmpeg (Mac) or install from https://ffmpeg.org
 *
 * Run: node scripts/convert-hero-video.js
 * Output: public/hero-bg.mp4 (used by the hero section)
 */

const { execSync } = require('node:child_process')
const path = require('node:path')
const fs = require('node:fs')

const projectRoot = path.join(__dirname, '..')
const movPath = path.join(
  projectRoot,
  'public',
  'electric-trolleys-of-the-traditional-vintage-yello-2026-01-22-02-18-14-utc.mov'
)
const mp4Path = path.join(projectRoot, 'public', 'hero-bg.mp4')

if (!fs.existsSync(movPath)) {
  console.error('Source video not found:', movPath)
  console.error('Place your .mov file at public/electric-trolleys-of-the-traditional-vintage-yello-2026-01-22-02-18-14-utc.mov')
  process.exit(1)
}

try {
  execSync(
    `ffmpeg -i "${movPath}" -c:v libx264 -c:a aac -movflags +faststart -y "${mp4Path}"`,
    { stdio: 'inherit' }
  )
  console.log('Done. Hero video saved to public/hero-bg.mp4')
} catch (e) {
  console.error('Conversion failed. Is ffmpeg installed? Try: brew install ffmpeg')
  process.exit(1)
}
