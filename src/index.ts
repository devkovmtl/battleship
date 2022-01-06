import './index.css'
//@ts-ignore
import ImageVsBlack from './images/player-versus-player.png'
// @ts-ignore
import ImageVsWhite from './images/player-versus-player-white.png'

const playerOneName = document.querySelector('.player-one-name')
const playerOneLives = document.querySelector('.player-one-lives')
const myGameboardGrid = document.querySelector('.gameboard-grid-me')
const btnRotate = document.querySelector('.btn-rotate')
const myGrid = document.querySelector('.player-one-ships')

const whoseTurn = document.querySelector('.player-turn')
const btnStart = document.querySelector('.btn-start')

const playerTwoName = document.querySelector('.player-two-name')
const playerTwoLives = document.querySelector('.player-two-lives')
const enemyGameboardGrid = document.querySelector('.gameboard-grid-enemy')

// Number of cell per row
const CELL_PER_ROW = 10
// Number of row
const NBR_ROW = 10

document.addEventListener('DOMContentLoaded', () => {
  // Load image
  loadImage()
  // @ts-ignore
  whoseTurn?.textContent = 'Loading...'
})

function createHtmlGrid(isEnemygrid: boolean): HTMLElement {
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

  for (let nbrRow = 0; nbrRow < NBR_ROW; nbrRow++) {
    const r = createHtmlRow(nbrRow, isEnemygrid)
    for (let nbrCell = 0; nbrCell < CELL_PER_ROW; nbrCell++) {
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
