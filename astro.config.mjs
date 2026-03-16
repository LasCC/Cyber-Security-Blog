import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	integrations: [
		sitemap(),
		mdx(),
		react(),
	],
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		syntaxHighlight: {
			type: "shiki",
			excludeLangs: ["mermaid"],
		},
		shikiConfig: {
			theme: "one-dark-pro",
			langAlias: {
				vbs: "vb",
				vbscript: "vb",
			},
		},
	},
});
