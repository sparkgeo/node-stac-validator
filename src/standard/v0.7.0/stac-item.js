module.exports = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'item.json#',
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
              $ref: 'geojson.json#/definitions/feature',
            },
          ],
        },
        {
          type: 'object',
          required: [
            'id',
            'type',
            'geometry',
            'links',
            'assets',
            'bbox',
            'properties',
          ],
          properties: {
            id: {
              title: 'Provider ID',
              description: 'Provider item ID',
              type: 'string',
            },
            links: {
              title: 'Item links',
              description: 'Links to item relations',
              type: 'array',
              items: {
                $ref: '#/definitions/link',
              },
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
              },
            },
            collection: {
              title: 'Collection ID',
              description:
                'The ID of the STAC Collection this Item references to.',
              type: 'string',
            },
          },
        },
      ],
    },
    link: {
      type: 'object',
      required: ['rel', 'href'],
      properties: {
        href: {
          title: 'Link reference',
          type: 'string',
        },
        rel: {
          title: 'Link relation type',
          type: 'string',
        },
        type: {
          title: 'Link type',
          type: 'string',
        },
        title: {
          title: 'Link title',
          type: 'string',
        },
      },
    },
    asset: {
      type: 'object',
      required: ['href'],
      properties: {
        href: {
          title: 'Asset reference',
          type: 'string',
        },
        title: {
          title: 'Asset title',
          type: 'string',
        },
        type: {
          title: 'Asset type',
          type: 'string',
        },
      },
    },
  },
}
