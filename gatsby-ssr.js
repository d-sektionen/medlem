/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'
import Layout from './src/components/layout'

export const wrapPageElement = ({ element, props }) => (
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  <Layout {...props}>{element}</Layout>
)
