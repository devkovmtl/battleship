import './index.css'
//@ts-ignore
import VsImg from './images/player-versus-player.png'
import createPlayer from './Player/player'
import { Oriention, PlayerType } from './enum'
import { BOAT, WATER } from './constants'
import { Player } from './interface'
import createShip from './Ship/ship'

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

let isHorizontal = true

const playerOne = createPlayer('Player One', PlayerType.USER)
const playerTwo = createPlayer('CPU', PlayerType.COMPUTER)

let draggedShip: HTMLElement
let draggedShipLength = 0
let draggedShipName = ''
let userSquaresList: HTMLDivElement[] = []

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
      cellContainer.id = `${i}-${j}`
      cellContainer.classList.add('cell-container')

      if (isEnnemyGrid && grid[i][j] === BOAT) {
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
  shipBody.style.borderRadius = `12px`
  shipBody.setAttribute('draggable', 'true')

  // we create cell for the length to append
  // to body
  for (let i = 0; i < length; i++) {
    const cell = document.createElement('div')
    cell.classList.add(`${name}-i`)
    cell.dataset.id = `${i}`
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
  console.log('DragDrop', e.target.id)
  if (!target) {
    return
  }

  const row = +target.id.split('-')[0]
  const col = +target.id.split('-')[1]
  const ship = createShip(draggedShipName, draggedShipLength)
  const orientation = isHorizontal ? Oriention.Horizontal : Oriention.Vertical
  playerOne.gameBoard.placeCharacter(row, col, ship, orientation)
  console.log(playerOne.gameBoard.grid)

  playerOneShipContainer?.removeChild(draggedShip)
}

function onDragOver(e: Event) {
  e.preventDefault()
}

document.addEventListener('DOMContentLoaded', () => {
  insertImageBackground()
  const btnRotateShip = document.querySelector('.btn-rotate-ship')

  // @ts-ignore
  playerOneName?.innerHTML = playerOne.name
  // @ts-ignore
  playerTwoName?.innerHTML = playerTwo.name

  // SHOW THE GRID
  showGrid(
    playerOneGrid,
    createGridHTMLELement(playerOne.gameBoard.grid, false)
  )

  for (let i = 0; i < playerOne.ships.length; i++) {
    const ship = playerOne.ships[i]
    const htmlShipElement = createShipHTMLElement(
      ship.name.toLocaleLowerCase(),
      ship.length
    )
    playerOneShipContainer?.appendChild(htmlShipElement)
    htmlShipElement.addEventListener('dragstart', onDragStart)
  }

  showGrid(playerTwoGrid, createGridHTMLELement(playerTwo.gameBoard.grid, true))

  btnRotateShip?.addEventListener('click', rotate)
  userSquaresList?.forEach((gridCell: HTMLDivElement) => {
    gridCell.addEventListener('drop', onDragDrop)
    gridCell.addEventListener('dragover', onDragOver)
  })
})
