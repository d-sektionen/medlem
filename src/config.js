/* 
DO NOT change the BASE_URL value here
It should be overwritten in .env.development and .env.production
For example:

```
BASE_URL='http://localhost:8000'
```

The value in there will be prefered.

.env.development will affect `npm start`
.env.production will affect `npm run build` and `npm run deploy`
*/
module.exports.BASE_URL =
  process.env.BASE_URL || 'https://backend.d-sektionen.se'

module.exports.TITLE = 'Medlem D-sektionen'

module.exports.PAGES = [
  // TODO: Add alternative paths (redirects)
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
    path: '/voting-admin',
    title: 'D-cide Admin',
    requiredPrivileges: 'voting_admin',
    menu: true,
    component: './src/components/votingAdmin/page.js',
  },
  {
    path: '/netlight',
    title: 'Netlight',
    requiredPrivileges: 'member',
    menu: true,
    component: './src/components/netlightPage.js',
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
    requiredPrivileges: 'member',
    menu: false,
    component: './src/components/keylogPage.js',
  },
]
