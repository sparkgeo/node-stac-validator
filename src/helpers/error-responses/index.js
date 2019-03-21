const errorResponses = {
  missingAsset: ({ typeCheck } = {}) => ({
    keyword: 'Missing asset',
    message: `Requires ${() =>
      typeCheck === 'url' ? 'url' : 'STAC asset'} to verify against`,
  }),
  missingTypeAttribute: {
    keyword: 'Missing type attribute',
    message:
      'Must explain what you are trying to verify. Is it an item/collection/catalog?',
  },
  unknownVersion: version => ({
    keyword: 'Unknown version',
    message: `Version ${version} is not a version this validator is aware of.`,
  }),
  incorrectType: {
    keyword: 'Unknown type selected',
    message:
      'Must use "collection", "catalog", "item", "geojson", or "stac-item" or parameter "type"',
  },
  typeVersionMisMatch: ({ type, version }) => ({
    keyword: 'Mismatch between STAC type and version',
    message: `The type "${type} is not used in STAC version "${version}".`,
  }),
  malformedUrl: url => ({
    keyword: 'Malformed URL',
    message: `The url ${url} is invalid`,
  }),
  unknownFileLocation: location => ({
    keyword: 'file not found',
    message: `The location ${location} is invalid`,
  }),
}

module.exports = errorResponses
