interface Ship {
  name: string
  length: number
  body: Array<undefined | number | string>
  isHit: (a: any) => boolean
  hasBeenSunk: () => boolean
}

export { Ship }
