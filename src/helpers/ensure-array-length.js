const ensureArrayLength = ({
  asset,
  parent,
  location,
  numElements,
  numElementsArr,
} = {}) => {
  if (numElementsArr) {
    for (const i in numElementsArr) {
      if (asset.length === numElementsArr[i]) {
        return
      }
    }
    return {
      type: 'Incorrect array length',
      message: `The element ${parent} must be any of the following lengths: ${numElementsArr}`,
      url: location,
    }
  } else if (numElements) {
    if (asset.length !== numElements) {
      return {
        type: 'Incorrect array length',
        message: `The element ${parent} must be the following length: ${numElements}`,
        url: location,
      }
    }
  } else {
    console.log('ERROR: Must contain either numElements or numElementsArr')
  }
}

module.exports = ensureArrayLength
