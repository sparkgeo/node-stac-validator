const versions = require('../standard')
const {
  missingTypeAttribute,
  unknownVersion,
  typeVersionMisMatch,
  incorrectType,
  missingAsset,
  missingUrl,
} = require('./error-responses')

const preChecks = async ({ type, version, url, asset, typeCheck } = {}) => {
  if (!type) return missingTypeAttribute
  if (!versions[version]) return unknownVersion(version)
  if (versions[version][type] === false) {
    return typeVersionMisMatch({ version, type })
  }

  if (
    !(
      type === 'item' ||
      type === 'stac-item' ||
      type === 'catalog' ||
      type === 'collection' ||
      type === 'geojson'
    )
  ) {
    return incorrectType
  }
  if (typeCheck === 'asset' && !asset) return missingAsset
  if (typeCheck === 'url' && !url) return missingUrl

  return false
}

module.exports = preChecks
