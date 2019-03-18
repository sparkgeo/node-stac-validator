const { lorem, random } = require('faker')

const item = ({ id, type, geometry, bbox, properties, links, assets } = {}) => {
  const asset = {}

  if (id !== false) asset.id = id || random.uuid()
  if (type !== false) asset.type = type || 'Feature'
  if (geometry !== false) {
    asset.geometry = geometry || {
      type: 'Polygon',
      coordinates: [[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]],
    }
  }
  if (bbox !== false) asset.bbox = bbox || [0, 0, 1, 1]

  if (properties !== false) {
    asset.properties = properties || {
      datetime: new Date().toISOString(),
      title: lorem.word(),
    }
  }

  if (links !== false) {
    asset.links = links || [
      {
        rel: 'root',
        href: 'http://landsat-pds.s3.amazonaws.com/L8/L1T-collection.json',
      },
    ]
  }

  if (assets !== false) {
    asset.assets = assets || {
      thumbnail: {
        href:
          'http://landsat-pds.s3.amazonaws.com/L8/153/025/LC81530252014153LGN00/LC81530252014153LGN00_thumb_large.jpg',
        type: 'image/jpeg',
      },
      metadata: {
        href:
          'http://landsat-pds.s3.amazonaws.com/L8/153/025/LC81530252014153LGN00/LC81530252014153LGN00_MTL.txt',
        type: 'mtl',
      },
      B1: {
        href:
          'http://landsat-pds.s3.amazonaws.com/L8/153/025/LC81530252014153LGN00/LC81530252014153LGN00_B1.TIF',
        type: 'image/vnd.stac.geotiff',
        'eo:bands': [0],
      },
      B2: {
        href:
          'http://landsat-pds.s3.amazonaws.com/L8/153/025/LC81530252014153LGN00/LC81530252014153LGN00_B2.TIF',
        type: 'image/vnd.stac.geotiff',
        'eo:bands': [1],
      },
      B3: {
        href:
          'http://landsat-pds.s3.amazonaws.com/L8/153/025/LC81530252014153LGN00/LC81530252014153LGN00_B3.TIF',
        type: 'image/vnd.stac.geotiff',
        'eo:bands': [2],
      },
      B4: {
        href:
          'http://landsat-pds.s3.amazonaws.com/L8/153/025/LC81530252014153LGN00/LC81530252014153LGN00_B4.TIF',
        type: 'image/vnd.stac.geotiff',
        'eo:bands': [3],
      },
      B5: {
        href:
          'http://landsat-pds.s3.amazonaws.com/L8/153/025/LC81530252014153LGN00/LC81530252014153LGN00_B5.TIF',
        type: 'image/vnd.stac.geotiff',
        'eo:bands': [4],
      },
      B6: {
        href:
          'http://landsat-pds.s3.amazonaws.com/L8/153/025/LC81530252014153LGN00/LC81530252014153LGN00_B6.TIF',
        type: 'image/vnd.stac.geotiff',
        'eo:bands': [5],
      },
      B7: {
        href:
          'http://landsat-pds.s3.amazonaws.com/L8/153/025/LC81530252014153LGN00/LC81530252014153LGN00_B7.TIF',
        type: 'image/vnd.stac.geotiff',
        'eo:bands': [6],
      },
      B8: {
        href:
          'http://landsat-pds.s3.amazonaws.com/L8/153/025/LC81530252014153LGN00/LC81530252014153LGN00_B8.TIF',
        type: 'image/vnd.stac.geotiff',
        'eo:bands': [7],
      },
      B9: {
        href:
          'http://landsat-pds.s3.amazonaws.com/L8/153/025/LC81530252014153LGN00/LC81530252014153LGN00_B9.TIF',
        type: 'image/vnd.stac.geotiff',
        'eo:bands': [8],
      },
      B10: {
        href:
          'http://landsat-pds.s3.amazonaws.com/L8/153/025/LC81530252014153LGN00/LC81530252014153LGN00_B10.TIF',
        type: 'image/vnd.stac.geotiff',
        'eo:bands': [9],
      },
      B11: {
        href:
          'http://landsat-pds.s3.amazonaws.com/L8/153/025/LC81530252014153LGN00/LC81530252014153LGN00_B11.TIF',
        type: 'image/vnd.stac.geotiff',
        'eo:bands': [10],
      },
    }
  }
  return asset
}
module.exports = item
