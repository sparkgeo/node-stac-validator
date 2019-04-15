const { get } = require('axios')
const { baseContext, preChecks, errorResponses } = require('../helpers')
const verifyAsset = require('./verify-asset.js')

const validateFromUrl = async ({
  url,
  type,
  version = 'v0.6.0',
  useRecursion = false,
  context,
} = {}) => {
  context =
    { ...context, ...baseContext(useRecursion) } || baseContext(useRecursion)

  const preflightErrors = await preChecks({
    typeCheck: 'url',
    url,
    version,
    type,
  })

  if (preflightErrors) {
    return {
      valid: false,
      responses: [preflightErrors],
    }
  }

  const response = await get(url).catch(e => {
    return errorResponses.cannotConnectToEntryAsset(url)
  })
  const { data: asset } = response

  return verifyAsset({
    asset,
    location: url,
    version,
    context,
    type,
  }).catch(e => console.log('Error in validateFromObject -> ', e))
}

module.exports = validateFromUrl
