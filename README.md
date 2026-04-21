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

**Live:** https://chprsl-proposal.netlify.app
**Admin:** https://app.netlify.com/projects/chprsl-proposal
**GitHub:** https://github.com/JoelDMikkelsen/chprsl-proposal

The first production deploy was pushed via the Netlify CLI. Continuous deployment from `main` is NOT yet wired up; the OAuth handshake between Netlify and GitHub is an interactive step.

**To enable continuous deployment (one-off, 30 seconds):**

1. Open https://app.netlify.com/projects/chprsl-proposal
2. Site configuration → Build & deploy → Link site to Git
3. Choose GitHub → authorise the Netlify app → select `JoelDMikkelsen/chprsl-proposal` → main branch
4. Build settings are pre-populated from `netlify.toml` (`npm run build`, publish `dist`)

Until that's done, deploy manually with:

```bash
netlify deploy --build --prod
```

## Repo layout

- `src/App.tsx` — shell that composes section components
- `src/components/IntegrationOptions.{tsx,css}` — new section for this iteration (placeholders)
- `src/styles/tokens.css` — Fusion5 brand tokens as CSS custom properties
- `src/styles/globals.css` — base element styles and shared layout utilities
- `reference/` — frozen artefacts from v1.1 (HTML source, scope doc, Joel's brief, Brendan reply)
- `CONTEXT.md` — authoritative handoff document for future sessions

## Read before editing

`CONTEXT.md` contains the deal state, commercial defaults, tone rules (Fusion5 brand plus McKinsey discipline), proposal section order, Integration Options design decisions, and open items. It is the source of truth for any content or copy decisions.
