import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import { defineConfig } from 'astro/config';
import process_anchors from "./src/plugins/process_anchors";
import process_image_urls from './src/plugins/process_image_urls';
import table_row_headers from './src/plugins/table_row_headers';
import { remarkModifiedTime } from './src/plugins/remark-modified-time.mjs';
import generateRedirects from './src/config/redirects'

const base = process.env.BASEURL ? process.env.BASEURL + '/oasis-plus' : '/oasis-plus'
// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), sitemap()],
  outDir: '_site',
  site: 'https://www.gsa.gov/',
  base: base,
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkModifiedTime],
    rehypePlugins: [
      [table_row_headers, {}],
      [process_anchors, {baseURL: base}],
      [process_image_urls, {baseURL: base}]
    ]
  },
  redirects: generateRedirects(process.env.BASEURL)
});