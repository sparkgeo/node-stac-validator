const { lorem, random } = require('faker')

// This method will provide a collection object that will pass tests when no params are provided
const collection = ({
  id,
  title,
  description,
  extent,
  stac_version,
  links,
  extraElement,
} = {}) => {
  const asset = {}

  if (title !== false) asset.title = title || lorem.word()
  if (id !== false) asset.id = id || random.uuid()
  if (stac_version !== false) asset.stac_version = stac_version || 'v0.6.0'
  if (description !== false) asset.description = description || lorem.sentence()

  if (extraElement) {
    asset[lorem.word()] = lorem.word()
  }
  if (links !== false) {
    asset.links = links || [
      {
        rel: 'self',
        href: 'valid-test',
      },
    ]
  }

  return asset
}

module.exports = collection
