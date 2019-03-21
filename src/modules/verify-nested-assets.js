require('babel-polyfill')

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
  let childAssets = []
  for (let link of asset.links) {
    let canPursue = true
    if (link.rel === 'item') {
      const ajaxResponse = await get(link.href).catch(e => {
        canPursue = false
        context.success = false
        context.responses.push({
          valid: false,
          errors: [
            {
              keyword: 'Bad link',
              message: `Unable to connect to ${link.href}`,
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
            asset: ajaxResponse.data,
          })
        )
      }
    } else if (link.rel === 'child') {
      let childType = link.type || type
      const ajaxResponse = await get(link.href).catch(e => {
        canPursue = false
        context.success = false
        context.responses.push({
          keyword: 'Bad link',
          message: `Unable to connect to ${link.href}`,
        })
      })

      if (canPursue && ajaxResponse && ajaxResponse.data) {
        childAssets.push(
          verifyAsset({
            type: childType,
            context,
            version,
            asset: ajaxResponse.data,
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
