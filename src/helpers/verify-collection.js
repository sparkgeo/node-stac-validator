const { difference } = require('lodash')

const verifyCollection = async ({
  asset,
  location,
  useRecursion,
  useVersion,
} = {}) => {
  const errors = []

  // Ensure required keys are present
  const requiredKeys = [
    'stac_version',
    'id',
    'description',
    'license',
    'extent',
    'links',
  ]
  const assetKeys = Object.keys(asset)

  const requiredKeyErrors = requiredKeys
    .map(i => {
      if (assetKeys.indexOf(i) === -1) {
        return {
          type: 'Missing element',
          message: `The "${i}" element is missing`,
          url: location,
        }
      }
    })
    .filter(v => v)

  errors.push(...requiredKeyErrors)

  // Ensure there are no extra keys
  const allowedKeys = [
    'stac_version',
    'id',
    'description',
    'license',
    'extent',
    'links',
    'keywords',
    'version',
    'providers',
  ]

  const mustBeStringKeys = ['id', 'license']

  const mustBeStringKeysErrors = mustBeStringKeys.map(i => {
    if (asset[i] && typeof asset[i] !== 'string') {
      return {
        type: 'Incorrect element type',
        message: `The "${i}" element must be a string`,
        url: location,
      }
    }
  })

  errors.push(...mustBeStringKeysErrors)

  const mustBeArrayKeys = []

  mustBeArrayKeys.map(i => {
    if (asset[i] && !Array.isArray(asset[i])) {
      return {
        type: 'Incorrect element type',
        message: `The "${i}" element must be an array`,
        url: location,
      }
    }
  })

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

  return errors.length > 0
    ? {
      success: false,
      errors,
    }
    : {
      success: true,
    }
}

module.exports = verifyCollection
