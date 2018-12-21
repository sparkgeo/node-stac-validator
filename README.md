# NodeJS Stac Validator

Validates a spatial temporal catalog asset based on the specs laid out by [Radiant Earth](https://github.com/radiantearth/stac-spec/tree/v0.6.0).

## Goals

- This should become an NPM package
- The response should be asyncronous
- The response should grow over time as more of the response comes in, in order to support streaming (future goal)
- An input should either include a url or a json object

## Versions

In order to denote compatability with the Stac specification, the first stable version will be 0.6.0, which is the latest version for STAC.

## Intended Usage

This will be subject to change until this is released on NPM

```js
    const { validateFromUrl, validateFromJson } = require('@sparkgeo/stac-validator')


    const type = 'catalog' // or 'item' or 'collection'
    const url = 'https//...'

    const responseFromUrl = validateStacFromUrl({url, type, dig: true})

    (...)

    const catalog = { ... } // stac catalog
    const collection = { ... } // stac collection
    const item = { ... } // stac item

    const responseFromJsonItem = validateFromJson({item, dig: false})
    const responseFromJsonCollection = validateFromJson({collection, dig: false})
    const responseFromJsonCatalog = validateFromJson({catalog, dig: false})
```


## Verification Responses

At this point, there needs to be consistent responses that contain the following:

- response consistency across catalog, collection, item
- response contains type
- response contains url source of stac catalog/collection/item
- response contains line (future scope)
- response contains message
- top level element is an array of objects
- response is flat regardless if content is nested

## Examples

### Success

A successful response returns an object with a `success` boolean, as well as a `verified_files`, which provides a series of responses.

```js
  {
    success: true,
  }
```

### Failure

A failure response shares the `success` and `verified_files` attributes. In addition, it adds a new attribute called `errors`. The errors object is flat, meaning that there should be no nester arrays of objects present.

The errors object is subject to change until the first stable release.


```js
  {
    success: false,
    errors: [
      {
        type: '',
        message: '',
        url: '',
      }
    ]
  }
```

## TODO's

the following is the progress of this progress. Because, at this point, it is a one-man show, I'm documenting everything here.

- [x] Initial Building
- [x] Mock integration tests from requirements
- [x] Set up and document entry point
- [ ] Build verification function for "catalog" assets
- [ ] Build verification function for "collection" assets
- [ ] Build verification function for "item" assets
- [ ] Pull common functions of three into helpers
- [ ] Refactor common error messages into helpers
- [ ] Build unit tests for helpers
- [ ] Integrate with CircleCI
- [ ] Publish into NPM on release
- [ ] Enforce Git Flow for versioning
- [ ] Use Circle CI for CD into NPM
- [ ] Build support for previous and newer versions either than 0.6.0

