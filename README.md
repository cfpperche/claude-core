# claude-core

A learning surface for **Claude Code** — Anthropic's terminal-native coding agent. Built as a static Astro site, hosted on GitHub Pages.

**Live:** https://cfpperche.github.io/claude-core/

## What's inside

Four surfaces, each focused on a different way of learning the platform:

| Surface | URL | What it is |
| --- | --- | --- |
| **Cheatsheet** | `/cheatsheet/claude-core/` | Dense single-page poster — every CLI flag, hook event, skill/agent surface, settings field. Ctrl+F friendly. Built against Claude Code v2.1.143. |
| **Master Class** | `/masterclass/claude-code/` | Guided 12-module walkthrough from first session to headless CI/CD. TL;DR-first per module. About 60 minutes end-to-end. EN · PT · ES. |
| **/goal Class** | `/masterclass/goal-command/` | Deep dive on the `/goal` command (Claude Code v2.1.139+). Worker-vs-evaluator architecture, anatomy of a good condition, anti-patterns. 8 modules, ~25 minutes. |
| **Hook Cookbook** | `/cookbook/hooks/` | 10 production-ready hook recipes covering all 7 lifecycle event families. Each one: When · Payload · Script · Wire-up · Gotcha. |

A `Resources ▾` dropdown in every page's top bar lets you jump between surfaces. The cheatsheet has a hub card just below the banner that explains each surface.

## Local development

```bash
bun install        # or pnpm / npm
bun run dev        # http://localhost:4321/claude-core/
bun run build      # static output to dist/
bun run preview    # serve the built site
```

## Deployment

A GitHub Pages workflow at `.github/workflows/deploy-pages.yml` builds and publishes on every push to `main`.

## Adding a new learning surface

The `Resources ▾` dropdown is rendered by `src/components/ResourcesMenu.astro`. To add a new surface (e.g. a "CLI Recipes" page):

1. Create the page under `src/pages/<your-path>/...astro`.
2. Add a row to the `RESOURCES` array in `ResourcesMenu.astro`.
3. Add the matching slug to the `CurrentPage` type and pass `current="your-slug"` from your new page.

All six existing pages pick up the new entry automatically.

## Provenance

Extracted from [Agent0](https://github.com/cfpperche/Agent0) — the spec-driven harness for AI coding agents — to live as its own focused resource. Agent0's design memory and the harness conventions stay there; the Claude Code learning content lives here.

## License

MIT.
