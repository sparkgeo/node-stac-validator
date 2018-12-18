const verifyCollection = async ({ asset } = {}) => {
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

module.exports = verifyCollection
