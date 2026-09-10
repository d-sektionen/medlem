import React, { Fragment, Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './components/layout/layout'
import NotFoundPage from './components/404Page'
import { PAGES } from './config'

import BigPixels from './components/layout/bigPixels'

/*
A map from all `path` values in the `PAGES` configuration to the React component
that should be rendered for that page.

The components are loaded lazily (React.lazy + dynamic import) so that each
route's code is only downloaded when it is first visited. This keeps heavy,
route-specific dependencies out of the initial bundle. For instance, `@zxing/library`
(~400 kB) is only needed by `/checkin` and `quill` (~370 kB) only by `/mail`.

Every page module below is expected to have a React component as its default export,
and the component must take no properties. Instead, the `usePageContext` hook can be used
to access the page configuration for the current URL.
*/
const PAGE_COMPONENTS = {
  '/': import('./components/homePage'),
  '/preferences': import('./components/preferences/page'),
  '/vote': import('./components/vote/page'),
  '/voting-guest': import('./components/votingGuest/page'),
  '/voting-admin': import('./components/votingAdmin/page'),
  '/voting-counter': import('./components/votingCounter/page'),
  '/locks': import('./components/lockPage'),
  '/booking': import('./components/booking/page'),
  '/attendance': import('./components/attendance/page'),
  '/checkin': import('./components/checkin/page'),
  '/keylog': import('./components/keylogPage'),
  '/mail': import('./components/mail/page'),
}

const App = () => (
  <Layout>
    <Suspense fallback={<BigPixels />}>
      <Routes>
        {PAGES.map(({ path, alternativePaths }) => {
          const Component = lazy(() => PAGE_COMPONENTS[path])

          if (!Component) {
            throw new Error(
              `No component registered for configured page "${path}". ` +
                'Add it to PAGE_COMPONENTS in App.jsx'
            )
          }

          return (
            <Fragment key={path}>
              <Route path={path} element={<Component />} />

              {(alternativePaths || []).map(alternative => (
                <Route
                  key={alternative}
                  path={alternative}
                  element={<Navigate to={path} replace />}
                />
              ))}
            </Fragment>
          )
        })}
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </Suspense>
  </Layout>
)

export default App
