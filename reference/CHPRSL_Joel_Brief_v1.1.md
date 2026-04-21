# CHPRSL × Fusion5 — v1.1 Scope Update Brief

**For:** Joel Mikkelsen
**Purpose:** Brief for tomorrow's call with CHPRSL, summarising the current state of the High-Level Scope (v1.1) following last week's meeting.
**Full doc:** `CHPRSL_High_Level_Scope_April.md` (v1.1, April 2026)

---

## Headline

Following last week's follow-up meeting, the scope has been iterated to v1.1. The direction of travel is **lighter-touch NetSuite + stronger third-party vendor ecosystem**, with NetSuite positioned as the accounting and analytics consolidation layer. Nine substantive scope changes, captured below.

---

## Major Changes

### 1. Zudello replaces Zone Capture — end-to-end P2P platform
Zudello is now the full procure-to-pay platform, not just an OCR / AP capture tool. It covers:
- Supplier onboarding
- Purchase orders (raised in Zudello, not NetSuite)
- Item receipting (in Zudello — avoids licensing ~40–50 occasional receipters on NetSuite General Access)
- Three-way matching (entirely in Zudello)
- AP invoice capture and authorisation
- Budget vs. remaining spend control at the point of commitment

**Data flowing Zudello → NetSuite:** vendors, POs, item receipts, approved bills (the PO/IR sync is subject to confirmation — see open decisions).

**Integration:** vendor-supplied and implemented by Zudello. No Fusion5 integration build effort required.

**Mediusflow:** decommissioned in Phase 1, no integration.

### 2. Fixed Assets → NetAsset (NetGain)
Native NetSuite Fixed Assets Management removed from the BOM. NetAsset (a NetGain SuiteApp that runs inside NetSuite) now the Phase 1 approach.
- Sizing: ~3,000 assets (indicative — CHPRSL clean-up required)
- Single accounting depreciation schedule
- Single low-value pool ledger (assets <$500)
- Licensed per-asset by NetGain, separate from NetSuite BOM

### 3. Revolut confirmed for corporate card & expense management
Promoted from Phase 2 / Future Integrations to a confirmed Phase 1 scope item. Vendor-supplied integration. Revolut plan tier confirmation remains a CHPRSL action with their account manager.

### 4. Job costing confirmed — native custom segment
Decision locked: job/project reporting via a native NetSuite custom segment ("Job" / "Project"), not Basic Projects or SuiteProjects. Three use cases documented:
- Capital projects / WIP
- Events & functions profitability
- Marketing campaign tracking

Delivered within Financials First Standard at no additional licence cost.

### 5. Middleware deferred to Phase 2
Phase 1 integrations use native / vendor-supplied integrations and flat-file ingestion via the Fusion5 CSV Integrator. Middleware (Campfire candidate, currently being repriced) is reframed as Phase 2 architectural intent, not Phase 1 scope.

### 6. ARM deferred to Phase 2
Revenue recognition continues via existing spreadsheet processes for Phase 1. ARM not needed.

### 7. User licensing locked in
| Licence Type | Qty | Notes |
|---|---|---|
| General Access | **6** | 5 finance team (Despina, Anita, Joyce, Liz, Mobin) + 1 IT Admin |
| View & Approve (5-pk, **12-month term**) | **4 packs (20 licences, 16 users)** | 7 SLT bank authorisers + 9 dashboard / P&L viewers. Dashboard slice is transitional — intended to drop in Phase 2 when NSAW arrives. Specialised Site & Operations user evaluated and ruled out. |
| Employee Self-Service | 1 (out-of-box) | No change |

Proof-of-concept confirmed View & Approve users can edit custom records — so contract management is accessible to contract owners outside finance without requiring General Access licences.

### 8. Database tier — Standard
Assumed **Standard** tier based on summary-journal integration architecture (SwiftPOS, Concilio, Micropay, Zudello all bringing summary journals, not line-level transactions). Expected to sit well inside the 200,000 transaction-lines-per-month threshold. Formal tier assessment to validate during alignment; substantial NetSuite headroom (up to Ultimate tier = 50M lines/month) if future growth changes the picture.

### 9. Contract Management — mild customisation in NetSuite
New custom record in NetSuite with contract owner, effective/renewal dates, document attachment, SuiteFlow approval routing. Contract-specific pricing stays in Zudello. Accessible to View & Approve users.

---

## Also Worth Mentioning

- **Journal Approval Workflow** — added as an explicit customisation alongside Vendor Bank Details and Contract Management (manual journals routed for approval; integration-sourced journals carved out).
- **§4.3 reframed** — now "Third-Party Platforms & SuiteApps", listing Zudello, Revolut, and NetAsset together so the full third-party cost stack is visible in one place.
- **Risk register rewritten** (§13) — AP Automation risk removed (resolved); middleware build risk removed (deferred); third-party vendor delivery dependency, Zudello product-fit, and Revolut plan tier added as new risks. IT maturity risk reframed: multi-vendor architecture *is* the mitigation, not in tension with it.
- **Open Decision Items tidied** — AP Automation, Job Costing, Fixed Assets, User Licence Type, View & Approve Term, and Database Tier all moved to a new "Resolved Decisions" subsection in §11. Six items remain open.
- **Cost tables flagged pending restatement** — §10.3 and §10.5 still carry v1.0 figures; notes added explaining what's changing (NetAsset in, native FA out, user mix refinement, Campfire repricing).

---

## Open Decisions Remaining (§11)

| # | Decision | Owner |
|---|---|---|
| 1 | Payroll System — Micropay vs Humanforce | CHPRSL |
| 2 | FP&A / Budgeting Tool (Phase 2) — EPM vs Adaptive vs IBM | CHPRSL |
| 3 | Data Warehouse / BI — Azure Fabric vs NSAW vs existing | CHPRSL / Fusion5 |
| 4 | Cash Reconciliation — direct vs data lake | CHPRSL / Greg Chompff |
| 5 | Middleware Vendor (Phase 2) — Campfire candidate | Fusion5 |
| 6 | Zudello data sync scope — full / minimal / reversing-journal middle option | CHPRSL / Fusion5 / Zudello |

---

## CHPRSL Actions Outstanding

- **Zudello tier confirmation** with their account manager (NetSuite integration + corporate card + expense features at which Zudello tier)
- **Revolut plan tier confirmation** with their account manager
- **Zudello demo** being teed up via Wild Tech First
- **Zudello clarification** — whether AP-bill attachments sync to NetSuite as attachments or hyperlinks
- **Asset register clean-up** ahead of NetAsset migration
- **Board paper** due Thursday next week

## Fusion5 Actions Outstanding

- **Revised quote** — Friday afternoon target, Monday latest (Sven + Jayden commercial review)
- **Campfire repricing**
- **NSAW mid-tier included user count** — Joel's Oracle query
- **ABA/EFT payment batch drill-down confirmation** back to Brendan
- **Tier assessment** — formal validation during alignment

---

## Talking Points for Joel

1. **The scope is materially more honest than v1.0.** Zone Capture was insufficient for the receipting gap; Zudello covers that end-to-end. NetSuite Fixed Assets less appropriate than NetAsset for this use case. View & Approve licences cleanly cover both bank authorisation and dashboard use cases — no nickel-and-diming two licence types.

2. **The commercial story is clearer.** Fewer NetSuite General Access licences (6 vs 10), View & Approve on 12-month term preserves year-two flexibility, middleware deferred to Phase 2 removes a big Phase 1 cost/risk line. Third-party costs (Zudello, Revolut, NetAsset) sit vendor-direct and outside the NetSuite BOM.

3. **The Zudello product-fit risk is the biggest open item.** CHPRSL hasn't seen the Zudello demo yet. A lot rests on that demo confirming what we've scoped.

4. **The quote is being reworked for Friday/Monday.** Commercial review tomorrow morning with Sven, then Jayden. Numbers in §10.3 and §10.5 are flagged as pending restatement in the doc itself, so CHPRSL has visibility that the figures are in motion.



