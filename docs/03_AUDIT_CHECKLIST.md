# 03 — Comprehensive Consistency Audit Checklist

> Grind this across all six pages. Check each item in **both light and dark**, and at the **760px** breakpoint. For each fix, prefer the smallest diff that conforms to `01_DESIGN_CONTRACT.md`.

## A. Hero (see 02 for the full spec)
- [ ] Hero leads with the asset (eyebrow → display metric OR primary chart); no large page-name H1.
- [ ] One hero, no co-heroes: exactly one focal asset; every supporting metric a visible tier down (L1/L2/L3), none at equal volume; same metric never printed twice.
- [ ] Kicker icon style matches (13px stroke, tertiary, fill:none).
- [ ] Lede max-width and spacing consistent.

## B. Bento cards
- [ ] Identical corner radius across all cards (use the existing radius token).
- [ ] Identical border token (`--border-default`/`--border-subtle`) — no one-off borders.
- [ ] Identical inner highlight (`--card-hi`) and shadow (`--elev`/`--hover-shadow`).
- [ ] Consistent inner padding across cards of the same tier.
- [ ] **Bento corner-icon system:** every card’s corner icon is the same size, stroke-width, color (tertiary), and position. Audit for drift.
- [ ] Card title uses the canonical Bento title style (15px/600/-.01em); card eyebrow uses the canonical eyebrow (11px/600/.08em/uppercase/tertiary).
- [ ] Card hover behavior consistent (same transition, same elevation change).

## C. Numbers & data display
- [ ] All figures in JetBrains Mono with tabular-nums (`.mono`).
- [ ] Thousands separators everywhere (`en-US`).
- [ ] Currency format consistent (`€160,507`, no space, whole euros in heroes).
- [ ] Units lowercase and consistent (`/day`, `ms`, `%`, `×`).
- [ ] No raw unformatted numbers anywhere in rendered output.
- [ ] Deltas use `--positive`/`--negative` consistently with correct sign and arrow.

## D. Color discipline
- [ ] No purple anywhere. No banned hexes (`#1FA2FF`, `#FF8A1E`, `#24EE85`).
- [ ] Engine colors used semantically (Savings=blue, Revenue=green, Capture=amber).
- [ ] No raw hex that duplicates a token — replace with the token.
- [ ] Color contrast passes in both themes (text vs background ≥ WCAG AA for body).

## E. Typography
- [ ] One type scale (section B/D of `01`) applied everywhere; no orphan font-sizes.
- [ ] Headings, eyebrows, body, captions all map to a defined role.
- [ ] Letter-spacing consistent per role (tight on big text, .08em on eyebrows).
- [ ] No mixing of Inter and Mono within the same number/label incorrectly.

## F. Charts (hand-drawn canvas)
- [ ] One primary chart per page.
- [ ] Chart colors come from tokens (read CSS vars via getComputedStyle), not hardcoded.
- [ ] Axis/label/legend typography matches the scale (Mono for numeric ticks).
- [ ] Legends consistent in shape, size, and placement across pages.
- [ ] Tooltips share one component style (radius, padding, border, shadow, type).
- [ ] Canvas is HiDPI-correct (scaled by devicePixelRatio) and re-renders on resize.

## G. Motion
- [ ] Every animation respects `prefers-reduced-motion` and has a clean static fallback.
- [ ] No element resets while visible (seam must be invisible — fade/translate off-edge). Reference: `integrations.html` `gwHiPass`.
- [ ] No “RGB-gaming” multi-hue glow; motion is calm and physical.
- [ ] Live counters animate consistently (same dot, same cadence, same “last sync” pattern).

## H. Live status / counters
- [ ] Consistent live indicator: dot + label + count + “last sync Xs ago”.
- [ ] Counters are **pinned/stable** (no NaN, no flicker) — critical before screenshots.
- [ ] “systems live” / “engines active” badges share one style.

## I. Navigation & chrome (must be identical on all six)
- [ ] Sidebar nav: same items, order, icons, active-state, spacing.
- [ ] Brand lockup “RevArc / Command Centre” identical.
- [ ] User chip “Tranquil Escape Villa / Hikkaduwa · General Manager / TE” identical.
- [ ] Top bar actions (Export CSV, theme toggle, mute, status badge) consistent in style and placement.
- [ ] Command palette (⌘/Ctrl+K, `/`, Esc, ↑↓, Enter, 1–6) present and identical on every page; guard `window.__rkCmdkPort` intact.

## J. Accessibility
- [ ] Exactly one `<h1>` per page; logical heading order.
- [ ] Visible focus states on all interactive elements.
- [ ] Decorative icons `aria-hidden`; meaningful controls labeled.
- [ ] Keyboard: command palette + nav fully operable.

## K. Responsive
- [ ] 760px breakpoint: hero H1 drops to 25px; layouts reflow without overlap.
- [ ] No horizontal scroll; canvases resize correctly.

## L. Per-page focus notes
- **index.html (Triage Feed):** hero archetype; ranked action list consistency; one primary visual.
- **horizon.html (Revenue Horizon):** hero; the forward chart is the single primary chart; KPI trio (savings/revenue/roi) consistent; figures tie to canonical totals (see `04`).
- **guests.html (Guest Matrix):** hero; matrix canvas tooltip matches shared tooltip; consent meters consistent; direct-share number is the hero metric.
- **parity.html (Parity Radar):** hero (migrate `.rh-*` to canonical values, keep JS hooks); radar is the primary chart; “Rate drift” / “OTA undercut” labels; action queue rows consistent with other list rows.
- **integrations.html (Integration Gateway):** reference page; verify only — do not regress hero or Sankey.
- **ledger.html (The Ledger):** hero; “The Statement” + running balance; cent-level proof; verified seal; figures reconcile (see `04`).

## Definition of done (whole audit)
- [ ] All six heroes pixel-match the archetype.
- [ ] Every checklist item above passes on every page, light + dark, at desktop + 760px.
- [ ] `node _validate.js` reports `ALL JS OK` for every page.
- [ ] Canonical figures unchanged (see `04`).
- [ ] Zero banned colors; zero orphan type sizes; zero raw-hex token duplicates.
