module.exports = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  id: 'collection.json#',
  title: 'STAC Collection Specification',
  description:
    'This object represents Collections in a SpatioTemporal Asset Catalog.',
  type: 'object',
  required: ['stac_version', 'id', 'description', 'license', 'extent', 'links'],
  additionalProperties: true,
  properties: {
    stac_version: {
      title: 'STAC version',
      type: 'string',
    },
    id: {
      title: 'Identifier',
      type: 'string',
    },
    title: {
      title: 'Title',
      type: 'string',
    },
    description: {
      title: 'Description',
      type: 'string',
    },
    keywords: {
      title: 'Keywords',
      type: 'array',
      items: {
        type: 'string',
      },
    },
    version: {
      title: 'Collection Version',
      type: 'string',
    },
    license: {
      title: 'Collection License Name',
      type: 'string',
    },
    providers: {
      type: 'array',
      items: {
        properties: {
          name: {
            title: 'Organization name',
            type: 'string',
          },
          description: {
            title: 'Provider description',
            type: 'string',
          },
          roles: {
            title: 'Organization roles',
            type: 'array',
            items: {
              type: 'string',
              enum: ['producer', 'licensor', 'processor', 'host'],
            },
          },
          url: {
            title: 'Homepage',
            type: 'string',
            format: 'url',
          },
        },
      },
    },
    extent: {
      title: 'Extents',
      type: 'object',
      required: ['spatial', 'temporal'],
      properties: {
        spatial: {
          title: 'Spatial extent',
          type: 'array',
          minItems: 4,
          maxItems: 6,
          items: {
            type: 'number',
          },
        },
        temporal: {
          title: 'Temporal extent',
          type: 'array',
          minItems: 2,
          maxItems: 2,
          items: {
            type: ['string', 'null'],
            format: 'date-time',
          },
        },
      },
      additionalProperties: true,
    },
    links: {
      type: 'array',
      items: {
        type: 'object',
        required: ['href', 'rel'],
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
        additionalProperties: true,
      },
    },
  },
}
