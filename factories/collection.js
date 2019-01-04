const { lorem, random } = require('faker')

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

  if (id) {
    if (id === true) {
      asset.id = random.uuid()
    } else {
      asset.id = id
    }
  }

  if (stac_version) {
    if (stac_version === true) {
      asset.stac_version = 'v0.6.0'
    } else {
      asset.stac_version = stac_version
    }
  }

  if (description) {
    if (description === true) {
      asset.description = lorem.sentence()
    } else {
      asset.description = description
    }
  }

  if (license) {
    if (license === true) {
      asset.license = lorem.paragraph()
    } else {
      asset.license = license
    }
  }

  if (extent) {
    if (extent === true) {
      asset.extent = {
        spatial: [0, 0, 1, 1],
        temporal: ['2009-01-01T00:00:00Z', null],
      }
    } else if (typeof extent === 'string') {
      asset.extent = [extent]
    } else {
      asset.extent = extent
    }
  }

  if (links) {
    if (links === true) {
      asset.links = []
    } else {
      asset.links = links
    }
  }

  if (keywords) {
    if (keywords === true) {
      asset.keywords = []
    } else {
      asset.keywords = keywords
    }
  }

  if (version) {
    if (version === true) {
      asset.version = lorem.word()
    } else {
      asset.version = version
    }
  }

  if (providers) {
    if (providers === true) {
      asset.providers = [
        {
          name: 'hello world',
        },
      ]
    } else {
      asset.providers = providers
    }
  }

  if (extraElement) {
    asset[lorem.word()] = lorem.word()
  }

  return asset
}

module.exports = collection
