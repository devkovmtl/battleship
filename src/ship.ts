import { Ship } from './interface'
import { createAnArray } from './utils'
// Factory function creating ship
function createShip(name: string, length: number): Ship {
  if (!name || !name.trim().length) {
    throw new Error('Name is required')
  }
  if (!length || length <= 0) {
    throw new Error('Length is required and bigger than 0')
  }

  const ship = {
    name,
    length,
    body: createAnArray(length),
    hit: function (x: any) {
      const idx = this.body.indexOf(x)
      if (idx !== -1 && this.body[idx] !== 'HIT') {
        this.body[idx] = 'HIT'
      }
      return idx !== -1
    },
    isSunk: function () {
      return this.body.every(
        (el) => el !== null && typeof el === 'string' && el === 'HIT'
      )
    },
  }

  return ship
}

export default createShip
