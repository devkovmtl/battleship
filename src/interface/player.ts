import { Gameboard, Ship } from '.'
import { PlayerType } from '../enum'

interface Player {
  name: string
  playerType: PlayerType
  gameBoard: Gameboard
  ships: Ship[]
  attackEnemyBoard: (r: number, c: number, gb: Gameboard) => boolean
  allShipsSunk: () => boolean
  placeRandomShip: (ship: Ship) => void
}

export { Player }
