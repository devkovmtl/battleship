interface Ship {
  name: string
  length: number
  body: Array<any>
  hit: (a: any) => boolean
  isSunk: () => boolean
}

export { Ship }
