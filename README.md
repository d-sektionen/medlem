# Medlem

This project was created using with [Gatsby](https://www.gatsbyjs.org/).
Check out their documentation a more in depth understanding of the project structure.

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

### Important

This project works with Node **v.14**. If you are using a newer version (especially **v.16**) you might need to downgrade before getting started.

### Prerequisites

Must know:

- React
  - Hooks
- Javascript using modern ECMAScript features.
  - Promises
- How a REST api works (specifically our backend api)

Good to know:

- gatsby.js
- sass (scss)
  - css modules
- npm

### Getting started

Download Node.js (which includes npm)

Clone the repository and view its directory in a terminal.

Run the following commands:

```
npm install
npm start
```

### Project structure

This project is based on Gatsby.js, although it is mostly used as groundwork.
While not prohibited, it is discouraged to use the GraphQL features of Gatsby for this project.
Instead the file `./src/config.js` should be used and imported from where needed.

Data fetching should be done using API calls. Mostly to our backend server.
This can easily be done using the request helpers in `./src/components/request`.

The project should not have to be rebuilt based on data sources, only when files in this repository are changed.

#### Pages

Pages are slightly differently implemented in this project if you are used to other gatsby projects.
All pages should be defined in `./src/config.js` and have to follow the format used there.
These pages (as well as the layout) will recieve the page configuration as attributes in the `pageContext` prop.
This excludes `path` and `component` which are for internal use.

#### UI components

The project has a continously evolving UI component library that should be used when possible for easy development and avoiding duplicated code.
More information can be found in [a separate README file](src/components/ui/README.md).

This is currently very much a work in progress, so many files will not have adopted these components yet.

#### Layout

The base layout files can be found in `./src/components/request` and will wrap all pages created.

#### Scss

Currently the css is written as scss using css modules.
They are located in the folder `./src/scss` but might in the future be moved to the folders of their respective components.

The goal with the UI component library is that css should not be required for building most components.
When needed you can write custom css, after considering if what you're making would fit as components in the UI library.

Whenever possible css should be written in modules to avoid naming conflicts.

### Deploying

Run `npm run deploy`

Don't forget to also push your changes to git!

## More information

The documentation is in need of further writing.
Don't hesitate to contact us if you see a part where documentation is lacking.
