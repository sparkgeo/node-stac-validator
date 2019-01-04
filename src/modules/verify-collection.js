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
  // verifyExtentObject,
} = require('./common-objects')

const verifyNumberElemenets = ({
  asset,
  parent,
  location,
  numElements,
  numElementsArr,
} = {}) => {
  if (numElementsArr) {
    for (const i in numElementsArr) {
      if (asset.length === numElementsArr[i]) {
        return
      }
    }
    return {
      type: 'Incorrect array length',
      message: `The element ${parent} must be any of the following lengths: ${numElementsArr}`,
      url: location,
    }
  } else if (numElements) {
    if (asset.length !== numElements) {
      return {
        type: 'Incorrect array length',
        message: `The element ${parent} must be the following length: ${numElements}`,
        url: location,
      }
    }
  } else {
    console.log('ERROR: Must contain either numElements or numElementsArr')
  }
}

const verifyExtentObject = ({ asset, location } = {}) => {
  let spatialLengthError, temporalLengthError
  // Check that it contains required keys
  const requiredKeys = ['spatial', 'temporal']

  const requiredKeyErrors = ensureContainsMandatoryKeys({
    asset,
    keys: requiredKeys,
    location,
  })

  // Check that spatial and temporal elements are arrays
  const arrayKeys = ['spatial', 'temporal']

  const requiredArrayErrors = ensureArray({
    keys: arrayKeys,
    asset,
    location,
  })

  const { spatial, temporal } = asset

  // Check that spatial array contains four or six elements
  if (spatial) {
    spatialLengthError = verifyNumberElemenets({
      asset: spatial,
      numElementsArr: [4, 6],
      location,
    })
  }

  // Check that temporal array contains two elements
  if (temporal) {
    temporalLengthError = verifyNumberElemenets({
      asset: temporal,
      numElements: 2,
      location,
    })
  }

  // Check that first element is timestring, or null
  // check that second element is timestring, or null
  return [
    ...requiredKeyErrors,
    ...requiredArrayErrors,
    spatialLengthError,
    temporalLengthError,
  ]
}

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
  const mustBeArrayKeys = ['providers']

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
