interface Ship {
  name: string
  length: number
  body: Array<string | undefined>
  hit: (position: number) => boolean
  isSunk: () => boolean
}

export { Ship }
