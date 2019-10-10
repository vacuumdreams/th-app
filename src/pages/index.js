import React, { Component } from 'react'

import Layout from '../components/layout/page'
import SEO from '../components/layout/seo'

import Map from '../modules/map'

import '../theme/index.scss'

class IndexPage extends Component {
  componentDidMount() {
    window.analytics && window.analitics.page('Home')
  }

  render () {
    return (
      <Layout>
        <SEO title="Home" />
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100vh',
        }}>
          <Map />
        </div>
      </Layout>
    )
  }
}

export default IndexPage
