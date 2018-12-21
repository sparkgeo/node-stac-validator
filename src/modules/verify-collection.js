const { difference } = require('lodash')

const {
  ensureString,
  ensureArray,
  ensureObject,
  ensureContainsMandatoryKeys,
} = require('../helpers')

const verifyCollection = async ({
  asset,
  location,
  useRecursion,
  useVersion,
} = {}) => {
  let errors = []
  let parent

  // Ensure required keys are present
  const requiredKeys = [
    'stac_version',
    'id',
    'description',
    'license',
    'extent',
    'links',
  ]

  const requiredKeyErrors = ensureContainsMandatoryKeys({
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

  const mustBeStringKeysErrors = ensureString({
    location,
    keys: mustBeStringKeys,
    obj: asset,
  })

  errors.push(...mustBeStringKeysErrors)

  // Elements must be arrays
  const mustBeArrayKeys = []

  const mustBeArrayKeysErrrors = ensureArray({
    keys: mustBeArrayKeys,
    obj: asset,
    location,
  })

  errors.push(...mustBeArrayKeysErrrors)

  // Elements must be objects
  const mustBeObjectKeys = ['providers']

  const mustBeObjectKeysErrors = ensureObject({
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
    parent = 'providers'
    const providerRequiredKeys = ['name']

    const providerRequiredKeysErrors = ensureContainsMandatoryKeys({
      keys: providerRequiredKeys,
      obj: providers,
      parent,
      location,
    })

    errors.push(...providerRequiredKeysErrors)

    const providerMustBeStringKeys = ['name', 'description', 'url']

    const providerMustBeStringKeysErrors = ensureString({
      keys: providerMustBeStringKeys,
      obj: providers,
      parent,
      location,
    })

    errors.push(...providerMustBeStringKeysErrors)

    // const providerMustBeArrayKeys = ['roles']
    // const providerMustBeArrayOfStringKeys = ['roles']
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
