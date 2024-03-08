/**
 * This looks at the last git commit of the markdown files to determin the
 * modification date. 
 * 
 * When running on cloud.gov pages, it is important to tell cloud.gov to clone
 * the full repo — the default is a shallow clone. 
 * 
 * This is specified in the root-level federalist.json file
 * See: https://cloud.gov/pages/documentation/federalist-json/
 */
import { execSync } from "child_process";

export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}