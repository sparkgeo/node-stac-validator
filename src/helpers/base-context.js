const baseContext = {
  errorList: [],
  indicateError: error => console.log(error),
  indicateComplete: () => console.log('process finished'),
}

module.exports = baseContext
