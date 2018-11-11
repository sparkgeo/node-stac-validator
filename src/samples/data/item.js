module.exports = {
  id: 'CBERS_4_MUX_20180713_057_122_L2',
  type: 'Feature',
  bbox: [47.775535, -20.294132, 49.182746, -19.062016],
  geometry: {
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [47.780557, -20.126939],
          [48.930517, -20.301523],
          [49.177531, -19.240716],
          [48.035511, -19.067345],
          [47.780557, -20.126939],
        ],
      ],
    ],
  },
  properties: {
    datetime: '2018-07-13T06:50:15Z',
    provider: 'INPE',
    'eo:collection': 'default',
    'eo:sun_azimuth': 36.773,
    'eo:sun_elevation': 39.2355,
    'eo:off_nadir': -0.00899776,
    'eo:epsg': 32651,
    'cbers:data_type': 'L2',
    'cbers:path': 57,
    'cbers:row': 122,
    'c:id': 'CBERS_4_MUX_L2',
  },
  links: {
    self: {
      rel: 'self',
      href:
        'https://cbers-stac.s3.amazonaws.com/CBERS4/MUX/057/122/CBERS_4_MUX_20180713_057_122_L2.json',
    },
    catalog: {
      rel: 'catalog',
      href: 'https://cbers-stac.s3.amazonaws.com/CBERS4/MUX/057/catalog.json',
    },
    collection: {
      rel: 'collection',
      href:
        'https://cbers-stac.s3.amazonaws.com/collections/CBERS_4_MUX_L2_collection.json',
    },
  },
  assets: {
    thumbnail: {
      href:
        'https://s3.amazonaws.com/cbers-meta-pds/CBERS4/MUX/057/122/CBERS_4_MUX_20180713_057_122_L2/CBERS_4_MUX_20180713_057_122.jpg',
      type: 'jpeg',
    },
    metadata: {
      href:
        's3://cbers-pds/CBERS4/MUX/057/122/CBERS_4_MUX_20180713_057_122_L2/CBERS_4_MUX_20180713_057_122_L2_BAND6.xml',
      type: 'xml',
    },
    B5: {
      href:
        's3://cbers-pds/CBERS4/MUX/057/122/CBERS_4_MUX_20180713_057_122_L2/CBERS_4_MUX_20180713_057_122_L2_BAND5.tif',
      type: 'GeoTIFF',
      format: 'COG',
      eo_bands: ['5'],
    },
    B6: {
      href:
        's3://cbers-pds/CBERS4/MUX/057/122/CBERS_4_MUX_20180713_057_122_L2/CBERS_4_MUX_20180713_057_122_L2_BAND6.tif',
      type: 'GeoTIFF',
      format: 'COG',
      eo_bands: ['6'],
    },
    B7: {
      href:
        's3://cbers-pds/CBERS4/MUX/057/122/CBERS_4_MUX_20180713_057_122_L2/CBERS_4_MUX_20180713_057_122_L2_BAND7.tif',
      type: 'GeoTIFF',
      format: 'COG',
      eo_bands: ['7'],
    },
    B8: {
      href:
        's3://cbers-pds/CBERS4/MUX/057/122/CBERS_4_MUX_20180713_057_122_L2/CBERS_4_MUX_20180713_057_122_L2_BAND8.tif',
      type: 'GeoTIFF',
      format: 'COG',
      eo_bands: ['8'],
    },
  },
}
