const verifyCollection = require('./verify-collection', () => {})
// eslint-disable-next-line
const { collection } = require('../../factories')

console.log(verifyCollection)

const location = 'json'
const useRecursion = false
const useVersion = 'v0.6.0'

describe('collection STAC Verification for V0.6.0', () => {
  describe('Base elements of the STAC collection', () => {
    it('must include the "stac_version" element', async () => {
      const asset = collection({
        id: true,
        description: true,
        license: true,
        extent: true,
      })

      const { errors } = await verifyCollection({
        asset,
        location,
        useRecursion,
        useVersion,
      })

      const message = 'The "stac_version" element is missing'
      const messageIndex = errors.map(i => i.message).indexOf(message)

      expect(messageIndex).not.toEqual(-1)
    })

    it('must include an "id" field', async () => {
      const asset = collection({
        description: true,
        license: true,
        extent: true,
        stac_version: true,
      })

      const { errors } = await verifyCollection({
        asset,
        location,
        useRecursion,
        useVersion,
      })

      const message = 'The "id" element is missing'
      const messageIndex = errors.map(i => i.message).indexOf(message)

      expect(messageIndex).not.toEqual(-1)
    })

    it('must include a "description" key with a string value', async () => {
      const asset = collection({
        id: true,
        license: true,
        extent: true,
        stac_version: true,
      })

      const { errors } = await verifyCollection({
        asset,
        location,
        useRecursion,
        useVersion,
      })

      const message = 'The "description" element is missing'
      const messageIndex = errors.map(i => i.message).indexOf(message)

      expect(messageIndex).not.toEqual(-1)
    })

    it('must include a "license" key with a string value', () => {})
    it('must include an "extent" key that contains an object', () => {})
    it('must include a "links" key that contains an an array of objects', () => {})
    it('must have no other elements either than the above, or "keywords", "version", "providers"', () => {})
  })

  describe('the ID field', () => {
    it('must be able to detect duplicate IDs for collections', () => {})
  })

  describe('The LICENSE element', () => {
    it('must either be proprietary or in SPDX-compliant format', () => {})
  })

  describe('The PROVIDERS element', () => {
    it('must include a name key, with a string value', () => {})
    it('must include no other keys than "description", "roles", "url", or "key"', () => {})

    describe('the ROLES element', () => {
      it('must be an array of strings', () => {})
    })

    describe('the URL element', () => {
      it('must be a string', () => {})
      it('must detect a broken link', () => {})
    })
  })

  describe('The EXTENT element', () => {
    it('must contain a spatial element, which is an array', () => {})
    it('must contain a temporal element, which is an array', () => {})

    describe('the SPATIAL element', () => {
      it('must be an array', () => {})
      it('must contain four numbers', () => {})
      describe('the FIRST number', () => {
        it('must be a valid longitude', () => {})
      })
      describe('the SECOND number', () => {
        it('must be a valid lattitude', () => {})
      })
      describe('the THIRD number', () => {
        it('must be a valid longitude', () => {})
        it('must be greater than the first number', () => {})
      })
      describe('the FOURTH number', () => {
        it('must be a valid latitude', () => {})
        it('must be greater than the second number', () => {})
      })
    })
    describe('the TEMPORAL element', () => {
      describe('each value', () => {
        it('must be a null or a valid timestring or null', () => {})
      })
    })
  })

  describe('The LINKS element', () => {
    it('must contain an "href" element', () => {})
    it('must contain a "rel" element', () => {})
    it('should contain no other element aside the above, or "type" and "title"', () => {})

    describe('The HREF element', () => {
      it('must be a string', () => {})
      it('must connect to an existing url', () => {})
    })
    describe('the REL element', () => {
      it('must contain a "self" element', () => {})
      it('must contain no other elements but "self", "root", "parent", "child", "item", "license", "derived_from"', () => {})
      describe('each element', () => {
        it('must connect to a valid url', () => {})
      })
    })
  })
})

// NOT included
/*
- Child catalogs and items must contain the same stac version

*/
