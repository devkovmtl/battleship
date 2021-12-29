import {
  BOAT,
  DESTROYER,
  DESTROYER_LENGTH,
  HIT,
  MISS,
  SUBMARINE,
  SUBMARINE_LENGTH,
  WATER,
} from '../src/constants'
import { Oriention } from '../src/enum'
import createGameboard from '../src/Gameboard/gameboard'
import createShip from '../src/Ship/ship'

describe('test gameboard factory create gameboard', () => {
  it('should create a grid 10 by 10', () => {
    const boardP1 = createGameboard()
    expect(boardP1.grid.length).toBe(10)
    expect(boardP1.grid[0].length).toBe(10)
  })

  it('should create a grid of 10 by 10 if number less than 0', () => {
    const boardP1 = createGameboard(-1, 0)
    expect(boardP1.grid.length).toBe(10)
    expect(boardP1.grid[0].length).toBe(10)
  })
})

describe('test place ship on gameboard', () => {
  it('should throw an error if no ship is provided', () => {
    const boardP1 = createGameboard()
    expect(() => {
      // @ts-ignore
      boardP1.placeCharacter(8, 8)
    }).toThrow()
  })

  it('should throw an error if location provide bigger than row or col number', () => {
    const boardP1 = createGameboard()
    const submarine = createShip(SUBMARINE, SUBMARINE_LENGTH)
    expect(() => {
      boardP1.placeCharacter(11, 10, submarine, Oriention.Horizontal)
    }).toThrow()
  })

  it('should place a ship on the grid', () => {
    const boardP1 = createGameboard(4, 4)
    const submarine = createShip(SUBMARINE, SUBMARINE_LENGTH)
    boardP1.placeCharacter(3, 3, submarine, Oriention.Horizontal)
    expect(boardP1.grid[3][3] === `${submarine.name}-0`).toBeTruthy()
  })

  it('should not place the ship if length overflow a ship on the grid', () => {
    const boardP1 = createGameboard(4, 4)
    const destroyer = createShip(DESTROYER, DESTROYER_LENGTH)

    expect(
      boardP1.placeCharacter(1, 3, destroyer, Oriention.Horizontal)
    ).toBeFalsy()
  })

  it('should not place the ship if not empty case', () => {
    const boardP1 = createGameboard(4, 4)
    const submarine = createShip(SUBMARINE, SUBMARINE_LENGTH)

    boardP1.placeCharacter(0, 0, submarine, Oriention.Horizontal)

    const destroyer = createShip(DESTROYER, DESTROYER_LENGTH)
    boardP1.placeCharacter(0, 0, destroyer, Oriention.Horizontal)

    expect(boardP1.grid[0][1]).toEqual(WATER)
  })

  it('should place a ship in vertical position', () => {
    const boardP1 = createGameboard(4, 4)
    const destroyer = createShip(DESTROYER, DESTROYER_LENGTH)
    boardP1.placeCharacter(0, 0, destroyer, Oriention.Vertical)

    expect(boardP1.grid[1][0] === `${destroyer.name}-1`).toBeTruthy()
  })

  it('should not place ship vertically if bigger than col', () => {
    const boardP1 = createGameboard(4, 4)
    const destroyer = createShip(DESTROYER, DESTROYER_LENGTH)

    expect(
      boardP1.placeCharacter(3, 0, destroyer, Oriention.Vertical)
    ).toBeFalsy()
  })

  it('should not place a ship if already ship for vertical position', () => {
    const boardP1 = createGameboard(4, 4)
    const submarine = createShip(SUBMARINE, SUBMARINE_LENGTH)
    boardP1.placeCharacter(3, 0, submarine, Oriention.Horizontal)
    const destroyer = createShip(DESTROYER, DESTROYER_LENGTH)
    boardP1.placeCharacter(2, 0, destroyer, Oriention.Vertical)

    expect(boardP1.grid[2][0] === BOAT).toBeFalsy()
  })
})

describe('test receive attack', () => {
  it('should mark hit if boat', () => {
    const boardP1 = createGameboard(4, 4)
    const destroyer = createShip(DESTROYER, DESTROYER_LENGTH)
    boardP1.placeCharacter(0, 0, destroyer, Oriention.Vertical)
    boardP1.receiveAttack(1, 0)

    expect(boardP1.grid[1][0] === HIT).toBeTruthy()
  })

  it('should mark the correct boat as hit', () => {
    const boardP1 = createGameboard(4, 4)
    const destroyer = createShip(DESTROYER, DESTROYER_LENGTH)
    boardP1.placeCharacter(0, 0, destroyer, Oriention.Vertical)
    boardP1.receiveAttack(0, 0)

    expect(destroyer.body[0] === HIT).toBeTruthy()
    expect(boardP1.grid[0][0] === HIT).toBeTruthy()
  })

  it('should mark Miss if no Boat', () => {
    const boardP1 = createGameboard(4, 4)
    const destroyer = createShip(DESTROYER, DESTROYER_LENGTH)
    boardP1.placeCharacter(0, 0, destroyer, Oriention.Vertical)
    boardP1.receiveAttack(1, 1)

    expect(boardP1.grid[1][1] === MISS).toBeTruthy()
  })

  it('should do nothing if Gameboard is already miss', () => {
    const boardP1 = createGameboard(4, 4)
    const destroyer = createShip(DESTROYER, DESTROYER_LENGTH)
    boardP1.placeCharacter(0, 0, destroyer, Oriention.Vertical)
    boardP1.receiveAttack(1, 1)

    expect(boardP1.receiveAttack(1, 1)).toBeFalsy()
  })
})

describe('test all Ship Sunk', () => {
  it('should return true if all ship are sunk', () => {
    const boardP1 = createGameboard()
    const submarine = createShip(SUBMARINE, SUBMARINE_LENGTH)
    boardP1.placeCharacter(0, 0, submarine, Oriention.Horizontal)
    boardP1.receiveAttack(0, 0)
    expect(boardP1.allShipsSunk()).toBeTruthy()
  })

  it('should return false if not all ship are sunk', () => {
    const boardP1 = createGameboard()
    const submarine = createShip(SUBMARINE, SUBMARINE_LENGTH)
    boardP1.placeCharacter(0, 0, submarine, Oriention.Horizontal)
    boardP1.receiveAttack(0, 1)
    expect(boardP1.allShipsSunk()).toBeFalsy()
  })
})
