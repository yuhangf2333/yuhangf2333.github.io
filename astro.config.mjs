// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { site } from "./src/site.config.js";

// A static site: everything is rendered to HTML at build time and the output
// in dist/ can be served by any host. There is no server and no runtime
// framework — the only JavaScript that ships is the handful of lines in the
// components.
export default defineConfig({
  // Where the site will live — set in src/site.config.js, and detected
  // automatically from your Pages settings when the GitHub Pages workflow
  // builds it.
  site: site.url,
  base: site.base,

  build: {
    // Hashed asset filenames, so they can be cached forever
    assets: "assets",
  },

  // The Latin webfont is downloaded, subset and self-hosted by Astro at build
  // time: no cross-origin handshake with fonts.googleapis.com or
  // fonts.gstatic.com, and no third-party request blocking the first paint.
  // Astro also generates a metric-matched local fallback, so text does not
  // shift when the webfont swaps in.
  //
  // To change the typeface, change `name` here — `cssVariable` is what
  // src/styles/index.css reads, so leave it alone.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Source Serif 4",
      cssVariable: "--font-serif",
      weights: [400, 600],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      display: "swap",
      fallbacks: ["Georgia", "serif"],
    },
  ],
});
