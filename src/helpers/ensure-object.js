const ensureObject = ({ keys, obj, location } = {}) =>
  keys.map(i => {
    if (obj[i] && (typeof obj[i] !== 'object' || Array.isArray(obj[i]))) {
      return {
        type: 'Incorrect element type',
        message: `The "${i}" element must be an object`,
        url: location,
      }
    }
  })

module.exports = ensureObject
