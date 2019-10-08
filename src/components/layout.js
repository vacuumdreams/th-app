import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ children }) => {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }}>
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
