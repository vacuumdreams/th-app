require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: 'Trashhold',
    description: 'Life in plastic, it\'s not fantastic',
    author: '@trashhold',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Trashhold',
        short_name: 'TH',
        start_url: '/',
        background_color: '#000',
        theme_color: '#000',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png',
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    {
      resolve: 'gatsby-plugin-segment-js',
      options: {
          // your segment write key for your production environment
          // when process.env.NODE_ENV === 'production'
          // required; non-empty string
          prodKey: process.env.SEGMENT_WRITE_KEY,

          // boolean (defaults to false) on whether you want
          // to include analytics.page() automatically
          // if false, see below on how to track pageviews manually
          trackPage: false
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
