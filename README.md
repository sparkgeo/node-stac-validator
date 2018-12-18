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
    import { validateFromUrl, validateFromJson } from '@sparkgeo/stac-validator'

    const catalog = { ... } // stac catalog
    const collection = { ... } // stac collection
    const item = { ... } // stac item

    const responseFromUrl = validateStacFromUrl({url: 'https://...', dig: true})
    const responseFromJsonItem = validateFromJson({item, dig: false})
    const responseFromJsonCollection = validateFromJson({collection, dig: false})
    const responseFromJsonCatalog = validateFromJson({catalog, dig: false})
```
