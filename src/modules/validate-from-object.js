const { baseContext, preChecks } = require('../helpers')
const verifyAsset = require('./verify-asset.js')

const validateFromObject = async ({
  asset,
  type,
  version,
  useRecursion,
  context,
} = {}) => {
  version = version || 'v0.6.0'
  context = context || baseContext
  // eslint-disable-next-line
  const location = 'json'

  const preflightErrors = await preChecks({
    typeCheck: 'asset',
    asset,
    version,
    type,
  })

  if (preflightErrors) {
    return preflightErrors
  } else {
    return verifyAsset({
      asset,
      location,
      useRecursion,
      version,
      context,
      type,
    }).catch(e => console.log('Error in validateFromObject -> ', e))
  }
}

module.exports = validateFromObject
