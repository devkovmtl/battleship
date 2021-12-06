import './index.css'

function createComponent(
  tagName: string,
  id?: string,
  classes?: Array<string>,
  content?: string | HTMLElement
): HTMLElement {
  const element = document.createElement(tagName)

  if (id) {
    element.setAttribute('id', id)
  }

  if (classes && classes.length) {
    element.classList.add(...classes)
  }

  if (content && typeof content === 'string') {
    element.textContent = `${content}`
  }

  if (content && content instanceof HTMLElement) {
    element.appendChild(content)
  }

  return element
}

const root = document.querySelector('#root')

root?.appendChild(
  createComponent(
    'div',
    'container',
    ['bg-blue-400', 'text-gray-400'],
    'Hello World'
  )
)
