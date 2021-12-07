import './index.css'
import createComponent from './createComponent'
import createShip from './ship'

const root = document.querySelector('#root')

const s1 = createShip('Cruiser', 3)
console.log(s1)
root?.appendChild(
  createComponent(
    'div',
    'container',
    ['bg-blue-400', 'text-gray-400'],
    'Hello World'
  )
)
