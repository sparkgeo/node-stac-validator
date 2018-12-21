const { errorResponses } = require('../helpers')
const verifyAsset = {
  catalog: require('./verify-catalog'),
  collection: require('./verify-collection'),
  item: require('./verify-item'),
}

module.exports = {
  verifyAsset: type => verifyAsset[type] || errorResponses.unclearTypeAttribute,
}
