# NodeJS Stac Validator

Validates a spatial temporal catalog asset based on the specs laid out by [Radiant Earth](https://github.com/radiantearth/stac-spec/tree/v0.6.0).

## Assumptions

- Assume that the entry point will always be "catalog", as opposed to collection.
      - Later on, if required, will add an API endpoint to specify the other two items.
- Also assuming now that I'm only inspecting catalogs
      - This will be extended to items, later on.

## Goals

- This should become an NPM package
- The response should be asyncronous
- The response should grow over time as more of the response comes in, in order to support streaming (future goal)
- An input should either include a url or a json object

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
    verified_files: [{
      type: 'remote', // OPTIONS: remote / local // TODO: Better naming..?
      url: '//s3.amazonaws.com/...', // OPTIONAL
    }, {...}]
  }
```

### Failure

A failure response shares the `success` and `verified_files` attributes. In addition, it adds a new attribute called `errors`. The errors object is flat, meaning that there should be no nester arrays of objects present.

```js
  {
    success: false,
    verified_files: [{
      type: 'remote',
      url: '...',
    }, {...}],
    errors: [
      {
        type: '',
        category: '',
        message: '',
        url: '',
      }
    ]
  }
```

