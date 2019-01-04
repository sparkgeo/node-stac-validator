const { lorem, random } = require('faker')

// This method will provide a collection object that will pass tests when no params are provided
const collection = ({
  id,
  description,
  license,
  extent,
  stac_version,
  links,
  keywords,
  version,
  providers,
  extraElement,
} = {}) => {
  const asset = {}
  if (id !== false) asset.id = id || random.uuid()
  if (stac_version !== false) asset.stac_version = stac_version || 'v0.6.0'
  if (description !== false) asset.description = description || lorem.sentence()
  if (license !== false) asset.license = license || lorem.paragraph()
  if (extent !== false) {
    asset.extent = extent || {
      spatial: [0, 0, 1, 1],
      temporal: ['2009-01-01T00:00:00Z', null],
    }
  }
  if (keywords !== false) asset.keywords = keywords || []
  if (version !== false) asset.version = version || lorem.word()
  if (providers !== false) {
    asset.providers = providers || [{ name: lorem.sentence() }]
  }
  if (extraElement) {
    asset[lorem.word()] = lorem.word()
  }
  if (links !== false) {
    asset.links = links || [
      {
        rel: 'self',
        href:
          'https://storage.cloud.google.com/earthengine-test/catalog/COPERNICUS_S2.json',
      },
    ]
  }

  return asset
}

module.exports = collection
