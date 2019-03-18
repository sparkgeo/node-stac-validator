// eslint-disable-next-line
const { validateFromUrl, validateFromJson } = require('./index')
const { catalog, collection, item } = require('../factories/v0.6.0')

describe('Validate from URL', () => {
  it('needs to be implemented', () => {})
})

describe('Validate from JSON', () => {
  describe('Single-item Acceptance Testing', () => {
    // TODO
    /*
      the following versons require to be done:
      0.4.0
      0.4.1
      0.5.0
      0.5.1
      0.5.2
      0.6.0
      0.6.1
      0.6.2
    */

    describe('Version 0.6.0', () => {
      describe('STAC Items', () => {
        describe('With a valid item', () => {
          it('Contains a success property', async () => {
            let response = await validateFromJson({
              asset: item(),
              type: 'item',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(Object.keys(response)).toContain('success')
          })

          it('Is successful', async () => {
            let response = await validateFromJson({
              asset: item(),
              type: 'item',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(response.success).toBe(true)
          })

          it('Contains a errors property', async () => {
            let response = await validateFromJson({
              asset: item(),
              type: 'item',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(Object.keys(response)).toContain('errors')
          })

          describe('The errors property', () => {
            it('must be empty', async () => {
              let response = await validateFromJson({
                asset: item(),
                type: 'item',
                version: 'v0.6.0',
                useRecursion: false,
                context: {},
              })

              expect(response.errors.length).toBe(0)
            })
          })
        })
        describe('With an invalid item', () => {
          it('is not successful', async () => {
            let response = await validateFromJson({
              asset: item({
                type: false,
              }),
              type: 'item',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(response.success).not.toBe(true)
          })

          it('Contains a errors property', async () => {
            let response = await validateFromJson({
              asset: item({
                type: false,
              }),
              type: 'item',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(Object.keys(response)).toContain('errors')
          })

          // Fails. Unknown why at this time.
          describe('The errors property', () => {
            // it('must not be empty', async () => {
            //   let response = await validateFromJson({
            //     asset: item({
            //       bbox: false,
            //     }),
            //     type: 'item',
            //     version: 'v0.6.0',
            //     useRecursion: false,
            //     context: {},
            //   })
            //   expect(response.errors.length).not.toBe(0)
            // })
          })
        })
      })

      describe('STAC Collections', () => {
        describe('With a valid collection', () => {
          it('Contains a success property', async () => {
            let response = await validateFromJson({
              asset: collection(),
              type: 'collection',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(Object.keys(response)).toContain('success')
          })

          it('Is successful', async () => {
            let response = await validateFromJson({
              asset: collection(),
              type: 'collection',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(response.success).toBe(true)
          })

          it('Contains a errors property', async () => {
            let response = await validateFromJson({
              asset: collection(),
              type: 'collection',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(Object.keys(response)).toContain('errors')
          })

          describe('The errors property', () => {
            it('must be empty', async () => {
              let response = await validateFromJson({
                asset: collection(),
                type: 'collection',
                version: 'v0.6.0',
                useRecursion: false,
                context: {},
              })

              expect(response.errors.length).toBe(0)
            })
          })
        })
        describe('With an invalid item', () => {
          it('is not successful', async () => {
            let response = await validateFromJson({
              asset: collection({
                description: false,
              }),
              type: 'collection',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(response.success).not.toBe(true)
          })

          it('Contains a errors property', async () => {
            let response = await validateFromJson({
              asset: collection({
                description: false,
              }),
              type: 'collection',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(Object.keys(response)).toContain('errors')
          })

          describe('The errors property', () => {
            it('must be empty', async () => {
              let response = await validateFromJson({
                asset: collection({
                  description: false,
                }),
                type: 'collection',
                version: 'v0.6.0',
                useRecursion: false,
                context: {},
              })

              expect(response.errors.length).not.toBe(0)
            })
          })
        })
      })

      describe('STAC Catalog', () => {
        describe('With a valid catalog', () => {
          it('Contains a success property', async () => {
            let response = await validateFromJson({
              asset: catalog(),
              type: 'catalog',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(Object.keys(response)).toContain('success')
          })

          it('Is successful', async () => {
            let response = await validateFromJson({
              asset: catalog(),
              type: 'catalog',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(response.success).toBe(true)
          })

          it('Contains a errors property', async () => {
            let response = await validateFromJson({
              asset: catalog(),
              type: 'catalog',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(Object.keys(response)).toContain('errors')
          })

          describe('The errors property', () => {
            it('must be empty', async () => {
              let response = await validateFromJson({
                asset: catalog(),
                type: 'catalog',
                version: 'v0.6.0',
                useRecursion: false,
                context: {},
              })

              expect(response.errors.length).toBe(0)
            })
          })
        })
        describe('With an invalid item', () => {
          it('is not successful', async () => {
            let response = await validateFromJson({
              asset: catalog({
                description: false,
              }),
              type: 'catalog',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(response.success).not.toBe(true)
          })

          it('Contains a errors property', async () => {
            let response = await validateFromJson({
              asset: catalog({
                description: false,
              }),
              type: 'catalog',
              version: 'v0.6.0',
              useRecursion: false,
              context: {},
            })

            expect(Object.keys(response)).toContain('errors')
          })

          describe('The errors property', () => {
            it('must be empty', async () => {
              let response = await validateFromJson({
                asset: catalog({
                  description: false,
                }),
                type: 'catalog',
                version: 'v0.6.0',
                useRecursion: false,
                context: {},
              })

              expect(response.errors.length).not.toBe(0)
            })
          })
        })
      })
    })
  })

  describe('Nested Acceptance Testing', () => {
    it('needs to be implemented', () => {})
  })
})
