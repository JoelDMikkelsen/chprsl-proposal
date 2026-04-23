import './WhatWeHeard.css'

type Row = {
  raised: string
  response: React.ReactNode
}

const ROWS: Row[] = [
  {
    raised: '40–50 users buying General Access licences for PO creation and goods receipting "would kill us commercially"',
    response: (
      <>Procurement moved end-to-end into <strong>Zudello</strong>. No per-user charges: all staff are covered regardless of volume. Net NetSuite footprint is 6 General Access and 16 View &amp; Approve users; the ~40–50 receipters transact in Zudello without consuming a NetSuite licence.</>
    ),
  },
  {
    raised: '"Not convinced" native NetSuite expense management matches purpose-built tools; raised Revolut as a cheaper, better alternative',
    response: (
      <>Revolut <strong>platform confirmed for Phase 1</strong> corporate card and expense management. Vendor-supplied integration, no Fusion5 build effort. Plan tier to be confirmed with CHPRSL's Revolut account manager.</>
    ),
  },
  {
    raised: 'Job costing asked three times: "is native enough, or do we need more features?"',
    response: (
      <>A single recommendation: <strong>native custom segment</strong>. No additional licensing. Covers capital projects, events P&amp;L and campaign tracking.</>
    ),
  },
  {
    raised: '"Lot of extra spending we\'ve never had before": caution on accumulating module costs',
    response: (
      <>ARM and middleware <strong>deferred to Phase 2</strong>; NetAsset replaces native Fixed Assets for a better-fit, lower-cost Phase 1.</>
    ),
  },
  {
    raised: 'Procure-to-pay fragmentation: "there are so many options"',
    response: (
      <>One platform, end-to-end, in Zudello: supplier onboarding, POs, receipting, 3-way matching, AP capture, DOA approvals and budget-vs-spend. Mediusflow (the v1.0 AP automation proposal) is decommissioned.</>
    ),
  },
  {
    raised: 'Contract management scoped with Business Central in v1.0; equivalent capability expected',
    response: (
      <>Native custom record with owner, renewal dates, document attachment and SuiteFlow approval routing. Accessible to View &amp; Approve users, so no extra GA licences for contract owners.</>
    ),
  },
]

export default function WhatWeHeard() {
  return (
    <section>
      <div className="wrap">
        <span className="eyebrow">What we heard</span>
        <h2>v1.1 resolves six decisions the Finance team raised on v1.0</h2>
        <p className="wrap-narrow" style={{ marginLeft: 0, maxWidth: 760 }}>
          Each change below traces to a specific question raised since v1.0.
        </p>

        <table className="listen-table">
          <thead>
            <tr>
              <th style={{ width: '42%' }}>You raised</th>
              <th>We responded in v1.1</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={i}>
                <td>{r.raised}</td>
                <td>{r.response}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
