const versions = require('../standard')
const {
  missingTypeAttribute,
  unknownVersion,
  typeVersionMisMatch,
  incorrectType,
  missingAsset,
} = require('./error-responses')

// Do not remove "url" or "asset". They are both used in the !eval statement
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
  // eslint-disable-next-line
  if (!eval(typeCheck)) return missingAsset({ type: typeCheck })

  return false
}

module.exports = preChecks
