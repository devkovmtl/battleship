const createAnArray = function (length: number): Array<any> {
  if (!length || typeof length !== 'number') {
    throw new Error('Length is required and must be a number')
  }
  if (length <= 0) {
    throw new Error('Length must be bigger than 0')
  }
  let a = []
  for (let i = 0; i < length; i++) {
    a.push(undefined)
  }
  return a
}

export { createAnArray }
