import { createArrayOfString, createArrayOfArray } from '../src/utils'

describe('test create an array', () => {
  it('should throw an error if no args passed', () => {
    // @ts-ignore
    expect(() => createAnArray()).toThrow()
  })

  it('should throw an error if args string', () => {
    // @ts-ignore
    expect(() => createAnArray('abc')).toThrow()
  })

  it('should throw an error if args less than 0', () => {
    // @ts-ignore
    expect(() => createAnArray(-1)).toThrow()
  })

  it('should create an array with right length with undefined', () => {
    const array = createArrayOfString(3)
    expect(array.length).toBe(3)
    expect(array[1]).toBe(undefined)
  })

  it('should create an array with length 3 with element "bob"', () => {
    const array = createArrayOfString(3, 'bob')
    expect(array.length).toBe(3)
    expect(array[1]).toBe('bob-1')
  })
})

describe('test create an array of array', () => {
  it('should create an array of 10 by 10 ', () => {
    const array = createArrayOfArray()

    expect(array.length).toBe(10)
    expect(array[0].length).toBe(10)
    expect(array[array.length - 1].length).toBe(10)
  })

  it('should create an array of 10 by 10 if row col less 0', () => {
    const array = createArrayOfArray(-1, -2)

    expect(array.length).toBe(10)
    expect(array[0].length).toBe(10)
    expect(array[array.length - 1].length).toBe(10)
  })

  it('should create an array of 3 by 2 of undefined ', () => {
    const array = createArrayOfArray(3, 2)

    expect(array.length).toBe(3)
    expect(array[0].length).toBe(2)
    expect(array[array.length - 1].length).toBe(2)
    expect(array[0][0]).toBeUndefined()
  })

  it('should create an array of 3 by 2 of undefined ', () => {
    const array = createArrayOfArray(3, 2)

    expect(array.length).toBe(3)
    expect(array[0].length).toBe(2)
    expect(array[array.length - 1].length).toBe(2)
    expect(array[0][0]).toBeUndefined()
  })

  it('should create an array of 3 by 2 of "foo"', () => {
    const array = createArrayOfArray(3, 2, 'foo')

    expect(array.length).toBe(3)
    expect(array[0].length).toBe(2)
    expect(array[array.length - 1].length).toBe(2)
    expect(array[0][0]).toBe('foo')
    expect(array[array.length - 1][0]).toBe('foo')
  })
})

// describe('test return number from random function', () => {
//   it('should return a number between max', () => {
//     expect(typeof getRandomInt(2) === 'number').toBeTruthy()
//     expect(getRandomInt(2)).not.toBeNull()
//     expect(getRandomInt(2)).toBeLessThanOrEqual(2)
//   })
// })
