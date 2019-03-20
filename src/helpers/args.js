module.exports = require('optimist')
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
