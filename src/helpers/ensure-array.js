const ensureArray = ({ keys, obj, location, parent } = {}) =>
  keys.map(i => {
    if (obj[i] && !Array.isArray(obj[i])) {
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
