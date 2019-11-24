exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty',
      child_process : 'empty',
      net : 'empty',
      tls: 'empty',
    },
    externals: ['grpc'],
    resolve: {
      mainFields: ['main'],
    },
  })
}
