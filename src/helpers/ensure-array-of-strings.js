const ensureArrayOfStrings = ({ keys, obj, location } = {}) =>
  keys.map(i => {
    const arr = obj[i]
    if (arr && Array.isArray(arr)) {
      const types = [...new Set(arr.map(i => typeof i))]
      if (types.length !== 1 || types[0] !== 'string') {
        return {
          type: 'Incorrect element type',
          message: `The "${i}" element must be an array containing only strings`,
          url: location,
        }
      }
    }
  })

module.exports = ensureArrayOfStrings
