const {
  ensureArray,
  ensureContainsMandatoryKeys,
  ensureArrayLength,
  ensureArrayOfNumbers,
  ensureValidTime,
} = require('../../helpers')

const verifyExtentObject = ({ asset, location } = {}) => {
  let spatialLengthError, temporalLengthError
  let spatialValuesErrors = []
  let temporalContentErrors = []
  const parent = 'extent'

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

  if (spatial) {
    // Check that spatial array contains four or six elements
    spatialLengthError = ensureArrayLength({
      asset: spatial,
      numElementsArr: [4, 6],
      location,
    })

    // Ensure each element is a number
    const mustBeArrayNumbersKeys = ['spatial']
    spatialValuesErrors = ensureArrayOfNumbers({
      asset,
      location,
      parent,
      keys: mustBeArrayNumbersKeys,
    })
  }

  if (temporal && Array.isArray(temporal)) {
    // Check that temporal array contains two elements
    temporalLengthError = ensureArrayLength({
      asset: temporal,
      numElements: 2,
      location,
    })

    // Check that  elements are timestrings, or null
    if (!temporalLengthError) {
      temporalContentErrors = [
        ensureValidTime({
          asset: temporal[0],
          location,
          parent,
        }),
        ensureValidTime({
          asset: temporal[1],
          location,
          parent,
        }),
      ]
    }
  }

  const errors = [
    ...requiredKeyErrors,
    ...requiredArrayErrors,
    ...spatialValuesErrors,
    ...temporalContentErrors,
    spatialLengthError,
    temporalLengthError,
  ]

  return errors
}

module.exports = verifyExtentObject
