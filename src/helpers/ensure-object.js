const ensureObject = ({
  keys,
  asset,
  location,
  parent,
  checkAssetDirectly,
} = {}) =>
  checkAssetDirectly
    ? typeof asset !== 'object' || Array.isArray(asset)
      ? {
        type: 'Incorrect element type',
        message: parent
          ? `The "${parent}" element must be an object `
          : `There is an element must be an object that isn't`,
        url: location,
      }
      : undefined
    : keys.map(i => {
      if (
        asset[i] &&
          (typeof asset[i] !== 'object' || Array.isArray(asset[i]))
      ) {
        return {
          type: 'Incorrect element type',
          message: parent
            ? `The "${i}" element of "${parent}" must be an object `
            : `The "${i}" element must be an object`,
          url: location,
        }
      }
    })

module.exports = ensureObject
