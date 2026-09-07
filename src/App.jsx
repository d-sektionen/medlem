import React, { Fragment } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './components/layout/layout'
import NotFoundPage from './components/404Page'
import { ROUTES } from './routes'

// The wildcard route should show the same page as the "/404" page.
const notFoundRoute = ROUTES.find(route => route.path === '/404')

const App = () => (
  <Layout>
    <Routes>
      {ROUTES.map(({ path, alternativePaths, Component, context }) => (
        <Fragment key={path}>
          <Route path={path} element={<Component pageContext={context} />} />
          {alternativePaths.map(alternative => (
            <Route
              key={alternative}
              path={alternative}
              element={<Navigate to={path} replace />}
            />
          ))}
        </Fragment>
      ))}
      {notFoundRoute && (
        <Route
          path="*"
          element={<NotFoundPage pageContext={notFoundRoute.context} />}
        />
      )}
    </Routes>
  </Layout>
)

export default App
