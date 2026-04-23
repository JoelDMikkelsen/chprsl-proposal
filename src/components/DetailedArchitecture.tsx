/**
 * DetailedArchitecture — modal view of the Phase 2 / Phase 3 detailed design.
 *
 * Layout mirrors Canterbury_RSL_Integration_Overview.pptx slides 3 and 5:
 *   - NetSuite card on the left, with NSAW cylinder below it
 *   - Integration Services Layer · Fusion5 Campfire block in the middle,
 *     containing Data Integrity Controls at the top, then Writers column,
 *     AWS SQS Service, and per-source Listeners column
 *   - External source cards on the right, aligned 1:1 with the listeners
 *
 * Phase 2 view shows the Phase 2 sources (SwiftPOS, Concilio, Micropay, CTB,
 * Beonic Traffic Counters) with Payments Writer and Payments Warehouse
 * Writer.
 *
 * Phase 3 view shows the Phase 3 new sources (Stripe, IGT, Humanforce,
 * Circle Scan, Intrac, eSkilled) with ERP Data Writer and Warehouse Writer,
 * plus a muted "Phase 2 existing" block under the main source list so the
 * viewer sees what's already in flight.
 */

import { useEffect } from 'react'
import './DetailedArchitecture.css'

type Phase = 2 | 3

type Props = {
  phase: Phase
  open: boolean
  onClose: () => void
}

type SourcePair = {
  external: string
  listener: string
  migrating?: boolean  // carried over from the Phase 1 CSV Integrator
}

const P2_SOURCES: SourcePair[] = [
  { external: 'MicroPay',                 listener: 'MicroPay Listener', migrating: true },
  { external: 'SwiftPOS',                 listener: 'SwiftPOS Listener', migrating: true },
  { external: 'Concilio',                 listener: 'Concilio Listener', migrating: true },
  { external: 'Beonic Traffic Counters',  listener: 'Beonic Listener' },
]

const P3_SOURCES: SourcePair[] = [
  { external: 'Stripe',      listener: 'Stripe Listener' },
  { external: 'IGT',         listener: 'IGT Listener' },
  { external: 'Humanforce',  listener: 'Humanforce Listener' },
  { external: 'Circle Scan', listener: 'Circle Scan Listener' },
  { external: 'Intrac',      listener: 'Intrac Listener' },
  { external: 'eSkilled',    listener: 'eSkilled Listener' },
]

type Writer = { label: string; dashed?: boolean }

const WRITERS_BY_PHASE: Record<Phase, Writer[]> = {
  2: [
    { label: 'Payments Writer' },
    { label: 'Payments Warehouse Writer', dashed: true },
  ],
  3: [
    { label: 'ERP Data Writer' },
    { label: 'Warehouse Writer', dashed: true },
  ],
}

export default function DetailedArchitecture({ phase, open, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  const sources = phase === 2 ? P2_SOURCES : P3_SOURCES
  const writers = WRITERS_BY_PHASE[phase]

  return (
    <div
      className="detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Phase ${phase} detailed design`}
      onClick={onClose}
    >
      <div
        className="detail-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="detail-head">
          <div>
            <span className="eyebrow" style={{ color: 'var(--f5-coral)' }}>
              Phase {phase} · Integration Solution Design
            </span>
            <h3 className="detail-title">
              Fusion5 Campfire: listeners, AWS SQS, writers, and data integrity controls
            </h3>
          </div>
          <button
            type="button"
            className="detail-close"
            onClick={onClose}
            aria-label="Close detailed design"
          >
            ×
          </button>
        </header>

        <p className="detail-lede">
          Source systems publish events into Campfire's AWS SQS queue via per-source listeners. The writer layer consumes from the queue and posts to NetSuite (ERP, via API) and NSAW (analytics warehouse). Data Integrity Controls reconcile source and destination counts weekly, with error capture and replay on any mismatch.
          {phase === 2 && ' The dashed listeners migrate from the Phase 1 Fusion5 CSV Integrator into Campfire; Beonic Traffic Counters is the one net-new source in Phase 2.'}
        </p>

        <div className="detail-canvas">
          {/* LEFT column: NetSuite + NSAW */}
          <div className="detail-left">
            <div className="detail-node detail-node--netsuite">
              <span>NetSuite</span>
            </div>
            <div className="detail-api">Update ERP via API →</div>
            <div className="detail-node detail-node--nsaw">
              <span>NetSuite Analytics Warehouse</span>
            </div>
          </div>

          {/* MIDDLE: Integration Services Layer */}
          <div className="detail-isl">
            <div className="detail-isl__header">
              Integration Services Layer · Fusion5 Campfire
            </div>

            <div className="detail-integrity">
              Data Integrity Controls<br />
              <span className="detail-integrity__sub">(Weekly Reconciliation)</span>
            </div>

            <div className="detail-isl__body">
              <div className="detail-writers">
                {writers.map((w) => (
                  <div
                    key={w.label}
                    className={`detail-writer${w.dashed ? ' detail-writer--dashed' : ''}`}
                  >
                    {w.label}
                  </div>
                ))}
              </div>

              <div className="detail-sqs">
                <div className="detail-sqs__label">
                  AWS<br />SQS<br />Service
                </div>
              </div>

              <div className="detail-listeners">
                {sources.map((s) => (
                  <div
                    key={s.listener}
                    className={`detail-listener${s.migrating ? ' detail-listener--migrating' : ''}`}
                  >
                    {s.listener}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT column: External systems */}
          <div className="detail-right">
            <div className="detail-right__tag">Phase {phase} sources</div>
            <div className="detail-externals">
              {sources.map((s) => (
                <div
                  key={s.external}
                  className={`detail-external${s.migrating ? ' detail-external--migrating' : ''}`}
                >
                  {s.external}
                </div>
              ))}
            </div>
            {phase === 2 && sources.some((s) => s.migrating) && (
              <div className="detail-migrate-legend">
                <span className="detail-migrate-swatch" /> Migrating from Phase 1 CSV Integrator
              </div>
            )}

            {phase === 3 && (
              <div className="detail-existing">
                <div className="detail-existing__tag">Phase 2 existing</div>
                <div className="detail-externals detail-externals--muted">
                  {P2_SOURCES.map((s) => (
                    <div key={s.external} className="detail-external detail-external--muted">
                      {s.external}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="detail-foot">
          Reference: Canterbury_RSL_Integration_Overview.pptx · Integration Solution Design slides. Budget ranges apply ±25% from the central estimate.
        </footer>
      </div>
    </div>
  )
}
