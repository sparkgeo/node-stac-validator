// TODO: Refactor like mad

exports.missingUrl = {
  success: false,
  verified_files: [],
  errors: [
    {
      type: 'remote',
      category: 'unknown',
      errors: ['missing url'],
    },
  ],
}
exports.missingTypeParameter = {
  success: false,
  verified_files: [],
  errors: [
    {
      type: 'json',
      category: 'unknown',
      errors: ['missing one of "item", "catalog", or "collection" parameters'],
    },
  ],
}

exports.missingTypeAttribute = {
  success: false,
  verified_files: [],
  errors: [
    {
      type: 'remote',
      category: 'unknown',
      errors: ['missing one of "item", "catalog", or "collection" attributes'],
    },
  ],
}
exports.unclearTypeAttribute = {
  success: false,
  verified_files: [],
  errors: [
    {
      type: 'remote',
      category: 'unknown',
      errors: ['type must be one of "item", "catalog", or "collection"'],
    },
  ],
}

exports.extraTypeAttribute = {
  success: false,
  verified_files: [],
  errors: [
    {
      type: 'remote',
      category: 'unknown',
      errors: ['Can only have one of "item", "catalog", or "collection"'],
    },
  ],
}
