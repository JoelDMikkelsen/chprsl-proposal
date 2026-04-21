/**
 * IntegrationOptions — Phase 1 and Phase 2 integration choices.
 *
 * SCAFFOLD STATUS: placeholder structure only. Three option cards per phase,
 * with minimal copy to establish shape. Next session (Sonnet) to:
 *   1. Finalise which three options we want to present for each phase, with Joel.
 *   2. Write the advisory copy (plain English, no em-dashes, McKinsey tone).
 *   3. Decide on selection semantics (radio / toggle / informational only).
 *   4. Wire any state into the cost configurator where the choice has a
 *      pricing implication.
 *
 * See CONTEXT.md in the repo root for full deal context, tone rules, and
 * proposal structure. See reference/CHPRSL_Proposal_v1.1.html for the
 * rendered original that this scaffold is iterating on.
 */

import './IntegrationOptions.css'

type IntegrationOption = {
  id: string
  title: string
  summary: string
  details: string
  vendorOwned: boolean
  fusion5Effort: 'none' | 'light' | 'moderate' | 'significant'
  placeholder?: boolean
}

const PHASE_1_OPTIONS: IntegrationOption[] = [
  {
    id: 'p1-option-a',
    title: 'Option A placeholder',
    summary: 'Vendor-supplied integrations (Zudello, NetAsset, Revolut).',
    details:
      'Confirmed in v1.1 scope. Each vendor supplies its own integration into NetSuite. No Fusion5 integration build effort; vendor accountability for the handshake.',
    vendorOwned: true,
    fusion5Effort: 'none',
    placeholder: true,
  },
  {
    id: 'p1-option-b',
    title: 'Option B placeholder',
    summary: 'Fusion5 CSV Integrator for scheduled flat-file ingestion.',
    details:
      'Scheduled imports of SwiftPOS, Concilio and MicroPay summary journals into NetSuite. Removes manual journal entry. Extensible: additional flat-file sources can be added after Phase 1 if needed.',
    vendorOwned: false,
    fusion5Effort: 'moderate',
    placeholder: true,
  },
  {
    id: 'p1-option-c',
    title: 'Option C placeholder',
    summary: 'Fusion5 Bank Parser for outbound ABA files.',
    details:
      'Generates ABA payment files from NetSuite payment runs. Pairs with Advanced Electronic Bank Payments for inbound bank feeds. Full audit trail from approved bill through to bank submission.',
    vendorOwned: false,
    fusion5Effort: 'moderate',
    placeholder: true,
  },
]

const PHASE_2_OPTIONS: IntegrationOption[] = [
  {
    id: 'p2-option-a',
    title: 'Option A placeholder',
    summary: 'Campfire middleware (Fusion5 recommended candidate).',
    details:
      'Listener and service-bus pattern. Throttles high-volume sources (SwiftPOS) to protect NetSuite. Fusion5-owned commercial and support relationship. Currently being repriced for the phased Phase 1 → Phase 2 approach.',
    vendorOwned: false,
    fusion5Effort: 'significant',
    placeholder: true,
  },
  {
    id: 'p2-option-b',
    title: 'Option B placeholder',
    summary: 'Azure Service Bus (cloud-native messaging).',
    details:
      'Azure-hosted enterprise messaging. Fits if CHPRSL consolidates on Microsoft Fabric for data warehousing. Throttling, durability and monitoring built in. CHPRSL owns the Azure account and costs.',
    vendorOwned: false,
    fusion5Effort: 'significant',
    placeholder: true,
  },
  {
    id: 'p2-option-c',
    title: 'Option C placeholder',
    summary: 'iPass AI middleware with MCP connectors.',
    details:
      'AI-native middleware pattern. Enables natural-language queries across POS and ERP data via Teams or Slack. Returns PDF reports to OneDrive in under a minute. Longer horizon; sits beyond Campfire in the roadmap.',
    vendorOwned: false,
    fusion5Effort: 'significant',
    placeholder: true,
  },
]

function effortLabel(e: IntegrationOption['fusion5Effort']) {
  switch (e) {
    case 'none': return 'Vendor-delivered'
    case 'light': return 'Light Fusion5 effort'
    case 'moderate': return 'Moderate Fusion5 build'
    case 'significant': return 'Significant Fusion5 build'
  }
}

function OptionCard({ option }: { option: IntegrationOption }) {
  return (
    <article className="io-card" data-placeholder={option.placeholder ? 'true' : undefined}>
      <header className="io-card__head">
        <h4>{option.title}</h4>
        <span className="io-pill">{effortLabel(option.fusion5Effort)}</span>
      </header>
      <p className="io-card__summary">{option.summary}</p>
      <p className="io-card__details">{option.details}</p>
    </article>
  )
}

export default function IntegrationOptions() {
  return (
    <section id="integration-options" className="section-alt">
      <div className="wrap">
        <span className="eyebrow">Integration options</span>
        <h2>Phase 1 integrations are committed; Phase 2 shows three credible paths</h2>
        <p style={{ maxWidth: 780 }}>
          The Phase 1 cards below reflect the integration pattern locked in v1.1 scope.
          The Phase 2 cards are framed as options so CHPRSL can weigh middleware candidates
          against each other as the programme moves past go-live.
        </p>

        <div className="io-phase">
          <h3>Phase 1 (committed — at go-live 1 July 2026)</h3>
          <div className="io-grid">
            {PHASE_1_OPTIONS.map((o) => <OptionCard key={o.id} option={o} />)}
          </div>
        </div>

        <div className="io-phase">
          <h3>Phase 2 (indicative — middleware and analytics)</h3>
          <div className="io-grid">
            {PHASE_2_OPTIONS.map((o) => <OptionCard key={o.id} option={o} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
