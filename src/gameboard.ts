import { Ship } from './interface'

const createGameBoard = function (playerName: string, playerGrid: Array<any>) {
  let gameBoard: HTMLDivElement = document.createElement('div')
  gameBoard.classList.add('gameboard', `gameboard-${playerName}`)

  const col = 10
  const row = 10

  for (let i = 0; i < row * row; i++) {
    const cell = document.createElement('div')
    cell.dataset.id = `${i}`
    gameBoard.appendChild(cell)
    playerGrid.push(cell)
  }

  function placeShip(ship: Ship, position: number) {
    console.log(ship)

    ship.body.forEach((index) =>
      playerGrid[position + index].classList.add('taken', ship.name)
    )
  }

  return { gameBoard, placeShip }
}

export { createGameBoard }
