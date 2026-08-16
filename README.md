<div align="center">

# academic-homepage

[![Stars](https://img.shields.io/github/stars/siruizou2005/academic-homepage?style=flat-square&logo=github&color=0088b0)](https://github.com/siruizou2005/academic-homepage/stargazers)
[![Forks](https://img.shields.io/github/forks/siruizou2005/academic-homepage?style=flat-square&logo=github&color=0088b0)](https://github.com/siruizou2005/academic-homepage/network/members)
[![Issues](https://img.shields.io/github/issues/siruizou2005/academic-homepage?style=flat-square&color=0088b0)](https://github.com/siruizou2005/academic-homepage/issues)
[![License](https://img.shields.io/badge/license-MIT-0088b0?style=flat-square)](LICENSE)
&nbsp;|&nbsp;
[中文文档](README.zh-CN.md)

### A fast, single-page academic homepage — built with Astro

Edit one file, deploy to GitHub Pages.

<img src="docs/hero-devices.png" alt="The template shown on a desktop monitor, tablet, phone and laptop; the laptop is in dark mode" width="100%">

[**Live demo**](https://siruizou.com/academic-homepage/) &nbsp;·&nbsp;
[**Use this template**](https://github.com/siruizou2005/academic-homepage/generate)

<br>

<a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fsiruizou.com%2Facademic-homepage%2F&form_factor=mobile"><img src="docs/lighthouse.png" alt="Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100" width="660"></a>

<sub>Mobile, against the live demo — the current score, not a target.<br>
Don't take my word for it: <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fsiruizou.com%2Facademic-homepage%2F&form_factor=mobile">run it on PageSpeed Insights</a> (the link starts a fresh test), or <code>npx lighthouse https://siruizou.com/academic-homepage/</code> locally.</sub>

</div>

## Who it is for

This is a template for the early part of an academic career — an
undergraduate, a master's or Ph.D. student, a postdoc, someone a few years
into a first position. At that stage the whole record fits on one page: a
handful of papers, a few projects, some teaching. Everything here is built
around that, because a visitor should be able to read all of it in a minute
without clicking anything.

It is the wrong shape for a long record. Once you have thirty publications,
years of talks and a teaching history to match, a single scrolling page stops
helping — the publication list swallows everything else, and a visitor has no
way to jump to what they came for. At that point you want a template with a
page per section, and [al-folio](https://github.com/alshedivat/al-folio) or
[academicpages](https://github.com/academicpages/academicpages.github.io) will
serve you better. Nothing here breaks at that size; it just stops doing you
any favours.

## What you get

Most academic homepage templates ask you to learn their layout system before
you can put your name on a page. This one asks you to edit a list.

```js
// src/data.js
export const publications = [
  {
    title: "Simulating Thin Markets: Agent-Based Evidence on Matching",
    authors: "<strong>Jane Doe</strong> and John Roe",
    venue: "<em>Journal of Example Economics</em>, 14(2), 331–368",
    abstract: "Thin markets — those with few buyers, few sellers, or both …",
    bibtex: `@article{doe2025simulating, … }`,
    links: [{ label: "Paper", href: "…" }, { label: "Code", href: "…" }],
  },
];
```

That renders a paper with an Abstract panel, a BibTeX panel with a copy
button, and outlined links. Empty the array and the Publications section
disappears. Every section on the page works the same way.

- **One file to edit.** Name, links, About, news, education, papers,
  experience, projects, awards, teaching — all of it is `src/data.js`.
- **Sections that manage themselves.** An empty list hides its heading. No
  half-finished "Coming soon" blocks.
- **Light and dark.** Follows the visitor's system setting, with a toggle.
- **Fast by construction.** No framework ships to the browser: the page is
  HTML, ~2 KB of inline JavaScript, and one CSS file. A cold load is around
  65 KB, most of it the webfont.
- **Self-hosted fonts.** Downloaded and subset at build time — no request to
  Google at runtime, and no layout shift when the webfont arrives.
- **Findable.** Canonical URL, Open Graph and Twitter cards, a JPEG social
  image for scrapers that will not render WebP, `schema.org/Person` structured
  data assembled from your own content, plus generated `robots.txt` and
  `sitemap.xml`.
- **Readable to crawlers that do not run JavaScript.** Abstracts are in the
  HTML from the start; the script only folds them away.
- **A LaTeX CV in the same repository**, so the CV and the page linking to it
  stay in step.
- **Accessible.** Real focus rings, text contrast at WCAG AA or better,
  buttons that are buttons.

## Quick start

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
# 1. take a copy (or press "Use this template" above)
npx degit siruizou2005/academic-homepage my-homepage
cd my-homepage

# 2. install and run
npm install
npm run dev          # http://localhost:4321

# 3. make it yours
#    src/data.js          — everything visible on the page
#    src/site.config.js   — URL, SEO, theme defaults
#    src/assets/photo.jpg — your portrait (roughly 5:6)
```

Then set `demoNotice: false` at the top of `src/site.config.js` to drop the
"placeholder content" bar the demo carries.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run lint` | Lint the JavaScript |
| `npm run subset:cn` | Rebuild the webfont subset for a CJK name |

## Making it yours

### Content

`src/data.js` holds the page. Each section is an array; emptying it removes
the section. To reorder sections, move their blocks in `src/pages/index.astro`.

`about`, `news`, `authors` and `venue` are HTML snippets, so a link or an
italic journal name works inside them:

```js
venue: "<em>Journal of Example Economics</em>, 14(2), 331–368",
```

Everything else is plain text.

**Your photo** goes to `src/assets/photo.jpg`. It is displayed as a portrait
ellipse, so a roughly 5:6 crop with the face near the vertical centre works
best. **Institution logos** go in `src/assets/logos/` — square, transparent
background.

Images live in `src/assets/` rather than `public/` so Astro can compress them,
convert to WebP and emit a `srcset` at build time; a 120 KB portrait ships as
about 14 KB. Drop a replacement in at the same path and the build handles the
rest.

**Your CV**: put the PDF in `public/`, with the year and month in the filename
so anyone who saves it knows which version they have, then point `CV_URL` at
it at the top of `src/data.js`.

### Site configuration

`src/site.config.js` covers everything that is not page text: the deployed
URL, the language, the SEO description, the structured-data fields, crawler
rules and the theme default.

```js
theme: {
  default: "system",  // "system" | "light" | "dark"
  toggle: true,       // show the switch in the sidebar
},
robots: {
  indexing: true,
  aiCrawlers: true,   // false asks GPTBot, ClaudeBot, PerplexityBot … to stay out
},
```

With `default: "light"` and `toggle: false` the page ships no theme JavaScript
at all.

### Colours and type

Every colour is a token at the top of `src/styles/index.css`, declared as
`light-dark(light-value, dark-value)`. Change the pair and both themes follow:

```css
--color-accent: light-dark(#0088b0, #8fdcf5);
```

The typeface is set in `astro.config.mjs` — change `name` to any family on
Google Fonts and Astro downloads, subsets and self-hosts it at build time.
Leave `cssVariable` alone; the stylesheet reads it.

### A Chinese (or other CJK) name

Set `profile.nameCn` in `src/data.js` and the masthead shows it beside your
English name, sized so the two are optically equal.

Astro's font pipeline subsets by character set, and the smallest CJK set on
offer is the entire simplified-Chinese range — megabytes for two or three
glyphs. So the characters get their own subset instead:

```bash
npm run subset:cn                      # reads nameCn from src/data.js
npm run subset:cn -- 张三               # or pass them directly
npm run subset:cn -- 張三 --family "Noto Serif TC"
```

That rewrites `public/fonts/cjk-name-subset.woff2`, typically 1–2 KB. Leave
`nameCn` empty and neither the font nor its `@font-face` is emitted.

### How it is put together

```
src/
  data.js            all page content
  site.config.js     URL, SEO, theme, crawler rules
  layouts/Base.astro <head>: SEO, social cards, fonts, theme bootstrap
  pages/
    index.astro      section order
    404.astro
    robots.txt.js    generated from site.config.js
    sitemap.xml.js   generated by listing the pages that exist
  components/
    Sidebar.astro    portrait, name, links, theme switch
    Section.astro    heading and rule
    EntryList.astro  education / experience / projects / awards / teaching
    NewsList.astro   dated updates
    PubItem.astro    a paper, with Abstract and BibTeX panels
    ThemeToggle.astro
  styles/index.css   design tokens, then the layout
  assets/            portrait and logos (processed at build time)
public/              CV, favicon, CJK font subset — copied verbatim
cv/cv.tex            LaTeX source for the CV
scripts/             the CJK subsetting script
```

Two decisions worth knowing about. **The abstract is in the HTML** because
Google, Semantic Scholar and the growing number of LLM crawlers read what the
server sends; a panel rendered only after a click is invisible to them, so
both panels ship with `hidden` and the script does nothing but toggle it.
**The social card is a JPEG** because the avatar on the page is WebP, which
WeChat and LinkedIn do not reliably render in link previews.

## Deploying

### GitHub Pages

1. Push to a GitHub repository.
2. **Settings → Pages → Source: GitHub Actions.** This is the one manual step,
   and it exists because creating a Pages site needs a permission the built-in
   Actions token cannot be granted.
3. Push to `main`. `.github/workflows/deploy.yml` builds and publishes.

The workflow reads your Pages settings and passes the real URL into the
build, so canonical links, social cards and the sitemap are correct for all
three cases without editing anything:

| Where it lives | What you do |
| --- | --- |
| `you.github.io` | Name the repository `you.github.io`. Nothing else. |
| `you.github.io/repo/` | Nothing — the sub-path is detected. |
| Custom domain | Set it in Settings → Pages, and add `public/CNAME` containing one line: your domain. |

`public/CNAME` is what keeps a custom domain bound across deploys — if you use
one, do not delete that file.

One wrinkle worth knowing: if your `you.github.io` repository has a custom
domain, GitHub serves *every* project page on the account from that domain, so
this template lands at `your-domain.com/repo/` and the `github.io` address
redirects there. That is why the demo above lives on a `siruizou.com` path.

For local builds and other hosts, set `url` and `base` in
`src/site.config.js`.

### Anywhere else

`npm run build` writes a static `dist/`. Netlify, Vercel, Cloudflare Pages and
plain nginx all serve it as-is; there is no server side.

## Pages built with it

Using the template? Open a pull request adding a line here — a link to your
page is the most useful documentation this repository can have.

- [The demo](https://siruizou.com/academic-homepage/) — placeholder content,
  always current with `main`

## Credits

Built with [Astro](https://astro.build). Body text is
[Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4); a CJK name
uses [Noto Serif SC](https://fonts.google.com/noto/specimen/Noto+Serif+SC).
Both are under the SIL Open Font License. The device frames at the top of this
page come from [devices.css](https://github.com/picturepan2/devices.css) (MIT).

Everything in this repository is placeholder content for a fictional
researcher — no real names, papers or links.

## License

[MIT](LICENSE). Use it, change it, ship it; attribution is welcome but not
required.
