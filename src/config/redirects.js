/*
 * Configure a list of redirects.
 */

import path from "path"

const redirects = {
  "/ordering-guide/": "/oasis-plus/buyers-guide/printable/",
  
}


export default function generateRedirects(basePath = "/") {
  Object.keys(redirects).forEach((key) => {
   
    redirects[key] = path.posix.join(basePath, redirects[key])
  })
  return redirects
}