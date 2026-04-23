/**
 * ExportButton — downloads the current page as a self-contained HTML file.
 *
 * Produces a snapshot: the configurator values and the selected architecture
 * phase at the moment of export are baked into the file. The exported HTML
 * is static (no React, no event handlers), so interactive controls render
 * but don't recompute. That's intentional for a proposal document — Joel
 * sets the configurator to the agreed numbers, exports, and Brendan reads
 * what he's meant to read.
 *
 * Strategy:
 *   1. Clone documentElement so we don't disturb the live page.
 *   2. Walk document.styleSheets, collect all readable CSS rules (Vite's
 *      bundled CSS is same-origin and readable; Google Fonts is cross-origin
 *      and not readable, but its <link> is preserved so it still loads).
 *   3. Inline the collected CSS as a <style> in the clone's head.
 *   4. Strip <script> tags — the export is static.
 *   5. Remove the export button itself from the clone.
 *   6. Serialize with doctype, wrap in a Blob, trigger <a download>.
 */

import { useState } from 'react'
import './ExportButton.css'

const EXPORT_FILENAME = 'CHPRSL_Fusion5_Proposal.html'

function collectInlineCss(): string {
  const parts: string[] = []
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const rules = sheet.cssRules
      if (!rules) continue
      for (const rule of Array.from(rules)) {
        parts.push(rule.cssText)
      }
    } catch {
      // Cross-origin sheet (e.g. Google Fonts). Skip — its <link> stays
      // in the clone so the browser fetches it at view time.
    }
  }
  return parts.join('\n')
}

async function exportHTML(): Promise<void> {
  // 1. Clone the root.
  const clone = document.documentElement.cloneNode(true) as HTMLElement

  // 2. Gather inlineable CSS from the live document.
  const inlinedCss = collectInlineCss()

  // 3. Remove same-origin <link rel="stylesheet"> tags from the clone,
  //    since their contents are now inlined. Leave cross-origin links
  //    (Google Fonts) in place so fonts still load when viewed online.
  const origin = window.location.origin
  clone.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    const href = link.getAttribute('href') ?? ''
    try {
      const absolute = new URL(href, window.location.href).origin
      if (absolute === origin) link.remove()
    } catch {
      link.remove()
    }
  })

  // 4. Inject inlined CSS as a <style> element in the clone's head.
  const head = clone.querySelector('head')
  if (head) {
    const style = document.createElement('style')
    style.textContent = inlinedCss
    head.appendChild(style)
  }

  // 5. Strip scripts — the export is static.
  clone.querySelectorAll('script').forEach((el) => el.remove())

  // 6. Remove the export control itself from the clone.
  clone.querySelectorAll('[data-export-root]').forEach((el) => el.remove())

  // 7. Freeze the current values of every form control by writing them
  //    into the markup (otherwise React's controlled inputs serialize
  //    without the current value, since it's held in state not the DOM).
  const liveInputs = document.querySelectorAll<HTMLInputElement>('input, select, textarea')
  const cloneInputs = clone.querySelectorAll<HTMLInputElement>('input, select, textarea')
  liveInputs.forEach((live, i) => {
    const dup = cloneInputs[i]
    if (!dup) return
    if (live.tagName === 'SELECT') {
      const cloneSelect = dup as unknown as HTMLSelectElement
      cloneSelect.setAttribute('data-value', (live as unknown as HTMLSelectElement).value)
      Array.from(cloneSelect.options).forEach((opt) => {
        opt.removeAttribute('selected')
        if (opt.value === (live as unknown as HTMLSelectElement).value) {
          opt.setAttribute('selected', 'selected')
        }
      })
    } else if (live.type === 'checkbox' || live.type === 'radio') {
      if (live.checked) dup.setAttribute('checked', 'checked')
      else dup.removeAttribute('checked')
    } else {
      dup.setAttribute('value', live.value)
    }
  })

  // 8. Serialize and download.
  const html = `<!doctype html>\n${clone.outerHTML}`
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = EXPORT_FILENAME
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  // Defer revoke so the browser has a moment to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function ExportButton() {
  const [state, setState] = useState<'idle' | 'working' | 'done'>('idle')

  const handleClick = async () => {
    if (state === 'working') return
    setState('working')
    try {
      await exportHTML()
      setState('done')
      setTimeout(() => setState('idle'), 1800)
    } catch (err) {
      console.error('Export failed:', err)
      setState('idle')
    }
  }

  return (
    <div data-export-root className="export-root">
      <button
        type="button"
        className="export-btn"
        onClick={handleClick}
        aria-label="Export page as standalone HTML"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>
          {state === 'working' ? 'Exporting…' : state === 'done' ? 'Downloaded' : 'Export to HTML'}
        </span>
      </button>
    </div>
  )
}
