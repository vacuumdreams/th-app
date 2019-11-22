import React from 'react'
import { pathOr } from 'ramda'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

import Layout from '../../components/layout/page'
import { PlaceItem } from '../../modules/places'

const toArray = (obj) => Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))

function PlacePage () {
  useFirestoreConnect([
    { collection: 'place-types' },
    { collection: 'place-features' },
    { collection: 'place-social' },
  ])

  const {
    placeTypes,
    placeFeatures,
    placeSocial,
  } = useSelector(({ firestore }) => ({
    placeTypes: pathOr({}, ['data', 'place-types'], firestore),
    placeFeatures: pathOr({}, ['data', 'place-features'], firestore),
    placeSocial: pathOr({}, ['data', 'place-social'], firestore),
  }))

  return (
    <Layout title="Trashhold - Add new place">
      <PlaceItem
        features={toArray(placeFeatures)}
        social={toArray(placeSocial)}
        types={toArray(placeTypes)}
      />
    </Layout>
  )
}

export default PlacePage
