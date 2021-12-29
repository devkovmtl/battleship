import { PlayerType } from '../enum'
import {
  BATTLESHIP,
  BATTLESHIP_LENGTH,
  CARRIER,
  CARRIER_LENGTH,
  CRUISER,
  CRUISER_LENGTH,
  DESTROYER,
  DESTROYER_LENGTH,
  SUBMARINE,
  SUBMARINE_LENGTH,
} from '../constants'
import createShip from '../Ship/ship'
import createGameboard from '../Gameboard/gameboard'
import { Gameboard, Player } from '../interface'

function createPlayer(name: string, playerType: PlayerType): Player {
  return {
    name,
    playerType,
    gameBoard: createGameboard(10, 10),
    ships: [
      createShip(SUBMARINE, SUBMARINE_LENGTH),
      createShip(DESTROYER, DESTROYER_LENGTH),
      createShip(CRUISER, CRUISER_LENGTH),
      createShip(BATTLESHIP, BATTLESHIP_LENGTH),
      createShip(CARRIER, CARRIER_LENGTH),
    ],
    attackEnemyBoard: function (row: number, col: number, gb: Gameboard) {
      return gb.receiveAttack(row, col)
    },
    allShipsSunk: function () {
      let total = 0

      for (let i = 0; i < this.ships.length; i++) {
        if (this.ships[i].isSunk()) {
          total++
        }
        // console.log(this.ships[i].name, this.ships[i].isSunk())
      }
      //   console.log('allShipSunk', total)
      return total === this.ships.length
    },
  }
}

export default createPlayer
