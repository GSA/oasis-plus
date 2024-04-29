/*
 * Configure a list of redirects.
 */

import path from "path"

const redirects = {
  "/ordering-guide/": "/buyers-guide/ordering-guide/",
  
}


export default function generateRedirects(basePath = "/") {
  Object.keys(redirects).forEach((key) => {
   
    redirects[key] = path.posix.join(basePath, redirects[key])
  })
  return redirects
}