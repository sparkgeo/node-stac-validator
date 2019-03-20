#!/usr/bin/env node

const chalk = require('chalk')

const { validateFromObject, validateFromUrl } = require('./modules')

const log = console.log
const args = process.argv

// usage represents the help guide
const usage = function() {
  const usageText = `
  Validates a stac asset. 2019, Sparkgeo.

  usage:

    node-stacvalidator <url> <type> <version>

  Arguments:

    url:      Location of the STAC to be validated
    type:     Type of asset being verified. Valid entries are "item", "catalog" and "collection"
    version:  Version of the asset. Valid format: "v0.6.2"
  `

  console.log(usageText)
}

// // used to log errors to the console in red color
// function errorLog(error) {
//   const eLog = chalk.red(error)
//   console.log(eLog)
// }

log('Number of args -> ', args.length)
// we make sure the length of the arguments is exactly three
if (args.length === 5) {
  const url = args[2]
  const type = args[3]
  const version = args[4]

  log('url -> ', url)
  log('type -> ', type)
  log('version -> ', version)

  validateFromUrl({
    url,
    type,
    version,
  })
    .then(response => {
      if (response.success) {
        log(`${chalk.green('Success')} -> The STAC asset is valid`)
      } else {
        log(
          `${chalk.red(
            'Sorry ->'
          )} The asset is not valid. Here are the listed errors:`
        )
        log('=======================================================')
        response.errors.forEach(item => {
          log(chalk.red(item.keyword))
          log(item.message)
        })
        log('=======================================================')
      }
    })
    .catch(log)
} else {
  usage()
}

module.exports = {
  validateFromObject,
  validateFromUrl,
}
