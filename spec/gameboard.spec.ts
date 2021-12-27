import {
  BOAT,
  DESTROYER,
  DESTROYER_LENGTH,
  SUBMARINE,
  SUBMARINE_LENGTH,
  WATER,
} from '../src/constants'
import { Oriention } from '../src/enum'
import createGameboard from '../src/Gameboard/gameboard'
import createShip from '../src/Ship/ship'

describe('test gameboard factory function', () => {
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
      boardP1.placeCharacter(11, 10, submarine)
    }).toThrow()
  })

  it('should place a ship on the grid', () => {
    const boardP1 = createGameboard(4, 4)
    const submarine = createShip(SUBMARINE, SUBMARINE_LENGTH)
    boardP1.placeCharacter(3, 3, submarine)
    expect(boardP1.grid[3][3] === BOAT).toBeTruthy()
  })

  it('should not place the ship if length overflow a ship on the grid', () => {
    const boardP1 = createGameboard(4, 4)
    const destroyer = createShip(DESTROYER, DESTROYER_LENGTH)

    expect(boardP1.placeCharacter(1, 3, destroyer)).toBeFalsy()
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

    expect(boardP1.grid[1][0] === BOAT).toBeTruthy()
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
    boardP1.placeCharacter(3, 0, submarine)
    const destroyer = createShip(DESTROYER, DESTROYER_LENGTH)
    boardP1.placeCharacter(2, 0, destroyer, Oriention.Vertical)

    expect(boardP1.grid[2][0] === BOAT).toBeFalsy()
  })
})
