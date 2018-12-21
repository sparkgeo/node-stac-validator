const verifyItem = require('./verify-item')

console.log(verifyItem)

describe('item STAC Verification for V0.6.0', () => {
  describe('calling the method', () => {
    it('must contain a JS stac object "asset"', () => {})
    it('can permit a "version" parameter', () => {})
    describe('when there is no version parameter in use', () => {
      it('will default to the latest STAC version', () => {})
    })
  })

  describe('Base elements of the STAC item', () => {
    it('must contain an "id" attribute"', () => {})
    it('must contain a "type" attribute', () => {})
    it('must contain a "geometry" attribute', () => {})
    it('must contain a "bbox" attribute', () => {})
    it('must contain a "properties" attribute"', () => {})
    it('must contain a "links" attribute', () => {})
    it('must contain an "assets" attribute', () => {})
  })

  describe('the ID attribute', () => {
    it('must be a string', () => {})
    it('must be unique among items', () => {})
  })

  describe('the TYPE attribute', () => {
    it('must be a string', () => {})
    it('must be set to "Feature"', () => {})
  })

  describe('the GEOMETRY attribute', () => {
    it('must be an object', () => {})
    it('must conform to the GeoJSON spec', () => {})
  })

  describe('the BBOX attribute', () => {
    it('must be an array', () => {})
    it('must be of length 4', () => {})
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

  describe('the PROPERTIES attribute', () => {
    it('must be an object', () => {})
    it('must contain a "datetime" object', () => {})
    it('must contain no other elements than "datetime" and "title"', () => {})

    describe('the DATETIME attribute', () => {
      it('must be a string', () => {})
      it('must conform to RFC 3339', () => {})
    })
  })

  describe('The LINKS attribute', () => {
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
  describe('the ASSETS attribute', () => {
    it('must contain an "href" element', () => {})
    it('should not contain any elements either than "href", "title", and "type', () => {})
  })
})
