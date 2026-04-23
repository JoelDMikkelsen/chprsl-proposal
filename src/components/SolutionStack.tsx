type Card = {
  ico: string
  title: string
  body: React.ReactNode
}

const CARDS: Card[] = [
  {
    ico: '◎',
    title: 'NetSuite ERP',
    body: (
      <><strong>SuiteSuccess Financials First Standard</strong>. Multi-entity consolidation, GL, AP/AR, banking, fixed-asset ledger, reporting. Native AI (MCP, exception management, NetSuite Expert) included at no extra cost.</>
    ),
  },
  {
    ico: '↔',
    title: 'Zudello',
    body: (
      <>End-to-end <strong>procure-to-pay</strong>: supplier onboarding, POs, goods receipting, 3-way matching, AP capture, DOA approvals, budget-vs-spend. No per-user charges. Vendor-supplied NetSuite integration.</>
    ),
  },
  {
    ico: '◈',
    title: 'NetAsset',
    body: (
      <>NetGain SuiteApp for <strong>fixed-asset management</strong>. Runs inside NetSuite, so no integration build is required. Replaces native NetSuite Fixed Assets; sized to the ~3,000-asset register consolidated across all group entities.</>
    ),
  },
  {
    ico: '◢',
    title: 'Revolut',
    body: (
      <><strong>Corporate card + expense management</strong>. Vendor-supplied API integration into NetSuite. Retains the UX your team already likes; removes manual corporate-card tracking entirely.</>
    ),
  },
  {
    ico: '▶',
    title: 'Fusion5 CSV Integrator',
    body: (
      <>Scheduled flat-file ingestion for <strong>SwiftPOS, Concilio, Micropay</strong> summary journals. Eliminates manual journal entry; provides a consistent, auditable data path into the ERP.</>
    ),
  },
  {
    ico: '✉',
    title: 'Fusion5 Bank Parser',
    body: (
      <><strong>ABA file generation</strong> from approved NetSuite payment runs. The outbound payment cycle is auditable end-to-end within NetSuite. Advanced Electronic Bank Payments handles the inbound bank feeds.</>
    ),
  },
]

export default function SolutionStack() {
  return (
    <section className="section-alt">
      <div className="wrap">
        <span className="eyebrow">The solution stack</span>
        <h2>NetSuite handles consolidation; three vendors handle the rest</h2>
        <p style={{ maxWidth: 760 }}>
          NetSuite is the accounting and analytics consolidation layer. Zudello delivers procure-to-pay. NetGain delivers fixed assets. Revolut delivers corporate cards and staff expenses. Each vendor supplies its own integration and is licensed separately; the configurator below shows every line.
        </p>

        <div className="grid-3" style={{ marginTop: '2rem' }}>
          {CARDS.map((c) => (
            <div key={c.title} className="card">
              <div className="ico">{c.ico}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
