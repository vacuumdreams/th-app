module.exports = {
  siteMetadata: {
    title: 'Trashhold',
    description: 'Plastic is not fantastic',
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'ocnnw83z',
        dataset: 'production',
        token: process.env.SANITY_PRIVATE_TOKEN,
      },
    }
  ],
}
