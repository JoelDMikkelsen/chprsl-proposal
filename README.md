# CHPRSL × Fusion5 — NetSuite Implementation Proposal (v2)

Netlify-deployed interactive proposal for Canterbury-Hurlstone Park RSL Club Ltd. React + Vite + TypeScript. Fusion5-brand styled. Successor to the single-file `CHPRSL_Proposal_v1.1.html` artefact kept under `reference/`.

## Quickstart

```bash
npm install
npm run dev       # dev server on http://localhost:5173
npm run build     # tsc -b && vite build → dist/
npm run preview   # preview the production build locally
```

## Deployment

Auto-deployed to Netlify from `main` via GitHub integration. Build command and publish directory are set in `netlify.toml`.

## Repo layout

- `src/App.tsx` — shell that composes section components
- `src/components/IntegrationOptions.{tsx,css}` — new section for this iteration (placeholders)
- `src/styles/tokens.css` — Fusion5 brand tokens as CSS custom properties
- `src/styles/globals.css` — base element styles and shared layout utilities
- `reference/` — frozen artefacts from v1.1 (HTML source, scope doc, Joel's brief, Brendan reply)
- `CONTEXT.md` — authoritative handoff document for future sessions

## Read before editing

`CONTEXT.md` contains the deal state, commercial defaults, tone rules (Fusion5 brand plus McKinsey discipline), proposal section order, Integration Options design decisions, and open items. It is the source of truth for any content or copy decisions.
