import { Ship } from '.'
import { Oriention } from '../enum'

interface Gameboard {
  grid: any[][]
  ships: Ship[]
  placeCharacter: (
    row: number,
    col: number,
    ship: Ship,
    orientation: Oriention
  ) => void
  receiveAttack: (row: number, col: number) => boolean
  allShipsSunk: () => boolean
}

export { Gameboard }
