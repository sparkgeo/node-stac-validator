const { head } = require('axios')

// Assumes that the link is a string through other checks
// TODO: Gracefully mention CORS errors as opposed to treating as full error
const ensureWorkingLink = async ({ link, location }) => {
  let error
  // Check ensures that test suite chooses not to spam a poor endpoint
  if (link !== 'valid-test') {
    await head(link).catch(() => {
      error = {
        type: 'not-working-link',
        message: `Unable to connect to the URL '${link}'`,
        location,
      }
    })
    return error
  }
}

module.exports = ensureWorkingLink
