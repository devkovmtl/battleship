import createShip from '../src/ship'

describe('test creation of ship', () => {
  it('should throw if no name of ship is passed', () => {
    expect(() => createShip('', 5)).toThrow()
  })

  it('should throw if length is length than equal to 0', () => {
    expect(() => createShip('Carrier', -1)).toThrow()
    expect(() => createShip('Carrier', 0)).toThrow()
  })

  it('should create ship', () => {
    const carrier = createShip('Carrier', 5)
    expect(carrier).not.toBeNull()
    expect(carrier.name).toBe('Carrier')
    expect(carrier.length).toBe(5)
  })
})
