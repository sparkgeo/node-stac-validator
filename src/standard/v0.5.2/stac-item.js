module.exports = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  id: 'stac-item.json#',
  title: 'STAC Item',
  type: 'object',
  description:
    'This object represents the metadata for an item in a SpatioTemporal Asset Catalog.',
  additionalProperties: true,
  allOf: [
    {
      $ref: '#/definitions/core',
    },
  ],
  definitions: {
    core: {
      allOf: [
        {
          oneOf: [
            {
              $ref:
                'http://json.schemastore.org/geojson.json#/definitions/feature',
            },
          ],
        },
        {
          type: 'object',
          required: ['id', 'type', 'geometry', 'links', 'assets'],
          properties: {
            geometry: {
              properties: {
                type: {
                  enum: ['Polygon', 'MultiPolygon'],
                },
              },
            },
            id: {
              title: 'Provider ID',
              description: 'Provider item ID',
              type: 'string',
            },
            links: {
              title: 'Item links',
              description: 'Links to item relations',
              type: 'object',
              properties: {
                self: {
                  allOf: [
                    {
                      $ref: '#/definitions/link',
                    },
                    {
                      properties: {
                        rel: {
                          type: 'string',
                          pattern: '^self$',
                        },
                      },
                    },
                  ],
                },
              },
              patternProperties: {
                '.+': {
                  $ref: '#/definitions/link',
                },
              },
              required: ['self'],
              additionalProperties: false,
            },
            assets: {
              title: 'Asset links',
              description: 'Links to assets',
              type: 'object',
              patternProperties: {
                '.+': {
                  $ref: '#/definitions/asset',
                },
              },
              additionalProperties: false,
            },
            properties: {
              type: 'object',
              required: ['datetime'],
              properties: {
                datetime: {
                  title: 'Date and Time',
                  description:
                    'The searchable date/time of the assets, in UTC (Formatted in RFC 3339) ',
                  type: 'string',
                  format: 'date-time',
                },
                provider: {
                  title: 'Provider',
                  description: 'Provider name and contact',
                  oneOf: [
                    {
                      type: 'string',
                    },
                    {
                      $ref: '#/definitions/entity',
                    },
                  ],
                },
                license: {
                  title: 'Data license',
                  description: 'Data license name based on SPDX License List',
                },
              },
            },
          },
        },
      ],
    },
    link: {
      type: 'object',
      required: ['rel', 'href'],
      properties: {
        rel: {
          type: 'string',
        },
        href: {
          type: 'string',
        },
      },
    },
    asset: {
      type: 'object',
      required: ['href'],
      properties: {
        href: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
      },
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
  },
}
