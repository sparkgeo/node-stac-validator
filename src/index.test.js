// eslint-disable-next-line
const { validateFromUrl, validateFromJson } = require('./index')

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
  it('has a method "validateFromUrl"', () => {
    const response = validateFromUrl()
    expect(typeof response).toEqual('object')
  })
  it('has a method "validateFromJson"', () => {
    const response = validateFromJson()
    expect(typeof response).toEqual('object')
  })

  describe('the VALIDATE FROM URL method', () => {
    it('must have a "url" parameter', () => {
      const { success } = validateFromUrl({ type: 'collection', dig: false })
      expect(success).toEqual(false)
    })

    it('accepts a "dig" parameter', () => {})
    it('accepts a "version" parameter', () => {})

    it('must have a "type" parameter', () => {
      const { success } = validateFromUrl({ url: '...' })
      expect(success).toEqual(false)
    })

    describe('The URL parameter', () => {
      it('succeeds if a valid stac file is present', () => {
        const url =
          'https://raw.githubusercontent.com/radiantearth/stac-spec/master/item-spec/examples/digitalglobe-sample.json'
        const type = 'item'
        const { success } = validateFromUrl({ type, url })
        expect(success).toEqual(true)
      })

      it('gracefully fails if the url does not point to a valid asset', () => {})
      it('determines the version and asset type from the file', () => {})
      it('gracefully fails if the version does not match up', () => {})
    })
    describe('The DIG parameter', () => {
      it('defaults to false if not provided', () => {})
      it('validates nested catalogs, collections or items if true', () => {})
      it('ignores nested catalogs, collections, or items if set to false', () => {})
    })
    describe('The TYPE parameter', () => {
      it('is a string', () => {})
      it('provides an error if it is not one of "collection", "item", "catalog"', () => {})
    })

    describe('the version parameter', () => {
      it('defaults to the latest version when blank')
    })
  })
  describe('the VALIDATE FROM JSON method', () => {
    it('accepts a "item" parameter', () => {})
    it('accepts a "collection", parameter', () => {})
    it('accepts a "catalog" parameter', () => {})
    it('accepts a "dig" parameter', () => {})
    it('accepts a "version" parameter', () => {})

    it('gracefully fails if one of "item", "collection", or "catalog" not present', () => {})
    it('gracefully failes when more of one of "item", "collection", or "catalog" is present', () => {})

    describe('the version parameter', () => {
      it('defaults to the latest version when blank', () => {})
      it('responds with an error if it fails to match a known version', () => {})
    })

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
