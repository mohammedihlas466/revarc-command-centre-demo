# 04 — Guardrails, Validation & Canonical Data

> These are hard constraints. Violating any of them is a regression, even if it looks fine.

## 1. The validator (run after every edit)
```
node _validate.js <file.html>
```
Must print **`ALL JS OK`**. It parses every inline `<script>` and checks that **every `document.getElementById('X')` has a matching element with `id="X"`** in the HTML.

**Implications:**
- **Never remove an element that JS writes to** without also removing its JS references. Removing a write-target element while leaving its `getElementById` call → validator fails / runtime error.
- **Never rename an `id`** without updating every `getElementById`/`querySelector` that targets it.
- When restyling a hero element that has a JS hook (e.g. parity’s live counters), keep the element and its `id`; change only classes/markup around it.
- Adding new IDs is fine as long as they’re consistent; the validator only flags *missing* targets.

## 2. Hard constraints
- **No CDNs / no external dependencies / no chart libraries.** Everything is vanilla HTML/CSS/JS. Charts are hand-drawn on `<canvas>`.
- **No build step assumptions** — files run by opening the HTML directly.
- **Reduced-motion guarded** — every animation checks `prefers-reduced-motion` (the `reduce` flag) and has a static fallback.
- **No purple; no banned hexes** (`#1FA2FF`, `#FF8A1E`, `#24EE85`).
- **Two fonts only:** Inter + JetBrains Mono.
- **One hero per page; one primary chart per page.**
- **Never fabricate metrics.** Use only the canonical figures below; if a number isn’t here and isn’t already in the file, don’t invent it.

## 3. Canonical figures (must stay consistent across pages — do not change)
> These tie the whole product together. If you touch a number, it must match here and reconcile with related pages.

### Integration Gateway (`integrations.html`)
- Total throughput: **10,180 events/day** (IN **5,390** / OUT **4,790**).
- Engine throughput: **Savings 5,720** · **Revenue 2,380** · **Capture 2,080** (sums to 10,180).
- 8 sources: PMS, Channel, Booking, Expedia, Agoda, Direct, Stripe, Google.

### Revenue Horizon (`horizon.html`)
- Value routed / cumulative: **€160,507** = Commission Avoided **€39,136** (Savings) + Net-New Direct **€121,371** (Revenue).
- ROI is shown **once** (the radial gauge): incremental yield above the rolling 24-month baseline ÷ monthly retainer. Do not re-print the ROI figure elsewhere.

### The Ledger (`ledger.html`)
- Net Direct Yield: **€14,820** = Net-new direct **€11,210** + Commission recovered **€3,610**. 12 statement entries; running cumulative balance.

### Guest Matrix (`guests.html`)
- Direct share: **59%**. Guest split **538 / 318 / 103**. LTV multiple **2.6×**. Consent: marketing **38**, transactional **9**.

### Parity Radar (`parity.html`)
- Resolved breaches: IDs **{2, 5}**. Labels: **“Rate drift”** and **“OTA undercut”**.
- Radar center **94%** is the hero; the Parity Health card 94% is subordinate (do not enlarge it to compete).

### FX (consistent everywhere)
- USD 1 = **€0.92**; LKR 1 = **€0.003054**.

### Identity (must be identical on every page)
- Brand: **RevArc / Command Centre**.
- Pilot property / user chip: **Tranquil Escape Villa · Hikkaduwa · General Manager · TE**.

## 4. Do-not-break list
- Command palette: `⌘/Ctrl+K`, `/`, `Esc`, `↑↓`, `Enter`, `1–6`; overlay `.rk-cmdk-ov.open`; guard `window.__rkCmdkPort`; 6 routes.
- Theme toggle (light/dark) on every page — test both after each change.
- Live counters / `id`-targeted elements (see validator section).
- The Sankey hero in `integrations.html` (`gwHiPass` seamless flow) — reference, do not regress.
- Hand-drawn canvas charts — do not replace with a library.

## 5. Pre-screenshot ritual (before any visual QA capture)
1. Run the validator → `ALL JS OK`.
2. Pin/settle live counters so figures are stable (no NaN/flicker).
3. Capture **both** light and dark.
4. Capture desktop **and** ≤760px.

## 6. Suggested Composer prompt scaffold
```
You are doing an Apple-QA consistency pass on the RevArc Command Centre.
Authoritative context: read 00_START_HERE, 01_DESIGN_CONTRACT, 02_HERO_ARCHETYPE,
03_AUDIT_CHECKLIST, 04_GUARDRAILS_VALIDATION before editing.

Task (Phase 1): Apply the hero archetype (02) to the hero of <FILE>.
Constraints: obey 01 tokens/type scale; obey 04 guardrails; never remove a JS
write-target element or rename an id; no purple; no chart libs.
After editing: run `node _validate.js <FILE>` and confirm ALL JS OK. Report the diff.
Do one page at a time. Do not touch canonical figures (04 §3).
```
