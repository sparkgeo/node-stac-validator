Thoughts on the STAC standard.

At this time, I approach this from a consistency between standards viewpoint, as opposed to a functional viewpoint. It is not my interest to determine what must go in what collection.

## Observations on 0.6

### Discrepencies between top-levels of three categories

When attempting to build a javascript-based linter, I first attempted to use _only_ the json standards as the documentation. At this time, this is not a recomended approach because of inconsistencies between the three standard in its structure.

This critique pertains only to how how these json objects represent the standard, and should not be interpreted as comment on how the standard itself should be formed.

It is my opinion that there should be consistency between the struture of the json representation of the standards. This will improve the processes for building tools to construct, verify and parse STAC.


For an `item`, the top-level items are of the pattern:

- $schema
- id
- title
- type
- description
- additionalProperties
- allOf
- + - definitions
  - core
  - link
  - asset

For a `catalog`, the top-level items are of the pattern:

- $schema
- id
- allOf
- + - definitions
  - link
  - catalog

For a `collection`, the top-level items are of the pattern:

- $schema
- id
- title
- type
- description
- additionalProperties
- required
- + - properties
  - core
  - link
  - asset

#### Suggestion 1: Top-level `required` elements

In `collection`, the required key containing an array of required elements is used to denote what a collection should contain at a minimum. Having this at the top-level for `catalog` and `item` as well will allow parsers and linters a consistent method for checking parameters for all STAC objects.

#### Suggestion 2: Top-level `type` elements

Similar to suggestion 1, the `type` key is present in `collection` and `item`, but missing in `catalog`. This (`"type": "object"`) should be added in `catalog` for consistency.

#### Suggestion 3: Top-level `title` and `description` in item

This element might be seen as fluff, but should be added in `item` for consistency with `catalog` and `collection`

#### (Carve to own issue? ) Suggestion 4: Top-level `properties` in `collection`


- Inconsistency between collection and the other two in how they share their child elements
-

#### Suggestion 5: definitions vs properties.

For the json standards of 'catalog' and 'item', you have an object under the key 'definitions' which displays the keys that a stac object may have. For 'collection', you have a similar thing titled 'properties'.

In the interests of consistency, I suggest that all of these elements (or sub-elements) remain unchanged, and maintain the same key of 'properties'.


### Discrepencies between definition items within `item`


## Observations on top-level content

One of the tools offered in the Staclint editor is the means to manually test and edit a file directly. What happens is that the content is first parsed for the validity of the JSON, then it is passed back to the API for linting in accordance with STAC.

However, it is not possible for the API to easilly-determined whether the object being passed back is a `catalog`, `item`, or `collection` for two reasons:

- Usually, the links in the STAC object are relative, meaning there is no mechanism to go forward and check the parent.
-

This can be solved by adding a type parameter, and has been discussed in an issue [link](). This means that it won't be possible to check errors in a single collection or item, unless _everything_ is checked over for a editor-based linting application (or a VSCode plugin).
