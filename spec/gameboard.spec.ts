import createGameboard from '../src/Gameboard/gameboard'
import createShip from '../src/Ship/ship'

describe('test gameboard create grid', () => {
  it('should create a  10 by 10 grid if no argument provided', () => {
    const gameBoard = createGameboard(-1, 0)
    expect(gameBoard.grid.length).toBe(10)
    expect(gameBoard.grid[0].length).toBe(10)
  })

  it('should create a 3 by 3 grid', () => {
    const gameBoard = createGameboard(3, 3)
    expect(gameBoard.grid.length).toBe(3)
    expect(gameBoard.grid[0].length).toBe(3)
  })
})

describe('test gameboard place ship on the grid', () => {
  it('should throw if we provide a row less than 0', () => {
    const gameBoard = createGameboard()
    const destroyer = createShip('destroyer', 2)
    expect(() => {
      gameBoard.placeShipOnGrid(-1, 4, destroyer, true)
    }).toThrow()
  })

  it('should throw if we provide a col bigger than grid size', () => {
    const gameBoard = createGameboard()
    const cruiser = createShip('cruiser', 4)
    expect(() => {
      gameBoard.placeShipOnGrid(0, 10, cruiser, true)
    }).toThrow()
  })

  it('should place the ship in the right location', () => {
    const gameBoard = createGameboard(3, 3)
    const submarine = createShip('submarine', 1)
    const shipPlaced = gameBoard.placeShipOnGrid(0, 0, submarine, true)
    expect(shipPlaced).toBeTruthy()
    expect(gameBoard.grid[0][0]).toEqual('submarine-0')
  })

  it('should place the ship in the right location horizontally', () => {
    const gameBoard = createGameboard(3, 3)
    const destroyer = createShip('destroyer', 2)
    let shipPlaced = gameBoard.placeShipOnGrid(1, 1, destroyer, true)
    expect(shipPlaced).toBeTruthy()
    expect(gameBoard.grid[1][1]).toEqual('destroyer-0')
    expect(gameBoard.grid[1][2]).toEqual('destroyer-1')
  })

  it('should place the ship in the right location vertically', () => {
    const gameBoard = createGameboard(3, 3)
    const destroyer = createShip('destroyer', 2)
    let shipPlaced = gameBoard.placeShipOnGrid(1, 2, destroyer, false)
    expect(shipPlaced).toBeTruthy()
    expect(gameBoard.grid[1][2]).toEqual('destroyer-0')
    expect(gameBoard.grid[2][2]).toEqual('destroyer-1')
  })

  it('should not place the ship if there is already a ship in the position', () => {
    const gameBoard = createGameboard(3, 3)
    const submarine = createShip('submarine', 1)
    const destroyer = createShip('destroyer', 2)

    let shipPlaced = gameBoard.placeShipOnGrid(0, 0, submarine, true)
    expect(shipPlaced).toBeTruthy()
    expect(gameBoard.grid[0][0]).toEqual('submarine-0')
    shipPlaced = gameBoard.placeShipOnGrid(0, 0, destroyer, true)

    expect(shipPlaced).toBeFalsy()
    expect(gameBoard.grid[0][0]).toEqual('submarine-0')
    expect(gameBoard.grid[0][1]).toEqual(undefined)
  })

  it('should not place the ship if there is already a ship in the position (vertically)', () => {
    const gameBoard = createGameboard(3, 3)
    const submarine = createShip('submarine', 1)
    const destroyer = createShip('destroyer', 2)

    let shipPlaced = gameBoard.placeShipOnGrid(2, 1, submarine, true)
    expect(shipPlaced).toBeTruthy()
    expect(gameBoard.grid[2][1]).toEqual('submarine-0')

    shipPlaced = gameBoard.placeShipOnGrid(1, 1, destroyer, false)
    expect(shipPlaced).toBeFalsy()

    expect(gameBoard.grid[1][1]).toEqual(undefined)
    expect(gameBoard.grid[2][1]).toEqual('submarine-0')
  })

  it('should not place the ship if length overflow  the grid size horizontally', () => {
    const gameBoard = createGameboard(3, 3)
    const destroyer = createShip('destroyer', 2)

    let shipPlaced = gameBoard.placeShipOnGrid(0, 2, destroyer, true)
    expect(shipPlaced).toBeFalsy()
    expect(gameBoard.grid[0][2]).toEqual(undefined)
  })

  it('should not place the ship if length overflow  the grid size vertically', () => {
    const gameBoard = createGameboard(3, 3)
    const cruiser = createShip('cruiser', 3)

    let shipPlaced = gameBoard.placeShipOnGrid(1, 2, cruiser, false)
    expect(shipPlaced).toBeFalsy()
    expect(gameBoard.grid[1][2]).toEqual(undefined)
    expect(gameBoard.grid[2][2]).toEqual(undefined)
  })

  it('should place the ship on the right grid when multiple grid', () => {
    const gameboard1 = createGameboard(3, 3)
    const gameboard2 = createGameboard(3, 3)

    const cruiser = createShip('cruiser', 3)

    expect(gameboard1.placeShipOnGrid(0, 0, cruiser, true)).toBeTruthy()
    expect(gameboard1.grid[0][0]).toEqual('cruiser-0')
    expect(gameboard1.grid[0][2]).toEqual('cruiser-2')

    expect(gameboard2.grid[0][0]).toEqual(undefined)
    expect(gameboard2.grid[0][2]).toEqual(undefined)
  })
})

describe('test gameboard can receive attack', () => {})
