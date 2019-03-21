const { baseContext, preChecks } = require('../helpers')
const verifyAsset = require('./verify-asset.js')

const validateFromObject = async ({
  asset,
  type,
  version = 'v0.6.0',
  useRecursion,
  context,
} = {}) => {
  context =
    { ...context, ...baseContext(useRecursion) } || baseContext(useRecursion)
  const location = 'Local data'

  const preflightErrors = await preChecks({
    typeCheck: 'asset',
    asset,
    version,
    type,
  })

  return (
    preflightErrors ||
    verifyAsset({
      asset,
      location,
      useRecursion,
      version,
      context,
      type,
    }).catch(e => console.log('Error in validateFromObject -> ', e))
  )
}

module.exports = validateFromObject
