require('babel-polyfill')

const Ajv = require('ajv')
const schemaVersions = require('../standard')
const verifyNestedAssets = require('./verify-nested-assets')

/*
 * verifyAsset
 * Verifies STAC asset against a standard using AJV.
 *
 * returns { success: <Boolean>, responses: [ <Response Object> ] }
 */

const verifyAsset = async function({
  asset,
  location,
  version,
  context,
  type,
} = {}) {
  var response = {
    valid: true,
    errors: [],
    location,
  }

  // const ajv = new Ajv({ allErrors: true })
  const ajv = new Ajv({ logger: false })
  ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
  const schema = schemaVersions[version][type]

  const valid = ajv
    .addSchema(schema, type)
    .addSchema(schemaVersions[version]['geojson'], 'geojson.json')
    .validate(type, asset)

  if (!valid) {
    response.errors = ajv.errors
    response.valid = false
    context.success = false
  }
  context.responses.push(response)

  if (context.checkNested && (type === 'collection' || type === 'catalog')) {
    return verifyNestedAssets({
      asset,
      location,
      version,
      context,
      type,
    })
  } else {
    return {
      success: context.success,
      responses: context.responses,
    }
  }
}

module.exports = verifyAsset
