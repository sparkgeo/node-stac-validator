const { difference } = require('lodash')

const ensureContainsAllowedKeys = ({ allowedKeys, asset, location } = {}) => {
  if (!allowedKeys) {
    console.log('Missing required element allowedKeys. Cannot test')
    return
  }
  if (typeof allowedKeys === 'string') allowedKeys = [allowedKeys]

  const errors = []
  const assetKeys = Object.keys(asset)
  const arrayDiff = difference(assetKeys, allowedKeys)

  if (arrayDiff.length > 0) {
    errors.push(
      ...arrayDiff.map(i => ({
        type: 'Extra unpermitted element',
        message: `The element "${i} is not permitted within a collection`,
        url: location,
      }))
    )
  }
  return errors
}

module.exports = ensureContainsAllowedKeys
