// TODO: Refactor like mad

exports.missingUrl = {
  success: false,
  errors: [
    {
      location: 'unknown',
      message: 'missing url',
    },
  ],
}

exports.cannotConnectToEntryAsset = url => ({
  success: false,
  errors: [
    {
      location: url,
      message: 'cannot connect to url',
    },
  ],
})

exports.missingAsset = {
  success: false,
  errors: [
    {
      location: 'unknown',
      message: 'missing the main asset',
    },
  ],
}

exports.missingTypeAttribute = {
  success: false,
  errors: [
    {
      location: 'unknown',
      message: 'missing one of "item", "catalog", or "collection" attributes',
    },
  ],
}

// eslint-disable-next-line
exports.unclearTypeAttribute = ({} = {}) => ({
  success: false,
  errors: [
    {
      location: 'unknown',
      message: 'type must be one of "item", "catalog", or "collection"',
    },
  ],
})

exports.extraTypeAttribute = {
  success: false,
  errors: [
    {
      location: 'unknown',
      message: 'Can only have one of "item", "catalog", or "collection"',
    },
  ],
}
