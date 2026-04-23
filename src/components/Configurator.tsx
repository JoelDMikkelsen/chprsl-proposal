/**
 * Configurator — live commercials. Ported from v1.1 HTML IIFE to React state.
 * All pricing and formulas preserved exactly. See CONTEXT.md §2 for rules.
 *
 * Additions since v1.1 port:
 *   - Collapsible pricing panels: each section uses <details> so the user
 *     can hide the line-item body and just see the subtotal.
 *
 * The early-signature discounts live in the Architecture section: 15% on
 * Phase 2 / Phase 3 integration services and 20% on Campfire licensing,
 * both triggered by the 30 May 2026 signature box. Neither applies to the
 * Fusion5 implementation fee shown here; that fee is offset separately by
 * a reciprocal $15K credit matching Year 1 NSAW when the box is ticked.
 */

import { useState } from 'react'
import './Configurator.css'

const NS_FIXED = { platform: 34200, sandbox: 9000, training: 7200 }

// Annual unit prices (AUD, list)
const NS_UNIT = {
  ga: 180 * 12,   // $2,160 / yr : General Access
  va: 230 * 12,   // $2,760 / yr : View & Approve 5-Pk
  so: 90 * 12,    // $1,080 / yr : Specialised Site Operator
  crm: 130 * 12,  // $1,560 / yr : Specialised CRM
}

const NS_DISCOUNT = 0.4995
const F5_CONNECTORS_ANNUAL = 1200 + 2500
const FUSION5_IMPL = 165000
const NSAW_ANNUAL = 15000
const NSAW_CREDIT = 15000  // reciprocal credit to Fusion5 impl when signed by 30 May
const CAMPFIRE_ANNUAL = 12000
const CAMPFIRE_DISCOUNT_RATE = 0.20
const SIGNING_DEADLINE = '30 May 2026'

const Z_TIERS = [
  { docs: 500, yearly: 5940 },
  { docs: 1000, yearly: 11400 },
  { docs: 1500, yearly: 16740 },
] as const

const NA_TIERS = [
  { group: 'Tier 1', options: [
    { assets: 500, yearly: 7332 },
    { assets: 1000, yearly: 8460 },
    { assets: 1500, yearly: 9588 },
  ]},
  { group: 'Tier 2', options: [
    { assets: 2000, yearly: 10152 },
    { assets: 2750, yearly: 11562 },
    { assets: 3500, yearly: 12972 },
    { assets: 4250, yearly: 14382 },
  ]},
  { group: 'Tier 3', options: [
    { assets: 5000, yearly: 19740 },
    { assets: 6000, yearly: 21432 },
    { assets: 7000, yearly: 23124 },
    { assets: 8000, yearly: 24816 },
    { assets: 9000, yearly: 26508 },
  ]},
  { group: 'Tier 4', options: [
    { assets: 10000, yearly: 28200 },
    { assets: 12500, yearly: 31302 },
    { assets: 15000, yearly: 34404 },
    { assets: 17500, yearly: 37506 },
    { assets: 20000, yearly: 40608 },
    { assets: 22500, yearly: 43710 },
    { assets: 25000, yearly: 46812 },
    { assets: 27500, yearly: 49914 },
    { assets: 30000, yearly: 53016 },
  ]},
]

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-AU')

type ConfiguratorProps = {
  signByMay30: boolean
}

export default function Configurator({ signByMay30 }: ConfiguratorProps) {
  const [ga, setGa] = useState(6)
  const [va, setVa] = useState(4)
  const [so, setSo] = useState(0)
  const [crm, setCrm] = useState(0)
  const [zTierYearly, setZTierYearly] = useState<number>(5940)
  const [zTierDocs, setZTierDocs] = useState<number>(500)
  const [zBudget, setZBudget] = useState(true)
  const [zVendor, setZVendor] = useState(true)
  const [naTier, setNaTier] = useState<number>(12972)
  const [campfireOn, setCampfireOn] = useState(false)

  // Clamp qty between 0 and cap
  const clamp = (raw: number, cap: number) => Math.min(cap, Math.max(0, raw || 0))
  const gaQ = clamp(ga, 30)
  const vaQ = clamp(va, 20)
  const soQ = clamp(so, 50)
  const crmQ = clamp(crm, 50)

  const userLines = {
    ga: gaQ * NS_UNIT.ga,
    va: vaQ * NS_UNIT.va,
    so: soQ * NS_UNIT.so,
    crm: crmQ * NS_UNIT.crm,
  }
  const userTotal = Object.values(userLines).reduce((a, b) => a + b, 0)
  const fixedTotal = NS_FIXED.platform + NS_FIXED.sandbox + NS_FIXED.training
  const nsListSubtotal = fixedTotal + userTotal
  const nsDiscount = nsListSubtotal * NS_DISCOUNT
  const nsAnnualNet = nsListSubtotal - nsDiscount

  // View & Approve note
  const vaPacks = vaQ
  const vaLicences = vaPacks * 5
  const vaTarget = 16
  let vaTail: string
  if (vaPacks === 0) {
    vaTail = 'No packs selected; the 16-user scope is not covered.'
  } else if (vaLicences < vaTarget) {
    vaTail = `Currently ${vaPacks}${vaPacks === 1 ? ' pack = ' : ' packs = '}${vaLicences} licences; ${vaTarget - vaLicences} short of the 16-user scope.`
  } else if (vaLicences === vaTarget) {
    vaTail = `Currently ${vaPacks}${vaPacks === 1 ? ' pack = ' : ' packs = '}${vaLicences} licences; covers the 16-user scope exactly.`
  } else {
    vaTail = `Currently ${vaPacks}${vaPacks === 1 ? ' pack = ' : ' packs = '}${vaLicences} licences; covers the 16-user scope (packs round up in 5s) with ${vaLicences - vaTarget} of headroom.`
  }

  // Zudello
  const zBase = zTierYearly
  const zBudgetLicence = zBudget ? zBase * 0.10 : 0
  const zVendorFee = zVendor ? 1188 : 0
  const zAnnual = zBase + zBudgetLicence + zVendorFee
  const zImpl = 15000 + (zBudget ? 2100 : 0)
  const zBudgetNote = `+10% licence uplift (+${fmt(zBase * 0.10)} on ${zTierDocs.toLocaleString('en-AU')} docs / month), plus $2,100 one-off implementation.`

  // NetAsset
  const naAnnual = naTier

  // NSAW — Phase 1 license at $15K/yr. Reciprocal credit to Fusion5 impl
  // when the 30 May signature box is ticked, effectively making Year 1 free.
  const nsawAnnual = NSAW_ANNUAL
  const nsawCredit = signByMay30 ? NSAW_CREDIT : 0
  const f5ImplNet = FUSION5_IMPL - nsawCredit

  // Campfire (Phase 2, standalone — NOT included in the totals roll-up).
  const campfireDiscountApplies = signByMay30 && campfireOn
  const campfireDiscount = campfireDiscountApplies ? CAMPFIRE_ANNUAL * CAMPFIRE_DISCOUNT_RATE : 0
  const campfireNet = CAMPFIRE_ANNUAL - (campfireOn ? campfireDiscount : 0)

  // Totals (Phase 1 commercial only — Campfire excluded by design).
  const totalAnnual = nsAnnualNet + F5_CONNECTORS_ANNUAL + zAnnual + naAnnual + nsawAnnual
  const totalOneOff = f5ImplNet + zImpl
  const y1Total = totalAnnual + totalOneOff
  const y2 = totalAnnual
  const y3 = totalAnnual
  // Uplift applied to NetSuite core and NSAW only (NetSuite renewal structure);
  // NetAsset, Zudello and Fusion5 Connectors held flat across the 5-year view.
  const y4 = nsAnnualNet * 1.03 + F5_CONNECTORS_ANNUAL + zAnnual + naAnnual + nsawAnnual * 1.03
  const y5 = nsAnnualNet * 1.06 + F5_CONNECTORS_ANNUAL + zAnnual + naAnnual + nsawAnnual * 1.06
  const fiveYear = y1Total + y2 + y3 + y4 + y5

  return (
    <section className="configurator" id="commercials">
      <div className="wrap">
        <span className="eyebrow">Live commercials configurator</span>
        <h2>Model licence volumes and vendor tiers; the totals update live</h2>
        <p style={{ maxWidth: 780 }}>
          The panels below cover NetSuite licensing at Oracle list pricing (with the 49.95% discount applied and subject to final approval), Fusion5 Optional Connectors, Zudello, NetAsset and the Fusion5 implementation. Each panel can be collapsed from its header. Annual totals, one-off implementation and indicative 5-year TCO update as inputs change. Pricing is valid until 31 May 2026 unless extended by agreement.
        </p>

        <div className="config-grid">
          <div className="config-panels">

            {/* NETSUITE */}
            <details className="panel" open>
              <summary className="panel-head">
                <div>
                  <h3>NetSuite licensing</h3>
                  <div className="sub">
                    SuiteSuccess Financials First Standard Edition at list pricing in AUD. 49.95% discount applied, subject to final approval. Platform, sandbox and training are fixed; user licences are configurable. Payment cadence can be annual, quarterly or monthly at CHPRSL's preference with no change to pricing.
                  </div>
                </div>
                <span className="pill violet">Annual</span>
              </summary>
              <div className="panel-body">

                <div className="panel-subhead">Platform and environment (fixed)</div>

                <div className="row">
                  <label>
                    SuiteSuccess Financials First Standard Edition
                    <span className="note">Core ERP &amp; CRM, Subsidiary Management, Financial Management, Advanced Electronic Bank Payments, SuiteAnalytics BI</span>
                  </label>
                  <span />
                  <span className="unit">1 × $2,850 / mo</span>
                  <span className="line">{fmt(NS_FIXED.platform)}</span>
                </div>

                <div className="row">
                  <label>
                    Sandbox Account
                    <span className="note">Development and testing environment</span>
                  </label>
                  <span />
                  <span className="unit">1 × $750 / mo</span>
                  <span className="line">{fmt(NS_FIXED.sandbox)}</span>
                </div>

                <div className="row">
                  <label>
                    Company LCS Training Pass (Standard)
                    <span className="note">NetSuite learning platform</span>
                  </label>
                  <span />
                  <span className="unit">1 × $600 / mo</span>
                  <span className="line">{fmt(NS_FIXED.training)}</span>
                </div>

                <div className="panel-subhead">User licences (configurable)</div>

                <div className="row">
                  <label>
                    General Access Users
                    <span className="note">$180 / mo each. v1.1 scope: 5 finance plus 1 IT Admin. Currently {gaQ} of the 30 cap.</span>
                  </label>
                  <input type="number" value={ga} onChange={(e) => setGa(+e.target.value)} min={0} max={30} step={1} />
                  <span className="unit">× $2,160 / yr</span>
                  <span className="line">{fmt(userLines.ga)}</span>
                </div>

                <div className="row">
                  <label>
                    View &amp; Approve Users (5-Pk)
                    <span className="note">$230 / mo per 5-pack, 12-month term. v1.1 scope: 16 users (7 bank authorisers and 9 dashboard viewers). {vaTail}</span>
                  </label>
                  <input type="number" value={va} onChange={(e) => setVa(+e.target.value)} min={0} max={20} step={1} />
                  <span className="unit">× $2,760 / yr</span>
                  <span className="line">{fmt(userLines.va)}</span>
                </div>

                <div className="row">
                  <label>
                    Specialised Site Operator
                    <span className="note">$90 / mo each. Evaluated and ruled out in v1.1 in favour of View &amp; Approve, but available here to model.</span>
                  </label>
                  <input type="number" value={so} onChange={(e) => setSo(+e.target.value)} min={0} max={50} step={1} />
                  <span className="unit">× $1,080 / yr</span>
                  <span className="line">{fmt(userLines.so)}</span>
                </div>

                <div className="row">
                  <label>
                    Specialised CRM
                    <span className="note">$130 / mo each. CRM is bundled in the core, so typically 0 for CHPRSL.</span>
                  </label>
                  <input type="number" value={crm} onChange={(e) => setCrm(+e.target.value)} min={0} max={50} step={1} />
                  <span className="unit">× $1,560 / yr</span>
                  <span className="line">{fmt(userLines.crm)}</span>
                </div>

                <div className="row">
                  <label>
                    Employee Self-Service (5-Pk)
                    <span className="note">Included in core at no additional cost.</span>
                  </label>
                  <span />
                  <span className="unit">1 × included</span>
                  <span className="line">$0</span>
                </div>

                <div className="row subtotal">
                  <label>Subtotal at list pricing</label>
                  <span />
                  <span className="unit" />
                  <span className="line">{fmt(nsListSubtotal)}</span>
                </div>

                <div className="row">
                  <label style={{ color: 'var(--f5-crimson-ziva)' }}>
                    Less 49.95% discount
                    <span className="note">Subject to final approval. Applied to the NetSuite lines above.</span>
                  </label>
                  <span />
                  <span className="unit" />
                  <span className="line" style={{ color: 'var(--f5-crimson-ziva)' }}>−{fmt(nsDiscount)}</span>
                </div>

                <div className="row total">
                  <label>NetSuite annual licensing (net)</label>
                  <span>{fmt(nsAnnualNet)}</span>
                </div>
              </div>
            </details>

            {/* F5 CONNECTORS */}
            <details className="panel" open>
              <summary className="panel-head">
                <div>
                  <h3>Fusion5 Optional Connectors</h3>
                  <div className="sub">Bank Parser and CSV Connector, both in Phase 1 scope.</div>
                </div>
                <span className="pill">Annual</span>
              </summary>
              <div className="panel-body">
                <div className="row">
                  <label>
                    Fusion5 Bank Parser (Outbound)
                    <span className="note">ABA file generation from NetSuite payment runs</span>
                  </label>
                  <span />
                  <span className="unit">1 × $100 / mo</span>
                  <span className="line">$1,200</span>
                </div>
                <div className="row">
                  <label>
                    Fusion5 CSV Connector
                    <span className="note">Scheduled flat-file ingestion for SwiftPOS, Concilio and Micropay summary journals</span>
                  </label>
                  <span />
                  <span className="unit">1 × $208 / mo</span>
                  <span className="line">$2,500</span>
                </div>
                <div className="row total">
                  <label>Fusion5 Optional Connectors annual</label>
                  <span>$3,700</span>
                </div>
              </div>
            </details>

            {/* ZUDELLO */}
            <details className="panel" open>
              <summary className="panel-head">
                <div>
                  <h3>Zudello: P2P platform</h3>
                  <div className="sub">Vendor-direct, AUD. No per-user charges. Implementation is a one-off.</div>
                </div>
                <span className="pill">Vendor-direct</span>
              </summary>
              <div className="panel-body">
                <div className="row">
                  <label>
                    Document volume tier
                    <span className="note">Any record regardless of size, including POs, item receipts and bills. Fair use allowance is 50 documents per month of overage. Unextracted documents are excluded under the extraction guarantee.</span>
                  </label>
                  <select
                    value={zTierDocs}
                    onChange={(e) => {
                      const docs = +e.target.value
                      const tier = Z_TIERS.find((t) => t.docs === docs)
                      if (tier) {
                        setZTierDocs(tier.docs)
                        setZTierYearly(tier.yearly)
                      }
                    }}
                  >
                    {Z_TIERS.map((t) => (
                      <option key={t.docs} value={t.docs}>
                        {t.docs.toLocaleString('en-AU')} / month ({fmt(t.yearly)}/yr)
                      </option>
                    ))}
                  </select>
                  <span className="unit">annual</span>
                  <span className="line">{fmt(zBase)}</span>
                </div>

                <div className="row">
                  <label>
                    Budget checking
                    <span className="note">Real-time budget-vs-spend at commitment. {zBudgetNote}</span>
                  </label>
                  <span className="toggle">
                    <input type="checkbox" checked={zBudget} onChange={(e) => setZBudget(e.target.checked)} />
                  </span>
                  <span className="unit">+10% licence</span>
                  <span className="line">{fmt(zBudgetLicence)}</span>
                </div>

                <div className="row">
                  <label>
                    Vendor onboarding module
                    <span className="note">$99/month flat; required for supplier onboarding workflows</span>
                  </label>
                  <span className="toggle">
                    <input type="checkbox" checked={zVendor} onChange={(e) => setZVendor(e.target.checked)} />
                  </span>
                  <span className="unit">$99 × 12</span>
                  <span className="line">{fmt(zVendorFee)}</span>
                </div>

                <div className="row total">
                  <label>Zudello annual licensing</label>
                  <span>{fmt(zAnnual)}</span>
                </div>

                <div className="row row-dashed">
                  <label>
                    Zudello implementation (one-off)
                    <span className="note">AP + Procurement setup by Zudello Professional Services. +$2,100 if budget checking is selected.</span>
                  </label>
                  <span />
                  <span className="unit">Zudello PS</span>
                  <span className="line">{fmt(zImpl)}</span>
                </div>
              </div>
            </details>

            {/* NETASSET */}
            <details className="panel" open>
              <summary className="panel-head">
                <div>
                  <h3>NetAsset by NetGain</h3>
                  <div className="sub">SuiteApp running inside NetSuite; no integration build. Implementation included in Fusion5's fixed price.</div>
                </div>
                <span className="pill teal">Per-asset tier</span>
              </summary>
              <div className="panel-body">
                <div className="row">
                  <label>
                    Asset tier
                    <span className="note">Indicative asset count: ~3,000, consolidated across all group entities (clean-up required pre-cutover). Tier selected is the first row at or above the count.</span>
                  </label>
                  <select value={naTier} onChange={(e) => setNaTier(+e.target.value)}>
                    {NA_TIERS.map((group) => (
                      <optgroup key={group.group} label={group.group}>
                        {group.options.map((o) => (
                          <option key={o.yearly} value={o.yearly}>
                            {o.assets.toLocaleString('en-AU')} assets ({fmt(o.yearly)})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <span className="unit">annual</span>
                  <span className="line">{fmt(naAnnual)}</span>
                </div>
                <div className="row total">
                  <label>NetAsset annual licensing</label>
                  <span>{fmt(naAnnual)}</span>
                </div>
              </div>
            </details>

            {/* NSAW LICENSING */}
            <details className="panel" open>
              <summary className="panel-head">
                <div>
                  <h3>NetSuite Analytics Warehouse</h3>
                  <div className="sub">
                    Phase 1 data layer. Flat $15,000 / yr. When signed by {SIGNING_DEADLINE}, Fusion5 reduces the implementation fee by a matching $15,000 — net $15,000 Year 1 saving for CHPRSL.
                  </div>
                </div>
                <span className="pill teal">Annual</span>
              </summary>
              <div className="panel-body">
                <div className="row">
                  <label>
                    NSAW licence
                    <span className="note">Activated alongside NetSuite at go-live; ingests summary and detailed data via the CSV Integrator in Phase 1, and Campfire in Phase 2.</span>
                  </label>
                  <span />
                  <span className="unit">annual</span>
                  <span className="line">{fmt(NSAW_ANNUAL)}</span>
                </div>

                {signByMay30 && (
                  <div className="row">
                    <label style={{ color: 'var(--f5-crimson-ziva)' }}>
                      Reciprocal credit to Fusion5 implementation
                      <span className="note">
                        Year 1 NSAW licence ({fmt(NSAW_ANNUAL)}) is matched by a reciprocal credit on the Fusion5 implementation fee while the {SIGNING_DEADLINE} signature box is ticked. Net Year 1 effect is a $15,000 saving against the list.
                      </span>
                    </label>
                    <span />
                    <span className="unit">Year 1 only</span>
                    <span className="line" style={{ color: 'var(--f5-crimson-ziva)' }}>−{fmt(NSAW_CREDIT)}</span>
                  </div>
                )}

                <div className="row total">
                  <label>NSAW annual licensing</label>
                  <span>{fmt(NSAW_ANNUAL)}</span>
                </div>
              </div>
            </details>

            {/* FUSION5 IMPL */}
            <details className="panel" open>
              <summary className="panel-head">
                <div>
                  <h3>Fusion5 implementation</h3>
                  <div className="sub">Fixed price. Covers NetSuite configuration, customisations, integrations, data migration, NetAsset setup, training, and go-live support.</div>
                </div>
                <span className="pill">Fixed-price</span>
              </summary>
              <div className="panel-body">
                <div className="row">
                  <label>
                    NetSuite implementation (list)
                    <span className="note">Includes NetAsset implementation (SuiteApp, no integration). Variations managed formally.</span>
                  </label>
                  <span />
                  <span className="unit">one-off</span>
                  <span className="line">{fmt(FUSION5_IMPL)}</span>
                </div>

                {signByMay30 && (
                  <div className="row">
                    <label style={{ color: 'var(--f5-crimson-ziva)' }}>
                      Less reciprocal NSAW Year 1 credit
                      <span className="note">
                        Applied when the {SIGNING_DEADLINE} signature box is ticked. Matches the Year 1 NSAW licence dollar-for-dollar, delivering a $15,000 net saving to CHPRSL in Year 1.
                      </span>
                    </label>
                    <span />
                    <span className="unit">one-off</span>
                    <span className="line" style={{ color: 'var(--f5-crimson-ziva)' }}>−{fmt(NSAW_CREDIT)}</span>
                  </div>
                )}

                <div className="row total">
                  <label>Fusion5 implementation {signByMay30 ? '(net)' : ''}</label>
                  <span style={{ color: 'var(--f5-coral)' }}>{fmt(f5ImplNet)}</span>
                </div>
              </div>
            </details>

            {/* CAMPFIRE — Phase 2 licensing. Unticked by default. Not in Year 1 totals. */}
            <details className="panel panel--p2" open>
              <summary className="panel-head">
                <div>
                  <h3>Campfire licensing</h3>
                  <div className="sub">
                    Phase 2 middleware licensing. Shown for reference; not included in the Year 1 totals on the right.
                  </div>
                </div>
                <span className="pill">Phase 2 · Annual</span>
              </summary>
              <div className="panel-body">
                <div className="row">
                  <label>
                    Include Campfire licensing
                    <span className="note">
                      Activate Campfire in Phase 2 at $12,000 / year. If signed by {SIGNING_DEADLINE} the Campfire licensing attracts an additional 20% discount.
                    </span>
                  </label>
                  <span className="toggle">
                    <input
                      type="checkbox"
                      checked={campfireOn}
                      onChange={(e) => setCampfireOn(e.target.checked)}
                    />
                  </span>
                  <span className="unit">annual</span>
                  <span className="line">{fmt(CAMPFIRE_ANNUAL)}</span>
                </div>

                {campfireOn && campfireDiscountApplies && (
                  <div className="row">
                    <label style={{ color: 'var(--f5-crimson-ziva)' }}>
                      Less 20% early-signature discount
                      <span className="note">Applied to the Campfire licensing line only while the {SIGNING_DEADLINE} sign-up box is ticked.</span>
                    </label>
                    <span />
                    <span className="unit" />
                    <span className="line" style={{ color: 'var(--f5-crimson-ziva)' }}>−{fmt(campfireDiscount)}</span>
                  </div>
                )}

                <div className="row total">
                  <label>
                    Campfire annual licensing {campfireDiscountApplies ? '(net)' : ''}
                    <span className="note">Phase 2 commercial, shown for modelling only — not rolled into the Year 1 totals on the right.</span>
                  </label>
                  <span style={{ color: campfireOn ? 'var(--f5-coral)' : 'var(--f5-chinese-violet)' }}>
                    {campfireOn ? fmt(campfireNet) : 'Not selected'}
                  </span>
                </div>
              </div>
            </details>
          </div>

          {/* TOTALS */}
          <aside>
            <div className="totals-panel">
              <h3>Your cost picture</h3>
              <div className="sub">Live; updates as inputs change</div>

              <div className="total-line"><span className="lab">NetSuite licence (net)</span><span className="val">{fmt(nsAnnualNet)}</span></div>
              <div className="total-line"><span className="lab">Fusion5 Optional Connectors</span><span className="val">$3,700</span></div>
              <div className="total-line"><span className="lab">Zudello licence</span><span className="val">{fmt(zAnnual)}</span></div>
              <div className="total-line"><span className="lab">NetAsset licence</span><span className="val">{fmt(naAnnual)}</span></div>
              <div className="total-line">
                <span className="lab">
                  NSAW licence
                  {signByMay30 && <span className="sub-note"> · Year 1 offset by impl credit</span>}
                </span>
                <span className="val">{fmt(nsawAnnual)}</span>
              </div>
              <div className="total-line"><span className="lab">Revolut</span><span className="val">Plan tier TBC</span></div>
              <div className="total-line"><span className="lab"><strong>Total annual (Year 1)</strong></span><span className="val">{fmt(totalAnnual)}</span></div>

              <div className="total-line" style={{ marginTop: '0.75rem' }}>
                <span className="lab">Fusion5 implementation (list)</span>
                <span className="val">{fmt(FUSION5_IMPL)}</span>
              </div>
              {signByMay30 && (
                <div className="total-line discount-line">
                  <span className="lab">Less reciprocal NSAW Year 1 credit</span>
                  <span className="val">−{fmt(NSAW_CREDIT)}</span>
                </div>
              )}
              <div className="total-line"><span className="lab">Zudello implementation</span><span className="val">{fmt(zImpl)}</span></div>
              <div className="total-line"><span className="lab"><strong>Total one-off</strong></span><span className="val">{fmt(totalOneOff)}</span></div>

              <div className="grand">
                <div className="total-line" style={{ border: 'none', padding: 0 }}>
                  <span className="lab">Year 1 total</span>
                  <span className="val">{fmt(y1Total)}</span>
                </div>
              </div>
              <div className="total-line" style={{ marginTop: '0.5rem' }}>
                <span className="lab">Indicative 5-year TCO</span>
                <span className="val">{fmt(fiveYear)}</span>
              </div>

              <p className="fine">
                All figures AUD, excluding GST. NetSuite list pricing per Oracle rate card; 49.95% discount subject to final approval. When signed by {SIGNING_DEADLINE}, Fusion5 applies a $15,000 reciprocal credit to the implementation fee that matches the Year 1 NSAW licence; the net effect is a $15,000 Year 1 saving for CHPRSL. The 5-year TCO holds years 2 and 3 flat, with a 3% uplift applied to NetSuite and NSAW in year 4 and 6% in year 5, consistent with the published NetSuite renewal structure; NetAsset, Zudello and the Fusion5 Optional Connectors are held flat across the 5-year view. Revolut plan tier to be confirmed by CHPRSL. Pricing valid until 31 May 2026 unless extended by agreement.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
