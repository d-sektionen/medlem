/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from 'react'
import qs from 'querystring'
import Layout from './src/components/layout'
// Removes token from url if it exists.
export const onClientEntry = () => {
  const parsedQueryString = qs.parse(window.location.search.slice(1))

  if (parsedQueryString.access !== undefined) {
    window.localStorage.setItem('token', parsedQueryString.access)
    // update url in the address bar without refreshing the page.
    window.history.replaceState(
      window.history.state,
      window.history.pageTitle,
      window.location.pathname
    )
  }
}

export const wrapPageElement = ({ element, props }) => (
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  <Layout {...props}>{element}</Layout>
)
