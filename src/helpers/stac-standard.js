const { get } = require('axios')
// Can be extended to include other urls
const baseUrls = {
  cdn: {
    catalog: version => `https://cdn.staclint.com/${version}/catalog.json`,
    item: version => `https://cdn.staclint.com/${version}/item.json`,
    collection: version =>
      `https://cdn.staclint.com/${version}/collection.json`,
  },
}

const catalogRequests = version => [
  get(baseUrls.cdn.catalog(version)),
  get(baseUrls.cdn.item(version)),
  get(baseUrls.cdn.collection(version)),
]

module.exports = async version => {
  const stacStandardArray = await Promise.all(catalogRequests('v0.6.0'))

  return {
    catalog: stacStandardArray[0].data,
    item: stacStandardArray[1].data,
    collection: stacStandardArray[2].data,
  }
}
