const { get } = require('axios')
const { baseContext, preChecks, errorResponses } = require('../helpers')
const verifyAsset = require('./verify-asset.js')

const validateFromUrl = async ({
  url,
  type,
  version,
  useRecursion,
  context,
} = {}) => {
  version = version || 'v0.6.0'
  context = context || baseContext

  const preflightErrors = await preChecks({
    typeCheck: 'url',
    url,
    version,
    type,
  })

  if (preflightErrors) {
    return preflightErrors
  } else {
    const { data: asset } = await get(url).catch(e => {
      return errorResponses.cannotConnectToEntryAsset(url)
    })

    return verifyAsset({
      asset,
      location: url,
      useRecursion,
      version,
      context,
      type,
    }).catch(e => console.log('Error in validateFromObject -> ', e))
  }
}

module.exports = validateFromUrl
