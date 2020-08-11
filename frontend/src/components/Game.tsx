import React, { useState } from 'react'
import { IGameState } from '../reducers/game/game.reducer'
import { IRoomState } from '../reducers/room/room.reducer'
import { Hand } from './cards/Hand'
import { PlayBorder } from './cards/PlayBorder'
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core'


const useStyles = makeStyles((theme: Theme) => {
  const baseStyle = { margin: 2, padding: 4 }
  return (
    createStyles({
      player: {
        ...baseStyle,
        backgroundColor: "#D1C894"
      },
      playerOnTurn: {
        ...baseStyle,
        backgroundColor: "#ED581C",
      },
    })
  )
})

interface IProps {
  room: IRoomState
  game: IGameState
}


export const Game: React.FC<IProps> = ({ room, game }) => {
  const classes = useStyles()
  const loginPlayer = () => room.players.find(p => p.isLoggedIn)
  const loginPlayerIdx = () => {
    let player = loginPlayer()
    return player ? player.turnIdx : 0
  }

  const currentPlayer = () => room.players.find(p => (p.turnIdx == game.currentTurnIdx))
  const currentPlayerId = () => {
    let player = currentPlayer()
    return player ? player.playerId : -1
  }

  return (
    <Grid container>
      <Grid item xs={5}>
        {room.players.sort((p, q) => {
          const len = room.players.length
          // player logged in is always displayed first
          // other players are in order of turn to play
          const fn = (idx: number) => (idx - loginPlayerIdx() + len) % len
          return fn(p.turnIdx) - fn(q.turnIdx)
        }).map((player, i) => {
          const isTurn = game.currentTurnIdx == player.turnIdx
          const isHidden = i === 0
          return (
            <div key={i} className={isTurn ? classes.playerOnTurn : classes.player} >
              <Hand holder={player} isHidden={isHidden} isTurn={isTurn} playerId={currentPlayerId()} />
            </div>
          )
        })}
      </Grid>
      <Grid item xs={7} >
        <PlayBorder numPlayers={room.players.length} />
      </Grid>
    </Grid>
  )
}


