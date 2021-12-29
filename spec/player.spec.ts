import { HIT, WATER } from '../src/constants'
import { Oriention, PlayerType } from '../src/enum'
import createPlayer from '../src/Player/player'

describe('should test the player', () => {
  it('should create the player', () => {
    const p1 = createPlayer('Player 1', PlayerType.USER)
    const p2 = createPlayer('Player 2', PlayerType.COMPUTER)

    expect(p1.name === 'Player 1').toBeTruthy()
    expect(p2.name === 'Player 1').toBeFalsy()
  })

  it('should create a gameboard when player is created', () => {
    const p1 = createPlayer('Player 1', PlayerType.USER)
    const p2 = createPlayer('Player 2', PlayerType.COMPUTER)

    expect(p1.gameBoard.grid.length).toBe(10)
    expect(p2.gameBoard.grid.length).toBe(10)
  })

  it('should create a gameboard when player is created', () => {
    const p1 = createPlayer('Player 1', PlayerType.USER)
    const p2 = createPlayer('Player 2', PlayerType.COMPUTER)

    expect(p1.gameBoard.grid.length).toBe(10)
    expect(p2.gameBoard.grid.length).toBe(10)
  })

  it('should create five ships for each player', () => {
    const p1 = createPlayer('Player 1', PlayerType.USER)
    const p2 = createPlayer('Player 2', PlayerType.COMPUTER)

    expect(p1.ships.length).toBe(5)
    expect(p2.ships.length).toBe(5)
  })

  it('should attack the enemy board', () => {
    const p1 = createPlayer('Player 1', PlayerType.USER)
    const p2 = createPlayer('Player 2', PlayerType.COMPUTER)
    // player 1 place ships
    p1.gameBoard.placeCharacter(0, 0, p1.ships[0], Oriention.Horizontal)
    p1.gameBoard.placeCharacter(0, 1, p1.ships[1], Oriention.Vertical)
    // player 2 place ships
    p2.gameBoard.placeCharacter(0, 0, p2.ships[0], Oriention.Horizontal)
    p2.gameBoard.placeCharacter(0, 1, p2.ships[1], Oriention.Vertical)

    // attack
    p1.attackEnemyBoard(0, 0, p2.gameBoard)

    expect(p2.gameBoard.grid[0][0] === HIT).toBeTruthy()
  })

  it('should test if the player is not dead', () => {
    const p1 = createPlayer('Player 1', PlayerType.USER)
    const p2 = createPlayer('Player 2', PlayerType.COMPUTER)
    // player 1 place ships
    p1.gameBoard.placeCharacter(0, 0, p1.ships[0], Oriention.Horizontal)
    p1.gameBoard.placeCharacter(0, 1, p1.ships[1], Oriention.Vertical)
    // player 2 place ships
    p2.gameBoard.placeCharacter(0, 0, p2.ships[0], Oriention.Horizontal)
    p2.gameBoard.placeCharacter(0, 1, p2.ships[1], Oriention.Vertical)

    // attack
    p1.attackEnemyBoard(0, 0, p2.gameBoard)
    expect(p1.allShipsSunk()).toBeFalsy()
    expect(p2.allShipsSunk()).toBeFalsy()
  })

  it('should test player is dead game over', () => {
    const p1 = createPlayer('Player 1', PlayerType.USER)
    const p2 = createPlayer('Player 2', PlayerType.COMPUTER)
    // player 1 place ships
    p1.gameBoard.placeCharacter(0, 0, p1.ships[0], Oriention.Horizontal)
    p1.gameBoard.placeCharacter(0, 1, p1.ships[1], Oriention.Vertical)
    // player 2 place ships
    p2.gameBoard.placeCharacter(0, 0, p2.ships[0], Oriention.Horizontal)
    p2.gameBoard.placeCharacter(0, 1, p2.ships[1], Oriention.Vertical)
    p2.gameBoard.placeCharacter(0, 2, p2.ships[2], Oriention.Vertical)
    p2.gameBoard.placeCharacter(0, 3, p2.ships[3], Oriention.Vertical)
    p2.gameBoard.placeCharacter(0, 4, p2.ships[4], Oriention.Vertical)

    // attack
    p1.attackEnemyBoard(0, 0, p2.gameBoard)
    for (let i = 0; i < p2.ships[1].body.length; i++) {
      p1.attackEnemyBoard(i, 1, p2.gameBoard)
    }

    for (let i = 0; i < p2.ships[2].body.length; i++) {
      p1.attackEnemyBoard(i, 2, p2.gameBoard)
    }

    for (let i = 0; i < p2.ships[3].body.length; i++) {
      p1.attackEnemyBoard(i, 3, p2.gameBoard)
    }

    for (let i = 0; i < p2.ships[4].body.length; i++) {
      p1.attackEnemyBoard(i, 4, p2.gameBoard)
    }

    p1.attackEnemyBoard(0, 2, p2.gameBoard)

    // expect(p1.allShipsSunk()).toBeFalsy()
    expect(() => p2.gameBoard.allShipsSunk()).toBeTruthy()
    expect(p2.allShipsSunk()).toBeTruthy()
  })

  it('should place random ship', () => {
    const p1 = createPlayer('Player One', PlayerType.COMPUTER)
    p1.placeRandomShip(p1.ships[0])
    let arr = []
    for (let i = 0; i < p1.gameBoard.grid.length; i++) {
      const el = p1.gameBoard.grid[i]
      arr.push(el.every((e) => e === WATER))
    }
    expect(arr.every((e) => e === true)).toBeFalsy()
  })
})
