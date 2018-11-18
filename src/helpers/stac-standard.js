const { get } = require('axios')
// Can be extended to include other urls
const latestStacVersion = 'v0.6.0'

const baseUrls = {
  cdn: {
    catalog: ({ version } = {}) =>
      version
        ? `https://cdn.staclint.com/${version}/catalog.json`
        : `https://cdn.staclint.com/${latestStacVersion}/catalog.json`,
    item: ({ version } = {}) =>
      version
        ? `https://cdn.staclint.com/${version}/item.json`
        : `https://cdn.staclint.com/${latestStacVersion}/item.json`,
    collection: ({ version } = {}) =>
      version
        ? `https://cdn.staclint.com/${version}/collection.json`
        : `https://cdn.staclint.com/${latestStacVersion}/collection.json`,
  },
}

const catalogRequests = ({ version } = {}) => [
  get(baseUrls.cdn.catalog({ version })),
  get(baseUrls.cdn.item({ version })),
  get(baseUrls.cdn.collection({ version })),
]

module.exports = async ({ version } = {}) => {
  const stacStandardArray = await Promise.all(catalogRequests({ version }))

  return {
    catalog: stacStandardArray[0].data,
    item: stacStandardArray[1].data,
    collection: stacStandardArray[2].data,
  }
}
