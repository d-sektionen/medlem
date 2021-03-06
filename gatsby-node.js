/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { PAGES } = require('./src/config')

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ actions }) => {
  const { createPage, createRedirect } = actions

  // Create pages for each page in the config file.
  PAGES.forEach(page => {
    const context = { ...page }
    ;['path', 'component'].forEach(key => {
      delete context[key]
    })
    createPage({
      path: page.path,
      component: path.resolve(page.component),
      context,
    })

    if (page.alternativePaths)
      page.alternativePaths.forEach(fromPath => {
        console.log(`Redirecting from ${fromPath} to ${page.path}`)

        createRedirect({
          fromPath,
          isPermanent: true,
          redirectInBrowser: true,
          toPath: page.path,
        })
      })
  })
}
