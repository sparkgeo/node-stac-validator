const verifyCollection = require('./verify-collection', () => {})
// eslint-disable-next-line
const { collection } = require('../../factories')

// TODO: Move to factories...
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

    it('must include a "license" key', async () => {
      const asset = collection({
        id: true,
        description: true,
        extent: true,
        stac_version: true,
      })

      const { errors } = await verifyCollection({
        asset,
        location,
        useRecursion,
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
        id: true,
        description: true,
        license: true,
        stac_version: true,
      })

      const { errors } = await verifyCollection({
        asset,
        location,
        useRecursion,
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
        id: true,
        description: true,
        extent: true,
        stac_version: true,
      })

      const { errors } = await verifyCollection({
        asset,
        location,
        useRecursion,
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
        id: true,
        description: true,
        stac_version: true,
        license: true,
        extent: true,
        links: true,
        extraElement: true,
      })

      const { success } = await verifyCollection({
        asset,
        location,
        useRecursion,
        useVersion,
      })

      expect(success).toEqual(false)
    })
  })

  describe('the ID field', () => {
    it('must be a string', async () => {
      const asset = collection({
        id: 123,
        description: true,
        extent: true,
        stac_version: true,
      })

      const { errors } = await verifyCollection({
        asset,
        location,
        useRecursion,
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
        id: true,
        description: true,
        license: 1234,
        extent: true,
        stac_version: true,
      })

      const { errors } = await verifyCollection({
        asset,
        location,
        useRecursion,
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
          id: true,
          description: true,
          license: 1234,
          extent: true,
          stac_version: true,
          providers: { foo: 'bar' },
        })

        const { errors } = await verifyCollection({
          asset,
          location,
          useRecursion,
          useVersion,
        })

        expect(errors).not.toEqual(undefined)
      })
      it('passes when is an array', async () => {
        const asset = collection({
          id: true,
          description: true,
          license: true,
          extent: true,
          links: true,
          stac_version: true,
          providers: true,
        })

        const { errors } = await verifyCollection({
          asset,
          location,
          useRecursion,
          useVersion,
        })

        expect(errors).toEqual(undefined)
      })
    })

    describe('it must only contain objects', () => {
      it('fails when there is a non-object within', async () => {
        const asset = collection({
          id: true,
          description: true,
          license: true,
          extent: true,
          links: true,
          stac_version: true,
          providers: [true, { name: '123' }],
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useRecursion,
          useVersion,
        })

        expect(success).toEqual(false)
      })

      it('passes when there is only objects', async () => {
        const asset = collection({
          id: true,
          description: true,
          license: true,
          extent: true,
          links: true,
          stac_version: true,
          providers: true,
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useRecursion,
          useVersion,
        })

        expect(success).toEqual(true)
      })
    })

    describe('it indicates which object in the array fails', () => {})

    it("doesn't give an error when is not provided", async () => {
      const asset = collection({
        id: true,
        description: true,
        license: true,
        extent: true,
        links: true,
        stac_version: true,
      })

      const { success } = await verifyCollection({
        asset,
        location,
        useRecursion,
        useVersion,
      })

      expect(success).toEqual(true)
    })

    describe('must include a name key', () => {
      it('gives an error if missing', async () => {
        const asset = collection({
          id: true,
          description: true,
          license: true,
          extent: true,
          links: true,
          stac_version: true,
          providers: [{}],
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useRecursion,
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
            id: true,
            description: true,
            license: true,
            links: true,
            extent: true,
            stac_version: true,
            providers: [
              {
                name: 123,
              },
            ],
          })

          const { errors } = await verifyCollection({
            asset,
            location,
            useRecursion,
            useVersion,
          })

          expect(errors).not.toEqual(undefined)
        })

        it('it returns no errors when name is a string', async () => {
          const asset = collection({
            id: true,
            description: true,
            license: true,
            links: true,
            extent: true,
            stac_version: true,
            providers: [
              {
                name: 'name',
              },
            ],
          })

          const { errors } = await verifyCollection({
            asset,
            location,
            useRecursion,
            useVersion,
          })

          expect(errors).toEqual(undefined)
        })
      })

      describe('must contain only "name", "description", "roles", and "url"', () => {
        it('returns an error when there is an extra key', async () => {
          const asset = collection({
            id: true,
            description: true,
            license: true,
            links: true,
            extent: true,
            stac_version: true,
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
            useRecursion,
            useVersion,
          })

          expect(errors).not.toEqual(undefined)
        })
        it('returns no errors when it lacks an extra key', async () => {
          const asset = collection({
            id: true,
            description: true,
            license: true,
            links: true,
            extent: true,
            stac_version: true,
            providers: true,
          })

          const { errors } = await verifyCollection({
            asset,
            location,
            useRecursion,
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
            id: true,
            description: true,
            license: true,
            links: true,
            extent: true,
            stac_version: true,
            providers: {
              name: 'name',
              roles: 1234,
            },
          })

          const { errors } = await verifyCollection({
            asset,
            location,
            useRecursion,
            useVersion,
          })

          expect(errors).not.toEqual(undefined)
        })

        it('returns no errors when it is an array', async () => {
          const asset = collection({
            id: true,
            description: true,
            license: true,
            links: true,
            extent: true,
            stac_version: true,
            providers: true,
          })

          const { errors } = await verifyCollection({
            asset,
            location,
            useRecursion,
            useVersion,
          })

          expect(errors).toEqual(undefined)
        })
      })
      describe('the array elements', () => {
        describe('must only contain strings', () => {
          it('returns an error if any element is not a string', async () => {
            const asset = collection({
              id: true,
              description: true,
              license: true,
              links: true,
              extent: true,
              stac_version: true,
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
              useRecursion,
              useVersion,
            })

            expect(errors).not.toEqual(undefined)
          })
          it('returns no errors if the array only contains strings', async () => {
            const asset = collection({
              id: true,
              description: true,
              license: true,
              links: true,
              extent: true,
              stac_version: true,
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
              useRecursion,
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
          id: true,
          description: true,
          license: true,
          links: true,
          extent: true,
          stac_version: true,
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
          useRecursion,
          useVersion,
        })

        expect(errors).toEqual(undefined)
      })
      it('returns an error if the URL is invalid', async () => {
        const asset = collection({
          id: true,
          description: true,
          license: true,
          links: true,
          extent: true,
          stac_version: true,
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
          useRecursion,
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
          id: true,
          description: true,
          license: true,
          links: true,
          extent: 123,
          stac_version: true,
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
          useRecursion,
          useVersion,
        })

        expect(errors).not.toEqual(undefined)
      })

      it('returns no error when is an object', async () => {
        const asset = collection({
          id: true,
          description: true,
          license: true,
          links: true,
          extent: true,
          stac_version: true,
          providers: [
            {
              name: 'name',
              roles: ['test', 'true', '12345'],
            },
          ],
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useRecursion,
          useVersion,
        })

        expect(success).toEqual(true)
      })
    })

    describe('must contain a spatial element', () => {
      it('passes when it element is present', async () => {
        const asset = collection({
          id: true,
          description: true,
          license: true,
          links: true,
          extent: true,
          stac_version: true,
          providers: [
            {
              name: 'name',
              roles: ['test', 'true', '12345'],
            },
          ],
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useRecursion,
          useVersion,
        })

        expect(success).toEqual(true)
      })
      it('fails when the element is missing', async () => {
        const asset = collection({
          id: true,
          description: true,
          license: true,
          links: true,
          extent: {
            temporal: '0',
          },
          stac_version: true,
          providers: [
            {
              name: 'name',
              roles: ['test', 'true', '12345'],
            },
          ],
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useRecursion,
          useVersion,
        })
        expect(success).toEqual(false)
      })
    })

    describe('must contain a temporal element', () => {
      it('passes when it element is present', async () => {
        const asset = collection({
          id: true,
          description: true,
          license: true,
          links: true,
          extent: true,
          stac_version: true,
          providers: [
            {
              name: 'name',
              roles: ['test', 'true', '12345'],
            },
          ],
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useRecursion,
          useVersion,
        })

        expect(success).toEqual(true)
      })
      it('fails when the element is missing', async () => {
        const asset = collection({
          id: true,
          description: true,
          license: true,
          links: true,
          extent: {
            spatial: [0, 0, 1, 1],
          },
          stac_version: true,
          providers: [
            {
              name: 'name',
              roles: ['test', 'true', '12345'],
            },
          ],
        })

        const { success } = await verifyCollection({
          asset,
          location,
          useRecursion,
          useVersion,
        })

        expect(success).toEqual(false)
      })
    })

    describe('the SPATIAL element', () => {
      describe('must be an array', () => {
        it('passes when it is an array', async () => {})
        it('fails when it is not an array', async () => {})
      })
      describe('must contain four or six elements', () => {
        it('passes when it contains four elements', async () => {})
        it('passes when it contains six elements', async () => {})
        it('fails when it contains any other number of elements', async () => {})
        describe('each element should be a number', () => {
          it('passes when each element is a number', async () => {})
          it('fails when each element is not a number', async () => {})
        })
      })
    })
    describe('the TEMPORAL element', () => {
      describe('each value', () => {
        describe('must be a null or a valid timestring or null', () => {})
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
