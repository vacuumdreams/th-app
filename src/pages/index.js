import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import "../theme/index.scss"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <section className="hero is-dark is-fullheight">
      <div style={{ maxWidth: '700px', width: '70%' }}>
        <h1 className="title has-text-weight-bold is-size-1-tablet is-size-2-mobile">Life in plastic, it's not fantastic.</h1>
      </div>
    </section>
  </Layout>
)

export default IndexPage
