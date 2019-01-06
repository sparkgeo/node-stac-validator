const ensureContainsAllowedValues = ({
  allowedValues,
  asset,
  key,
  parent,
  location,
} = {}) => {
  if (!allowedValues) {
    console.log('ERROR: Missing required element allowedValues. Cannot test')
    return
  }

  if (typeof allowedKeys === 'string') allowedValues = [allowedValues]

  if (allowedValues.indexOf(asset[key]) === -1) {
    return {
      type: 'Unpermitted value',
      message: `The ${parent} object does not permit a ${asset[key]} value`,
      url: location,
    }
  }
}

module.exports = ensureContainsAllowedValues
