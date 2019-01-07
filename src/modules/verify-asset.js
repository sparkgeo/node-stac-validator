const Ajv = require('ajv')
const schemaVersions = require('../standard')
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
  let response = {
    success: true,
    errors: [],
  }

  const schema = schemaVersions[version][type]

  const valid = ajv
    .addSchema(schema, type)
    .addSchema(schemaVersions[version]['geojson'], 'geojson')
    .validate(type, asset)

  if (!valid) response = ajv.errors

  if (useRecursion) {
    // Get the URL into a promise object
    // Evaluate each one
    // Return the errors
  } else {
    return response
  }
}

module.exports = verifyAsset
