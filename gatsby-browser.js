/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from 'react'
import Layout from './src/components/layout/layout'
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from './src/components/request/backendService'

// Removes token from url if it exists.
export const onClientEntry = () => {
  const accessTokenRegex = new RegExp(`${ACCESS_TOKEN_KEY}=([^&]+)`)
  //const refreshTokenRegex = new RegExp(`${REFRESH_TOKEN_KEY}=([^&]+)`)
  // Try to find tokens in url.
  const accessTokenMatch = window.location.href.match(accessTokenRegex)
  //const refreshTokenMatch = window.location.href.match(refreshTokenRegex)

  if (accessTokenMatch) {
    // Save tokens retrieved from backend
    localStorage.setItem(ACCESS_TOKEN_KEY, accessTokenMatch[1])
    //localStorage.setItem(REFRESH_TOKEN_KEY, refreshTokenMatch[1])

    // Edit history to remove reference of tokens in url.
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
