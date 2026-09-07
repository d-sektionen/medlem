/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `medlem`,
    siteUrl: `https://medlem.d-sektionen.se`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions: {
          silenceDeprecations: ['legacy-js-api', 'import'],
        },
      },
    },
  ],
}
