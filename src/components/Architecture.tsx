/**
 * Architecture — solution architecture visual, horizontal three-panel flow.
 *
 * Three phases (per Canterbury_RSL_Integration_Overview.pptx):
 *   Phase 1: MVP on 1 July 2026 — Fusion5 CSV Integrator + SwiftPOS,
 *            Concilio, Micropay, with NSAW activated as data layer.
 *   Phase 2: Campfire middleware replaces the CSV Integrator and adds
 *            Beonic Traffic Counters. Indicative $92K-$154K (ex. GST,
 *            ±25%, central $123K).
 *   Phase 3: Campfire scope expands with Stripe, IGT, Humanforce,
 *            Circle Scan, Intrac, eSkilled. Indicative $83K-$139K
 *            (ex. GST, ±25%, central $111K).
 *
 * Layout pattern lifted from KleanKing's ArchitectureDiagram: hand-authored
 * grid + SVG overlay, no auto-layout library. ETL sources render as
 * flex-wrapping chips so the panel scales cleanly from 3 sources (P1) to
 * 15+ sources (P3).
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import DetailedArchitecture from './DetailedArchitecture'
import './Architecture.css'

type Phase = 1 | 2 | 3

type Vendor = {
  id: 'zudello' | 'supy' | 'revolut'
  label: string
  sub: string
}

type SourceChip = {
  id: string
  label: string
  isNew?: boolean
}

type InsidePill = {
  id: string
  label: string
  sub: string
  status: 'committed' | 'option'
}

type PhaseSpec = {
  toggle: string
  etlTag: string
  etlLabel: string
  etlSub: string
  sources: SourceChip[]
  splitHint: string
  budget?: { low: number; high: number; central: number }   // in AUD thousands, ex. GST (list)
}

const SIGNING_DISCOUNT_RATE = 0.15
const SIGNING_DEADLINE = '30 May 2026'

const VENDORS: Vendor[] = [
  { id: 'zudello', label: 'Zudello', sub: 'Procure-to-pay' },
  { id: 'supy',    label: 'Supy.io', sub: 'Stock & recipes · Option under review' },
  { id: 'revolut', label: 'Revolut', sub: 'Corporate cards' },
]

const SUITEAPP_PILLS: InsidePill[] = [
  { id: 'netasset', label: 'NetAsset',      sub: 'Native SuiteApp',                status: 'committed' },
  { id: 'shepherd', label: 'Shepherd CMMS', sub: 'Native SuiteApp · Under review', status: 'option' },
]

const BANKING_PILLS: InsidePill[] = [
  { id: 'bank-in',  label: 'Native bank feeds', sub: 'Inbound',      status: 'committed' },
  { id: 'bank-out', label: 'Bank Integration',  sub: 'Outbound ABA', status: 'committed' },
]

const P1_SOURCES: SourceChip[] = [
  { id: 'swiftpos', label: 'SwiftPOS' },
  { id: 'concilio', label: 'Concilio' },
  { id: 'micropay', label: 'Micropay' },
]

const P2_NEW_SOURCES: SourceChip[] = [
  { id: 'beonic', label: 'Beonic Traffic Counters', isNew: true },
]

const P3_NEW_SOURCES: SourceChip[] = [
  { id: 'stripe',     label: 'Stripe',      isNew: true },
  { id: 'igt',        label: 'IGT',         isNew: true },
  { id: 'humanforce', label: 'Humanforce',  isNew: true },
  { id: 'circlescan', label: 'Circle Scan', isNew: true },
  { id: 'intrac',     label: 'Intrac',      isNew: true },
  { id: 'eskilled',   label: 'eSkilled',    isNew: true },
]

const PHASES: Record<Phase, PhaseSpec> = {
  1: {
    toggle: 'Phase 1 · MVP · 1 July 2026',
    etlTag: 'Phase 1 · ETL',
    etlLabel: 'Fusion5 CSV Integrator',
    etlSub: 'Scheduled flat-file ingestion',
    sources: P1_SOURCES,
    splitHint: 'Summary + warehouse feed',
  },
  2: {
    toggle: 'Phase 2',
    etlTag: 'Phase 2 · Middleware',
    etlLabel: 'Fusion5 Campfire',
    etlSub: 'Listener · throttle · transform',
    sources: [...P1_SOURCES, ...P2_NEW_SOURCES],
    splitHint: 'Summary + detailed split',
    budget: { low: 92, high: 154, central: 123 },
  },
  3: {
    toggle: 'Phase 3',
    etlTag: 'Phase 3 · Middleware',
    etlLabel: 'Fusion5 Campfire',
    etlSub: 'Expanded integration scope',
    sources: [
      ...P1_SOURCES,
      ...P2_NEW_SOURCES.map((s) => ({ ...s, isNew: false })),
      ...P3_NEW_SOURCES,
    ],
    splitHint: 'Summary + detailed split',
    budget: { low: 83, high: 139, central: 111 },
  },
}

type Edge = {
  id: string
  d: string
  kind: 'api' | 'etl'
  delay: 0 | 1 | 2 | 3
}

type Rect = {
  left: number; right: number; top: number; bottom: number
  cx: number; cy: number; w: number; h: number
}

function measure(stage: HTMLElement, node: HTMLElement | null): Rect | null {
  if (!node) return null
  const s = stage.getBoundingClientRect()
  const b = node.getBoundingClientRect()
  return {
    left:   b.left   - s.left,
    right:  b.right  - s.left,
    top:    b.top    - s.top,
    bottom: b.bottom - s.top,
    cx:     b.left + b.width  / 2 - s.left,
    cy:     b.top  + b.height / 2 - s.top,
    w:      b.width,
    h:      b.height,
  }
}

function fmtRange(low: number, high: number): string {
  return `$${low}K – $${high}K`
}

type ArchitectureProps = {
  signByMay30: boolean
  onSignByMay30Change: (checked: boolean) => void
}

export default function Architecture({ signByMay30, onSignByMay30Change }: ArchitectureProps) {
  const [phase, setPhase] = useState<Phase>(1)
  const [detailOpen, setDetailOpen] = useState(false)

  const stageRef    = useRef<HTMLDivElement>(null)
  const netsuiteRef = useRef<HTMLDivElement>(null)
  const nsawRef     = useRef<HTMLDivElement>(null)
  const etlRef      = useRef<HTMLDivElement>(null)
  const zudelloRef  = useRef<HTMLDivElement>(null)
  const supyRef     = useRef<HTMLDivElement>(null)
  const revolutRef  = useRef<HTMLDivElement>(null)

  const [edges, setEdges] = useState<Edge[]>([])
  const [stageSize, setStageSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 })
  const [inView, setInView] = useState(false)

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const recompute = () => {
      const s = stage.getBoundingClientRect()
      const ns   = measure(stage, netsuiteRef.current)
      const nsaw = measure(stage, nsawRef.current)
      const etl  = measure(stage, etlRef.current)
      const zd   = measure(stage, zudelloRef.current)
      const sy   = measure(stage, supyRef.current)
      const rv   = measure(stage, revolutRef.current)
      if (!ns || !nsaw || !etl || !zd || !sy || !rv) return

      const nextEdges: Edge[] = []

      const apiPair = (vendor: Rect, idPrefix: string, delay: 0 | 1 | 2 | 3): Edge[] => {
        const gap = 6
        const upperY = vendor.cy - 8
        const lowerY = vendor.cy + 8
        const rightX = vendor.left - gap
        const leftX  = ns.right + gap
        return [
          { id: `${idPrefix}-out`, kind: 'api', delay,
            d: `M ${leftX} ${upperY} L ${rightX} ${upperY}` },
          { id: `${idPrefix}-in`, kind: 'api', delay,
            d: `M ${rightX} ${lowerY} L ${leftX} ${lowerY}` },
        ]
      }
      nextEdges.push(...apiPair(zd, 'zudello', 0))
      nextEdges.push(...apiPair(sy, 'supy',    1))
      nextEdges.push(...apiPair(rv, 'revolut', 2))

      // ETL → NetSuite main body
      nextEdges.push({
        id: 'etl-netsuite',
        kind: 'etl',
        delay: 0,
        d: `M ${etl.right + 6} ${ns.top + ns.h * 0.35} L ${ns.left - 6} ${ns.top + ns.h * 0.35}`,
      })

      // ETL → NSAW band
      nextEdges.push({
        id: 'etl-nsaw',
        kind: 'etl',
        delay: 1,
        d: `M ${etl.right + 6} ${nsaw.cy} L ${ns.left - 6} ${nsaw.cy}`,
      })

      setEdges(nextEdges)
      setStageSize({ w: s.width, h: s.height })
    }

    recompute()

    const ro = new ResizeObserver(recompute)
    ro.observe(stage)
    ;[netsuiteRef, nsawRef, etlRef, zudelloRef, supyRef, revolutRef].forEach((r) => {
      if (r.current) ro.observe(r.current)
    })

    return () => ro.disconnect()
  }, [phase])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setInView(true); io.disconnect() }
      }),
      { threshold: 0.2 },
    )
    io.observe(stage)
    return () => io.disconnect()
  }, [])

  const spec = PHASES[phase]

  const vendorRefFor = (id: Vendor['id']) =>
    id === 'zudello' ? zudelloRef : id === 'supy' ? supyRef : revolutRef

  return (
    <section id="architecture" className="section-alt">
      <div className="wrap">
        <span className="eyebrow">Solution architecture</span>
        <h2>Phase 1 goes live on a CSV-based integrator; Phase 2 and Phase 3 roll out Campfire middleware to widen integration scope</h2>
        <p style={{ maxWidth: 860 }}>
          NetSuite sits at the platform centre, with NetAsset and Shepherd CMMS as native SuiteApps and NSAW activated as the data layer in Phase 1. Zudello, Supy.io and Revolut integrate via vendor-supplied APIs. SwiftPOS, Concilio and Micropay feed through the Fusion5 CSV Integrator in Phase 1. Phase 2 replaces the CSV Integrator with Campfire and adds Beonic Traffic Counters. Phase 3 extends Campfire further with Stripe, IGT, Humanforce, Circle Scan, Intrac and eSkilled.
        </p>

        <div className="arch-phasetoggle" role="tablist" aria-label="Architecture phase">
          {([1, 2, 3] as const).map((p) => (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={phase === p}
              className={`arch-phasebtn${phase === p ? ' is-active' : ''}`}
              onClick={() => setPhase(p)}
            >
              {PHASES[p].toggle}
            </button>
          ))}
        </div>

        <label className="arch-discount">
          <input
            type="checkbox"
            checked={signByMay30}
            onChange={(e) => onSignByMay30Change(e.target.checked)}
          />
          <span>
            Signed by <strong>{SIGNING_DEADLINE}</strong> · 15% commercial discount applied to Phase 2 and Phase 3 integration services (plus 20% on Campfire licensing)
          </span>
        </label>

        {spec.budget && (() => {
          const factor = signByMay30 ? 1 - SIGNING_DISCOUNT_RATE : 1
          const low = Math.round(spec.budget.low * factor)
          const high = Math.round(spec.budget.high * factor)
          const central = Math.round(spec.budget.central * factor)
          return (
            <div className="arch-budget">
              <div>
                <strong>Indicative {signByMay30 ? 'discounted ' : ''}budget:</strong>{' '}
                {fmtRange(low, high)} (ex. GST, ±25% from ${central}K central estimate){signByMay30 ? ` · list ${fmtRange(spec.budget.low, spec.budget.high)}` : ''}.{' '}
                Phase 1 is costed in the commercials below.
              </div>
              <button
                type="button"
                className="arch-detailbtn"
                onClick={() => setDetailOpen(true)}
              >
                View detailed design →
              </button>
            </div>
          )
        })()}

        <div ref={stageRef} className={`arch-stage${inView ? ' arch-stage--in' : ''}`}>
          <div className="arch-row">
            {/* LEFT: ETL panel with source chips */}
            <div ref={etlRef} className="arch-etl">
              <span className="arch-tag">{spec.etlTag}</span>
              <div className="arch-etl__label">{spec.etlLabel}</div>
              <div className="arch-etl__sub">{spec.etlSub}</div>
              <div className="arch-etl__sources">
                <div className="arch-etl__sourcetag">Ingesting from</div>
                <div className="arch-chips">
                  {spec.sources.map((src) => (
                    <span
                      key={src.id}
                      className={`arch-chip${src.isNew ? ' arch-chip--new' : ''}`}
                    >
                      {src.label}
                    </span>
                  ))}
                </div>
                {spec.sources.some((s) => s.isNew) && (
                  <div className="arch-etl__legend">
                    <span className="arch-chip arch-chip--new arch-chip--mini" /> new in this phase
                  </div>
                )}
              </div>
            </div>

            {/* CENTRE: NetSuite */}
            <div ref={netsuiteRef} className="arch-netsuite">
              <div className="arch-netsuite__head">
                <span className="arch-tag arch-tag--onviolet">Platform centre</span>
                <div className="arch-netsuite__label">NetSuite</div>
                <div className="arch-netsuite__sub">Finance · Procurement · CRM · HR</div>
              </div>

              <div className="arch-insideblock">
                <div className="arch-insideblock__tag">Native SuiteApps</div>
                <div className="arch-insidepills">
                  {SUITEAPP_PILLS.map((p) => (
                    <div key={p.id} className={`arch-insidepill arch-insidepill--${p.status}`}>
                      <div className="arch-insidepill__label">{p.label}</div>
                      <div className="arch-insidepill__sub">{p.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="arch-insideblock">
                <div className="arch-insideblock__tag">Banking</div>
                <div className="arch-insidepills">
                  {BANKING_PILLS.map((p) => (
                    <div key={p.id} className={`arch-insidepill arch-insidepill--${p.status}`}>
                      <div className="arch-insidepill__label">{p.label}</div>
                      <div className="arch-insidepill__sub">{p.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div ref={nsawRef} className="arch-nsaw">
                <span className="arch-tag arch-tag--onviolet">Data layer</span>
                <span className="arch-nsaw__label">NetSuite Analytics Warehouse</span>
              </div>
            </div>

            {/* RIGHT: Vendor APIs */}
            <div className="arch-vendors">
              <div className="arch-vendors__tag">Vendor-supplied APIs</div>
              {VENDORS.map((v) => (
                <div
                  key={v.id}
                  ref={vendorRefFor(v.id)}
                  className="arch-vendor"
                >
                  <div className="arch-vendor__label">{v.label}</div>
                  <div className="arch-vendor__sub">{v.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="arch-splithint">{spec.splitHint}</div>

          <svg
            className="arch-arrows"
            viewBox={`0 0 ${stageSize.w} ${stageSize.h}`}
            width={stageSize.w}
            height={stageSize.h}
            aria-hidden="true"
          >
            <defs>
              <marker
                id="arch-arrowhead"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
              </marker>
            </defs>

            {edges.map((e) => (
              <g
                key={e.id}
                className={`arch-edge arch-edge--${e.kind} arch-edge--delay${e.delay}`}
              >
                <path
                  className="arch-line"
                  d={e.d}
                  pathLength="1"
                  markerEnd="url(#arch-arrowhead)"
                />
              </g>
            ))}
          </svg>
        </div>

        <ul className="arch-legend" aria-label="Legend">
          <li><span className="arch-legend__dot arch-legend__dot--committed" />Committed</li>
          <li><span className="arch-legend__dot arch-legend__dot--option" />Option under review</li>
          <li><span className="arch-legend__dot arch-legend__dot--api" />Vendor API (bidirectional)</li>
          <li><span className="arch-legend__dot arch-legend__dot--etl" />ETL / integration flow</li>
        </ul>
      </div>

      {(phase === 2 || phase === 3) && (
        <DetailedArchitecture
          phase={phase}
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
        />
      )}
    </section>
  )
}
