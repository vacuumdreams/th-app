const algoliasearch = require('algoliasearch')

module.exports = (config = {}, db) => {
  const client = algoliasearch(config.appid, config.apikey)
  const index = client.algoliaClient.initIndex(config.collection.index)
  index.setSettings({
    attributesForFaceting: config.collection.facets,
  })

  return functions.https.onRequest(async (req, res) => {
    const collection = await db.collection(config.collection.name).get()
    const records = collection.docs
      .filter((doc) => {
        return doc.status === 'live'
      })
      .map((doc) => {
        const data = doc.data()
        return {
          objectID: doc.id,
          name: data.name,
          types: data.types,
          features: data.features,
          _geoloc: {
            lat: data.coordinates.latitude,
            lng: data.coordinates.longitude,
          },
        }
      })

    index.saveObjects(records)
      .then(() => {
        res.status(200).send('Collection successfully indexed.')
      })
      .catch((err) => {
        res.status(500).send('Error indexing collection: ' + err.message)
        process.exit(1)
      })
  })
}
