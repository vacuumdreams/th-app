const { countries } = require('countries-list')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: 'Trashhold',
    description: 'Life in plastic, it\'s not fantastic',
    author: '@trashhold',
    countries: Object.keys(countries).reduce((acc, code) => ([
      ...acc,
      {
        code,
        ...countries[code],
      },
    ]), []).sort((a, b) => a.name < b.name),
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/static/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Trashhold',
        short_name: 'TH',
        start_url: '/',
        background_color: '#000',
        theme_color: '#000',
        display: 'minimal-ui',
        icon: 'src/static/images/trash.png',
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
        prodKey: process.env.SEGMENT_WRITE_KEY,
        trackPage: false,
      }
    },
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {},
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'material icons',
          'montserrat:300,500,800',
          'gloria hallelujah:400',
        ]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
