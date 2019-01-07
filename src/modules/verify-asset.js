const Ajv = require('ajv')
const schemaVersions = require('../standard')
// const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
var ajv = new Ajv({ allErrors: true })

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
// ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'))

const verifyAsset = ({
  asset,
  location,
  useRecursion,
  version,
  context,
  type,
} = {}) => {
  // console.log('File has been triggered...')
  // console.log('asset -> ', asset)
  // console.log('location -> ', location)
  // console.log('useRecursion -> ', useRecursion)
  // console.log('version -> ', version)
  // console.log('context', context)
  // console.log('type -> ', type)

  let response = [{ message: 'This is fine' }]

  const schema = schemaVersions[version][type]
  console.log('Selected schema: ', schema)

  const validate = ajv.compile(schema)
  const valid = validate(asset)

  if (!valid) response = validate.errors

  if (useRecursion) {
    // Get the URL into a promise object
    // Evaluate each one
    // Return the errors
  } else {
    return response
  }
}

module.exports = verifyAsset
