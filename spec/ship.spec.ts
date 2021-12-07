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

  it('should add location to ship body', () => {
    const carrier = createShip('Carrier', 5)
    carrier.body[0] = 0
    carrier.body[1] = 1
    carrier.body[2] = 2
    carrier.body[3] = 3
    carrier.body[4] = 4
    expect(carrier).not.toBeNull()
    expect(carrier.body[2]).toBe(2)
    expect(carrier.hit(2)).toBeTruthy()
    expect(carrier.hit(5)).toBeFalsy()
    expect(carrier.isSunk()).toBeFalsy()
  })

  it('should add location to ship body', () => {
    const carrier = createShip('Carrier', 5)
    carrier.body[0] = 0
    carrier.body[1] = 1
    carrier.body[2] = 2
    carrier.body[3] = 3
    carrier.body[4] = 4
    carrier.hit(0)
    carrier.hit(1)
    carrier.hit(2)
    carrier.hit(3)
    carrier.hit(4)

    expect(carrier.isSunk()).toBeTruthy()
  })
})
