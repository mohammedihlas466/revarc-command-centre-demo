# 01 — Design Contract (single source of truth)

> Every value below is extracted from the live code. **Do not hardcode hex values that duplicate a token** — always reference the CSS variable. If you find a raw hex that equals a token, replace it with the token.

## 1. Color tokens
Defined in each page’s `:root` (dark) and `[data-theme="light"]` (light). Treat these as the source of truth; if a page is missing one, add it from here.

### Dark (default)
```
--text-primary:#F7F8F8;  --text-secondary:#8B9099;  --text-tertiary:#61656C;
--accent:#ECEEF3;  --accent-hover:#FFFFFF;  --accent-subtle:rgba(255,255,255,.10);
--sentinel:#3B8FD4;  --concierge:#E0883C;  --yield:#35C77C;
--positive:#35C77C;  --negative:#E5675A;
```
### Light
```
--text-primary:#15171A;  --text-secondary:#585D63;  --text-tertiary:#9197A0;
--accent:#1B1C1F;  --accent-hover:#000000;  --accent-subtle:rgba(20,21,24,.07);
--sentinel:#1A6FCB;  --concierge:#C9651A;  --yield:#10A85E;
--positive:#10A85E;  --negative:#CF4734;
```
> **Note (X1 fix applied in V24):** light `--text-tertiary` is retokened to **`#6B7077`** (≈4.6:1 on white) — the `#9197A0` above fails AA and must not be used for screen text. See `06_VISUAL_SYSTEM.md` §1.2.

Other tokens present in `:root` (use them, don’t reinvent): `--bg-sunken`, `--surface-1/2/3`, `--border-subtle/default/strong`, `--card-hi`, `--glass-brd`, `--glass-hi`, `--hover-shadow`, `--elev`, `--radius-sm`, `--ease-out`, `--ease-butter`. **Read their values from the file; do not assume.**

## 2. Engine semantics (never mix these up)
| Engine | Token | Hue | Meaning |
|--------|-------|-----|---------|
| Savings | `--sentinel` | blue | Parity & rate sync |
| Revenue | `--yield` | green | Bookings & yield |
| Capture | `--concierge` | amber | Direct & demand |

Color is **semantic**, not decorative. A green number must relate to Revenue/positive; blue to Savings; amber to Capture. Never color something just to add color.

## 3. Banned
- **Purple in any form** — no `purple`, no violet/indigo hexes.
- **Banned legacy hexes** (replace on sight): `#1FA2FF`, `#FF8A1E`, `#24EE85`.
- **No CDNs, no external fonts beyond the two below, no chart libraries** (no Chart.js/D3). All charts are hand-drawn on `<canvas>`.
- **No “RGB-gaming” motion** — no simultaneous multi-hue glows, no marching packets, no rainbow.

## 4. Typography
**Families:** `'Inter',-apple-system,BlinkMacSystemFont,sans-serif` for everything; `'JetBrains Mono',monospace` for numbers/units via `.mono { font-variant-numeric:tabular-nums; letter-spacing:-.015em }`.

**ALL figures/metrics/units must be JetBrains Mono with tabular-nums.** Body and labels are Inter.

### Canonical type scale (conform every page to this)
| Role | Size | Weight | Tracking | Line-height | Color | Family |
|------|------|--------|----------|-------------|-------|--------|
| Hero | — | — | — | — | — | Heroes **lead with the asset** (the display metric or the primary chart), not a page-name headline. See `02_HERO_ARCHETYPE.md`. No large hero H1. |
| Kicker / eyebrow | 11px | 600 | .08em, UPPERCASE | 1 | `--text-tertiary` | Inter |
| Lede (hero subtitle) | 13.5px | 400–500 | normal | 1.45 | `--text-secondary` | Inter |
| Bento/card title (H2/H3) | 15px | 600 | -.01em | 1.2 | `--text-primary` | Inter |
| Card eyebrow/label | 11px | 600 | .08em, UPPERCASE | 1 | `--text-tertiary` | Inter |
| Display metric | 44–48px | 600 | -.02em | 1 | `--text-primary` | **JetBrains Mono** |
| Large metric | 31px | 600 | -.02em | 1 | `--text-primary` | **JetBrains Mono** |
| Medium metric | 22px | 600 | -.02em | 1 | `--text-primary` | **JetBrains Mono** |
| Body | 13–13.5px | 400–500 | normal | 1.5 | `--text-secondary` | Inter |
| Caption / unit | 10.5–11px | 500 | normal | 1.3 | `--text-tertiary` | JetBrains Mono |

**One hero, no co-heroes, then strict tiers.** Each page has **one focal hero asset** — either **one Display metric** (metric-hero pages) or **one primary chart** (canvas-hero pages) — at the Hero tier. A page may carry as many supporting metrics as the argument needs (comparison is a dashboard's job), but every one of them must sit at a *visibly lower* tier (L1/L2/L3) so nothing competes with the hero, or with its peers, at equal volume. The law is **hierarchy, not scarcity** — kill *equal emphasis*, never legitimate data. Never print the same metric twice; never a large page-name headline (topbar + nav already name the page). See `02_HERO_ARCHETYPE.md` and `06_VISUAL_SYSTEM.md` §2.

## 5. Number formatting
- Thousands separators, `en-US`: `1,840` not `1840`. Use `.toLocaleString('en-US')`.
- Currency: `€` prefix, no space: `€160,507`. Whole euros in heroes (no cents) unless the Ledger requires cent-level proof.
- Percentages: integer unless precision matters: `59%`.
- Multipliers: `2.6×` (use ×, not x).
- Latency/throughput units lowercase: `300ms`, `1,180/day`.

## 6. Spacing & shape
- Use the existing radius tokens (`--radius-sm`, card radii already in use ~14–18px). Don’t introduce new radii.
- Bento cards share one corner radius, one border (`--border-default`/`--border-subtle`), one inner highlight (`--card-hi`), one shadow (`--elev`/`--hover-shadow`). Audit for drift.
- Vertical rhythm: kicker → 10px → H1 → 8px → lede. Match the hero spacing on every page.

## 7. Motion law
- **Reduced-motion guarded everywhere:** every animation must check `prefers-reduced-motion` (the codebase uses a `reduce` flag) and resolve to a clean static frame.
- **Never reset a moving element while it’s on-screen.** Looping motion must fade to zero / travel off-edge at the seam so the wrap is invisible (this was the Sankey stutter fix — see `integrations.html` `gwHiPass`).
- Motion mirrors something physical and continuous. No teleporting dots.
- Easing: use `--ease-out` / `--ease-butter`; the command palette uses `cubic-bezier(.16,1,.3,1)`. Reuse, don’t invent.
- Transitions: ~.18–.28s. Avoid anything that draws the eye away from the single hero per page.
