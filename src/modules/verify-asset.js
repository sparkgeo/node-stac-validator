require('babel-polyfill')

const Ajv = require('ajv')
// const { flatten } = require('lodash')
const schemaVersions = require('../standard')
const { get } = require('axios')
// const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
var ajv = new Ajv({ allErrors: true })

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
// ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'))

const verifyAsset = async ({
  asset,
  location,
  useRecursion,
  version,
  context,
  type,
} = {}) => {
  var response = {
    success: true,
    errors: [],
  }
  let childAssets = []

  const schema = schemaVersions[version][type]

  const valid = ajv
    .addSchema(schema, type)
    .addSchema(schemaVersions[version]['geojson'], 'geojson')
    .validate(type, asset)

  if (!valid) {
    response.errors = ajv.errors
    response.success = false
  }

  if (useRecursion && (type === 'collection' || type === 'catalog')) {
    for (let link of asset.links) {
      let canPursue = true
      if (link.rel === 'item') {
        const ajaxResponse = await get(link.href).catch(e => {
          canPursue = false
          response.errors.push({
            keyword: 'Bad link',
            message: `Unable to connect to ${link.href}`,
          })
        })

        if (canPursue && ajaxResponse && ajaxResponse.data) {
          childAssets.push(
            verifyAsset({
              type: 'item',
              context,
              version,
              useRecursion,
              asset: ajaxResponse.data,
            })
          )
        }
      } else if (link.rel === 'child') {
        let childType = link.type || type
        const ajaxResponse = await get(link.href).catch(e => {
          canPursue = false
          response.errors.push({
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
              useRecursion,
              asset: ajaxResponse.data,
            })
          )
        }
      }
    }

    response.errors.push(await Promise.all(childAssets))
  } else {
    return response
  }
}

module.exports = verifyAsset
