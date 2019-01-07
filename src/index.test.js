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
  it('has a method "validateFromUrl"', async () => {
    const response = await validateFromUrl()
    expect(typeof response).toEqual('object')
  })
  it('has a method "validateFromJson"', async () => {
    const response = await validateFromJson()
    expect(typeof response).toEqual('object')
  })

  describe('the VALIDATE FROM URL method', () => {
    it('must have a "url" parameter', async () => {
      const { success } = await validateFromUrl({
        type: 'collection',
        dig: false,
      })
      expect(success).toEqual(false)
    })

    it('must have a "type" parameter', async () => {
      const { success } = await validateFromUrl({ url: '...' })
      expect(success).toEqual(false)
    })

    describe('The URL parameter', () => {
      it('succeeds if a valid stac file is present', async () => {
        const url =
          'https://raw.githubusercontent.com/radiantearth/stac-spec/master/item-spec/examples/digitalglobe-sample.json'
        const type = 'item'
        const { success } = await validateFromUrl({ type, url })
        expect(success).toEqual(true)
      })

      describe('gracefully fails if the url does not point to a valid asset', () => {})
      describe('determines the version and asset type from the file', () => {})
      describe('gracefully fails if the version does not match up', () => {})
    })
    describe('The DIG parameter', () => {
      describe('defaults to false if not provided', () => {})
      describe('validates nested catalogs, collections or items if true', () => {})
      describe('ignores nested catalogs, collections, or items if set to false', () => {})
    })
    describe('The TYPE parameter', () => {
      describe('is a string', () => {})
      describe('provides an error if it is not one of "collection", "item", "catalog"', () => {})
    })

    describe('the version parameter', () => {
      describe('it must use an accepted version number', () => {})
      describe('it selects version v0.6.0 if no parameter is selected', () => {})
    })
  })
  describe('the VALIDATE FROM JSON method', () => {
    describe('accepts a "item" parameter', () => {})
    describe('accepts a "collection", parameter', () => {})
    describe('accepts a "catalog" parameter', () => {})
    describe('accepts a "dig" parameter', () => {})
    describe('accepts a "version" parameter', () => {})

    describe('gracefully fails if one of "item", "collection", or "catalog" not present', () => {})
    describe('gracefully failes when more of one of "item", "collection", or "catalog" is present', () => {})

    describe('the version parameter', () => {
      describe('defaults to the latest version when blank', () => {})
      describe('responds with an error if it fails to match a known version', () => {})
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
