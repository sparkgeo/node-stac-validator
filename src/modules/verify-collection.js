const { flatten } = require('lodash')

const {
  ensureString,
  ensureArray,
  ensureObject,
  ensureContainsMandatoryKeys,
  ensureContainsNoExtraKeys,
} = require('../helpers')

const {
  verifyProvidersObject,
  verifyExtentObject,
  // verifyLinksArray,
} = require('./common-objects')

// const verifyLinksArray = ({ asset, location, parent } = {}) => {
//   // Must contain href and rel elements

//   // Contains no other elements than 'href', 'rel', 'type', or 'title'

//   // The href element must be a valid url

//   const { rel } = asset
//   if (rel) {
//     // must contain a self element
//     // must not have any element but "self", "root", "parent", "child", "item", "license", "derived_from"
//   }
// }

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
  let filterUnpermittedElementsErrors = []
  let providersErrors = []
  let extentErrors = []

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
    asset: asset,
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

  // Enforce only allowed keys
  filterUnpermittedElementsErrors = ensureContainsNoExtraKeys({
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
  if (links) {
  }

  // Clean outputs of undefined or nulls
  const errors = [
    ...requiredKeyErrors,
    ...mustBeStringKeysErrors,
    ...mustBeArrayKeysErrrors,
    ...mustBeObjectKeysErrors,
    ...filterUnpermittedElementsErrors,
    ...providersErrors,
    ...extentErrors,
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
