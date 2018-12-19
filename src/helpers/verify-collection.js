const verifyCollection = async ({
  asset,
  location,
  useRecursion,
  useVersion,
} = {}) => {
  const errors = []

  const requiredKeys = [
    'stac_version',
    'id',
    'description',
    'license',
    'extent',
    'links',
  ]
  const mainKeys = Object.keys(asset)

  const requiredKeyErrors = requiredKeys
    .map(i => {
      if (mainKeys.indexOf(i) === -1) {
        return {
          type: 'Missing element',
          message: `The "${i}" element is missing`,
          url: location,
        }
      }
    })
    .filter(v => v)

  errors.push(...requiredKeyErrors)

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
