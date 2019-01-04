const ensureArray = ({ keys, asset, location, parent } = {}) =>
  keys.map(i => {
    if (asset[i] && !Array.isArray(asset[i])) {
      return {
        type: 'Incorrect element type',
        message: parent
          ? `The "${i}" element of "${parent}" must be an array`
          : `The "${i}" element must be an array`,
        url: location,
      }
    }
  })

module.exports = ensureArray
