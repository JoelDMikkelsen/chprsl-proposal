import './Phase1Scope.css'

const IN_SCOPE: React.ReactNode[] = [
  <>General Ledger across 12 entities + consolidated reporting</>,
  <>Multi-entity subsidiary management &amp; intercompany netting</>,
  <>Accounts Payable (bills flow from Zudello into NetSuite)</>,
  <>Accounts Receivable &amp; cash application</>,
  <>Advanced Electronic Bank Payments (inbound + outbound ABA)</>,
  <>Fixed Assets via <strong>NetAsset</strong>: ~3,000 assets, single depreciation schedule, low-value pool</>,
  <>Procurement end-to-end in <strong>Zudello</strong> (no NetSuite GA licences for receipters)</>,
  <>Corporate card &amp; expense via <strong>Revolut</strong> integration</>,
  <>Job costing via native custom segment (capital, events, marketing)</>,
  <>Contract Management: custom record plus SuiteFlow approvals</>,
  <>Vendor Bank Details Approval Workflow</>,
  <>Journal Approval Workflow (manual journals)</>,
  <>SuiteAnalytics BI dashboards &amp; Financial Report Builder</>,
  <>NetSuite Analytics Warehouse activated as the Phase 1 data layer</>,
  <>Integrations: SwiftPOS, Concilio, Micropay (via CSV Integrator)</>,
  <>Data migration: opening balances + master data</>,
  <>Training (End-User Essentials + Admin Essentials)</>,
]

const DEFERRED: string[] = [
  'NetSuite EPM: Planning & Budgeting',
  'Advanced Revenue Management (spreadsheets continue in Phase 1)',
  'Middleware / message bus for Phase 2 architecture',
  'Field Service Management & CMMS (separate evaluation in flight)',
  'Inventory management in NetSuite (remains in SwiftPOS)',
  'HR & Payroll in NetSuite (decision pending)',
  'CRM / marketing automation',
  'Custom SuiteScript development',
  'Gaming-specific direct integrations (flow via Concilio)',
  'Post-live managed services (separate PartnerPlus engagement)',
]

export default function Phase1Scope() {
  return (
    <section>
      <div className="wrap">
        <span className="eyebrow">Phase 1 scope</span>
        <h2>Phase 1 delivers consolidation; Phase 2 items remain visible in the roadmap</h2>
        <p style={{ maxWidth: 760 }}>
          Phase 1 is sized to hit 1 July 2026. Items that are not required for consolidation and close are deferred to Phase 2 and listed alongside the in-scope items below.
        </p>

        <div className="scope-grid">
          <div className="scope-block">
            <h4><span className="pip" /> In scope for Phase 1</h4>
            <ul>
              {IN_SCOPE.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div className="scope-block out">
            <h4><span className="pip" /> Deferred to Phase 2</h4>
            <ul>
              {DEFERRED.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
