import './index.css'
//@ts-ignore
import VsImg from './images/player-versus-player.png'
import createPlayer from './Player/player'
import { Oriention, PlayerType } from './enum'
import {
  BATTLESHIP,
  BOAT,
  CARRIER,
  CRUISER,
  DESTROYER,
  SUBMARINE,
  WATER,
} from './constants'
import { Player } from './interface'
import createShip from './Ship/ship'
import { getRandomInt } from './utils'

const playerOneName = document.querySelector('.player-one-name')
const playerOneGrid = document.querySelector('.player-one-grid')
const playerOneShipContainer = document.querySelector(
  '.player-one-ship-container'
)
const playerTwoName = document.querySelector('.player-two-name')
const playerTwoGrid = document.querySelector('.player-two-grid')
const playerTwoShipContainer = document.querySelector(
  '.player-two-ship-container'
)
const btnStart = document.querySelector('.btn-start')

let isHorizontal = true

const playerOne = createPlayer('Player One', PlayerType.USER)
const playerTwo = createPlayer('CPU', PlayerType.COMPUTER)
const whoseTurn = document.querySelector('#turn')

let draggedShip: HTMLElement
let draggedShipLength = 0
let draggedShipName = ''
let userSquaresList: HTMLDivElement[] = []

let isGameStarted = false
let isGameOver = false
let currentPlayer = 'user'
let cpuAttack = {}

function insertImageBackground() {
  const imgUIContainer = document.querySelector('.ui-img-container')

  const imgEl = document.createElement('img')
  imgEl.setAttribute('alt', 'Player Vs Player')
  imgEl.setAttribute('src', VsImg)
  imgEl.classList.add('img-element', 'w-full')
  imgUIContainer?.appendChild(imgEl)
}

function showGrid(htmlEl: Element | null, grid: HTMLElement) {
  if (htmlEl) {
    while (htmlEl.firstChild) {
      htmlEl.removeChild(htmlEl.firstChild)
    }
    htmlEl.appendChild(grid)
  }
  return
}

function createGridHTMLELement(grid: any[][], isEnnemyGrid: boolean) {
  // console.log(grid)
  const gridContainer = document.createElement('div')
  gridContainer.classList.add(
    'grid-container',
    isEnnemyGrid ? 'enemy-grid-container' : 'my-grid-container'
  )
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i]
    // console.log(row)
    const rowContainer = document.createElement('div')
    rowContainer.classList.add('row-container')

    for (let j = 0; j < row.length; j++) {
      const cell = row[j]
      const cellContainer = document.createElement('div')
      cellContainer.dataset.id = `${i}-${j}`
      cellContainer.id = `cell-${i}-${j}`
      cellContainer.classList.add('cell-container')
      if (isEnnemyGrid) {
        cellContainer.classList.add('cpu-cell-container')
      }
      if (
        (isEnnemyGrid && grid[i][j] === BOAT) ||
        grid[i][j].split('-')[0] === SUBMARINE ||
        grid[i][j].split('-')[0] === DESTROYER ||
        grid[i][j].split('-')[0] === CRUISER ||
        grid[i][j].split('-')[0] === BATTLESHIP ||
        grid[i][j].split('-')[0] === CARRIER
      ) {
        cellContainer.textContent = WATER
      } else {
        cellContainer.textContent = grid[i][j]
        userSquaresList.push(cellContainer)
      }
      rowContainer.appendChild(cellContainer)
    }

    gridContainer.appendChild(rowContainer)
  }

  return gridContainer
}

function createShipHTMLElement(name: string, length: number): HTMLElement {
  const shipBody = document.createElement('div')
  shipBody.classList.add('ship-container', `${name}-container`)
  // shipBody.style.width = `${40 * length}px`
  shipBody.setAttribute('draggable', 'true')

  // we create cell for the length to append
  // to body
  for (let i = 0; i < length; i++) {
    const cell = document.createElement('div')
    cell.classList.add(`${name}-${i}`)
    cell.dataset.id = `${i}`
    cell.textContent = BOAT
    shipBody.appendChild(cell)
  }

  return shipBody
}

function rotate() {
  const submarine = document.querySelector('.submarine-container')
  const destroyer = document.querySelector('.destroyer-container')
  const cruiser = document.querySelector('.cruiser-container')
  const battleship = document.querySelector('.battleship-container')
  const carrier = document.querySelector('.carrier-container')
  if (isHorizontal) {
    // @ts-ignore
    if (destroyer) destroyer.classList.toggle('destroyer-container-vertical')
    // @ts-ignoree
    if (submarine) submarine.classList.toggle('submarine-container-vertical')
    // @ts-ignore
    if (cruiser) cruiser.classList.toggle('cruiser-container-vertical')
    // @ts-ignore
    if (battleship) battleship.classList.toggle('battleship-container-vertical')
    // @ts-ignore
    if (carrier) carrier.classList.toggle('carrier-container-vertical')
    isHorizontal = false
    return
  }

  if (!isHorizontal) {
    // @ts-ignore
    if (destroyer) destroyer.classList.toggle('destroyer-container-vertical')
    // @ts-ignore
    if (submarine) submarine.classList.toggle('submarine-container-vertical')
    // @ts-ignore
    if (cruiser) cruiser.classList.toggle('cruiser-container-vertical')
    // @ts-ignore
    if (battleship) battleship.classList.toggle('battleship-container-vertical')
    // @ts-ignore
    if (carrier) carrier.classList.toggle('carrier-container-vertical')
    isHorizontal = true
    return
  }
}

function onDragStart(e: Event) {
  // @ts-ignore
  draggedShip = this
  // @ts-ignore
  draggedShipLength = this.childNodes.length
  // @ts-ignore
  draggedShipName = this.classList[1].split('-')[0]
}

function onDragDrop(e: any) {
  e.preventDefault()
  const target = e.target
  if (!target) {
    return
  }

  const row = +target.id.split('-')[1]
  const col = +target.id.split('-')[2]
  const ship = createShip(draggedShipName, draggedShipLength)
  const orientation = isHorizontal ? Oriention.Horizontal : Oriention.Vertical
  playerOne.gameBoard.placeCharacter(row, col, ship, orientation)
  const index = playerOne.gameBoard.ships.findIndex(
    (e) => e.name === draggedShipName
  )

  if (index >= 0) {
    playerOneShipContainer?.removeChild(draggedShip)
  } else {
    return
  }

  if (isHorizontal) {
    for (let i = 0; i < draggedShipLength; i++) {
      const gridCell = document.querySelector(`#cell-${row}-${col + i}`)
      if (gridCell) {
        gridCell.textContent = BOAT
        gridCell.classList.add(`${draggedShipName}`)
      }
    }
  } else {
    for (let i = 0; i < draggedShipLength; i++) {
      const gridCell = document.querySelector(`#cell-${row + i}-${col}`)
      if (gridCell) {
        gridCell.textContent = BOAT
        gridCell.classList.add(`${draggedShipName}`)
      }
    }
  }
}

function onDragOver(e: Event) {
  e.preventDefault()
}

function playGame() {
  if (isGameOver) {
    console.log('Game Over')
    return
  }

  if (playerOneShipContainer && playerOneShipContainer?.childNodes.length > 1) {
    alert('Place all your ships on the gameboard')
    return
  }

  isGameStarted = true

  whoseTurn?.classList.toggle('hidden')

  if (currentPlayer === 'user') {
    // @ts-ignore
    whoseTurn?.innerHTML = 'Your Go'
    const cpuCells = document.querySelectorAll('.cpu-cell-container')
    cpuCells.forEach((cpu) => cpu.addEventListener('click', attackEnemyBoard))

    if (playerTwo.allShipsSunk()) {
      isGameOver = true
      console.log('Player One win')
    }
  }

  if (currentPlayer === 'computer') {
    console.log('Computer go')
    // @ts-ignore

    setTimeout(() => {
      const { row, col } = generateCpuMove()
      playerTwo.attackEnemyBoard(row, col, playerOne.gameBoard)
      console.log(row, col)
    }, 500)
    console.log(playerOne.gameBoard.grid)
    // showGrid(
    //   playerOneGrid,
    //   createGridHTMLELement(playerOne.gameBoard.grid, false)
    // )
    currentPlayer = 'user'
    if (playerOne.allShipsSunk()) {
      isGameOver = true
      console.log('Computer win')
    }
    playGame()
  }
}

function attackEnemyBoard(e: Event) {
  if (isGameOver) {
    console.log('Game is over')
    return
  }

  // @ts-ignore
  const row = +e.target.id.split('-')[1]
  // @ts-ignore
  const col = +e.target.id.split('-')[2]
  playerOne.attackEnemyBoard(row, col, playerTwo.gameBoard)
  console.log(playerTwo.gameBoard.grid)
  // show cpu grid
  showGrid(playerTwoGrid, createGridHTMLELement(playerTwo.gameBoard.grid, true))
  currentPlayer = 'computer'
  // @ts-expect-error
  whoseTurn?.innerHTML = ''
  playGame()
}

function generateCpuMove() {
  const row = getRandomInt(9)
  const col = getRandomInt(9)
  // @ts-ignore
  if (cpuAttack[`${row}-${col}`]) {
    generateCpuMove()
  }
  return { row, col }
}

document.addEventListener('DOMContentLoaded', () => {
  insertImageBackground()
  const btnRotateShip = document.querySelector('.btn-rotate-ship')

  // @ts-ignore
  playerOneName?.innerHTML = playerOne.name
  // @ts-ignore
  playerTwoName?.innerHTML = playerTwo.name

  // Show player grid
  showGrid(
    playerOneGrid,
    createGridHTMLELement(playerOne.gameBoard.grid, false)
  )

  // add the ships for the player
  for (let i = 0; i < playerOne.ships.length; i++) {
    const ship = playerOne.ships[i]
    const htmlShipElement = createShipHTMLElement(
      ship.name.toLocaleLowerCase(),
      ship.length
    )
    playerOneShipContainer?.appendChild(htmlShipElement)
    htmlShipElement.addEventListener('dragstart', onDragStart)
  }

  // place cpu ships on the grid
  for (let i = 0; i < playerTwo.ships.length; i++) {
    playerTwo.placeRandomShip(playerTwo.ships[i])
  }

  // show cpu grid
  showGrid(playerTwoGrid, createGridHTMLELement(playerTwo.gameBoard.grid, true))

  console.log(playerTwo.gameBoard.grid)

  // rotate the ship vertical or horizontal
  btnRotateShip?.addEventListener('click', rotate)
  // drag and drop the ship
  userSquaresList?.forEach((gridCell: HTMLDivElement) => {
    gridCell.addEventListener('drop', onDragDrop)
    gridCell.addEventListener('dragover', onDragOver)
  })
  // btn start
  btnStart?.addEventListener('click', playGame)
})
