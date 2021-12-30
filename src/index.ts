import './index.css'
//@ts-ignore
import VsImg from './images/player-versus-player.png'

function insertImageBackground() {
  const imgUIContainer = document.querySelector('.ui-img-container')

  const imgEl = document.createElement('img')
  imgEl.setAttribute('alt', 'Player Vs Player')
  imgEl.setAttribute('src', VsImg)
  imgEl.classList.add('img-element', 'w-full')
  imgUIContainer?.appendChild(imgEl)
}

document.addEventListener('DOMContentLoaded', () => {
  insertImageBackground()
})
