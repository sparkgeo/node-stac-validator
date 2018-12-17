;(async() => {
  require('dotenv').config()

  // 1. Get the Stac versions

  // 2. Get the root file

  // 3. Validate the root file

  // 4. Recursion!

  // eslint-disable-next-line
  const stacVersions = [
    'v0.4.0',
    'v0.4.1',
    'v0.5.0',
    'v0.5.1',
    'v0.5.2',
    'v0.6.0',
  ]
  const { standards } = require('./samples')
  let errors = []

  // Acquire file
  let fileType = 'catalog'
  const data = require('./samples').data.catalog

  // Determine whether file is catalog/item/collection

  if ('assets' in data || 'geometry' in data) {
    fileType = 'item'
  }

  // Determine whether file has stac_version element
  // TODO determine whether stac version is an approved one
  if (!('stac_version' in data)) {
    // return fail
  }

  console.log(`Standards -> ${standards}`)

  const standard = standards[data.stac_version][fileType]

  // First iteration of the verification for key mechanism
  // TODO: Extend so that every time this fails, it sends a message
  const checkForElement = stacElements => requiredElement =>
    stacElements.includes(requiredElement)
      ? null
      : {
        error: 'missing an element here...',
        requiredElement,
      }

  // Validate existence of required elements
  console.log('standard -> ', standard)
  const { required } = standard
  errors = required.map(checkForElement(Object.keys(data))).filter(i => i)
  console.log('Listing errors => ', errors)

  // Validate content of the required elements
  console.log('Testing content of the required elements')
  Object.keys(data).forEach(element => {
    // TODO: verify whether element type matches what it should be

    // TODO: Verify whether element contains required elements
    const values = data[element]
    console.log(`values from the data element ${element} -> `, values)
  })

  // Go into the links of the catalog
  if (data.links && Array.isArray(data.links)) {
    // Do a test of the stac element's content (recursion)
    data.links.forEach(linkElem => {
      switch (linkElem.rel) {
        case 'item':
          console.log('part under construction')
          // verifyFile({href: linkItem.href, type: linkItem.rel})
          break
        case 'catalog':
          console.log('part under construction')
          // verifyFile({href: linkItem.href, type: linkItem.rel})
          break
        case 'collection':
          console.log('part under construction')
          // verifyFile({href: linkItem.href, type: linkItem.rel})
          break
      }
    })
  }
  // Validate whether other elements should be included(?)

  // Validate children elements

  console.log(standard.catalog)
})()
