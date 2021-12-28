const createAnArray = function (length: number, element?: string): Array<any> {
  if (!length || typeof length !== 'number') {
    throw new Error('Length is required and must be a number')
  }
  if (length <= 0) {
    throw new Error('Length must be bigger than 0')
  }

  let a = []
  for (let i = 0; i < length; i++) {
    if (element) {
      a.push(element)
    } else {
      a.push(undefined)
    }
  }
  return a
}

// return an array of array
// (2,2) => [[undefined, undefined],[undefined,undefined]]
const createArrayOfArray = (
  row: number = 10,
  col: number = 10,
  element: any = undefined
) => {
  let grid = []

  if (row <= 0) {
    row = 10
  }

  if (col <= 0) {
    col = 10
  }

  for (let i = 0; i < row; i++) {
    let r = []
    for (let j = 0; j < col; j++) {
      r.push(element)
    }

    grid.push(r)
  }

  return grid
}

export { createAnArray, createArrayOfArray }
