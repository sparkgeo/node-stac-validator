const { get } = require('axios')
const { verifyAsset } = require('./modules')
const { errorResponses } = require('./helpers')
const versions = require('./standard')

const baseContext = {
  errorList: [],
  indicateError: error => console.log(error),
  indicateComplete: () => console.log('process finished'),
}

const validateFromJson = async ({
  asset,
  type,
  version,
  dig,
  context,
} = {}) => {
  version = version || 'v0.6.0'
  context = context || baseContext
  // eslint-disable-next-line
  const useRecursion = dig || false
  const location = 'json'
  let response = []

  // Ensure basic parameters are valid before linting
  if (!asset) return errorResponses.missingAsset
  if (!type) return errorResponses.missingTypeAttribute
  if (!versions[version]) return errorResponses.unknownVersion(version)
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

  if (versions[version][type] === false) {
    return errorResponses.typeVersionMisMatch({ version, type })
  }

  response = await verifyAsset({
    asset,
    location,
    useRecursion,
    version,
    context,
    type,
  }).catch(e => console.log('Error in validateFromJson -> ', e))

  return response
}

const validateFromUrl = async ({ url, type, version, dig, context } = {}) => {
  version = version || 'v0.6.0'
  context = context || baseContext
  // eslint-disable-next-line
  const useRecursion = dig || false
  const location = url
  let response = []

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
  if (versions[version][type] === false) {
    return errorResponses.typeVersionMisMatch({ version, type })
  }

  const { data: asset } = await get(url).catch(e => {
    return [errorResponses.cannotConnectToEntryAsset(url)]
  })

  response = await verifyAsset({
    asset,
    location,
    useRecursion,
    version,
    context,
    type,
  }).catch(e => console.log('Error in validateFromJson -> ', e))

  return response
}

module.exports = {
  validateFromJson,
  validateFromUrl,
}
