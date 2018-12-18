const index = require('./index')
console.log(index)

describe("The testing suite's functionality", () => {
  const expected = true
  it('can equate true with true', () => {
    expect(true).toEqual(expected)
  })
  it('can refute false as not true', () => {
    expect(false).not.toEqual(expected)
  })
})

describe('The entry point', () => {
  it('has a method "validateFromUrl"', () => {})
  it('has a method "validateFromJson"', () => {})

  describe('the VALIDATE FROM URL method', () => {
    it('must have a "url" parameter', () => {})
    it('accepts a "dig" parameter', () => {})
    describe('The URL parameter', () => {
      it('collects the data if present', () => {})
      it('gracefully fails if file not found', () => {})
      it('determines the version and asset type from the file', () => {})
      it('gracefully fails if the version does not match up', () => {})
    })
    describe('The DIG parameter', () => {
      it('defaults to false if not provided', () => {})
      it('validates nested catalogs, collections or items if true', () => {})
      it('ignores nested catalogs, collections, or items if set to false', () => {})
    })
  })
  describe('the VALIDATE FROM JSON method', () => {
    it('accepts a "item" parameter', () => {})
    it('accepts a "collection", parameter', () => {})
    it('accepts a "catalog" parameter', () => {})
    it('accepts a "dig" parameter', () => {})
    it('gracefully fails if one of "item", "collection", or "catalog" not present', () => {})
    it('gracefully failes when more of one of "item", "collection", or "catalog" is present', () => {})

    describe('when using the ITEM attribute', () => {
      describe('when using a valid item', () => {
        it('returns a success return', () => {})
        it('contains the valid elements', () => {})
      })
      describe('when using an invalid item', () => {
        it('returns a failed return', () => {})
        it('contains the valid elements', () => {})
      })
    })
    describe('when using the CATALOG attribute', () => {
      describe('when using a valid catalog', () => {
        it('returns a success return', () => {})
        it('contains the valid elements', () => {})
      })
      describe('when using an invalid catalog', () => {
        it('returns a failed return', () => {})
        it('contains the valid elements', () => {})
      })
    })
    describe('when using the COLLECTION attribute', () => {
      describe('when using a valid collection', () => {
        it('returns a success return', () => {})
        it('contains the valid elements', () => {})
      })
      describe('when using an invalid collection', () => {
        it('returns a failed return', () => {})
        it('contains the valid elements', () => {})
      })
    })
  })
})
