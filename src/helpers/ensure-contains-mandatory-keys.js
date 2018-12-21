const ensureContainsMandatoryKeys = ({ keys, obj, location } = {}) =>
  keys.map(i => {
    if (Object.keys(obj).indexOf(i) === -1) {
      return {
        type: 'Missing element',
        message: `The "${i}" element is missing`,
        url: location,
      }
    }
  })

module.exports = ensureContainsMandatoryKeys
