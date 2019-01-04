const ensureArrayOfNumbers = ({ keys, asset, location, parent } = {}) =>
  keys.map(i => {
    const arr = asset[i]
    if (arr && Array.isArray(arr)) {
      const types = [...new Set(arr.map(i => typeof i))]
      if (types.length !== 1 || types[0] !== 'number') {
        return {
          type: 'Incorrect element contents',
          message: parent
            ? `The "${i}" element of "${parent}" must be an array containing only numbers. Returned value -> "${
              asset[i]
            }"`
            : `The "${i}" element must be an array containing only numbers. Returned value -> "${
              asset[i]
            }"`,
          url: location,
        }
      }
    }
  })

module.exports = ensureArrayOfNumbers
