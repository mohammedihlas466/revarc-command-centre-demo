# RevArc Command Centre

A six-page revenue-management dashboard for boutique hotels (≤50 keys). Front-end demo — all figures are canonical and hardcoded. Self-contained: every page inlines its own styles, command palette, and design kit. No build step, no external assets, no network calls.

## Pages

| File | Page | Primary persona |
|------|------|-----------------|
| `index.html` | **Triage Feed** — approval & consent queue | Front office |
| `horizon.html` | **Revenue Horizon** — forecast & channel mix | Owner / GM |
| `guests.html` | **Guest Matrix** — segments, win-back, consent | Front office / GM |
| `parity.html` | **Parity Radar** — rate-parity monitoring | Revenue manager / GM |
| `integrations.html` | **Integration Gateway** — channel routing (Sankey) | GM / operator |
| `ledger.html` | **The Ledger** — reconciliation & proof | Finance / owner |

## Running it

Open any `.html` file directly in a browser — no server required. The sidebar links and the command palette navigate between all six pages using relative filenames, so keep them in the same folder.

## Navigation

- **Command palette:** `⌘K` / `Ctrl+K` to toggle, `/` to open. Type to filter, `↑`/`↓` to move, `Enter` to go, `Esc` to close.
- **Quick-jump:** keys `1`–`6` jump straight to each page.
- **Sidebar:** real links between all six pages.

The palette binds exactly once per page (guarded via `window.__rkCmdkPort`) and shares an identical route table across all six pages, so navigation is consistent everywhere.

## Design system

The `docs/` folder holds the source of truth: design contract, hero archetype, typography & visual systems, audit checklist, guardrails, and the full audit log (`07_AUDIT_LOG.md`). Standards: Inter + JetBrains Mono only, tokenised color (no raw hexes, no purple), one hero metric + one primary chart per page, reduced-motion guarded throughout.

## Validation

```bash
node tools/_validate.js index.html
```

Runs the structural/guardrail checker for a page. (The validator flags a few known false-positives — duplicate ids injected by the inline kit and dynamically created write-targets — documented in `docs/07_AUDIT_LOG.md`.)

## Notes

- The custom cursor is intentionally disabled: the front office works on shared, IT-locked machines where hiding the native cursor is a liability.
- Motion is calm by design — no perpetual animations; everything respects `prefers-reduced-motion`.
