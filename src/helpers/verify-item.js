const verifyItem = async ({ asset, version } = {}) => {
  const errors = []

  return errors.length > 0
    ? {
      success: false,
      errors,
    }
    : {
      success: true,
    }
}
module.exports = verifyItem
