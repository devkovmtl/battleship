import { Ship } from '../interface'
import { createAnArray } from '../utils'
import { BOAT, HIT } from '../constants'
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
    body: createAnArray(length, BOAT),
    hit: function (position: number) {
      if (position < 0 || position > this.body.length - 1) {
        throw new Error(`Enter a position between 0 and ${this.body.length}`)
      }
      this.body[position] = HIT

      return true
    },
    isSunk: function () {
      // console.log(this)
      return this.body.every((el) => el === HIT)
    },
  }

  return ship
}

export default createShip
