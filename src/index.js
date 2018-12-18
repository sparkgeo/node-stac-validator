const { errorResponses } = require('./helpers')

const validateFromJson = ({ collection, item, catalog, dig } = {}) => {
  // eslint-disable-next-line
  const useRecursion = dig || false

  // Ensure basic parameters are valid before linting

  if (!(collection || item || catalog)) {
    return errorResponses.missingTypeParameter
  }
  if ((collection && (item || catalog)) || (item && catalog)) {
    return errorResponses.extraTypeAttribute
  }
}

const validateFromUrl = async ({ url, type, dig } = {}) => {
  // eslint-disable-next-line
  const useRecursion = dig || false

  // Ensure basic parameters are valid before linting
  if (!url) return errorResponses.missingUrl
  if (!type) return errorResponses.missingTypeAttribute
  if (type !== 'catalog' && type !== 'item' && type !== 'collection') {
    return errorResponses.unclearTypeAttribute
  }
}

module.exports = {
  validateFromJson,
  validateFromUrl,
}
