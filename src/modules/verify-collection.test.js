/* ACCEPTANCE TESTING

The purpose of this test is to ensure that what I carry out is in accordance
with the standard, as well as to ensure the scripts maintain their use
when I switch from statically testing each object to testing each object
in contrast to a JSON schema provided by radiant-earth.

These tests are based on the interpretation of the following:
https://github.com/radiantearth/stac-spec/blob/v0.6.0/collection-spec/collection-spec.md

PATTERNS:

describe (the element) -> describe (the sub element, repeated) -> describe (what it should do) -> it(will pass/will fail if...)

*/
const { lorem } = require('faker')
const verifyCollection = require('./verify-collection', () => {})
// eslint-disable-next-line
const { collection } = require('../../factories')

// TODO: Move to factories...
const location = 'json'
const useVersion = 'v0.6.0'

describe('collection STAC Verification for V0.6.0', () => {
  describe('Base elements of the STAC collection', () => {
    describe('must include the "stac_version" element', () => {
      it('fails when missing', async () => {
        const asset = collection({
          stac_version: false,
        })

        const { errors } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        const message = 'The "stac_version" element is missing'
        const messageIndex =
          errors.length > 0
            ? errors
              .map(i => {
                if (i) {
                  return i.message
                }
              })
              .indexOf(message)
            : -1

        expect(messageIndex).not.toEqual(-1)
      })
    })

    describe('must include an "ID" field', () => {
      describe('must include an "id" field', () => {
        it('fails when missing', async () => {
          const asset = collection({
            id: false,
          })

          const { errors } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          const message = 'The "id" element is missing'
          const messageIndex =
            errors.length > 0
              ? errors
                .map(i => {
                  if (i) {
                    return i.message
                  }
                })
                .indexOf(message)
              : -1

          expect(messageIndex).not.toEqual(-1)
        })
      })
    })

    describe('must include a "description" element', () => {
      it('fails when not present', async () => {
        const asset = collection({
          description: false,
        })

        const { errors } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        const message = 'The "description" element is missing'
        const messageIndex =
          errors.length > 0
            ? errors
              .map(i => {
                if (i) {
                  return i.message
                }
              })
              .indexOf(message)
            : -1

        expect(messageIndex).not.toEqual(-1)
      })
    })

    it('must include a "license" key', async () => {
      const asset = collection({
        license: false,
      })

      const { errors } = await verifyCollection({
        asset,
        location,

        useVersion,
      })

      const message = 'The "license" element is missing'
      const messageIndex =
        errors.length > 0
          ? errors
            .map(i => {
              if (i) {
                return i.message
              }
            })
            .indexOf(message)
          : -1

      expect(messageIndex).not.toEqual(-1)
    })

    it('must include an "extent" key', async () => {
      const asset = collection({
        extent: false,
      })

      const { errors } = await verifyCollection({
        asset,
        location,

        useVersion,
      })

      const message = 'The "extent" element is missing'
      const messageIndex =
        errors.length > 0
          ? errors
            .map(i => {
              if (i) {
                return i.message
              }
            })
            .indexOf(message)
          : -1

      expect(messageIndex).not.toEqual(-1)
    })

    it('must include a "links" key', async () => {
      const asset = collection({
        links: false,
      })

      const { errors } = await verifyCollection({
        asset,
        location,

        useVersion,
      })

      const message = 'The "links" element is missing'
      const messageIndex =
        errors.length > 0
          ? errors
            .map(i => {
              if (i) {
                return i.message
              }
            })
            .indexOf(message)
          : -1

      expect(messageIndex).not.toEqual(-1)
    })

    it('must have no other elements either than the above, or "keywords", "version", "providers"', async () => {
      const asset = collection({
        extraElement: true,
      })

      const { success } = await verifyCollection({
        asset,
        location,

        useVersion,
      })

      expect(success).toEqual(false)
    })
  })

  describe('the ID field', () => {
    it('must be a string', async () => {
      const asset = collection({
        id: 123,
      })

      const { errors } = await verifyCollection({
        asset,
        location,

        useVersion,
      })

      const message = 'The "id" element must be a string'
      const messageIndex =
        errors.length > 0
          ? errors
            .map(i => {
              if (i) {
                return i.message
              }
            })
            .indexOf(message)
          : -1

      expect(messageIndex).not.toEqual(-1)
    })
    it('must be able to detect duplicate IDs for collections', async () => {})
  })

  describe('The LICENSE element', () => {
    it('must be a string', async () => {
      const asset = collection({
        license: 1234,
      })

      const { errors } = await verifyCollection({
        asset,
        location,

        useVersion,
      })

      const message = 'The "license" element must be a string'
      const messageIndex =
        errors.length > 0
          ? errors
            .map(i => {
              if (i) {
                return i.message
              }
            })
            .indexOf(message)
          : -1

      expect(messageIndex).not.toEqual(-1)
    })
    it('must either be proprietary or in SPDX-compliant format', async () => {})
  })

  describe('The PROVIDERS element', () => {
    describe('it must be an array', () => {
      it('provides a failure when not an array', async () => {
        const asset = collection({
          providers: { foo: 'bar' },
        })

        const { errors } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(errors).not.toEqual(undefined)
      })
      it('passes when is an array', async () => {
        const asset = collection()

        const { errors } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(errors).toEqual(undefined)
      })
    })

    describe('it must only contain objects', () => {
      it('fails when there is a non-object within', async () => {
        const asset = collection({
          providers: [true, { name: '123' }],
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(success).toEqual(false)
      })

      it('passes when there is only objects', async () => {
        const asset = collection()

        const { success } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(success).toEqual(true)
      })
    })

    it('passes without a providers element', async () => {
      const asset = collection({
        providers: false,
      })

      const { success } = await verifyCollection({
        asset,
        location,

        useVersion,
      })

      expect(success).toEqual(true)
    })

    describe('must include a name key', () => {
      it('gives an error if missing', async () => {
        const asset = collection({
          providers: [{}],
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(success).toEqual(false)
      })
    })

    it('must include no other keys than "description", "roles", "url", or "key"', async () => {})

    describe('The NAME element', () => {
      describe('must be a string', () => {
        it('it returns an error when name is a number', async () => {
          const asset = collection({
            providers: [
              {
                name: 123,
              },
            ],
          })

          const { errors } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(errors).not.toEqual(undefined)
        })

        it('it returns no errors when name is a string', async () => {
          const asset = collection()

          const { errors } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(errors).toEqual(undefined)
        })
      })

      describe('must contain only "name", "description", "roles", and "url"', () => {
        it('returns an error when there is an extra key', async () => {
          const asset = collection({
            providers: [
              {
                name: 'name',
                fail: true,
              },
            ],
          })

          const { errors } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(errors).not.toEqual(undefined)
        })
        it('returns no errors when it lacks an extra key', async () => {
          const asset = collection()

          const { errors } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(errors).toEqual(undefined)
        })
      })
    })

    describe('the ROLES element', () => {
      describe('must be an array', () => {
        it('returns errors when it is not an array', async () => {
          const asset = collection({
            providers: {
              name: 'name',
              roles: 1234,
            },
          })

          const { errors } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(errors).not.toEqual(undefined)
        })

        it('returns no errors when it is an array', async () => {
          const asset = collection()

          const { errors } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(errors).toEqual(undefined)
        })
      })
      describe('the array elements', () => {
        describe('must only contain strings', () => {
          it('returns an error if any element is not a string', async () => {
            const asset = collection({
              providers: [
                {
                  name: 'name',
                  roles: ['test', true, 12345],
                },
              ],
            })

            const { errors } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(errors).not.toEqual(undefined)
          })
          it('returns no errors if the array only contains strings', async () => {
            const asset = collection({
              providers: [
                {
                  name: 'name',
                  roles: ['test', 'true', '12345'],
                },
              ],
            })

            const { errors } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(errors).toEqual(undefined)
          })
        })
      })
    })

    describe('the URL element', () => {
      it('returns no errors if the URL is valid', async () => {
        const asset = collection({
          providers: [
            {
              name: 'name',
              roles: ['test', 'true', '12345'],
              url: 'http://httpbin.org',
            },
          ],
        })

        const { errors } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(errors).toEqual(undefined)
      })
      it('returns an error if the URL is invalid', async () => {
        const asset = collection({
          providers: [
            {
              name: 'name',
              roles: ['test', 'true', '12345'],
              url: 'https://bob.bob',
            },
          ],
        })

        const { errors } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(errors).not.toEqual(undefined)
      })
    })
  })

  describe('The EXTENT element', () => {
    describe('must be an object', () => {
      it('returns an error when not an object', async () => {
        const asset = collection({
          extent: 123,
        })

        const { errors } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(errors).not.toEqual(undefined)
      })

      it('returns no error when is an object', async () => {
        const asset = collection()

        const { success } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(success).toEqual(true)
      })
    })

    describe('must contain a spatial element', () => {
      it('passes when it element is present', async () => {
        const asset = collection()

        const { success } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(success).toEqual(true)
      })
      it('fails when the element is missing', async () => {
        const asset = collection({
          extent: {
            temporal: '0',
          },
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useVersion,
        })
        expect(success).toEqual(false)
      })
    })

    describe('must contain a temporal element', () => {
      it('passes when it element is present', async () => {
        const asset = collection()

        const { success } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(success).toEqual(true)
      })
      it('fails when the element is missing', async () => {
        const asset = collection({
          extent: {
            spatial: [0, 0, 1, 1],
          },
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(success).toEqual(false)
      })
    })

    describe('the SPATIAL element', () => {
      describe('must be an array', () => {
        it('passes when it is an array', async () => {
          const asset = collection()

          const { success } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(success).toEqual(true)
        })

        it('fails when it is not an array', async () => {
          const asset = collection({
            extent: {
              spatial: false,
              temporal: 'bob',
            },
          })

          const { success } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(success).toEqual(false)
        })
      })
      describe('must contain four or six elements', () => {
        it('passes when it contains four elements', async () => {
          const asset = collection({
            extent: {
              spatial: [1, 2, 3, 4],
              temporal: [null, null],
            },
          })

          const { success } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(success).toEqual(true)
        })
        it('passes when it contains six elements', async () => {
          const asset = collection({
            extent: {
              spatial: [1, 2, 3, 4, 5, 6],
              temporal: [null, null],
            },
          })

          const { success } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(success).toEqual(true)
        })
        it('fails when it contains any other number of elements', async () => {
          const asset = collection({
            extent: {
              spatial: [1, 2, 3, 4, 5, 6, 7],
              temporal: [null, null],
            },
          })

          const { success } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(success).toEqual(false)
        })

        describe('each element should be a number', () => {
          it('passes when each element is a number', async () => {
            const asset = collection({
              extent: {
                spatial: [1, 2, 3, 4, 5, 6],
                temporal: [null, null],
              },
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(true)
          })

          it('fails when each element is not a number', async () => {
            const asset = collection({
              extent: {
                spatial: ['bob', 2, 3, 4, 5, 6],
                temporal: [null, null],
              },
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(false)
          })
        })
      })
    })
    describe('the TEMPORAL element', () => {
      describe('each value', () => {
        describe('must be a valid timestring or null', () => {
          it('passes when valid or null', async () => {
            const asset = collection()

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(true)
          })
          it('fails when it is not a string or a null', async () => {
            const asset = collection({
              extent: {
                spatial: [1, 2, 3, 4, 5, 6],
                temporal: [1, 2],
              },
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(false)
          })
          it('fails when not a valid timestring', async () => {
            const asset = collection({
              extent: {
                spatial: [1, 2, 3, 4, 5, 6],
                temporal: ['july 12 1932 I like hamburgers', null],
              },
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(false)
          })
        })
      })
    })
  })

  describe('The LINKS element', () => {
    describe('must be an array', () => {
      it('passes when it is an array', async () => {
        const asset = collection()

        const { success } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(success).toEqual(true)
      })
      it('fails when it is an object', async () => {
        const asset = collection({
          links: {},
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(success).toEqual(false)
      })
    })
    describe('must be an array of objects', () => {
      it('passes when is an array of objects', async () => {
        const asset = collection()

        const { success } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(success).toEqual(true)
      })
      it('fails when it is an array of strings', async () => {
        const asset = collection({
          links: [lorem.word(), lorem.word()],
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useVersion,
        })

        expect(success).toEqual(false)
      })
    })
    describe('each element within', () => {
      describe('must contain an "href" element', () => {
        it('passes when href is present', async () => {
          const asset = collection()

          const { success } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(success).toEqual(true)
        })
        it('fails when href is missing', async () => {
          const asset = collection({
            links: [
              {
                rel: 'self',
              },
            ],
          })

          const { success } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(success).toEqual(false)
        })
      })

      describe('must contain a "rel" element', () => {
        it('passes when rel is present', async () => {
          const asset = collection()

          const { success } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(success).toEqual(true)
        })
        it('fails when rel is missing', async () => {
          const asset = collection({
            links: [
              {
                href: 'valid-test',
              },
            ],
          })

          const { success } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(success).toEqual(false)
        })
      })

      describe('should contain no other element aside the above, or "type" and "title"', () => {
        it('passes when only containing the allowed assets', async () => {
          const asset = collection({
            links: [
              {
                href: 'valid-test',
                rel: 'self',
                type: lorem.word(),
                title: lorem.word(),
              },
            ],
          })

          const { success } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(success).toEqual(true)
        })
        it('fails when it contains an extra element', async () => {
          const asset = collection({
            links: [
              {
                href: 'valid-test',
                rel: 'self',
                type: lorem.word(),
                title: lorem.word(),
                failingElement: lorem.word(),
              },
            ],
          })

          const { success } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(success).toEqual(false)
        })
      })

      describe('must contain no less than one rel element with value "self"', () => {
        it('passes when it has one object with rel value self', async () => {
          const asset = collection()

          const { success } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(success).toEqual(true)
        })

        it('fails when it has one valid ref value that is other than self', async () => {
          const asset = collection({
            links: [
              {
                href: 'valid-test',
                rel: 'root',
                type: lorem.word(),
                title: lorem.word(),
              },
            ],
          })

          const { success } = await verifyCollection({
            asset,
            location,
            useVersion,
          })

          expect(success).toEqual(false)
        })
      })

      describe('The HREF element', () => {
        describe('must be a string', () => {
          it('passes when it is a string', async () => {
            const asset = collection()

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(true)
          })

          it('fails when it is a number', async () => {
            const asset = collection({
              links: [
                {
                  href: 123,
                  rel: 'self',
                  type: lorem.word(),
                  title: lorem.word(),
                },
              ],
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(false)
          })
        })

        describe('must connect to an existing url', () => {
          it('passes if url is valid', async () => {
            const asset = collection()

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(true)
          })

          it('fails if url is invalid', async () => {
            const asset = collection({
              links: [
                {
                  href: 'http://bob.bob',
                  rel: 'self',
                  type: lorem.word(),
                  title: lorem.word(),
                },
              ],
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(false)
          })
        })
      })

      describe('the REL element', () => {
        describe('must be a string', () => {
          it('passes when a string is used', async () => {
            const asset = collection()

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(true)
          })
          it('fails when a number is used', async () => {
            const asset = collection({
              links: [
                {
                  href: 'valid-test',
                  rel: 1233,
                  type: lorem.word(),
                  title: lorem.word(),
                },
              ],
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(false)
          })
        })
        describe('should only be a "self", "root", "parent", "child", "item", "license", "derived_from"', () => {
          it('passes if it is self', async () => {
            const asset = collection()

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(true)
          })

          it('passes if a second is root', async () => {
            const asset = collection({
              links: [
                {
                  href: 'valid-test',
                  rel: 'self',
                  type: lorem.word(),
                  title: lorem.word(),
                },
                {
                  href: 'valid-test',
                  rel: 'root',
                  type: lorem.word(),
                  title: lorem.word(),
                },
              ],
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(true)
          })

          it('passes if a second is parent', async () => {
            const asset = collection({
              links: [
                {
                  href: 'valid-test',
                  rel: 'self',
                  type: lorem.word(),
                  title: lorem.word(),
                },
                {
                  href: 'valid-test',
                  rel: 'parent',
                  type: lorem.word(),
                  title: lorem.word(),
                },
              ],
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(true)
          })
          it('passes if a second is child', async () => {
            const asset = collection({
              links: [
                {
                  href: 'valid-test',
                  rel: 'self',
                  type: lorem.word(),
                  title: lorem.word(),
                },
                {
                  href: 'valid-test',
                  rel: 'child',
                  type: lorem.word(),
                  title: lorem.word(),
                },
              ],
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(true)
          })
          it('passes if a second is item', async () => {
            const asset = collection({
              links: [
                {
                  href: 'valid-test',
                  rel: 'self',
                  type: lorem.word(),
                  title: lorem.word(),
                },
                {
                  href: 'valid-test',
                  rel: 'item',
                  type: lorem.word(),
                  title: lorem.word(),
                },
              ],
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(true)
          })
          it('passes if a second is license', async () => {
            const asset = collection({
              links: [
                {
                  href: 'valid-test',
                  rel: 'self',
                  type: lorem.word(),
                  title: lorem.word(),
                },
                {
                  href: 'valid-test',
                  rel: 'license',
                  type: lorem.word(),
                  title: lorem.word(),
                },
              ],
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(true)
          })
          it('passes if a second is derived_from', async () => {
            const asset = collection({
              links: [
                {
                  href: 'valid-test',
                  rel: 'self',
                  type: lorem.word(),
                  title: lorem.word(),
                },
                {
                  href: 'valid-test',
                  rel: 'derived_from',
                  type: lorem.word(),
                  title: lorem.word(),
                },
              ],
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(true)
          })
          it('fails if a second is something else', async () => {
            const asset = collection({
              links: [
                {
                  href: 'valid-test',
                  rel: 'self',
                  type: lorem.word(),
                  title: lorem.word(),
                },
                {
                  href: 'valid-test',
                  rel: lorem.word(),
                  type: lorem.word(),
                  title: lorem.word(),
                },
              ],
            })

            const { success } = await verifyCollection({
              asset,
              location,
              useVersion,
            })

            expect(success).toEqual(false)
          })
        })
      })
    })
  })
})

// NOT included
/*
- Child catalogs and items must contain the same stac version

*/
