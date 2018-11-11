;(async () => {
  require('dotenv').config()
  const { stacStandard } = require('./helpers')

  // 1. Get the Stac versions

  // 2. Get the root file

  // 3. Validate the root file

  // 4. Recursion!

  const stacVersions = [
    'v0.4.0',
    'v0.4.1',
    'v0.5.0',
    'v0.5.1',
    'v0.5.2',
    'v0.6.0',
  ]

  const sampleStac =
    'https://cbers-stac.s3.amazonaws.com/CBERS4/MUX/057/122/catalog.json'

  const standard = await stacStandard('v0.6.0')

  console.log(standard.catalog)

  // <embed user provided code here>
})()
