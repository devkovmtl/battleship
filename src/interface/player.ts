import { Gameboard } from '.'

interface Player {
  name: string
  listAttack: {}
  attack: (r: number, c: number, gb: Gameboard) => boolean
  randomAttack: (gb: Gameboard) => boolean
}

export { Player }
