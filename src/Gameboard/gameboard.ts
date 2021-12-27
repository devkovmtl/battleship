import { BOAT, WATER } from '../constants'
import { Ship } from '../interface'
import { createArrayOfArray } from '../utils'
import { Oriention } from '../enum'

function createGameboard(row: number = 10, col: number = 10) {
  if (row <= 0) {
    row = 10
  }
  if (col <= 0) {
    col = 10
  }
  let grid = createArrayOfArray(row, col, WATER)

  return {
    grid,
    placeCharacter(
      row: number,
      col: number,
      ship: Ship,
      orientation: Oriention = Oriention.Horizontal
    ) {
      // console.log(this)
      if (row > this.grid.length - 1 || col > this.grid[0].length - 1) {
        throw new Error(
          `Please insert a location between ${this.grid.length - 1} * ${
            this.grid[0].length - 1
          }`
        )
      }
      if (!ship) {
        throw new Error(`Ship is required`)
      }

      let canAddShip = true

      // check if we can add a ship to the location provided
      for (let i = 0; i < ship.length; i++) {
        if (orientation === Oriention.Horizontal) {
          // check if we overflow horizontaly
          if (col + i > this.grid[0].length - 1) {
            canAddShip = false
            return
          }

          // check if already ship or anything else than default water we can add
          if (this.grid[row][col + i] !== WATER) {
            canAddShip = false
          }
        }
        // check if we overflow vertical
        if (orientation === Oriention.Vertical) {
          if (row + i > this.grid.length - 1) {
            canAddShip = false
            return
          }
          if (this.grid[row + i][col] !== WATER) {
            canAddShip = false
          }
        }
      }

      // add the ship
      if (canAddShip) {
        for (let i = 0; i < ship.length; i++) {
          if (orientation === Oriention.Horizontal) {
            // console.log('INSERT BOAT')
            this.grid[row][col + i] = BOAT
            // player Location
          }
          if (orientation === Oriention.Vertical) {
            this.grid[row + i][col] = BOAT
            // player location
          }
        }
      }
    },
  }
}

export default createGameboard
// import { Ship } from '../interface'

// const createGameBoard = function (playerName: string, playerGrid: Array<any>) {
//   let gameBoard: HTMLDivElement = document.createElement('div')
//   gameBoard.classList.add('gameboard', `gameboard-${playerName}`)

//   const col = 10
//   const row = 10

//   for (let i = 0; i < row * row; i++) {
//     const cell = document.createElement('div')
//     cell.dataset.id = `${i}`
//     gameBoard.appendChild(cell)
//     playerGrid.push(cell)
//   }

//   function placeShip(ship: Ship, position: number) {
//     console.log(ship)

//     ship.body.forEach((index) =>
//       playerGrid[position + index].classList.add('taken', ship.name)
//     )
//   }

//   return { gameBoard, placeShip }
// }

// export { createGameBoard }
