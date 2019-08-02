const { validateFromUrl } = require('../src/index.js')
let url = 'https://s3.amazonaws.com/spacenet-stac/spacenet-repository.json'
let type = 'catalog'
let version = '0.6.0'
let useRecursion = true

validateFromUrl({ url, type, version, useRecursion })
  .then(result => {
    console.log('Response -> ', result)
    result.responses.forEach(({ location, valid, errors }) => {
      console.log(`Validity for location ${location} -> ${valid}`)
      console.log(errors)
    })
  })
  .catch(e => {
    console.log('Error -> ', e)
  })
