module.exports = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  id: 'catalog.json#',
  definitions: {
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
    catalog: {
      title: 'Catalog',
      type: 'object',
      required: ['stac_version', 'id', 'description', 'links'],
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
        links: {
          title: 'Links',
          type: 'array',
          items: {
            $ref: '#/definitions/link',
          },
        },
      },
    },
  },
  allOf: [
    {
      $ref: '#/definitions/catalog',
    },
  ],
}
