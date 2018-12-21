const ensureObject = ({ keys, obj, location, parent } = {}) =>
  keys.map(i => {
    if (obj[i] && (typeof obj[i] !== 'object' || Array.isArray(obj[i]))) {
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
