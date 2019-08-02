// eslint-disable-next-line
const { validateFromUrl } = require('./index')
// const { catalog, collection, item } = require('../../factories/v0.6.0')

let url = 'https://cbers-stac.s3.amazonaws.com/CBERS4/catalog.json'
let type = 'catalog'
let version = '0.5.2'
let useRecursion = true

const foo = [
  {
    valid: true,
    errors: [],
    location: 'https://cbers-stac.s3.amazonaws.com/CBERS4/catalog.json',
  },
  {
    keyword: 'Bad link',
    message: 'Unable to connect to MUX/catalog.json',
  },
  {
    keyword: 'Bad link',
    message: 'Unable to connect to AWFI/catalog.json',
  },
]

describe('Validate from URL', () => {
  describe('when using recursion', () => {
    it('should have the proper keys on the first responses object', async () => {
      const { responses } = await validateFromUrl({
        url,
        type,
        version,
        useRecursion,
      })

      expect(Object.keys(responses[0]).indexOf('keyword')).toBe(-1)
    })
    it('should return success', async () => {
      const { success } = await validateFromUrl({
        url,
        type,
        version,
        useRecursion,
      })
      expect(success).toBe(true)
    })
    it('should have the proper keys on all the subsequent responses objects', async () => {
      const { responses } = await validateFromUrl({
        url,
        type,
        version,
        useRecursion,
      })

      console.log('Responses second position ->> ', responses[1])

      expect(Object.keys(responses[1]).indexOf('keyword')).toBe(-1)
    })
  })
  it('needs to be implemented', () => {})
})
