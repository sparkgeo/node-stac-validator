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

  return (
    preflightErrors ||
    verifyAsset({
      asset: await get(url).catch(e => {
        return errorResponses.cannotConnectToEntryAsset(url)
      }),
      location: url,
      useRecursion,
      version,
      context,
      type,
    }).catch(e => console.log('Error in validateFromObject -> ', e))
  )
}

module.exports = validateFromUrl
