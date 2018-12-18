# Verification Responses

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

