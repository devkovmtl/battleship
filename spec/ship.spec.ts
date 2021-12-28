import { BOAT, HIT } from '../src/constants'
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
    expect(carrier.body[1]).toEqual(BOAT)
  })

  it('should throw if position to hit bigger than length of body', () => {
    const carrier = createShip('Carrier', 5)

    expect(() => carrier.hit(6)).toThrow()
  })

  it('should hit the ship and mark hit at the right position', () => {
    const carrier = createShip('Carrier', 5)
    expect(carrier.body[1]).toEqual(BOAT)
    expect(carrier.hit(1)).toBeTruthy()
    expect(carrier.body[0]).toEqual(BOAT)
    expect(carrier.body[2]).toEqual(BOAT)
    expect(carrier.hit(2)).toBeTruthy()
  })

  it('should not sunk the ship the body is not all hit', () => {
    const carrier = createShip('Carrier', 5)
    expect(carrier.body[1]).toEqual(BOAT)
    expect(carrier.hit(1)).toBeTruthy()
    expect(carrier.body[0]).toEqual(BOAT)
    expect(carrier.body[2]).toEqual(BOAT)
    expect(carrier.hit(2)).toBeTruthy()
    // console.log(carrier.body)

    expect(carrier.isSunk()).toBeFalsy()
  })

  it('should  sunk the ship if every position is hit', () => {
    const destroyer = createShip('Destroyer', 2)
    expect(destroyer.hit(0)).toBeTruthy()
    expect(destroyer.hit(1)).toBeTruthy()
    // console.log(destroyer.body)
    expect(destroyer.isSunk()).toBeTruthy()
  })
})
