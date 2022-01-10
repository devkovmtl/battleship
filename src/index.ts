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
// Ship Grab to be dragged by player
let draggedShip: HTMLElement
let draggedShipName = ''
let draggedShipLength = 0
// Store the Cpu ship location
const cpuShipLocation = {}

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
  // Event listener to drag the ship
  document
    .querySelectorAll('.my-ship-container')
    .forEach((ship) => ship.addEventListener('dragstart', onShipDragStart))
  // Event listener on player one to allow drop ship
  document.querySelectorAll('.grid-cell-me').forEach((gridCell) => {
    gridCell.addEventListener('drop', onShipDragDrop)
    gridCell.addEventListener('dragover', onShipDragOver)
  })

  // place Cpu ship

  document.querySelectorAll('.enemy-ship-container').forEach((ship) => {
    setTimeout(() => placeCpuShip(ship), 1000)
  })
})

function startGame() {
  console.log(cpuShipLocation)
  if (playerOneShipsContainer?.childNodes.length !== 0) {
    alert('Please place all your ships.')
    return
  }
  console.log('start')
}

function resetGame() {
  location.reload()
}

function generateRandomNum(max: number): number {
  return Math.floor(Math.random() * max)
}

function generateCpuLocation(max: number) {
  const row = generateRandomNum(max)
  const col = generateRandomNum(max)
  // @ts-ignore
  if (cpuShipLocation[`${row}-${col}`]) {
    generateCpuLocation(max)
  }

  return { row, col }
}

function placeCpuShip(ship: any) {
  // const row = generateRandomNum(CELL_PER_ROW)
  // const col = generateRandomNum(NBR_ROW)
  const { row, col } = generateCpuLocation(CELL_PER_ROW)
  const shipLength = ship.childNodes.length
  const shipName = ship.classList[1].split('-')[0]
  const isHorizontal = generateRandomNum(2) === 0 ? true : false

  const listOfCells = []

  if (isHorizontal) {
    for (let i = 0; i < shipLength; i++) {
      const cell = document.querySelector(
        `#cell-${row}-${col + i}.grid-cell-enemy`
      )
      listOfCells.push(cell)
    }

    if (
      checkIfShipCanBePlaced(
        isHorizontal,
        col,
        row,
        shipLength,
        CELL_PER_ROW,
        listOfCells
      )
    ) {
      // console.log(cell)
      for (let i = 0; i < shipLength; i++) {
        const cell = document.querySelector(
          `#cell-${row}-${col + i}.grid-cell-enemy`
        )
        // cell?.classList.remove(
        //   'bg-blue-200',
        //   'rounded-md',
        //   'hover:bg-blue-400',
        //   'hover:cursor-pointer'
        // )
        // cell?.classList.add(`${shipName}-${i}`, ship.classList[7], 'taken')
        // @ts-ignore
        cpuShipLocation[`${row}-${col + i}`] = `${shipName}-${i}`
      }

      playerTwoShipsContainer?.removeChild(ship)
    } else {
      placeCpuShip(ship)
    }
  }
  if (!isHorizontal) {
    for (let i = 0; i < shipLength; i++) {
      const cell = document.querySelector(
        `#cell-${row + i}-${col}.grid-cell-enemy`
      )
      listOfCells.push(cell)
    }

    if (
      checkIfShipCanBePlaced(
        isHorizontal,
        col,
        row,
        shipLength,
        CELL_PER_ROW,
        listOfCells
      )
    ) {
      // console.log(cell)
      for (let i = 0; i < shipLength; i++) {
        const cell = document.querySelector(
          `#cell-${row + i}-${col}.grid-cell-enemy`
        )
        // cell?.classList.remove(
        //   'bg-blue-200',
        //   'rounded-md',
        //   'hover:bg-blue-400',
        //   'hover:cursor-pointer'
        // )
        // cell?.classList.add(`${shipName}-${i}`, ship.classList[7], 'taken')
        // @ts-ignore
        cpuShipLocation[`${row + i}-${col}`] = `${shipName}-${i}`
      }

      playerTwoShipsContainer?.removeChild(ship)
    } else {
      placeCpuShip(ship)
    }
  }
}

function checkIfShipCanBePlaced(
  isHorizontal: boolean,
  col: number,
  row: number,
  shipLength: number,
  maxGridSize: number,
  listOfCells: any[]
): boolean {
  if (listOfCells) {
    if (
      listOfCells.some((el: HTMLElement) => el === null) ||
      listOfCells.some((el: HTMLElement) => el.classList.contains('taken'))
    )
      return false
  }
  if (isHorizontal) {
    if (col + (shipLength - 1) > maxGridSize - 1) {
      return false
    } else {
      return true
    }
  } else {
    if (row + (shipLength - 1) > maxGridSize - 1) {
      return false
    } else {
      return true
    }
  }
}

function onShipDragOver(e: any) {
  e.preventDefault()
}

function onShipDragDrop(e: any) {
  // console.log(e.target)
  // Grab row and column of drop location and parse
  const row = +e.target.id.split('-')[1]
  const col = +e.target.id.split('-')[2]
  const listOfCells = []
  // check to see if we can place the ship
  // overflow
  if (isHorizontal) {
    for (let i = 0; i < draggedShipLength; i++) {
      const cell = document.querySelector(
        `#cell-${row}-${col + i}.grid-cell-me`
      )
      listOfCells.push(cell)
    }
    if (
      checkIfShipCanBePlaced(
        isHorizontal,
        col,
        row,
        draggedShipLength,
        CELL_PER_ROW,
        listOfCells
      )
    ) {
      // console.log(cell)
      for (let i = 0; i < draggedShipLength; i++) {
        const cell = document.querySelector(
          `#cell-${row}-${col + i}.grid-cell-me`
        )
        cell?.classList.remove(
          'bg-blue-200',
          'rounded-md',
          'hover:bg-blue-400',
          'hover:cursor-pointer'
        )
        cell?.classList.add(
          `${draggedShipName}-${i}`,
          draggedShip.classList[7],
          'taken'
        )
      }
      playerOneShipsContainer?.removeChild(draggedShip)
    }
  }
  if (!isHorizontal) {
    for (let i = 0; i < draggedShipLength; i++) {
      const cell = document.querySelector(`#cell-${row + i}-${col}`)
      listOfCells.push(cell)
    }
    if (
      checkIfShipCanBePlaced(
        isHorizontal,
        col,
        row,
        draggedShipLength,
        CELL_PER_ROW,
        listOfCells
      )
    ) {
      for (let i = 0; i < draggedShipLength; i++) {
        const cell = document.querySelector(`#cell-${row + i}-${col}`)
        cell?.classList.remove(
          'bg-blue-200',
          'rounded-md',
          'hover:bg-blue-400',
          'hover:cursor-pointer'
        )
        cell?.classList.add(
          `${draggedShipName}-${i}`,
          draggedShip.classList[7],
          'taken'
        )
      }
      playerOneShipsContainer?.removeChild(draggedShip)
    }
  }
}

function onShipDragStart(e: any) {
  // @ts-ignore
  draggedShip = e.target
  // @ts-ignore
  draggedShipLength = e.target.childNodes.length
  // @ts-ignore
  draggedShipName = e.target.classList[1].split('-')[0]
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
    'h-6',
    'flex',
    'flex-row',
    'items-center',
    'justify-center'
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
