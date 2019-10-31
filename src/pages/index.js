import React, { Component } from 'react'

import Layout from '../components/layout/page'
import Map from '../modules/map'

class IndexPage extends Component {
  componentDidMount() {
    window.analytics && typeof window.analytics.page === 'function' && window.analytics.page('Home')
  }

  render () {
    console.log(this.props)
    return (
      <Layout title="Trashhold">
        <Map />
      </Layout>
    )
  }
}

export default IndexPage
