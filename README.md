NodeJS Stac Validator
---

Based on https://github.com/sparkgeo/stac-validator

## Assumptions

- Assume that the entry point will always be "catalog", as opposed to collection.
    - Later on, if required, will add an API endpoint to specify the other two items.
- Also assuming now that I'm only inspecting catalogs
    - This will be extended to items, later on.


## Goals

- This should become an NPM package


TODO:
---
- [x] Pull Stac Version
- [ ] Pull Stac version based on param || latest
- [ ] Pull target stac catalog.
- [ ] Lint page
- [ ] Check links for
- [ ] Check links using HEAD method for items
- [ ] Check child catalogs/collections/items

