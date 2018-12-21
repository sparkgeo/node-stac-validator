const ensureString = ({ keys, obj, location, parent } = {}) =>
  keys.map(i => {
    if (obj[i] && typeof obj[i] !== 'string') {
      return {
        type: 'Incorrect element type',
        message: parent
          ? `The "${i}" element of "${parent}" must be a string`
          : `The "${i}" element must be a string`,
        url: location,
      }
    }
  })

module.exports = ensureString
