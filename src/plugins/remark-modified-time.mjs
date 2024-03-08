/**
 * This looks at the last git commit of the markdown files to determine the
 * modification date. 
 * 
 * Alternatively users may override this date by adding a last_modified key to front-matter
 * with the date as a string.
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
    // allow content creators to override date in front-matter
    const manual_last_modified_date = file.data.astro.frontmatter.last_modified
    if (manual_last_modified_date) {
      file.data.astro.frontmatter.lastModified = manual_last_modified_date
    }
    else {
      const filepath = file.history[0];
      const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
      file.data.astro.frontmatter.lastModified = result.toString();
    }
  };
}