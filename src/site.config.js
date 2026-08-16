// Site plumbing: where the site is deployed, what search engines and social
// cards see, and which optional behaviours are on.
//
// Everything *visible on the page* lives in src/data.js instead. If you only
// want to put your own name and papers up, you can ignore this file until it
// is time to deploy.

export const site = {
  // ── First thing to change ───────────────────────────────────────────────
  // A bar at the top of the page saying the content is placeholder. It is on
  // for the template's own demo; turn it off once the page is about you.
  demoNotice: true,
  // Where the template lives, linked from that bar.
  repo: "https://github.com/siruizou2005/academic-homepage",

  // ── Deployment ──────────────────────────────────────────────────────────
  // Absolute URL of the deployed site, no trailing slash. Used for canonical
  // links, social-card images, sitemap.xml and robots.txt.
  //   custom domain      → "https://your-domain.com"
  //   user/org GitHub Pages → "https://your-name.github.io"
  //   project GitHub Pages  → "https://your-name.github.io"  (set `base` too)
  url: "https://example.com",

  // Sub-path the site is served from. Leave "/" for a custom domain or a
  // <your-name>.github.io repository. For a project repository published at
  // <your-name>.github.io/<repo>/, set this to "/<repo>/".
  base: "/",

  // ── Language ────────────────────────────────────────────────────────────
  lang: "en", // <html lang>
  locale: "en_US", // og:locale
  localeAlternate: "", // e.g. "zh_CN" if the page also carries Chinese text

  // ── SEO and social cards ────────────────────────────────────────────────
  // One or two sentences for search results. Say who you are and what you
  // work on — this is what Google and, increasingly, LLMs quote back.
  description:
    "Jane Doe is a Ph.D. student in Economics at Northfield University, " +
    "working on market design, computational social science and " +
    "text-as-data methods.",

  // Shorter line for link previews (WeChat, X, LinkedIn, Slack).
  socialDescription:
    "Ph.D. student in Economics at Northfield University. Market design, " +
    "computational social science, text-as-data.",

  // ── Structured data (schema.org Person) ─────────────────────────────────
  // Lets search engines and AI assistants state plainly who you are, where you
  // are, and what you work on. Everything else in the JSON-LD block is derived
  // from src/data.js.
  seo: {
    jobTitle: "Ph.D. Student in Economics",
    // Your current institution. `sameAs` should be its official homepage.
    affiliation: {
      name: "Northfield University",
      sameAs: "https://example.edu/",
    },
    // Where you are based. Optional — delete the block to leave it out.
    // `country` is a two-letter ISO code.
    location: { locality: "Northfield", country: "US" },
    // Research keywords, ordered from most to least central.
    knowsAbout: [
      "Economics",
      "Market Design",
      "Computational Social Science",
      "Text as Data",
      "Natural Language Processing",
    ],
  },

  // ── Crawlers ────────────────────────────────────────────────────────────
  // Generates public-facing robots.txt. Academic pages usually *want* to be
  // indexed and quoted, so both default to true. Set `aiCrawlers` to false to
  // ask GPTBot, ClaudeBot, PerplexityBot, CCBot and Google-Extended to stay
  // out (a request, not a wall — it relies on the crawler honouring it).
  robots: {
    indexing: true,
    aiCrawlers: true,
  },

  // ── Appearance ──────────────────────────────────────────────────────────
  theme: {
    // "system" follows the visitor's OS setting; "light" or "dark" pins it.
    default: "system",
    // Show the light/dark toggle in the sidebar. With `toggle: false` and
    // `default: "system"` the page ships zero client-side theme JavaScript.
    toggle: true,
  },
};

// The GitHub Pages workflow reads your Pages settings — custom domain and
// all — and passes the result in here, so a fresh clone produces correct
// absolute links before you have edited a single line. Local builds and other
// hosts fall back to the values above.
// The http → https rewrite is deliberate: GitHub reports a custom domain as
// http:// until "Enforce HTTPS" is switched on in the Pages settings, while
// serving the site over https either way. A canonical link pointing at http
// is a real SEO cost, so the scheme is corrected here rather than left to be
// noticed later. It applies only to the URL the workflow supplies, never to
// the one written above.
if (process.env.SITE_URL) site.url = process.env.SITE_URL.replace(/^http:/, "https:");
if (process.env.BASE_PATH) site.base = process.env.BASE_PATH;

// Absolute URL for a path, honouring `base`. Use for canonical and sitemap
// links, which must be absolute.
//
// `path` is relative to the site root as you write it in your own links —
// "/" or "cv.pdf". Do not pass a path Astro generated (an image src, an
// `import.meta.env.BASE_URL` join): those already carry `base`, and this
// would add it a second time.
export function absoluteUrl(path = "") {
  const origin = site.url.replace(/\/+$/, "");
  const base = `/${site.base}/`.replace(/\/+/g, "/");
  return origin + (base + path.replace(/^\/+/, "")).replace(/\/+/g, "/");
}
