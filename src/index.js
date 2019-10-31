import React from 'react'

import App from './app'

import firebase from './service/firebase'

const services = {
  firebase,
}

export default function ThApp (props) {
  return (
    <App services={services}>
      {props.children}
    </App>
  )
}
