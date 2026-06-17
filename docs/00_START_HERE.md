# RevArc Command Centre — Cursor / Composer Context Pack

> **Purpose:** Give Cursor (Composer 2.5) perfect, unambiguous context to run a comprehensive consistency audit and fix every inconsistency across all six pages of the RevArc Command Centre — at Apple-QA scrutiny.

## What this product is
A production HTML/CSS/JS prototype dashboard for an outsourced hotel revenue department serving boutique hotels (≤50 keys). The design bar is the top 0.1%: “Apple’s finish applied to Stripe’s clarity.” Users are hotel owners/GMs, **not** analysts — every number must be instantly legible.

## The six pages (navbar → file)
| # | Page | File | Engine accent |
|---|------|------|---------------|
| 1 | Triage Feed | `index.html` | mixed |
| 2 | Revenue Horizon | `horizon.html` | Revenue (green) |
| 3 | Guest Matrix | `guests.html` | mixed |
| 4 | Parity Radar | `parity.html` | Savings (blue) |
| 5 | Integration Gateway | `integrations.html` | mixed |
| 6 | The Ledger | `ledger.html` | mixed / proof |

Three engines run through everything: **Savings = Sentinel (blue)**, **Revenue = Yield (green)**, **Capture = Concierge (amber)**.

## The reference standard
`integrations.html` is the **canonical reference** for hero typography after a long redesign. Its hero (kicker icon + “System fabric” label → large tight headline → lede) is the archetype every other page’s hero must match. Its Sankey flow hero is also the reference for premium, non-stuttering canvas motion.

## How to use these files
Read them in order:
1. **`01_DESIGN_CONTRACT.md`** — the single source of truth for tokens, color, type scale, spacing, motion. Everything else defers to this.
2. **`02_HERO_ARCHETYPE.md`** — the exact hero structure + CSS + per-page hero table (the headline task).
3. **`03_AUDIT_CHECKLIST.md`** — the comprehensive, category-by-category and page-by-page audit to grind through.
4. **`04_GUARDRAILS_VALIDATION.md`** — hard constraints, the validator, canonical data figures that must never change, and the do-not-break list.
5. **`.cursorrules`** — drop into the repo root so Composer obeys the constraints automatically.

## Recommended workflow for Composer
1. **Don’t do everything in one prompt.** Work page-by-page, or category-by-category across pages. Small, reviewable diffs.
2. **Phase 1 — Hero unification first** (highest visible payoff). Apply `02_HERO_ARCHETYPE.md` to all six heroes.
3. **Phase 2 — Shared primitives.** Reconcile bento cards, eyebrows, metric numbers, legends, tooltips to the contract.
4. **Phase 3 — Per-page polish** using the page sections of `03_AUDIT_CHECKLIST.md`.
5. **After every page:** run `node _validate.js <file>` and confirm `ALL JS OK`. Check light **and** dark. Check the 760px breakpoint. Confirm no banned colors. (See `04`.)

## Golden rules (full list in 01 + 04)
- **Subtract ornament, never argument.** Readability is law.
- **One hero per page; one primary chart per page.**
- **No purple, ever.** No CDN, no chart libraries — charts are hand-drawn on `<canvas>`.
- **Never fabricate metrics.** The canonical figures in `04` are fixed.
- **Dependency-free, reduced-motion-guarded.**
- **Consistency beats cleverness.** When two pages differ, conform both to the contract — do not invent a third style.
