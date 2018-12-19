const { lorem, random } = require('faker')

const collection = ({
  id,
  description,
  license,
  extent,
  stac_version,
  // links,
  // keywords,
  // version,
  // providers,
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
      asset.extent = [0, 0, 1, 1]
    } else if (typeof extent === 'string') {
      asset.extent = [extent]
    }
  }

  // if (url) {
  //   if (url === true) {
  //     asset.url = internet.url()
  //   } else {
  //     asset.url = url
  //   }
  // }

  return asset
}

module.exports = collection
