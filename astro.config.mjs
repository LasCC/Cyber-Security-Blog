import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    sitemap(),
    mdx(),
    react(),
  ],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
    },
  },
});
