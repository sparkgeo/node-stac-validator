const ensureContainsMandatoryKeys = ({ keys, asset, location, parent } = {}) =>
  keys.map(i => {
    if (Object.keys(asset).indexOf(i) === -1) {
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
