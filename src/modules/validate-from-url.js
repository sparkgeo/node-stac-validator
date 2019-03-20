const { get } = require('axios')
const { baseContext, errorResponses } = require('../helpers')
const verifyAsset = require('./verify-asset.js')
const versions = require('../standard')

const validateFromUrl = async ({
  url,
  type,
  version,
  useRecursion,
  context,
} = {}) => {
  version = version || 'v0.6.0'
  context = context || baseContext
  // eslint-disable-next-line
  const location = url

  // Ensure basic parameters are valid before linting
  if (!url) return errorResponses.missingUrl
  if (!type) return errorResponses.missingTypeAttribute
  if (!versions[version]) return errorResponses.unknownVersion(version)
  if (
    !(
      type === 'item' ||
      type === 'stac-item' ||
      type === 'catalog' ||
      type === 'collection' ||
      type === 'geojson'
    )
  ) {
    return [errorResponses.incorrectType]
  }
  if (versions[version][type] === false) {
    return errorResponses.typeVersionMisMatch({ version, type })
  }

  const { data: asset } = await get(url).catch(e => {
    return errorResponses.cannotConnectToEntryAsset(url)
  })

  return verifyAsset({
    asset,
    location,
    useRecursion,
    version,
    context,
    type,
  }).catch(e => console.log('Error in validateFromObject -> ', e))
}

module.exports = validateFromUrl
