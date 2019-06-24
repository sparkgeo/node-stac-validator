# NodeJS Stac Validator

Validates a spatial temporal catalog asset based on the specs laid out by [Radiant Earth](https://github.com/radiantearth/stac-spec/tree/v0.6.0).

## Usage

### validateFromURl

Validate from URL validates STAC from a remote source.

| Parameter | Type | Description | Required |
| --------- | ---- | ----------- | -------- |
| url | string | the source of the STAC to be validated | **yes** |
| type | string | The type of stac being validated. Can be "item", "stac-item", "catalog", "collection" or "geojson" | **yes** |
| version | string | The version. Defaults to 'v0.6.0' | _Optional_ |
| useRecursion | boolean | set to true if you want to traverse deeper than the initial file | no |
| context | object | Not implemented. Intended for streaming results | _No_ |

### validateFromObject

Validates a STAC asset from user-provided parsed object.

| Parameter | Type | Description | Required |
| --------- | ---- | ----------- | -------- |
| asset | string | the stringified JSON asset | **yes** |
| type | string | The type of stac being validated. Can be "item", "stac-item", "catalog", "collection" or "geojson" | **yes** |
| version | string | The version. Defaults to 'v0.6.0' | _Optional_ |
| useRecursion | boolean | set to true if you want to traverse deeper than the initial file | no |
| context | object | Not implemented. Intended for streaming results | _No_ |

## Intended Usage

### Modules

This will be subject to change until this is released on NPM

```js
    const { validateFromUrl, validateFromObject } = require('@sparkgeo/stac-validator')


    const type = 'catalog' // or 'item' or 'collection'
    const url = 'https//...'

    const responseFromUrl = validateFromUrl({url, type})

    (...)

    const catalog = { ... } // stac catalog
    const collection = { ... } // stac collection
    const item = { ... } // stac item

    const responseFromJsonItem = validateFromObject({asset: item, type: 'item'})
    const responseFromJsonCollection = validateFromObject({asset: collection, type: 'collection'})
    const responseFromJsonCatalog = validateFromObject({asset: catalog, type: 'catalog'})
```

There will be deep nested searching, to be released at a later date.

## Example Responses

### Success

A successful response returns an object with a `success` boolean, as well as a `verified_files`, which provides a series of responses.

```js
  {
    success: true,
    responses: [
      {
        valid: true,
        location: '<location of file>',
        errors: []
      }
    ]
  }
```

### Failure

A failure response shares the `success` and `verified_files` attributes. In addition, it adds a new attribute called `errors`. The errors object is flat, meaning that there should be no nester arrays of objects present.

The errors object is subject to change until the first stable release, v0.7.0.

```js
  {
    success: false,
    responses: [
      {
        valid: false,
        location: '<location of file>',
        errors: [
          {
            keyword: '',
            message: '',
          }
        ]
      }
    ]
  }
```

## TODO's

the following is the progress of this progress. Because, at this point, it is a one-man show, I'm documenting everything here.

- [x] Initial Building
- [x] Mock integration tests from requirements
- [x] Set up and document entry point
- [ ] Use Recursion to obtain an entire STAC stack from a single entry point
- [ ] Enforce rigidity of the context object.
- [ ] Example of push-polling
- [x] Remove webpack for production build
- [ ] Add CI/CD Support as part of release to master.

## The Context Object

The context object allows for real-time operations such as streaming. _This is in-progress_.

| Key name | Intended use | type |
| --------- | ----- | ---- |
| errorList | a list of errors | object |
| indicateError | a function for updating that accepts an error object | function |
| indicateComplete | a function that indicates the linting is complete | function |


## Sample Catalog

https://cbers-stac.s3.amazonaws.com/CBERS4/catalog.json
