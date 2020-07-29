import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import { IRoomState, roomReducer } from '../reducers/room/room.reducer'
import { IGameState } from '../reducers/game/game.reducer'
import { IGlobalState } from '../reducers'
import Game from './Game'
import { initGame } from '../actions'

interface IProps {
  room: IRoomState
  game: IGameState
  initGame: (playerNames: string[], turnIdxs: number[],
    currentTurnIdx: number, dealerIdx: number) => void
}

const Container: React.FC<IProps> = ({ room, game, initGame }) => {
  useEffect(() => {
    let playerNames: string[] =
      ['Jivraj', 'Shanta', 'Nikesh', 'Nitin', 'Mikey']
    let turnIdxs = [1, 3, 2, 4, 0]
    let dealerIdx = 4
    let currentTurnIdx = (dealerIdx + 1) % playerNames.length
    initGame(playerNames, turnIdxs, currentTurnIdx, dealerIdx)
  }, [])

  return (
    <Fragment>
      {console.log(room.players)}
      <Game room={room} game={game}></Game>
    </Fragment>
  )
}

const mapStateToProps = (state: IGlobalState) => ({
  room: state.room,
  game: state.game,
})

export default connect(mapStateToProps, { initGame })(Container)

