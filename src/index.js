const { head, get } = require('axios')
const { errorResponses, verifyAsset } = require('./modules')
const { errorResponses } = require('./helpers')

const validateFromJson = ({ asset, type, version, dig } = {}) => {
  // eslint-disable-next-line
  const useRecursion = dig || false
  const useVersion = version || 'v0_6_0'
  const location = 'json'

  // Ensure basic parameters are valid before linting
  if (!asset) return errorResponses.missingAsset
  if (!type) return errorResponses.missingTypeAttribute

  return verifyAsset(type)({ asset, location, useRecursion, useVersion })
}

const validateFromUrl = async ({ url, type, version, dig } = {}) => {
  // eslint-disable-next-line
  const useRecursion = dig || false
  const useVersion = version || 'v0.6.0'

  const location = url

  // Ensure basic parameters are valid before linting
  if (!url) return errorResponses.missingUrl
  if (!type) return errorResponses.missingTypeAttribute
  await head(url).catch(e => {
    return errorResponses.cannotConnectToEntryAsset(url)
  })
  const { data: asset } = await get(url).catch(e => {
    return {
      success: false,
      message: 'unknown error',
      content: e,
    }
  })

  return verifyAsset(type)({
    asset,
    location,
    useRecursion,
    useVersion,
  })
}

module.exports = {
  validateFromJson,
  validateFromUrl,
}
