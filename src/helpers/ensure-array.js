const ensureArray = ({ keys, obj, location } = {}) =>
  keys.map(i => {
    if (obj[i] && !Array.isArray(obj[i])) {
      return {
        type: 'Incorrect element type',
        message: `The "${i}" element must be an array`,
        url: location,
      }
    }
  })

module.exports = ensureArray
