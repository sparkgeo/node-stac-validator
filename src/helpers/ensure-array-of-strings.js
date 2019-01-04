const ensureArrayOfStrings = ({ keys, asset, location, parent } = {}) =>
  keys.map(i => {
    const arr = asset[i]
    if (arr && Array.isArray(arr)) {
      const types = [...new Set(arr.map(i => typeof i))]
      if (types.length !== 1 || types[0] !== 'string') {
        return {
          type: 'Incorrect element contents',
          message: parent
            ? `The "${i}" element of "${parent}" must be an array containing only strings`
            : `The "${i}" element must be an array containing only strings`,
          url: location,
        }
      }
    }
  })

module.exports = ensureArrayOfStrings
