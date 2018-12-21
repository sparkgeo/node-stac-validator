const { difference } = require('lodash')

const detectNotString = ({ keys, obj, location } = {}) =>
  keys.map(i => {
    if (obj[i] && typeof obj[i] !== 'string') {
      return {
        type: 'Incorrect element type',
        message: `The "${i}" element must be a string`,
        url: location,
      }
    }
  })

const detectNotArray = ({ keys, obj, location } = {}) =>
  keys.map(i => {
    if (obj[i] && !Array.isArray(obj[i])) {
      return {
        type: 'Incorrect element type',
        message: `The "${i}" element must be an array`,
        url: location,
      }
    }
  })

const detectNotObject = ({ keys, obj, location } = {}) =>
  keys.map(i => {
    if (obj[i] && (typeof obj[i] !== 'object' || Array.isArray(obj[i]))) {
      return {
        type: 'Incorrect element type',
        message: `The "${i}" element must be an object`,
        url: location,
      }
    }
  })

const detectMissingManditoryKeys = ({ keys, obj, location } = {}) =>
  keys.map(i => {
    if (Object.keys(obj).indexOf(i) === -1) {
      return {
        type: 'Missing element',
        message: `The "${i}" element is missing`,
        url: location,
      }
    }
  })

const verifyCollection = async ({
  asset,
  location,
  useRecursion,
  useVersion,
} = {}) => {
  let errors = []

  // Ensure required keys are present
  const requiredKeys = [
    'stac_version',
    'id',
    'description',
    'license',
    'extent',
    'links',
  ]

  const requiredKeyErrors = detectMissingManditoryKeys({
    obj: asset,
    keys: requiredKeys,
    location,
  })

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

  const mustBeStringKeysErrors = detectNotString({
    location,
    keys: mustBeStringKeys,
    obj: asset,
  })

  errors.push(...mustBeStringKeysErrors)

  // Elements must be arrays
  const mustBeArrayKeys = []

  const mustBeArrayKeysErrrors = detectNotArray({
    keys: mustBeArrayKeys,
    obj: asset,
    location,
  })

  errors.push(...mustBeArrayKeysErrrors)

  // Elements must be objects
  const mustBeObjectKeys = ['providers']

  const mustBeObjectKeysErrors = detectNotObject({
    keys: mustBeObjectKeys,
    obj: asset,
    location,
  })

  errors.push(...mustBeObjectKeysErrors)

  // Enforce only allowed keys
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

  // Inspect the providers element
  const { providers } = asset
  if (providers) {
  }

  // Inspect the extent element

  // Inspect the Links element

  errors = errors.filter(i => i)
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
