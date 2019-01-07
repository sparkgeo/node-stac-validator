const errorResponses = {
  missingAsset: {
    title: 'Missing asset',
    description: 'Requires asset to verify against',
  },
  missingTypeAttribute: {
    title: 'Missing type attribute',
    description:
      'Must explain what you are trying to verify. Is it an item/collection/catalog?',
  },
  unknownVersion: version => ({
    title: 'Unknown version',
    description: `Version ${version} is not an accepted version.`,
  }),
  incorrectType: {
    title: 'Unknown type selected',
    description:
      'Must use "collection", "catalog", "item", "geojson", or "stac-item" or parameter "type"',
  },
}

module.exports = errorResponses
