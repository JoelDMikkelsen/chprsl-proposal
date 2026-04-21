# CHPRSL × Fusion5 Proposal (v2 scaffold) — session handoff

Handoff document for the next Sonnet session that will port the v1.1 proposal HTML into this React/Vite scaffold and refine the new Integration Options section. This file is the authoritative context — read it top to bottom before writing code.

---

## 1. Deal summary (as at 22 April 2026)

- **Client:** Canterbury-Hurlstone Park RSL Club Ltd (CHPRSL, sometimes referred to as CMNL or "Club Energize"). Multi-venue hospitality and gaming group, 12 reporting entities, group structure detailed in `reference/CHPRSL_High_Level_Scope_v1.1.md` §3.
- **Project sponsor:** Brendan McDowell, CFO. Technically sophisticated, cost-conscious, collaborative. Writing the board paper week commencing 28 April.
- **Target go-live:** 1 July 2026 (committed by Fusion5).
- **Primary Fusion5 contact:** Joel Mikkelsen (took over from Anthony Najafian on medical leave, 27 March 2026). Jayden Sheridan is solution architect. Alan Pan is NetSuite product. Greg Chompff owns integration architecture.
- **Preferred-ERP status:** confirmed 15 April 2026.
- **v1.1 scope + commercial issued:** 20 April 2026. Pricing valid until **31 May 2026** unless extended by agreement.

## 2. Commercial shape (default configuration)

All figures AUD, excluding GST.

| Line | Amount |
|---|---:|
| Fusion5 NetSuite implementation (fixed, one-off) | **$165,000** |
| NetSuite licence (net of 49.95% discount, 6 GA + 4 V&A 5-packs) | ~$37,237 / yr |
| Fusion5 Optional Connectors (Bank Parser + CSV Connector) | $3,700 / yr |
| Zudello licence (500 docs/mo tier + budget check + vendor onboarding) | ~$7,722 / yr |
| Zudello implementation (one-off, Zudello PS) | $17,100 |
| NetAsset licence (Tier 2, 3,500-asset row) | $12,972 / yr |
| Revolut | TBC (may swap to Zudello Expense Module post-demo) |
| **Indicative Year 1 total** | **~$243,731** |

Key pricing rules:

- **$165K Fusion5 fixed price is "buy-the-business".** Don't engineer hour-defense narratives around it. Focus on scope clarity.
- **49.95% discount applies to NetSuite subtotal only**, subject to final approval. Does NOT apply to Fusion5 Optional Connectors.
- **Payment cadence flexibility**: annual, quarterly or monthly at CHPRSL preference, no price change.
- **Year 4–5 renewal price cap** already committed.

NetSuite unit prices (list, per Anthony's rate card 20 Apr):

- SuiteSuccess Financials First Standard: $2,850 / mo = $34,200 / yr
- Sandbox: $750 / mo = $9,000 / yr
- LCS Training Pass (Standard): $600 / mo = $7,200 / yr
- General Access user: $180 / mo
- View & Approve 5-pack: $230 / mo
- Specialised Site Operator: $90 / mo (evaluated and ruled out; kept in configurator for modelling)
- Specialised CRM: $130 / mo (CRM bundled in core; typically 0)
- Specialised Project Manager: $90 / mo (not in scope)
- Specialised WMS: $140 / mo (not in scope)
- Employee Self-Service: 5-pack included free
- Fixed Asset Management: $900 / mo — **removed in v1.1** (NetAsset replaces)

Zudello (Neville Waller, 20 Apr email):

- 500 docs/mo $5,940/yr · 1,000 docs/mo $11,400/yr · 1,500 docs/mo $16,740/yr
- Fair use allowance: +50 docs/month overage free
- Budget checking: +10% licence uplift, +$2,100 implementation
- Vendor onboarding module: $99/mo flat
- Implementation $15,000 base
- **No per-user charges**

NetAsset (NetGain, 20 Apr schedule):

- Tier 1: 500 ($7,332) · 1,000 ($8,460) · 1,500 ($9,588)
- Tier 2: 2,000 ($10,152) · 2,750 ($11,562) · 3,500 ($12,972) · 4,250 ($14,382)
- Tier 3: 5,000 through 9,000 ($19,740–$26,508)
- Tier 4: 10,000 through 30,000 ($28,200–$53,016)
- CHPRSL ~3,000 assets consolidated across all group entities → Tier 2, 3,500 row → $12,972/yr

Fusion5 Optional Connectors:

- Bank Parser (Outbound): $100 / mo = $1,200 / yr
- CSV Connector: $208.30 / mo = $2,500 / yr

## 3. What v1.1 scope resolved (the "we listened" narrative)

This is the single most valuable narrative in the proposal. Every v1.1 change traces to a concern Brendan raised. Lead the proposal with this.

| Concern raised | v1.1 response |
|---|---|
| 40–50 GA licences for PO / receipting "would kill us commercially" | Zudello end-to-end P2P, no per-user charges |
| "Not convinced" on native NetSuite expense UX (raised Revolut) | Revolut confirmed Phase 1 (may swap to Zudello Expense after Tuesday demo) |
| Job costing asked three times | Single answer: native custom segment, no extra licensing |
| "Lot of extra spending we've never had before" | ARM and middleware deferred to Phase 2; NetAsset replaces native Fixed Assets |
| Procure-to-pay fragmentation | One platform end-to-end in Zudello. Mediusflow decommissioned. |
| Contract management scoped with BC (need equivalent or better) | Custom record + SuiteFlow approvals, accessible to View & Approve users |

## 4. Tone rules (cross-skill authority hierarchy)

The Jaime McKinsey tone skill **overrides** other production-content rules where they conflict. The Fusion5 brand skill provides visual language. The two work together on this proposal:

### McKinsey discipline (mandatory)

- **No em-dashes** (`—`) anywhere in copy or JS comments. Use colon, semicolon, comma, full stop, or parentheses.
- **No AI-giveaway patterns**: "at the core", "at the heart of", "fundamentally", "let's be honest", "not X, it is Y", "not just", rhetorical tricolons (factual lists of three distinct items are fine).
- **Titles make claims, not labels**. Avoid "Overview of X" or "X summary". Say what the reader should walk away believing.
- **Assertion-evidence bullets**: lead with claim, colon, then evidence.
- **Advisory register, not directive**. Read as a senior partner briefing a peer.
- **Calibrated language**: no "transforms", "disrupts", "revolutionises", "dominates", "unprecedented" unless literally true. Use "shifts", "reshapes", "changes the mix of".
- **Max 3 supporting points per page, max 3 sub-bullets per section.**
- **No manufactured antagonists.** Don't set up a belief to demolish ("the assumption that X breaks down..."). State the real change directly.

### Fusion5 brand (visual and voice)

- Palette and tokens in `src/styles/tokens.css`. Use semantic tokens (var(--f5-heading), var(--f5-accent)) rather than literal hexes in components.
- Plus Jakarta Sans (loaded from Google Fonts in `index.html`).
- Two brand taglines allowed sparingly: **"Together, let's go beyond"** and **"Go beyond"**. These are registered Fusion5 brand language, not AI-generated copy. One use each per page, max.
- Banned Fusion5 phrases for this proposal: "Your ambition is our North Star" (too manifesto), "Ready when you are" (too salesy).
- Plain English. Trusted-advisor tone. No exclamation marks. No emojis.

## 5. Proposal section structure (porting order)

Port in this order from `reference/CHPRSL_Proposal_v1.1.html`:

1. **Hero** — violet gradient background, dot-pair motif (violet + coral + rose), title, three-sentence lede, meta row (5 pills including "Pricing valid until 31 May 2026")
2. **StatBar** — four stats: 12 entities, $165K, 1 Jul, 0 NetSuite licences for ~40–50 procurement users
3. **WhatWeHeard** — "v1.1 resolves six decisions the Finance team raised on v1.0" + the 6-row listening table
4. **SolutionStack** — 6 cards: NetSuite ERP, Zudello, NetAsset, Revolut, Fusion5 CSV Integrator, Fusion5 Bank Parser
5. **Phase1Scope** — two-column grid of In scope for Phase 1 vs Deferred to Phase 2
6. **DeliveryApproach** — FOCUS methodology + 5-phase timeline + Governance / Commercial model / Risk response tiles
7. **Configurator** — live commercials; four panels (NetSuite licensing, Fusion5 Optional Connectors, Zudello, NetAsset, Fusion5 implementation) + sticky totals panel with Year 1 and 5-year TCO
8. **IntegrationOptions** — the new section; already scaffolded in `src/components/IntegrationOptions.tsx`
9. **CommercialCallout** — violet block, "The Fusion5 implementation is fixed at $165,000; vendor licensing runs direct with Zudello, NetGain and Revolut..."
10. **NextSteps** — two cards (This week / On approval)
11. **CTA** — warm gradient, "Together, let's go beyond.", mailto button "Confirm approval"
12. **Footer** — attribution + terms + pricing validity

## 6. Integration Options — design intent

Scaffolded at `src/components/IntegrationOptions.tsx`. Current state: three placeholder cards per phase with prose-only content.

Open design decisions for the next session (raise with Joel before building):

1. **Selection semantics**. Options are informational at the moment. Should they be radio-selectable (CHPRSL makes a commitment in the document) or informational only (options presented for discussion)? If selectable, does the selection feed the configurator totals?
2. **Phase 1 three options**. Current scaffold uses the three Phase 1 integration paths (vendor-supplied, CSV Integrator, Bank Parser). Alternative framing: Zudello data-sync choices from v1.1 Decision 6 (full sync vs minimal sync vs minimal + GRNI reversing journal). Confirm with Joel which framing fits the proposal.
3. **Phase 2 three options**. Current scaffold uses middleware candidates (Campfire / Azure Service Bus / iPass AI). Alternative: three analytics paths (NSAW / Microsoft Fabric / existing BI + LLM). Confirm with Joel.
4. **Cost presentation**. Each option could show a cost/effort dial. None of the Phase 2 options have pricing committed yet.
5. **Visual pattern**. Three side-by-side cards per phase today. Could be a table, a decision matrix, or "recommended / alternative / long-horizon" vertical.

Whatever framing lands, keep McKinsey tone: claim-making headings, assertion-evidence bullets, calibrated language, no em-dashes.

## 7. Open items as of 22 April 2026

From the 21 April Brendan follow-up email (captured in `reference/Brendan_Reply_21Apr.txt` — Joel's drafted reply):

- **Zudello demo** today (Tuesday 22 Apr). Capability validation; potential expense-module swap with Revolut.
- **Shepherd CMMS demo** today (Wednesday 22 Apr). Potential Mex replacement. Phase 1 NetSuite scope is agnostic.
- **IGT integration history** with Fusion5's gaming vertical. Response committed within two days.
- **Humanforce Phase 1 vs Phase 2** preference from Brendan.
- **Supy vs Restoke** stock platform choice. New info 21 Apr: SwiftPOS has native Restoke.AI connector. Strengthens Restoke case materially.
- **Zudello data-sync scope** (v1.1 Decision 6): full sync vs minimal vs minimal + GRNI reversing journal. To resolve in alignment.
- **Board paper** landing w/c 28 April.

## 8. Repo layout

```
/
├── CONTEXT.md                (this file)
├── README.md                 (quickstart + stack notes)
├── netlify.toml              (build = npm run build, publish = dist)
├── index.html                (Vite entry, Plus Jakarta Sans loaded)
├── package.json              (Vite + React 19 + TS)
├── src/
│   ├── main.tsx              (React root, imports brand tokens + globals)
│   ├── App.tsx               (shell: PlaceholderHero + IntegrationOptions + PlaceholderFooter)
│   ├── components/
│   │   ├── IntegrationOptions.tsx   (Phase 1 + Phase 2 placeholder cards)
│   │   └── IntegrationOptions.css
│   └── styles/
│       ├── tokens.css        (Fusion5 brand tokens as CSS custom properties)
│       └── globals.css       (base HTML element styles, .wrap, .eyebrow, .section-*)
└── reference/
    ├── CHPRSL_Proposal_v1.1.html     (production HTML — the port source)
    ├── CHPRSL_High_Level_Scope_v1.1.md
    ├── CHPRSL_Joel_Brief_v1.1.md
    └── Brendan_Reply_21Apr.txt
```

## 9. Working principles for the next session

- **Trust the reference HTML for content accuracy.** The copy in `reference/CHPRSL_Proposal_v1.1.html` has been through the McKinsey tone pass and Joel's review. Preserve verbatim unless refactoring specifically for component reuse.
- **Port, don't redesign.** The visual language is locked. Don't invent new layouts.
- **Keep components small.** One section per file. Props minimal.
- **Configurator is stateful; rest is static.** Use `useState` for configurator. Most sections are pure JSX.
- **No em-dash autoconversion traps.** VSCode / Outlook / macOS all autocorrect `--` to `—`. Double-check before commit.
- **Ask Joel before settling the Integration Options framing.** It's the newest feature; the rest is content port.

## 10. Commands

```bash
npm install      # first time after clone
npm run dev      # local dev server (Vite, default port 5173)
npm run build    # tsc -b && vite build → outputs to dist/
npm run preview  # preview the production build locally
```

## 11. Deployment

- **Live site:** https://chprsl-proposal.netlify.app
- **Netlify admin:** https://app.netlify.com/projects/chprsl-proposal (account: Eagle Gaming)
- **GitHub repo:** https://github.com/JoelDMikkelsen/chprsl-proposal

The first production deploy was pushed via `netlify deploy --build --prod` from the CLI. **Continuous deployment from `main` is not yet wired up** because the Netlify→GitHub OAuth handshake needs an interactive browser step.

To enable auto-deploys (one-off, roughly 30 seconds via the Netlify dashboard): see README.md § Deployment.

Until that happens, deploy manually with:

```bash
netlify deploy --build --prod
```

---

Last updated: 22 April 2026.
