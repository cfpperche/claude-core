# claude-core

A learning surface for **Claude Code**. Four standalone pages, one Astro project, deployed to GitHub Pages.

Live: https://cfpperche.github.io/claude-core/

## Stack

- **Astro 5** static site (no SSR, no client framework)
- **Tailwind 4** via `@tailwindcss/vite` (used sparingly — most pages are custom poster theme)
- **bun** as package manager + runtime
- **JetBrains Mono Variable** + **Inter Variable** via fontsource
- **GitHub Pages** deploy via `.github/workflows/deploy-pages.yml`

## Build & test

```bash
bun install            # one-time
bun run dev            # http://localhost:4321/claude-core/
bun run build          # static output to dist/
bun run preview        # serve the built site
```

No test suite — visual verification via dev server + production build is the discipline.

## Layout

```
src/
├── pages/
│   ├── index.astro                     # landing EN
│   ├── pt/index.astro                  # landing PT
│   ├── es/index.astro                  # landing ES
│   ├── cheatsheet/
│   │   ├── claude-core.astro           # dense single-page reference (EN)
│   │   ├── pt/claude-core.astro        # PT — banner+hub+headers translated, flag tables EN
│   │   └── es/claude-core.astro        # ES — same posture
│   ├── masterclass/
│   │   ├── claude-code.astro           # 12-module Master Class (EN)
│   │   ├── pt/claude-code.astro        # 12-module Master Class (PT)
│   │   ├── es/claude-code.astro        # 12-module Master Class (ES)
│   │   ├── goal-command.astro          # 8-module /goal deep dive (EN)
│   │   ├── pt/goal-command.astro       # PT
│   │   └── es/goal-command.astro       # ES
│   └── cookbook/
│       ├── hooks.astro                 # 10 hook recipes (EN)
│       ├── pt/hooks.astro              # PT
│       └── es/hooks.astro              # ES
├── components/
│   ├── ResourcesMenu.astro             # cross-surface nav dropdown (CRITICAL — see below)
│   └── LanguageSwitcher.astro          # EN/PT/ES pills in every page's top bar
├── styles/
│   └── global.css                      # tailwind + fonts; per-page poster theme is inline
└── i18n/
    └── locales.ts                      # exports REPO_URL only
```

## Conventions

- **Poster theme.** Each page sets `data-theme="poster"` on `<html>` and defines its own `<style is:global>` block with the same color tokens (`--p-bg`, `--p-green`, `--p-orange`, etc.) and JetBrains Mono. Variables are deliberately duplicated across pages today; extract to `styles/poster.css` if maintenance pressure hits.
- **Constant in the page header.** `CC_VERSION` (currently `"2.1.143"`) appears in the banner and in page descriptions. Bump it in every page when Claude Code releases a new version that materially changes the surface.
- **The `Resources ▾` dropdown is the cross-surface nav.** Implementation lives at `src/components/ResourcesMenu.astro`. The `RESOURCES` array there is the single source of truth — adding a new learning surface means adding one entry to that array plus a new slug to the `CurrentPage` union type. Every page picks it up automatically. The dropdown is locale-aware: pass `locale="pt"` or `locale="es"` to route the user to translated variants. The component also carries per-locale UI copy (dropdown label, card titles, "you are here" suffix) so PT/ES pages don't see English labels in the cross-nav.
- **Locale routing pattern.** EN is at the root path (`/cheatsheet/claude-core/`, `/cookbook/hooks/`, …). PT and ES nest the locale segment between the surface and the page slug: `/cheatsheet/pt/claude-core/`, `/cookbook/es/hooks/`. Landing is the exception — `/pt/` and `/es/` at the top level. The `LanguageSwitcher` component takes the three URLs as props per page since the path shape differs across surfaces.
- **Translation policy: cheatsheet is partial by design.** The cheatsheet's banner, hub, part-markers, card-h, card-sub, and footer are translated. The dense card content (CLI flag tables, hook event names, settings keys, JSON shapes) stays in English with an i18n note near the top explaining why — those literals match what the user actually types in the terminal or writes into `settings.json`. The other three surfaces translate fully.
- **Cheatsheet is the hub.** Below the banner it has a `.hub` card explaining each surface — that's the primary entrypoint for new visitors. The `Resources ▾` dropdown in every page's top bar is for in-page wayfinding.
- **Deep links.** Cheatsheet's Atlas cards have explicit IDs (`#hooks-radial`, `#mcp-radial`, `#cost-matrix`, `#composition`, `#compaction-flow`, `#part-i`, `#part-ii`). Other pages link to those anchors via `Deep dive →` chips.
- **Print styles.** Every page has `@media print` rules that strip dark theme, hide nav/dropdown/buttons, page-break per module, and append URLs as footnote text on links. The `PDF` button in each top bar invokes `window.print()`.
- **Sources stay cited.** When a page's content is derived from a third-party article or thread, link to it in the footer. The `/goal` Class footer is the template — `code.claude.com/docs` plus secondary sources (Akshay Pachaar, Avi Chawla, jthack/claude-goal, VentureBeat).

## Gotchas

- **Literal `{` in JSX text breaks the Astro parser.** Examples that contain `{some-pseudo-json}` (e.g. a YAML snippet listing valid labels) trigger errors like `Expected "}" but found ":"` or `Unterminated string literal` with **misleading line numbers**. Always escape inline `{` and `}` as `&#123;` and `&#125;` inside JSX text. The hook cookbook and `/goal` class footer were both bitten by this.
- **`$ARGUMENTS`-style template literals.** In page text, `${{ secrets.X }}` (GitHub Actions syntax) needs the `$` to be either inside a `<code>` block or escaped — Astro's JSX parser may try to interpret the `${...}` as expression interpolation.
- **No i18n config in `astro.config.mjs`.** The PT and ES variants of the Master Class are just nested routes (`/masterclass/pt/claude-code/`), not Astro-managed locales. This is intentional: dropping the i18n config eliminated the dev-server 404 quirk for non-locale-prefixed URLs. If a future page wants locale-aware routing, weigh that against re-introducing the quirk.
- **Base path is `/claude-core/`.** All internal links use `${base}/...` where `base = import.meta.env.BASE_URL.replace(/\/$/, "")`. Hardcoding `/claude-core/` in a link will break local dev (where base is `/claude-core/` too, but inconsistent quoting can drift). Always use the `${base}` template.
- **Build path in the deploy workflow.** Unlike Agent0's nested-`./site` setup, claude-core's workflow runs `withastro/action@v3` at repo root (no `path:` override). Single-project repo.

## Provenance

Extracted on 2026-05-17 from [Agent0](https://github.com/cfpperche/Agent0). Agent0 stays a harness/template-for-AI-agents story; claude-core is the focused Claude Code learning resource. See Agent0's commit `0b7c4a9` for the separation point.

## Compact instructions

When summarizing this conversation for context compaction, prioritize keeping:

- The user's most recent intent and the *why* behind in-flight work
- Decisions made and rejected alternatives, with reasoning
- File paths and identifiers that anchor the work (so subsequent searches stay grounded)
- Any rebrand / URL / version constants the user touched

Safe to compress:

- Verbatim tool output (file contents, command output) — re-read on demand
- Resolved sub-tasks where the outcome is already in `git log`
- Exploratory tangents that didn't influence the final direction
