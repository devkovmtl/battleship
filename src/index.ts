import './index.css'
//@ts-ignore
import ImageVsBlack from './images/player-versus-player.png'
// @ts-ignore
import ImageVsWhite from './images/player-versus-player-white.png'

const playerOneName = document.querySelector('.player-one-name')
const playerOneLives = document.querySelector('.player-one-lives')
const playerOneGridContainer = document.querySelector(
  '.player-one-grid-container'
)
const btnRotate = document.querySelector('.btn-rotate')
const myGrid = document.querySelector('.player-one-ships')

const whoseTurn = document.querySelector('.player-turn')
const btnStart = document.querySelector('.btn-start')
const btnReset = document.querySelector('.btn-reset')

const playerTwoName = document.querySelector('.player-two-name')
const playerTwoLives = document.querySelector('.player-two-lives')
const enemyGridContainer = document.querySelector('.player-two-grid-container')

let myHtmlGridEl: HTMLElement, enemyHtmlGridEl: HTMLElement

// Number of cell per row
const CELL_PER_ROW = 10
// Number of row
const NBR_ROW = 10

document.addEventListener('DOMContentLoaded', () => {
  // Load image
  loadImage()
  // @ts-ignore
  whoseTurn?.textContent = 'Loading...'

  myHtmlGridEl = createHtmlGrid(NBR_ROW, CELL_PER_ROW, false)
  playerOneGridContainer?.appendChild(myHtmlGridEl)

  enemyHtmlGridEl = createHtmlGrid(NBR_ROW, CELL_PER_ROW, true)
  enemyGridContainer?.appendChild(enemyHtmlGridEl)

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
  console.log('Rotate Ship')
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
    isEnemy ? `my-ship-container` : `enemy-ship-container`,
    'flex',
    'flex-row'
  )
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
    isEnemy ? 'my-ship-cell' : 'enemy-ship-cell',
    'bg-gray-500',
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
    'bg-indigo-800',
    'space-y-1'
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
    'flex-row',
    'space-x-1'
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
