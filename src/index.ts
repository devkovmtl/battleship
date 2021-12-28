import {
  DESTROYER,
  DESTROYER_LENGTH,
  SUBMARINE,
  SUBMARINE_LENGTH,
} from './constants'
import { Oriention } from './enum'
import createGameboard from './Gameboard/gameboard'
import './index.css'
import createShip from './Ship/ship'
// import createComponent from './createComponent'
// import createShip from './Ship/ship'

// const root = document.querySelector('#root')

// const s1 = createShip('Cruiser', 3)
// console.log(s1)

// root?.appendChild(
//   createComponent(
//     'div',
//     'container',
//     ['bg-blue-400', 'text-gray-400'],
//     'Hello World'
//   )
// )

// s1.hit(1)
// s1.hit(2)
// console.log(s1)
// s1.hit(4)
// s1.hit(20)
// s1.hit(21)
// s1.hit(5)
// console.log(s1.isSunk())
// s1.hit(6)
// console.log(s1.isSunk())
let gameboard = createGameboard()
console.log(gameboard)
const submarine = createShip(SUBMARINE, SUBMARINE_LENGTH)
const destroyer = createShip(DESTROYER, DESTROYER_LENGTH)
// gameboard.placeCharacter(0, 0, ship)
// console.log(gameboard)
gameboard.placeCharacter(0, 0, submarine)
gameboard.placeCharacter(0, 2, destroyer, Oriention.Vertical)
gameboard.receiveAttack(0, 0)
gameboard.receiveAttack(0, 1)
gameboard.receiveAttack(0, 2)

console.log(submarine.isSunk())
console.log(submarine)
