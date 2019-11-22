const functions = require('firebase-functions')
const admin = require('firebase-admin')

const doIndexing = require('./search-indexing')
const initProfile = require('./user-profile')

require('dotenv').config({
  path: `../../.env.${process.env.NODE_ENV}`
})

admin.initializeApp()
const db = admin.firestore()
const createProfile = initProfile(db)

const collection = {
  db: 'place',
  index: 'th.places',
  facets: ['types', 'features'],
}

module.exports.syncIndexes = () => doIndexing({
  appid: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_SEARCH_TOKEN,
  collection,
})

module.exports.authOnCreate = functions.auth.user()
  .onCreate(createProfile)
