import { Ship } from './interface'

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
    isHit: function (x: number) {
      return true
    },
    hasBeenSunk: function () {
      return length <= 0
    },
  }

  return ship
}

export default createShip
