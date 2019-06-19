import React, { Component } from 'react'
import { connect } from 'react-redux'
import Room from './Room'
import Game from './Game'
import { initialisePlayers, initSeats, initHand } from '../reducers/room/room.actions'
import { initGame } from '../reducers/game/game.actions'
import { IGlobalState } from '../reducers'
import { IRoomState } from '../reducers/room/room.reducer'

import { IGameState } from '../reducers/game/game.reducer'
import { Card, Player } from '../globalTypes'
import store from '../store'

import { setNextTurn } from '../reducers/game/game.actions';

interface IProps {
  initialisePlayers: (players: string[]) => void
  initSeats: (turnIdxs: number[]) => void
  initHand: (turnIdx: number, cards: Card[]) => void
  initGame: (currentTurnIdx: number, dealerIdx: number) => void
  room: IRoomState

  game: IGameState
  setNextTurn: (numPlayers: number) => (void)
}


class Container extends Component<IProps> {

  private deal = (pack: Card[], players: Player[], dealerIdx: number) => {
    const CARDS_IN_HAND: number = players.length < 4 ? 5 : 4
    let numPlayers = players.length
    let arr = Array.from(Array(CARDS_IN_HAND).keys())
      .map(i => i * numPlayers) // 0,5,10,15,20 etc 
      .map(i => i + 30) //leave 20 cards for no good reason
    players.forEach(p => {
      let handIdx = (p.turnIdx - dealerIdx - 1 + numPlayers) % numPlayers
      // dealer deals last to himself
      let cards = arr.map(i => pack[i + handIdx])
      this.props.initHand(p.turnIdx, cards)
    })
  }

  public componentDidMount(): void {
    const { room,  game } = this.props

    let [turnIdx, dealerIdx] = [1, 2]
    this.props.initGame(turnIdx, dealerIdx)
   
  }
  public render(): JSX.Element {
    const {game } = this.props
    return (
      <React.Fragment>
        <div>
          <Room></Room>
          <Game dealerIdx ={game.dealerIdx}></Game>
        </div>

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  room: state.room, 
  game: state.game,
})

export default connect(mapStateToProps, {
  initialisePlayers,
  initSeats,
  initGame,
  initHand,
  setNextTurn
})(Container)
