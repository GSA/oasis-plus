import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import { defineConfig } from 'astro/config';
import process_anchors from "./src/plugins/process_anchors";
import process_image_urls from './src/plugins/process_image_urls';
import table_row_headers from './src/plugins/table_row_headers';
import { remarkModifiedTime } from './src/plugins/remark-modified-time.mjs';

const BASE_PATH = "/oasis-plus"

function serialize(item) {
  /* Rewrite urls for sitemap to put them under a subdirectory */
  const url = new URL(item.url);
  url.pathname = `${BASE_PATH}${url.pathname}`
  item.url = url.toString();
  return item;
}

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), sitemap({
    serialize
})],
  outDir: '_site',
  site: 'https://www.gsa.gov/',
  base: process.env.BASEURL ? process.env.BASEURL + '/oasis-plus' : '/oasis-plus',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkModifiedTime],
    rehypePlugins: [
      [table_row_headers, {}],
      [process_anchors, {baseURL: process.env.BASEURL || '/'}],
      [process_image_urls, {baseURL: process.env.BASEURL || '/'}]
    ]
  }
});