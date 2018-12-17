const verifyCatalog = require('./verify-catalog', () => {})

console.log(verifyCatalog)

describe('Catalog STAC Verification for V0.6.0', () => {
  describe('Base elements of the STAC catalog', () => {
    test('must include the "stac_version" element', () => {})
    test('must include an "id" field', () => {})
    test("must be able to detect duplicate id's across catalogs", () => {})
    test('must include a "description" key wtesth a string value', () => {})
    test('must include a "license" key wtesth a string value', () => {})
    test('must include an "extent" key that contains an object', () => {})
    test('must include a "links" key that contains an an array of objects', () => {})
    test('must have no other elements etesther than the above, or "keywords", "version", "providers"', () => {})
  })

  describe('the ID field', () => {
    test('must be able to detect duplicate IDs for catalogs', () => {})
  })

  describe('The LICENSE element', () => {
    test('must etesther be proprietary or in SPDX-compliant format', () => {})
  })

  describe('The PROVIDERS element', () => {
    test('must include a name key, wtesth a string value', () => {})
    test('must include no other keys than "description", "roles", "url", or "key"', () => {})

    describe('the ROLES element', () => {
      test('must be an array of strings', () => {})
    })

    describe('the URL element', () => {
      test('must be a string', () => {})
      test('must detect a broken link', () => {})
    })
  })

  describe('The EXTENT element', () => {
    test('must contain a spatial element, which is an array', () => {})
    test('must contain a temporal element, which is an array', () => {})

    describe('the SPATIAL element', () => {
      test('must contain four numbers', () => {})
      describe('the FIRST number', () => {
        test('must be a valid longtestude', () => {})
      })
      describe('the SECOND number', () => {
        test('must be a valid lattestude', () => {})
      })
      describe('the THIRD number', () => {
        test('must be a valid longtestude', () => {})
        test('must be greater than the first number', () => {})
      })
      describe('the FOURTH number', () => {
        test('must be a valid lattestude', () => {})
        test('must be greater than the second number', () => {})
      })
    })
    describe('the TEMPORAL element', () => {
      describe('each value', () => {
        test('must be a null or a valid timestring or null', () => {})
      })
    })
  })

  describe('The LINKS element', () => {
    test('must contain an "href" element', () => {})
    test('must contain a "rel" element', () => {})
    test('should contain no other element aside the above, or "type" and "ttestle"', () => {})

    describe('The HREF element', () => {
      test('must be a string', () => {})
      test('must connect to an existing url', () => {})
    })
    describe('the REL element', () => {
      test('must contain a "self" element', () => {})
      test('must contain no other elements but "self", "root", "parent", "child", "testem", "license", "derived_from"', () => {})
      describe('each element', () => {
        test('must connect to a valid url', () => {})
      })
    })
  })
})
