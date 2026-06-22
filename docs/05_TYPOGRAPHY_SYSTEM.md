# 05 — Typography System (the consistency contract)

> **Goal:** one closed set of text roles, each with exactly ONE definition, used identically on all six pages. Today the same role is redefined 3–8 times per role. This doc is the single source of truth; `rk-*` classes implement it; every text node maps to one role.
>
> Status: **DRAFT for approval.** Values below are proposals derived from auditing all six pages against `01_DESIGN_CONTRACT.md`. Open decisions are in §5 — please rule on those before refactor.

---

## 0. Already consistent — DO NOT TOUCH (the chrome)
These are byte-identical across all six pages. They are the proof that a system is achievable; leave them as the baseline.

| Element | Spec |
|---|---|
| `.brand-name` | 15px / 590 / -.02em |
| `.nav-label` | 10.5px / 510 / .07em / UPPERCASE / tertiary |
| `.nav-item` | 13.5px / 500 |
| `.page-title` | 18px / 590 / -.02em |
| `.page-meta` | 12.5px / tertiary |
| `.user-name` / `.user-role` | 13px/510 · 11px/tertiary |
| `.pill` | 13px / 500 |
| `.vbadge` | 10px / 510 / .05em / UPPERCASE |
| `.rk-cmdk-*` (command palette) | unchanged |

The page identity now lives **only** here (topbar + nav), per `02_HERO_ARCHETYPE.md`. No hero re-states it.

---

## 1. The role catalog (closed set)
Every piece of text is exactly one of these. Implemented as shared classes (`rk-` prefix). Inter unless noted.

### Text roles
| Role | Class | Size | Weight | Tracking | Case | Color | Notes |
|---|---|---|---|---|---|---|---|
| Section eyebrow (group label above bento rows) | `rk-eyebrow` | 10.5px | 510 | .08em | UPPER | tertiary | margin-bottom 15px |
| Card title (primary bento heading) | `rk-card-title` | 15px | 600 | -.01em | — | primary | optional 15px icon |
| Sub-title (inner panel / drawer section heading) | `rk-subtitle` | 13px | 560 | -.01em | — | primary | |
| In-card label / metric eyebrow | `rk-label` | 11px | 600 | .08em | UPPER | tertiary | the universal small label |
| Body / lede | `rk-body` | 13px | 400–500 | normal | — | secondary | line-height 1.5; max-width ~460 for ledes |
| Caption / note / sub | `rk-caption` | 11.5px | 400 | normal | — | tertiary | line-height 1.5 |
| Delta / trend chip | `rk-delta` | 12.5px | 600 | -.01em | — | semantic | positive/negative/engine color |
| Legend item | `rk-legend` | 11.5px | 500 | normal | — | secondary | 9px dot, gap 6px |
| Tooltip title | `rk-tip-title` | 13px | 600 | -.01em | — | primary | |
| Tooltip row | `rk-tip-row` | 11.5px | 400 | normal | — | secondary | `b` → primary/600 |
| Tooltip tag | `rk-tip-tag` | 10.5px | 510 | .02em | — | semantic | pill |
| Table header | `rk-th` | 10.5px | 510 | .06em | UPPER | tertiary | |
| Table cell | `rk-td` | 13px | 400–600 | normal | — | primary/secondary | numbers → mono (see below) |
| Status / live pill | `rk-status` | 11px | 510 | .02em | UPPER | semantic | dot + label |

### Metric (number) scale — JetBrains Mono OR Inter-thin (see §5 decision)
One scale, one weight-by-tier rule, `tabular-nums` always. **Exactly one Hero metric per page.**
| Tier | Class | Size | Weight | Tracking | Use |
|---|---|---|---|---|---|
| Hero metric | `rk-metric-hero` | 48px (clamp 44→56 ok) | 300 | -.035em | the page's single hero number |
| Metric L1 | `rk-metric-1` | 31px | 300 | -.03em | secondary big numbers (breakdown values) |
| Metric L2 | `rk-metric-2` | 22px | 400 | -.02em | stat rows |
| Metric L3 | `rk-metric-3` | 16px | 600 | -.01em | inline / table figures |
| Currency / unit affix | `rk-cur` | .42em of parent | 400 | — | the €, %, ×, /day affix, secondary color |

> **V24 note:** metric weight is implemented via the theme-aware token **`--w-metric`** (≈300 dark / 400 light) so numbers stay crisp on white. Use `font-weight:var(--w-metric)` on display metrics rather than a literal weight.

---

## 2. Drift evidence (worst offenders → role)
A sample of what's being unified. Full per-element mapping is applied during refactor.

**Section eyebrow** — `rk-eyebrow`
- ✅ 5 pages: `10.5/510/.08em/UPPER/tertiary`
- ❌ `index .section-eyebrow`: `12.5/560/-.005em/secondary/mixed-case` → conform

**Card title** — `rk-card-title` (target 15/600/-.01em)
- `guests .vc-title/.mx-title/.pop-title`: 13/600 → up to 15
- `parity .rh-title`: **22**/560/-.022em → down to 15
- `index .th-name`: 14.5/600 · `.queue-head h3`: 13.5/560 · `.panel-head h3`: 14/510 → 15 (or `rk-subtitle` where genuinely secondary)
- `horizon/parity .panel-pad h4`: 14/510 → 15 / `rk-subtitle`

**In-card label / metric eyebrow** — `rk-label` (target 11/600/.08em/UPPER/tertiary)
- `kpi-eyebrow` 12/500/secondary/**no-caps** · `kb-label` 11/560/.055em/secondary · `wb-label` 11/510/.04em · `dp-eyebrow` 10.5/560/.07em/secondary · `st-eyebrow` 10.5/540/.085em · `pf-cap` 10.5/600/.1em · `mom-name` 11.5/560/.05em · `biz-name` 11.5/560/.04em · `roi rlabel` 11/510/.05em · `saved sl2` 11/510/.05em · `consent ct-l` 10.5/.06em … → all → `rk-label`

**Hero / metric numbers** — `rk-metric-*`
- Hero figures range **16px → 104px**, weights **300 / 400 / 480 / 500 / 600 / 700**:
  - `index .hh-figure` clamp(60→104)/300 · `guests .pf-val` 74/300 · `parity .hc-big` 50/300 vs `.r-center .rv` 48/**600** · `ledger .st-hero-num` 46/**600** · `horizon .hz2-figure` clamp(44→66)/300
  - Same visual tier, three different weights (300 vs 600) and wildly different sizes → unify to the scale in §1.

**Legends** — `rk-legend`: `baseline-legend` 11.5/tertiary vs `m-legend`/`r-legend`/`gw-legend` 11.5/secondary → one (secondary).

**Tooltips** — `rk-tip-*`: `m-tip`, `chart-tip` already close (13/600 + 11.5) → formalize.

---

## 3. Mapping summary (old → new)
| Old classes (per page) | → New role |
|---|---|
| `section-eyebrow` | `rk-eyebrow` |
| `vc-title, mx-title, pop-title, rh-title, th-name, queue-head h3, panel-head h3, panel-pad h4, exp-head, fd-name, dh-name, wb-name` | `rk-card-title` (or `rk-subtitle` if secondary) |
| `kpi-eyebrow, kb-label, wb-label, dp-eyebrow, st-eyebrow, pf-cap, mom-name, biz-name, roi rlabel, sl2, ct-l, dsec, fd-sec, st-proof-h` | `rk-label` |
| `hh-figure, kpi-value, pf-val, hz2-figure, kb-val, mom-val, biz-val, st-hero-num, r-center .rv, hc-big, gval, dv, consent-total, cl-addr-n` | `rk-metric-hero` / `rk-metric-1` (by hierarchy) |
| `cl-val, ct-amt, ps-v, dp-cell .v, cw-amt, usv, st-line-val, st-total .tv` | `rk-metric-1 / 2 / 3` |
| `kpi-delta, hz2-chip, pf-delta, mini-delta` | `rk-delta` |
| `kpi-sub, cl-note, ct-note, kb-sub, mom-cap, biz-cap, radar-cap, chart-cap, pop-cap, foot-note, ledger-note, gw-cap` | `rk-caption` |
| `baseline-legend, m-legend, r-legend, gw-legend, heat-legend, split-legend` | `rk-legend` |
| `m-tip .tn / .tr2 / .ttag, chart-tip` | `rk-tip-title / row / tag` |
| `ltable th`, `ltable td` | `rk-th`, `rk-td` |

(Engine **color** semantics are unchanged: Savings=`--sentinel`, Revenue=`--yield`, Capture=`--concierge`. This system governs size/weight/tracking/case only.)

---

## 4. Implementation approach
1. Define all `rk-*` classes **once**. Location decided by your `assets/` answer:
   - If `assets/revarc-kit.css` exists on disk → add there (index/ledger/integrations inherit) **and** inline the same block into parity/guests/horizon.
   - If not → inline an identical `/* RK TYPE SYSTEM */` block into all six.
2. Refactor **one page at a time**, smallest diff: add `rk-*` classes to existing elements, delete the now-redundant per-page rules. Preserve every `id`/JS hook.
3. After each page: re-check light + dark + ≤760px; numbers stay `tabular-nums`.
4. Work in the new **V24** folder on copies; originals untouched until sign-off.

> **V24 status:** rather than a full `rk-*` retag, V24 applied **CSS-only conformance** — the per-page role classes were edited to the canonical values above (label, eyebrow, card-title, subtitle, metric weight via `--w-metric`, table header, icon stroke). This achieves the same visual contract with the smallest, lowest-risk diff and no JS/id churn. A full `rk-*` retag remains an optional maintainability follow-up.

---

## 5. DECISIONS (RESOLVED — locked)
1. **Hero/display numbers → Inter-thin; JetBrains Mono only for dense tabular data** (ledger line-item table, `.ref` cells, cumulative columns). Hero/display figures keep the elegant thin Inter look.
2. **Card titles → two tiers:** `rk-card-title` 15/600/-.01em (primary bento heading) + `rk-subtitle` 13/560/-.01em (inner panels/drawers).
3. **Hero metrics keep `clamp()`**, standardized per tier so all scale identically.
4. **Distribution:** there is **no `assets/` folder** on disk (the `revarc-kit.css` link is dead; every page is self-contained). The `rk-*` system is **inlined identically into all six pages** inside a marked `/* ===== RK TYPE SYSTEM ===== */` block.

## 6. Rollout
- Work in a new **V24** folder on copies of the six pages (originals untouched).
- Per page: add the RK type block, retag elements to `rk-*`, delete redundant per-page rules, preserve all `id`/JS hooks; recheck light/dark/≤760px.
- Order: `index` (worst offender) → `parity` → `guests` → `horizon` → `ledger` → `integrations` (verify reference unaffected).
