import { Gameboard, Ship } from '.'
import { PlayerType } from '../enum'

interface Player {
  name: string
  playerType: PlayerType
  gameBoard: Gameboard
  ships: Ship[]
  attackEnemyBoard: (r: number, c: number, gb: Gameboard) => boolean
  allShipsSunk: () => boolean
}

export { Player }
