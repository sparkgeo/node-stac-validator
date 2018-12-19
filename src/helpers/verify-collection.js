const verifyCollection = async ({
  asset,
  location,
  useRecursion,
  useVersion,
} = {}) => {
  const errors = []

  const mainKeys = Object.keys(asset)

  if (mainKeys.indexOf('stac_version') === -1) {
    errors.push({
      type: 'Missing element',
      message: 'The "stac_version" element is missing',
      url: location,
    })
  }

  if (mainKeys.indexOf('id') === -1) {
    errors.push({
      type: 'Missing element',
      message: 'The "id" element is missing',
      url: location,
    })
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
