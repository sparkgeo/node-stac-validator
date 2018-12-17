// const index = require('./index')

describe('Testing suite', () => {
  const expected = true
  it('can equate true with true', () => {
    expect(true).toEqual(expected)
  })
  it('can refute false as not true', () => {
    expect(false).not.toEqual(expected)
  })
})
