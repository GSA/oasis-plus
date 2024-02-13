import { defineConfig } from 'astro/config';
import process_anchors from "./src/plugins/process_anchors";
import process_image_urls from './src/plugins/process_image_urls';


import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  outDir: '_site',
  base: process.env.BASEURL,
  trailingSlash: 'always',
  markdown: {
    rehypePlugins: [
      [process_anchors, {baseURL: process.env.BASEURL || '/'}],
      [process_image_urls, {baseURL: process.env.BASEURL || '/'}]
    ]
  }
});