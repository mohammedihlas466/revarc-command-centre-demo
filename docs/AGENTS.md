# AGENTS.md — RevArc Command Centre (V24) — BINDING CONTRACT

> **Read this file fully before editing any `.html` file in this folder.**
> This is a production HTML/CSS/JS dashboard: six standalone pages
> (`index`, `horizon`, `guests`, `parity`, `integrations`, `ledger`).
> Bar: top 0.1% — Apple's finish, Stripe's clarity. Users are boutique-hotel
> owners/GMs, not analysts. **Readability is law. Subtract ornament, never argument.**
>
> These pages already passed an Apple-QA consistency pass. Your job is to make the
> requested change with the **smallest diff that conforms** — and to **not regress**
> anything below. When in doubt, conform to the existing pattern; never invent a third style.

---

## 0. The golden rule
**Conform, don't reinvent.** Every value below is canonical and already applied across all six
pages. If you change a bento card, match these tokens/roles exactly. If a change would force you
to deviate, stop and leave a note instead of guessing.

> **Deeper reference (optional but authoritative):** the full design system lives in
> [`cursor-context/`](./cursor-context/) — `00_START_HERE` → `01_DESIGN_CONTRACT` →
> `02_HERO_ARCHETYPE` → `03_AUDIT_CHECKLIST` → `04_GUARDRAILS_VALIDATION` →
> `05_TYPOGRAPHY_SYSTEM` → `06_VISUAL_SYSTEM` → `07_AUDIT_LOG` (the live defect tracker).
> This `AGENTS.md` is the binding summary; those docs are the reasoning behind it. If they ever
> conflict, this file and `01_DESIGN_CONTRACT.md` win.

---

## 1. Hard constraints (NEVER violate)
- **Never remove an element that JS writes to, and never rename an `id`,** without updating
  *every* `getElementById` / `querySelector` reference. This is the #1 cause of breakage.
- **Never break the command palette:** `⌘/Ctrl+K`, `/`, `Esc`, `↑↓`, `Enter`, `1–6`;
  overlay `.rk-cmdk-ov.open`; must keep the `window.__rkCmdkPort` guard; 6 routes.
- **Never add** a CDN, external dependency, chart library, or any external font beyond
  **Inter + JetBrains Mono**. Everything is vanilla HTML/CSS/JS; charts are hand-drawn on `<canvas>`.
- **Never use purple.** Never use the banned hexes `#1FA2FF`, `#FF8A1E`, `#24EE85`.
- **Never hardcode a hex that duplicates a token** — use the CSS variables/tokens.
- **Never fabricate metrics.** Use only the canonical figures in §6, or a number already present
  in the file. If a number isn't in §6 and isn't already in the file, do not invent it.
- **Never print the same metric twice** on a page (that's redundancy, not emphasis).
- **Never let a looping animation reset while visible** (fade/translate off-edge so the seam is invisible).
- **Never regress the protected references** in §7.

## 2. Always
- Use CSS variables/tokens for color, radius, spacing, easing, elevation.
- **JetBrains Mono + `tabular-nums` for ALL numbers; Inter for everything else.**
- For any large display number (metric), set `font-weight: var(--w-metric)` — **never** a hardcoded
  `300`/`400`/`600`. `--w-metric` is theme-aware (≈300 dark / 400 light) so numbers stay crisp in light.
- One hero per page; supporting metrics step down a visible tier (see §5).
- Conform divergent styles to the canonical role values in §4 — never invent a third style.
- Guard every animation with `prefers-reduced-motion` and provide a static fallback.
- Test **light AND dark**, **desktop AND ≤760px** after each change.
- Work **one page at a time**; smallest diff that conforms.
- After every edit, run the validator (see §3) and confirm **`ALL JS OK`**.

## 3. Validation (run after every edit)
```
node _validate.js <file.html>     # one file
node _validate.js                 # all *.html in this folder
```
Must print **`ALL JS OK`**. It parses every inline `<script>` and verifies that every
`getElementById('X')` has a matching `id="X"` in the markup, flags duplicate ids, and checks the
command-palette guard. A failure means you broke a JS↔markup reference — fix it before continuing.

> If your shell's PowerShell profile throws parser errors, run with `powershell -NoProfile ...`
> or use `cmd`. The validator itself is plain Node and has no dependencies.

## 4. Canonical role values (do NOT regress — match exactly)
| Role | Spec |
|---|---|
| **Metric (display number)** | JetBrains Mono, `tabular-nums`, `font-weight: var(--w-metric)`, tight negative letter-spacing. Size sets the tier; weight stays `--w-metric`. |
| **Label** (metric eyebrow / KPI label) | `font-size:11px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--text-tertiary)`. |
| **Section eyebrow** (group label above a row) | `font-size:10.5px; font-weight:510; letter-spacing:.08em; text-transform:uppercase; color:var(--text-tertiary)`. |
| **Card title** | `font-size:15px; font-weight:600; letter-spacing:-.01em; color:var(--text-primary)`. |
| **Card subtitle** (`mini h4` etc.) | `font-size:13px; font-weight:560; letter-spacing:-.01em`. |
| **Table header** (`.ltable th` in ledger = the reference) | `font-size:10.5px; font-weight:510; letter-spacing:.06em; text-transform:uppercase; color:var(--text-tertiary)`. |
| **Meter / card icon stroke** | `stroke-width:1.8`. |

**Color semantics (do not mix up):** Savings = `--sentinel` (blue) · Revenue = `--yield` (green) · Capture = `--concierge` (amber).
**Light-mode contrast:** body/secondary/tertiary text must stay legible on white (WCAG AA). Don't lighten tertiary text.

## 5. Metric hierarchy — "one hero, no co-heroes, then strict tiers"
The law is **hierarchy, not scarcity.** A page may show as many numbers as the argument needs, but
exactly **one** sits at the Hero tier (one display metric OR one primary chart). Every other figure
must sit at a *visibly lower* tier (L1/L2/L3) so nothing competes at equal volume. **Never print the
same metric twice.** No large page-name H1 (the topbar + nav already name the page).

## 6. Canonical figures (must stay consistent across pages — do not change)
- **Integrations:** throughput **10,180/day** (IN 5,390 / OUT 4,790); engines Savings 5,720 · Revenue 2,380 · Capture 2,080; 8 sources.
- **Horizon:** value routed / cumulative **€160,507** = Commission Avoided **€39,136** (Savings) + Net-New Direct **€121,371** (Revenue). ROI shown once (the radial gauge).
- **Ledger:** Net Direct Yield **€14,820** = Net-new direct **€11,210** + Commission recovered **€3,610**; 12 entries; running cumulative.
- **Guests:** Direct share **59%**; split **538 / 318 / 103**; LTV multiple **2.6×**; consent marketing **38**, transactional **9**.
- **Parity:** resolved breaches IDs **{2, 5}** ("Rate drift", "OTA undercut"). Radar **94%** is the hero; the health-card 94% is subordinate.
- **FX:** USD 1 = **€0.92**; LKR 1 = **€0.003054**.
- **Identity (identical on every page):** Brand **RevArc / Command Centre**; user chip **Tranquil Escape Villa · Hikkaduwa · General Manager · TE**.

## 7. Protected references (do not regress)
- **`integrations.html`** — the Sankey "system fabric" hero is the canvas-motion reference; do not replace or restyle its flow.
- **`ledger.html`** — the line-items table is the `rk-th`/`rk-td` typography reference.
- **`index.html`** — the approved layout/typography template; mirror it, don't fight it.
- **`parity.html`** — radar center is the hero; keep the health card subordinate.
- Hand-drawn canvas charts everywhere — never swap for a library.

## 8. Per-page note
Token *names* differ slightly by page (e.g. `index` uses `--radius-md`; `horizon` uses `--r-card`).
Values match — **use whatever token vocabulary that file already defines.** Don't introduce a new one.

---
### If you can't conform without breaking a rule
Stop. Make the safe part of the change, and leave a short comment in your summary explaining what
you skipped and why. A smaller correct diff always beats a larger one that regresses the QA pass.
