import './index.css'
import createComponent from './createComponent'

const root = document.querySelector('#root')

root?.appendChild(
  createComponent(
    'div',
    'container',
    ['bg-blue-400', 'text-gray-400'],
    'Hello World'
  )
)
