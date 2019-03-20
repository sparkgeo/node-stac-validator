var fs = require('fs')
const chalk = require('chalk')
const { validateFromObject, validateFromUrl } = require('./modules')
const {
  // unknownFileLocation,
  malformedUrl,
} = require('./helpers/error-responses')

const log = console.log

const checkUrlGroup = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
const checkValidUrl = url => checkUrlGroup.test(url)

const successMessage = () => {
  log(`${chalk.green('Success')} -> The STAC asset is valid`)
}

const failMessage = errors => {
  errors.forEach(({ keyword, message }) => {
    log(chalk.red(keyword))
    log(message)
  })
  log('=======================================================')
}

const logMessage = response =>
  response.success ? successMessage : failMessage(response.errors)

const args = require('optimist')
  .usage('Validates a STAC asset.\nUsage: $0')
  .demand('l')
  .alias('l', 'location')
  .describe('l', 'The location of the asset')
  .demand('s')
  .alias('s', 'source')
  .describe('s', 'Source. Either "url" or "file"')
  .alias('t', 'type')
  .describe(
    't',
    'Asset type. Used for v0.6.0 onwards. Can be "catalog" (default), "item", of "collection"'
  )
  .demand('v')
  .alias('v', 'version')
  .describe('v', 'Version. Prepend with v: "v0.5.2"')
  .alias('t', 'traverse')
  .describe('t', 'Traverse all files referenced by asset. Set to "true"').argv

switch (args.s) {
  case 'url':
  case 'uri':
  case 'u':
    if (checkValidUrl(args.l)) {
      validateFromUrl({
        url: args.l,
        type: args.t,
        version: args.v,
      })
        .then(logMessage)
        .catch(log)
    } else {
      logMessage(malformedUrl(args.l))
    }
    break
  case 'file':
  case 'f':
    // TODO: 1) Check if valid location 2) Check if parsable
    var asset = JSON.parse(fs.readFileSync(args.l, 'utf8'))

    validateFromObject({
      asset,
      type: args.t,
      version: args.v,
    })
      .then(logMessage)
      .catch(log)
    break
  default:
    log('Invalid use of option "source". Please select "url" or "file"')
}

module.exports = {
  validateFromObject,
  validateFromUrl,
}
