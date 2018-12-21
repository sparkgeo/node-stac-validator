const verifyCatalog = require('./verify-catalog', () => {})

console.log(verifyCatalog)

describe('Catalog STAC Verification for V0.6.0', () => {
  describe('Base elements of the STAC catalog', () => {
    it('must include the "stac_version" element', () => {})
    it('must include an "id" field', () => {})
    it('must include a "description" key with a string value', () => {})
    it('must include a "links" key that contains an an array of objects', () => {})
    it('must have no other elements either than the above, or "title"', () => {})
  })

  // TBD: https://github.com/radiantearth/stac-spec/issues/365
  // describe('the ID field', () => {
  //   it('must be able to detect duplicate IDs for catalogs', () => {})
  // })

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
      it('must contain no other elements but "self", "root", "parent", "child", "item"', () => {})
      describe('each element', () => {
        it('must connect to a valid url', () => {})
      })
    })
  })
})

// NOT itED
/*
- Child catalogs and items must contain the same stac version

*/
