// eslint-disable-next-line
const { validateFromUrl, validateFromJson } = require('./index')
const { collection } = require('../factories/v0.6.0')

describe('Validate from URL', () => {
  it('needs to be implemented', () => {})
})

describe('Validate from JSON', () => {
  describe('Single-item Acceptance Testing', () => {
    describe('Version 0.6.0', () => {
      describe('STAC Items', () => {
        describe('With a valid item', () => {
          it('needs to be implemented', () => {})
        })
        describe('With an invalid item', () => {
          it('needs to be implemented', () => {})
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
      describe('STAC Catalogues', () => {
        describe('With a valid item', () => {
          it('needs to be implemented', () => {})
        })
        describe('With an invalid item', () => {
          it('needs to be implemented', () => {})
        })
      })
    })
  })

  describe('Nested Acceptance Testing', () => {
    it('needs to be implemented', () => {})
  })
})
