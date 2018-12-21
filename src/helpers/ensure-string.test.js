const { lorem } = require('faker')
const { ensureString } = require('.')

describe('Ensure String helper', () => {
  it('returns an object if there is no string', async () => {
    const keys = ['a']
    const obj = {
      a: 123,
    }
    const location = lorem.word()

    const response = ensureString({
      keys,
      obj,
      location,
    })
    expect(typeof response[0]).toEqual('object')
  })

  it('returns nothing if there is a string contained in the right place', async () => {
    const keys = ['a']
    const obj = {
      a: '123',
    }
    const location = lorem.word()

    const response = ensureString({
      keys,
      obj,
      location,
    })
    expect(response).toEqual([undefined])
  })

  it('returns a message of "The "X" element must be a string"', async () => {
    const keys = ['a']
    const obj = {
      a: 123,
    }
    const location = lorem.word()

    const response = ensureString({
      keys,
      obj,
      location,
    })
    expect(response[0].message).toEqual('The "a" element must be a string')
  })

  describe('with a parent element', () => {
    it('returns a message of "The "X" element of "Y" must be a string"', async () => {
      const keys = ['x']
      const parent = 'y'
      const obj = {
        x: 123,
      }
      const location = lorem.word()

      const response = ensureString({
        keys,
        obj,
        location,
        parent,
      })

      expect(response[0].message).toEqual(
        'The "x" element of "y" must be a string'
      )
    })
  })
})
