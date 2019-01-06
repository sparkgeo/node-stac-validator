const {
  ensureString,
  ensureContainsMandatoryKeys,
  ensureContainsAllowedKeys,
  ensureContainsAllowedValues,
  ensureWorkingLink,
} = require('../../helpers')

const verifyLinksArray = async ({ asset, location, parent } = {}) => {
  let containsRelSelf = false
  parent = parent || 'links'
  const urlChecks = []
  const errors = []
  const requiredKeys = ['rel', 'href']
  const allowedKeys = ['rel', 'href', 'type', 'title']

  for (let element of asset) {
    errors.push(
      ...ensureString({
        keys: allowedKeys,
        asset: element,
        location,
        parent,
      })
    )
    errors.push(
      ...ensureContainsMandatoryKeys({
        keys: requiredKeys,
        asset: element,
        parent,
        location,
      })
    )

    errors.push(
      ...ensureContainsAllowedKeys({
        allowedKeys,
        asset: element,
        parent,
        location,
      })
    )

    // Ensure rel element contains allowed values
    const allowedValues = [
      'self',
      'root',
      'parent',
      'child',
      'item',
      'license',
      'derived_from',
    ]

    errors.push(
      ensureContainsAllowedValues({
        allowedValues,
        asset: element,
        key: 'rel',
        parent,
        location,
      })
    )

    // Ensure that at least one element is a rel-self
    if (!containsRelSelf && element.rel && element.rel === 'self') {
      containsRelSelf = true
    }

    // Ensure that the href element is a string

    const mustBeStringKeys = ['href', 'rel']
    errors.push(
      ...ensureString({
        location,
        keys: mustBeStringKeys,
        asset: element,
      })
    )

    // Accumulate each of the links to check non-sequentially
    if (Object.keys(element).includes('href')) {
      urlChecks.push(ensureWorkingLink({ link: element.href, location }))
    }
  }

  if (!containsRelSelf) {
    errors.push({
      type: 'Missing Element',
      message: `There must be at least one "rel": "self" element in the links object.`,
      location,
    })
  }

  await Promise.all(urlChecks).then(result => errors.push(...result))
  return errors
}

module.exports = verifyLinksArray
