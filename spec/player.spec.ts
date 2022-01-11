import createGameboard from '../src/Gameboard/gameboard'
import createPlayer from '../src/Player/player'
import createShip from '../src/Ship/ship'

describe('test player factory function ', () => {
  it('should create the player with the right name', () => {
    const player = createPlayer('Player One')
    expect(player.name).toEqual('Player One')
  })

  it('should attack the opponent gameboard and mark hit', () => {
    const player1 = createPlayer('Player One')
    const player2 = createPlayer('Player Two')

    const gameboardP1 = createGameboard(3, 3)
    const gameboardP2 = createGameboard(3, 3)

    const sub1 = createShip('submarine', 1)
    const sub2 = createShip('submarine', 1)
    const dest1 = createShip('destroyer', 2)
    const dest2 = createShip('destroyer', 2)

    gameboardP1.placeShipOnGrid(0, 0, sub1, true)
    gameboardP1.placeShipOnGrid(1, 1, dest1, false)

    gameboardP2.placeShipOnGrid(0, 2, sub2, true)
    gameboardP2.placeShipOnGrid(0, 0, dest2, false)

    expect(player1.attack(0, 2, gameboardP2)).toBeTruthy()
    expect(gameboardP2.grid[0][2]).toEqual('HIT')
    expect(sub2.isSunk()).toBeTruthy()
    expect(gameboardP2.doesAllShipsHaveSunk()).toBeFalsy()
  })

  it('should attack the opponent gameboard and mark miss', () => {
    const player1 = createPlayer('Player One')
    const player2 = createPlayer('Player Two')

    const gameboardP1 = createGameboard(3, 3)
    const gameboardP2 = createGameboard(3, 3)

    const sub1 = createShip('submarine', 1)
    const sub2 = createShip('submarine', 1)
    const dest1 = createShip('destroyer', 2)
    const dest2 = createShip('destroyer', 2)

    gameboardP1.placeShipOnGrid(0, 0, sub1, true)
    gameboardP1.placeShipOnGrid(1, 1, dest1, false)

    gameboardP2.placeShipOnGrid(0, 2, sub2, true)
    gameboardP2.placeShipOnGrid(0, 0, dest2, false)

    expect(player1.attack(0, 1, gameboardP2)).toBeFalsy()
    expect(gameboardP2.grid[0][1]).toEqual('MISS')
    expect(sub2.isSunk()).toBeFalsy()
    expect(gameboardP2.doesAllShipsHaveSunk()).toBeFalsy()
  })

  it('should random attack the opponent gameboard', () => {
    const player1 = createPlayer('Player One')
    const player2 = createPlayer('Player Two')

    const gameboardP1 = createGameboard(3, 3)
    const gameboardP2 = createGameboard(3, 3)

    const sub1 = createShip('submarine', 1)
    const sub2 = createShip('submarine', 1)
    const dest1 = createShip('destroyer', 2)
    const dest2 = createShip('destroyer', 2)

    gameboardP1.placeShipOnGrid(0, 0, sub1, true)
    gameboardP1.placeShipOnGrid(1, 1, dest1, false)

    gameboardP2.placeShipOnGrid(0, 2, sub2, true)
    gameboardP2.placeShipOnGrid(0, 0, dest2, false)
    player2.randomAttack(gameboardP2)
    expect(Object.keys(player2.listAttack).length).toBe(1)
  })
})
