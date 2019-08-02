const Ajv = require('ajv')
const { get } = require('axios')
const schemaVersions = require('../standard')
const { baseContext, preChecks, errorResponses } = require('../helpers')
const verifyAsset = require('./verify-asset')

/*
 * checkNestedAssets
 * Sets up multiple instances of the `verifyAsset` function.
 *
 *
 * returns { success: <Boolean>, responses: [ <Response Object> ] }
 */

// const verifyNestedAssets = async function({
//   asset,
//   location,
//   version,
//   context,
//   type,
// } = {}) {
//   const baseLocGp = /(https?:\/\/.*\/).*\.json$/
//   const baseLocation = location.match(baseLocGp)[1]

//   let childAssets = []
//   for (let link of asset.links) {
//     let canPursue = true
//     location = link.href.match(/https?:\/\//)
//       ? link.href
//       : `${baseLocation}${link.href}`
//     if (link.rel === 'item') {
//       const ajaxResponse = await get(location).catch(e => {
//         canPursue = false
//         context.success = false
//         context.responses.push({
//           valid: false,
//           errors: [
//             {
//               keyword: 'Bad link',
//               message: `Unable to connect to ${location}`,
//             },
//           ],
//         })
//       })

//       if (canPursue && ajaxResponse && ajaxResponse.data) {
//         childAssets.push(
//           verifyAsset({
//             type: 'item',
//             context,
//             version,
//             location,
//             asset: ajaxResponse.data,
//           })
//         )
//       }
//     } else if (link.rel === 'child') {
//       let childType = link.type || type
//       console.log('Attempting location - ', location)
//       const { data: asset } = await get(location).catch(e => {
//         canPursue = false
//         context.success = false
//         context.responses.push({
//           keyword: 'Bad link',
//           message: `Unable to connect to ${link.href}`,
//         })
//       })

//       if (canPursue && asset) {
//         childAssets.push(
//           verifyAsset({
//             type: childType,
//             location,
//             context,
//             version,
//             asset,
//           })
//         )
//       }
//     }
//   }

//   // response.errors.push(await Promise.all(childAssets))
//   // Check for failures.
//   /*
//   * Goal: Input -> [{success: Boolean, responses: [<Response Object>] }, {success: Boolean, responses: [<Response Object>] }]
//   *       Output -> { success: Boolean, responses: [<Response Object>, <Response Object>] }

//   */
//   Promise.all(childAssets).then(elements => {
//     elements.forEach(i => {
//       if (!i.success) context.success = false
//     })
//     context.responses = [
//       ...context.responses,
//       ...elements.map(i => i.responses),
//     ]
//   })

//   return {
//     success: context.success,
//     responses: context.responses,
//   }
// }

// const baseResponseObject = location => ({
//   valid: true,
//   errors: [],
//   location,
// })

// const verifyAsset = async function({
//   asset,
//   location,
//   version,
//   context,
//   type,
// } = {}) {
//   const response = baseResponseObject(location)

//   // const ajv = new Ajv({ allErrors: true })
//   const ajv = new Ajv({ logger: false })
//   ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))

//   // Pulls the appropriate schema from the "standard" directory
//   const schema = schemaVersions[version][type]

//   const valid = ajv
//     .addSchema(schema, type)
//     .addSchema(schemaVersions[version]['geojson'], 'geojson.json')
//     .validate(type, asset)

//   if (!valid) {
//     response.errors = ajv.errors
//     response.valid = false
//     context.success = false
//   }
//   context.responses.push(response)

//   if (context.checkNested && (type === 'collection' || type === 'catalog')) {
//     return verifyNestedAssets({
//       asset,
//       location,
//       version,
//       context,
//       type,
//     })
//   } else {
//     return {
//       success: context.success,
//       responses: context.responses,
//     }
//   }
// }

/*
  Top level function. Responsible for initial verification and presenting
  response
*/
const validateFromUrl = async ({
  url,
  type,
  version = 'v0.7.0',
  useRecursion = false,
  context,
} = {}) => {
  // Context is a global object that gets passed throughout the application for recursion
  context = context || baseContext(useRecursion)

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

  const assetVerification = await verifyAsset({
    asset,
    location: url,
    version,
    context,
    type,
  }).catch(e => console.log('Error in validate from url -> ', e))

  return assetVerification
}

module.exports = validateFromUrl
