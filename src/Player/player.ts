import { Gameboard, Player } from '../interface'
import { generateRandomNum } from '../utils'

function createPlayer(name: string): Player {
  let listAttack = {}

  function generateCpuAttackLocation(max: number) {
    const row = generateRandomNum(max)
    const col = generateRandomNum(max)
    // @ts-ignore
    if (listAttack[`${row}-${col}`]) {
      generateCpuAttackLocation(max)
    }

    return { row, col }
  }

  return {
    name,
    listAttack,
    attack: function (row: number, col: number, gameboard: Gameboard) {
      return gameboard.receiveAttack(row, col)
    },
    randomAttack: function (gameboard: Gameboard) {
      const { row, col } = generateCpuAttackLocation(gameboard.grid.length)
      // @ts-ignore
      listAttack[`${row}-${col}`] = true
      return gameboard.receiveAttack(row, col)
    },
  }
}

export default createPlayer
