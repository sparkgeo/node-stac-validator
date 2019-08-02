const baseContext = checkNested => ({
  checkNested,
  onFinish: null,
  success: true,
  responses: [],
  testedUrls: [],
})

module.exports = baseContext
