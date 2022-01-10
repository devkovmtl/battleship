import createShip from '../src/Ship/ship'

describe('test creation of ship', () => {
  it('should throw if no name of ship is passed', () => {
    expect(() => createShip('', 5)).toThrow()
  })

  it('should throw if length is less or equal to 0', () => {
    expect(() => createShip('Carrier', -1)).toThrow()
    expect(() => createShip('Carrier', 0)).toThrow()
  })

  it('should create ship', () => {
    const carrier = createShip('Carrier', 5)
    expect(carrier).not.toBeNull()
    expect(carrier.name).toBe('Carrier')
    expect(carrier.length).toBe(5)
    expect(carrier.body[1]).toEqual('carrier-1')
  })

  it('should throw if position to hit bigger than length of body', () => {
    const carrier = createShip('Carrier', 5)

    expect(() => carrier.hit(6)).toThrow()
  })

  it('should hit the ship and mark hit at the right position', () => {
    const carrier = createShip('Carrier', 5)
    expect(carrier.body[1]).toEqual('carrier-1')
    expect(carrier.hit(1)).toBeTruthy()
    expect(carrier.body[0]).toEqual('carrier-0')
    expect(carrier.body[2]).toEqual('carrier-2')
    expect(carrier.hit(2)).toBeTruthy()
    expect(carrier.body[1]).toEqual('HIT')
    expect(carrier.body[2]).toEqual('HIT')
  })

  it('should not sunk the ship the body is not all hit', () => {
    const carrier = createShip('Carrier', 5)
    expect(carrier.body[1]).toEqual('carrier-1')
    expect(carrier.hit(1)).toBeTruthy()
    expect(carrier.body[0]).toEqual('carrier-0')
    expect(carrier.body[2]).toEqual('carrier-2')
    expect(carrier.hit(2)).toBeTruthy()
    expect(carrier.body[1]).toEqual('HIT')
    expect(carrier.body[2]).toEqual('HIT')
    expect(carrier.isSunk()).toBeFalsy()
  })

  it('should  sunk the ship if every position is hit', () => {
    const destroyer = createShip('Destroyer', 2)
    expect(destroyer.hit(0)).toBeTruthy()
    expect(destroyer.hit(1)).toBeTruthy()
    expect(destroyer.isSunk()).toBeTruthy()
  })
})
