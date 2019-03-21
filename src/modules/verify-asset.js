require('babel-polyfill')

const Ajv = require('ajv')
const schemaVersions = require('../standard')
const { get } = require('axios')

const verifyAsset = async ({
  asset,
  location,
  version,
  context,
  type,
} = {}) => {
  var response = {
    success: true,
    errors: [],
    location,
  }

  // const ajv = new Ajv({ allErrors: true })
  const ajv = new Ajv({ logger: false })
  ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
  let childAssets = []
  const schema = schemaVersions[version][type]

  const valid = ajv
    .addSchema(schema, type)
    .addSchema(schemaVersions[version]['geojson'], 'geojson.json')
    .validate(type, asset)

  if (!valid) {
    response.errors = ajv.errors
    response.success = false
    context.success = false
  }
  context.responses.push(response)

  if (context.checkNested && (type === 'collection' || type === 'catalog')) {
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
              asset: ajaxResponse.data,
            })
          )
        }
      }
    }

    response.errors.push(await Promise.all(childAssets))
  } else {
    return {
      success: context.success,
      responses: context.responses,
    }
  }
}

module.exports = verifyAsset
