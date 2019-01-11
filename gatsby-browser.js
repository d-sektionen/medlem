/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from 'react'
import Layout from './src/components/layout'
const qs = require('querystring')
const Cookies = require('js-cookie')

// Removes token from url if it exists.
export const onClientEntry = () => {
  const parsedQueryString = qs.parse(window.location.search.slice(1))
  if (parsedQueryString.token !== undefined) {
    Cookies.set('token', parsedQueryString.token)
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
