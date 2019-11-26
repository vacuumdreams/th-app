exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    externals: ['grpc'],
    resolve: {
      mainFields: ['main'],
    },
  })
}
