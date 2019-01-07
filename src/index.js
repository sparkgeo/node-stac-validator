const { get } = require('axios')
const { verifyAsset } = require('./modules')
const { errorResponses } = require('./helpers')
const versions = require('./standard')

const baseContext = {
  errorList: [],
  indicateError: error => console.log(error),
  indicateComplete: () => console.log('process finished'),
}

const validateFromJson = ({ asset, type, version, dig, context } = {}) => {
  version = version || 'v0.6.0'
  context = context || baseContext
  // eslint-disable-next-line
  const useRecursion = dig || false
  const location = 'json'

  // Ensure basic parameters are valid before linting
  if (!asset) return errorResponses.missingAsset
  if (!type) return errorResponses.missingTypeAttribute
  if (!versions[version]) return errorResponses.unknownVersion(version)

  return verifyAsset({
    asset,
    location,
    useRecursion,
    version,
    context,
    type,
  }).then(response => response)
}

const validateFromUrl = ({ url, type, version, dig, context } = {}) => {
  version = version || 'v0.6.0'
  context = context || baseContext
  // eslint-disable-next-line
  const useRecursion = dig || false
  const location = url

  // Ensure basic parameters are valid before linting
  if (!url) return [errorResponses.missingUrl]
  if (!type) return [errorResponses.missingTypeAttribute]
  if (!versions[version]) return [errorResponses.unknownVersion(version)]
  if (
    !(
      type === 'item' ||
      type === 'stac-item' ||
      type === 'catalog' ||
      type === 'collection' ||
      type === 'geojson'
    )
  ) {
    return [errorResponses.incorrectType]
  }

  get(url)
    .then(response => {
      const asset = response.data

      verifyAsset({
        asset,
        location,
        useRecursion,
        version,
        context,
        type,
      }).then(response => response)
    })
    .catch(e => {
      return [errorResponses.cannotConnectToEntryAsset(url)]
    })
}

module.exports = {
  validateFromJson,
  validateFromUrl,
}
