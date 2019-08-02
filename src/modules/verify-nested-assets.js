const { get } = require('axios')
const verifyAsset = require('./verify-asset')
/*
 * checkNestedAssets
 * Sets up multiple instances of the `verifyAsset` function.
 *
 *
 * returns { success: <Boolean>, responses: [ <Response Object> ] }
 */

const verifyNestedAssets = async function({
  asset,
  location,
  version,
  context,
  type,
} = {}) {
  const baseLocGp = /(https?:\/\/.*\/).*\.json$/
  const baseLocation = location.match(baseLocGp)[1]

  let childAssets = []
  for (let link of asset.links) {
    let canPursue = true
    location = link.href.match(/https?:\/\//)
      ? link.href
      : `${baseLocation}${link.href}`
    if (link.rel === 'item') {
      const ajaxResponse = await get(location).catch(e => {
        canPursue = false
        context.success = false
        context.responses.push({
          valid: false,
          errors: [
            {
              keyword: 'Bad link',
              message: `Unable to connect to ${location}`,
            },
          ],
        })
      })

      if (canPursue && ajaxResponse && ajaxResponse.data) {
        childAssets.push(
          verifyAsset({
            type: 'item',
            context,
            version,
            location,
            asset: ajaxResponse.data,
          })
        )
      }
    } else if (link.rel === 'child') {
      let childType = link.type || type
      console.log('Attempting location - ', location)
      const { data: asset } = await get(location).catch(e => {
        canPursue = false
        context.success = false
        context.responses.push({
          keyword: 'Bad link',
          message: `Unable to connect to ${link.href}`,
        })
      })

      if (canPursue && asset) {
        childAssets.push(
          verifyAsset({
            type: childType,
            location,
            context,
            version,
            asset,
          })
        )
      }
    }
  }

  // response.errors.push(await Promise.all(childAssets))
  // Check for failures.
  /*
  * Goal: Input -> [{success: Boolean, responses: [<Response Object>] }, {success: Boolean, responses: [<Response Object>] }]
  *       Output -> { success: Boolean, responses: [<Response Object>, <Response Object>] }

  */
  Promise.all(childAssets).then(elements => {
    elements.forEach(i => {
      if (!i.success) context.success = false
    })
    context.responses = [
      ...context.responses,
      ...elements.map(i => i.responses),
    ]
  })

  return {
    success: context.success,
    responses: context.responses,
  }
}

module.exports = verifyNestedAssets
