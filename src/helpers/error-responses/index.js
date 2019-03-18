const errorResponses = {
  missingAsset: {
    success: false,
    errors: [
      {
        keyword: 'Missing asset',
        message: 'Requires asset to verify against',
      },
    ],
  },
  missingTypeAttribute: {
    success: false,
    errors: [
      {
        keyword: 'Missing type attribute',
        message:
          'Must explain what you are trying to verify. Is it an item/collection/catalog?',
      },
    ],
  },
  unknownVersion: version => ({
    success: false,
    errors: [
      {
        keyword: 'Unknown version',
        message: `Version ${version} is not an accepted version.`,
      },
    ],
  }),
  incorrectType: {
    success: false,
    errors: [
      {
        keyword: 'Unknown type selected',
        message:
          'Must use "collection", "catalog", "item", "geojson", or "stac-item" or parameter "type"',
      },
    ],
  },
  typeVersionMisMatch: ({ type, version }) => ({
    success: false,
    errors: [
      {
        keyword: 'Mismatch between STAC type and version',
        message: `The type "${type} is not used in STAC version "${version}".`,
      },
    ],
  }),
}

module.exports = errorResponses