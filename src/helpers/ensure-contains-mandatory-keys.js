const ensureContainsMandatoryKeys = ({ keys, obj, location, parent } = {}) =>
  keys.map(i => {
    if (Object.keys(obj).indexOf(i) === -1) {
      return {
        type: 'Missing element',
        message: parent
          ? `The "${i}" element in "${parent}" is missing`
          : `The "${i}" element is missing`,
        url: location,
      }
    }
  })

module.exports = ensureContainsMandatoryKeys
