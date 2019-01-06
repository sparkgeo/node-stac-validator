const { flatten } = require('lodash')

const {
  ensureString,
  ensureArray,
  ensureObject,
  ensureArrayOfObjects,
  ensureContainsMandatoryKeys,
  ensureContainsAllowedKeys,
} = require('../helpers')

const {
  verifyProvidersObject,
  verifyExtentObject,
  verifyLinksArray,
} = require('./common-objects')

const verifyCollection = async ({
  asset,
  location,
  useRecursion,
  useVersion,
} = {}) => {
  let requiredKeyErrors = []
  let mustBeStringKeysErrors = []
  let mustBeArrayKeysErrrors = []
  let mustBeObjectKeysErrors = []
  let mustBeArrayOfObjectKeysErrors = []
  let filterUnpermittedElementsErrors = []
  let providersErrors = []
  let extentErrors = []
  let linkErrors = []

  // Ensure required keys are present
  const requiredKeys = [
    'stac_version',
    'id',
    'description',
    'license',
    'extent',
    'links',
  ]

  requiredKeyErrors = ensureContainsMandatoryKeys({
    asset,
    keys: requiredKeys,
    location,
  })

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

  mustBeStringKeysErrors = ensureString({
    location,
    keys: mustBeStringKeys,
    asset: asset,
  })

  // Elements must be arrays
  const mustBeArrayKeys = ['providers', 'links']

  mustBeArrayKeysErrrors = ensureArray({
    keys: mustBeArrayKeys,
    asset: asset,
    location,
  })

  // Elements must be objects
  const mustBeObjectKeys = ['extent']

  mustBeObjectKeysErrors = ensureObject({
    keys: mustBeObjectKeys,
    asset: asset,
    location,
  })

  const mustBeArrayOfObjectKeys = ['links']
  mustBeObjectKeysErrors = ensureArrayOfObjects({
    keys: mustBeArrayOfObjectKeys,
    asset: asset,
    location,
  })

  // Enforce only allowed keys
  filterUnpermittedElementsErrors = ensureContainsAllowedKeys({
    asset,
    location,
    allowedKeys,
  })

  const { providers } = asset
  if (providers && Array.isArray(providers)) {
    const providerErrorsPromise = Promise.all(
      providers.map(element =>
        verifyProvidersObject({
          asset: element,
          location,
        })
      )
    ).then(results => flatten(results))

    providersErrors = await providerErrorsPromise
  }

  // Inspect the extent element
  const { extent } = asset
  if (extent) {
    extentErrors = verifyExtentObject({
      asset: extent,
      location,
    })
  }

  // Inspect the Links element
  const { links } = asset
  if (links && Array.isArray(links)) {
    linkErrors = await verifyLinksArray({
      asset: links,
      location,
    })
  }

  // Clean outputs of undefined or nulls
  const errors = [
    ...requiredKeyErrors,
    ...mustBeStringKeysErrors,
    ...mustBeArrayKeysErrrors,
    ...mustBeObjectKeysErrors,
    ...mustBeArrayOfObjectKeysErrors,
    ...filterUnpermittedElementsErrors,
    ...providersErrors,
    ...extentErrors,
    ...linkErrors,
  ].filter(i => i)

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
