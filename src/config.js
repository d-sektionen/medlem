/*
DO NOT change the BASE_URL value here
It should be overwritten in .env.development and .env.production
For example:

```
BASE_URL='http://localhost:8000'
```

The value in there will be prefered.

.env.development will affect `npm run dev` and `npm start`
.env.production will affect `npm run build` and `npm run deploy`

`process.env.BASE_URL` is replaced at build time by Vite (see vite.config.js),
which loads the value from the active .env file.
*/

export const BASE_URL =
  process.env.BASE_URL || 'https://backend.d-sektionen.se'

export const TITLE = 'Medlem D-sektionen'

export const PAGES = [
  {
    path: '/404',
    title: 'Sidan kunde inte hittas',
    menu: false,
    component: './src/components/404Page.js',
  },
  {
    path: '/',
    title: 'Hem',
    menu: true,
    component: './src/components/homePage.js',
  },
  {
    path: '/preferences',
    title: 'Kontoinställningar',
    menu: true,
    component: './src/components/preferences/page.js',
  },
  {
    path: '/vote',
    title: 'D-cide',
    requiredPrivileges: 'member',
    menu: true,
    component: './src/components/vote/page.js',
  },
  {
    path: '/voting-guest',
    title: 'D-cide Gäst',
    requiredPrivileges: 'not_member',
    menu: true,
    component: './src/components/votingGuest/page.js',
  },
  {
    path: '/voting-admin',
    title: 'D-cide Admin',
    requiredPrivileges: 'voting_admin',
    menu: true,
    component: './src/components/votingAdmin/page.js',
  },
  {
    path: '/voting-counter',
    title: 'D-cide Rösträknare',
    requiredPrivileges: 'voting_counter',
    menu: true,
    component: './src/components/votingCounter/page.js',
  },
  {
    path: '/locks',
    title: 'Lås',
    requiredPrivileges: 'member',
    menu: true,
    component: './src/components/lockPage.js',
  },
  {
    path: '/booking',
    title: 'Bokning',
    menu: true,
    component: './src/components/booking/page.js',
  },
  {
    path: '/attendance',
    title: 'Närvarosystemet',
    requiredPrivileges: 'attendance_admin',
    menu: true,
    component: './src/components/attendance/page.js',
  },
  {
    path: '/checkin',
    alternativePaths: ['/blipp'],
    title: 'Blippsystemet',
    requiredPrivileges: 'doorkeeper',
    menu: true,
    component: './src/components/checkin/page.js',
  },
  {
    path: '/keylog',
    title: 'Nyckelloggbok',
    requiredPrivileges: 'staff',
    menu: true,
    component: './src/components/keylogPage.js',
  },
  {
    path: '/mail',
    title: 'Mailutskick',
    requiredPrivileges: 'infomail_sender',
    menu: true,
    component: './src/components/mail/page.js',
  },
]

/**
 * Returns the configuration for a page without the internal routing keys
 * (`path`, `component` and `alternativePaths`). This is what used to be
 * passed to the page as the `pageContext` prop by gatsby-node.
 */
export const pageContextFor = page => {
  const { path, component, alternativePaths, ...context } = page
  return context
}

/**
 * Finds the page configuration that matches a pathname, also taking
 * alternativePaths (redirect targets) into account. Falls back to the 404
 * page (defined first above) for unknown paths.
 */
export const findPageByPath = pathname => {
  const normalized =
    pathname === '/' ? pathname : pathname.replace(/\/+$/, '')

  return (
    PAGES.find(
      page =>
        page.path === normalized ||
        (page.alternativePaths || []).includes(normalized)
    ) || PAGES[0]
  )
}
