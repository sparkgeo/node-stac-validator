const ensureArrayOfObjects = ({ keys, asset, location, parent } = {}) =>
  keys.map(i => {
    const arr = asset[i]
    if (arr && Array.isArray(arr)) {
      if (!arr.every(i => typeof i === 'object' && !Array.isArray(i))) {
        return {
          type: 'Incorrect element contents',
          message: parent
            ? `The "${i}" element of "${parent}" must be an array containing only objects. Returned value -> "${
              asset[i]
            }"`
            : `The "${i}" element must be an array containing only objects. Returned value -> "${
              asset[i]
            }"`,
          url: location,
        }
      }
    }
  })

module.exports = ensureArrayOfObjects
