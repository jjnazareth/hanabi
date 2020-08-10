import React, { Component, useEffect, } from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import { IRoomState, roomReducer } from '../reducers/room/room.reducer'
import { IGameState } from '../reducers/game/game.reducer'
import { IGlobalState } from '../reducers'
import Game from './Game'
import { flushPlayers, flushCardGame, initGame } from '../actions'
import { GameStatus } from './GameStatus'
import { useState } from 'react'


interface IProps {
  room: IRoomState
  game: IGameState
  flushPlayers: () => void
  flushCardGame: () => void
  initGame: (playerNames: string[], turnIdxs: number[], currentTurnIdx: number, dealerIdx: number) => void
}

const Container: React.FC<IProps> = ({ room, game, flushPlayers, flushCardGame, initGame }) => {
  useEffect(() => {
    let playerNames: string[] =
      ['Jivraj', 'Shanta', 'Nikesh', 'Nitin', 'Mikey']
    let turnIdxs = [1, 3, 2, 4, 0]
    let dealerIdx = 4

    let currentTurnIdx = (dealerIdx + 1) % playerNames.length
    initGame(playerNames, turnIdxs, currentTurnIdx, dealerIdx)
    console.log("Mounting")
    return () => {
      flushPlayers()
      flushCardGame()
      console.log("Cleanup")
    }
  }, [])

  return (
    <Fragment>
      {/* {console.log(room.players)} */}
      <GameStatus room={room} game={game}></GameStatus>
      <Game room={room} game={game}></Game>
    </Fragment>
  )
}

const mapStateToProps = (state: IGlobalState) => ({
  room: state.room,
  game: state.game,
})


export default connect(mapStateToProps, { flushPlayers, flushCardGame, initGame })(Container)

