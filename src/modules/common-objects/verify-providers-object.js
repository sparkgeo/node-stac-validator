const {
  ensureString,
  ensureArray,
  ensureArrayOfStrings,
  ensureContainsMandatoryKeys,
  ensureContainsNoExtraKeys,
  ensureWorkingLink,
} = require('../../helpers')

const verifyProvidersObject = async ({ asset, location } = {}) => {
  const parent = 'providers'
  const providerRequiredKeys = ['name']
  const errors = []

  // Ensure asset is an object

  // Ensure mandatory keys are provided
  const providerRequiredKeysErrors = ensureContainsMandatoryKeys({
    keys: providerRequiredKeys,
    asset,
    parent,
    location,
  })

  errors.push(...providerRequiredKeysErrors)

  // Ensure certain keys are strings
  const providerMustBeStringKeys = ['name', 'description', 'url']

  const providerMustBeStringKeysErrors = ensureString({
    keys: providerMustBeStringKeys,
    asset,
    parent,
    location,
  })

  errors.push(...providerMustBeStringKeysErrors)

  // Filter for allowed keys in provider
  const providerAllowedKeys = ['name', 'description', 'roles', 'url']

  const filterUnpermittedElementsErrors = ensureContainsNoExtraKeys({
    asset,
    location,
    allowedKeys: providerAllowedKeys,
  })

  errors.push(...filterUnpermittedElementsErrors)

  // Verify that an element is an array
  const providerMustBeArrayKeys = ['roles']
  const providerMustBeArrayErrors = ensureArray({
    asset,
    keys: providerMustBeArrayKeys,
    location,
  })

  errors.push(...providerMustBeArrayErrors)

  const providerMustBeArrayOfStringKeys = ['roles']

  const providerMustBeArrayOfStringErrors = ensureArrayOfStrings({
    asset,
    keys: providerMustBeArrayOfStringKeys,
    location,
  })

  errors.push(...providerMustBeArrayOfStringErrors)

  // Verify the url element in providers
  if (asset.url) {
    const workingUrlError = await ensureWorkingLink({
      link: asset.url,
      location,
    })
    errors.push(workingUrlError)
  }
  return errors
}

module.exports = verifyProvidersObject
