const ensureObject = ({ keys, asset, location, parent } = {}) =>
  keys.map(i => {
    if (asset[i] && (typeof asset[i] !== 'object' || Array.isArray(asset[i]))) {
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
