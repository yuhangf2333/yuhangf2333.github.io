# Contributing

Bug reports, fixes and small improvements are welcome.

## Working on it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # must pass before a PR
npm run lint
```

## What fits

This template stays deliberately small: one page, one content file, no
framework in the browser. It is aimed at people early in an academic career,
whose whole record still fits on one screenful of scrolling. Changes that keep
that true are easy to accept — a rendering bug, an accessibility fix, better
documentation, a section type that most academic pages need.

Changes that only make sense for a long publication record — pagination, a
separate page per section, filtering by year — are out of scope by design.
A record that size wants a different template, and the README says so.

Changes that add a dependency, a build step, or a configuration option for
something one person wants are a harder sell. If you are unsure, open an issue
before writing the code.

## Style

- Comments explain *why*, not *what*. The code already says what.
- No new dependencies without a reason that survives a second reading.
- Keep the page working with JavaScript disabled.

## Showing your page

If you built something with this, open a PR adding it to the "Pages built with
it" list in the README. That list is the most useful thing in the repository
for someone deciding whether to use it.
