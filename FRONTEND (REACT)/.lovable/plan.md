## Plan: Remove the Moving Sheen Across All Pages

The "weird light that comes and goes" you circled is the diagonal sweeping highlight produced by the `liquid-shimmer` utility (and its sibling `shimmer-effect` / `stat-shimmer`). It's used on cards, panels, stat numbers, and pills across customer, driver, and restaurant pages.

### Changes

**1. `src/index.css`** — Neutralize the shimmer animations so nothing visible moves:
- Remove the `::after` sweeping gradient from `.liquid-shimmer` (keep the class as a no-op so we don't have to touch every file).
- Remove the `::after` sweep from `.shimmer-effect`.
- Remove the animated background-position sweep from `.stat-shimmer` (keep static gradient text or revert to plain white).
- Delete (or leave unused) the `@keyframes shimmer` and `@keyframes liquid-shimmer-move` rules.

That's it — one file edited, all pages stop showing the moving light. Static glass, borders, and glow effects remain untouched.
