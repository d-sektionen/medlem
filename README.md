# Medlem

The frontend for D-sektionens member services.

The project is a single page application built with [React](https://react.dev/), [Vite](https://vitejs.dev/) and [React Router](https://reactrouter.com/).

As a non developer you can visit this project at [medlem.d-sektionen.se](https://medlem.d-sektionen.se/), while WebbU members can refer to the [Wiki](https://github.com/d-sektionen/.github-private/wiki/medlem.d-sektionen.se) for more documentation.

## Styling

Styles are plain CSS in `src/css`:

- `variables.css` declares the design tokens (colors, spacing, shadows, fonts) as CSS custom properties on `:root`. Use them anywhere with `var(--token)`, no import needed.
- `general.css` imports `variables.css`, `normalize.css` and `fonts.css` and holds the element-level rules. It is imported once from `layout.jsx`.
- `*.module.css` files are [CSS modules](https://vite.dev/guide/features#css-modules) scoped to a component.

Nested selectors are written with an explicit `&` (`.menu { & > div { … } }`). Keep all declarations above the nested rules in a block. Vite compiles the nesting down to flat selectors for the production build.
