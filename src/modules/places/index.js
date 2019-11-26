import React from 'react'
import { pathOr } from 'ramda'
import { useFirestore } from 'react-redux-firebase'

import Item from './components/item'

export function PlaceItem ({
  features,
  social,
  types,
}) {
  const firestore = useFirestore()

  const addPlace = (data = {}) => {
    const types = pathOr([], ['types'], data)
    const features = pathOr([], ['features'], data)
    const social = pathOr([], ['social'], data)

    return firestore.collection('place').add({
      ...data,
      status: 'review',
      country: data.country.code,
      coordinates: new firestore.GeoPoint(...data.coordinates),
      types: types.map((id) => firestore.doc(`place-types/${id}`)),
      features: features.map((id) => firestore.doc(`place-features/${id}`)),
      social: social.map((id) => firestore.doc(`place-social/${id}`)),
    })
  }

  return (
    <Item
      typeList={types}
      socialList={social}
      featureList={features}
      addPlace={addPlace}
    />
  )
}
