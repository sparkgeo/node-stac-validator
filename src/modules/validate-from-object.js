const { baseContext, errorResponses } = require('../helpers')
const verifyAsset = require('./verify-asset.js')
const versions = require('../standard')

const validateFromObject = async ({
  asset,
  type,
  version,
  useRecursion,
  context,
} = {}) => {
  version = version || 'v0.6.0'
  context = context || baseContext
  // eslint-disable-next-line
  const location = 'json'

  // Ensure basic parameters are valid before linting
  if (!asset) return errorResponses.missingAsset
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
    return errorResponses.incorrectType
  }

  if (versions[version][type] === false) {
    return errorResponses.typeVersionMisMatch({ version, type })
  }

  return verifyAsset({
    asset,
    location,
    useRecursion,
    version,
    context,
    type,
  }).catch(e => console.log('Error in validateFromObject -> ', e))
}

module.exports = validateFromObject
