#!/usr/bin/env node
// Synchronisiert die öffentlichen Workshops aus MentiPlanner (plan.kidslab.de)
// nach content/kurse/workshops/<slug>/index.md.
//
// - Pro Workshop ein Page Bundle (Seite + Bild). Zuordnung über die MentiPlanner-ID,
//   der Ordner bleibt auch bei Namensänderung gleich (stabile URLs).
// - Der Bereich zwischen den mentiplanner-Markern wird bei jedem Lauf überschrieben,
//   alles unterhalb von MARKER_END bleibt erhalten (z.B. Galerie, Fotos).
// - Workshops ohne kommende Termine oder die nicht mehr im Feed sind, werden
//   archiviert (nie gelöscht). Letzter Stand liegt in data/mentiplanner/<id>.json.
//
// Aufruf: node .github/scripts/sync-workshops.mjs [--feed datei.json]

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const CONTENT_DIR = path.join(ROOT, 'content/kurse/workshops')
const SNAPSHOT_DIR = path.join(ROOT, 'data/mentiplanner')
const FEED_URL = process.env.MENTIPLANNER_EXPORT_URL || 'https://plan.kidslab.de/api/widget/export'

const MARKER_START = '<!-- mentiplanner:start – wird automatisch überschrieben, Änderungen in MentiPlanner machen -->'
const MARKER_END = '<!-- mentiplanner:end – eigene Inhalte (Fotos, Galerie, …) unterhalb dieser Zeile -->'
const IMAGE_EXT = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif' }

async function loadFeed() {
  const i = process.argv.indexOf('--feed')
  if (i !== -1) return JSON.parse(await fs.readFile(process.argv[i + 1], 'utf8'))
  const res = await fetch(FEED_URL)
  if (!res.ok) throw new Error(`Feed ${FEED_URL}: HTTP ${res.status}`)
  const feed = await res.json()
  if (!Array.isArray(feed.workshops)) throw new Error('Feed hat kein workshops-Array')
  return feed
}

async function readJson(file) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'))
  } catch {
    return null
  }
}

async function writeIfChanged(file, content) {
  const old = await fs.readFile(file).catch(() => null)
  const buf = Buffer.isBuffer(content) ? content : Buffer.from(content)
  if (old && old.equals(buf)) return false
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, buf)
  return true
}

// Einfache Markdown-Entfernung für die Meta-Description
function plainText(md, max = 160) {
  const text = (md || '')
    .replace(/^#+\s*/gm, '')
    .replace(/\*\*?|__?|`/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= max) return text
  return text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'
}

function formatPrice(cents) {
  if (!cents) return 'kostenlos'
  return (cents / 100).toLocaleString('de-DE', { minimumFractionDigits: 2 }) + ' €'
}

// YAML-Werte als JSON schreiben – gültiges YAML, ohne Escaping-Probleme
const y = (v) => JSON.stringify(v)

function frontMatter(ws, snap, archived) {
  const offers = archived ? [] : ws.upcoming
  const next = offers[0]?.dates[0]?.date ?? null
  const lines = [
    '---',
    '# Automatisch erzeugt von .github/scripts/sync-workshops.mjs – Änderungen in MentiPlanner machen',
    `title: ${y(ws.name)}`,
    `description: ${y(plainText(ws.shortDescription || ws.description))}`,
    `date: ${y(snap.firstSeen)}`,
    `lastmod: ${y(ws.updatedAt)}`,
    `mentiplanner_id: ${y(ws.id)}`,
    `booking_url: ${y(ws.bookingUrl)}`,
    `preis: ${y(formatPrice(ws.priceCents))}`,
    `dauer: ${y(`${ws.durationHours} Stunden`)}`,
    `ort: ${y(ws.location)}`,
    `ab_18: ${ws.isAdultWorkshop}`,
    `archiviert: ${archived}`,
    `naechster_termin: ${y(next)}`,
    `letzter_termin: ${y(snap.lastDate)}`,
  ]
  if (snap.image) {
    lines.push(`image: ${y(snap.image)}`, `images: [${y(snap.image)}]`)
  }
  if (archived) lines.push('sidebar:', '  exclude: true')
  if (offers.length === 0) {
    lines.push('termine: []')
  } else {
    lines.push('termine:')
    for (const o of offers) {
      lines.push(`  - art: ${y(o.kind)}`)
      if (o.title) lines.push(`    titel: ${y(o.title)}`)
      lines.push(`    preis: ${y(formatPrice(o.priceCents))}`)
      lines.push(`    frei: ${o.hasSpots}`)
      lines.push('    daten:')
      for (const d of o.dates) {
        lines.push(`      - datum: ${y(d.date)}`)
        lines.push(`        start: ${y(d.startTime)}`)
        if (d.endTime) lines.push(`        ende: ${y(d.endTime)}`)
        lines.push(`        ort: ${y(d.location || ws.location)}`)
      }
    }
  }
  lines.push('---')
  return lines.join('\n')
}

// Zeilenenden vereinheitlichen; H1 gibt es schon als Seitentitel, daher alle Überschriften eine Ebene tiefer
function normalizeMarkdown(md) {
  const text = (md || '').replace(/\r\n?/g, '\n').trim()
  if (!/^# /m.test(text)) return text
  return text.replace(/^(#{1,5}) /gm, '#$1 ')
}

function generatedBody(ws) {
  return [
    MARKER_START,
    '',
    '{{< workshop-termine >}}',
    '',
    normalizeMarkdown(ws.description || ws.shortDescription),
    '',
    MARKER_END,
  ].join('\n')
}

async function renderPage(dir, ws, snap, archived) {
  const file = path.join(dir, 'index.md')
  const existing = await fs.readFile(file, 'utf8').catch(() => '')
  const endIdx = existing.indexOf(MARKER_END)
  const manual = endIdx === -1 ? '\n' : existing.slice(endIdx + MARKER_END.length)
  const content = `${frontMatter(ws, snap, archived)}\n\n${generatedBody(ws)}${manual}`
  return writeIfChanged(file, content)
}

async function syncImage(dir, ws, snap) {
  if (!ws.imageUrl) return
  const res = await fetch(ws.imageUrl)
  if (!res.ok) {
    console.warn(`  Bild für ${ws.name} nicht ladbar (HTTP ${res.status})`)
    return
  }
  const type = (res.headers.get('content-type') || '').split(';')[0]
  const ext = IMAGE_EXT[type]
  if (!ext) {
    console.warn(`  Bildformat ${type} für ${ws.name} wird nicht unterstützt – bitte JPG/PNG/WebP hochladen`)
    return
  }
  const name = `${path.basename(dir)}-workshop-kinder-augsburg.${ext}`
  if (snap.image && snap.image !== name) await fs.rm(path.join(dir, snap.image), { force: true })
  if (await writeIfChanged(path.join(dir, name), Buffer.from(await res.arrayBuffer()))) {
    console.log(`  Bild aktualisiert: ${name}`)
  }
  snap.image = name
}

function latest(...dates) {
  return dates.filter(Boolean).sort().at(-1) || null
}

async function main() {
  const feed = await loadFeed()
  await fs.mkdir(SNAPSHOT_DIR, { recursive: true })
  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' })
  const seen = new Set()

  for (const ws of feed.workshops) {
    seen.add(ws.id)
    const snapFile = path.join(SNAPSHOT_DIR, `${ws.id}.json`)
    const old = await readJson(snapFile)
    const archived = ws.upcoming.length === 0
    // Keine Seite ohne Inhalt: ohne Beschreibung und ohne Termine nicht neu anlegen
    if (!old && archived && !normalizeMarkdown(ws.description || ws.shortDescription)) {
      console.log(`- ${ws.name} (keine Beschreibung, übersprungen)`)
      continue
    }
    const upcomingDates = ws.upcoming.flatMap((o) => o.dates.map((d) => d.date))
    const snap = {
      dir: old?.dir || ws.slug,
      firstSeen: old?.firstSeen || today,
      image: old?.image || null,
      // Letzter bekannter Termin, auch wenn er inzwischen vergangen ist
      lastDate: latest(ws.lastDate, old?.lastDate, archived ? old?.lastUpcoming : null),
      lastUpcoming: latest(...upcomingDates, archived ? old?.lastUpcoming : null),
      workshop: ws,
    }

    const dir = path.join(CONTENT_DIR, snap.dir)
    await syncImage(dir, ws, snap)
    const changed = await renderPage(dir, ws, snap, archived)
    await writeIfChanged(snapFile, JSON.stringify(snap, null, 2) + '\n')
    console.log(`${changed ? '✎' : '='} ${ws.name}${archived ? ' (Archiv)' : ''}`)
  }

  // Nicht mehr im Feed: aus letztem Stand als archiviert neu schreiben
  for (const f of await fs.readdir(SNAPSHOT_DIR)) {
    const id = f.replace(/\.json$/, '')
    if (!f.endsWith('.json') || seen.has(id)) continue
    const snap = await readJson(path.join(SNAPSHOT_DIR, f))
    if (!snap?.workshop) continue
    snap.lastDate = latest(snap.lastDate, snap.lastUpcoming)
    const changed = await renderPage(path.join(CONTENT_DIR, snap.dir), snap.workshop, snap, true)
    await writeIfChanged(path.join(SNAPSHOT_DIR, f), JSON.stringify(snap, null, 2) + '\n')
    console.log(`${changed ? '✎' : '='} ${snap.workshop.name} (nicht mehr öffentlich → Archiv)`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
