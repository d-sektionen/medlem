import { PAGES, pageContextFor } from './config'

import NotFoundPage from './components/404Page'
import HomePage from './components/homePage'
import PreferencesPage from './components/preferences/page'
import VotePage from './components/vote/page'
import VotingGuestPage from './components/votingGuest/page'
import VotingAdminPage from './components/votingAdmin/page'
import VotingCounterPage from './components/votingCounter/page'
import LockPage from './components/lockPage'
import BookingPage from './components/booking/page'
import AttendancePage from './components/attendance/page'
import CheckinPage from './components/checkin/page'
import KeylogPage from './components/keylogPage'
import MailPage from './components/mail/page'

// Maps the path of each page in src/config.js to its component.
const PAGE_COMPONENTS = {
  '/404': NotFoundPage,
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

/**
 * Routes are generated from the PAGES configuration so that page metadata
 * (title, requiredPrivileges etc.) stays in one place. Each route receives
 * its configuration through the `pageContext` prop, matching how the pages
 * were rendered under Gatsby.
 */
export const ROUTES = PAGES.map(page => {
  const Component = PAGE_COMPONENTS[page.path]

  if (!Component) {
    throw new Error(
      `No component registered for configured page "${page.path}". ` +
        'Add it to PAGE_COMPONENTS in src/routes.js'
    )
  }

  return {
    path: page.path,
    alternativePaths: page.alternativePaths || [],
    Component,
    context: pageContextFor(page),
  }
})
