# High Level Scope — NetSuite Implementation

**Canterbury-Hurlstone Park RSL Club Ltd (CHPRSL)**

| Field | Value |
| --- | --- |
| Prepared by | Fusion5 |
| Date | April 2026 |
| Version | 1.1 (Draft) |
| Status | Pre-Submission — Iteration |

# 1. Document Purpose

This document defines the high-level scope for the NetSuite ERP implementation at Canterbury-Hurlstone Park RSL Club Ltd (CHPRSL) and its related entities. It is intended to provide a common reference for Fusion5 and CHPRSL stakeholders prior to formal Statement of Work (SOW) execution, and to align expectations across functional, integration, and commercial workstreams.

# 2. Client Overview

| **Client** | Canterbury-Hurlstone Park RSL Club Ltd |
| --- | --- |
| **Primary Site** | 20-26 Canterbury Road, Hurlstone Park NSW 2193 |
| **Project Sponsor** | Brendan McDowell (CFO) |
| **Key Client Stakeholders** | Finance team (Elizabeth, Joyce, Anita), IT/Systems (Stephen) |

CHPRSL is a multi-entity hospitality and gaming group operating across several trading and non-trading subsidiary entities. The group operates gaming, food & beverage, fitness, functions & events, and membership businesses. Financial management is currently conducted across a fragmented legacy stack anchored by the on-premises accounting system **Adept**, with integrations managed largely by individual system vendors.

# 3. Entity Structure

The following **12 entities** are in scope for NetSuite, based on the confirmed group structure:

| **#** | **Entity** | **Type** | **Trading Status** | **Reporting Notes** |
| --- | --- | --- | --- | --- |
| 1 | Canterbury-Hurlstone Park RSL Club | Parent / Trading | Active | TB prepared; Advisory Committee |
| 2 | CHPRSL Holdings Pty Ltd | Holding | Active | Consolidated TB; Group Statutory Financials lodged |
| 3 | Communal Group HQ | Cost Centre / Admin | Active | All Group admin and shared expenditure; no separate TB currently |
| 4 | Camperdown Project Pty Ltd | Subsidiary | Active | TB prepared; 3 board members |
| 5 | CMNL Health and Fitness Pty Ltd | Subsidiary | Active | TB prepared; Anytime Fitness Hurlstone Park franchise |
| 6 | CMNL Property Investments Pty Ltd | Subsidiary | Non-Trading | Non-trading entity |
| 7 | Camperdown Tennis Pty Ltd | Subsidiary | Active | Corporate Trustee & Operator; TB + BAS lodged |
| 8 | Camperdown Tennis Unit Trust | Trust | Active | Lessee of tennis property; linked to Camperdown Tennis Pty Ltd |
| 9 | Bargo Sports Club | Subsidiary | Active | TB prepared; Advisory Committee |
| 10 | Magpie Sports Club | Subsidiary | Active | TB prepared; Advisory Committee |
| 11 | Marrickville RSL Club | Subsidiary | Not Currently Trading | Former premises closed 31/12/07; TB prepared |
| 12 | CMNL Academy | Subsidiary / RTO | Active | P&L part of CHP RSL Club TB |

> **Note:** Future entities (flagged as "Future Addition" in org chart) are not in Phase 1 scope.

# 4. NetSuite Licensing

## 4.1 Proposed Edition

**SuiteSuccess Financials First Standard Edition (International)**

| **SKU / Module** | **Qty** | **Notes** |
| --- | --- | --- |
| Core ERP & CRM | 1 | GL, AP, AR, Purchasing, Inventory, Order Entry, Expense Reporting |
| NetSuite Subsidiary Management | Included | Multi-entity consolidation |
| NetSuite Financial Management | Included | Advanced financial reporting |
| NetSuite Advanced Electronic Bank Payments | Included | Bank feeds and payment automation |
| SuiteAnalytics BI | Included | Native reporting and dashboards |
| General Access Users | 6 | Full licensed users — 5 finance team (Despina, Anita, Joyce, Liz, Mobin) + 1 IT Admin for NetSuite administration and governance separation |
| Employee Self-Service Users (5-pk) | 1 | Included; not counted against user cap |
| View and Approve Users (5-pk, 12-month term) | 4 | 16 users total — 7 SLT bank authorisers (payment batch review: view bills, check coding, check bank details before approving in the bank) + 9 dashboard / P&L viewers. Comes in 5-packs, so 4 packs cover the 16 users (20 licences). Structured as a 12-month-only licence term (rather than aligned to a multi-year NetSuite renewal) to retain flexibility — dashboard viewer licences are a transitional measure and are expected to be dropped in Phase 2 once NetSuite Analytics Warehouse (NSAW) is introduced, as NSAW includes its own bundled users. Note: Specialised Site & Operations user licence was also evaluated and ruled out — View & Approve is sufficient for both use cases. |
| Sandbox Account | 1 | Development and testing environment |
| Database Tier | Standard | Based on CHPRSL's expected transaction profile: summary journals from SwiftPOS (not line-level POS transactions), ~10,000 POs/year, summary-level payroll and gaming journals. Expected to be well inside the 200,000 transaction-line-per-month threshold for Standard tier. **Uncertainty:** Final tier assessment to be validated during alignment; assumption is contingent on integrations bringing summary journals (not detailed transactions) into NetSuite. If Phase 2 introduces detailed-line integrations or significant transaction volume growth, an upgrade to Premium tier may be required. NetSuite supports Premium / Enterprise / Ultimate / Unlimited tiers with substantial headroom (Ultimate supports 50M transaction lines/month), so future growth is accommodated without re-platforming. |
| Company LCS Training Pass - Standard | 1 | NetSuite learning platform |

## 4.2 Add-On Modules — Under Evaluation

| **Module** | **Status** | **Notes** |
| --- | --- | --- |
| Advanced Revenue Management (ARM) | Phase 2 | Relevant to membership and functions revenue recognition. For Phase 1, revenue recognition will continue to be managed outside NetSuite via existing spreadsheet processes. ARM deferred to Phase 2. |
| NetSuite EPM | Phase 2 | Budgeting and multi-entity planning; deferred pending decision |
| NetSuite Analytics Warehouse (NSAW) | Phase 2 | Enterprise data warehouse; separate from NSAW BI analytics |

## 4.3 Third-Party Platforms & SuiteApps

Third-party platforms and SuiteApps that integrate with or run within NetSuite. Licensed directly by CHPRSL with the respective vendor; separate from the NetSuite BOM above.

| **Product** | **Vendor** | **Type** | **Status** | **Notes** |
| --- | --- | --- | --- | --- |
| Zudello | Zudello | External P2P Platform | Confirmed | End-to-end P2P platform covering supplier onboarding, purchase orders, item receipting, three-way matching, OCR-based invoice capture, DOA approval workflows, and budget-vs-remaining-spend control. Replaces Mediusflow (decommissioned in Phase 1). Integration to NetSuite is vendor-supplied and implemented by Zudello. User licensing scope, tier, and pricing to be confirmed directly with Zudello following the demo. See §5.2, §7.2. |
| Revolut | Revolut | External Expense / Card Platform | Confirmed | Corporate credit card and expense management. Transactions flow from Revolut into NetSuite via a vendor-supplied integration. Plan tier to be confirmed with CHPRSL's Revolut account manager to ensure the NetSuite integration and required features are included at the selected tier. See §5.1, §7.2. |
| NetAsset | NetGain | SuiteApp (runs within NetSuite) | Confirmed | Replaces native NetSuite Fixed Assets Management for Phase 1. Provides asset register, depreciation schedules, and lifecycle management. Phase 1 sizing: ~3,000 assets (indicative, clean-up required), single accounting depreciation schedule, single low-value pool ledger (assets under $500). Licensed per-asset by NetGain. See §5.1, §9. |

# 5. In-Scope Functional Areas

## 5.1 Financial Management

- **General Ledger** — Chart of accounts design across all entities; segment structure (departments, classes, locations aligned to business units: Gaming, F&B, Fitness, Functions, Membership)

- **Multi-Entity / Subsidiary Management** — Intercompany transactions, consolidated reporting, entity-level TB preparation and consolidation for Holdings

- **Accounts Payable** — Vendor bill entry and approval workflows handled in Zudello (OCR-based invoice capture, coding, and DOA approvals), with approved bills flowing into NetSuite for payment; bank payment runs via Advanced Electronic Bank Payments. Mediusflow will be replaced by Zudello as part of the Phase 1 implementation.

- **Accounts Receivable** — Cash application, customer invoicing for relevant revenue streams

- **Revenue Recognition** — Managed outside NetSuite via existing spreadsheet processes for Phase 1. NetSuite Advanced Revenue Management (ARM) is deferred to Phase 2 (see §4.2).

- **Bank Feeds & Reconciliation** — Inbound/outbound bank feed deployment; cash reconciliation with live data requirement noted

- **Fixed Assets Management (NetAsset by NetGain)** — Asset register, depreciation schedules, and asset lifecycle managed through the NetAsset SuiteApp (see §4.3). Phase 1 includes a single accounting depreciation schedule and a single low-value pool ledger for assets under $500. Potential future linkage to Field Service Management (FSM) deferred to a later phase.

- **Expense Management** — Corporate card transactions and staff expense reporting managed via Revolut, with transactions and expense data flowing into NetSuite for GL posting (see §7.2).

- **Month-End Close** — Accruals (including receipted-unbilled / GRNI accruals for goods or services received prior to vendor invoice receipt), journals, intercompany eliminations, consolidated reporting package. GRNI accrual data is sourced from item receipt records synced in from Zudello (see §5.2 and §7.2).

## 5.2 Procurement

Procurement is delivered end-to-end through Zudello, with NetSuite acting as the accounting and analytics consolidation layer. This deliberately minimises the number of NetSuite General Access licences required for procurement activity (estimated ~40–50 occasional PO, receipting, and requisition users across venues and back-of-house), while preserving rich procurement metadata within NetSuite to support month-end accruals and future data lake / analytics consumption without requiring analytics tools to connect directly to Zudello.

**Data flowing from Zudello into NetSuite (Phase 1, subject to confirmation — see §11):**

- **Vendors / suppliers** (master data, post-onboarding approval)
- **Purchase orders** (as records, for commitment visibility and metadata)
- **Item receipts** (supporting month-end GRNI accruals — see §5.1 Month-End Close)
- **Vendor bills** (for payment and the actuals ledger)

### Functional Scope

- **Supplier Onboarding** — Performed in Zudello. Supplier master data (including bank details, ABN, contact information, and supporting documents) is captured and approved in Zudello and synced to NetSuite. The Vendor Bank Details Approval Workflow in §5.6 provides a second-line NetSuite-side control on bank detail changes.

- **Purchase Orders** — Raised and approved in Zudello. PO records are synced into NetSuite for reporting, commitment visibility, and to keep procurement metadata co-located with the financial ledger. Zudello's PO approval workflows enforce DOA policy at the point of commitment.

- **Goods / Item Receipting** — Performed in Zudello. Receipt data is synced into NetSuite to support month-end GRNI (receipted-unbilled) accruals and to preserve procurement metadata. Keeping the receipting UX in Zudello avoids requiring NetSuite licences for occasional receipters. Note: for any PO that pertains to stock/inventory, operational receipting is largely handled in the relevant inventory system (e.g., Cooking the Books for kitchen inventory) given NetSuite inventory management is out of scope for Phase 1 (§6).

- **Three-Way Matching** — Performed entirely in Zudello (PO → Receipt → Bill). Only matched, approved bills flow from Zudello into NetSuite for payment.

- **Approval Workflows** — DOA compliance, invoice capture, coding, and approval routing managed in Zudello; approved bills sync to NetSuite.

- **Budget vs. Remaining Spend** — Managed in Zudello at the point of commitment. Budgets (by cost centre / GL account / department as agreed during alignment) are loaded into Zudello, and POs and bills draw down against available budget in real time. This gives requisitioners and approvers live visibility of remaining spend before committing expenditure, without requiring NetSuite access. NetSuite retains the actuals ledger for financial reporting.

> **Uncertainty:** Whether Purchase Orders and Item Receipts should sync into NetSuite as records — or whether Zudello should remain the sole source of truth for those entities, with NetSuite receiving only vendors and approved bills. Bringing POs and IRs into NetSuite supports month-end GRNI accruals, centralises procurement metadata for downstream analytics / data lake consumption (reducing the number of source systems a future data lake must connect to), and keeps the ERP as the integration hub. The trade-off is integration complexity, volume, and duplication of data. A middle-ground option is to leave POs and IRs in Zudello but post a bespoke month-end reversing journal into NetSuite (sourced from a Zudello extract/report) to capture GRNI at period close — achieving the accounting outcome without per-record sync, while leaving analytics consumers to connect to Zudello (or a future data lake) for line-level procurement data. To be validated with CHPRSL during the alignment workshop and confirmed with Zudello regarding available sync endpoints and reporting. See §11, Open Decision Item 7.

## 5.3 Approvals & Controls

- **AP Approval Workflows** — Integrated with DOA policy; currently 2 approval users in scope (CFO and CEO)

- **Journal Approvals** — Manual journal entries routed for approval via a dedicated Journal Approval Workflow, delivered as a NetSuite customisation/configuration (see §5.6). System-generated journals originating from integrations are out of scope for this workflow.

- **Vendor Bank Account Approvals** — A dedicated Vendor Bank Details Approval workflow is in scope as a NetSuite customisation/configuration (see Section 5.6). EFTSure is used by CHPRSL for outbound payment validation; in Phase 1 the ABA bank file generated by the Fusion5 Bank Parser will be manually uploaded to EFTSure via its browser extension for validation prior to bank submission. A direct integration between NetSuite and EFTSure is optional and deferred to Phase 2.

## 5.4 Reporting & Analytics

- **SuiteAnalytics BI** — Native dashboards, KPI portlets, saved searches

- **Financial Report Builder** — P&L, Balance Sheet, and consolidated group reporting

- **Subsidiary-Level TB and Consolidation** — Per entity and group rollup

## 5.5 Native AI Capabilities (Included — No Additional Licensing)

The following native NetSuite AI features will be available from go-live as part of the standard platform:

- **MCP Connector Service** — Model Context Protocol; enables natural language querying of NetSuite data via AI agents (e.g., Claude, ChatGPT); custom tools can be built on top of NetSuite's native toolset

- **Financial Exception Management** — AI-flagged anomaly detection across financial transactions

- **Payment Day Predictions** — AI-driven prediction of supplier payment timing

- **Text Enhanced** — AI-assisted data enrichment and text processing within transactions

- **NetSuite Expert (AI Assistant)** — Natural language querying within the NetSuite interface

> **Note:** These capabilities are included natively with bi-annual platform updates delivering new AI features continuously. No additional SKU or licensing cost applies.

## 5.6 Customisations & Configuration

The following customisations and configurations are in scope for Phase 1. These are delivered through NetSuite's native configuration layer (SuiteFlow workflows, custom fields, forms, and roles) and do not require custom SuiteScript development unless otherwise noted.

- **Vendor Bank Details Approval Workflow** — A SuiteFlow-based approval workflow to govern changes to vendor bank account details within NetSuite. When a vendor's bank account record is created or modified, the workflow will route the change for review and approval by an authorised user (e.g., Finance Manager or CFO) before the record becomes active for payment processing. This control reduces the risk of fraudulent payment redirection. Configuration includes: trigger conditions, approval routing rules, email notifications, and audit trail logging on the vendor record. Note: in Phase 1, CHPRSL will continue to use EFTSure for outbound payment file validation via manual upload of the ABA file through the EFTSure browser extension; a system-level integration with EFTSure is not included in Phase 1 (see Section 7.5).

- **Contract Management (Mild Customisation)** — A custom record in NetSuite to store supplier and service contracts, with fields for contract owner, effective and renewal dates, document attachment, and SuiteFlow approval routing. Provides a central contract repository and renewal-tracking layer. **Access:** View & Approve users (§4.1) are confirmed as able to edit this custom record, enabling contract owners outside the finance team to create and maintain contract records without requiring General Access licences. Contract-specific pricing, where required, is maintained in the upstream P2P system (Zudello); this will be validated with Zudello during the alignment workshop.

- **Journal Approval Workflow** — A SuiteFlow-based approval workflow to govern manual journal entries created within NetSuite. Routes journals for review and approval by an authorised user prior to posting. Configuration includes: trigger conditions (e.g., journal type, amount thresholds, subsidiary), approval routing rules aligned with DOA policy, email notifications, and audit trail logging on the journal. Note: journal postings originating from integrations (e.g., SwiftPOS summary journals via the Fusion5 CSV Integrator, Zudello-sourced bills, payroll journals) are system-generated and are not subject to this manual-journal approval workflow; controls on those flows sit with the source system and the integration design.

## 5.7 Job Costing — Native Custom Segment (Confirmed)

Job costing is in scope for Phase 1 and will be delivered via a **native NetSuite custom segment** ("Job" / "Project"), tagging transactions at the line level to enable job-level P&L reporting via saved searches and the Financial Report Builder. This is delivered within Financials First Standard Edition at no additional licence cost.

**Use cases in scope (confirmed during scoping):**

- **Capital projects / WIP** — tracking costs against capital projects and venue refurbishments through to capitalisation.
- **Events / functions profitability** — revenue and cost attribution per event or function to support profitability analysis.
- **Marketing campaign tracking** — cost tracking against marketing campaigns to assess campaign ROI.

The custom segment approach was selected over the alternatives below after a scoping review with CHPRSL, on the basis that the requirement is predominantly cost and revenue *visibility in reporting* rather than full project-lifecycle management (templates, resource allocation, time capture, billing, WIP). Alignment workshop activity for job costing is therefore focused on segment design and reporting configuration rather than option re-evaluation.

### Options Considered

| **Option** | **Approach** | **Complexity** | **Additional Licensing** | **Outcome** |
| --- | --- | --- | --- | --- |
| 1. Basic Projects | Use NetSuite's native basic project record functionality to assign transactions to projects; provides simple job-level cost tracking and reporting without full project management capability | Low | None — included in Core Suite | Not selected — less flexible for line-level reporting than a custom segment |
| **2. Custom Segment (Selected)** | Configure a custom GL segment ("Job" / "Project") to tag transactions at the line level; enables job-level P&L reporting via saved searches and Financial Report Builder without using project records | Low-Medium | None — native configuration | **Selected** — fits CHPRSL's reporting-led requirement at no additional licence cost |
| 3. SuiteProjects | Full NetSuite project management module; includes project templates, resource allocation, time and expense tracking against projects, project billing, and WIP reporting | High | Yes — requires upgrade from Financials First to Services Standard Edition (~$2,100/month additional, inclusive of SuiteProjects and Revenue Recognition) | Not selected — overkill for current requirements. |

# 6. Out of Scope — Phase 1

The following items are explicitly excluded from Phase 1 and deferred to Phase 2 or a future project:

| **Item** | **Rationale** |
| --- | --- |
| NetSuite EPM (Enterprise Performance Management) | Phase 2; decision pending on EPM vs. competing tools (Workday Adaptive, IBM Planning Analytics) |
| NetSuite Analytics Warehouse (NSAW) | Phase 2; requires data strategy decision |
| Microsoft Azure Fabric / Data Warehouse | TBD; separate commercial evaluation required |
| Field Service Management (FSM) | Future phase; noted as potential future linkage with Fixed Assets |
| Future legal entities (flagged in Org Chart) | Not yet active or ready for onboarding |
| Inventory management in NetSuite | Currently managed within SwiftPOS; not migrated in Phase 1 |
| CRM / Marketing Automation | Included in Core Suite licence but not in implementation scope Phase 1 |
| HR & Payroll (NetSuite native) | Out of scope; payroll system decision between Micropay and Humanforce pending |

# 7. Integration Scope

## 7.1 Integration Architecture

For Phase 1, integrations are delivered via native / vendor-supplied integrations (e.g., Zudello, Revolut, Cooking the Books) and flat-file / scheduled imports using the Fusion5 CSV Integrator (e.g., SwiftPOS, Micropay, Concilio). This approach avoids the need for a middleware build in Phase 1 while keeping data flowing into NetSuite reliably.

A **middleware / message bus pattern** is proposed for Phase 2, to introduce richer, more real-time integration over time. The intended architecture (designed by Greg Chompff) is:

- A **listener** receives incoming requests and places them on a service bus (Azure Service Bus or MQP for NetSuite)

- A **secondary application** reads from the bus and writes to NetSuite

- This pattern throttles data to prevent overwhelming the ERP while maintaining front-end system performance (critical for SwiftPOS which must operate at maximum speed without degradation)

Middleware vendor selection (see §11 Decision 5) and Campfire repricing remain open for Phase 2; middleware costing is indicative only (see §7.5).

## 7.2 In-Scope Integrations (Phase 1)

| **System** | **Direction** | **Method** | **Priority** | **Notes** |
| --- | --- | --- | --- | --- |
| SwiftPOS | Outbound → NetSuite | Flat File via Fusion5 CSV Integrator | Critical | POS journals; summary-level GL entries; currently pushes to Adept. Flat-file ingestion via the Fusion5 CSV Integrator is the confirmed Phase 1 path. API / middleware-based ingestion deferred to Phase 2. |
| Concilio | Outbound → NetSuite | Manual or Flat File via Fusion5 CSV Integrator | Critical | Concilio is the gaming machine reconciliation tool used to extract data from the gaming machines managed by IGT. A direct API integration with IGT is not available; Concilio serves as the data extraction layer, with gaming revenue data imported into NetSuite either manually or via scheduled flat file using the Fusion5 CSV Integrator. Integration method to be confirmed in Design workshop. |
| Micropay (or Humanforce) | Outbound → NetSuite | API or Flat File via Fusion5 CSV Integrator | Critical | Payroll journals; decision on integration method dependent on payroll system selection. Fusion5 CSV Integrator covers flat file pay run exports; API path available if Humanforce is selected |
| Zudello | Bi-directional ↔ NetSuite | Vendor-supplied integration (implemented by Zudello) | Critical | End-to-end P2P platform covering supplier onboarding, purchase orders, item receipting, three-way matching, OCR-based invoice capture, DOA approval workflows, and budget-vs-remaining-spend control. Zudello → NetSuite data sync covers vendors, POs, item receipts, and approved vendor bills (the inclusion of POs and IRs is subject to confirmation — see §11 Decision 6), preserving procurement metadata in NetSuite for month-end GRNI accruals and future analytics / data lake consumption. Replaces Mediusflow (decommissioned in Phase 1). Integration build and implementation delivered by Zudello; no Fusion5 integration effort required. |
| Revolut | Bi-directional ↔ NetSuite | Vendor-supplied integration (implemented by Revolut) | High | Confirmed Phase 1 scope for corporate credit card and expense management. Transactions and expense data flow from Revolut into NetSuite for posting to the appropriate GL accounts. Integration delivered by Revolut; no Fusion5 integration effort required. Revolut plan tier to be confirmed with CHPRSL's Revolut account manager to ensure the NetSuite integration (and corporate card / travel / expense management features) are included at the selected tier. |
| Bank Feeds (Inbound) | Inbound → NetSuite | Native (AEBP) | High | Inbound bank statements for reconciliation |
| Bank Payment Files (Outbound) | NetSuite → Bank | ABA File via Fusion5 Bank Parser | High | Generates ABA files from NetSuite payment runs for processing by CHPRSL's bank |
| Cooking the Books | Outbound → NetSuite | Native | To Be Validated | A native integration exists between Cooking the Books and NetSuite, enabling supplier invoices to be extracted and pushed into NetSuite for AP processing. To be validated during alignment workshop; subject to CHPRSL decision on whether to include in Phase 1 or defer. |

> **Note:** Payroll integration will be to either Micropay (current on-premises) or Humanforce (which includes a payroll module), pending a decision by CHPRSL.

> **Note:** Mediusflow is not included as an integration in Phase 1. Zudello will be implemented as the end-to-end P2P platform — covering supplier onboarding, purchase orders, item receipting, three-way matching, AP invoice capture and authorisation, and budget-vs-remaining-spend control — replacing Mediusflow's current function. A Mediusflow integration is not required and is excluded from scope.

## 7.3 Fusion5 Integration Tools

Two Fusion5-native integration tools are included in the Phase 1 scope to handle flat file automation and bank payment file processing. These tools operate within the NetSuite platform and do not require the full middleware layer.

### Fusion5 CSV Integrator

The Fusion5 CSV Integrator automates the scheduled import of flat file (CSV) data into NetSuite, removing the need for manual file uploads. For CHPRSL, this covers:

- **SwiftPOS POS Journals** — End-of-day sales summary journals exported from SwiftPOS as flat files, automatically ingested and posted to the GL in NetSuite on a scheduled basis

- **Micropay Payroll Journals** — Payroll journal flat files (pay run exports) from Micropay automatically imported into NetSuite, eliminating manual journal entry

- **Concilio Gaming Journals** — Gaming machine reconciliation data extracted from Concilio as flat files, automatically imported into NetSuite as GL journals; this removes the need for manual journal entry of gaming revenue and provides a consistent, auditable data path from the gaming floor into the ERP

The CSV Integrator is extensible by design, meaning additional flat file sources can be onboarded as further integration requirements are identified beyond Phase 1. This approach is appropriate where a direct API integration is not available or not warranted by data volume, and it reduces manual processing risk for the Finance team.

### Fusion5 Bank Parser

The Fusion5 Bank Parser enables outbound ABA (Australian Bankers Association) file generation from NetSuite payment runs. This allows CHPRSL to:

- Generate ABA payment files directly from approved NetSuite vendor bill payment batches

- Submit files to CHPRSL's bank for electronic payment processing (EFT/direct credit)

- Maintain a full audit trail within NetSuite from approved bill through to bank submission

This complements the inbound bank feed (via Advanced Electronic Bank Payments) to provide a complete end-to-end AP payment cycle within NetSuite.

## 7.4 Potential Future Integrations (Phase 2 / Out of Scope Phase 1)

| **System** | **Department** | **Current Integration Method / Notes** |
| --- | --- | --- |
| Humanforce | HR / Payroll | API (if replacing Micropay) |
| EFTSure | Finance | Cloud — vendor payment validation; Phase 1: ABA file manually uploaded via EFTSure browser extension. Direct integration optional, Phase 2 |
| Function Tracker | Functions & Events | Cloud — functions management |
| Sevenrooms | F&B | API — restaurant bookings |
| Chomp | F&B / Kitchen | Cloud — food safety |
| Cooking the Books | Kitchen | Direct via SQL / Cloud — kitchen inventory (if not included Phase 1) |
| EagleI360 / Wirely | Gaming | Cloud — BI and reporting |
| Buzz | Gaming | Cloud — member engagement |
| Vettrak | RTO (CMNL Academy) | On Premises — RTO management |
| CircleScan | Gaming | On Premises — member sign-in |

## 7.5 Middleware Costing (Phase 2 — Indicative)

Middleware is not included in the Phase 1 scope. The figures below are indicative Phase 2 costings provided for planning only. Final vendor selection, scope, and pricing will be confirmed separately (see §11 Decision 5). Campfire remains a candidate and is currently being repriced by Fusion5.

| **Option** | **Annual** | **Services Low** | **Services High** |
| --- | --- | --- | --- |
| Middleware (4 systems) — Phase 2 | $25,000 | $150,000 | $250,000 |
| Microsoft Azure Fabric / Data Warehouse | TBD | TBD | TBD |

# 8. Current Systems Landscape

The following systems form CHPRSL's current tech stack and provide context for the NetSuite replacement and integration design:

| **System** | **Category** | **Type** | **Owner** | **Department** |
| --- | --- | --- | --- | --- |
| Adept | Accounting (replacing) | On Premises | Cheryl | Finance |
| Mediusflow | Invoice Authorisation (replacing with Zudello) | Cloud | Joyce | Finance |
| Micropay | Payroll | On Premises | Cheryl | Finance |
| EFTSure | Payment Security | Cloud | Bryen | Finance |
| SwiftPOS | POS | On Premises | Ben | F&B |
| IGT | Membership & Gaming (no direct API; data extracted via Concilio) | On Premises | Damian | Gaming |
| Humanforce | WFM & Time/Attendance | Cloud | Karen | HR |
| ERM | Staff Reporting | Cloud | Karen | HR |
| Function Tracker | Functions & Events | Cloud | Erin | Functions |
| Sevenrooms | Restaurant Bookings | Cloud | Ben | F&B |
| Chomp | Food Safety | Cloud | Logan | Culinary |
| Cooking the Books | Kitchen Inventory | Cloud | Logan | Culinary |
| CherryHub | Gaming Compliance | Cloud | Damian | Gaming |
| BTG | Gaming Paging | On Premises | Damian | Gaming |
| Ecash | Gaming Cashier | On Premises | Damian | Gaming |
| Buzz | Member Engagement (EDM/SMS) | Cloud | Damian | Gaming |
| Betsafe | Self-Exclusion Register | Cloud | Damian | Gaming |
| Beonic | Traffic Counter | Cloud | Damian | Gaming |
| EagleI360 | BI Tool | Cloud | Damian | Gaming |
| Wirely | BI Tool | Cloud | Damian | Gaming |
| Wymac | Gaming Loyalty Kiosk | On Premises | Damian | Gaming |
| CircleScan | Member Sign-In | On Premises | Damian | Gaming |
| Next Payments | Float Reconciliation | Cloud | Damian | Gaming |
| Talkbox | EDM / Marketing | Cloud | Marketing | Marketing |
| Vettrak | RTO Management | On Premises | Courtney | RTO |
| Revolut | Corporate Card / Expense Management | Cloud | TBC | Finance |

# 9. Data Migration

The following data migration activities are in scope for Phase 1:

- Opening balances for all in-scope entities (GL)

- Chart of accounts mapping from Adept to NetSuite

- Vendor master data

- Customer master data (where applicable to AR)

- Fixed asset register (migration into NetAsset; ~3,000 assets indicative — clean-up required prior to cutover, responsibility of CHPRSL with Fusion5 providing templates and guidance)

- Historical transaction data — **indicative assumption:** limited to opening balances; historical data retention outside NetSuite

> **Note:** Additional data migration complexity and training is budgeted as an add-on (36 hours / $9,720).

# 10. Implementation Approach

## 10.1 Methodology

Fusion5 will deliver the implementation using its **FOCUS methodology**, a structured Prince2-aligned delivery approach:

| **Phase** | **Activities** |
| --- | --- |
| Initiate | Project mobilisation, kick-off, governance, business analysis, project definition |
| Design | Design workshops, functional and technical design, gap analysis, system architecture, test plan |
| Build | Environment standup, sprint-based configuration and build, interactive client feedback, QA |
| Test | UAT, data migration, system refinement, acceptance sign-off, business readiness |
| Deploy | Production setup, KUT/user training, go-live, post-live support handover |

## 10.2 Commercial Structure

**Fixed-price implementation** is the agreed commercial structure, with variations managed formally. The client indicated a preference for fixed-price engagement with clearly defined variations for out-of-scope requests.

**Target Go-Live:** 1 July (committed by Fusion5).

## 10.3 Implementation Estimate (Indicative)

| **Phase / Task** | **Delivery Hours** | **Estimated Cost** |
| --- | --- | --- |
| Initiate | 63 | $17,010 |
| Design | 82 | $22,140 |
| Config & Build | 278 | $75,060 |
| Test (Validation) | 219 | $59,130 |
| Deploy | 103 | $27,810 |
| Post Go-Live Support | 85 | $22,950 |
| **Total Core Deployment** | **830** | **$224,100** |
| Add Ons | 32 | $8,640 |
| Additional Data Migration & Training | 36 | $9,720 |
| Integration Support | 32 | $8,640 |
| Identified Customisations | 0 | $0 |
| **Estimated Project Total** | **930** | **$251,100** |
| Contingency (20%) | 186 | $50,220 |

> **Note:** Middleware / integration build costs are separate to the above. Bank feeds (inbound/outbound) are included in the core deployment cost.
>
> **Pending restatement (v1.1):** Figures above are from v1.0 and do not yet reflect the scope changes in this iteration. Anticipated adjustments include: NetAsset implementation effort (replacing native NetSuite Fixed Assets delivery) and removal of Zone Capture-related effort. Revised figures to be issued by Fusion5 with the updated quote.

## 10.4 Optional Services

| **Service** | **Low** | **High** |
| --- | --- | --- |
| Organisational Change Management | $20,000 | $25,000 |
| Client-Side Project Management | $40,000 | $60,000 |

## 10.5 NetSuite Licensing — 5-Year TCO

| **Year** | **Annual Licensing Cost** |
| --- | --- |
| Year 1 | $47,058 (net of 45% discount) |
| Year 2 | $47,058 |
| Year 3 | $47,058 |
| Year 4 | $48,470 |
| Year 5 | $49,924 |
| **5-Year Total** | **$239,568** |

> **Pending restatement (v1.1):** 5-Year TCO above is from v1.0 and does not yet reflect v1.1 scope changes. Anticipated adjustments: (i) native NetSuite Fixed Assets Management removed from the NetSuite BOM; (ii) NetAsset per-asset licensing (NetGain) to be added as a separate line — quote to be obtained from NetGain; (iii) user mix refinement pending (Specialised Site & Operations vs General Access; View & Approve structured as 12-month-only). Revised TCO to be issued with the updated quote.

# 11. Open Decision Items

The following items remain unresolved and will need to be confirmed before or during the Design phase:

| **#** | **Decision** | **Options** | **Owner** | **Impact** |
| --- | --- | --- | --- | --- |
| 1 | Payroll System | (a) Retain Micropay (on-prem, integrate to NetSuite); (b) Move payroll into Humanforce (cloud, fewer integration points) | CHPRSL (HR/Finance) | Determines payroll integration design and removes/adds API dependency |
| 2 | FP&A / Budgeting Tool | (a) NetSuite EPM (native, Phase 2); (b) Workday Adaptive Planning; (c) IBM Planning Analytics | CHPRSL (CFO) | Phase 2 scope; EPM recommended given lower IT maturity and preference for native tooling |
| 3 | Data Warehouse / BI | (a) Microsoft Azure Fabric; (b) NSAW; (c) Existing BI tools (EagleI360/Wirely) remain | CHPRSL / Fusion5 | Affects middleware and analytics architecture |
| 4 | Cash Reconciliation | Live data path to NetSuite directly, or via data lake / BI layer | CHPRSL / Greg Chompff | Integration architecture decision |
| 5 | Middleware Vendor (Phase 2) | Fusion5 middleware (Campfire — currently being repriced) vs. Azure Service Bus vs. existing integration tooling. Middleware not in Phase 1 scope; selection required for Phase 2. | Fusion5 (Greg Chompff) | Cost, ownership, and supportability of the Phase 2 integration layer |
| 6 | Zudello → NetSuite data sync scope | (a) **Full sync** — Vendors, POs, Item Receipts, and approved Bills all sync into NetSuite (supports month-end GRNI accruals from records and centralises procurement metadata for future data lake / analytics consumption with NetSuite as the integration hub); (b) **Minimal sync** — Vendors and approved Bills only (Zudello remains the sole source of truth for POs and IRs, analytics consumers connect to Zudello directly or via a future data lake); (c) **Minimal sync + bespoke reversing journal** — As (b), plus a bespoke month-end reversing journal posted to NetSuite (sourced from a Zudello extract/report) to capture GRNI at period close. Achieves the accounting outcome without per-record PO/IR sync; analytics consumers still go to Zudello for line-level data. | CHPRSL / Fusion5 / Zudello | Affects integration complexity and volume, the month-end accrual process, and the future data lake connection topology |

## Resolved Decisions (Prior Versions)

Decisions captured in earlier versions that are now closed. Full rationale is in the §15 changelog.

| **Decision** | **Resolution** | **Version Resolved** |
| --- | --- | --- |
| AP Automation Path | Zudello confirmed as the Phase 1 P2P and AP automation platform, replacing Mediusflow. Mediusflow decommission timeline to be confirmed during Design phase. | v1.1 |
| Job Costing Approach | Native custom segment confirmed. See §5.7. | v1.1 |
| Fixed Assets Module | NetAsset (NetGain) confirmed, replacing native NetSuite Fixed Assets. See §4.3. | v1.1 |
| Cut-down User Licence Type | View & Approve confirmed as the sole cut-down licence type — serves both the 7 SLT bank authorisers and the 9 dashboard / P&L viewers. Specialised Site & Operations user licence evaluated and ruled out. See §4.1. | v1.1 |
| View & Approve Licence Term | Structured as 12-month-only (not aligned to multi-year renewal) to preserve flexibility to drop dashboard-viewer licences in Phase 2 when NSAW is introduced. See §4.1. | v1.1 |
| NetSuite Database Tier | Standard tier assumed for Phase 1, based on summary-journal integration architecture. Uncertainty flagged — final tier assessment during alignment, revisit if detailed-line integrations are introduced. See §4.1, §12. | v1.1 |

# 12. Assumptions & Exclusions

## Assumptions

- All entities listed in the org chart under CHPRSL Holdings will be configured as NetSuite subsidiaries (OneWorld not required; Subsidiary Management included in Financials First Standard)

- Opening balances and data cleansing are the responsibility of CHPRSL; Fusion5 will provide templates and guidance

- SwiftPOS integration will be summary-level journal entries (not transaction-level line items) based on existing data flow pattern to Adept

- Zudello will be implemented as the end-to-end P2P platform, covering supplier onboarding, purchase orders, item receipting, three-way matching, AP invoice capture and authorisation, and budget-vs-remaining-spend control. Zudello's integration to NetSuite is vendor-supplied and implemented by Zudello. Assumed Phase 1 data sync from Zudello → NetSuite covers vendors, POs, item receipts, and approved vendor bills — preserving procurement metadata in NetSuite for month-end GRNI accruals and future data lake / analytics consumption (subject to confirmation, see §11 Decision 6). NetSuite acts as the actuals ledger and analytics consolidation layer; operational procurement UX remains in Zudello. Mediusflow will be decommissioned as part of the Phase 1 transition and no integration between Mediusflow and NetSuite is required.

- Fixed Assets Management will be delivered via the NetAsset SuiteApp (NetGain), not native NetSuite Fixed Assets. Phase 1 sizing assumes ~3,000 assets (indicative — subject to clean-up by CHPRSL prior to cutover), a single accounting depreciation schedule, and a single low-value pool ledger for assets under $500. NetAsset is licensed per-asset by NetGain and sits outside the NetSuite BOM (see §4.3).

- NetSuite database tier assumed as **Standard** for Phase 1, based on the expectation that integrations bring summary journals (not line-level transactions) into NetSuite — specifically summary POS journals from SwiftPOS, summary gaming journals from Concilio, summary payroll journals from Micropay/Humanforce, and approved vendor bills from Zudello. Transaction line volume is expected to sit well inside the 200,000 lines/month threshold. This assumption will be validated through a formal tier assessment during alignment and may be revised if detailed-line integrations are introduced (in Phase 1 or Phase 2) or if transaction volumes materially exceed current estimates.

- The scope does not include any custom SuiteScript development; all functional requirements are met by native configuration, workflows, and approved SuiteApps

- CHPRSL will provide a dedicated project team member for UAT and data validation

- Integration costs (middleware build) are not included in the core implementation estimate and will be quoted separately

- The 3-month implementation timeline is achievable subject to timely decision-making on open items (see Section 11)

## Exclusions

- Custom development / SuiteScript

- Phase 2 modules (EPM, NSAW, FSM)

- Inventory management migration to NetSuite

- CRM / marketing automation configuration

- HR & Payroll within NetSuite

- Any direct integration to gaming-specific systems (IGT direct API, Wymac, Ecash, etc.); gaming machine data will flow to NetSuite via Concilio, which acts as the extraction and reconciliation layer

- Post-live managed services (covered separately via PartnerPlus)

# 13. Key Risks

| **Risk** | **Likelihood** | **Impact** | **Mitigation** |
| --- | --- | --- | --- |
| Open decisions (Payroll system; Zudello data sync scope; Cash reconciliation path) delay Design phase | Medium | High | Resolve by end of Discovery; escalate to Brendan if unresolved. See §11. |
| Third-party vendor delivery dependency (Zudello, Revolut, NetGain/NetAsset) — schedule slip by any one vendor impacts go-live | Medium | High | Early vendor engagement on all three; vendor-supplied integrations progressed in parallel with Fusion5 build; vendor status tracked in weekly project governance; commercial terms aligned to go-live date where possible. |
| Zudello product-fit risk — CHPRSL has not yet seen a Zudello demo; scope assumes end-to-end P2P fit (supplier onboarding, POs, receipting, 3-way matching, AP, budget-vs-spend) | Medium | High | Zudello demo prioritised ASAP (currently being teed up via Wild Tech First); alignment workshop to validate functional fit and data sync scope before SOW execution. |
| Revolut plan tier commercial surprise — NetSuite integration and required features (corporate card, travel, expense management) may require a higher tier than CHPRSL currently holds | Medium | Medium | CHPRSL to confirm tier with Revolut account manager before commercial finalisation; §7.2 flags this as an outstanding CHPRSL action. |
| Phase 1 integration reliability — flat-file / scheduled imports (SwiftPOS, Concilio, Micropay) lack middleware-grade error handling and monitoring that Phase 2 middleware would provide | Medium | Medium | Clearly scoped monitoring and exception processes per flow; critical revenue integration (SwiftPOS summary journals) prioritised in Build/Test; Phase 2 middleware uplift path established (§7.5). |
| Fixed-price risk from scope creep | Medium | High | Strict change control; scope gates at each stage boundary; variations captured formally with impact assessment. |
| Client-side bandwidth constraints (new Finance Manager, 4 months in role; parallel Zudello and Revolut workstreams) | High | Medium | Structured UAT plan; Fusion5 PS support during testing; client-side PM optional service available (§10.4); governance cadence reviewed at each stage gate. |
| Data quality from legacy Adept system (chart of accounts, vendor master, opening balances) | Medium | Medium | Early data extract and cleansing sprint; migration templates provided upfront; data validation gates within each migration cycle. |
| IT maturity gap (lower internal capability) | Medium | Medium | Multi-vendor Phase 1 architecture (Zudello, Revolut, NetAsset, Fusion5 CSV Integrator, Fusion5 Bank Parser) is a deliberate response to this risk — integration complexity is offloaded to vendors rather than built and maintained in-house. Invested in user training; clear handover documentation per vendor at go-live. |

# 14. Project Governance

- Weekly RAG status reporting on project metrics

- Weekly project governance meetings (Fusion5 + CHPRSL leads)

- Internal Fusion5 Senior Supplier meetings (weekly)

- Monthly Steering Committee (Brendan McDowell + Fusion5 Account / Delivery lead)

- Formal stage gates and acceptance criteria at each milestone

- Collaborative project tracking workspace (shared tools)

- Change request process for any scope variations

# 15. Document Revision History

| **Version** | **Date** | **Author** | **Summary of Changes** |
| --- | --- | --- | --- |
| 0.1 | March 2026 | Fusion5 (Alan Pan) | Initial draft — synthesised from Discovery Session, Integration/Data/AI Session, NetSuite Demonstration, Pre-submission Walk-through, and AI Overview transcripts |
| 1.0 | March 2026 | Fusion5 | Released for pre-submission review with Brendan McDowell |
| 1.1 | April 2026 | Fusion5 (Jayden Sheridan) | Post-meeting iteration: Zudello scoped as end-to-end P2P platform; Zudello → NetSuite data sync expanded to include vendors, POs, item receipts, and bills (confirmation pending — §11 Decision 6); Fixed Assets switched from native NetSuite to NetAsset (NetGain); job costing confirmed as native custom segment; contract management added as mild customisation; ARM deferred to Phase 2 (revenue recognition via spreadsheets in Phase 1); middleware deferred to Phase 2; Revolut confirmed for corporate card / expense management in Phase 1; new §4.3 Third-Party SuiteApps section introduced; §11 Open Decision Items tidied and renumbered. See v1.1 changelog below. |

## v1.1 Changelog — April 2026

Iterative updates following the Fusion5 × Communal Group follow-up meeting. Each entry lists the section(s) affected and the nature of the change.

| **Change** | **Sections Affected** | **Detail** |
| --- | --- | --- |
| AP/P2P platform switched from Zone Capture to Zudello | §4.2, §5.1, §5.2, §7.2, §8, §11, §12 | Zudello replaces Zone Capture entirely for Phase 1 and is scoped as the end-to-end P2P platform. Zone Capture removed from the BOM. Integration to NetSuite is vendor-supplied and implemented by Zudello; no Fusion5 integration build required. |
| Procurement lifecycle moved into Zudello | §5.2, §7.2, §12 | Purchase Orders, supplier onboarding, item receipting, and three-way matching are all performed in Zudello. NetSuite retains the approved-bill and payment flow only. Rationale: minimises NetSuite General Access licences required for ~40–50 occasional procurement users, while keeping NetSuite as the actuals ledger. |
| Budget vs. remaining spend control moved to Zudello | §5.2, §7.2, §12 | Operational budget management (budgets-by-cost-centre / GL / department) and live remaining-spend visibility at the point of commitment is managed in Zudello rather than NetSuite. NetSuite retains the actuals ledger for financial reporting. Budget dimensions to be finalised in alignment workshop. |
| Zudello → NetSuite data sync expanded beyond approved bills | §5.1, §5.2, §7.2, §12 | Phase 1 working assumption updated: vendors, POs, item receipts, and approved bills all sync into NetSuite (not just approved bills). Rationale: supports month-end GRNI (receipted-unbilled) accruals (as raised in meeting opening) and preserves procurement metadata in NetSuite as the integration hub, reducing the number of source systems a future data lake or analytics consumer needs to connect to. Inventory-related receipting remains largely externalised to the relevant inventory system (e.g., Cooking the Books). |
| New Open Decision Item 7 — Zudello data sync scope | §5.2, §11 | Explicit uncertainty raised around whether POs and Item Receipts should sync into NetSuite, or whether only vendors and approved bills should. Three options framed: (a) full sync; (b) minimal sync with analytics consumers connecting to Zudello; (c) minimal sync plus a bespoke month-end reversing journal to capture GRNI without per-record sync. To be validated during alignment workshop with CHPRSL and Zudello. |
| §5.1 Month-End Close updated to reference GRNI accruals | §5.1 | Makes explicit the link between Zudello-synced item receipt data and the month-end accrual process for receipted-but-unbilled purchases. |
| Fixed Assets switched to NetAsset (NetGain) | §4.1, §4.3 (new), §5.1, §9, §10.3, §10.5, §12 | Native NetSuite Fixed Assets Management removed from the BOM. NetAsset added as a confirmed third-party SuiteApp in new §4.3. Phase 1 sizing: ~3,000 assets (indicative, clean-up required), single accounting depreciation schedule, single low-value pool ledger (<$500). NetAsset is per-asset licensed by NetGain, separate from NetSuite BOM. §10.3 and §10.5 flagged pending restatement of figures. |
| New §4.3 Third-Party SuiteApps section introduced | §4.3 | Provides a dedicated location for third-party SuiteApps that run inside NetSuite (licensed separately from the NetSuite BOM in §4.1). Future third-party SuiteApps should land here rather than §4.2 Add-On Modules (which remains reserved for NetSuite-native modules). |
| Job costing approach confirmed — native custom segment | §4.2, §5.7 | Custom segment ("Job" / "Project") confirmed as the Phase 1 approach, delivered within Financials First Standard at no additional licence cost. Three use cases documented: capital projects / WIP, events & functions profitability, and marketing campaign tracking. §5.7 reframed from "to be validated" to "confirmed"; options table retained as audit trail with Option 2 marked Selected. SuiteProjects row removed from §4.2 (no longer under evaluation). |
| ARM deferred to Phase 2; revenue recognition on spreadsheets in Phase 1 | §4.2, §5.1 | ARM status updated from "Optional — To Be Validated" to "Phase 2". New §5.1 Revenue Recognition bullet added stating that revenue recognition continues outside NetSuite on existing spreadsheet processes for Phase 1. |
| Middleware deferred to Phase 2 | §7.1, §7.2, §7.5, §11 | §7.1 rewritten to reflect Phase 1 reliance on native / vendor-supplied integrations and flat-file ingestion via the Fusion5 CSV Integrator; middleware / message bus pattern reframed as the Phase 2 architectural intent. SwiftPOS row in §7.2 updated to commit to flat-file Phase 1 path. §7.5 heading and preamble clarify middleware costs are indicative Phase 2 figures. §11 Decision 5 (was Decision 6) strengthened to reference Campfire and flagged as Phase 2. |
| Revolut confirmed for corporate card / expense management | §5.1, §7.2, §7.4, §8 | Revolut promoted from Phase 2 / Future Integrations (§7.4) to confirmed Phase 1 In-Scope Integrations (§7.2). Integration is vendor-supplied (implemented by Revolut). Scope: corporate credit card and expense management transactions flowing to NetSuite for GL posting. §5.1 Expense Management bullet updated accordingly; §8 category corrected from "Travel Cards" to "Corporate Card / Expense Management". Revolut plan tier confirmation remains a CHPRSL action. |
| §11 Open Decision Items cleanup | §11, multiple cross-refs | Resolved AP Automation Path decision removed from the Open table and recorded in new "Resolved Decisions (Prior Versions)" subsection, along with Job Costing and Fixed Assets. Remaining open items renumbered 1–6. Cross-references to Decision 7 (Zudello data sync) updated to Decision 6; cross-references to Decision 6 (Middleware) updated to Decision 5. |
| §13 Key Risks rewritten for v1.1 scope | §13 | Full rework of the risk register to reflect v1.1 scope shifts: AP dropped from "Open decisions" risk (now resolved); middleware build risk removed (deferred to Phase 2); three new risks added (third-party vendor delivery dependency, Zudello product-fit, Revolut plan tier); Phase 1 integration reliability replaces the former middleware risk; IT maturity risk reframed to reflect that the multi-vendor architecture is a deliberate response to this risk, not in tension with it. NetAsset migration not included as a risk — it is a standard scope item (captured in §9 and §12) rather than a project risk. |
| §4.1 General Access Users count updated | §4.1 | General Access Users reduced from 10 to 6, reflecting CHPRSL confirmation: 5 finance team (Despina, Anita, Joyce, Liz, Mobin) + 1 IT Admin. Terminology also tidied — "Core ERP + NetSuite CRM" relabelled as "Core ERP & CRM". View & Approve and Specialised Site & Operations user quantities / types remain pending Jayden's homework. |
| Contract Management custom record — View & Approve access confirmed | §5.6 | Proof-of-concept completed (per Jayden's v1.1 homework): View & Approve users can edit the contract management custom record. Contract owners outside the finance team can therefore maintain contracts without requiring General Access licences. Fallback to Employee Self-Service licensing is no longer required. |
| Cut-down licence type consolidated to View & Approve | §4.1, §11 | View & Approve confirmed as the sole cut-down licence type, serving both the 7 SLT bank authorisers and the 9 dashboard / P&L viewers (16 users total = 4 × 5-packs). Specialised Site & Operations user licence evaluated and ruled out — avoids running two overlapping cut-down licence types. Dashboard viewer licences flagged as transitional, expected to drop in Phase 2 when NSAW replaces them. 12-month-only licence structure preference retained (still pending Joel sign-off). Resolved Decision added to §11. |
| View & Approve licence term confirmed as 12-month-only | §4.1, §11, §15 Pending | View & Approve licences structured as 12-month-only term (not aligned to multi-year NetSuite renewal), preserving flexibility to drop the dashboard-viewer portion in Phase 2 when NSAW is introduced. Resolved Decision added to §11; item removed from §15 Pending Changes tracker. |
| NetSuite database tier set to Standard (with uncertainty) | §4.1, §11, §12, §15 Pending | Database tier assumed as Standard for Phase 1 on the basis that all integrations bring summary journals (SwiftPOS, Concilio, Micropay/Humanforce) rather than line-level transactions — expected to sit well inside the 200,000 lines/month threshold for Standard. Assumption to be validated via formal tier assessment during alignment. Resolved Decision added to §11; assumption added to §12; item removed from §15 Pending Changes tracker. Uncertainty retained re: Phase 2 detailed-line integrations potentially triggering a Premium upgrade. |
| §4.3 expanded — Zudello and Revolut added alongside NetAsset | §4.3 | Section renamed from "Third-Party SuiteApps" to "Third-Party Platforms & SuiteApps" and restructured to include a **Type** column distinguishing SuiteApps (run within NetSuite) from external platforms (integrate with NetSuite). Zudello and Revolut added to ensure the full third-party cost stack is visible in one place for the board paper. NetAsset retained. All three marked Confirmed; commercial details (user counts, tier, pricing) remain vendor-direct and outside the NetSuite BOM. |
| Journal Approval Workflow added as explicit customisation | §5.3, §5.6 | Journal Approval Workflow promoted from a one-line reference in §5.3 to a fully described customisation in §5.6, paralleling the Vendor Bank Details and Contract Management bullets. Configuration detail (trigger conditions, routing, DOA alignment, audit trail) captured. Carve-out noted: integration-sourced journals (SwiftPOS summaries, Zudello bills, payroll) are not routed through this workflow — controls sit with the source system. §5.3 bullet updated to cross-reference §5.6. |
| Contract Management added as a mild customisation | §5.6 | New custom record in NetSuite for supplier/service contracts, with owner, effective/renewal dates, document attachment, and SuiteFlow approval routing. Contract-specific pricing remains in Zudello; to be validated with Zudello during alignment workshop. |
| Mediusflow replacement reference updated | §7.2 (note), §8, §12 | "Replaced by Zone Capture" changed to "replaced by Zudello" throughout. |
| Open Decision Item 1 (AP Automation Path) updated | §11 | Now reflects Zudello as the confirmed Phase 1 platform. Item retained in the Open list pending Mediusflow decommission timeline. |

## Pending Changes — Planned for v1.2+

Tracked here as they are worked through in iteration with CHPRSL:

| **Change** | **Status** | **Sections Likely Affected** |
| --- | --- | --- |
| NSAW mid-tier included user count | Pending Joel confirmation with Oracle | §4.2 / §10.5 (if Phase 2 included) |
| Campfire middleware repricing | Pending Joel + Sven commercial review | §7.5, §10.3 |
| Narrative Reporting prerequisite on P&B | Pending Joel confirmation | §4.2 / Phase 2 note |

*This document is indicative and subject to change pending formal SOW execution and resolution of open decision items. Estimates are based on information available at the time of preparation and will be confirmed through Design workshops.*

