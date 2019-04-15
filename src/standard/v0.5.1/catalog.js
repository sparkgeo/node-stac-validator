module.exports = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  id: 'catalog.json#',
  definitions: {
    asset: {
      type: 'object',
      allOf: [
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
      allOf: [
        {
          properties: {
            rel: {
              type: 'string',
            },
            href: {
              type: 'string',
            },
          },
        },
      ],
    },
    entity: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
          format: 'email',
        },
        phone: {
          type: 'string',
        },
        url: {
          type: 'string',
          format: 'uri',
        },
      },
    },
    license: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        shortname: {
          type: 'string',
          format: 'email',
        },
        copyright: {
          type: 'string',
        },
        link: {
          type: 'string',
          format: 'uri',
        },
      },
      required: ['name', 'link'],
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
          oneOf: [
            {
              description: 'License (as an SPDX license string)',
              type: 'string',
            },
            { $ref: '#/definitions/license' },
          ],
        },
        links: {
          description: 'Links to other catalogs or items',
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
          $ref: '#/definitions/entity',
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
      required: ['name', 'description', 'links'],
    },
  ],
}
