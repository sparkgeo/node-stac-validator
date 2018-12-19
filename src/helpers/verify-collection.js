const verifyCollection = async ({
  asset,
  location,
  useRecursion,
  useVersion,
} = {}) => {
  const errors = []

  if (Object.keys(asset).indexOf('stac_version') === -1) {
    errors.push({
      type: 'Missing "stac_version" element',
      category: 'missing manditory element',
      message: 'the "stac_version" element is required',
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
