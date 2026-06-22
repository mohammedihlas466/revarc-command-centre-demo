# 06 — Visual System (beyond typography)

> The non-type half of the contract: **color & contrast, spacing, shape, elevation/border, glass, icon, the bento shell, primitives, metric hierarchy, data-viz, motion, states**. Pairs with `05_TYPOGRAPHY_SYSTEM.md`. Defers to `01_DESIGN_CONTRACT.md` for raw token *values*; this doc defines how they're *used* so all six pages render as one app. Resolves the cross-cutting items in `07_AUDIT_LOG.md`.
>
> Bar: top 0.1% — Apple finish, Stripe clarity. **Readability is law; light mode is a first-class citizen, not a tint of dark.**

---

## 0. Operating principles
1. **One focal asset per page** (metric-hero or canvas-hero) — everything else is support.
2. **Token-only.** No literal hex/px that duplicates a token (kills `index`'s `7/9px`, `border-radius:4`).
3. **Light = first-class.** Every rule is verified on white at AA contrast, not assumed from dark.
4. **Subtract ornament, never argument.** Density serves the number, not decoration.
5. **Same role → identical pixels** on every page.

---

## 1. Color & contrast

### 1.1 Engine semantics (never mix)
| Engine | Meaning | Dark | Light |
|--------|---------|------|-------|
| `--sentinel` | **Savings** | `#3B8FD4` | `#1A6FCB` |
| `--yield` | **Revenue** | `#35C77C` | `#10A85E` |
| `--concierge` | **Capture** | `#E0883C` | `#C9651A` |

Banned: purple, `#1FA2FF`, `#FF8A1E`, `#24EE85`.

### 1.2 Neutral text ladder
| Role | Dark | Light | Light contrast on white |
|------|------|-------|--------------------------|
| primary | `#F7F8F8` | `#15171A` | ~16:1 ✅ |
| secondary | `#8B9099` | `#585D63` | ~6.6:1 ✅ |
| tertiary | `#61656C` | **`#6B7077`** *(was `#9197A0` ≈2.6:1 ✗)* | **~4.6:1 ✅** |

**X1 fix:** retoken light tertiary to `#6B7077`. Tertiary is for captions/units/eyebrows — it must clear AA, not whisper.

### 1.3 Contrast law (the gate)
- **Body/label text (< 18px):** ≥ **4.5:1**.
- **Large/display (≥ 18px semibold or ≥ 24px):** ≥ **3:1**.
- **Colored (engine) text:** small colored text on white fails AA (yield 2.9, concierge 3.6). **Rule:** engine color only on (a) display/large numerals, (b) chips/dots/bars, or (c) text paired with a neutral. For small colored *text*, use the light engine tokens at ≥ 600 weight and ≥ 13px, else render neutral + a colored dot.
- Every fix is verified in **both** themes before a page is marked ✅.

---

## 2. Metric hierarchy — "one hero, no co-heroes, then strict tiers"
The law is **hierarchy, not scarcity.** A page may show as many numbers as the argument needs — comparison is a dashboard's job — but exactly **one** sits at the Hero tier, and every other figure must sit at a *visibly lower* tier so nothing competes with the hero, or with its peers, at equal volume. **Never print the same metric twice** (that's redundancy, not emphasis). The defect to kill is *equal emphasis*, not *quantity*. (Weights are theme-aware per X4.)

| Tier | Use | Size | Weight (dark / light) | Font |
|------|-----|------|------------------------|------|
| **Hero** | the page's single focal number | `clamp(44px,6vw,68px)` | 300 / **400** | Inter, tnum |
| **L1** | section-lead metric (≤1 per major card) | 30–34px | 400 / 500 | Inter, tnum |
| **L2** | KPI-card metric | 22–24px | 500 / 560 | Inter, tnum |
| **L3** | inline/table metric | 14–15px | 560 | JetBrains Mono, tnum |

Rules: hero is the only `clamp` display number on the page; co-equal numbers get demoted to L2. ALL numerals tabular. **Light weight bumps +100** so strokes read crisp, not grey (implemented via `--w-metric`).

Per-page hero: index→`€14,820` (demote `+€3.8k`→L1) · horizon→cumulative NDY (dup `3.0×` collapsed — gauge is sole ROI) · parity→one `94%` (radar center; Health card→L1, subordinate) · guests→`59%` · ledger→`€14,820` · integrations→Sankey (canvas); 3 KPIs→L2.

---

## 3. Spacing & rhythm
4px base grid. Tokens: `2,4,6,8,12,16,20,24,32,40,56`.

| Token | px | Use |
|-------|----|-----|
| `--sp-card` | **24** | card inner padding (all four sides; single source — kills 22/27/30 drift) |
| `--sp-card-sm` | 16 | dense list-row cards |
| `--gap-grid` | 16 | gap between cards in a row |
| `--gap-section` | **32** | between major page sections |
| `--gap-stack` | 12 | vertical stack inside a card |
| `--gap-tight` | 6 | label→value |

Page gutter constant per breakpoint; section eyebrow sits `--gap-stack` above its block.

---

## 4. Shape (radii — token-only, X8)
| Token | px | Use |
|-------|----|-----|
| `--r-card` | 16 | bento cards, hero |
| `--r-sub` | 13 | nested panels |
| `--r-control` | 7 | buttons, chips, inputs |
| `--r-in` | 4 | inner controls, focus inset |
| `--r-pill` | 999 | tags, toggles |

No literal radius anywhere. Nested radius ≤ parent − padding.
> **X8c note:** token *names* differ by page (`index` uses `--radius-sm/md/lg`; `horizon` uses `--r-card/-sub/...`). Values match. Use whatever vocabulary the file already defines — don't introduce a third.

---

## 5. Elevation & border (one ladder, verified on white — X10)
| Level | Border (light / dark) | Shadow | Use |
|-------|------------------------|--------|-----|
| flat | subtle / subtle | none | page bg, sunken |
| **card** | default / default | `--elev` | every bento |
| raised | default / strong | `--elev-lg` | hover/active card, popovers |

Light cards **must** keep a visible 1px `--border-default` (≈ rgba(15,17,20,.09)) — never rely on shadow alone on white. One ladder; no per-page shadow improvisation.

---

## 6. Glass
Glass = `--glass-fill` + 1px `--glass-brd` + top hairline `--glass-hi`, backdrop-blur ~14px. Reserved for topbar, command palette, sticky overlays — **not** standard bentos (which are solid surface). Identical on every page.

---

## 7. Icons (X11)
- Stroke **1.8**, `round` caps/joins, `currentColor`.
- Sizes: **13** (inline/eyebrow) · **15** (label/button) · **18** (card header). No 21px one-offs.
- Eyebrow/decorative icons `aria-hidden`; inherit the text role's color (tertiary/secondary).

---

## 8. The Bento shell (canonical card)
```
surface-1 bg · --r-card · 1px --border-default · --elev · padding --sp-card
└ header row: [icon 18] rk-eyebrow            (+ optional right chip/legend)
└ body:       hero/L-metric  ·  rk-card-title / rk-subtitle
└ content:    chart | list | table
└ footer (opt): rk-caption (tertiary, AA-safe)
```
Every page composes from this one shell. Hero hub (`index`), recon card (`ledger`), Sankey card (`integrations`) are all this shell at different scales — never a bespoke container.

---

## 9. Primitives (shared, from `05` + here)
`rk-eyebrow` · `rk-card-title` · `rk-subtitle` · `rk-label` · `rk-caption` · `rk-metric-hero/-l1/-l2/-l3` · `rk-chip` (pill, `--r-pill`) · `rk-dot` (8px engine dot) · `rk-legend` (dot + label, `rk-label`) · `rk-th`/`rk-td` (from `ledger`, the table reference) · `rk-bar` (track + engine fill) · `rk-tag` (status: at-risk/live/verified).

---

## 10. Data-viz
- Series color = engine semantics only (savings blue / revenue green / capture amber); status reds/ambers from the state palette.
- Axis/grid: tertiary at AA; labels `rk-label`; legends `rk-legend`.
- Gauges/donuts: one center metric at the correct tier; no duplicate gauges (kills horizon `3.0×` dup).
- Light mode: chart fills/gridlines retuned for white (not dark fills dimmed) — verify Sankey, radar, area, scatter, heatmap.

---

## 11. Motion
- Eases: `--ease-out` `(.16,1,.3,1)` entrances · `--ease-std` `(.4,0,.2,1)` UI · `--ease-butter` `(.22,1,.36,1)` looping.
- Looping (Sankey/radar): seamless — fade/translate off-edge, never reset visible.
- **Every** animation behind `prefers-reduced-motion` with a static fallback.
- Never break the command palette (Cmd/Ctrl+K, /, Esc, arrows, 1–6; guard `window.__rkCmdkPort`).

---

## 12. States & a11y
- Focus: 2px `--focus-ring` offset 2px, `--r-in` — one token, no literals (X12).
- Hover: card → raised; row → `--row-hover`; button → token tint. Consistent across pages.
- Hit target ≥ 32px. Reversed/disabled rows (`ledger`) use the muted token, still ≥ 4.5:1 where it's text.

---

## 13. Per-page scorecard (12 lenses × 3 = 36; ship = 36/36)
TYP · CLR · CON · SPC · ALN · SHP · ELV · ICO · BEN · VIZ · MOT · STA — each 0/1/2/3. A page ships only at 36 in **both** themes.

| Page | Pre-audit (est.) | Target |
|------|------------------|--------|
| index | 24 | 36 |
| horizon | **18** | 36 |
| guests | 26 | 36 |
| parity | 25 | 36 |
| ledger | **31** | 36 |
| integrations | 30 | 36 |

---

## 14. Workflow (unchanged guardrails)
Work one page at a time, smallest conforming diff. After every edit: `node _validate.js <file>` → must print **ALL JS OK**. Never rename an id / remove a JS-written node without updating refs. Test light + dark, desktop + ≤760px. Update `07_AUDIT_LOG.md` to ✅ per item. `ledger` (tables) and `integrations` (canvas motion) are references — conform others *to* them, don't regress them.
