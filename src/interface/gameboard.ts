import { Ship } from '.'

interface Gameboard {
  grid: any[][]
  placeShipOnGrid: (
    row: number,
    col: number,
    ship: Ship,
    isHorizontal: boolean
  ) => boolean | undefined
  receiveAttack: (row: number, col: number) => boolean
  doesAllShipsHaveSunk: () => boolean
}

export { Gameboard }
