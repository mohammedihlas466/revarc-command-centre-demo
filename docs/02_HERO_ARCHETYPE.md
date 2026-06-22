# 02 — The Hero Archetype (lead with the asset)

> **Principle:** The hero presents, it does not narrate. The topbar title + left nav already name the page, so the hero must NOT repeat the page name as a giant `H1`. Lead with the one thing that matters — the **number** or the **chart** — orient with a tiny eyebrow, and whisper at most one short line of context. Subtract ornament, never argument.

## Why no page-name H1
The page name appears in three places already: the highlighted nav item, the topbar title, and the topbar subtitle. A large hero `H1` that repeats it is redundant and fights the real focal point. Apple-grade restraint: remove the duplicate, amplify the asset.

## The two archetypes
Every page's primary bento is ONE of these. Pick by what the page is fundamentally about.

### A. Metric-hero — `index.html`, `ledger.html`, `guests.html`
The page's single most important number is the hero.
```
tiny eyebrow  (11px, UPPERCASE, tertiary — names the metric, e.g. "Net Direct Yield")
   ↓ 14px
DISPLAY METRIC  (JetBrains Mono, 44–48px, the page's one hero number)
   ↓
delta / supporting line  (one quiet line, secondary)
```
- Exactly **one** display metric per page (the hero number). No competing big number.
- The eyebrow names the metric; it is not the page name.
- Everything else (breakdowns, methodology, captions) lives below or on hover — progressive disclosure.

### B. Canvas-hero — `horizon.html`, `parity.html`, `integrations.html`
The primary chart is the hero; text recedes so the canvas leads.
```
tiny eyebrow  (11px, UPPERCASE/contextual — e.g. "Net Direct Yield", "Rate parity", "System fabric")
   [+ optional short title ≤ ~22px if the chart needs naming, e.g. "Rate parity"]
   [+ optional one live-status line: dot + count + last sync]
   ↓
PRIMARY CHART  (hand-drawn <canvas>, the focal asset)
```
- A small eyebrow on the left, an optional legend/live-status on the right (flex row), then the canvas.
- No large page-name headline. Overlay the hero figure on the canvas sparingly (see horizon's cumulative figure).
- `integrations.html` is the **reference implementation** for the canvas-hero (eyebrow "System fabric" + live-status line + Sankey).

## Copy rules (cut ~60%)
- No marketing ledes. If a context line survives, keep it to ~3–6 words or make it functional (a live-status line).
- One name per concept — no synonym pile-ups (e.g. not "Rate integrity" AND "Rate parity").
- Let whitespace and size carry hierarchy, not extra labels.

## Eyebrow spec (the only shared text primitive)
```
font-size:11px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--text-tertiary); line-height:1
```
Optional 13px stroke icon (`stroke:var(--text-tertiary)` or a semantic engine color), `aria-hidden`.

## Semantics & a11y
- The page already has its name in the topbar; a visible hero `H1` is **not** required. If a heading element is desired for document structure, keep it visually minimal (eyebrow-styled) or visually-hidden — do not render a large duplicate title.
- The eyebrow is decorative orientation: keep it a `<div>`.
- Icons decorative → `aria-hidden`.

## Per-page heroes (current)
| Page / File | Archetype | Eyebrow | Hero asset |
|---|---|---|---|
| Triage Feed · `index.html` | Metric | Net Direct Yield | €14,820 NDY + savings/revenue split |
| Revenue Horizon · `horizon.html` | Canvas | Net Direct Yield | cumulative NDY trajectory chart |
| Guest Matrix · `guests.html` | Metric | Who's Truly Yours | 59% direct-booking share |
| Parity Radar · `parity.html` | Canvas | Rate parity · Live | radar / parity sweep |
| Integration Gateway · `integrations.html` | Canvas | System fabric (+ live status) | Sankey constellation *(reference)* |
| The Ledger · `ledger.html` | Metric | Net Direct Yield | €14,820 verified total |

## Definition of done for a hero
- [ ] No large hero `H1` duplicating the page/nav name.
- [ ] One hero, no co-heroes: exactly one focal asset (one display metric OR one primary chart) at the Hero tier; supporting metrics allowed but each a visible tier down (L1/L2/L3) — none competing at equal volume. Same metric never printed twice.
- [ ] Eyebrow 11px/600/.08em/UPPERCASE, tertiary.
- [ ] Context copy ≤ ~6 words or a functional live-status line; no marketing lede.
- [ ] No synonym/label duplication.
- [ ] Identical in light + dark; clean at ≤760px.
- [ ] `node _validate.js <file>` → `ALL JS OK`.
