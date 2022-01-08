import './index.css'
//@ts-ignore
import ImageVsBlack from './images/player-versus-player.png'
// @ts-ignore
import ImageVsWhite from './images/player-versus-player-white.png'
import { Oriention } from './enum'

const playerOneName = document.querySelector('.player-one-name')
const playerOneLives = document.querySelector('.player-one-lives')
const playerOneGridContainer = document.querySelector(
  '.player-one-grid-container'
)
const btnRotate = document.querySelector('.btn-rotate')
const playerOneShipsContainer = document.querySelector(
  '.player-one-ships-container'
)

const whoseTurn = document.querySelector('.player-turn')
const btnStart = document.querySelector('.btn-start')
const btnReset = document.querySelector('.btn-reset')

const playerTwoName = document.querySelector('.player-two-name')
const playerTwoLives = document.querySelector('.player-two-lives')
const enemyGridContainer = document.querySelector('.player-two-grid-container')
const playerTwoShipsContainer = document.querySelector(
  '.player-two-ships-container'
)

// Number of cell per row
const CELL_PER_ROW = 10
// Number of row
const NBR_ROW = 10
// Number of Ships
const NBR_SHIPS = 5
// ships name
const SHIPS_NAME = [
  'submarine',
  'destroyer',
  'cruiser',
  'battleship',
  'carrier',
]
const BG_SHIP = [
  'bg-green-300',
  'bg-yellow-300',
  'bg-pink-300',
  'bg-purple-300',
  'bg-red-300',
]

let myHtmlGridEl: HTMLElement, enemyHtmlGridEl: HTMLElement
// Orientation of ship
let isHorizontal = true

document.addEventListener('DOMContentLoaded', () => {
  // Load image
  loadImage()
  // @ts-ignore
  whoseTurn?.textContent = 'Loading...'

  // Build Player One grid
  myHtmlGridEl = createHtmlGrid(NBR_ROW, CELL_PER_ROW, false)
  playerOneGridContainer?.appendChild(myHtmlGridEl)
  // Build Player Two grid
  enemyHtmlGridEl = createHtmlGrid(NBR_ROW, CELL_PER_ROW, true)
  enemyGridContainer?.appendChild(enemyHtmlGridEl)

  // insert ships to player one container
  for (let i = 0; i < NBR_SHIPS; i++) {
    const ship = createHtmlShip(SHIPS_NAME[i], i + 1, false)
    ship.classList.add(BG_SHIP[i])
    playerOneShipsContainer?.appendChild(ship)
  }
  // insert ships to player two container
  for (let i = 0; i < NBR_SHIPS; i++) {
    const ship = createHtmlShip(SHIPS_NAME[i], i + 1, true)
    ship.classList.add(BG_SHIP[i])
    playerTwoShipsContainer?.appendChild(ship)
  }

  // Rotate the ship
  btnRotate?.addEventListener('click', rotateShip)
  btnStart?.addEventListener('click', startGame)
  btnReset?.addEventListener('click', resetGame)
})

function resetGame() {
  location.reload()
}

function startGame() {
  console.log('Start Game')
}

function rotateShip() {
  const playerOnShips = document.querySelectorAll('.my-ship-container')
  if (isHorizontal) {
    // ship horizontal
    playerOneShipsContainer?.classList.remove('flex-col', 'justify-between')
    playerOneShipsContainer?.classList.add(
      'flex-row',
      'items-start',
      'space-x-3'
    )
    playerOnShips.forEach((ship) => ship.classList.add('flex-col'))
  }

  if (!isHorizontal) {
    // ship vertical
    playerOneShipsContainer?.classList.remove(
      'flex-row',
      'items-start',
      'space-x-3'
    )
    playerOneShipsContainer?.classList.add('flex-col', 'justify-between')
    playerOnShips.forEach((ship) => ship.classList.remove('flex-col'))
  }
  isHorizontal = !isHorizontal
}

function createHtmlShip(
  name: string,
  length: number,
  isEnemy: boolean
): HTMLElement {
  const shipContainer = createHtmlShipContainer(name, length, isEnemy)
  // add the to player one ships container
  for (let i = 0; i < length; i++) {
    const shipCell = createHtmlShipCell(name, i, isEnemy)
    shipContainer.appendChild(shipCell)
  }
  return shipContainer
}

function createHtmlShipContainer(
  name: string,
  length: number,
  isEnemy: boolean
): HTMLElement {
  const shipContainer = document.createElement('div')
  shipContainer.classList.add(
    'ship-container',
    `${name}-container`,
    isEnemy ? `enemy-ship-container` : `my-ship-container`,
    'flex',
    'flex-row',
    'rounded-md',
    'max-w-min'
  )

  if (!isEnemy) {
    shipContainer.setAttribute('draggable', 'true')
  }

  return shipContainer
}

function createHtmlShipCell(
  name: string,
  cellNum: number,
  isEnemy: boolean
): HTMLElement {
  const shipCell = document.createElement('div')
  shipCell.id = `${name}-${cellNum}`
  shipCell.classList.add(
    'ship-cell',
    `ship-${name}-cell`,
    isEnemy ? 'enemy-ship-cell' : 'my-ship-cell',
    'w-6',
    'h-6'
  )

  return shipCell
}

function createHtmlGrid(
  maxRow: number,
  maxCell: number,
  isEnemygrid: boolean
): HTMLElement {
  const grid = document.createElement('grid')
  grid.classList.add(
    'gameboard',
    'gameboard-grid',
    isEnemygrid ? 'gameboard-grid-enemy' : 'gameboard-grid-me',
    'flex',
    'flex-col',
    'bg-indigo-700'
  )

  for (let nbrRow = 0; nbrRow < maxRow; nbrRow++) {
    const r = createHtmlRow(nbrRow, isEnemygrid)
    for (let nbrCell = 0; nbrCell < maxCell; nbrCell++) {
      const c = createHtmlGridCell(nbrRow, nbrCell, isEnemygrid)
      r.appendChild(c)
    }
    grid.appendChild(r)
  }

  return grid
}

function createHtmlRow(rowNumber: number, isEnemyRow: boolean): HTMLElement {
  const row = document.createElement('div')
  row.setAttribute('id', `row-${rowNumber}`)
  row.classList.add(
    'grid-row',
    isEnemyRow ? 'grid-row-enemy' : 'grid-row-me',
    'flex',
    'flex-row'
  )

  return row
}

function createHtmlGridCell(
  row: number,
  col: number,
  isEnemyCell: boolean
): HTMLElement {
  const cell = document.createElement('div')
  cell.setAttribute('id', `cell-${row}-${col}`)

  cell.classList.add(
    'grid-cell',
    isEnemyCell ? 'grid-cell-enemy' : 'grid-cell-me',
    'w-6',
    'h-6',
    'bg-blue-200',
    'rounded-md',
    'hover:bg-blue-400',
    'hover:cursor-pointer'
  )
  return cell
}

// Load the background versus image
function loadImage() {
  const imgUIContainer = document.querySelector('.image-container>img')
  imgUIContainer?.setAttribute('alt', 'Player versus Player')
  imgUIContainer?.setAttribute('src', ImageVsWhite)
  imgUIContainer?.classList.add('w-full', 'h-auto')
  // imgUIContainer?.appendChild(imgEl)
}
