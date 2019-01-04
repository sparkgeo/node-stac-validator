const {
  ensureString,
  ensureArray,
  ensureObject,
  ensureArrayOfStrings,
  ensureContainsMandatoryKeys,
  ensureContainsNoExtraKeys,
  ensureWorkingLink,
} = require('../../helpers')

const verifyProvidersObject = async ({ asset, location } = {}) => {
  const parent = 'providers'
  const providerRequiredKeys = ['name']
  let workingUrlError

  // Ensure asset is an object.
  const topLevelCheck = ensureObject({
    asset,
    parent,
    location,
    checkAssetDirectly: true,
  })
  if (topLevelCheck) return [topLevelCheck]

  // Ensure mandatory keys are provided
  const providerRequiredKeysErrors = ensureContainsMandatoryKeys({
    keys: providerRequiredKeys,
    asset,
    parent,
    location,
  })

  // Ensure certain keys are strings
  const providerMustBeStringKeys = ['name', 'description', 'url']

  const providerMustBeStringKeysErrors = ensureString({
    keys: providerMustBeStringKeys,
    asset,
    parent,
    location,
  })

  // Filter for allowed keys in provider
  const providerAllowedKeys = ['name', 'description', 'roles', 'url']

  const filterUnpermittedElementsErrors = ensureContainsNoExtraKeys({
    asset,
    location,
    allowedKeys: providerAllowedKeys,
  })

  // Verify that an element is an array
  const providerMustBeArrayKeys = ['roles']
  const providerMustBeArrayErrors = ensureArray({
    asset,
    keys: providerMustBeArrayKeys,
    location,
  })

  // Verify there is an array of strings
  const providerMustBeArrayOfStringKeys = ['roles']

  const providerMustBeArrayOfStringErrors = ensureArrayOfStrings({
    asset,
    keys: providerMustBeArrayOfStringKeys,
    location,
  })

  // Verify the url element in providers
  if (asset.url) {
    workingUrlError = await ensureWorkingLink({
      link: asset.url,
      location,
    })
  }

  return [
    workingUrlError,
    ...providerMustBeArrayOfStringErrors,
    ...providerMustBeArrayErrors,
    ...filterUnpermittedElementsErrors,
    ...providerMustBeStringKeysErrors,
    ...providerRequiredKeysErrors,
  ]
}

module.exports = verifyProvidersObject
