import './DeliveryApproach.css'

type Phase = { num: string; name: string; weeks: string; detail: string }
type Tile = { heading: string; body: string }

const PHASES: Phase[] = [
  { num: '01', name: 'Initiate', weeks: '2 weeks', detail: 'Mobilisation, kick-off, governance' },
  { num: '02', name: 'Design',   weeks: '3 weeks', detail: 'Workshops, functional & technical design' },
  { num: '03', name: 'Build',    weeks: '5 weeks', detail: 'Sprint-based configuration & QA' },
  { num: '04', name: 'Test',     weeks: '2 weeks', detail: 'UAT, data migration, sign-off' },
  { num: '05', name: 'Deploy',   weeks: '1 week + hypercare', detail: 'Go-live, training, hypercare' },
]

const TILES: Tile[] = [
  {
    heading: 'Governance',
    body: 'Weekly RAG status; weekly joint project meetings; monthly Steering Committee with Brendan McDowell. Formal stage gates at each phase boundary.',
  },
  {
    heading: 'Commercial model',
    body: 'Fixed-price implementation. Variations are managed as formal change requests with impact assessment at each stage boundary.',
  },
  {
    heading: 'Risk response',
    body: 'The multi-vendor architecture routes integration build effort to the vendors who own each platform. Vendor delivery status is tracked in weekly project governance. Commercial terms are aligned to the go-live date where possible.',
  },
]

export default function DeliveryApproach() {
  return (
    <section className="section-violet">
      <div className="wrap">
        <span className="eyebrow">Delivery approach</span>
        <h2>Five-phase PRINCE2-aligned FOCUS delivery, stage-gated to 1 July 2026</h2>
        <p style={{ maxWidth: 780, color: 'rgba(255,255,255,0.85)' }}>
          Fixed-price implementation across approximately 13 weeks plus hypercare. Variations captured formally at each stage gate. Target go-live 1 July 2026, committed by Fusion5.
        </p>

        <div className="timeline">
          {PHASES.map((p) => (
            <div key={p.num} className="phase">
              <div className="phase-num">{p.num}</div>
              <div className="phase-name">{p.name}</div>
              <div className="phase-weeks">{p.weeks}</div>
              <div className="phase-dur">{p.detail}</div>
            </div>
          ))}
        </div>

        <div className="delivery-tiles">
          {TILES.map((t) => (
            <div key={t.heading}>
              <h4>{t.heading}</h4>
              <p>{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
