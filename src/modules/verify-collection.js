const {
  ensureString,
  ensureArray,
  ensureArrayOfStrings,
  ensureObject,
  ensureContainsMandatoryKeys,
  ensureContainsNoExtraKeys,
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
  const filterUnpermittedElementsErrors = ensureContainsNoExtraKeys({
    asset,
    location,
    allowedKeys,
  })

  errors.push(...filterUnpermittedElementsErrors)

  // ! Inspect the providers element
  const { providers } = asset
  if (providers) {
    parent = 'providers'
    const providerRequiredKeys = ['name']

    // Ensure mandatory keys are provided
    const providerRequiredKeysErrors = ensureContainsMandatoryKeys({
      keys: providerRequiredKeys,
      obj: providers,
      parent,
      location,
    })

    errors.push(...providerRequiredKeysErrors)

    // Ensure certain keys are strings
    const providerMustBeStringKeys = ['name', 'description', 'url']

    const providerMustBeStringKeysErrors = ensureString({
      keys: providerMustBeStringKeys,
      obj: providers,
      parent,
      location,
    })

    errors.push(...providerMustBeStringKeysErrors)

    // Filter for allowed keys in provider
    const providerAllowedKeys = ['name', 'description', 'roles', 'url']

    const filterUnpermittedElementsErrors = ensureContainsNoExtraKeys({
      asset: providers,
      location,
      allowedKeys: providerAllowedKeys,
    })

    errors.push(...filterUnpermittedElementsErrors)

    // Verify that an element is an array
    const providerMustBeArrayKeys = ['roles']
    const providerMustBeArrayErrors = ensureArray({
      obj: providers,
      keys: providerMustBeArrayKeys,
      location,
    })

    errors.push(...providerMustBeArrayErrors)

    const providerMustBeArrayOfStringKeys = ['roles']

    const providerMustBeArrayOfStringErrors = ensureArrayOfStrings({
      obj: providers,
      keys: providerMustBeArrayOfStringKeys,
      location,
    })

    errors.push(...providerMustBeArrayOfStringErrors)
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
