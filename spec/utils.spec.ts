import { createAnArray } from '../src/utils'

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
    const array = createAnArray(3)
    expect(array.length).toBe(3)
    expect(array[1]).toBe(undefined)
  })

  it('should create an array with length 3 with element "bob"', () => {
    const array = createAnArray(3, 'bob')
    expect(array.length).toBe(3)
    expect(array[1]).toBe('bob')
  })
})
