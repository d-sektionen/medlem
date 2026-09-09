import React, { Fragment } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './components/layout/layout'
import NotFoundPage from './components/404Page'
import { PAGES } from './config'

import HomePage from './components/homePage';
import PreferencesPage from './components/preferences/page'
import VotePage from './components/vote/page'
import VotingGuestPage from './components/votingGuest/page'
import VotingAdminPage from './components/votingAdmin/page'
import VotingCounterPage from './components/votingCounter/page'
import LockPage from './components/lockPage';
import BookingPage from './components/booking/page'
import AttendancePage from './components/attendance/page'
import CheckinPage from './components/checkin/page'
import KeylogPage from './components/keylogPage';
import MailPage from './components/mail/page'

/*
A map from all `path` values in the `PAGES` configuration to the React component that should be rendered for that page.

These are expected to take no properties, and instead use the `usePageContext` hook to access the page configuration for the current URL.
*/
const PAGE_COMPONENTS = {
  '/': HomePage,
  '/preferences': PreferencesPage,
  '/vote': VotePage,
  '/voting-guest': VotingGuestPage,
  '/voting-admin': VotingAdminPage,
  '/voting-counter': VotingCounterPage,
  '/locks': LockPage,
  '/booking': BookingPage,
  '/attendance': AttendancePage,
  '/checkin': CheckinPage,
  '/keylog': KeylogPage,
  '/mail': MailPage,
}

const App = () => (
  <Layout>
    <Routes>
      {PAGES.map(({ path, alternativePaths }) => {
        const Component = PAGE_COMPONENTS[path]

        if (!Component) {
          throw new Error(
            `No component registered for configured page "${page.path}". ` +
              'Add it to PAGE_COMPONENTS in src/routes.js'
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
  </Layout>
)

export default App
