# Medlem

This project is a single page application built with
[React](https://react.dev/), [Vite](https://vitejs.dev/) and
[React Router](https://reactrouter.com/).

## Usage

As a non developer you can visit this project at [medlem.d-sektionen.se](https://medlem.d-sektionen.se/).

## Todo

- More documentation
- Add more tools
  - Storage
  - ...
- Fix linting
- Finish profile menu
- Finish todo list

## Development

### Prerequisites

Must know:

- React
  - Hooks
- Javascript using modern ECMAScript features.
  - Promises
- How a REST api works (specifically our backend api)

Good to know:

- Vite
- React Router
- sass (scss)
  - css modules
- npm

### Getting started

Download Node.js (which includes npm)
IMPORTANT!!!: has to be node version 20 or later
Tip: Use `nvm` to manage multiple node versions.

Clone the repository and view its directory in a terminal.

Copy the `.env.example` file to `.env.development`.

Run the following commands:

```
npm install
npm start
```

### Project structure

Routing and the build are handled by Vite and React Router. There is no SSR
and no GraphQL layer. All environment configuration lives in `.env` files
(see `vite.config.js` for how they are loaded).

Data fetching should be done using API calls. Mostly to our backend server.
This can easily be done using the request helpers in `./src/components/request`.

The project should not have to be rebuilt based on data sources, only when
files in this repository are changed.

#### Pages

All pages are defined in `./src/config.js` and have to follow the format used
there. Routes are generated from this configuration in `./src/App.jsx`, which
maps every configured path to its React component via `PAGE_COMPONENTS`.

The components in `PAGE_COMPONENTS` are loaded lazily (`React.lazy` + dynamic
`import()`), so every route is built into its own chunk and is only downloaded
when it is first visited. This keeps heavy, route-specific libraries out of the
initial bundle: `@zxing/library` is only needed by `/checkin` and `quill` only
by `/mail`. When adding a page, register it as `import('./components/<page>')`.

The layout (`./src/components/layout/layout.js`) resolves the configuration for
the current URL and uses it for the document title/meta tags and for privilege
checks. Redirect paths (`alternativePaths`, e.g. `/blipp` for `/checkin`) are
set up as React Router redirects. The wildcard route shows the 404 page.

When navigating between pages use `Link`/`NavLink`/`useNavigate` from
`react-router-dom` instead of plain `<a href>` tags, so navigation happens
client side.

#### UI components

The project has a continously evolving UI component library that should be used when possible for easy development and avoiding duplicated code.
More information can be found in [a separate README file](src/components/ui/README.md).

This is currently very much a work in progress, so many files will not have adopted these components yet.

#### Layout

The base layout files can be found in `./src/components/layout` and wraps all
routes rendered in `./src/App.jsx`.

#### Scss

Currently the css is written as scss using css modules.
They are located in the folder `./src/scss` but might in the future be moved to the folders of their respective components.

The goal with the UI component library is that css should not be required for building most components.
When needed you can write custom css, after considering if what you're making would fit as components in the UI library.

Whenever possible css should be written in modules to avoid naming conflicts.

### Deploying

Run `npm run deploy`

The build output ends up in `dist/` and is deployed to GitHub Pages with
`gh-pages`. The `static/` folder (public assets, including the `CNAME`) is
copied into the build output. `dist/404.html` is a copy of `index.html` so that
unknown paths are served the SPA entry point and React Router can resolve deep
links.

Don't forget to also push your changes to git!

## More information

The documentation is in need of further writing.
Don't hesitate to contact us if you see a part where documentation is lacking.
