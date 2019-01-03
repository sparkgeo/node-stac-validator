const { difference } = require('lodash')

const ensureContainsNoExtraKeys = ({ allowedKeys, asset, location } = {}) => {
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

export default ensureContainsNoExtraKeys
