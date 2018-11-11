require('dotenv').config()
const { get } = require('axios')

// 1. Get the Stac versions

// 2. Get the root file

// 3. Validate the root file

// 4. Recursion!

const stacVersions = [
  'v0.4.0',
  'v0.4.1',
  'v0.5.0',
  'v0.5.1',
  'v0.5.2',
  'v0.6.0',
]
const baseUrls = {
  cdn: {
    catalog: version => `https://cdn.staclint.com/${version}/catalog.json`,
    item: version => `https://cdn.staclint.com/${version}/item.json`,
    collection: version =>
      `https://cdn.staclint.com/${version}/collection.json`,
  },
  // TODO: Figure out how to crunch this into a function
  // git: 'https://raw.githubusercontent.com/radiantearth/stac-spec/',
}

const catalogRequests = version => [
  get(baseUrls.cdn.catalog(version)),
  get(baseUrls.cdn.item(version)),
  get(baseUrls.cdn.collection(version)),
]

Promise.all(catalogRequests('v0.6.0')).then(values => console.log(values))
