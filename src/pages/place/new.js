import React from 'react'
import { graphql } from 'gatsby'
import { pathOr } from 'ramda'

import Layout from '../../components/layout/page'
import { PlaceItem } from '../../modules/places'

function PlacePage ({ data }) {
  const placeFeatures = pathOr([], ['allPlaceFeatures', 'edges'], data).map(({ node }) => node)
  const placeSocial = pathOr([], ['allPlaceSocial', 'edges'], data).map(({ node }) => node)
  const placeTypes = pathOr([], ['allPlaceTypes', 'edges'], data).map(({ node }) => node)

  return (
    <Layout title="Trashhold - Add new place">
      <PlaceItem
        features={placeFeatures}
        social={placeSocial}
        types={placeTypes}
      />
    </Layout>
  )
}

export default PlacePage

export const pageQuery = graphql`
  query PlacePageQuery {
    allPlaceFeatures {
      edges {
        node {
          id
          name
          description
        }
      }
    }
    allPlaceSocial {
      edges {
        node {
          id
          name
          icon
        }
      }
    }
    allPlaceTypes {
      edges {
        node {
          id
          name
          features
          social
        }
      }
    }
  }
`
