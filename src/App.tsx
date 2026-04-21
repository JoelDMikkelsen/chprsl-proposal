/**
 * CHPRSL × Fusion5 — NetSuite Implementation Proposal (v2 scaffold)
 *
 * STATUS: Netlify-ready shell. Brand tokens wired, fonts loaded, one feature
 * component (IntegrationOptions) scaffolded with placeholders.
 *
 * Next session (Sonnet, separate chat): port the v1.1 HTML sections from
 * reference/CHPRSL_Proposal_v1.1.html into dedicated components:
 *   - Hero
 *   - StatBar
 *   - WhatWeHeard (listening table)
 *   - SolutionStack (6 vendor cards)
 *   - Phase1Scope (in-scope / deferred)
 *   - DeliveryApproach (FOCUS timeline + governance/commercial/risk tiles)
 *   - Configurator (NetSuite / Connectors / Zudello / NetAsset panels + totals)
 *   - IntegrationOptions (this scaffold — refine copy and selection semantics)
 *   - CommercialCallout
 *   - NextSteps
 *   - CTA
 *   - Footer
 *
 * See CONTEXT.md for deal state, tone rules (Fusion5 brand + McKinsey),
 * commercial defaults, and open decisions.
 */

import IntegrationOptions from './components/IntegrationOptions'

export default function App() {
  return (
    <>
      <PlaceholderHero />
      <IntegrationOptions />
      <PlaceholderFooter />
    </>
  )
}

function PlaceholderHero() {
  return (
    <header
      style={{
        padding: '6rem 1.5rem 4rem',
        background: 'var(--f5-gradient-hero)',
        color: 'var(--f5-white)',
      }}
    >
      <div className="wrap">
        <span className="eyebrow" style={{ color: 'var(--f5-coral)' }}>
          Scaffold only
        </span>
        <h1 style={{ color: 'var(--f5-white)', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
          CHPRSL × Fusion5 proposal scaffold
        </h1>
        <p style={{ maxWidth: 620, color: 'rgba(255,255,255,0.85)', fontSize: '1.125rem' }}>
          Hero, stat bar, listening table, solution stack, scope, delivery approach,
          configurator, commercial callout, next steps and CTA sections to be ported
          from the v1.1 HTML reference. Integration Options below is the new
          section for this iteration.
        </p>
      </div>
    </header>
  )
}

function PlaceholderFooter() {
  return (
    <footer
      style={{
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        fontSize: '0.8125rem',
        color: 'var(--f5-chinese-violet)',
        background: 'var(--f5-bg-subtle)',
      }}
    >
      Prepared by Fusion5 for Canterbury-Hurlstone Park RSL Club Ltd · v2 scaffold<br />
      All figures AUD, excluding GST. Pricing valid until 31 May 2026 unless extended by agreement.
    </footer>
  )
}
