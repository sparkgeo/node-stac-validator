const ensureString = ({ keys, obj, location } = {}) =>
  keys.map(i => {
    if (obj[i] && typeof obj[i] !== 'string') {
      return {
        type: 'Incorrect element type',
        message: `The "${i}" element must be a string`,
        url: location,
      }
    }
  })

module.exports = ensureString
