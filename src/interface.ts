interface Ship {
  name: string
  length: number
  isHit: (a: number) => boolean
  hasBeenSunk: () => boolean
}

export { Ship }
