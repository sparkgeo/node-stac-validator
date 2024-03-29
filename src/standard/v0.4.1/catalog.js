module.exports = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  id: 'catalog.json#',
  definitions: {
    asset: {
      type: 'object',
      allOf: [
        {
          $ref: 'asset.json#/definitions/core',
        },
        {
          properties: {
            uri: {
              type: 'string',
              format: 'uri',
            },
          },
        },
      ],
    },
    link: {
      type: 'object',
      properties: {
        uri: {
          type: 'string',
          format: 'uri',
        },
        properties: {
          $ref: '#/definitions/catalog',
        },
      },
    },
    catalog: {
      title: 'Catalog',
      type: 'object',
      properties: {
        TODO: {
          TODO: 'URL pattern info + frequency',
        },
        name: {
          description: 'Name',
          type: 'string',
        },
        description: {
          description: 'Description',
          type: 'string',
        },
        license: {
          description: 'License (as an SPDX license string)',
          type: 'string',
        },
        features: {
          description: 'Features',
          type: 'array',
          items: {
            oneOf: [
              {
                $ref: '#/definitions/asset',
              },
              {
                type: 'null',
              },
            ],
          },
        },
        links: {
          description: 'Links to other catalogs',
          type: 'array',
          items: {
            oneOf: [
              {
                $ref: '#/definitions/link',
              },
              {
                type: 'null',
              },
            ],
          },
        },
        contact: {
          $ref: 'asset.json#/definitions/entity',
        },
        formats: {
          description: 'Included asset formats',
          type: 'array',
          items: {
            type: 'string',
          },
        },
        keywords: {
          description: 'Keywords',
          type: 'array',
          items: {
            type: 'string',
          },
        },
        homepage: {
          type: 'string',
        },
        geometry: {
          allOf: [
            {
              $ref: 'geojson.json#/definitions/geometry',
            },
            {
              properties: {
                type: {
                  enum: ['Polygon', 'MultiPolygon'],
                },
              },
            },
          ],
        },
        startDate: {
          type: 'string',
          format: 'date-time',
        },
        endDate: {
          type: 'string',
          format: 'date-time',
        },
        provider: {
          description: 'Provider-specific properties',
          type: 'object',
        },
      },
    },
  },
  allOf: [
    {
      $ref: '#/definitions/catalog',
    },
    {
      required: ['name', 'description', 'license', 'features', 'links'],
    },
  ],
}
