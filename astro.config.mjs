import { defineConfig } from 'astro/config';
import process_anchors from "./src/plugins/process_anchors";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  outDir: '_site',
  base: process.env.BASEURL,
  trailingSlash: 'ignore',
  markdown: {
    rehypePlugins: [
      [process_anchors, {baseURL: process.env.BASEURL || '/'}],
    ]
  }
});