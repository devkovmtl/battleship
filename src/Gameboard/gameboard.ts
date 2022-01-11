import { Gameboard, Ship } from '../interface'
import { createArrayOfArray } from '../utils'

function createGameboard(row: number = 10, col: number = 10): Gameboard {
  if (row <= 0) {
    row = 10
  }
  if (col <= 0) {
    col = 10
  }

  let grid = createArrayOfArray(row, col)
  let ships: Ship[] = []

  function canShipBePlaced(
    row: number,
    col: number,
    shipLength: number,
    isHorizontal: boolean
  ): boolean {
    // grab next cell to check if empty
    let nextCellsGrid = []
    if (row < 0) {
      return false
    }
    if (col < 0) {
      return false
    }
    if (row > grid.length - 1) {
      return false
    }
    if (col > grid[0].length - 1) {
      return false
    }
    if (!shipLength || shipLength <= 0) {
      return false
    }
    if (isHorizontal) {
      if (col + (shipLength - 1) > grid.length - 1) {
        return false
      }
      // grab the next cell to see if empty
      for (let i = 0; i < shipLength; i++) {
        nextCellsGrid.push(grid[row][col + i])
      }
    }
    if (!isHorizontal) {
      if (row + (shipLength - 1) > grid[0].length - 1) {
        return false
      }
      // grab the next cell to see if empty
      for (let i = 0; i < shipLength; i++) {
        nextCellsGrid.push(grid[row + i][col])
      }
    }

    if (!nextCellsGrid.every((nxtCell) => !nxtCell)) {
      return false
    } else {
      return true
    }
  }

  return {
    grid,
    placeShipOnGrid: function (
      row: number,
      col: number,
      ship: Ship,
      isHorizontal: boolean = true
    ) {
      if (row < 0 || row > grid.length - 1) {
        throw new Error('Please provide a valid number to place your ship')
      }

      if (col < 0 || col > grid.length - 1) {
        throw new Error('Please provide a valid number to place your ship')
      }

      if (canShipBePlaced(row, col, ship.length, isHorizontal)) {
        if (isHorizontal) {
          for (let i = 0; i < ship.length; i++) {
            grid[row][col + i] = `${ship.name}-${i}`
          }
          ships.push(ship)
          return true
        }
        if (!isHorizontal) {
          for (let i = 0; i < ship.length; i++) {
            grid[row + i][col] = `${ship.name}-${i}`
          }
          ships.push(ship)
          return true
        }
      } else {
        return false
      }
    },
    receiveAttack: function (row: number, col: number) {
      if (row < 0 || row > grid.length - 1) {
        throw new Error('Please provide a valid number to attack opponent ship')
      }

      if (col < 0 || col > grid.length - 1) {
        throw new Error('Please provide a valid number to attack opponent ship')
      }
      if (grid[row][col] === undefined) {
        grid[row][col] = 'MISS'
        return false
      } else {
        if (grid[row][col] === 'MISS' || grid[row][col] === 'HIT') {
          return false
        } else {
          // send the hit function to correct ship
          const shipWithIndex = grid[row][col]
          const shipName = shipWithIndex.split('-')[0]
          const shipHitPosition = +shipWithIndex.split('-')[1]
          const ship = ships.find((s) => s.name == shipName)

          if (ship) {
            ship.hit(shipHitPosition)
            grid[row][col] = 'HIT'
            return true
          }

          return false
        }
      }
    },
    doesAllShipsHaveSunk: function () {
      return ships.every((sh) => sh.isSunk())
    },
  }
}

export default createGameboard
