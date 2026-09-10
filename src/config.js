/*
DO NOT change the BASE_URL value here
It should be overwritten in .env.development and .env.production
For example:

```
BASE_URL='http://localhost:8000'
```

The value in there will be prefered.

.env.development will affect `npm run dev`
.env.production will affect `npm run build`, `npm run preview` and `npm run deploy`
*/
export const BASE_URL = process.env.BASE_URL || 'https://backend.d-sektionen.se'

export const TITLE = 'Medlem D-sektionen'

/*
Definitions of all pages in the app. 

These are passed to React Router in the App.jsx component and used to generate the menubar in sideMenu.jsx.
When a new page is added or deleted, make sure to update the PAGE_COMPONENTS object in App.jsx as well,
so the router knows which component to actually render.

If defined, `alternativePaths` is a list of paths that will redirect to th main `path`.
The other properties can be accessed in components via the `usePageContext` hook, which
will return the page configuration for the current URL.

The 404Page.jsx is a special case and is not defined here, since it doesn't have a defined path.
It is rendered by the router when no other page matches the current URL (see App.jsx).
*/
export const PAGES = [
  {
    path: '/',
    title: 'Hem',
    menu: true,
  },
  {
    path: '/preferences',
    title: 'Kontoinställningar',
    menu: true,
  },
  {
    path: '/vote',
    title: 'D-cide',
    requiredPrivileges: 'member',
    menu: true,
  },
  {
    path: '/voting-guest',
    title: 'D-cide Gäst',
    requiredPrivileges: 'not_member',
    menu: true,
  },
  {
    path: '/voting-admin',
    title: 'D-cide Admin',
    requiredPrivileges: 'voting_admin',
    menu: true,
  },
  {
    path: '/voting-counter',
    title: 'D-cide Rösträknare',
    requiredPrivileges: 'voting_counter',
    menu: true,
  },
  {
    path: '/locks',
    title: 'Lås',
    requiredPrivileges: 'member',
    menu: true,
  },
  {
    path: '/booking',
    title: 'Bokning',
    menu: true,
  },
  {
    path: '/attendance',
    title: 'Närvarosystemet',
    requiredPrivileges: 'attendance_admin',
    menu: true,
  },
  {
    path: '/checkin',
    alternativePaths: ['/blipp'],
    title: 'Blippsystemet',
    requiredPrivileges: 'doorkeeper',
    menu: true,
  },
  {
    path: '/keylog',
    title: 'Nyckelloggbok',
    requiredPrivileges: 'staff',
    menu: true,
  },
  {
    path: '/mail',
    title: 'Mailutskick',
    requiredPrivileges: 'infomail_sender',
    menu: true,
  },
]
