const pathPrefix = '/medlem'

module.exports = {
  pathPrefix,
  siteMetadata: {
    title: 'Medlem D-sektionen',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Datateknologsektionen',
        short_name: 'D-sektionen',
        start_url: pathPrefix ? pathPrefix : '/',
        background_color: '#FFFFFF',
        theme_color: '#20407c',
        display: 'standalone',
        icon: 'src/images/pixels.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
