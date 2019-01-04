const { DateTime } = require('luxon')

const ensureValidTime = ({ asset, location, parent } = {}) => {
  if (asset === null) return
  if (typeof asset === 'string') {
    const { invalid } = DateTime.fromISO(asset)

    if (invalid === null) return

    return {
      type: 'Incorrect timestamp value',
      url: location,
      message: invalid.explanation,
    }
  }

  return {
    type: 'Incorrect timestamp value',
    message: `Timestamps in ${parent} must be either null, or a valid timestring`,
    url: location,
  }
}

module.exports = ensureValidTime
